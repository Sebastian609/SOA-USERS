import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Role } from "./roles.entity"; // Make sure this import path is correct

@Entity("tbl_users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column("text")
  password: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "lastname" })
  lastname: string;

  @Column({ name: "document_number" })
  documentNumber: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "is_active",default: true })
  isActive: boolean;

  @Column({ name: "rol_id" })
  rolId: number;

  @Column({ name: "deleted" ,default: false})
  deleted: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "rol_id" })
  rol: Role;
}
