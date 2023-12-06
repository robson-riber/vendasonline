import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertStatus1701864496156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        queryRunner.query(`INSERT INTO payment_status(name) VALUES ('Done')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`DELETE FROM payment_status wHERE ID = 1`);
    }

}
