import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableState1701177580577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`CREATE TABLE state (
            id integer NOT NULL AUTO_INCREMENT,
            name VARCHAR(40) NOT NULL,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
            primary key (id)
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('drop table state');
    }

}
