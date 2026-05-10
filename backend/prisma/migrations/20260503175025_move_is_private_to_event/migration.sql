/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `EventSignUp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "EventSignUp" DROP COLUMN "isPrivate";
