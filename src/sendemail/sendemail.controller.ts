import { Controller } from '@nestjs/common';
import { Get, Patch, Delete, Post, Body, Param } from '@nestjs/common';
import { SendMailService } from './sendemail.service';
import { SendEmailInterface } from './sendmail.model';

@Controller('email')
export class SendMailController {
  constructor(private sendmailService: SendMailService) {}

  // @Post()
  // async getContents(@Body() params: SendEmailInterface): Promise<any> {
  //   this.sendmailService.sendEmail(params);
  // }
}
