### npm常用命令
1.  将npm源设置为淘宝镜像
```js
    npm config set registry https://registry.npm.taobao.org
```
2. 将npm源修改回原地址
```js
    npm config set registry https://registry.npmjs.org
```
3. 查看当前npm源地址
```js
    npm config get registry
```
4. npm install全局安装
```js
    npm install -g [packageName]
```
5.  npm install 生产依赖
```js
    npm install -save [packageName] 或 npm install -S [packageName]
```
6. npm install 开发依赖
```js
    npm install -dev [packageName] 或 npm install -D [packageName]
