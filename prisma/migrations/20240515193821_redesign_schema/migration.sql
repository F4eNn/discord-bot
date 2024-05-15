/*
  Warnings:

  - You are about to drop the column `userId` on the `Daily` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userTableId]` on the table `Daily` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userTableId` to the `Daily` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Daily` DROP FOREIGN KEY `Daily_userId_fkey`;

-- DropIndex
DROP INDEX `User_userId_key` ON `User`;

-- AlterTable
ALTER TABLE `Daily` DROP COLUMN `userId`,
    ADD COLUMN `userTableId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NOT NULL,
    ALTER COLUMN `guildId` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Daily_userTableId_key` ON `Daily`(`userTableId`);

-- AddForeignKey
ALTER TABLE `Daily` ADD CONSTRAINT `Daily_userTableId_fkey` FOREIGN KEY (`userTableId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
