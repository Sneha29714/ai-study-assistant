-- CreateTable
CREATE TABLE `quizAttempt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noteId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `totalQuestions` INTEGER NOT NULL,
    `attemptedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `quizAttempt_noteId_idx`(`noteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quizAttempt` ADD CONSTRAINT `quizAttempt_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
