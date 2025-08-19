/*
  Warnings:

  - Made the column `agencyId` on table `pilotageservice` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pilotageservice` MODIFY `agencyId` INTEGER NOT NULL,
    MODIFY `startDate` DATE NOT NULL DEFAULT CURRENT_DATE,
    MODIFY `startTime` TIME NOT NULL DEFAULT CURRENT_TIME;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Agency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `picName` VARCHAR(191) NOT NULL,
    `picNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PilotageService` ADD CONSTRAINT `PilotageService_agencyId_fkey` FOREIGN KEY (`agencyId`) REFERENCES `Agency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
