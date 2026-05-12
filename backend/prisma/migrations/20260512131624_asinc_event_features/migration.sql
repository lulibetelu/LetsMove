-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "isPrivate" DROP DEFAULT;

-- CreateTable
CREATE TABLE "EventEntry" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageEntry" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "ImageEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventEntry" ADD CONSTRAINT "EventEntry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEntry" ADD CONSTRAINT "EventEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageEntry" ADD CONSTRAINT "ImageEntry_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageEntry" ADD CONSTRAINT "ImageEntry_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "EventEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
