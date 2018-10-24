import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sighting {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bear_type: string;

  @Column()
  notes: string;

  @Column()
  zip_code: string;

  @Column()
  num_bears: number;

  @Column()
  created_at: Date;
}