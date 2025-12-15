import mongoose, { Schema, Document, Types } from "mongoose";
import { ICategory } from "@repo/interfaces";

export interface ICategoryDocument extends ICategory, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
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

categorySchema.index({ name: "text", description: "text" });
categorySchema.index({ createdAt: -1 });

categorySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const categoryId = doc._id;
    const Risk = mongoose.model("Risk");
    await Risk.updateMany(
      { category: categoryId },
      { $set: { category: null } }
    );
  }
});

export const CategoryModel = mongoose.model<ICategoryDocument>(
  "Category",
  categorySchema
);

export function toCategoryDTO(
  doc: ICategoryDocument
): ICategory & { id: string } {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    createdBy: doc.createdBy,
  };
}
