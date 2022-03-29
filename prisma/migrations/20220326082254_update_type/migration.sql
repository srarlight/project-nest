/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum("User_role")` to `VarChar(191)`.
  - You are about to alter the column `status` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum("User_status")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'active';
