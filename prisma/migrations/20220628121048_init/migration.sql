-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "allowCreateOption" DROP NOT NULL,
ALTER COLUMN "allowMultipleVotes" DROP NOT NULL,
ALTER COLUMN "requireName" DROP NOT NULL;
