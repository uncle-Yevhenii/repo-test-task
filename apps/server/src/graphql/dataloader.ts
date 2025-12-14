import DataLoader from "dataloader";
import { CategoryModel, ICategoryDocument } from "@models/category.model";

export interface Loaders {
  categoryLoader: DataLoader<string, ICategoryDocument | null>;
}

export const createLoaders = (): Loaders => ({
  categoryLoader: new DataLoader<string, ICategoryDocument | null>(
    async (categoryIds: readonly string[]) => {
      const categories = await CategoryModel.find({
        _id: { $in: categoryIds },
      });

      const categoryMap: Record<string, ICategoryDocument> = {};
      categories.forEach((cat) => {
        categoryMap[cat._id.toString()] = cat;
      });

      return categoryIds.map((id) => categoryMap[id] || null);
    }
  ),
});
