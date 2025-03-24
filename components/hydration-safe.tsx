'use client';

import { useEffect, useState } from 'react';

interface HydrationSafeProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that safely handles hydration mismatches by only rendering its children
 * on the client side after hydration is complete.
 * 
 * This is useful for components that might have browser-specific attributes (like fdprocessedid)
 * that cause hydration warnings.
 */
export function HydrationSafe({ children, fallback = null }: HydrationSafeProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR and initial hydration, render the fallback (if provided) or nothing
  if (!isClient) {
    return fallback;
  }

  // Once hydration is complete and we're on the client, render the actual children
  return <>{children}</>;
}
