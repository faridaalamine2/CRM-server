import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { Payment } from './payment.model';
@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>
  ) {}

  async getPayment() {
    const payment = await this.paymentModel.find().exec();
    return payment.map((payment) => ({
      id: payment.id,
      amount: payment.amount,
      createDate: payment.createDate,
    }));
  }

  async getSinglePayment(paymentId: string) {
    const payment = await this.findPayment(paymentId);
    return {
      id: payment.id,
      amount: payment.amount,
      createDate: payment.createDate,
    };
  }
  async createPayment(amount: number, createDate: string) {
    const newPayment = new this.paymentModel({
      amount,
      createDate,
    });
    const result = await newPayment.save();
    return result.id as string;
  }

  async updatePayment(id: string, amount: number) {
    const updatedPayment = await this.findPayment(id);
    if (amount) {
      updatedPayment.amount = amount;
    }
    console.log(updatedPayment);
    updatedPayment.save();
  }
  async deletePayment(paymentId: string) {
    await this.paymentModel.deleteOne({ _id: paymentId }).exec();
  }

  private async findPayment(id: string): Promise<Payment> {
    let payment;
    try {
      payment = await this.paymentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find payment');
    }
    if (!payment) {
      throw new NotFoundException('Could not find payment');
    }
    return payment;
  }
}
