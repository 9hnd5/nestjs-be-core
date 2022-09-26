import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDescriptionColumn1664161385466 implements MigrationInterface {
    name = 'addDescriptionColumn1664161385466';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`description\``);
    }
}
