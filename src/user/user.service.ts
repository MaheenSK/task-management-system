import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise <User>{
    const {email, password} = createUserDto;
    const existingUser = await this.userRepository.findOneBy({email})
    if(existingUser){
      throw new ConflictException("User already exists");
    }
    const user = new User()
    user.email = email;
    user.password = password;
    user.tasks = [];
    return this.userRepository.save(user)
  }

  async validateUser(email, password): Promise<User>{
    const user = await this.userRepository.findOneBy({email});
    if(!user || user.password !== password){
      throw new UnauthorizedException('Invalid Credentials')
    }
    return user
  }

  findOne(uuid: string): Promise<User>{
    return this.userRepository.findOneBy({uuid})
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
     const user = await this.userRepository.findOneBy({uuid:id})
     const {email, password} = updateUserDto
     if(email)
     {
      user.email = email;
     }
     if(password)
     {
      user.password = password;
     }
     return this.userRepository.save(user)
  }

  deleteUser(id:string){
    return this.userRepository.delete(id)
  }
}
