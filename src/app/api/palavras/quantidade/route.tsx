import { kv } from '@vercel/kv';
import { NextResponse, NextRequest } from 'next/server';
 
export async function GET() {
  const quantidadePalavras = await kv.json.arrlen('palavras', '$.[*]');
  console.log(quantidadePalavras);
  return NextResponse.json(quantidadePalavras);
}