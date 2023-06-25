// 按照给定的 间隔数，分割符 格式化字符串
function normaliazeStr(str, limited = 1, separater = ".") {
  const tempArray = str.split("");
  const redundant = tempArray.length % limited;
  const endStr = tempArray.slice(tempArray.length - limited).join("");
  const waitDisposed = tempArray.slice(redundant, tempArray.length - limited);
  let resultStr = tempArray.slice(0, redundant).join("");
  resultStr = resultStr ? resultStr + separater : "";
  for (let i = 0; i < waitDisposed.length; i++) {
    if (i > 0 && i % limited === 0) {
      resultStr += separater;
    }
    resultStr += waitDisposed[i];
  }

  return resultStr + separater + endStr;
}

const priceStr = "1000000000000000";
console.log("normaliazeStr>>>>", normaliazeStr(a, 3, ","));
// log  1,000,000,000,000,000
