/*
  Warnings:

  - You are about to alter the column `rating` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Double`.

*/
-- AlterTable
ALTER TABLE `properties` MODIFY `rating` DOUBLE NOT NULL DEFAULT 0.0;
