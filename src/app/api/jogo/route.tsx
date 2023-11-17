import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { sql } from '@vercel/postgres';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const json = await req.json();

    const jogo = await prisma.jogo.create({
      data: {
          email: json.email
      }
    });

    const equipes = await prisma.equipe.createMany({
      data: [
        { jogoId: jogo.id },
        { jogoId: jogo.id },
      ]
    })

  const indiceEquipeSorteada = Math.floor(Math.random() * 2);
  const equipeAtual = (await prisma.equipe.findMany({ 
    where:{
      jogoId: {
        equals: jogo.id
      }
    },
    include: { 
        jogo: {
          select: {
            id: true
          }
        }
    }
  }))[indiceEquipeSorteada];

  let palavras = await prisma.palavra.findMany();
  let totalPalavras: number = palavras.length;
  const indicePalavraSorteada = Math.floor(Math.random() * totalPalavras);
  const palavraSorteada = palavras[indicePalavraSorteada];

    const rodada = await prisma.rodada.create({
      data: {
        numero: 1,
        equipeId: equipeAtual.id,
        palavras: 
            palavraSorteada.palavra
      },
      select:{
        numero: true,
        equipeId: true,
        Equipe: true,
        Palavra: true
      }
    })

    return NextResponse.json(rodada);
  }

export const dynamic = "force-dynamic";
