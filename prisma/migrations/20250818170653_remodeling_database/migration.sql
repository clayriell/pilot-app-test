/*
  Warnings:

  - You are about to alter the column `status` on the `pilotageservice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - Made the column `area` on table `terminal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pilotageservice` MODIFY `status` ENUM('REQUESTED', 'APPROVED', 'IN_PROCESS', 'COMPLETED', 'SUBMITED', 'REJECTED', 'PAID', 'CANCELED') NOT NULL DEFAULT 'REQUESTED',
    MODIFY `startDate` DATE NOT NULL DEFAULT CURRENT_DATE,
    MODIFY `startTime` TIME NOT NULL DEFAULT CURRENT_TIME;

-- AlterTable
ALTER TABLE `terminal` MODIFY `area` ENUM('TANJUNG_UNCANG', 'BATU_AMPAR', 'KABIL') NOT NULL DEFAULT 'TANJUNG_UNCANG';

-- AlterTable
ALTER TABLE `tugservice` ADD COLUMN `status` ENUM('REQUESTED', 'APPROVED', 'IN_PROCESS', 'COMPLETED', 'SUBMITED', 'REJECTED', 'PAID', 'CANCELED') NOT NULL DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SYS_ADMIN', 'ADMIN', 'PILOT') NOT NULL DEFAULT 'ADMIN';
