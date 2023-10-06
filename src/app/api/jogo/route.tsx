import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
import { NextResponse, NextRequest } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET() {
    let jogo = randomUUID();
    return NextResponse.json(jogo);
  }