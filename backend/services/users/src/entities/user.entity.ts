import { Entity, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AbstractEntity } from './abstract-entity';

@Entity('users')
export class UserEntity extends AbstractEntity {

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @Column({default: 'user', nullable: true})
  role: string;

  // TODO: add following
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  

  toJSON() {
    return classToPlain(this);
  }
}
