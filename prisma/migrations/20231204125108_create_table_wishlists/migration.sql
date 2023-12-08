-- CreateTable
CREATE TABLE
    `wishlists` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `userId` INTEGER NOT NULL,
        `propertyId` INTEGER NOT NULL,
        `createdAt` DATETIME (3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        `updatedAt` DATETIME (3) NOT NULL,
        UNIQUE INDEX `wishlists_userId_propertyId_key` (`userId`, `propertyId`),
        PRIMARY KEY (`id`)
    ) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;