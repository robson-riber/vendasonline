import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableCartProduct1701729465019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
        CREATE TABLE cart_product (
            id integer NOT NULL AUTO_INCREMENT,
            cart_id integer NOT NULL,
            product_id integer NOT NULL,
            amount integer NOT NULL,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
            primary key (id),
            foreign key (cart_id) references cart(id),
            foreign key (product_id) references product(id)
        );
        
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('drop table cart_product');
    }


}
