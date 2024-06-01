import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { InvoicesSchema } from './invoices.model';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoicesSchema }]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
