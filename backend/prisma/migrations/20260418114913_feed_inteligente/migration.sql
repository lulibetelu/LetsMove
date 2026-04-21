-- CreateTable
CREATE TABLE "PostSport" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "sportId" INTEGER NOT NULL,

    CONSTRAINT "PostSport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostScore" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "sportMatch" INTEGER NOT NULL,

    CONSTRAINT "PostScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostScore_userId_postId_key" ON "PostScore"("userId", "postId");

-- AddForeignKey
ALTER TABLE "PostSport" ADD CONSTRAINT "PostSport_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSport" ADD CONSTRAINT "PostSport_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostScore" ADD CONSTRAINT "PostScore_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostScore" ADD CONSTRAINT "PostScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
