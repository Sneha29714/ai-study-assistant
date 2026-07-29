/*
  Warnings:

  - You are about to drop the column `createdAt` on the `note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `note` DROP COLUMN `createdAt`,
    ADD COLUMN `flashcards` VARCHAR(191) NULL,
    ADD COLUMN `quiz` VARCHAR(191) NULL,
    ADD COLUMN `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `extractedText` VARCHAR(191) NULL,
    MODIFY `summary` VARCHAR(191) NULL;
