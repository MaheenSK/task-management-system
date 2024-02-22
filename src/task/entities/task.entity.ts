import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

  @PrimaryGeneratedColumn('uuid')
  uuid:string;

  @Column()
  title:string;

  @Column()
  description:string;

  @Column({type:'enum',enum:['todo', 'in progress', 'done']})
  status:string;

  @ManyToOne(()=>User, user => user.tasks, {
    onDelete: 'CASCADE'
  })
  user: User;

}
