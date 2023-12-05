import { MigrationInterface, QueryRunner } from "typeorm"
import { Query } from "typeorm/driver/Query";

export class CreateTablePayment1701802686229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE payment (
                id integer NOT NULL AUTO_INCREMENT,
                status_id int NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                discount DECIMAL(10,2) NOT NULL,
                final_price DECIMAL(10,2) NOT NULL,
                type VARCHAR(250) NOT NULL,
                amount_payments int NOT NULL,
                code VARCHAR(200) NOT NULL,
                date_payment timestamp,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
                primary key (id),
                foreign key (status_id) references payment_status(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('DROP TABLE payment');
    }

}
