-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "archiveAt" TIMESTAMP(3),
ADD COLUMN     "rejectItemId" TEXT[] DEFAULT ARRAY[]::TEXT[];
