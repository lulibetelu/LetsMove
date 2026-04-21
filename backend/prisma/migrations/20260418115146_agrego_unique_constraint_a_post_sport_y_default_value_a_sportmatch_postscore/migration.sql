/*
  Warnings:

  - A unique constraint covering the columns `[postId,sportId]` on the table `PostSport` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PostScore" ALTER COLUMN "sportMatch" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "PostSport_postId_sportId_key" ON "PostSport"("postId", "sportId");
