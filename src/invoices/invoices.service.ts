import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { Invoice } from './invoices.model';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel('Invoice') private readonly invoiceModel: Model<Invoice>
  ) {}

  async getInvoices() {
    const invoices = await this.invoiceModel.find().exec();
    return invoices.map((invoice) => ({
      id: invoice.id,
      title: invoice.title,
      notes: invoice.notes,
      createDate: invoice.createDate,
      lastModifiedDate: invoice.lastModifiedDate,
      client_id: invoice.client_id,
    }));
  }

  async getSingleInvoice(invoiceId: string) {
    const invoice = await this.findInvoice(invoiceId);
    console.log(typeof invoice.createDate);
    return {
      id: invoice.id,
      title: invoice.title,
      notes: invoice.notes,
      createDate: invoice.createDate,
      lastModifiedDate: invoice.lastModifiedDate,
      client_id: invoice.client_id,
    };
  }
  async createInvoice(
    title: string,
    notes: string,
    createDate: string,
    lastModifiedDate: string,
    client_id: string,
    media: string
  ) {
    const newInvoice = new this.invoiceModel({
      title,
      notes,
      createDate,
      lastModifiedDate,
      client_id,
      media,
    });
    const result = await newInvoice.save();
    return result.id as string;
  }

  async updateInvoice(
    id: string,
    title: string,
    notes: string,
    lastModifiedDate: string,
    client_id: string
  ) {
    const updatedInvoice = await this.findInvoice(id);
    if (title) {
      updatedInvoice.title = title;
    }
    if (notes) {
      updatedInvoice.notes = notes;
    }
    if (lastModifiedDate) {
      updatedInvoice.lastModifiedDate = lastModifiedDate;
    }
    if (client_id) {
      updatedInvoice.client_id = client_id;
    }
    updatedInvoice.save();
  }
  async deleteInvoice(invoiceId: string) {
    await this.invoiceModel.deleteOne({ _id: invoiceId }).exec();
  }

  private async findInvoice(id: string): Promise<Invoice> {
    let invoice;
    try {
      invoice = await this.invoiceModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find invoice');
    }
    if (!invoice) {
      throw new NotFoundException('Could not find invoice');
    }
    return invoice;
  }
}
