import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from 'next/server';
 
export async function GET() {
    let palavras = await sql`SELECT * from palavras`;
    let totalPalavras: number = Object.keys(palavras.rows).length;
    const indicePalavraSorteada =  Math.floor(Math.random() * totalPalavras)
    const palavra = palavras.rows[indicePalavraSorteada];
    return NextResponse.json(palavra);
  }