-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'operador',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aeronaves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cod` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `capacidade` INTEGER NOT NULL,
    `alcance` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'em_producao',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `aeronaves_cod_key`(`cod`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pecas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `quantidade` INTEGER NOT NULL DEFAULT 1,
    `aeronaveId` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pecas_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etapas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `ordem` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `aeronaveId` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,
    `salario` DOUBLE NULL,
    `usuarioId` INTEGER NULL,
    `aeronaveId` INTEGER NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `funcionarios_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pendente',
    `resultado` VARCHAR(191) NULL,
    `aeronaveId` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aeronaveId` INTEGER NOT NULL,
    `dataInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataPrevisao` DATETIME(3) NULL,
    `dataFinalizacao` DATETIME(3) NULL,
    `statusAtual` VARCHAR(191) NOT NULL DEFAULT 'iniciada',
    `percentual` INTEGER NOT NULL DEFAULT 0,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `producoes_aeronaveId_key`(`aeronaveId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pecas` ADD CONSTRAINT `pecas_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etapas` ADD CONSTRAINT `etapas_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testes` ADD CONSTRAINT `testes_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producoes` ADD CONSTRAINT `producoes_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
