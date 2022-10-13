import { MigrationInterface, QueryRunner } from 'typeorm';

export class note1665635405956 implements MigrationInterface {
    name = 'note1665635405956';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`note\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`note\``);
    }
}
