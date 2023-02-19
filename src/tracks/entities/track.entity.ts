import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('Track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid', nullable: true, default: null  })
  artistId: string | null;
  
  @Column({ type: 'uuid', nullable: true, default: null  })
  albumId: string | null;
  
  @Column({ type: 'integer' })
  duration: number;
}
