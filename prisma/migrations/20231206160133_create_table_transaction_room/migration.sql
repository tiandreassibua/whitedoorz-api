-- CreateTable
CREATE TABLE `transaction_rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(191) NOT NULL,
    `roomId` INTEGER NOT NULL,
    `roomQty` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction_rooms` ADD CONSTRAINT `transaction_rooms_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_rooms` ADD CONSTRAINT `transaction_rooms_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
