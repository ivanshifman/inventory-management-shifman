/*
  Warnings:

  - The primary key for the `statcard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `statcard` table. All the data in the column will be lost.
  - The primary key for the `statcarddetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `statcarddetail` table. All the data in the column will be lost.
  - The required column `statCardId` was added to the `StatCard` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `statCardDetailId` was added to the `StatCardDetail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `statcarddetail` DROP FOREIGN KEY `StatCardDetail_statCardId_fkey`;

-- DropIndex
DROP INDEX `StatCardDetail_statCardId_fkey` ON `statcarddetail`;

-- AlterTable
ALTER TABLE `statcard` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `statCardId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`statCardId`);

-- AlterTable
ALTER TABLE `statcarddetail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `statCardDetailId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`statCardDetailId`);

-- AddForeignKey
ALTER TABLE `StatCardDetail` ADD CONSTRAINT `StatCardDetail_statCardId_fkey` FOREIGN KEY (`statCardId`) REFERENCES `StatCard`(`statCardId`) ON DELETE RESTRICT ON UPDATE CASCADE;
