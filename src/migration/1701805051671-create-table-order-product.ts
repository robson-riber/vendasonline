import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableOrderProduct1701805051671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE order_product (
                id integer NOT NULL AUTO_INCREMENT,
                order_id int NOT NULL,
                product_id int NOT NULL,
                amount int NOT NULL,
                price int NOT NULL,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                primary key (id),
                foreign key (order_id) references orders(id),
                foreign key (product_id) references product(id)
            );
        `);
    }

    
    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP TABLE order_product');
    }

}
