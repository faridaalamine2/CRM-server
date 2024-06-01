// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { SendMailController } from './sendemail.controller';
import { SendMailService } from './sendemail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
// require('https').globalAgent.options.ca = require('ssl-root-cas').create();
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   // useFactory: () => ({
    //   transport: {
    //     host: 'smtp.outlook.com',
    //     // port: 587,
    //     // secure: true,
    //     // host: 'midspot.ca',
    //     // service: 'Outlook365',
    //     auth: {
    //       user: 'info@midspot.ca',
    //       pass: 'ramzi_6731@',
    //     },
    //     // tls: { ciphers: 'SSLv3' },
    //   }, // 'smtps://info@midspot.ca:ramzi_6731@@smtp.domain.com',
    //   // defaults: {
    //   //   from: '"nest-modules" <modules@nestjs.com>',
    //   // },
    //   // template: {
    //   //   dir: __dirname + '/templates',
    //   //   adapter: new HandlebarsAdapter(),
    //   //   options: {
    //   //     strict: true,
    //   //   },
    //   // },
    //   // }),
    // }),
  ],
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule {}
