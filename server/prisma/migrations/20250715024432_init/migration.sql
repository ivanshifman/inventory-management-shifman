-- CreateTable
CREATE TABLE `StatCard` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `dateRange` VARCHAR(191) NOT NULL,
    `primaryIcon` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatCardDetail` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `changePercentage` INTEGER NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `statCardId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StatCardDetail` ADD CONSTRAINT `StatCardDetail_statCardId_fkey` FOREIGN KEY (`statCardId`) REFERENCES `StatCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
