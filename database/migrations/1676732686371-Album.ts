import { MigrationInterface, QueryRunner } from 'typeorm';

export class Album1676732686371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('albums', [
      {
        name: 'Migrated Album',
        year: 2000,
      },
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE albums CASCADE`);
  }
}
