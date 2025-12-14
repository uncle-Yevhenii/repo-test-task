import { RiskStatusEnum } from "@repo/interfaces";
import { GraphQLResolveInfo } from "graphql";
import { IRiskDocument } from "../models/risk.model";
import { ICategoryDocument } from "../models/category.model";
import { MyContext } from "../plugins/apollo.plugin";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Category = {
  __typename?: "Category";
  createdAt: Scalars["String"]["output"];
  createdBy: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
};

export type CategoryFilterInput = {
  q?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateCategoryInput = {
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateRiskInput = {
  categoryId: Scalars["ID"]["input"];
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  status: RiskStatusEnum;
};

export type Mutation = {
  __typename?: "Mutation";
  createCategory: Category;
  createRisk: Risk;
  deleteCategory: Scalars["ID"]["output"];
  deleteRisk: Scalars["ID"]["output"];
  updateCategory: Category;
  updateRisk: Risk;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateRiskArgs = {
  input: CreateRiskInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteRiskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateCategoryInput;
};

export type MutationUpdateRiskArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateRiskInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasMore: Scalars["Boolean"]["output"];
  page: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type PaginatedCategories = {
  __typename?: "PaginatedCategories";
  items: Array<Category>;
  pageInfo: PageInfo;
};

export type PaginatedRisks = {
  __typename?: "PaginatedRisks";
  items: Array<Risk>;
  pageInfo: PageInfo;
};

export type PaginationInput = {
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  categories: PaginatedCategories;
  category?: Maybe<Category>;
  risk?: Maybe<Risk>;
  risks: PaginatedRisks;
};

export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRiskArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRisksArgs = {
  filter?: InputMaybe<RiskFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type Risk = {
  __typename?: "Risk";
  category: Category;
  createdAt: Scalars["String"]["output"];
  createdBy: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  status: RiskStatusEnum;
  updatedAt: Scalars["String"]["output"];
};

export type RiskFilterInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  q?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<RiskStatusEnum>;
};

export { RiskStatusEnum };

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRiskInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<RiskStatusEnum>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Category: ResolverTypeWrapper<ICategoryDocument>;
  CategoryFilterInput: CategoryFilterInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateRiskInput: CreateRiskInput;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginatedCategories: ResolverTypeWrapper<
    Omit<PaginatedCategories, "items"> & {
      items: Array<ResolversTypes["Category"]>;
    }
  >;
  PaginatedRisks: ResolverTypeWrapper<
    Omit<PaginatedRisks, "items"> & { items: Array<ResolversTypes["Risk"]> }
  >;
  PaginationInput: PaginationInput;
  Query: ResolverTypeWrapper<{}>;
  Risk: ResolverTypeWrapper<IRiskDocument>;
  RiskFilterInput: RiskFilterInput;
  RiskStatusEnum: RiskStatusEnum;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateRiskInput: UpdateRiskInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"]["output"];
  Category: ICategoryDocument;
  CategoryFilterInput: CategoryFilterInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateRiskInput: CreateRiskInput;
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: {};
  PageInfo: PageInfo;
  PaginatedCategories: Omit<PaginatedCategories, "items"> & {
    items: Array<ResolversParentTypes["Category"]>;
  };
  PaginatedRisks: Omit<PaginatedRisks, "items"> & {
    items: Array<ResolversParentTypes["Risk"]>;
  };
  PaginationInput: PaginationInput;
  Query: {};
  Risk: IRiskDocument;
  RiskFilterInput: RiskFilterInput;
  String: Scalars["String"]["output"];
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateRiskInput: UpdateRiskInput;
}>;

export type CategoryResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["Category"] =
    ResolversParentTypes["Category"],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["Mutation"] =
    ResolversParentTypes["Mutation"],
> = ResolversObject<{
  createCategory?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCategoryArgs, "input">
  >;
  createRisk?: Resolver<
    ResolversTypes["Risk"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRiskArgs, "input">
  >;
  deleteCategory?: Resolver<
    ResolversTypes["ID"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCategoryArgs, "id">
  >;
  deleteRisk?: Resolver<
    ResolversTypes["ID"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRiskArgs, "id">
  >;
  updateCategory?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCategoryArgs, "id" | "input">
  >;
  updateRisk?: Resolver<
    ResolversTypes["Risk"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRiskArgs, "id" | "input">
  >;
}>;

export type PageInfoResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["PageInfo"] =
    ResolversParentTypes["PageInfo"],
> = ResolversObject<{
  hasMore?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedCategoriesResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["PaginatedCategories"] =
    ResolversParentTypes["PaginatedCategories"],
> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes["Category"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedRisksResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["PaginatedRisks"] =
    ResolversParentTypes["PaginatedRisks"],
> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes["Risk"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["Query"] =
    ResolversParentTypes["Query"],
> = ResolversObject<{
  categories?: Resolver<
    ResolversTypes["PaginatedCategories"],
    ParentType,
    ContextType,
    Partial<QueryCategoriesArgs>
  >;
  category?: Resolver<
    Maybe<ResolversTypes["Category"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCategoryArgs, "id">
  >;
  risk?: Resolver<
    Maybe<ResolversTypes["Risk"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRiskArgs, "id">
  >;
  risks?: Resolver<
    ResolversTypes["PaginatedRisks"],
    ParentType,
    ContextType,
    Partial<QueryRisksArgs>
  >;
}>;

export type RiskResolvers<
  ContextType = MyContext,
  ParentType extends ResolversParentTypes["Risk"] =
    ResolversParentTypes["Risk"],
> = ResolversObject<{
  category?: Resolver<ResolversTypes["Category"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  status?: Resolver<ResolversTypes["RiskStatusEnum"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RiskStatusEnumResolvers = EnumResolverSignature<
  { RESOLVED?: any; UNRESOLVED?: any },
  ResolversTypes["RiskStatusEnum"]
>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatedCategories?: PaginatedCategoriesResolvers<ContextType>;
  PaginatedRisks?: PaginatedRisksResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Risk?: RiskResolvers<ContextType>;
  RiskStatusEnum?: RiskStatusEnumResolvers;
}>;
