/*
  Warnings:

  - Added the required column `estadoDejado` to the `Mantenimiento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mantenimiento" ADD COLUMN     "estadoDejado" TEXT NOT NULL;
