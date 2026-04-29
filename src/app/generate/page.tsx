'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { processInputs } from '@/lib/bip39';
import { mnemonicToSeed, deriveKeyPair } from '@/lib/bitcoin';

const translations = {
  'pt-BR': {
    back: '← Voltar',
    title: 'Gerar Chaves',
    inputPlaceholder: (id: number) => `Campo ${id}: Digite texto ou carregue arquivo...`,
    error: (count: number) => `Você precisa preencher todos os 11 campos. Atual: ${count}/11`,
    clearAll: 'Limpar Tudo',
    generate: 'GERAR CHAVES',
    generating: 'GERANDO...',
    resultAddresses: 'ENDEREÇOS',
    resultWif: 'CHAVE PRIVADA (WIF)',
    copy: 'Copiar',
    downloadExecutable: 'Baixar Executável',
    comingSoon: 'Em breve',
    warning: '⚠️ Aviso: Este site é apenas para fins educacionais. Não use com valores reais.',
  },
  en: {
    back: '← Back',
    title: 'Generate Keys',
    inputPlaceholder: (id: number) => `Field ${id}: Type text or upload file...`,
    error: (count: number) => `You need to fill all 11 fields. Current: ${count}/11`,
    clearAll: 'Clear All',
    generate: 'GENERATE KEYS',
    generating: 'GENERATING...',
    resultAddresses: 'ADDRESSES',
    resultWif: 'PRIVATE KEY (WIF)',
    copy: 'Copy',
    downloadExecutable: 'Download Executable',
    comingSoon: 'Coming Soon',
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

export default function Generate() {
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
        <Link href="/" className="back-link">
          {t.back}
        </Link>
        <div className="links">
          <button className="lang-toggle" onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}>
            {language === 'pt-BR' ? '🇺🇸 EN' : '🇧🇷 PT'}
          </button>
          <a href="https://github.com/vdsilveira/Deterministic.io" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://github.com/vdsilveira/Deterministic.io#readme" target="_blank" rel="noopener noreferrer">Docs</a>
        </div>
      </div>

      <div className="generate-header">
        <h1>{t.title}</h1>
      </div>

      {/* Input Tile */}
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
              <button className="copy-btn" onClick={() => copyToClipboard(result.seedPhrase)}>{t.copy}</button>
            </div>

            <span className="result-label">{t.resultAddresses}</span>
            <div className="address-grid">
              <div className="address-card">
                <span className="bip-badge">BIP84</span>
                <span className="address-value">{result.bip84.address}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(result.bip84.address)}>{t.copy}</button>
              </div>
              <div className="address-card">
                <span className="bip-badge">BIP49</span>
                <span className="address-value">{result.bip49.address}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(result.bip49.address)}>{t.copy}</button>
              </div>
              <div className="address-card">
                <span className="bip-badge">BIP86</span>
                <span className="address-value">{result.bip86.address}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(result.bip86.address)}>{t.copy}</button>
              </div>
            </div>

            <span className="result-label">{t.resultWif}</span>
            <div className="wif-value">
              {result.bip84.wif}
              <button className="copy-btn" onClick={() => copyToClipboard(result.bip84.wif)}>{t.copy}</button>
            </div>
          </div>
        )}
      </div>

      {/* Executable Download (Mocked) */}
      <div className="executable-section">
        <button className="executable-btn disabled" disabled>
          📦 {t.downloadExecutable}
          <span className="coming-soon-badge">{t.comingSoon}</span>
        </button>
      </div>

      {/* Warning */}
      <div className="warning">
        <span className="warning-text">{t.warning}</span>
      </div>
    </div>
  );
}
