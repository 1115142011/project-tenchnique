#### 模块模式实际是 JavaScript 函数闭包的应用

- 闭包的用用场景一：模拟私有变量
- 闭包的应用场景二：异步的的服务端调用
- 闭包的应用场景三：人工定义的命名空间

```js
//模块模式
(funxtion(export){
    let myPrivteVr='...../'
    export.method=function(){
        //do some work
    }
    export.method2=function(){
        //do some work2
    }

})(myModule||{})

// 服务端异步调用主要是使用回调函数的形式--在javascript 中函数可以作为参数传递给其他函数

function getJSON('addressurl',(success)=>{
// do success some work
},(err)=>{
// when erroe do some work
})

```

#### 什么是控制流

- 程序为实现业务目标所要行进的路径称之为控制流

```js
// 模拟数组的 map 方法
function _map(arr, fn) {
  let idx = 0;
  let len = arr.length;
  let result = new Array(len);
  while (idx < len) {
    result[idx] = fn(arr[idx], idx, arr);
    idx++;
  }
  return result;
}

// 模拟数组的 reduce 方法

function _reduce(arr, fn, accumulator) {
  let idx = -1;
  if (!accumulator && arr.length > 0) {
    accumulator = arr[++idx];
  }
  while (++idx < arr.length) {
    fn(accumulator, arr[idx], arr);
  }
  return accumulator;
}

// 模拟数组的filter 方法

function _filter(arr, fn) {
  let idx = 0;
  let result = [];

  while (idx < arr.length) {
    if (fn(arr[idx], idx, arr)) {
      result.push(arr[idx]);
    }
    idx++;
  }
  return result;
}
```
