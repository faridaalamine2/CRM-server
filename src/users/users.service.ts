import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
  }
  async createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    role: string
  ) {
    const newUser = new this.userModel({
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      role,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async updateUser(
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    role: string
  ) {
    const updatedUser = await this.findUser(id);
    if (username) {
      updatedUser.username = username;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (firstName) {
      updatedUser.firstName = firstName;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (phone) {
      updatedUser.phone = phone;
    }
    if (role) {
      updatedUser.role = role;
    }

    updatedUser.save();
  }
  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user');
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }
  async findByUsernameAndPassword(username: string, password: string) {
    return this.userModel.findOne({ username, password }).exec();
  }
}
