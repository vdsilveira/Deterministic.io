import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
