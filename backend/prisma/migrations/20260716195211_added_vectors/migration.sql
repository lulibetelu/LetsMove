/*
  Warnings:

  - Added the required column `embedding` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `embedding` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "embedding" vector(768) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "embedding" vector(768) NOT NULL;
