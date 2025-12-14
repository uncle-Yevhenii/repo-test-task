import {
  CategoryFilterInput,
  CreateCategoryInput,
  InputMaybe,
  PaginationInput,
  UpdateCategoryInput,
} from "@/generated/graphql";
import { CategoryModel, ICategoryDocument } from "@/models/category.model";
import { MyContext } from "@/plugins/apollo.plugin";
import { GraphQLError } from "graphql";
import mongoose, { QueryFilter } from "mongoose";

export class CategoryService {
  constructor(private readonly ctx: MyContext) {}

  private async findCategoryByName(name: string) {
    const category = await CategoryModel.findOne({
      name,
    });
    return category;
  }

  private async findCategoryById(categoryId: string) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new GraphQLError(
        `Category ID "${categoryId}" is not a valid ObjectId`,
        { extensions: { code: "BAD_USER_INPUT" } }
      );
    }

    const category = await CategoryModel.findById(categoryId);
    return category;
  }

  async createCategory(input: CreateCategoryInput) {
    const { description, name } = input;
    const { user } = this.ctx;

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

    const existCategory = await this.findCategoryByName(normalizedName);
    if (existCategory) {
      throw new GraphQLError(
        `Category with name "${input.name}" already exists`,
        { extensions: { code: "BAD_USER_INPUT" } }
      );
    }

    const category = await CategoryModel.create({
      name: normalizedName,
      description: trimmedDescription,
      createdBy: user.username,
    });

    return category;
  }

  async updateCategory(id: string, input: UpdateCategoryInput) {
    const { description, name } = input;
    const { user } = this.ctx;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    if ([name, description].every((v) => v === undefined)) {
      throw new GraphQLError("No update data provided.", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const category = await this.findCategoryById(id);

    if (!category) {
      throw new GraphQLError(`Category with id "${id}" not found.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (category.createdBy !== user.username) {
      throw new GraphQLError(
        "Forbidden: You are not allowed to update this category.",
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

      const existingCategory = await this.findCategoryByName(normalizedName);
      if (existingCategory && existingCategory._id.toString() !== id) {
        throw new GraphQLError(
          `A category with the name "${name}" already exists.`,
          { extensions: { code: "BAD_USER_INPUT" } }
        );
      }
      category.name = normalizedName;
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
      category.description = trimmedDescription;
    }

    const updatedCategory = await category.save();

    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const { user } = this.ctx;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const category = await this.findCategoryById(id);

    if (!category) {
      throw new GraphQLError(`Category with id "${id}" not found.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (category.createdBy !== user.username) {
      throw new GraphQLError(
        "Forbidden: You are not allowed to delete this category.",
        {
          extensions: { code: "FORBIDDEN" },
        }
      );
    }

    await CategoryModel.findByIdAndDelete(id);

    return id;
  }

  async findCategory(id: string) {
    const { user } = this.ctx;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const category = await this.findCategoryById(id);

    if (!category) {
      throw new GraphQLError(`Category with id "${id}" not found.`, {
        extensions: { code: "NOT_FOUND" },
      });
    }

    if (category.createdBy !== user.username) {
      throw new GraphQLError(
        "Forbidden: You are not allowed to delete this category.",
        {
          extensions: { code: "FORBIDDEN" },
        }
      );
    }

    return category;
  }

  async findCategories(
    pagination: InputMaybe<PaginationInput> | undefined,
    filter: InputMaybe<CategoryFilterInput> | undefined
  ) {
    const { user } = this.ctx;

    if (!user?.username) {
      throw new GraphQLError("Unauthorized", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const queryFilter: QueryFilter<ICategoryDocument> = {
      createdBy: user.username,
    };

    if (filter?.q) {
      queryFilter.$or = [
        { name: { $regex: filter.q, $options: "i" } },
        { description: { $regex: filter.q, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      CategoryModel.find(queryFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      CategoryModel.countDocuments(queryFilter),
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
