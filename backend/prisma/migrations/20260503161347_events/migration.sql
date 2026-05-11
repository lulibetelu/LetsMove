/*
  Warnings:

  - A unique constraint covering the columns `[imageId,eventId]` on the table `ImageEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId,postId]` on the table `ImagePost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImageEvent_imageId_eventId_key" ON "ImageEvent"("imageId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "ImagePost_imageId_postId_key" ON "ImagePost"("imageId", "postId");
