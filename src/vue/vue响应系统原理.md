### vue 响应系统的原理

- 核心 API Object.defineProperty
- 利用属性描述对象重写 getter 方法和 setter 方法
- 在 getter 中收集依赖项，在 setter 中通知依赖项更新
- 设计模式发布者-订阅者模式/中介者模式

```js
function subscription() {
  /*假设收集的依赖项是一个函数*/
  console.log('1111')
}
function defineReactive(data, key, value) {
  let dep = [] //暂存收集到的订阅
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.push(subscription) // 收集当前key的依赖 在该key值更新时通知
      return value
    },
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      /**值发生变化，通知依赖项更新*/
      for (let i = 0; i < dep.length; i++) {
        dep[i](newVal, val)
      }
      val = newVal
    },
  })
}
/**将依赖收集抽离成单独的类，专门管理依赖*/
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(subscription) {
    this.subs.push(subscription)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  depend(subFn) {
    if (typeof subFn === 'function') {
      this.addSub(subFn)
    }
  }
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
  remove(arr, item) {
    if (arr.length) {
      const index = arr.findIndex(item)
      if (index > -1) {
        return subs.slice(index, 1)
      }
    }
  }
}
/**改造reactive*/
function defineReactive(data, key, value) {
  let dep = new Dep() //暂存收集到的订阅
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.apend(subscription) // 收集当前key的依赖 在该可以的值更新是通知
      return value
    },
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      /**值发生变化，通知依赖项更新*/
      val = newVal
      dep.notify()
    },
  })
}
```
