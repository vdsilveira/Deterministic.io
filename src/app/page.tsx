'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  'pt-BR': {
    heroSubtitle: 'Gere endereços Bitcoin seguros a partir de 11 textos ou arquivos. Cada campo = 1 input. Preencha de 4 a 11 campos para gerar.',
    cta: 'Começar',
    ctaDesc: 'Pronto para gerar?',
    ctaButton: 'Get Started →',
    visionContent: [
      { title: 'Insumos Customizáveis', text: 'Diferente do padrão BIP39, aqui você escolhe. Use frases memoráveis ou arquivos. Com apenas 4 campos, sua semente ganha vida.', image: '/images/carousel/insumos.svg' },
      { title: 'Backup Mental e Digital', text: 'Sua chave está na sua cabeça ou em arquivos que você já faz backup naturalmente. É a prova de perdas físicas.', image: '/images/carousel/backup.svg' },
      { title: 'Execução Client-Side', text: 'Processo matemático fixo. Tudo ocorre offline no navegador: não vemos seus dados, não guardamos sua privacidade.', image: '/images/carousel/clientside.svg' }
    ],
    visionClosing: 'Segurança não precisa ser difícil. Precisa ser lógica.'
   },
   en: {
     heroSubtitle: 'Securely generate Bitcoin addresses from 11 texts or files. Each field = 1 input. Fill 4 to 11 fields to generate.',
     cta: 'Get Started',
     ctaDesc: 'Ready to Generate?',
     ctaButton: 'Get Started →',
     visionContent: [
       { title: 'Customizable Inputs', text: 'Unlike BIP39 standard, here you choose. Use memorable phrases or files. With just 4 fields, your seed comes to life.', image: '/images/carousel/insumos.svg' },
       { title: 'Mental & Digital Backup', text: 'Your key is in your head or in files you already naturally backup. Proof against physical losses.', image: '/images/carousel/backup.svg' },
       { title: 'Client-Side Execution', text: 'Fixed mathematical process. Everything happens offline in the browser: we don\'t see your data, we don\'t store anything.', image: '/images/carousel/clientside.svg' }
     ],
     visionClosing: 'Security doesn\'t need to be hard. It needs to be logical.'
   },
};

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlides = translations[language].visionContent.length;
        return (prev + 1) % maxSlides;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="container">
      <div className="utility-bar">
        <div /> {/* Spacer for flexbox */}
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

      {/* Vision Slideshow */}
      <div className="slideshow-container">
        {t.visionContent.map((card, index) => (
          <div 
            key={index}
            className={`slideshow-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-bg">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="slide-image"
                onError={(e) => { e.currentTarget.src = '/images/carousel/placeholder.svg'; }}
              />
              <div className="slide-overlay" />
            </div>
            <div className="slide-content">
              <h3 className="slide-title">{card.title}</h3>
              <p className="slide-text">{card.text}</p>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="slide-indicators">
          {t.visionContent.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <p className="vision-closing">{t.visionClosing}</p>

    </div>
  );
}
