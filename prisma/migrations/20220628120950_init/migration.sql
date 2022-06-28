/*
  Warnings:

  - Added the required column `allowCreateOption` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allowMultipleVotes` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duplicationCheck` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requireName` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Duplication" AS ENUM ('IP', 'COOKIE', 'NONE');

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "allowCreateOption" BOOLEAN NOT NULL,
ADD COLUMN     "allowMultipleVotes" BOOLEAN NOT NULL,
ADD COLUMN     "duplicationCheck" "Duplication" NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "passwordToResults" TEXT,
ADD COLUMN     "requireName" BOOLEAN NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT;
