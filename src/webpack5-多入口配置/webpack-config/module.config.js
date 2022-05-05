/**
 * @author painter
 * @filename module.config.js
 * @date 2022-04-28 Thursday
 * @description module配置
 */
 const MiniCssExtractLoader = require("mini-css-extract-plugin").loader;
module.exports = {
  rules: [
    {
      test: /\.(js|ts|tsx)?$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            // babel 配置暂未抽离，需要时可以抽离至单独文件 .babelrc
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(png|jpg|gif|jpeg|svg|webp)$/,
      type: "asset" /** 自动使用file-loader | url loader max 8kb */,
      exclude: /node_modules/,
      generator: {
        filename: "image/[name].[ext]",
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf)\??.*$/,
      type: "asset/resource ",
      exclude: /node_modules/,
      generator: {
        filename: "font/[name].[hash:8].[ext]",
      },
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [MiniCssExtractLoader, "css-loader"],
    },
  ],
};
