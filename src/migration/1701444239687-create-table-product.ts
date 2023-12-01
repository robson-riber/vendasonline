import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableProduct1701444239687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
            CREATE TABLE product (
                id integer NOT NULL AUTO_INCREMENT,
                category_id integer NOT NULL,
                name VARCHAR(40) NOT NULL,
                price double precision NOT NULL,
                image VARCHAR(40) NOT NULL,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                primary key (id),
                foreign key (category_id) references category(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP TABLE products');
    }

}
