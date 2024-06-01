import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ContentModule } from './content/content.module';
import { SendMailModule } from './sendemail/sendemail.module';
@Module({
  imports: [
    // MongooseModule.forRoot(
    //   // 'mongodb+srv://doadmin:MT685h140RfB3UI9@sonova-db-97563432.mongo.ondigitalocean.com/sonova?tls=true&authSource=admin'
    //   'mongodb://localhost:27017',
    //   {
    //     dbName: 'services-app',
    //   }
    // ),
    // ClientsModule,
    // InvoicesModule,
    // PaymentModule,
    // ContentModule,
    // SendMailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
