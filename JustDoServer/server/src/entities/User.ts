import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @OneToMany(type => Task, task => task.id)
  tasks: Task[];

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

}
