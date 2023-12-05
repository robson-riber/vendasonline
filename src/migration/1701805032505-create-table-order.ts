import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableOrder1701805032505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE orders (
                id integer AUTO_INCREMENT NOT NULL,
                user_id int NOT NULL,
                address_id int NOT NULL,
                date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                payment_id int NOT NULL,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                primary key (id),
                foreign key (user_id) references user(id),
                foreign key (address_id) references address(id),
                foreign key (payment_id) references payment(id)
            );        
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP TABLE orders');
    }

}
