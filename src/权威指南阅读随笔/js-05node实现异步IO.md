### node 介绍

##### node 是基于 C++ 的高速 javaScript 解析器，在 google 的 V8 引擎上构建而来 ，绑定了用于文件，进程和网络套接字等底层 Unix API ,还绑定了 HTTP 客户端和服务器 API ；实现了同步和异步两种工作模式，node 默认是异步的，绝不阻塞，能有效地处理高负荷的任务。node 依赖事件处理程序，通常使用嵌套函数和闭包来实现。node 的设计目标是高性能的 I/O

##### node 定义了一些重要的全局属性

- process.version node 的版本字符串信息
- process.argv node 命令行的数组参数，argv[0] 是 ‘node’
- process.env 环境变量对象。例如：process.env.PATH
- process.pid 进程 id
- process.getuid()返回用户 id
- process.cwd() 返回当前的工作目录
- process.chidir() 改变目录
- process,exit() 退出进程

#### node 的事件触发器

##### eventemitter 定义 on 方法注册处理程序

- 第一个参数为事件类型
- 第二个参数为事件处理函数

```js
emitter(name, fn) //注册函数fn 处理 name 事件
emitter.addListener(name, fn) // addListener 和 on 是同一个方法
emitter.once(name, fn) // 只执行一次然后 fn 会删除
emitter.addListeners(name) // 返回事件name处理函数组成的数组
emitter, removeListener(name, fn) // 注销name事件处理函数  fn
emitter.removeAllListeners(name) // 清空事件name 所有的处理函数
```

#### process 对象也是一个事件触发器

```js
// exit 事件 在node推出之前执行
process.on('exit', function () {
  /* do something*/
})
// 如果注册了事件处理程序，只要是非捕获异常都会产生事件
// 否则，异常仅会使node 输出错误然后退出
process.on('uncaughtException', function (e) {
  console.log('stope')
})
```

### node 的流 API，node 的流能处理二进制数据和文本数据 string | buffer

- 可读流

```js
// 输入流，假设 s 是在其它地方得到的可读流
s.on('data', fn) // 当数据可用时，把它作为参数传递给fn
s.on('end', fn) // 当不再由数据送达时，在文件读取结束会触发end 事件
s.on('error', fn) // 如果文件读取发生错误时，会将错误对象传递给 fn
s.readable // 如果它是依旧打开的可读流则返回true
s.pause() // 暂停 ‘data’ 事件，例如：上传限制
s.resume() // 回复 ‘data’ 事件
```

- 可写流

```js
s.write() // 写入二进制数据
s.write(string,encoding) // 根据指定的字符编码写入字符串数据
s.end() // 结束流
s.end(buffer) // 写入最后的二进制数据并结束
s.end(string,encoding) // 根据指定的字符编码写入字符串并结束流
s.wrireable // 如果流依旧打开，且可写入 返回 true
s.on('drain'fn) // 当内部缓冲区为空时 调用fn
```

#### node 的缓冲区是固定长度的类数组对象，其长度为 0~255

- 文本传输使用普通的字符串
- 二进制数据传输则会用到 node 的缓冲区，node 会将缓冲区作为不透明的数据块对待

```js
let bytes = new Buffer(256) // 创建一个256 字节的新缓冲区
for(let i=0;i<bytes.length;i++>{ // 通过索引值进行遍历
    bytes[i] = i            // 设置缓冲区的每个元素
    let end = bytes.slice(240,256) // 为这个缓冲区创建新的视图
    end[0]                   // end[0] 即：bytes[240]
    end[0]=0                    // 修改这个切片的第一个元素
    bytes[240]              //  原始缓冲区也一并修改
    let more = new Buffer(8) // 创建一个新的独立的缓冲区
    end.copy(more,0,8,16)   // 把end 8~15 元素copy 到more中
    more[0]                 // =>248
    // 缓冲区也可以实现二进制 <==> 文本的转换
    // 合法的编码是 utf-8 ascii base64 默认编码是utf-8
    let buf = new Buffer('2Πr','utf8') // 使用 utf-8 把文本编码为字节
    buf.length // 3个字符占4个字节
    buf.toString() // 返回文本： 2Πr
    buf = new Buffer(10) // 开始新的固定长度的缓冲区
    let len = buf.write('πr2',4) // 从第四个字节开始写入文本
    buf.toString('utf-8',4,4+length) // 解码一段字节
})
```

#### node 的文件和文件 API 处于 fs 模块中

```js
const fs = require('fs') // 加载文件系统API模块 任何名字以Sync 结尾的命名方法都是同步阻塞的
// 同步读取文件
let text = fs.readFileSync('config.json', 'utf8')
// 异步读取二进制文件，通过传递函数获得数据
fs.readFile('image.png', function (error, data) {
  if (error) throw error
  process(data) // 文件类容在缓冲区中
})

// 同步写文件
fs.writeFileSync('config.json', 'someData')
// 异步写文件
fs.writeFile('config.json', 'someData')
```
