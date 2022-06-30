/*
  Warnings:

  - You are about to drop the column `allowMultipleVotes` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `optionVotes` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "allowMultipleVotes",
DROP COLUMN "optionVotes",
DROP COLUMN "options",
ADD COLUMN     "allowMultipleAnswers" BOOLEAN,
ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "answersVotes" INTEGER[];
