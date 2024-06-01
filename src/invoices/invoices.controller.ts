import { Controller } from '@nestjs/common';
import {
  Get,
  Patch,
  Delete,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoiceDto } from './invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = file.originalname.split('.').pop();
      callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    },
  }),
};

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  async getAllInvoices() {
    const invoices = await this.invoicesService.getInvoices();
    return invoices;
  }
  @Get(':id')
  getInvoice(@Param('id') invoiceId: string) {
    return this.invoicesService.getSingleInvoice(invoiceId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('media', multerConfig))
  async createInvoice(@Body() InvoiceDto: InvoiceDto, @UploadedFile() file) {
    console.log(file);
    console.log(InvoiceDto);
    // const filePath = `${file.destination}/${file.filename}`;
    // const generatedId = await this.invoicesService.createInvoice(
    //   InvoiceDto.title,
    //   InvoiceDto.notes,
    //   InvoiceDto.createDate,
    //   InvoiceDto.lastModifiedDate,
    //   InvoiceDto.client_id,
    //   filePath
    // );
    // return { id: generatedId };
  }
  // @Post(':clientId')
  // async createInvoiceForClient(@Body() InvoiceDto: InvoiceDto){
  //   const generatedId = await this.invoicesService.createInvoice(
  //     InvoiceDto.title,InvoiceDto.notes,InvoiceDto.createDate,InvoiceDto.client_id)
  // }
  @Patch(':id')
  async updateInvoice(
    @Param('id') invoiceId: string,
    @Body() InvoiceDto: InvoiceDto
  ) {
    await this.invoicesService.updateInvoice(
      invoiceId,
      InvoiceDto.title,
      InvoiceDto.notes,
      InvoiceDto.lastModifiedDate,
      InvoiceDto.client_id
    );
    return null;
  }

  @Delete(':id')
  async removeClient(@Param('id') invoiceId: string) {
    await this.invoicesService.deleteInvoice(invoiceId);
    return null;
  }
}
