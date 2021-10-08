### 模块机制
#### node 模块遵循CommonJS规范
- #### CommonJs
    - fs
    - TCP
    - stream
    - buffer
    - ...
- 
1. 模块定义
   - 核心模块 （内置模块 /http/path）
   - 自定义模块（node_module依赖包）
   - 文件模块（编写的业务代码）
2. 模块标识符
   - 相对路径
   - 绝对路径
   - 模块标识字符串  
3. 模块引入
   - 路径分析
   - 文件定位
   - 编译缓存
4. 模块编译
```js
  function Module(id,parent){
       this.id=id
       this.exports = {}
       this.parent = parent
       if(parent&&parent.children){
         parent.children.push(this)
       }
       this.fileName = null
       this.loaded = false
       this.children = []
     }
```
#### node 会将加载的文件进行头尾包装使模块之间进行作用域隔离
```js
(
function (exports,require,module,_dirname,_filename){
    /**
     * 业务代码。。。
    */
}
)
// 代码会在vm 原生模块的runInThisContext()中执行，类似于eval 函数 具有明确的上下文环境，不会污染全局
```