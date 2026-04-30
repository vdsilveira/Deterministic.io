'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const translations = {
  'pt-BR': {
    title: 'Gostou do projeto? Apoie o desenvolvedor',
    subtitle: 'Contribua para que esta ferramenta continue gratuita, segura e offline. Sua doação ajuda a manter a soberania digital ao alcance de todos.',
    onchainTitle: 'Camada Principal',
    onchainDesc: 'Ideal para doações maiores ou para quem prefere a rede principal.',
    lightningTitle: 'Pagamento Instantâneo',
    lightningDesc: 'Ideal para micro-doações sem taxas.',
    bitcoinAddress: 'bc1qrn77hx7u8dylxnhvxk7l4eftgrdn7xheyx62l2',
    lightningAddress: 'mountaineffervescent27732@getalby.com',
  },
  en: {
    title: 'Like the project? Support the developer',
    subtitle: 'Help keep this tool free, secure, and offline. Your donation helps maintain digital sovereignty within everyone\'s reach.',
    onchainTitle: 'Main Layer',
    onchainDesc: 'Ideal for larger donations or those who prefer the main network.',
    lightningTitle: 'Instant Payment',
    lightningDesc: 'Perfect for micro-donations with zero fees.',
    bitcoinAddress: 'bc1qrn77hx7u8dylxnhvxk7l4eftgrdn7xheyx62l2',
    lightningAddress: 'mountaineffervescent27732@getalby.com',
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const [bitcoinQR, setBitcoinQR] = useState<string>('');
  const [lightningQR, setLightningQR] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    import('qrcode').then((QRCode) => {
      QRCode.toDataURL(t.bitcoinAddress, { width: 128, margin: 2 })
        .then((url: string) => setBitcoinQR(url))
        .catch((err: Error) => console.error('QR Code error:', err));

      QRCode.toDataURL(`lightning:${t.lightningAddress}`, { width: 128, margin: 2 })
        .then((url: string) => setLightningQR(url))
        .catch((err: Error) => console.error('QR Code error:', err));
    });
  }, [language]);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Lottie Animation - Top Right */}
        <div className="footer-lottie">
          <DotLottieReact
            src="https://lottie.host/c3d57b41-1027-4012-b09a-e7ff07580d64/6HkMtjEyi6.lottie"
            loop
            autoplay
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      
        <h2 className="footer-title">{t.title}</h2>
        <p className="footer-subtitle">{t.subtitle}</p>
         
        <div className="donation-grid">
          {/* On-chain */}
          <div className="donation-card">
            <div className="donation-icon">₿</div>
            <h3 className="donation-type">{t.onchainTitle}</h3>
            <div className="qr-code">
              {bitcoinQR && <img src={bitcoinQR} alt="Bitcoin QR Code" style={{width: '100px', height: '100px'}} />}
            </div>
            <div className="address-container">
              <code className="address">{t.bitcoinAddress}</code>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(t.bitcoinAddress, 'bitcoin')}
                title="Copiar endereço"
              >
                {copiedField === 'bitcoin' ? (
                  <span>✓</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
            <p className="donation-desc">{t.onchainDesc}</p>
          </div>
         
          {/* Lightning */}
          <div className="donation-card">
            <div className="donation-icon">⚡</div>
            <h3 className="donation-type">{t.lightningTitle}</h3>
            <div className="qr-code">
              {lightningQR && <img src={lightningQR} alt="Lightning QR Code" style={{width: '100px', height: '100px'}} />}
            </div>
            <div className="address-container">
              <code className="address">{t.lightningAddress}</code>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(t.lightningAddress, 'lightning')}
                title="Copiar endereço"
              >
                {copiedField === 'lightning' ? (
                  <span>✓</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
            <p className="donation-desc">{t.lightningDesc}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}