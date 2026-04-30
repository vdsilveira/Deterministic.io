import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'README';
  const lang = searchParams.get('lang') || '';
  
  const docsDir = path.join(process.cwd(), 'docs');
  const fileName = `${slug}${lang}.md`;
  const filePath = path.join(docsDir, fileName);

  if (!fs.existsSync(filePath)) {
    const fallbackFileName = `${slug}.md`;
    const fallbackPath = path.join(docsDir, fallbackFileName);
    if (!fs.existsSync(fallbackPath)) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    const fallbackContents = fs.readFileSync(fallbackPath, 'utf8');
    const { content, data } = matter(fallbackContents);
    return NextResponse.json({ content, data, fileName: fallbackFileName });
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);
    
    return NextResponse.json({ content, data, fileName });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read document' }, { status: 500 });
  }
}