"use client";
import { Providers } from '@/src/components/DynamicProviders';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '229925102759-7i5onko9abood1l0r1iih5738fvct6a1.apps.googleusercontent.com'}>
      {children}
    </Providers>
  );
}
