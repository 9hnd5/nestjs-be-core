import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelation11664524547500 implements MigrationInterface {
    name = 'addRelation11664524547500';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP FOREIGN KEY \`FK_29ee234059c3b7a783bddac5bf8\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`orderId\` \`order_id\` int NULL`);
        await queryRunner.query(
            `ALTER TABLE \`order-item\` ADD CONSTRAINT \`FK_ce247ac6959f214f98396bddeed\` FOREIGN KEY (\`order_id\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order-item\` DROP FOREIGN KEY \`FK_ce247ac6959f214f98396bddeed\``);
        await queryRunner.query(`ALTER TABLE \`order-item\` CHANGE \`order_id\` \`orderId\` int NULL`);
        await queryRunner.query(
            `ALTER TABLE \`order-item\` ADD CONSTRAINT \`FK_29ee234059c3b7a783bddac5bf8\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
