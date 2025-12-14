export interface ICategory {
  name: string;
  description: string;
  createdBy: string;
}

export interface ICategoryWithDates extends ICategory {
  id: string;
  createdAt: string;
  updatedAt: string;
}
