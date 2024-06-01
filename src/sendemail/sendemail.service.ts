// import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailInterface } from './sendmail.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMailService {
  // constructor(private readonly mailerService: MailerService) {}
  // async sendEmail(params: SendEmailInterface) {
  //   return await this.mailerService.sendMail({
  //     from: 'info@midspot.ca', // sender address
  //     to: 'info@midspot.ca', // list of receivers
  //     subject: 'MIDSPOT Website Contact', // Subject line
  //     // text: params.message, // plaintext body
  //     html:
  //       '<p>Contact Name: ' +
  //       params.name +
  //       '</p> <p>Email: ' +
  //       params.email +
  //       '</p> <p>Phone Number: ' +
  //       params.phoneNumber +
  //       '</p> <p>Company: ' +
  //       params.company +
  //       '</p> <br/><br/> <b>Message:</b> <br/>' +
  //       params.message, // html body
  //   });
  // }
}
