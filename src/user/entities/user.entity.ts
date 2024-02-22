import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  uuid:string;

  @Column({type:'varchar', unique:true})
  email:string;

  @Column({type:'varchar'})
  password:string;

  @Column({type:'varchar', default:'user'})
  role:string;

  @OneToMany(()=>Task, task=>task.user, {cascade:true})
  tasks:Task[];
}
