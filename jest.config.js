// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const customJestConfig = {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/features/**/*.tsx",
    "<rootDir>/src/features/**/asyncActions.ts",
    "<rootDir>/src/features/**/slice.ts",
    "!<rootDir>/src/features/**/index.ts",
    "!**/node_modules/**",
    "!**/types.ts",
  ],
  //coverage minimo se recomienda como mínimo 80
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 35,
      functions: 20,
      lines: 20,
    },
  },
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules) https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle axios module
    "^axios$": require.resolve("axios"),
    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
    "^@/redux/(.*)$": "<rootDir>/src/redux/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/modules/(.*)$": "<rootDir>/src/modules/$1",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/components/Sidebar",
    "<rootDir>/src/components/Alert",
    "<rootDir>/src/components/ContadorPaquetes/data",
    "<rootDir>/src/components/Coupons",
    "<rootDir>/src/components/HereMap",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/src/modules/",
    "<rootDir>/src/components/Coupons",
    "<rootDir>/src/components/HereMap",
    "<rootDir>/src/components/HeadPymes",
  ],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  testEnvironment: "jest-environment-jsdom",
  coverageReporters: ["json-summary", "text", "lcov", "json", "clover", "json"],
  // A list of reporter names that Jest uses when writing coverage reports
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
