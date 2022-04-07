/** 枚举类型 */
/** 实现继承函数 */
function inherit(p) {
  if (p == null) throw TypeError('paramter is not a valid object')
  if (Object.create) {
    return Object.create(p)
  }
  /** 兼容低版本 js 写法 */
  let t = typeof p
  if (t !== 'object' && t !== 'function')
    throw TypeError('paramter is not a valid object')
  function f() {}
  f.prototype = p
  return new f()
}

/**
 * 模拟枚举类型
 * @param {object} key:value 的集合
 * */
function enumeration(namesToValues) {
  const enumeration = function () {
    throw 'cant Instantiate Enumerations'
  }
  const proto = (enumeration.prototype = {
    constructor:
      enumeration /** 修改constructor 属性 让 instanceof 能正常工作  */,
    toString: function () {
      return this.name
    } /**模拟对象的 toString 方法 */,
    valueOf: function () {
      return this.value
    } /** 模拟对象的valueOf 方法 */,
    toJSON: function () {
      return this.name
    } /** 模拟对象的toJSON 方法 */,
  })
  enumeration.values = [] /** 存放枚举对象的数组 */
  for (const key in namesToValues) {
    /** 遍历每个键值对 */
    const ele = inherit(proto) /** 创建一个代表这个键值对的对象 */
    ele.name = key /** 给他设置一个name属性 */
    ele.value = namesToValues[key] /** 给他设置一个value 属性 */
    enumeration[key] =
      ele /** 将他设置为构造函数的静态属性 key 即为 该值的name */
    enumeration.values.push(ele) /** 如果key 正好是 `values` 该属性会被覆盖 */
  }
  /** 实现一个迭代方法 */
  enumeration.forEach = function (fn, context) {
    for (let i = 0; i < this.values.length; i++) {
      fn.call(context, this.values[i])
    }
  }

  return enumeration
}

/**
 * 使用枚举类型表示一副扑克牌
 * @param{suit}表示扑克牌花色
 * @param{rank}表示扑克牌点数
 * */
function Card(suit, rank) {
  this.suit = suit
  this.rank = rank
}
/**使用枚举类型定义扑克牌花色和点数*/
Card.suit = enumeration({ Club: 1, Diamonds: 2, Hearts: 3, spades: 4 })
Card.rank = enumeration({
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
  Ace: 14,
})
console.log('>>', Card.suit.values)
/**
 *
 * 0: enumeration
 * name: "Club"
 * value: 1
 * 1: enumeration
 * name: "Diamonds"
 * value: 2
 * 2: enumeration
 * name: "Hearts"
 * value: 3
 * 3: enumeration {name: 'spades', value: 4}
 * length: 4
 *
 */
/**定义用于描述牌面的文本*/
Card.prototype.toString = function () {
  /**由Card 实列调用 所以 toString 会是js 原生类型的toString 方法*/
  return this.rank.toString() + 'of' + this.suit.toString()
}
/**
 * 比较两张扑克牌的大小
 * @return {1} 比目标大
 * @return {-1} 比目标小
 * @return {0} 与目标相等
 */
Card.prototype.compareTo = function (that) {
  if (this.rank < that.rank) return -1
  if (this.rank > that.rank) return 1
  return 0
}
// eg card1.compareTo(card2)
/**
 * 以扑克牌的玩法规则对扑克牌进行排序
 */
Card.orderByRank = function (a, b) {
  return a.compareTo(b)
}

/**
 * 以桥牌的玩法规则对扑克牌进行排序
 */
Card.orderBySuit = function (a, b) {
  if (a.suit < b.suit) return -1
  if (a.suit > b.suit) return 1
  if (a.rank < b.rank) return -1
  if (a.rank > b.rank) return 1
}

/** 定义用以表示一副标准扑克牌的累*/
function Deck() {
  const Cards = (this.Cards = []) // 一副扑克牌就是由牌组成的数组
  /**此处的forEach 方法为 enumeration 构造函数的forEach 方法*/
  Card.suit.forEach(function (suit) {
    // 初始化这个数组
    Card.rank.forEach(function (rank) {
      Card.push(new Card(suit, rank))
    })
  })
}
/**
 * 洗牌的方法：重新洗牌并返回洗好的牌
 */
Deck.prototype.shuffle = function () {
  const deck = this.Cards /***/
  let len = deck.length
  for (let i = 0; i < len; i++) {
    const r = Math.floor(Math.random() * (i + 1)) /** 小于长度的一个随机数 */
    const temp = deck[i] // 临时变量存储遍历的元素
    /** 随机交换位置---复杂类型数据赋值是copy 的应用地址所以 deck 变化 等同与 this.Cards 变化 */
    deck[i] = deck[r]
    deck[r] = temp
  }
  return this
}
/**
 * 发牌的方法：返回牌的数组
*/
Deck.prototype.deal = function(n){
    if(this.Cards.length<n) throw '牌不够了'
    /** splice 会改变原数组 每次发牌后 this.Cards.length 都会变化 */
    return this.Cards.splice(this.Cards.length-1,n)
}
/**
 * 创建一副新的扑克牌，洗牌并发牌
*/
const deck = (new Deck()).shuffle()
const hand1 = deck.deal(13).sort(Card.orderBySuit);/** 乔牌玩法并排好序 sort 是Array.proyotype的方法 */