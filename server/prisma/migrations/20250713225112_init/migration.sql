/*
  Warnings:

  - The primary key for the `expensebycategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `expenses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `expensesummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `purchasesummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `salessummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `expensebycategory` DROP FOREIGN KEY `ExpenseByCategory_expenseSummaryId_fkey`;

-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `Purchases_productId_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `Sales_productId_fkey`;

-- DropIndex
DROP INDEX `ExpenseByCategory_expenseSummaryId_fkey` ON `expensebycategory`;

-- DropIndex
DROP INDEX `Purchases_productId_fkey` ON `purchases`;

-- DropIndex
DROP INDEX `Sales_productId_fkey` ON `sales`;

-- AlterTable
ALTER TABLE `expensebycategory` DROP PRIMARY KEY,
    MODIFY `expenseByCategoryId` VARCHAR(191) NOT NULL,
    MODIFY `expenseSummaryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`expenseByCategoryId`);

-- AlterTable
ALTER TABLE `expenses` DROP PRIMARY KEY,
    MODIFY `expenseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`expenseId`);

-- AlterTable
ALTER TABLE `expensesummary` DROP PRIMARY KEY,
    MODIFY `expenseSummaryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`expenseSummaryId`);

-- AlterTable
ALTER TABLE `products` DROP PRIMARY KEY,
    MODIFY `productId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`productId`);

-- AlterTable
ALTER TABLE `purchases` DROP PRIMARY KEY,
    MODIFY `purchaseId` VARCHAR(191) NOT NULL,
    MODIFY `productId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`purchaseId`);

-- AlterTable
ALTER TABLE `purchasesummary` DROP PRIMARY KEY,
    MODIFY `purchaseSummaryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`purchaseSummaryId`);

-- AlterTable
ALTER TABLE `sales` DROP PRIMARY KEY,
    MODIFY `saleId` VARCHAR(191) NOT NULL,
    MODIFY `productId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`saleId`);

-- AlterTable
ALTER TABLE `salessummary` DROP PRIMARY KEY,
    MODIFY `salesSummaryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`salesSummaryId`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseByCategory` ADD CONSTRAINT `ExpenseByCategory_expenseSummaryId_fkey` FOREIGN KEY (`expenseSummaryId`) REFERENCES `ExpenseSummary`(`expenseSummaryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
