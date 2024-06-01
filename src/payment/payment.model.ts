import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  amount: Number,
  createDate: String,
});

export interface Payment extends mongoose.Document {
  id: number;
  amount: number;
  createDate: string;
}
