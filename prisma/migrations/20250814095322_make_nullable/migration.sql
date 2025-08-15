-- AlterTable
ALTER TABLE `pilotageservice` MODIFY `doc_number` INTEGER NULL,
    MODIFY `id_jasa` INTEGER NULL,
    MODIFY `master` VARCHAR(191) NULL,
    MODIFY `agency` VARCHAR(191) NULL,
    MODIFY `loa` INTEGER NULL,
    MODIFY `last_port` VARCHAR(191) NULL,
    MODIFY `next_port` VARCHAR(191) NULL,
    MODIFY `tug_service_id` INTEGER NULL;
