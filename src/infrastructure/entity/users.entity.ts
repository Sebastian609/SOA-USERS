import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Role } from './roles.entity'; // Make sure this import path is correct

@Entity('tbl_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column('text')
  password: string;

  @Column({ name: 'name', length: 80 })
  name: string;

  @Column({ name: 'first_lastname', length: 80 })
  firstLastname: string;

  @Column({ name: 'second_lastname', length: 80, nullable: true })
  secondLastname: string | null;

  @Column({ length: 20 })
  username: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({name: 'role_id'})
  roleId: number;

  @Column({name: 'deleted',default: false})
  deleted: boolean;

  @ManyToOne(() => Role, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}   