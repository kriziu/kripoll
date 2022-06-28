/*
  Warnings:

  - Made the column `title` on table `Poll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Poll` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Poll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "voted" TEXT[],
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "pollId" TEXT,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE SET NULL ON UPDATE CASCADE;
