/*
  Warnings:

  - You are about to drop the `PalavrasSorteadas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PalavrasSorteadas" DROP CONSTRAINT "PalavrasSorteadas_palavraId_fkey";

-- DropForeignKey
ALTER TABLE "PalavrasSorteadas" DROP CONSTRAINT "PalavrasSorteadas_rodadaId_fkey";

-- DropTable
DROP TABLE "PalavrasSorteadas";

-- CreateTable
CREATE TABLE "_PalavraToRodada" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PalavraToRodada_AB_unique" ON "_PalavraToRodada"("A", "B");

-- CreateIndex
CREATE INDEX "_PalavraToRodada_B_index" ON "_PalavraToRodada"("B");

-- AddForeignKey
ALTER TABLE "_PalavraToRodada" ADD CONSTRAINT "_PalavraToRodada_A_fkey" FOREIGN KEY ("A") REFERENCES "Palavra"("palavra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PalavraToRodada" ADD CONSTRAINT "_PalavraToRodada_B_fkey" FOREIGN KEY ("B") REFERENCES "Rodada"("id") ON DELETE CASCADE ON UPDATE CASCADE;
