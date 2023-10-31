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
