/*
  Warnings:

  - The values [DESCOMPUESTO] on the enum `Estado` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `descripcion` on the `Conjunto` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Conjunto` table. All the data in the column will be lost.
  - Added the required column `name` to the `Conjunto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Estado_new" AS ENUM ('BUEN_ESTADO', 'NECESITA_REVISION', 'NECESITA_REEMPLAZO', 'NECESITA_REPARACION');
ALTER TABLE "Equipo" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Equipo" ALTER COLUMN "estado" TYPE "Estado_new" USING ("estado"::text::"Estado_new");
ALTER TYPE "Estado" RENAME TO "Estado_old";
ALTER TYPE "Estado_new" RENAME TO "Estado";
DROP TYPE "Estado_old";
ALTER TABLE "Equipo" ALTER COLUMN "estado" SET DEFAULT 'BUEN_ESTADO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Equipo" DROP CONSTRAINT "Equipo_conjuntoId_fkey";

-- AlterTable
ALTER TABLE "Conjunto" DROP COLUMN "descripcion",
DROP COLUMN "nombre",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ConjuntoEquipo" (
    "id" SERIAL NOT NULL,
    "conjuntoId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConjuntoEquipo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConjuntoEquipo" ADD CONSTRAINT "ConjuntoEquipo_conjuntoId_fkey" FOREIGN KEY ("conjuntoId") REFERENCES "Conjunto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConjuntoEquipo" ADD CONSTRAINT "ConjuntoEquipo_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
