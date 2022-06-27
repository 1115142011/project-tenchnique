#### XMLHTTPRequest

- Ajax 全称为 Asynchronous Javascript And XML 之所以有 xml 是历史遗留

```js
function encodeFormData(data) {
  if (!data) return ''
  const pairs = []
  for (let name in data) {
    if (!data.hasOwnProperty(name)) continue
    if (typeof data[name] === 'function') continue
    let value = data[name].toString()
    let nameKey = endcodeURLComponent(name.replace('%20', '+'))
    value = encodeURLComponent(value.replace('%20', '+'))
    pairs.push(name + '=' + value)
  }
  return pairs.join('&')
}

function postData(url, data, callback) {
  const request = new XMLHttpRequest()
  request.open('POST', url)
  request.onreadystatechange = function () {
    if (request.state === 4 && callback) {
      callback(request)
    }
  }
  request.setRequestHeader('contentType', 'application/x-www-form-urlencode')
  request.send(encodeFormData(data))
}
```

- 在发送请求时如未设置 contentType 则，request 对象会更具 data 数据的类型 自动设置一个 contentType

- request 会自动为 contentType===multip/form-data 定义合适的边界字符

- request 对象新添加的 progress 事件在`正在加载服务器的响应`时触发，可用于检测请求进度

```js
request.onprogress = function (e) {
  if (e.lengthComputable) {
    // 响应内容长度已知
    progress.innerHtml = Math.round((100 * e.loaded) / e.total) + '%'
  }
}
```

- request 对象的上传进度事件 upload 属性 与处理 progress 事件的方式
- request 对象的 abort() 方法可以终止正在进行的请求 可实现请求超时中断功能

```js
function timedGetText(url, timeout, callback) {
  var request = new XMLHttpRequest()
  var timed = false
  var timer = setTimeout(function () {
    timed = true
    request.abort()
  }, timout)
  request.onreadystatechange = function () {
    if (request.readeState !== 4) return
    if (timed) return
    clearTimout(timer)
    if (request.status === 200) {
      callback(request.responseText)
    }
  }
  request.open('GET', url)
  request.send(null)
}
```

##### XMLHttpRequest 对象通常可以发起与文档同在一个域的请求

1. 发送请求前设置 request 对象的 withCredebtials 为 true
2. 响应头设置 合适的 CORS `Cross-Origin Resource sharing` (跨域资源共享)

#### comet 服务端推送技术

- 主要通过 EventSource 对象实现

  ```js
  var chart = new EventSource('url')
  chart.onmessage = function (e) {
    // do something...
  }
  ```
