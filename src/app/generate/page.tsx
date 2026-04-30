'use client';

import { useState } from 'react';
import Link from 'next/link';
import { processInputs, InputData } from '@/lib/bip39';
import { mnemonicToSeed, deriveKeyPair } from '@/lib/bitcoin';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  'pt-BR': {
    back: '← Voltar',
    title: 'Gerar Chaves',
    inputPlaceholder: (id: number) => `Campo ${id}: Digite texto ou carregue arquivo...`,
    error: (count: number) => `Você precisa preencher pelo menos 4 campos. Atual: ${count}/11`,
    clearAll: 'Limpar Tudo',
    generate: 'GERAR CHAVES',
    generating: 'GERANDO...',
    resultAddresses: 'ENDEREÇOS',
    resultWif: 'CHAVE PRIVADA (WIF)',
    copy: 'Copiar',
    download: 'Download',
    downloadDesc: 'Faça download e gere suas chaves offline',
    entropyWarning: '⚠️ Aviso importante: Se você utilizar arquivos como fonte de entropia, deve manter os arquivos originais salvos. Devido à natureza da criptografia de hash, qualquer alteração nos arquivos impactará diretamente na geração determinística das chaves. Além disso, a ordem em que os arquivos são passados nos até 11 campos deve ser estritamente mantida.',
    securityNote: 'Quanto mais campos únicos você preencher, mais segura será sua semente.',
  },
  en: {
    back: '← Back',
    title: 'Generate Keys',
    inputPlaceholder: (id: number) => `Field ${id}: Type text or upload file...`,
    error: (count: number) => `You need to fill at least 4 fields. Current: ${count}/11`,
    clearAll: 'Clear All',
    generate: 'GENERATE KEYS',
    generating: 'GENERATING...',
    resultAddresses: 'ADDRESSES',
    resultWif: 'PRIVATE KEY (WIF)',
    copy: 'Copy',
    download: 'Download',
    downloadDesc: 'Download and generate your keys offline',
    entropyWarning: '⚠️ Important Warning: If you use files as entropy sources, you must keep the original files saved. Due to the nature of hash cryptography, any modification to the files will directly impact the deterministic key generation. Additionally, the order in which files are passed in the up to 11 fields must be strictly maintained.',
    securityNote: 'The more unique fields you fill, the more secure your seed will be.',
  },
};

interface InputField {
  id: number;
  type: 'text' | 'file';
  content: string;
  fileName?: string;
  isBase64?: boolean;
}

export interface Result {
  seedPhrase: string;
  bip84: { address: string; wif: string };
  bip49: { address: string; wif: string };
  bip86: { address: string; wif: string };
}

export default function Generate() {
  const { language, setLanguage } = useLanguage();
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
      const dataUrl = e.target?.result as string;
      // dataUrl format: "data:application/octet-stream;base64,ACTUAL_BASE64"
      const base64 = dataUrl.split(',')[1]; // Extrai apenas a parte base64

      setInputs(prev => prev.map(input =>
        input.id === id ? {
          ...input,
          type: 'file',
          content: base64,
          fileName: file.name,
          isBase64: true
        } : input
      ));
    };
    reader.readAsDataURL(file);
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

    if (filledCount < 4) {
      setError(t.error(filledCount));
      return;
    }

    setLoading(true);
    try {
      const inputData: InputData[] = inputs.map(i => ({
        content: i.content,
        isBase64: i.isBase64 || false
      }));

      const processed = processInputs(inputData);

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
          <a href="https://github.com/vdsilveira/Deterministic.Online" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://vdsilveira.gitbook.io/documents" target="_blank" rel="noopener noreferrer">Docs</a>
        </div>
      </div>

      <div className="generate-header">
        <h1>{t.title}</h1>
        {t.securityNote && (
          <p style={{ 
            fontSize: '14px', 
            color: filledCount >= 4 ? '#000' : '#FF9800',
            marginTop: '8px', 
            fontWeight: filledCount >= 4 ? 700 : 400 
          }}>
            {t.securityNote}
          </p>
        )}
      </div>
      
      {/* Input Tile */}
      <div className="input-tile">
        <div className="input-header">
          <span className="input-label">INPUTS</span>
          <span className={`input-count ${filledCount >= 4 ? 'complete' : ''}`} style={{ 
            color: filledCount >= 4 ? '#000' : '#FF9800',
            fontWeight: filledCount >= 4 ? 700 : 400 
          }}>
            {filledCount}/11
          </span>
        </div>

        <div className="fields-container">
          {inputs.map((input) => (
            <div key={input.id} className={`field-row ${input.content ? 'filled' : ''}`}>
              <span className="field-number">[{input.id}]</span>
              
              {input.type === 'text' ? (
                <>
                  <textarea
                    className="field-input"
                    placeholder={t.inputPlaceholder(input.id)}
                    value={input.content}
                    onChange={(e) => updateInput(input.id, e.target.value)}
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
                </>
              ) : (
                <>
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
                  <span className="file-name">{input.fileName}</span>
                </>
              )}
              
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
              disabled={filledCount < 4 || loading}
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

      {/* Download Section */}
      <div className="executable-section">
        <p className="executable-desc">{t.downloadDesc}</p>
        <Link href="/download" className="executable-btn">
          📦 {t.download}
        </Link>
      </div>

      {/* Entropy Warning */}
      <div className="entropy-warning">
        {t.entropyWarning}
      </div>

    </div>
  );
}
