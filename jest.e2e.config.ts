import jestConfig from "./jest.config";

export default {
  ...jestConfig,
  testMatch: ["**/*.test.ts"]
}