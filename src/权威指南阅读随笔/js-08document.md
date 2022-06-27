### document 对象

```js
// 返回元素el 的第n层祖先元素

function parent(el,n){
    if(n===undefined) {
        n=1
    }
    let target = e
    while(n--){
        target=target.parentNode
    }
    if(|!target||target.nodeType!==1) return null
    return targetj
}
```

### Element HtmlDocument 对象是与 String Array 一样的类 因此可以自定义方法

```js
Element.prototype.next = function () {
  if (this.nextElementSibling) return this.nextElementSibling
  return null
}
```

### HTML 元素是由一个标签和一组属性（名/值对）组成

```html
<a href="xxxxxx" target="_blank">外部链接</a>
```

### 异步加载和执行脚本 | 创建 插入 删除 节点

- HTMLElement.appendChild 插入为元素的最后一个子节点
- HTMLElement.insertBefore(el,target) 插入为参数节点-上一个
- HTMLElement.removeChild(el) 移除某个子节点
- HTMLElement.replaceChild(el,target) 替换某个子元素

```js
function loadSyncScript(url) {
  const head = document.getElementByTagName('head')[0]
  const screL = document.createElement('script')
  screl.src = url
  head.appendChild(screl)
}
```

### HTML 元素有两套位置坐标体系

1. 文档坐标 - 相对于文档左上角(使用时大多需要考虑滚动偏移量)
2. 视口坐标 - 相对于视口左上角

### 查询视口宽高

```js
function getViewPortSize() {
  const w = window.innerWidth
  const h = window.innerHeight
  return {
    width: w,
    height: h,
  }
}
```

### 查询元素的几何尺寸

- getBoundingClientRect() // 返回一个对象 包含 left,right,top,bottom 属性 返回的是视口坐标的位置,当有滚动条时，某个值可能是负数,该坐标不包含 margin 值

```js
//计算元素的宽度
const pos = element.getBoundingClientRect()
const width = pos.right-pos.left
const h = pos.bottom - pos.top
-
```

### 获取指定坐标中穿在的元素

- document.elementFromPoint()

```js
// 如果x,y 在视口可见范围之外则返回null
document.elementFromPoint(x, y)
```

### 查询元素的 css 属性

-window.getComputedStyle()

```js
window.getComputedStyle(dome).zIndex
// 返回样式对象{}
```
