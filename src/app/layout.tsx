import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Deterministic',
  description: 'Gere endereços Bitcoin e chaves privadas deterministicamente a partir de 11 textos ou arquivos',
  metadataBase: new URL('https://deterministic.example.com'),
  icons: {
    icon: '/images/newfavicon.png',
  },
  openGraph: {
    images: ['/images/bannerImg.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
