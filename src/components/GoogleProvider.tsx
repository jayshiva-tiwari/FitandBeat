"use client";
import dynamic from 'next/dynamic';

const GoogleOAuthProvider = dynamic(
  () => import('@react-oauth/google').then(mod => mod.GoogleOAuthProvider),
  { ssr: false }
);

export function GoogleProvider({ children, clientId }: { children: React.ReactNode, clientId: string }) {
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
