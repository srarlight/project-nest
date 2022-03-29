/*
  Warnings:

  - You are about to drop the column `author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `thumb_url` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tinyint` on the `Post` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentHtml` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_url` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish_time` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `author`,
    DROP COLUMN `thumb_url`,
    DROP COLUMN `tinyint`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `contentHtml` MEDIUMTEXT NOT NULL,
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cover_url` VARCHAR(256) NOT NULL,
    ADD COLUMN `is_recommend` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `like_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `publish_time` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('draft', 'publish') NOT NULL DEFAULT 'publish',
    ADD COLUMN `summary` TEXT NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `content` MEDIUMTEXT NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
