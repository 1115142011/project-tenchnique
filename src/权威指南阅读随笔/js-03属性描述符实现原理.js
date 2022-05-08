/**
 *给 object.prototype 定义 properties方法
 * 这个方法返回一个表示调用它的对象上的属性名列表的对象
 * 如果不带参数则返回所有属性
 * 返回的对象定义了4个有用的方法 toString descriptors hide show
 */
;(function namespace() {
  // 属性对象构造函数-由proporties函数调用
  // 构造的实例表示一个对象的属性集合
  function Properties(o, names) {
    this.o = o
    this.names = names
  }
  // 将代表这些属性的对象设置为不可枚举的
  Propoties.prototype.hide = function () {
    let o = this
    let hidden = { enumerable: false }
    this.names.forEach(function (n) {
      if (o.hasOwnProperty(n)) {
        Object.defineProperty(o, n, hidden)
      }
    })
    return this // 实现链式调用
  }
  // 将这些属性设置为只读和不可配置的
  Properties.prototype.freeze = function () {
    let o = this
    let freeze = { writeable: false, configurable: false }
    this.names.forEach(function (k) {
      if (o.hasOwnProperty(k)) {
        Object.defineProperty(o, k, freeze)
      }
    })
    return this
  }
  // 返回一个对象，这个对象是属性到属性描述符的映射表
  // 使用它来复制属性联通属性特性一起复制
  // Object.defineProperties(dest,src.properties().descriptors())
  //将所有逻辑闭包在一个私有函数的作用域中
  Properties.prototype.descriptors = function () {
    let o = this
    let desc = {}
    this.names.forEach(function (k) {
      if (o.hasOwnProperty(k)) {
        desc[k] = Object.getOwnPropertyDescriptor(o, k)
      }
    })
    return desc
  }

  // 返回一个格式化良好的属性列表
  // 列表中包含名称 值 属性特性 ，使用prement表示不可配置
  // 使用 readOnly 表示只读
  // 普通的可枚举，可读，可配置 不包含属性列表
  Properties.prototype.toString = function () {
    let o = this.o
    let lines = this.names.map(nameToString)
    function nameToString(n) {
      let s = ''
      let desc = Object.getOwnPropertyDescriptor(o, n)
      if (!desc) 'nonexistent' + n + 'undefined'
      if (!desc.configurable) s += 'prement'
      if ((desc.get && !desc.set) || !desc.writable) s += 'readOnly'
      if (!desc.enumerable) s += 'hidden'
      if (desc.get || desc.set) s += 'accessor' + n
      else
        s +=
          n + ':' + (typeof desc.value === 'function' ? 'function' : desc.value)

      return s
    }
    return '{\n' + lines.jion(',\n') + '\n}'
  }
  // 使这个函数成为所有对象的方法
  function properties() {
    let names //属性名称数组
    if (arguments.length === 0) {
      //所有属性
      names = Object.getOwnPropertyNames(this)
    } else if (arguments.length === 1 && Array.isArray(arguments[0])) {
      //传入的参数为属性名数组
      names = arguments[0]
    } else {
      //不定参传入属性名
      names = Array.prototype.slice.call(arguments, 0)
    }
    // 返回一个表述属性名称的对象
    return Properties(this, names)
  }
  // 将原型对象中的实例方法设置为不可枚举
  Properties.prototype.properties().hide()

  // 将他设置为object.prototype新的不可枚举的属性
  // 这将是从私有函数做作用域导出的一个唯一的值
  Object.defineProperty(Object.prototype, 'properties', {
    value: properties,
    enumerable: false,
    writeable: false,
    configurable: false,
  })
})()
