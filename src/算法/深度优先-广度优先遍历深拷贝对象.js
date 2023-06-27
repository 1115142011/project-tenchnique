  // 深拷贝对象
  const a = { properties: { id: "123", car: "BYD" }, name: "漳卅", age: 18, study: ["小学", "大学", { name: "社会教育", name2: "成人继续教育" }] };
  //1，广度优先
  function getCopyVal(o) {
    if (Object.prototype.toString.call(o) === "[object Object]") {
      return {};
    }
    if (Object.prototype.toString.call(o) === "[object Array]") {
      return [];
    }
    return o;
  }

  function deepCopyByBFS(sourceOb) {
    const propertiesQueue = [];
    const tempMap = new Map(); //处理循环引用的属性
    const target = getCopyVal(sourceOb);

    if (target !== sourceOb) {
      propertiesQueue.push([target, sourceOb]);
      tempMap.set(sourceOb, target);
    }

    while (propertiesQueue.length) {
      const [tar, ori] = propertiesQueue.shift();
      for (const key in ori) {
        console.log("key>>>>>", key);
        if (Object.hasOwnProperty.call(ori, key)) {
          if (tempMap.get(ori[key])) {
            // 存在循环引用对象
            tar[key] = tempMap.get(ori[key]);
            continue;
          }

          tar[key] = getCopyVal(ori[key]);

          if (tar[key] !== ori[key]) {
            // 判断是否需要继续拷贝
            propertiesQueue.push([tar[key], ori[key]]);
            tempMap.set(ori[key], tar[key]);
          }
        }
      }
    }
    return target;
  }

  // deepCopyByBFS(a);
  /** log
   *
   * key>>>>> properties
   * key>>>>> name
   * key>>>>> age
   * key>>>>> id
   * key>>>>> car
   */

  // 2. 深度优先
  function deepCopyDFS(origin) {
    let target = getCopyVal(origin);
    for (const key in origin) {
      console.log("key>>>>", key);
      if (Object.hasOwnProperty.call(origin, key)) {
        const val = getCopyVal(origin[key]);
        if (val !== origin[key]) {
          target[key] = deepCopyDFS(origin[key]);
        } else {
          target[key] = val;
        }
      }
    }
    return target;
  }
  deepCopyDFS(a);
  /** log
   * key>>>> properties
   * key>>>> id
   * key>>>> car
   * key>>>> name
   * key>>>> age
   */