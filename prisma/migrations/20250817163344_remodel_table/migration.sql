/*
  Warnings:

  - You are about to drop the column `agency` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `doc_number` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `id_jasa` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `last_port` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `loa` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `master` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `next_port` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `pilot` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `pilot_off` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `pilot_on` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `ship_name` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `submit_time` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `submited_by` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to drop the column `tug_service_id` on the `pilotageservice` table. All the data in the column will be lost.
  - You are about to alter the column `activity` on the `pilotageservice` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `status` on the `pilotageservice` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `amount` on the `pilotageservice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(10,2)`.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pilotageservice` DROP COLUMN `agency`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `created_by`,
    DROP COLUMN `doc_number`,
    DROP COLUMN `from`,
    DROP COLUMN `id_jasa`,
    DROP COLUMN `last_port`,
    DROP COLUMN `loa`,
    DROP COLUMN `master`,
    DROP COLUMN `next_port`,
    DROP COLUMN `pilot`,
    DROP COLUMN `pilot_off`,
    DROP COLUMN `pilot_on`,
    DROP COLUMN `ship_name`,
    DROP COLUMN `submit_time`,
    DROP COLUMN `submited_by`,
    DROP COLUMN `to`,
    DROP COLUMN `tug_service_id`,
    ADD COLUMN `agencyId` INTEGER NULL,
    ADD COLUMN `companyId` INTEGER NULL,
    ADD COLUMN `createdBy` INTEGER NULL,
    ADD COLUMN `docNumber` VARCHAR(191) NULL,
    ADD COLUMN `endDate` DATE NULL,
    ADD COLUMN `endTime` TIME NULL,
    ADD COLUMN `idJasa` INTEGER NULL,
    ADD COLUMN `lastPort` VARCHAR(191) NULL,
    ADD COLUMN `nextPort` VARCHAR(191) NULL,
    ADD COLUMN `pilotId` INTEGER NULL,
    ADD COLUMN `rate` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `startDate` DATE NOT NULL DEFAULT CURRENT_DATE,
    ADD COLUMN `startTime` TIME NOT NULL DEFAULT CURRENT_TIME,
    ADD COLUMN `submitTime` DATETIME(3) NULL,
    ADD COLUMN `submittedBy` INTEGER NULL,
    ADD COLUMN `terminalEndId` INTEGER NULL,
    ADD COLUMN `terminalStartId` INTEGER NULL,
    MODIFY `activity` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `password`,
    ADD COLUMN `companyId` INTEGER NULL,
    ADD COLUMN `picture` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShipDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pilotageServiceId` INTEGER NOT NULL,
    `shipName` VARCHAR(191) NOT NULL,
    `master` VARCHAR(191) NOT NULL,
    `grt` INTEGER NULL,
    `loa` INTEGER NULL,
    `flag` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssistTug` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipName` VARCHAR(191) NOT NULL,
    `master` VARCHAR(191) NOT NULL,
    `horsePower` INTEGER NOT NULL,
    `companyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TugService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pilotageServiceId` INTEGER NOT NULL,
    `idJasa` INTEGER NULL,
    `amount` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TugServiceDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tugServiceId` INTEGER NOT NULL,
    `assistTugId` INTEGER NOT NULL,
    `connectTime` DATETIME(3) NOT NULL,
    `disconnectTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Terminal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NULL,

    UNIQUE INDEX `Terminal_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilotageService` ADD CONSTRAINT `PilotageService_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilotageService` ADD CONSTRAINT `PilotageService_terminalStartId_fkey` FOREIGN KEY (`terminalStartId`) REFERENCES `Terminal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilotageService` ADD CONSTRAINT `PilotageService_terminalEndId_fkey` FOREIGN KEY (`terminalEndId`) REFERENCES `Terminal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilotageService` ADD CONSTRAINT `PilotageService_submittedBy_fkey` FOREIGN KEY (`submittedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilotageService` ADD CONSTRAINT `PilotageService_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShipDetail` ADD CONSTRAINT `ShipDetail_pilotageServiceId_fkey` FOREIGN KEY (`pilotageServiceId`) REFERENCES `PilotageService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssistTug` ADD CONSTRAINT `AssistTug_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TugService` ADD CONSTRAINT `TugService_pilotageServiceId_fkey` FOREIGN KEY (`pilotageServiceId`) REFERENCES `PilotageService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TugServiceDetail` ADD CONSTRAINT `TugServiceDetail_tugServiceId_fkey` FOREIGN KEY (`tugServiceId`) REFERENCES `TugService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TugServiceDetail` ADD CONSTRAINT `TugServiceDetail_assistTugId_fkey` FOREIGN KEY (`assistTugId`) REFERENCES `AssistTug`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
