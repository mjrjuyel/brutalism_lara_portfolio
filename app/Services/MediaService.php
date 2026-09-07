<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaService
{
    public function upload(UploadedFile $file, string $directory = 'portfolio'): array
    {
        $path = $file->store($directory, 'public');
        return [
            'path' => $path,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize()
        ];
    }

    public function delete(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    public function resolveImageUrl(?string $type, ?string $path): ?string
    {
        if ($type === 'url') {
            return $path;
        }
        if ($type === 'upload' && $path) {
            return Storage::disk('public')->url($path);
        }
        return null;
    }
}
