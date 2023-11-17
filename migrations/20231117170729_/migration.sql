/*
  Warnings:

  - You are about to drop the `Palavras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rodadas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_equipeId_fkey";

-- DropForeignKey
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_palavraId_fkey";

-- DropTable
DROP TABLE "Palavras";

-- DropTable
DROP TABLE "Rodadas";

-- CreateTable
CREATE TABLE "Palavra" (
    "palavra" TEXT NOT NULL,
    "dificultadores" TEXT NOT NULL,

    CONSTRAINT "Palavra_pkey" PRIMARY KEY ("palavra")
);

-- CreateTable
CREATE TABLE "Rodada" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "equipeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativa',

    CONSTRAINT "Rodada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PalavrasSorteadas" (
    "rodadaId" TEXT NOT NULL,
    "palavraId" TEXT NOT NULL,

    CONSTRAINT "PalavrasSorteadas_pkey" PRIMARY KEY ("rodadaId","palavraId")
);

-- AddForeignKey
ALTER TABLE "Rodada" ADD CONSTRAINT "Rodada_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PalavrasSorteadas" ADD CONSTRAINT "PalavrasSorteadas_rodadaId_fkey" FOREIGN KEY ("rodadaId") REFERENCES "Rodada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PalavrasSorteadas" ADD CONSTRAINT "PalavrasSorteadas_palavraId_fkey" FOREIGN KEY ("palavraId") REFERENCES "Palavra"("palavra") ON DELETE RESTRICT ON UPDATE CASCADE;
