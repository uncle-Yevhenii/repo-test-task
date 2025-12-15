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
      // If the parent risk has no category, return null immediately.
      if (!parent.category) {
        return null;
      }
      const category = await context.loaders.categoryLoader.load(
        parent.category.toString()
      );

      // The dataloader might return an Error object or null if not found.
      // Returning null is more graceful than throwing.
      if (!category || category instanceof Error) {
        return null;
      }
      return category;
    },
  },
};
