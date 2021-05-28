import { Entity, Column } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { AbstractEntity } from './abstract-entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {

  @Column({ unique: true })
  name: string;

  @Column({ default: null, nullable: true })
  description: string | null;


  @Column({ default: null, nullable: true })
  image: string | null;

  toJSON() {
    return classToPlain(this);
  }
}
