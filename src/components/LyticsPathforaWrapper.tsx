'use client';

import { usePathname } from 'next/navigation';
import LyticsPathfora from './LyticsPathfora';

interface LyticsPathforaWrapperProps {
  enabled?: boolean;
  config?: {
    anonymousMessage?: boolean;
    leadCapture?: boolean;
    contentRecommendations?: boolean;
  };
}

export default function LyticsPathforaWrapper({ enabled = true, config }: LyticsPathforaWrapperProps) {
  const pathname = usePathname();
  
  // Detect locale from pathname
  const locale = pathname.startsWith('/hi') ? 'hi' : 'en';
  
  return (
    <LyticsPathfora 
      enabled={enabled}
      locale={locale}
      config={config}
    />
  );
} 