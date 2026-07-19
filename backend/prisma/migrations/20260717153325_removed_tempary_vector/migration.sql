/*
  Warnings:

  - You are about to drop the column `embedding` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `embedding` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "embedding";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "embedding";
