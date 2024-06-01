import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsSchema } from './clients.model';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientsSchema }]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
