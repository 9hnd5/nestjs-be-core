import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateOrderOrderitem1664161756470 implements MigrationInterface {
    name = 'updateOrderOrderitem1664161756470';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`totalDiscount\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`totalDiscount\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`description\``);
    }
}
