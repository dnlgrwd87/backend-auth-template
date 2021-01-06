import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_account')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'auth_id', unique: true })
  authId: string;

  @Column({ unique: true })
  email: string;
}
