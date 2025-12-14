/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faker } from "@faker-js/faker";
import { buildApp } from "../app";
import { CategoryModel } from "@models/category.model";
import { RiskModel } from "@models/risk.model";
import { RiskStatusEnum } from "@generated/graphql";

const CATEGORIES_TO_CREATE = 20;
const RISKS_TO_CREATE = 1000;
const SEED_USER = "seed-user";

const seedDatabase = async () => {
  const app = await buildApp();
  let exitCode = 0;

  try {
    app.log.info("Waiting for app to be ready...");
    await app.ready();
    app.log.info("App is ready.");

    app.log.info("Clearing existing data...");
    await CategoryModel.deleteMany({});
    await RiskModel.deleteMany({});
    app.log.info("Data cleared.");

    // 1. Create Categories
    app.log.info(`Creating ${CATEGORIES_TO_CREATE} categories...`);
    const categoriesData = [];
    for (let i = 0; i < CATEGORIES_TO_CREATE; i++) {
      categoriesData.push({
        name: faker.commerce.department() + ` ${i}`,
        description: faker.lorem.sentence(),
        createdBy: SEED_USER,
      });
    }
    const createdCategories = await CategoryModel.insertMany(categoriesData);
    app.log.info("Categories created successfully.");

    // 2. Create Risks
    if (createdCategories.length > 0) {
      app.log.info(`Creating ${RISKS_TO_CREATE} risks...`);
      const risksData = [];
      for (let i = 0; i < RISKS_TO_CREATE; i++) {
        const randomCategory =
          createdCategories[
            Math.floor(Math.random() * createdCategories.length)
          ];

        risksData.push({
          name: faker.lorem.words({ min: 3, max: 6 }),
          description: faker.lorem.paragraph(),
          status: faker.helpers.arrayElement([
            RiskStatusEnum.RESOLVED,
            RiskStatusEnum.UNRESOLVED,
          ]),
          category: randomCategory!._id,
          createdBy: SEED_USER,
        });
      }
      await RiskModel.insertMany(risksData);
      app.log.info("Risks created successfully.");
    } else {
      app.log.warn("No categories created, skipping risk creation.");
    }

    app.log.info({
      error: null,
      message: "✅ Database seeding finished successfully!",
    });
  } catch (error) {
    app.log.error({
      error,
      messsage: "❌ An error occurred during database seeding:",
    });
    exitCode = 1;
  } finally {
    await app.close();
    app.log.info("Application context closed.");
    process.exit(exitCode);
  }
};

seedDatabase();
