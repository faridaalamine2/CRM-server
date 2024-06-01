import * as mongoose from 'mongoose';

export const ClientsSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  phone: { type: Number},
  email: { type: String },
  location: { type: String },
});

export interface Client extends mongoose.Document {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  location: string;
}
