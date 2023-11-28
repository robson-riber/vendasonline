import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterTableState1701180155869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE state
                add column uf VARCHAR(2)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('ALTER TABLE state drop uf')
    }

}
