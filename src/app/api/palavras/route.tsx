import { kv } from '@vercel/kv';
import { NextResponse, NextRequest } from 'next/server';
 
export async function GET() {
  const palavras = await kv.json.get('palavras');
  return NextResponse.json(palavras);
}

export async function POST(req: NextRequest) {
  let palavra;
  try {
    palavra = await req.json();

  } catch (error) {
    return NextResponse.json(JSON.stringify("JSON mal formado"), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let result = await kv.json.arrappend('palavras', '$.[*]', palavra)

  return NextResponse.json(result);

}