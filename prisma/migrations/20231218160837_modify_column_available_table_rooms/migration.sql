/*
  Warnings:

  - You are about to drop the column `availableQty` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `availableQty`,
    ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;
