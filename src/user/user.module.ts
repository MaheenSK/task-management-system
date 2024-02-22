import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  //  JwtModule.register({
  //   secret: "This is a secret key.",
  //   signOptions: {
  //     expiresIn: '1h'
  //   }
  // })
],
  controllers: [UserController],
  providers: [UserService,
    //  JwtStrategy
    ],
  exports: [UserService, ]
})
export class UserModule { }
