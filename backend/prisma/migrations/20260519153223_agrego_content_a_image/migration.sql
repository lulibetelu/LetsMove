-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "content" BYTEA,
ALTER COLUMN "url" DROP NOT NULL;
