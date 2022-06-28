-- CreateTable
CREATE TABLE "Poll" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "created_at" DATE,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);
