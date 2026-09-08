"use client";
import dynamic from 'next/dynamic';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthProvider = dynamic(
  () => import('@/src/context/AuthContext').then(mod => mod.AuthProvider),
  { ssr: false }
);

export function Providers({ children, clientId }: { children: React.ReactNode, clientId: string }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
