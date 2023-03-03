import { Exclude, Transform } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import 'dotenv/config';
import { hash } from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '255' })
  login: string;

  @Exclude()
  @Column({ type: 'varchar', length: '255' })
  password: string;

  @BeforeInsert()
  async passwordHash() {
    const saltOrRounds = parseInt(process.env.CRYPT_SALT);
    this.password = await hash(this.password, saltOrRounds);
  }

  @VersionColumn({ type: 'integer', default: 1 })
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime())
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => value.getTime())
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
