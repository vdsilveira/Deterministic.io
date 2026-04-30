import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'README';
  const lang = searchParams.get('lang') || '';
  
  const docsDir = path.join(process.cwd(), 'docs');
  
  // Try file with lang suffix: README.pt.md or README.eng.md
  const langSuffix = lang ? `.${lang.replace(/^\./, '')}` : '';
  const fileName = `${slug}${langSuffix}.md`;
  const filePath = path.join(docsDir, fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { content, data } = matter(fileContents);
      return NextResponse.json({ content, data, fileName });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to read document' }, { status: 500 });
    }
  }
  
  // Fallback: try without lang suffix (README.md)
  const fallbackFileName = `${slug}.md`;
  const fallbackPath = path.join(docsDir, fallbackFileName);
  
  if (fs.existsSync(fallbackPath)) {
    const fallbackContents = fs.readFileSync(fallbackPath, 'utf8');
    const { content, data } = matter(fallbackContents);
    return NextResponse.json({ content, data, fileName: fallbackFileName });
  }
  
  return NextResponse.json({ error: 'Document not found' }, { status: 404 });
}

// Force dynamic to avoid static generation issues
export const dynamic = 'force-dynamic';
