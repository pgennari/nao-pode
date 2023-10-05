import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from 'next/server';
 
export async function GET() {
  const quantidadePalavras = await sql`SELECT COUNT(*) FROM palavras`;
  return NextResponse.json(quantidadePalavras.rows[0].count);
}