/*
  Warnings:

  - Changed the type of `estado` on the `Equipo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Equipo" DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Estado";
