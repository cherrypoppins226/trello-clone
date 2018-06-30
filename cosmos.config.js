const webpack = require("webpack");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const path = require("path");

const CI = process.env.CI === "1" || process.env.CI === "true";

module.exports = {
  rootPath: __dirname,
  fileMatch: path.join(__dirname, "src", "cosmos", "fixtures.js"),
  publicPath: "public",
  proxiesPath: "src/cosmos/proxies",
  outputPath: "src/cosmos/export",
  watchDirs: ["src"],
  globalImports: ["./src/index.css"],
  containerQuerySelector: "#root",
  webpackConfigPath: "react-scripts/config/webpack.config.dev",
  hot: !CI,
  webpack: (config, { env }) => {
    config.entry = config.entry.filter(entry => {
      return CI && !entry.includes("webpackHotDevClient");
    });
    config.plugins = config.plugins.filter(plugin => {
      return (
        !(CI && plugin instanceof webpack.HotModuleReplacementPlugin) &&
        !(plugin instanceof WatchMissingNodeModulesPlugin) &&
        !(plugin instanceof InterpolateHtmlPlugin)
      );
    });
    config.devtool = CI ? false : config.devtool;
    return config;
  }
};
