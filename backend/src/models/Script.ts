import { Schema, model, Document, Types } from 'mongoose';

export interface IScript extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  genre: '海外' | '文旅' | '非遗';
  price: number;
  wordCount: number;
  author: Types.ObjectId;
  director?: string;
  tags: string[];
  image: string;
  outline: string;
  isPublished: boolean;
  isFeatured: boolean;
  rating: number;
  views: number;
  sales: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ScriptSchema = new Schema<IScript>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description must be less than 2000 characters'],
  },
  genre: {
    type: String,
    enum: ['海外', '文旅', '非遗'],
    required: [true, 'Genre is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  wordCount: {
    type: Number,
    required: [true, 'Word count is required'],
    min: [0, 'Word count cannot be negative'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required'],
  },
  director: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  image: {
    type: String,
    default: '',
  },
  outline: {
    type: String,
    default: '',
    maxlength: [10000, 'Outline must be less than 10000 characters'],
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  views: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

ScriptSchema.index({ genre: 1, isPublished: 1, createdAt: -1 });
ScriptSchema.index({ author: 1, isPublished: 1 });
ScriptSchema.index({ isFeatured: 1, isPublished: 1 });
ScriptSchema.index({ title: 'text', description: 'text', tags: 'text' });

export const Script = model<IScript>('Script', ScriptSchema);
