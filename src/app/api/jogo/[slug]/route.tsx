import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest,
                          { params }: { params: { slug: string } }){
    const id = params.slug;
    const jogo = await prisma.jogo.findUnique({
        where:{
            id: id
        },
        include: {
            equipes: {
                select:{
                    id: true,
                    rodadas: {
                        select:{
                            numero: true,
                            status: true,
                            Palavra: true
                        }
                    }
                }
            }
        }
    });
  return NextResponse.json(jogo);

}

export const dynamic = "force-dynamic";
