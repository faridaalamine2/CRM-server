import * as mongoose from 'mongoose';
export const InvoicesSchema = new mongoose.Schema({
  title: String,
  notes: String,
  createDate: String,
  lastModifiedDate: String,
  media: String,
  client_id: { type: String, required: true },
});

export interface Invoice extends mongoose.Document {
  id: number;
  title: string;
  notes: string;
  createDate: string;
  lastModifiedDate: string;
  client_id: string;
  media: string;
}
