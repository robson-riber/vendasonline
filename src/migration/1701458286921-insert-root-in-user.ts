import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertRootInUser1701458286921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

            queryRunner.query(`
                INSERT INTO user(name, email, cpf, type_user, phone, password) 
                VALUES ('root','root@root.com.br','1234567-7', 2, '11-2222-3333', '$2b$10$kmBM6A8i.y840/YE2jVfXe.hJrFyLbzO/WJWzeiyYXg4mzK63alt2')
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM user WHERE email = 'root@root.com.br'`)
    }

}
