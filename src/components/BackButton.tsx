'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  fallbackText?: string;
}

export default function BackButton({ href, children, className = '', fallbackText = 'Back' }: BackButtonProps) {
  const router = useRouter();

  const handleBackNavigation = () => {
    router.push(href);
  };

  return (
    <div className="flex items-center gap-2">
      <Link 
        href={href} 
        className={className}
      >
        {children}
      </Link>
      {/* Fallback button in case Link doesn't work */}
      <button 
        onClick={handleBackNavigation}
        className={`${className} underline`}
        title={`${fallbackText} (backup)`}
      >
        ({fallbackText})
      </button>
    </div>
  );
}
