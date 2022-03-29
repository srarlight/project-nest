-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` ENUM('active', 'disabled') NOT NULL DEFAULT 'active';
