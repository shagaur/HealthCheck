import mongoose, { Schema, Document, Model } from "mongoose";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ORG_ADMIN = "ORG_ADMIN",
  DOCTOR = "DOCTOR",
  TECHNICIAN = "TECHNICIAN",
  OFFICE_MANAGER = "OFFICE_MANAGER",
  STAFF = "STAFF",
}

interface RoleMeta {
  specialization?: string;
  experience?: number;
  qualification?: string;
  licenseNumber?: string;
}

export interface IUser extends Document {
  orgId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  roleMeta?: RoleMeta;
  isActive: boolean;
  refreshToken?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // IMPORTANT for security
    },

    phone: String,

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// Unique email per organization
UserSchema.index({ orgId: 1, email: 1 }, { unique: true });

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
