/**
 * Advanced Client-Side Image Background Remover & Cutout Processor
 * 
 * Automatically detects background color, removes solid, light, studio,
 * or gradient backdrops, and creates a clean cutout with feathered edges.
 */
export async function removeImageBackground(imageSrc, options = {}) {
  const {
    threshold = 32,      // Color distance tolerance
    feather = 10,        // Soft alpha transition edge
    edgeSampleCount = 30, // Perimeter sample density
  } = options;

  if (!imageSrc || typeof imageSrc !== 'string') {
    return imageSrc;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    // Timeout safety fallback
    const timeout = setTimeout(() => {
      resolve(imageSrc);
    }, 4000);

    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        if (!width || !height) {
          resolve(imageSrc);
          return;
        }

        // Keep dimensions crisp while keeping processing fast
        const maxDimension = 900;
        let targetWidth = width;
        let targetHeight = height;
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          targetWidth = Math.round(width * ratio);
          targetHeight = Math.round(height * ratio);
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imgData.data;

        // Step 1: Check if already has transparent background
        let transparentCount = 0;
        const sampleTotal = 150;
        for (let i = 0; i < sampleTotal; i++) {
          const rx = Math.floor(Math.random() * targetWidth);
          const ry = Math.floor(Math.random() * Math.min(30, targetHeight * 0.1));
          const idx = (ry * targetWidth + rx) * 4;
          if (data[idx + 3] < 50) {
            transparentCount++;
          }
        }

        // If top area is already transparent, return as is!
        if (transparentCount > 25) {
          resolve(imageSrc);
          return;
        }

        // Step 2: Sample top corners to compute background color profile
        let topCornerR = 0, topCornerG = 0, topCornerB = 0, cornerSamples = 0;
        const cornerW = Math.min(25, Math.floor(targetWidth * 0.08));
        const cornerH = Math.min(25, Math.floor(targetHeight * 0.08));

        for (let y = 0; y < cornerH; y++) {
          for (let x = 0; x < cornerW; x++) {
            // Top-left
            const tl = (y * targetWidth + x) * 4;
            topCornerR += data[tl];
            topCornerG += data[tl + 1];
            topCornerB += data[tl + 2];

            // Top-right
            const tr = (y * targetWidth + (targetWidth - 1 - x)) * 4;
            topCornerR += data[tr];
            topCornerG += data[tr + 1];
            topCornerB += data[tr + 2];

            cornerSamples += 2;
          }
        }

        const bgR = topCornerR / cornerSamples;
        const bgG = topCornerG / cornerSamples;
        const bgB = topCornerB / cornerSamples;

        // Color distance function (perceptual luminance weighted)
        const getColorDistance = (r, g, b) => {
          const rmean = (r + bgR) / 2;
          const dr = r - bgR;
          const dg = g - bgG;
          const db = b - bgB;
          return Math.sqrt(
            (((512 + rmean) * dr * dr) >> 8) +
            4 * dg * dg +
            (((767 - rmean) * db * db) >> 8)
          );
        };

        // Step 3: Flood-fill BFS from all perimeter borders
        // This ensures inner subject areas (like white shirts or teeth) are protected
        const totalPixels = targetWidth * targetHeight;
        const visited = new Uint8Array(totalPixels);
        const queue = [];

        // Seed with all border pixels
        for (let x = 0; x < targetWidth; x++) {
          queue.push(x, 0); // Top
          visited[x] = 1;
        }
        for (let y = 0; y < targetHeight; y++) {
          const lIdx = y * targetWidth;
          const rIdx = y * targetWidth + (targetWidth - 1);
          if (!visited[lIdx]) { queue.push(0, y); visited[lIdx] = 1; }
          if (!visited[rIdx]) { queue.push(targetWidth - 1, y); visited[rIdx] = 1; }
        }

        let head = 0;
        const totalTolerance = threshold * 2.8;
        const featherRange = feather * 2.2;

        while (head < queue.length) {
          const cx = queue[head++];
          const cy = queue[head++];
          const idx = (cy * targetWidth + cx) * 4;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const dist = getColorDistance(r, g, b);

          if (dist < totalTolerance) {
            // Is part of background
            if (dist <= totalTolerance - featherRange) {
              data[idx + 3] = 0; // Transparent
            } else {
              // Smooth edge falloff
              const alphaRatio = (dist - (totalTolerance - featherRange)) / featherRange;
              data[idx + 3] = Math.round(Math.max(0, Math.min(255, 255 * alphaRatio)));
            }

            // Expand to 4 adjacent neighbors
            const neighbors = [
              [cx + 1, cy],
              [cx - 1, cy],
              [cx, cy + 1],
              [cx, cy - 1]
            ];

            for (let i = 0; i < 4; i++) {
              const [nx, ny] = neighbors[i];
              if (nx >= 0 && nx < targetWidth && ny >= 0 && ny < targetHeight) {
                const nIdx = ny * targetWidth + nx;
                if (!visited[nIdx]) {
                  visited[nIdx] = 1;
                  queue.push(nx, ny);
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        // Fallback gracefully on CORS or sandbox restriction
        console.warn('Canvas image cutout fallback:', err);
        resolve(imageSrc);
      }
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(imageSrc);
    };
  });
}
