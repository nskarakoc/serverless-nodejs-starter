import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class SampleEntity extends BaseEntity {
  @Column()
  name: string;
}
