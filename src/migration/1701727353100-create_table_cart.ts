import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableCart1701727353100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
            CREATE TABLE cart (
                id integer NOT NULL,
                user_id integer NOT NULL,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                primary key (id),
                foreign key (user_id) references user(id)
            );
       
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP TABLE cart');
    }

}
