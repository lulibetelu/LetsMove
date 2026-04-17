/*
  Warnings:

  - You are about to drop the column `userId1` on the `Friends` table. All the data in the column will be lost.
  - You are about to drop the column `userId2` on the `Friends` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sender,receiver]` on the table `Friends` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiver` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_userId1_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_userId2_fkey";

-- DropIndex
DROP INDEX "Friends_userId1_userId2_key";

-- AlterTable
ALTER TABLE "Friends" DROP COLUMN "userId1",
DROP COLUMN "userId2",
ADD COLUMN     "receiver" INTEGER NOT NULL,
ADD COLUMN     "sender" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friends_sender_receiver_key" ON "Friends"("sender", "receiver");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_sender_fkey" FOREIGN KEY ("sender") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
