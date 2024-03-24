/*
  Warnings:

  - The `role` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `imageUrl` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inviteCode` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('TEXT', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_serverId_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_userId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_serverId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_userId_fkey";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "type" "ChannelType" NOT NULL DEFAULT 'TEXT';

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "role",
ADD COLUMN     "role" "MemberRole" NOT NULL DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "inviteCode" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Roles";

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
