/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pilotageservice` MODIFY `startDate` DATE NOT NULL DEFAULT CURRENT_DATE,
    MODIFY `startTime` TIME NOT NULL DEFAULT CURRENT_TIME;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(255) NOT NULL;
