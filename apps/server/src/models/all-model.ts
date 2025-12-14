import { CategoryModel } from "./category.model";
import { RiskModel } from "./risk.model";

export const models = {
  Category: CategoryModel,
  Risk: RiskModel,
};

export type DbModels = typeof models;
