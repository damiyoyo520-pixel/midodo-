import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'creator' | 'admin';
  inviteCode?: string;
  commissionRate?: number;
  avatar?: string;
  bio?: string;
  phone?: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  comparePassword: (password: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username must be less than 30 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'creator', 'admin'],
    default: 'user',
  },
  inviteCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  commissionRate: {
    type: Number,
    default: 0.1,
    min: 0,
    max: 0.5,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio must be less than 500 characters'],
    default: '',
  },
  phone: {
    type: String,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS || '12'));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ role: 1 });

export const User = model<IUser>('User', UserSchema);
