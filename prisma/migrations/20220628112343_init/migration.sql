/*
  Warnings:

  - You are about to drop the column `voted` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "voted",
ADD COLUMN     "votedIPs" TEXT[];
