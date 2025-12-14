import { Resolvers } from "@generated/graphql";
import { CategoryService } from "./category.service";

export const resolvers: Resolvers = {
  Mutation: {
    createCategory: async (_, { input }, context) => {
      const result = await new CategoryService(context).createCategory(input);
      return result;
    },

    updateCategory: async (_, { id, input }, context) => {
      const result = await new CategoryService(context).updateCategory(
        id,
        input
      );
      return result;
    },

    deleteCategory: async (_, { id }, context) => {
      const result = await new CategoryService(context).deleteCategory(id);
      return result;
    },
  },

  Query: {
    categories: async (_, { pagination, filter }, context) => {
      const result = await new CategoryService(context).findCategories(
        pagination,
        filter
      );
      return result;
    },
    category: async (_, { id }, context) => {
      const result = await new CategoryService(context).findCategory(id);
      return result;
    },
  },
};
