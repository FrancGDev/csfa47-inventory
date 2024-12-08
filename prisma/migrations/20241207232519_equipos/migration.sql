/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('BUEN_ESTADO', 'NECESITA_REVISION', 'NECESITA_REEMPLAZO', 'DESCOMPUESTO');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "verificationtokens";

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'BUEN_ESTADO',
    "conjuntoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conjunto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conjunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historial" (
    "id" SERIAL NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "accion" TEXT NOT NULL,
    "comentario" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Historial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_conjuntoId_fkey" FOREIGN KEY ("conjuntoId") REFERENCES "Conjunto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
