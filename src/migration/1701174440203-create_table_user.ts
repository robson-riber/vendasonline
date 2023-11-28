import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableUser1701174440203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE user(
            id integer NOT NULL AUTO_INCREMENT,
            name VARCHAR(40) NOT NULL,
            email VARCHAR(40) NOT NULL,
            cpf VARCHAR(15) NOT NULL,
            type_user int NOT NULL,
            phone VARCHAR(12) NOT NULL,
            password VARCHAR(200) NOT NULL,
            created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            primary key (id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`drop table user`);
    }

}
