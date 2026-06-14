/*
  Warnings:

  - A unique constraint covering the columns `[location]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_location_key" ON "Location"("location");
