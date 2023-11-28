import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableAddress1701177610425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        CREATE TABLE address (
            id integer NOT NULL AUTO_INCREMENT,
            user_id integer NOT NULL,
            complement VARCHAR(50),
            number integer NOT NULL,
            cep VARCHAR(10) NOT NULL,
            city_id integer NOT NULL,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
            primary key (id),
            foreign key (user_id) references user(id),
            foreign key (city_id) references city(id)
        );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('drop table address');
    }

}
