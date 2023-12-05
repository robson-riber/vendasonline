import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableStatus1701802670999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
            CREATE TABLE payment_status (
                id integer NOT NULL AUTO_INCREMENT,
                name VARCHAR(200) NOT NULL,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                primary key (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('DROP TABLE payment_status');
    }

}
