'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import DocsToc from '@/components/DocsToc';
import { useLanguage } from '@/context/LanguageContext';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const h1Match = line.match(/^#\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h1Match) {
      headings.push({
        id: h1Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        text: h1Match[1],
        level: 1,
      });
    } else if (h2Match) {
      headings.push({
        id: h2Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        text: h2Match[1],
        level: 2,
      });
    } else if (h3Match) {
      headings.push({
        id: h3Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        text: h3Match[1],
        level: 3,
      });
    }
  }

  return headings;
}

export default function DocsPage() {
  const { language } = useLanguage();
  const langSuffix = language === 'pt-BR' ? '.pt' : '';
  
  const [doc, setDoc] = useState<{ content: string } | null>(null);
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/docs/content?slug=README&lang=${langSuffix}`)
      .then(res => res.json())
      .then(data => {
        if (data.content) {
          setDoc(data);
          setHeadings(extractHeadings(data.content));
        }
      })
      .catch(() => {
        setDoc(null);
      })
      .finally(() => setLoading(false));
  }, [langSuffix]);

  const tocLabels = {
    'pt-BR': 'Nesta página',
    'en': 'On this page',
  };

  if (loading) {
    return (
      <div className="docs-container">
        <article className="docs-article">
          <p className="docs-p">Loading...</p>
        </article>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="docs-container">
        <article className="docs-article">
          <p className="docs-p">Document not found</p>
        </article>
      </div>
    );
  }

  return (
    <div className="docs-container">
      <article className="docs-article">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            h1: ({ children }) => <h1 className="docs-h1">{children}</h1>,
            h2: ({ children }) => <h2 className="docs-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="docs-h3">{children}</h3>,
            p: ({ children }) => <p className="docs-p">{children}</p>,
            ul: ({ children }) => <ul className="docs-ul">{children}</ul>,
            ol: ({ children }) => <ol className="docs-ol">{children}</ol>,
            li: ({ children }) => <li className="docs-li">{children}</li>,
            a: ({ href, children }) => (
              <a href={href as string} className="docs-a" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            blockquote: ({ children }) => <blockquote className="docs-blockquote">{children}</blockquote>,
            code: ({ className, children }) => {
              const isInline = !className;
              if (isInline) {
                return <code className="docs-code-inline">{children}</code>;
              }
              return <code className={className}>{children}</code>;
            },
            pre: ({ children }) => <pre className="docs-pre">{children}</pre>,
            table: ({ children }) => <table className="docs-table">{children}</table>,
            thead: ({ children }) => <thead className="docs-thead">{children}</thead>,
            tbody: ({ children }) => <tbody className="docs-tbody">{children}</tbody>,
            tr: ({ children }) => <tr className="docs-tr">{children}</tr>,
            th: ({ children }) => <th className="docs-th">{children}</th>,
            td: ({ children }) => <td className="docs-td">{children}</td>,
            hr: () => <hr className="docs-hr" />,
            img: ({ src, alt }) => <img src={src as string} alt={alt as string} className="docs-img" />,
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </article>
      <DocsToc headings={headings} titleLabel={tocLabels[language]} />
    </div>
  );
}