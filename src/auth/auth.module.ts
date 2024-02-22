import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports:[ JwtModule.register({
    global:true,
    secret:"This is a secret key.",
    signOptions:{
      expiresIn:'1h'
    }
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, {
    provide:APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AuthModule {}
