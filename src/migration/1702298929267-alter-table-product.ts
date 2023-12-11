import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableProduct1702298929267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('ALTER TABLE product ADD COLUMN weight DECIMAL(10,2) NOT NULL');
        queryRunner.query('ALTER TABLE product ADD COLUMN lenght INTEGER NOT NULL');
        queryRunner.query('ALTER TABLE product ADD COLUMN height INTEGER NOT NULL');
        queryRunner.query('ALTER TABLE product ADD COLUMN width INTEGER NOT NULL');
        queryRunner.query('ALTER TABLE product ADD COLUMN diameter INTEGER NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('ALTER TABLE product DROP weight');
        queryRunner.query('ALTER TABLE product DROP lenght');
        queryRunner.query('ALTER TABLE product DROP height');
        queryRunner.query('ALTER TABLE product DROP width');
        queryRunner.query('ALTER TABLE product DROP diameter');
    }
}
