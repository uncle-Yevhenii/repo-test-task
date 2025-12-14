import { CategoryService } from "@/modules/category/category.service";
import { RiskModel, IRiskDocument } from "@/models/risk.model";
import { MyContext } from "@/plugins/apollo.plugin";
import { GraphQLError } from "graphql";
import mongoose, { QueryFilter } from "mongoose";
import {
  CreateRiskInput,
  InputMaybe,
  PaginationInput,
  RiskFilterInput,
  UpdateRiskInput,
} from "@/generated/graphql";

export class RiskService {
  private categoryService: CategoryService;

  constructor(private readonly ctx: MyContext) {
    this.categoryService = new CategoryService(ctx);
  }

  private async findRiskByName(name: string) {
    const risk = await RiskModel.findOne({
      name,
    });
    return risk;
  }

  private async findRiskById(riskiId: string) {
    if (!mongoose.Types.ObjectId.isValid(riskiId)) {
      throw new GraphQLError(`Risk ID "${riskiId}" is not a valid ObjectId`, {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const risk = await RiskModel.findById(riskiId);
    return risk;
  }

  async createRisk(input: CreateRiskInput) {
    const { user } = this.ctx;
    const { categoryId, description, name, status } = input;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const normalizedName = name.trim().toLowerCase();
    const trimmedDescription = description.trim();

    if (normalizedName.length <= 3) {
      throw new GraphQLError("Name must be longer than 3 characters.", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (trimmedDescription.length <= 6) {
      throw new GraphQLError("Description must be longer than 6 characters.", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const [existRisk, categoryExists] = await Promise.all([
      this.findRiskByName(normalizedName),
      this.categoryService.findCategory(categoryId),
    ]);

    if (existRisk) {
      throw new GraphQLError(`Risk with name "${input.name}" already exists`, {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (!categoryExists) {
      throw new GraphQLError(
        `Category with ID "${categoryId}" does not exist.`,
        {
          extensions: { code: "BAD_USER_INPUT" },
        }
      );
    }

    const newRisk = await RiskModel.create({
      name: normalizedName,
      description: trimmedDescription,
      status,
      category: categoryId,
      createdBy: user.username,
    });

    return newRisk;
  }

  async updateRisk(id: string, input: UpdateRiskInput) {
    const { user } = this.ctx;
    const { categoryId, description, name, status } = input;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    if ([name, description, categoryId, status].every((v) => v === undefined)) {
      throw new GraphQLError("No update data provided.", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const risk = await this.findRiskById(id);
    if (!risk) {
      throw new GraphQLError(`Risk with id "${id}" not found.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (risk.createdBy !== user.username) {
      throw new GraphQLError(
        "Forbidden: You are not allowed to update this risk.",
        {
          extensions: { code: "FORBIDDEN" },
        }
      );
    }

    if (name) {
      const normalizedName = name.trim().toLowerCase();
      if (normalizedName.length <= 3) {
        throw new GraphQLError("Name must be longer than 3 characters.", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (normalizedName !== risk.name) {
        const existingRisk = await this.findRiskByName(normalizedName);
        if (existingRisk) {
          throw new GraphQLError(
            `A risk with the name "${name}" already exists.`,
            { extensions: { code: "BAD_USER_INPUT" } }
          );
        }
        risk.name = normalizedName;
      }
    }

    if (description) {
      const trimmedDescription = description.trim();
      if (trimmedDescription.length <= 6) {
        throw new GraphQLError(
          "Description must be longer than 6 characters.",
          {
            extensions: { code: "BAD_USER_INPUT" },
          }
        );
      }
      risk.description = trimmedDescription;
    }

    if (status) {
      risk.status = status;
    }

    if (categoryId && risk.category.toString() !== categoryId) {
      const newCategory = await this.categoryService.findCategory(categoryId);

      if (!newCategory) {
        throw new GraphQLError(
          `Category with ID "${categoryId}" does not exist.`,
          { extensions: { code: "BAD_USER_INPUT" } }
        );
      }

      if (newCategory.createdBy !== user.username) {
        throw new GraphQLError(
          `Forbidden: You can only assign categories that you have created.`,
          { extensions: { code: "FORBIDDEN" } }
        );
      }

      risk.category = newCategory._id;
    }

    const updatedRisk = await risk.save();
    return updatedRisk;
  }

  async deleteRisk(id: string) {
    const { user } = this.ctx;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const risk = await this.findRiskById(id);
    if (!risk) {
      throw new GraphQLError(`Risk with id "${id}" not found.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (risk.createdBy !== user.username) {
      throw new GraphQLError(
        "Forbidden: You are not allowed to delete this risk.",
        {
          extensions: { code: "FORBIDDEN" },
        }
      );
    }

    await RiskModel.findByIdAndDelete(id);

    return id;
  }

  async findRisk(id: string) {
    const { user } = this.ctx;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const risk = await this.findRiskById(id);
    if (!risk) {
      throw new GraphQLError(`Risk with id "${id}" not found.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (risk.createdBy !== user.username) {
      throw new GraphQLError(
        "Forbidden: You are not allowed to delete this risk.",
        {
          extensions: { code: "FORBIDDEN" },
        }
      );
    }

    return risk;
  }

  async findRisks(
    filter: InputMaybe<RiskFilterInput> | undefined,
    pagination: InputMaybe<PaginationInput> | undefined
  ) {
    const { user } = this.ctx;
    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const page = pagination?.page ?? 1;
    const pageSize = pagination?.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const queryFilter: QueryFilter<IRiskDocument> = {
      createdBy: user.username,
    };

    if (filter?.status) {
      queryFilter.status = filter.status;
    }

    if (filter?.categoryId) {
      queryFilter.category = filter.categoryId;
    }

    if (filter?.q) {
      queryFilter.$or = [
        { name: { $regex: filter.q, $options: "i" } },
        { description: { $regex: filter.q, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      RiskModel.find(queryFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      RiskModel.countDocuments(queryFilter),
    ]);

    return {
      items,
      pageInfo: {
        total,
        page,
        pageSize,
        hasMore: page * pageSize < total,
      },
    };
  }
}
