-- CreateTable
CREATE TABLE "Usuario" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Palavras" (
    "palavra" TEXT NOT NULL,
    "dificultadores" TEXT NOT NULL,

    CONSTRAINT "Palavras_pkey" PRIMARY KEY ("palavra")
);

-- CreateTable
CREATE TABLE "Jogo" (
    "id" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "equipe" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("equipe")
);

-- CreateTable
CREATE TABLE "Rodadas" (
    "jogoId" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "equipeId" TEXT,

    CONSTRAINT "Rodadas_pkey" PRIMARY KEY ("jogoId","numero")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rodadas" ADD CONSTRAINT "Rodadas_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rodadas" ADD CONSTRAINT "Rodadas_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("equipe") ON DELETE SET NULL ON UPDATE CASCADE;
