/*
  Warnings:

  - The primary key for the `Equipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `equipe` on the `Equipe` table. All the data in the column will be lost.
  - The required column `id` was added to the `Equipe` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `palavraId` to the `Rodadas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_equipeId_fkey";

-- AlterTable
ALTER TABLE "Equipe" DROP CONSTRAINT "Equipe_pkey",
DROP COLUMN "equipe",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rodadas" ADD COLUMN     "palavraId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Rodadas" ADD CONSTRAINT "Rodadas_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rodadas" ADD CONSTRAINT "Rodadas_palavraId_fkey" FOREIGN KEY ("palavraId") REFERENCES "Palavras"("palavra") ON DELETE RESTRICT ON UPDATE CASCADE;
