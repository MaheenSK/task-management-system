import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';
import { Public } from './SkipAuth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerUserDto : RegisterUserDto){
    return this.authService.register(registerUserDto)
  }

  @Public()
  @Post('login')
  login(@Body() loginUserDto:LoginUserDto ){
    return this.authService.login(loginUserDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return this.authService.getProfile(req.user)
  }

}
