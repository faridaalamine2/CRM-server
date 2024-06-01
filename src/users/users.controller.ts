import { Controller, UnauthorizedException } from '@nestjs/common';
import { Get, Patch, Delete, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
@Controller('users')
export class UsersController {
  constructor(private Userservice: UsersService) {}

  @Get()
  async getAllUsers() {
    const users = await this.Userservice.getUsers();
    return users;
  }
  @Get(':id')
  getUser(@Param('id') UsersId: string) {
    return this.Userservice.getSingleUser(UsersId);
  }

  @Post()
  async createUser(@Body() UserDto: UserDto) {
    const generatedId = await this.Userservice.createUser(
      UserDto.username,
      UserDto.password,
      UserDto.firstName,
      UserDto.lastName,
      UserDto.email,
      UserDto.phone,
      UserDto.role
    );
    return { id: generatedId };
  }

  @Post('login')
  async checkLogin(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.Userservice.findByUsernameAndPassword(
      username,
      password
    );
    if (!user) throw new UnauthorizedException('invalid username and pass');
    else return { message: 'login successful' };
  }
  @Patch(':id')
  async updateUser(@Param('id') UserId: string, @Body() UserDto: UserDto) {
    await this.Userservice.updateUser(
      UserId,
      UserDto.username,
      UserDto.password,
      UserDto.firstName,
      UserDto.lastName,
      UserDto.email,
      UserDto.phone,
      UserDto.role
    );
    return null;
  }

  @Delete(':id')
  async removeClient(@Param('id') UserId: string) {
    await this.Userservice.deleteUser(UserId);
    return null;
  }
}
