/*
  Warnings:

  - You are about to drop the column `captions` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "captions",
ADD COLUMN     "caption" TEXT;
