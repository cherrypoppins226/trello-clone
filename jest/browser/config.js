const exec = require("child_process").execSync;

const out = exec("yarn --silent test --showConfig 2> /dev/null");
// Relying on structure of the response. Brittle but it works
const parsed = JSON.parse(out.toString()).configs[0];

const arrToObj = (acc, current) => {
  acc[current[0]] = current[1];
  return acc;
};

delete parsed.detectLeaks;

module.exports = {
  ...parsed,
  moduleNameMapper: {
    ...parsed.moduleNameMapper.reduce(arrToObj, {}),
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/browser/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/jest/browser/__mocks__/styleMock.js"
  },
  transform: parsed.transform.reduce(arrToObj, {}),
  setupTestFrameworkScriptFile: "<rootDir>/src/setupBrowserTests.js",
  testMatch: [
    "**/__tests__/**/*.browser.{js,jsx,mjs}",
    "**/?(*.)(spec|test).browser.{js,jsx,mjs}"
  ],
  globals: {
    __APPURL__:
      process.env.CI !== undefined &&
      (process.env.CI === "1" || process.env.CI === "true")
        ? `file://${__dirname}/static`
        : "http://localhost:3000"
  },
  globalSetup: "<rootDir>/jest/browser/setup.js",
  globalTeardown: "<rootDir>/jest/browser/teardown.js",
  testEnvironment: "<rootDir>/jest/browser/environment.js"
};
