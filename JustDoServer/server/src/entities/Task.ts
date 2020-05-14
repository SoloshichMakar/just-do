import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne, JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  due_date: string;

  @Column()
  priority: string;

  @Column()
  notification_date: string;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({name: 'userId'})
  user: User;

  @Column({ nullable: false })
  userId: number;

  @Column()
  completed: boolean;

  constructor(
    name: string,
    description: string,
    due_date: string,
    priority: string,
    notification_date: string,
    userId: number,
    completed: boolean
  ) {
    super();
    this.name = name;
    this.description = description;
    this.due_date = due_date;
    this.priority = priority;
    this.notification_date = notification_date;
    this.userId = userId;
    this.completed = completed;
  }
}
