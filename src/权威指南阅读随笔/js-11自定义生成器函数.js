/**
 * 定义一个返回递增整数的函数 以undefined 作为边界值
 */

function Integer(from = 0, to = Number.MAX_SAFE_INTEGER, step = 1) {
  return function () {
    if (from < to) {
      const result = from;
      from += 1;
      return result;
    }
    return undefined;
  };
}

/**
 * 定义一个函数工厂函数 接收数组作为参数，每次都返回数组的下一个元素,以undefined作为边界值
 */

function Element(array, gen = Integer(0, array.length)) {
  return function array_generator(...args) {
    const el_index = gen(...args);
    if (array[el_index]) {
      return array[el_index];
    }
    return undefined;
  };
}

/**
 * 定义一个工厂函数依次遍历对象属性,返回【key,value】
 */
function Property(object, gen = Element(Object.keys(object))) {
  return function property_generator(...args) {
    const key = gen(...args);
    if (object[key]) {
      return [key, object[key]];
    }
  };
}

/**
 * 定义一个工厂函数接收生成器函数和一个 数组 工作逻辑与生成器函数一致，并将获得的值添加至传入的数组中
 */
function collect(generator, array = []) {
  return function (...args) {
    const val = generator(...args);
    if (val) {
      array.push(val);
    }
    return val;
  };
}

/**
 * 定义一个函数，接收一个生成器，并一直调用直到获取到的值为undefined
 */

function repeat(generator) {
  if (generator() !== undefined) {
    repeat(generator);
  }
}

const myarray = [];
repeat(collect(Integer(0, 7), myarray));
// myarray 为 [0,1,2,3,4,5,6,7]

/**
 * limit 接收一个生成器函数，并返回只会执行固定次数的生成器
 */
function limit(generator, count) {
  return function (...args) {
    if (count >= 1) {
      count -= 1;
      return generator(...args);
    }
  };
}

/**
 * 接收两个参数，生成器和断言函数，断言函数返回true 或false 只会生成断言函数返回true 的值
 */
function filter(generator, predicate) {
  return function filter_generator(...args) {
    const value = generator(...args);
    if (!predicate(value)) {
      return filter_generator(...args);
    }
    return value;
  };
}

const my_third_array = harvest(filter(Integer(0, 42), (value) => value % 3 === 0));
// my_third_array [0,3,6,9,...39]
