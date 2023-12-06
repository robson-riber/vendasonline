import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTablePayment1701864530258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`ALTER TABLE payment CHANGE COLUMN amount_payments amount_payments VARCHAR(200) NULL`);
        queryRunner.query(`ALTER TABLE payment CHANGE COLUMN code code VARCHAR(200) NULL`);
        queryRunner.query(`ALTER TABLE payment CHANGE COLUMN date_payment date_payment TIMESTAMP NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
