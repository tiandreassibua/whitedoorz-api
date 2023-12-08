-- CreateTable
CREATE TABLE
    `transactions` (
        `id` VARCHAR(191) NOT NULL,
        `userId` INTEGER NOT NULL,
        `propertyId` INTEGER NOT NULL,
        `checkIn` DATETIME (3) NOT NULL,
        `checkOut` DATETIME (3) NOT NULL,
        `totalPrice` INTEGER NOT NULL DEFAULT 0,
        `status` ENUM (
            'created',
            'pending',
            'challenge',
            'success',
            'failed'
        ) NOT NULL DEFAULT 'created',
        `redirect_url` TEXT NOT NULL,
        `createdAt` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME (3) NOT NULL,
        PRIMARY KEY (`id`)
    ) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;