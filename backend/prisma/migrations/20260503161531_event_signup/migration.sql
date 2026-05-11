-- CreateTable
CREATE TABLE "EventSignUp" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "state" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventSignUp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventSignUp_userId_eventId_key" ON "EventSignUp"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "EventSignUp" ADD CONSTRAINT "EventSignUp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSignUp" ADD CONSTRAINT "EventSignUp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
