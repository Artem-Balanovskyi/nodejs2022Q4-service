import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1676714474399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('users', [
      {
        login: 'Migrated User',
        password: 'Migrated Password',
      },
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE users CASCADE`);
  }
}
