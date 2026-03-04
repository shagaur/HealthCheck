import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPatient extends Document {
  orgId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  gender: string;
  phone?: string;
  address?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },

    phone: String,
    address: String,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Patient: Model<IPatient> =
  mongoose.model<IPatient>("Patient", PatientSchema);