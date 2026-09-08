import '@/src/index.css';
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('./ClientLayout').then(mod => mod.ClientLayout), { ssr: false });

export const metadata = {
  title: 'FitandBeat',
  description: 'Your personal fitness companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
export const revalidate = 0;
