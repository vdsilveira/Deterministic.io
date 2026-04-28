'use client';

import { useState, useCallback } from 'react';
import { processInputs } from '@/lib/bip39';
import { mnemonicToSeed, deriveKeyPair } from '@/lib/bitcoin';

const translations = {
  'pt-BR': {
    heroSubtitle: 'Gere endereços Bitcoin seguros a partir de 11 textos ou arquivos. Cada campo = 1 input. Preencha todos os 11 campos.',
    cta: 'Começar',
    inputPlaceholder: (id: number) => `Campo ${id}: Digite texto ou carregue arquivo...`,
    error: (count: number) => `Você precisa preencher todos os 11 campos. Atual: ${count}/11`,
    clearAll: 'Limpar Tudo',
    generate: 'GERAR CHAVES',
    generating: 'GERANDO...',
    resultAddresses: 'ENDEREÇOS',
    resultWif: 'CHAVE PRIVADA (WIF)',
    warning: '⚠️ Aviso: Este site é apenas para fins educacionais. Não use com valores reais.',
  },
  en: {
    heroSubtitle: 'Securely generate Bitcoin addresses from 11 texts or files. Each field = 1 input. Fill all 11 fields.',
    cta: 'Get Started',
    inputPlaceholder: (id: number) => `Field ${id}: Type text or upload file...`,
    error: (count: number) => `You need to fill all 11 fields. Current: ${count}/11`,
    clearAll: 'Clear All',
    generate: 'GENERATE KEYS',
    generating: 'GENERATING...',
    resultAddresses: 'ADDRESSES',
    resultWif: 'PRIVATE KEY (WIF)',
    warning: '⚠️ Warning: This site is for educational purposes only. Do not use with real funds.',
  },
};

interface InputField {
  id: number;
  type: 'text' | 'file';
  content: string;
  fileName?: string;
}

export interface Result {
  seedPhrase: string;
  bip84: { address: string; wif: string };
  bip49: { address: string; wif: string };
  bip86: { address: string; wif: string };
}

export default function Home() {
  const [language, setLanguage] = useState<'pt-BR' | 'en'>('pt-BR');
  const t = translations[language];

  const [inputs, setInputs] = useState<InputField[]>(
    Array.from({ length: 11 }, (_, i) => ({ id: i + 1, type: 'text', content: '', fileName: undefined }))
  );
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filledCount = inputs.filter(i => i.content.trim().length > 0).length;

  const updateInput = (id: number, content: string) => {
    setInputs(prev => prev.map(input => 
      input.id === id ? { ...input, content, type: 'text', fileName: undefined } : input
    ));
  };

  const handleFileSelect = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setInputs(prev => prev.map(input => 
        input.id === id ? { 
          id, 
          type: 'file', 
          content: e.target?.result as string || file.name,
          fileName: file.name 
        } : input
      ));
    };
    reader.readAsText(file);
  };

  const clearField = (id: number) => {
    setInputs(prev => prev.map(input => 
      input.id === id ? { ...input, content: '', type: 'text', fileName: undefined } : input
    ));
  };

  const clearAll = () => {
    setInputs(prev => prev.map(input => ({ ...input, content: '', type: 'text', fileName: undefined })));
    setResult(null);
    setError('');
  };

  const handleGenerate = async () => {
    setError('');
    
      if (filledCount < 11) {
        setError(t.error(filledCount));
        return;
      }

    setLoading(true);
    try {
      const textContent = inputs.map(i => i.content).join('\n');
      
      const processed = processInputs(textContent, []);
      
      if (!processed.seedPhrase) {
        throw new Error('Failed to generate seed phrase');
      }

      const seed = await mnemonicToSeed(processed.seedPhrase);
      
      const bip84 = deriveKeyPair(seed, "m/84'/0'/0'/0/0");
      const bip49 = deriveKeyPair(seed, "m/49'/0'/0'/0/0");
      const bip86 = deriveKeyPair(seed, "m/86'/0'/0'/0/0");
      
      setResult({
        seedPhrase: processed.seedPhrase,
        bip84: { address: bip84.address, wif: bip84.wif },
        bip49: { address: bip49.address, wif: bip49.wif },
        bip86: { address: bip86.address, wif: bip86.wif },
      });
    } catch (err) {
      console.error('Error generating keys:', err);
      setError('Erro ao gerar chaves. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container">
      <div className="utility-bar">
        <span className="logo">Deterministic</span>
        <div className="links">
          <button className="lang-toggle" onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}>
            {language === 'pt-BR' ? '🇺🇸 EN' : '🇧🇷 PT'}
          </button>
          <span>GitHub</span>
          <span>Docs</span>
        </div>
      </div>

      {/* Hero Grid - Bento Style */}
      <div className="hero-grid">
        {/* Title Tile - Inverse */}
        <div className="title-tile">
          <h1>Deterministic</h1>
          <p>{t.heroSubtitle}</p>
          <button className="cta-button" onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.cta}
          </button>
        </div>

        {/* Input Tile - White */}
        <div className="input-tile">
          <div className="input-header">
            <span className="input-label">INPUTS</span>
            <span className={`input-count ${filledCount >= 11 ? 'complete' : ''}`}>
              {filledCount}/11
            </span>
          </div>

          <div className="fields-container">
            {inputs.map((input) => (
              <div key={input.id} className={`field-row ${input.content ? 'filled' : ''}`}>
                <span className="field-number">[{input.id}]</span>
                <textarea
                  className="field-input"
                  placeholder={t.inputPlaceholder(input.id)}
                  value={input.type === 'text' ? input.content : ''}
                  onChange={(e) => updateInput(input.id, e.target.value)}
                  disabled={input.type === 'file'}
                />
                <label className="file-btn">
                  <span>📁</span>
                  <input
                    type="file"
                    className="file-input-hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(input.id, file);
                    }}
                  />
                </label>
                <button 
                  className="clear-btn" 
                  onClick={() => clearField(input.id)}
                  disabled={!input.content}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="btn-group">
            <button className="btn-secondary" onClick={clearAll}>
              {t.clearAll}
            </button>
            <button 
              className="generate-button" 
              onClick={handleGenerate}
              disabled={filledCount < 11 || loading}
            >
              {loading ? t.generating : t.generate}
            </button>
          </div>

          {result && (
            <div className="results-area">
              <span className="result-label">SEED PHRASE</span>
              <div className="seed-phrase">
                {result.seedPhrase}
                <button className="copy-btn" onClick={() => copyToClipboard(result.seedPhrase)}>Copy</button>
              </div>

               <span className="result-label">{t.resultAddresses}</span>
              <div className="address-grid">
                <div className="address-card">
                  <span className="bip-badge">BIP84</span>
                  <span className="address-value">{result.bip84.address}</span>
                  <button className="copy-btn" onClick={() => copyToClipboard(result.bip84.address)}>Copy</button>
                </div>
                <div className="address-card">
                  <span className="bip-badge">BIP49</span>
                  <span className="address-value">{result.bip49.address}</span>
                  <button className="copy-btn" onClick={() => copyToClipboard(result.bip49.address)}>Copy</button>
                </div>
                <div className="address-card">
                  <span className="bip-badge">BIP86</span>
                  <span className="address-value">{result.bip86.address}</span>
                  <button className="copy-btn" onClick={() => copyToClipboard(result.bip86.address)}>Copy</button>
                </div>
              </div>

               <span className="result-label">{t.resultWif}</span>
              <div className="wif-value">
                {result.bip84.wif}
                <button className="copy-btn" onClick={() => copyToClipboard(result.bip84.wif)}>Copy</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Strip */}
      <div className="trust-strip">
        <span>🔒 Client-side only</span>
        <span>⚡ Fast generation</span>
        <span>🔑 BIP84/49/86</span>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-badge">BIP84</span>
          <span className="feature-desc">Native SegWit<br/>bc1q...</span>
        </div>
        <div className="feature-card">
          <span className="feature-badge">BIP49</span>
          <span className="feature-desc">Nested SegWit<br/>3...</span>
        </div>
        <div className="feature-card">
          <span className="feature-badge">BIP86</span>
          <span className="feature-desc">Taproot<br/>bc1p...</span>
        </div>
      </div>

      {/* Warning */}
      <div className="warning">
        <span className="warning-text">{t.warning}</span>
      </div>
    </div>
  );
}