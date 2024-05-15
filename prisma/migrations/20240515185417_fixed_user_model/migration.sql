-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `guildId` VARCHAR(191) NOT NULL DEFAULT 'defualtGuilId';

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`guildId`) ON DELETE RESTRICT ON UPDATE CASCADE;
