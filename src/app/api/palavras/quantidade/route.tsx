import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';
 
const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json(await prisma.palavras.count());
}

export const dynamic = "force-dynamic";
