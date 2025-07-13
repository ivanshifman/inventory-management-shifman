-- CreateTable
CREATE TABLE `Users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `rating` DOUBLE NULL,
    `stockQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `saleId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `totalAmount` DOUBLE NOT NULL,

    PRIMARY KEY (`saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchases` (
    `purchaseId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitCost` DOUBLE NOT NULL,
    `totalCost` DOUBLE NOT NULL,

    PRIMARY KEY (`purchaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expenses` (
    `expenseId` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`expenseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesSummary` (
    `salesSummaryId` INTEGER NOT NULL AUTO_INCREMENT,
    `totalValue` DOUBLE NOT NULL,
    `changePercentage` DOUBLE NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`salesSummaryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseSummary` (
    `purchaseSummaryId` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPurchased` DOUBLE NOT NULL,
    `changePercentage` DOUBLE NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`purchaseSummaryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExpenseSummary` (
    `expenseSummaryId` INTEGER NOT NULL AUTO_INCREMENT,
    `totalExpenses` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`expenseSummaryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExpenseByCategory` (
    `expenseByCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `expenseSummaryId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `amount` BIGINT NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`expenseByCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExpenseByCategory` ADD CONSTRAINT `ExpenseByCategory_expenseSummaryId_fkey` FOREIGN KEY (`expenseSummaryId`) REFERENCES `ExpenseSummary`(`expenseSummaryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
