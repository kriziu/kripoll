/*
  Warnings:

  - You are about to drop the column `allowCreateOption` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "allowCreateOption",
ADD COLUMN     "allowCreateAnswer" BOOLEAN;
