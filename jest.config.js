const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
    roots: [
      "<rootDir>"
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: [
      "js",
      "ts",
      "tsx"
    ],
    moduleDirectories: [
      'src',
      'node_modules'
    ],
    moduleNameMapper: {
      '^\~(.*)$': '<rootDir>/src/$1',
    },
    coverageThreshold: {
      global: {
        statements: 94,
        branches: 100,
        functions: 100,
        lines: 96
      }
    }
  }