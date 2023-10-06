import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Palavra = {
  palavra: string;
  dificultadores: string;
}

export async function GET() {
  let palavras = await sql`SELECT * from palavras`;
  return NextResponse.json(palavras.rows);
}

export async function POST(req: NextRequest) {
  let payload;
  try {
    payload = await req.json();
    
    var Validator = require("jsonschema").Validator;
    var v = new Validator();

    var pessoasSchema = {
      type: "array",
      items: {
        properties: {
          palavra: { type: "string" },
          dificultadores: {
            type: "array",
            items: {
              properties: {
                dificultador: { type: "string" },
              },
            },
          },
        },
        required: ["palavra", "dificultadores"],
      },
    };

    v.validate(payload, pessoasSchema);
    
  } catch (error) {
    return NextResponse.json("JSON mal formado\n\n" + payload, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let listaPalavras = [{} as Palavra];
  listaPalavras.shift();
  
  payload.forEach((element: { palavra: string; dificultadores: string[]; }) => {
    listaPalavras.push({
      palavra: element.palavra,
      dificultadores: element.dificultadores.join(";"),
    });
  });
  console.log(listaPalavras);
  const novasPalavras = await prisma.palavras.createMany({
    data: listaPalavras,
    skipDuplicates: true,
  });


  return NextResponse.json(novasPalavras);
}

export const dynamic = "force-dynamic";
