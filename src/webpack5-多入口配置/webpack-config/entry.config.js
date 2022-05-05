/**
 * @author painter
 * @filename entry.config.js
 * @date 2022-04-27 Wednesday
 * @description 查找指定目录下的文件|兼顾多入口打包的方式
 * @property glob为node包 方便查找指定路径下的文件 https://github.com/isaacs/node-glob#readme
 */
const Glob = require("glob").Glob;
const path = require("path");

const entryFolder = new Glob("*", {
  cwd: path.resolve(__dirname, "../src/entry"),
  sync: true,
}).found;

const entryMap = { vendors: ["react", "react-dom"] };

entryFolder.forEach((enterance) => {
  /** 构造单个入口配置 */
  const page = {
    import: path.resolve(__dirname, `../src/entry/${enterance}/index.js`),
    dependOn: ["vendors"],
  };
  entryMap[enterance] = page;
});

module.exports = { entryFolder, entryMap };
