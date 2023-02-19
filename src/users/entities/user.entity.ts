import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '255' })
  login: string;

  @Exclude()
  @Column({ type: 'varchar', length: '255' })
  password: string;

  @VersionColumn({ type: 'integer', default: 1 })
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

}
