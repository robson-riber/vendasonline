import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableCity1701177594556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`CREATE TABLE city (
            id integer NOT NULL AUTO_INCREMENT,
            state_id integer NOT NULL,
            name VARCHAR(30) NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY fk_city_state_idx (state_id),
            CONSTRAINT fk_city_state FOREIGN KEY (state_id) REFERENCES state (id)
        );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('drop table city');
    }

}
