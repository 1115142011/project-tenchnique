let entry = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

let output = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
};
/** 拉平 */
function flatObkeyDeep(object, parentkey = "", result = {}) {
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      let keyName = parentkey ? `${parentkey}.${key}` : key;

      if (typeof object[key] === "object") {
        flatObkeyDeep(object[key], keyName, result);
      } else {
        result[keyName] = object[key];
      }
    }
  }
  return result;
}

const a = flatObkeyDeep(output);
console.log("a>>>>>>>>>>>>>>>", a);

/** 还原  */
function decodeKeyDeep(ob) {
  const result = {};
  for (const key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      const ele = ob[key];
      const keymap = key.split(".");
      if (keymap.length > 1) {
        setObval(keymap, result, ob[key]);
      } else {
        result[key] = ob[key];
      }
    }
  }

  return result;
}

function setObval(keymap, result, val) {
  let firstkey = keymap.shift();
  let lastkey = keymap.pop();
  result[firstkey] = result[firstkey] || {};
  let tempOb = result[firstkey];
  for (let i = 0; i < keymap.length; i++) {
    const key = keymap[i];
    tempOb[key] = {};

    tempOb = tempOb[key];
  }
  tempOb[lastkey] = val;
}

const b = decodeKeyDeep(entry);
console.log("8888>>>", b);
