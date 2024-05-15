/*
  Warnings:

  - Added the required column `guildName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `guildName` VARCHAR(191) NOT NULL;
