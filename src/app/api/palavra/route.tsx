import { kv } from '@vercel/kv';
import { NextResponse, NextRequest } from 'next/server';
 
export async function GET() {
    const data = await kv.json.get('palavras');
    let palavras = data['Palavras'];
    let totalPalavras: number = Object.keys(palavras).length;
    const indicePalavraSorteada =  Math.floor(Math.random() * totalPalavras)
    const palavra = palavras[indicePalavraSorteada];
    return NextResponse.json(palavra);
  }