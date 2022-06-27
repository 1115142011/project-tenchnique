### 计时器

- window.setInterval
- window.setTimeout

```js
// 注册在指定时间之后单次或重复调用的函数
// 定时器函数的应用
function invoke(f, start, interval, end) {
  if (!start) start = 0
  if (arguments.length < 2) {
    setTimeout(f, start)
  } else {
    function repart() {
      var h = setInterval(f, interval)
      if (end) {
        // 在end 时间后结束调用
        setTimeout(function () {
          clearInterval(h)
        }, end)
      }
    }

    setTimeout(repart, start)
  }
}

// 如果以0 ms来作为第二个参数 会立即把任务放到队列等待主程空闲时调用
```

### 浏览器的定位与导航

- window.location 对象 引用的使 Location 对象
- Location 对象表示的是当前显示的文档的 URL
- Location 对象的 toString()方法返回的是 href 属性的值 因此 location location.href

```js
// window.location 是引用的location对象
// Document.location 也是引用的Location 对象
// Document.url 仅记录载入时的url 不会记录片段的变化 如（#/home）
window.location === document.location
```

### Location 对象的属性

1. protocol -协议
2. host -域
3. hostName -域名
4. port -端口
5. pathName -路径名称
6. search -查询参数（?）
7. hash -片段标识符（#）

#### url 解析 提取 url 的搜索字符串

```js
function urlAgrs() {
  let args = {}
  let query = location.search.substring(1)
  let pairs = query.split('&')
  for (let i = 0; i < pairs.length; i++) {
    let items = pairs[i].split('=')
    if (items.length < 2) continue
    args[items[0]] = items[1]
  }
}
return args
```

