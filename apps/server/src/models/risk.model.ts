import mongoose, { Schema, Document, Types } from "mongoose";
import { IRisk, RiskStatusEnum } from "@repo/interfaces";

export interface IRiskDocument extends Omit<IRisk, "categoryId">, Document {
  _id: Types.ObjectId;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const riskSchema = new Schema<IRiskDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(RiskStatusEnum),
      default: RiskStatusEnum.UNRESOLVED,
      required: true,
      index: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

riskSchema.index({ name: "text", description: "text" });
riskSchema.index({ createdAt: -1 });
riskSchema.index({ status: 1, createdAt: -1 });

export const RiskModel = mongoose.model<IRiskDocument>("Risk", riskSchema);

export function toRiskDTO(doc: IRiskDocument): IRisk & { id: string } {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    categoryId: doc.category?.toString() || null,
    status: doc.status,
    createdBy: doc.createdBy,
  };
}
