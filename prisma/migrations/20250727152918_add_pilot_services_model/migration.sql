-- CreateTable
CREATE TABLE `PilotageService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doc_number` INTEGER NOT NULL,
    `id_jasa` INTEGER NOT NULL,
    `ship_name` VARCHAR(191) NOT NULL,
    `master` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `loa` INTEGER NOT NULL,
    `activity` ENUM('Berthing', 'Unberthing', 'SeaTrial', 'Shifting') NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `last_port` VARCHAR(191) NOT NULL,
    `next_port` VARCHAR(191) NOT NULL,
    `pilot` VARCHAR(191) NOT NULL,
    `pilot_on` DATETIME(3) NOT NULL,
    `pilot_off` DATETIME(3) NOT NULL,
    `tug_service_id` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `submited_by` VARCHAR(191) NOT NULL,
    `submit_time` DATETIME(3) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
