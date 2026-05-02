/*
  Warnings:

  - Added the required column `eventType` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Asynchronous', 'InPerson');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" "EventType" NOT NULL,
ALTER COLUMN "chatId" DROP NOT NULL;
