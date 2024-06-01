import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Client } from './clients.model';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>
  ) {}

  async getClients() {
    const clients = await this.clientModel.find().exec();
    return clients.map((client) => ({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      email: client.email,
      location: client.location,
    }));
  }

  async getSingleClient(clientId: string) {
    const client = await this.findClient(clientId);
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      email: client.email,
      location: client.location,
    };
  }
  async createClient(
    firstName: string,
    lastName: string,
    phone: number,
    email: string,
    location: string
  ) {
    const newClient = new this.clientModel({
      firstName,
      lastName,
      phone,
      email,
      location,
    });
    const result = await newClient.save();
    return result;
  }

  async updateClient(
    clientId: string,
    firstName: string,
    lastName: string,
    phone: number,
    email: string,
    location: string
  ) {
    const updatedClient = await this.findClient(clientId);
    if (firstName) {
      updatedClient.firstName = firstName;
    }
    if (lastName) {
      updatedClient.lastName = lastName;
    }
    if (email) {
      updatedClient.email = email;
    }
    if (phone) {
      updatedClient.phone = phone;
    }
    if (location) {
      updatedClient.location = location;
    }
    updatedClient.save();
  }
  async deleteClient(clientId: string) {
    await this.clientModel.deleteOne({ _id: clientId }).exec();
  }

  private async findClient(id: string): Promise<Client> {
    let client;
    try {
      client = await this.clientModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find client.');
    }
    if (!client) {
      throw new NotFoundException('Could not find client.');
    }
    return client;
  }
}
