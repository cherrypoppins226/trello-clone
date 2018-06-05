const webpack = require("webpack");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");

const CI = process.env.CI === "1" || process.env.CI === "true";

// TODO: Webpack ignore node_modules folder. We don't need that kind of dynamism
module.exports = {
  containerQuerySelector: "#root",
  webpackConfigPath: "react-scripts/config/webpack.config.dev",
  publicPath: "public",
  proxiesPath: "src/cosmosProxies",
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
