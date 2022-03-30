#### js Set(集合)数据类型的实现原理

```js
/** set 集合的实现原理  */
function Set(...args) {
  this.values = {} //存储数据值的地方
  this.length = 0 // 值的个数
  // this.add.apply(this, args)
}

/** 工具函数--为对象添加一个id的属性 */
function objectId(o) {
  const key = '*****|objectId|**'
  if (!o.hasOwnProperty(key)) {
    Object.defineProperty(o, key, {
      writable: false,
      enumerable: false,
      value: Set._v2s.nextid++,
    })
    // o[key] =

    return o[key]
  }
}
/** 获取唯一字符串*/
function getStringName(val) {
  switch (val) {
    case undefined:
      return 'u'
    case null:
      return 'n'
    case true:
      return 't'
    case false:
      return 'f'

    default:
      switch (typeof val) {
        case 'number':
          return '#' + val
        case 'string':
          return '"' + val
        default:
          return '@' + objectId(val)
      }
      break
  }
}
/** 将任意的javascript 对象与字符串联系起来*/

Set._v2s = getStringName

/* 设置初始的id*/
getStringName.nextid = 0
/** 将参数添加至集合中 */
Set.prototype.add = function (...args) {
  for (let i = 0; i < args.length; i++) {
    const val = args[i]
    const str = Set._v2s(val)
    if (!this.values.hasOwnProperty(str)) {
      this.values[str] = val
      this.length++
    }
  }
  return this
}

/** 从集合中删除元素 */
Set.prototype.remove = function (...args) {
  for (let i = 0; i < args.length; i++) {
    const str = Set._v2s(args[i])
    if (!this.values.hasOwnProperty(str)) {
      delete this.values[str]
      this.length--
    }
  }
  return this
}

/** 检擦集合是否包含某个值 */
Set.prototype.contains = function (val) {
  return this.values.hasOwnProperty(Set._v2s(val))
}

/** 返回集合的值的个数 */
Set.prototype.size = function () {
  return this.length
}

/* 遍历集合中的所有项 并执行回调函数 */
Set.prototype.forEach = function (fn, context) {
  for (const key in this.values) {
    if (Object.hasOwnProperty.call(object, key)) {
      fn.call(context, this.values[key])
    }
  }
}

const val = { name: 'zhangsan1' }
let myset = new Set(val)
console.log('>>>>>>>>>>', myset)

myset.add(val)
console.log('>>>>>>>>>>', myset)
```
