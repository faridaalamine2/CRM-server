import { Controller } from '@nestjs/common';
import { Get, Patch, Delete, Post, Body, Param } from '@nestjs/common';
import { PaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  async getAllPayments() {
    const payment = await this.paymentService.getPayment();
    return payment;
  }
  @Get(':id')
  getpayment(@Param('id') paymentId: string) {
    return this.paymentService.getSinglePayment(paymentId);
  }

  @Post()
  async createpayment(@Body() paymentDto: PaymentDto) {
    const generatedId = await this.paymentService.createPayment(
      paymentDto.amount,
      paymentDto.createDate
    );
    return { id: generatedId };
  }

  @Patch(':id')
  async updatepayment(
    @Param('id') paymentId: string,
    @Body() paymentDto: PaymentDto
  ) {
    await this.paymentService.updatePayment(paymentId, paymentDto.amount);
    return null;
  }

  @Delete(':id')
  async removeClient(@Param('id') paymentId: string) {
    await this.paymentService.deletePayment(paymentId);
    return null;
  }
}
