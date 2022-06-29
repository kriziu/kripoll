/*
  Warnings:

  - You are about to drop the column `optionLabels` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "optionLabels",
ADD COLUMN     "options" TEXT[];
