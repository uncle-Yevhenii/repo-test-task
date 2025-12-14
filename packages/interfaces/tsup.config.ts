/* eslint-disable @typescript-eslint/no-explicit-any */
import { Options, defineConfig } from "tsup";

export default defineConfig((opt: Options) => ({
  entry: {
    index: "src/index.ts",
  },
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  swc: true as any,
  ...opt,
  external: [],
}));
