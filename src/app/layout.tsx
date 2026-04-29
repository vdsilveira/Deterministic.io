import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Deterministic - BTC Key Generator',
  description: 'Generate Bitcoin keys deterministically from 11 texts or files. Supports BIP84, BIP49, and BIP86.',
  metadataBase: new URL('https://deterministic.io'),
  icons: {
    icon: '/images/newfavicon.png',
  },
  openGraph: {
    title: 'Deterministic - BTC Key Generator',
    description: 'Generate Bitcoin keys deterministically from 11 inputs.',
    images: ['/images/bannerImg.png'],
    url: 'https://deterministic.io',
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
