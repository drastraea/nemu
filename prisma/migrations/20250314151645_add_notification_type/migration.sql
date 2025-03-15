-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LOST_ITEM', 'FOUND_ITEM', 'GENERAL');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'GENERAL';
