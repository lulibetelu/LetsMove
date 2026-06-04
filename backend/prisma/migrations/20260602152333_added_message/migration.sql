-- CreateTable
CREATE TABLE "ImageMessage" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "ImageMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "groupMemberId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageMessage_imageId_messageId_key" ON "ImageMessage"("imageId", "messageId");

-- AddForeignKey
ALTER TABLE "ImageMessage" ADD CONSTRAINT "ImageMessage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageMessage" ADD CONSTRAINT "ImageMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupMemberId_fkey" FOREIGN KEY ("groupMemberId") REFERENCES "GroupMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
