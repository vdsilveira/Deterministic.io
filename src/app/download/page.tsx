'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  'pt-BR': {
    title: 'Download',
    downloadDesc: 'Faça download e gere suas chaves offline',
    offlineCopy: 'Independência Digital e Soberania Total\n\nO padrão ouro na custódia de ativos digitais é o isolamento. Ao gerar suas chaves em um ambiente offline, você elimina qualquer rastro digital e protege sua semente de ataques remotos.\n\nEmbora nossa plataforma execute toda a lógica de forma local e privada em seu navegador, acreditamos que a segurança nunca é excessiva. Nenhum dado, chave ou arquivo jamais deixa o seu dispositivo. Para aqueles que buscam o controle absoluto, oferecemos as ferramentas abaixo para operação em ambiente totalmente desconectado.',
    entropyWarning: '⚠️ Aviso importante: Se você utilizar arquivos como fonte de entropia, deve manter os arquivos originais salvos. Devido à natureza da criptografia de hash, qualquer alteração nos arquivos impactará diretamente na geração determinística das chaves. Além disso, a ordem em que os arquivos são passados nos até 11 campos deve ser estritamente mantida.',
    linux: 'Linux',
    windows: 'Windows',
    mac: 'Mac',
    downloadFor: 'Download para',
  },
  en: {
    title: 'Download',
    downloadDesc: 'Download and generate your keys offline',
    offlineCopy: 'Digital Independence and Total Sovereignty\n\nThe gold standard for digital asset custody is isolation. By generating your keys in an offline environment, you eliminate any digital footprint and protect your seed from remote attacks.\n\nAlthough our platform executes all logic locally and privately in your browser, we believe security is never excessive. No data, keys, or files ever leave your device. For those seeking absolute control, we offer the tools below for operation in a fully disconnected environment.',
    entropyWarning: '⚠️ Important Warning: If you use files as entropy sources, you must keep the original files saved. Due to the nature of hash cryptography, any modification to the files will directly impact the deterministic key generation. Additionally, the order in which files are passed in the up to 11 fields must be strictly maintained.',
    linux: 'Linux',
    windows: 'Windows',
    mac: 'Mac',
    downloadFor: 'Download for',
  },
};

export default function Download() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="container">
      <div className="utility-bar">
        <Link href="/" className="back-link">
          {language === 'pt-BR' ? '← Voltar' : '← Back'}
        </Link>
        <div className="links">
          <button className="lang-toggle" onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}>
            {language === 'pt-BR' ? '🇺🇸 EN' : '🇧🇷 PT'}
          </button>
          <a href="https://github.com/vdsilveira/Deterministic.Online" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href="/docs">Docs</Link>
        </div>
      </div>

      <div className="download-header">
        <h1>{t.title}</h1>
        <p>{t.downloadDesc}</p>
      </div>

      <div className="offline-copy">
        {t.offlineCopy.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="download-grid">
        <div className="download-card">
          <Image src="/images/linux-logo.png" alt="Linux" width={80} height={80} className="os-logo-img" />
          <h3>{t.linux}</h3>
          <Link href="#linux" className="download-card-link">
            {t.downloadFor} {t.linux}
          </Link>
        </div>

        <div className="download-card">
          <Image src="/images/windows-logo.png" alt="Windows" width={80} height={80} className="os-logo-img" />
          <h3>{t.windows}</h3>
          <Link href="#windows" className="download-card-link">
            {t.downloadFor} {t.windows}
          </Link>
        </div>

        <div className="download-card">
          <Image src="/images/MAC-logo.png" alt="Mac" width={80} height={80} className="os-logo-img" />
          <h3>{t.mac}</h3>
          <Link href="#mac" className="download-card-link">
            {t.downloadFor} {t.mac}
          </Link>
        </div>
      </div>

      <div className="entropy-warning">
        {t.entropyWarning}
      </div>
    </div>
  );
}
