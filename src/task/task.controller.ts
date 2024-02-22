import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  getAllTasks():Promise<Task[]>{
    return this.taskService.getAllTasks()
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // getUserTasks(@Request() req):Promise<Task[]>{
  //   return this.taskService.getUserTasks(req.user.userId)
  // }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req,  @Body() createTaskDto: CreateTaskDto) : Promise<Task>{
    return this.taskService.createTask(req.user.userId, createTaskDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Request() req,  @Param('id') id: string) {
    return this.taskService.deleteTask(req.user.userId, id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Request() req,  @Param('id') id: string, @Body() updateTaskDto:UpdateTaskDto) {
    return this.taskService.updateTask(req.user.userId, id, updateTaskDto);
  }
}
