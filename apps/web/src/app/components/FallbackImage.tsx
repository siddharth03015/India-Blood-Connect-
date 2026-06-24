'use client';

import { useState } from 'react';

export default function FallbackImage({
  src,
  alt,
  className,
  fallbackText,
  fallbackEmoji,
  fallbackHint
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackText: string;
  fallbackEmoji: string;
  fallbackHint: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center bg-transparent">
        <div className="text-6xl mb-4">{fallbackEmoji}</div>
        <div className="text-sm font-bold text-slate-500">{fallbackText}</div>
        <div className="text-xs text-slate-400 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: fallbackHint }} />
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
