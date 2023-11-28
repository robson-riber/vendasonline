import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertInState1701180331512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (1, 'Acre', 'AC')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (2, 'Alagoas', 'AL')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (3, 'Amapá', 'AP')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (4, 'Amazonas', 'AM')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (5, 'Bahia', 'BA')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (6, 'Ceará', 'CE')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (7, 'Distrito Federal', 'DF')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (8, 'Espírito Santo', 'ES')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (9, 'Goiás', 'GO')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (10, 'Maranhão', 'MA')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (11, 'Mato Grosso', 'MT')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (12, 'Mato Grosso do Sul', 'MS')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (13, 'Minas Gerais', 'MG')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (14, 'Pará', 'PA')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (15, 'Paraíba', 'PB')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (16, 'Paraná', 'PR')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (17, 'Pernambuco', 'PE')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (18, 'Piauí', 'PI')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (19, 'Rio de Janeiro', 'RJ')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (20, 'Rio Grande do Norte', 'RN')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (21, 'Rio Grande do Sul', 'RS')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (22, 'Rondônia', 'RO')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (23, 'Roraima', 'RR')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (24, 'Santa Catarina', 'SC')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (25, 'São Paulo', 'SP')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (26, 'Sergipe', 'SE')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (27, 'Tocantins', 'TO')");
        queryRunner.query("INSERT INTO state(id, name, uf) VALUES (28, 'Outro', 'OT')");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query('DELETE FROM state');
    }

}
