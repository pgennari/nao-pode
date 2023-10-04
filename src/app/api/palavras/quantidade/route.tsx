import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from 'next/server';
 
export async function GET() {
  const quantidadePalavras = await sql`SELECT * from palavras`;
  return NextResponse.json(quantidadePalavras);
}