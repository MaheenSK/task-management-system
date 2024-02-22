import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/SkipAuth.decorator';
import { Roles } from 'src/auth/Roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Put('update')
  update(@Request() req, @Body() updateUserDto:UpdateUserDto){
    return this.userService.updateUser(req.user.userId, updateUserDto);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete(':id')
  deleteUser(@Param('id') id:string){
    return this.userService.deleteUser(id)
  }



  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
