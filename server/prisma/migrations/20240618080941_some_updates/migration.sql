-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'BORROWED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookStatus" "Status" NOT NULL DEFAULT 'AVAILABLE';
