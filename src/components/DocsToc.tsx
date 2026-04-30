'use client';

import { useState, useEffect } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function DocsToc({ headings, titleLabel = 'On this page' }: { headings: TocItem[]; titleLabel?: string }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="docs-toc">
      <h4 className="docs-toc-title">{titleLabel}</h4>
      <ul className="docs-toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className={`docs-toc-item level-${heading.level}`}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`docs-toc-link ${activeId === heading.id ? 'active' : ''}`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}