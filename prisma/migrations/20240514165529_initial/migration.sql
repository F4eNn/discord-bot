-- DropForeignKey
ALTER TABLE `Daily` DROP FOREIGN KEY `Daily_userId_fkey`;

-- DropIndex
DROP INDEX `User_guildId_key` ON `User`;

-- AlterTable
ALTER TABLE `Daily` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Daily` ADD CONSTRAINT `Daily_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
