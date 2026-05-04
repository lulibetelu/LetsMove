/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `EventSignUp` table. All the data in the column will be lost.
  - Added the required column `isPrivate` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "EventSignUp" DROP COLUMN "isPrivate";
