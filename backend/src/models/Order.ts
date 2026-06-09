import { Schema, model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  _id: Types.ObjectId;
  orderNumber: string;
  user: Types.ObjectId;
  script: Types.ObjectId;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  amount: number;
  serviceFee: number;
  totalAmount: number;
  paymentMethod?: string;
  paymentTime?: Date;
  paidAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: [true, 'Order number is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  script: {
    type: Schema.Types.ObjectId,
    ref: 'Script',
    required: [true, 'Script is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled', 'refunded'],
    default: 'pending',
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  serviceFee: {
    type: Number,
    required: [true, 'Service fee is required'],
    min: [0, 'Service fee cannot be negative'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative'],
  },
  paymentMethod: {
    type: String,
    enum: ['wechat', 'alipay', 'card', 'balance'],
  },
  paymentTime: {
    type: Date,
  },
  paidAt: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
  refundedAt: {
    type: Date,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ script: 1, status: 1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ status: 1, createdAt: -1 });

OrderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-10);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `DH${timestamp}${random}`;
  }
  next();
});

export const Order = model<IOrder>('Order', OrderSchema);
