import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
}

export default function ImageWithFallback({ src, alt, className = '', fallbackColor = '#e5e7eb' }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ backgroundColor: fallbackColor }}
      >
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <ImageOff size={32} />
          <span className="text-xs">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
