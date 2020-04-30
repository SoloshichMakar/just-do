import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from 'typeorm'
import {User} from "./User";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    due_date: string

    @Column()
    priority: string

    @Column()
    notification_date: string

    @ManyToOne(type => User, user => user.id)
    user_id: number

    @Column()
    completed: boolean

}