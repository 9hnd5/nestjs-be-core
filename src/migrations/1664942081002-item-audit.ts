import { MigrationInterface, QueryRunner } from 'typeorm';

export class itemAudit1664942081002 implements MigrationInterface {
    name = 'itemAudit1664942081002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`created_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`created_by\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`modified_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`modified_by\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`modified_by\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`modified_date\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`created_date\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`is_deleted\``);
    }
}
