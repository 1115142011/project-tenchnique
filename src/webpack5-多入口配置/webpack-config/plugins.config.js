/**
 * @author painter
 * @filename plugins.config.js
 * @date 2022-04-28 Thursday
 * @description 插件配置
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const Htmlwebpackplugin = require("html-webpack-plugin");
const { entryFolder } = require("./entry.config");
const webpack = require("webpack"); // 用于访问内置插件
const path = require("path");
const plugins = [
  new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:6].css" }),
];

entryFolder.forEach((folder) => {
  const templateSrc = path.resolve(
    __dirname,
    `../src/entry/${folder}/index.html`
  );
  plugins.push(
    new Htmlwebpackplugin({
      template: templateSrc,
      filename: `${folder}.html`,
      favicon: "",
    })
  );
});

module.exports = { plugins };
