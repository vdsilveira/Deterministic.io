'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

type DocFile = {
  slug: string;
  title: string;
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [docs, setDocs] = useState<DocFile[]>([]);
  const [loading, setLoading] = useState(true);

  const labels = {
    'pt-BR': {
      siteLink: '← Site',
      title: 'Documentação',
      loading: 'Carregando...',
      home: 'Home',
    },
    'en': {
      siteLink: '← Site',
      title: 'Documentation',
      loading: 'Loading...',
      home: 'Home',
    },
  };

  const t = labels[language];

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setDocs(data))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  }, []);

  const formatTitle = (slug: string): string => {
    if (slug === 'README') return t.home;
    return slug
      .replace(/\.md$/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="docs-layout">
      {/* Left Sidebar */}
      <aside className="docs-sidebar">
        <div className="docs-sidebar-header">
          <Link href="/" className="docs-home-link">
            {t.siteLink}
          </Link>
          <h2 className="docs-sidebar-title">{t.title}</h2>
        </div>
        <nav className="docs-sidebar-nav">
          {loading ? (
            <div className="docs-loading">{t.loading}</div>
          ) : (
            <ul className="docs-nav-list">
              {docs.map(doc => (
                <li key={doc.slug}>
                  <Link
                    href={doc.slug === 'README' ? '/docs' : `/docs/${doc.slug.replace(/\.md$/, '')}`}
                    className="docs-nav-link"
                  >
                    {formatTitle(doc.slug)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="docs-main">
        {children}
      </main>
    </div>
  );
}