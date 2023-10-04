import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";

const prisma = new PrismaClient();

export async function GET() {
  let palavras = await sql`SELECT * from palavras`;
  return NextResponse.json(palavras.rows);
}

export async function POST(req: NextRequest) {
  let palavras;
  try {
    palavras = await req.json();

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

    //console.log(v.validate(palavras, pessoasSchema));
  } catch (error) {
    return NextResponse.json(JSON.stringify("JSON mal formado"), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let dataAux: object[] = [];

  palavras.forEach(async (element) => {
    dataAux.push({
      palavra: element.palavra,
      dificultadores: element.dificultadores.join(";"),
    });
  });

  const novasPalavras = await prisma.palavras.createMany({
    data: dataAux,
    skipDuplicates: true,
  });


  return NextResponse.json(novasPalavras);
}
