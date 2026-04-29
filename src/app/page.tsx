'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  'pt-BR': {
    heroSubtitle: 'Gere endereços Bitcoin seguros a partir de 11 textos ou arquivos. Cada campo = 1 input. Preencha todos os 11 campos.',
    cta: 'Começar',
    ctaDesc: 'Pronto para gerar?',
    ctaButton: 'Get Started →',
    trust: ['🔒 Apenas cliente', '⚡ Geração rápida', '🔑 BIP84/49/86'] as const,
    features: [
      { badge: 'BIP84', desc: 'Native SegWit\nbc1q...' },
      { badge: 'BIP49', desc: 'Nested SegWit\n3...' },
      { badge: 'BIP86', desc: 'Taproot\nbc1p...' },
    ],
   },
   en: {
     heroSubtitle: 'Securely generate Bitcoin addresses from 11 texts or files. Each field = 1 input. Fill all 11 fields.',
     cta: 'Get Started',
     ctaDesc: 'Ready to Generate?',
     ctaButton: 'Get Started →',
     trust: ['🔒 Client-side only', '⚡ Fast generation', '🔑 BIP84/49/86'] as const,
     features: [
       { badge: 'BIP84', desc: 'Native SegWit\nbc1q...' },
       { badge: 'BIP49', desc: 'Nested SegWit\n3...' },
       { badge: 'BIP86', desc: 'Taproot\nbc1p...' },
     ],
   },
};

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="container">
      <div className="utility-bar">
        <div className="links">
          <button className="lang-toggle" onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}>
            {language === 'pt-BR' ? '🇺🇸 EN' : '🇧🇷 PT'}
          </button>
          <a href="https://github.com/vdsilveira/Deterministic.io" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://github.com/vdsilveira/Deterministic.io#readme" target="_blank" rel="noopener noreferrer">Docs</a>
        </div>
      </div>

      {/* Hero Grid - Bento Style */}
      <div className="hero-grid">
        {/* Title Tile - Inverse */}
        <div className="title-tile">
          <div className="logo-bg">
            <Image src="/images/logo.png" alt="Deterministic" fill className="logo-img" />
          </div>
          <h1>Deterministic</h1>
          <p>{t.heroSubtitle}</p>
        </div>

        {/* CTA Tile - White */}
        <div className="cta-tile">
          <span className="cta-desc">{t.ctaDesc}</span>
          <Link href="/generate" className="cta-button">{t.ctaButton}</Link>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="trust-strip">
        {t.trust.map((item, i) => <span key={i}>{item}</span>)}
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {t.features.map((f, i) => (
          <div className="feature-card" key={i}>
            <span className="feature-badge">{f.badge}</span>
            <span className="feature-desc">{f.desc.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
