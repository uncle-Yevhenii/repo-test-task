import { Resolvers } from "@generated/graphql";
import { RiskService } from "./risk.service";

export const resolvers: Resolvers = {
  Mutation: {
    createRisk: async (_, { input }, context) => {
      const result = await new RiskService(context).createRisk(input);
      return result;
    },

    updateRisk: async (_, { id, input }, context) => {
      const result = await new RiskService(context).updateRisk(id, input);
      return result;
    },

    deleteRisk: async (_, { id }, context) => {
      const result = await new RiskService(context).deleteRisk(id);
      return result;
    },
  },

  Query: {
    risk: async (_, { id }, context) => {
      const result = await new RiskService(context).findRisk(id);
      return result;
    },

    risks: async (_, { filter, pagination }, context) => {
      const result = await new RiskService(context).findRisks(
        filter,
        pagination
      );
      return result;
    },
  },

  Risk: {
    category: async (parent, _, context) => {
      const category = await context.loaders.categoryLoader.load(
        parent.category.toString()
      );

      if (!category) {
        throw new Error(
          `Critical: Category with ID ${parent.category} not found for risk ${parent._id}`
        );
      }
      return category;
    },
  },
};
