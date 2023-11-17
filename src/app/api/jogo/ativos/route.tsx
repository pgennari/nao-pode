import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
    const jogos = await prisma.jogo.findMany({
        where:{
            ativo: true
        },
        select: {
            id: true,
            data_criacao: true,
            email: true,
            equipes: true,
            ativo: true
        }
    });
  return NextResponse.json(jogos);

}

export const dynamic = "force-dynamic";
