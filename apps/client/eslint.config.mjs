import { config as clientConfig } from "@repo/eslint-config/client";

/** @type {import('eslint').Linter.Config[]} */
export default [...clientConfig, { ignores: ["src/generated/*"] }];
