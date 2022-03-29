/*
  Warnings:

  - You are about to drop the column `nikeName` on the `User` table. All the data in the column will be lost.
  - Added the required column `nickName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `nikeName`,
    ADD COLUMN `nickName` VARCHAR(50) NOT NULL,
    ADD COLUMN `openid` VARCHAR(256) NOT NULL;
