import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const docsDir = path.join(process.cwd(), 'docs');
  
  try {
    const files = fs.readdirSync(docsDir);
    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .sort()
      .map(slug => ({ slug }));
    
    return NextResponse.json(markdownFiles);
  } catch (error) {
    return NextResponse.json([]);
  }
}