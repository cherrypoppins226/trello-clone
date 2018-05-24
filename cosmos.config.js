const CI = process.env.CI === "1" || process.env.CI === "true";

// TODO: Webpack ignore node_modules folder. We don't need that kind of dynamism
module.exports = {
  containerQuerySelector: "#root",
  webpackConfigPath: "react-scripts/config/webpack.config.dev",
  publicPath: "public",
  hot: !CI,
  webpack: (config, { env }) => {
    config.devtool = CI ? false : config.devtool;
    return config;
  }
};
