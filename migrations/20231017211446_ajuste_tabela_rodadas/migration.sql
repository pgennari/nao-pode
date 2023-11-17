/*
  Warnings:

  - The primary key for the `Rodadas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jogoId` on the `Rodadas` table. All the data in the column will be lost.
  - Made the column `equipeId` on table `Rodadas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_equipeId_fkey";

-- DropForeignKey
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_jogoId_fkey";

-- AlterTable
ALTER TABLE "Rodadas" DROP CONSTRAINT "Rodadas_pkey",
DROP COLUMN "jogoId",
ALTER COLUMN "equipeId" SET NOT NULL,
ADD CONSTRAINT "Rodadas_pkey" PRIMARY KEY ("equipeId", "numero");

-- AddForeignKey
ALTER TABLE "Rodadas" ADD CONSTRAINT "Rodadas_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("equipe") ON DELETE RESTRICT ON UPDATE CASCADE;
