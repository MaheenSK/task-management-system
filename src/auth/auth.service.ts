import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService){}
  async register(registerUserDto: RegisterUserDto): Promise<User>{
    return this.userService.create(registerUserDto);
  }

  async login(loginUserDto: LoginUserDto){
    const {email, password} = loginUserDto
    const user = await this.userService.validateUser(email, password)
    const payload = {email:user.email, role:user.role, sub:user.uuid}
    return{
      access_token: this.jwtService.sign(payload)
    }
  }

  async getProfile(user): Promise<User>{
    return this.userService.findOne(user.userId)
  }
}
