const path = require("path");
const { entryMap } = require("./webpack-config/entry.config");
const moduleConfig = require("./webpack-config/module.config");
const { plugins } = require("./webpack-config/plugins.config");
const devServer = require("./webpack-config/devServer.config");
module.exports = {
  entry: entryMap,
  module: moduleConfig,
  plugins: plugins,
  devServer: devServer,

  output: {
    filename: "js/[name].[contenthash:6].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@/router": path.resolve(__dirname, "src/router"),
      "@/components": path.resolve(__dirname, "src/components"),
    },
  },
};
