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

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseByCategory` ADD CONSTRAINT `ExpenseByCategory_expenseSummaryId_fkey` FOREIGN KEY (`expenseSummaryId`) REFERENCES `ExpenseSummary`(`expenseSummaryId`) ON DELETE CASCADE ON UPDATE CASCADE;
