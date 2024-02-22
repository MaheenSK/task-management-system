import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { title } from 'process';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>, 
    @InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async createTask(userId : string, createTaskDto: CreateTaskDto):Promise<Task> {
    const user = await this.userRepository.findOneBy({uuid:userId})

    const task = new Task()
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status;
    task.user = user;

    return this.taskRepository.save(task)
  }

  async deleteTask(userId: string, taskId: string){
    const task = await this.taskRepository.findOneBy({uuid:taskId})
    if(!task){
      throw new NotFoundException('Task not found.')
    }
    if(task.user.uuid !== userId)
    {
      throw new UnauthorizedException("You are unauthorized to delete this task.")
    }
    return this.taskRepository.delete(taskId)
  }

  async updateTask(userId: string, taskId: string, updateTaskDto:UpdateTaskDto): Promise<Task>{
    const task = await this.taskRepository.findOneBy({uuid:taskId})
    if(!task){
      throw new NotFoundException('Task not found.')
    }
    if(task.user.uuid !== userId)
    {
      throw new UnauthorizedException("You are unauthorized to update this task.")
    }
    const {title, description, status} = updateTaskDto;
    if(title)
    {
      task.title = title
    }
    if(description)
    {
      task.description = description
    }
    if(status)
    {
      task.status = status
    }
    return this.taskRepository.save(task)
  }

  getAllTasks():Promise<Task[]>{
    return this.taskRepository.find()
  }

  // async getUserTasks(userId: string):Promise<Task[]>{
  //   const tasks = await this.taskRepository.findBy({user:user.uuid === userId})
  //   return tasks;
  // }
}
