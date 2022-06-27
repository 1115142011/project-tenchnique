function Range(from, to) {
  const props = {
    from: {
      value: from,
      writeable: false,
      enumerable: true,
      configurable: false,
    },
    to: { value: to, writeable: false, enumerable: true, configurable: false },
  }
  if (this instanceof Range) {
    // new 调用
    Object.defineProperties(this, props)
  } else {
    // 函数调用
    return Object.create(Range.prototype, props)
  }
}
// 属性描述符工具函数
function freezeProps(...rest) {
  const props =
    rest.leng === 1 ? Object.getOwnPropertyNames(rest[0]) : rest.slice(1)
  props.forEach(function (n) {
    if (Object.getOwnPropertyDescriptor(rest[0], n).configurable) return // 忽略不可配置的属性
    Object.defineProperty(o, n, { writable: false, configurable: false })
  })
  return rest[0]
}

// 封装对象状态

function RangeA(from, to) {
  if (from > to) {
    throw new Error('RangeA:form must be <=to ')
  }
  function getFrom() {
    return from
  }
  function getTo() {
    return to
  }
  function setFrom(val) {
    if (val > to) {
      throw new Error('RangeA:from must be <= to')
    }
    from = val
  }
  function setTo(t) {
    if (t < from) {
      throw new Error('RangeA:to must be >=from')
    }
    to = t
  }
  Object.defineProperties(this, {
    from: { get: getFrom, set: setFrom, enumerable: true, configurable: false },
    to: { get: getTo, set: setTo, enumerable: true, configurable: false },
  })
}
// es5 写法 会将所有属性设置为只读和不可配置
Object.freeze(ob) // 或 
Object.seal(ob) //
