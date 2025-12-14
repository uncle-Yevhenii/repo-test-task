import { ICategoryWithDates } from "./category.schema";

export enum RiskStatusEnum {
  RESOLVED = "RESOLVED",
  UNRESOLVED = "UNRESOLVED",
}

export interface IRisk {
  name: string;
  description: string;
  categoryId: string;
  status: RiskStatusEnum;
  createdBy: string;
}

export interface IRiskWithDates extends IRisk {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRiskPopulated extends Omit<IRiskWithDates, "categoryId"> {
  category: ICategoryWithDates;
}
