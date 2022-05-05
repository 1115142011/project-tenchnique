/**
 * @author painter
 * @date 2022-04-29 Friday
 * @function 开发服务配置
 */
const path = require("path");
module.exports = {
  compress: true,
  open: true,
  liveReload: false,
  host: "local-ip",
  port: "auto",
  proxy: [
    {
      context: ["/auth", "/api"],
      target: "https://www.baidu.com",
    },
  ],
};
