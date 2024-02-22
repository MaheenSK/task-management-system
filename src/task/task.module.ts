import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    // secret: "This is a secret key.",
    // signOptions: {
    //   expiresIn: '1h'
    // }
    // })
  ], 
  controllers: [TaskController],
  providers: [TaskService, 
    // JwtStrategy
  ],
})
export class TaskModule {}
