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

- window.location 对象

```js
// window.location 是引用的location对象
// Document.location 也是引用的Location 对象
// Document.url 仅记录载入时的url 不会记录片段的变化 如（#/home）
window.location === document.location
```
```