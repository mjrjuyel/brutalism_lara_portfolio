export function resolveImageUrl(type, path) {
  if (type === 'url') {
    return path;
  }
  if (type === 'upload' && path) {
    return `/storage/${path}`;
  }
  return null;
}

export function getPlaceholderImage(width = 800, height = 600, text = 'Placeholder') {
  return `https://placehold.co/${width}x${height}/1a1a1a/ffffff?text=${encodeURIComponent(text)}`;
}
