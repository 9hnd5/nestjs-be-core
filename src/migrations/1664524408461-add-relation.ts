import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelation1664524408461 implements MigrationInterface {
    name = 'addRelation1664524408461';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` ADD \`orderId\` int NULL`);
        await queryRunner.query(
            `ALTER TABLE \`order-item\` ADD CONSTRAINT \`FK_29ee234059c3b7a783bddac5bf8\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP FOREIGN KEY \`FK_29ee234059c3b7a783bddac5bf8\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP COLUMN \`orderId\``);
    }
}
