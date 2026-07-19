-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "embedding" vector(3072);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "embedding" vector(3072);
