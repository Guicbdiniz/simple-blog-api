"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",
    // A preset that is used as a base for Jest's configuration
    preset: "ts-jest",
    // The root directory that Jest should scan for tests and modules within
    rootDir: "src",
    // The test environment that will be used for testing
    testEnvironment: "node",
    // Indicates whether each individual test should be reported during the run
    verbose: true,
};
