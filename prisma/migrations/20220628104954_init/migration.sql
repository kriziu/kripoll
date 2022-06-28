/*
  Warnings:

  - The primary key for the `Poll` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Poll_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Poll_id_seq";
