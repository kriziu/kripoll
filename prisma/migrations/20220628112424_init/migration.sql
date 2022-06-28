/*
  Warnings:

  - You are about to drop the column `created_at` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
