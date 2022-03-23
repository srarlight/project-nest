/*
  Warnings:

  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - Added the required column `author` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumb_url` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tinyint` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `published`,
    ADD COLUMN `author` VARCHAR(50) NOT NULL,
    ADD COLUMN `thumb_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `tinyint` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(50) NOT NULL,
    MODIFY `content` VARCHAR(50) NOT NULL;
