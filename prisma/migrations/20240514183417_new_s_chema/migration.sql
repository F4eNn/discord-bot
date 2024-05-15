/*
  Warnings:

  - You are about to drop the column `balance` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `lastDaily` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `User` table. All the data in the column will be lost.
  - Made the column `userId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Daily` DROP FOREIGN KEY `Daily_userId_fkey`;

-- AlterTable
ALTER TABLE `Daily` DROP COLUMN `balance`,
    DROP COLUMN `lastDaily`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `guildId`,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Guild` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guild_guildId_key`(`guildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Guild`(`guildId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daily` ADD CONSTRAINT `Daily_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
