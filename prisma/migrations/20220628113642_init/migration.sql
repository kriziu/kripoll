/*
  Warnings:

  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_pollId_fkey";

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "optionLabels" TEXT[],
ADD COLUMN     "optionVotes" INTEGER[];

-- DropTable
DROP TABLE "Option";
