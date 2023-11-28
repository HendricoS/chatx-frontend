// Jest configuration file
module.exports = {
  // Specify the test environment as jsdom (JavaScript DOM environment)
  testEnvironment: "jsdom",

  // Set up additional files to run after Jest is initialized
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  // Configure Jest to use babel-jest for transforming JavaScript and JSX files
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // Configure moduleNameMapper to mock CSS imports and specific CSS files
  moduleNameMapper: {
    // Mock CSS imports by mapping them to an empty module
    "\\.(css)$": "<rootDir>/src/empty-module.js",

    // Mock bootstrap CSS file by mapping it to an empty module
    "^bootstrap/dist/css/bootstrap.min.css$": "<rootDir>/src/empty-module.js",
  },
};
