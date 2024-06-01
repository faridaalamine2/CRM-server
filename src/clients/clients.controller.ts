import { Controller } from '@nestjs/common';
import { Get, Patch, Delete, Post, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './create-client.dto';
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async getAllClients() {
    const clients = await this.clientsService.getClients();
    return clients;
  }
  @Get(':id')
  getClient(@Param('id') clientId: string) {
    return this.clientsService.getSingleClient(clientId);
  }

  @Post()
  async createClient(@Body() CreateClientDto: CreateClientDto) {
    console.log(CreateClientDto);
    const newClient = await this.clientsService.createClient(
      CreateClientDto.firstName,
      CreateClientDto.lastName,
      CreateClientDto.phone,
      CreateClientDto.email,
      CreateClientDto.location
    );
    return newClient;
  }

  @Patch(':id')
  async updateClient(
    @Param('id') clientId: string,
    @Body() CreateClientDto: CreateClientDto
  ) {
    await this.clientsService.updateClient(
      clientId,
      CreateClientDto.firstName,
      CreateClientDto.lastName,
      CreateClientDto.phone,
      CreateClientDto.email,
      CreateClientDto.location
    );
    return null;
  }

  @Delete(':id')
  async removeClient(@Param('id') clientId: string) {
    await this.clientsService.deleteClient(clientId);
    return null;
  }
}
