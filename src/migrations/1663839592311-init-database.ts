import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDatabase1663839592311 implements MigrationInterface {
    name = 'initDatabase1663839592311';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`order\` (\`is_deleted\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime NOT NULL, \`created_by\` int NOT NULL, \`modified_date\` datetime NULL, \`modified_by\` int NULL, \`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`order-item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`total_price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`order-item\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }
}
