// 实现一个批量请求函数 multiRequest(urls, maxNum)
//要求最大并发数 maxNum
//每当有一个请求返回，就留下一个空位，可以增加新的请求
//所有请求完成后，结果按照 urls 里面的顺序依次打出

//单请求模拟
function signleFetch(url) {
  return new Promise(function (resolveFn, rejectFn) {
    const waitTime = Math.floor(Math.random() * 1000);
    setTimeout(() => {
      const fetchStatus = waitTime % 2 === 0;
      if (fetchStatus) {
        resolveFn({ message: "请求成功", url: url });
      } else {
        rejectFn({ message: "失败", url: url });
      }
    }, waitTime);
  }).then(
    (success) => {
      return success;
    },
    (reject) => {
      return reject;
    }
  );
}

//主体方法
function multipleReauest(urls, maxLimited) {
  return new Promise((resolve) => {
    const results = [];
    const firstTaskQueueLen = Math.min(maxLimited, urls.length);
    let successNum = 0;
    let waitIdx = maxLimited;

    function addTask() {
      if (waitIdx < urls.length) {
        let currentidx = waitIdx;
        signleFetch(urls[currentidx]).then((res) => {
          results[currentidx] = res;
          successNum++;
          addTask();
        });
        waitIdx++;
      }
      if (successNum === urls.length) {
        resolve(results);
      }
    }

    for (let i = 0; i < firstTaskQueueLen; i++) {
      signleFetch(urls[i]).then((res) => {
        results[i] = res;
        successNum++;
        addTask();
      });
    }
  });
}

// 测试
multipleReauest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 5).then((res) => {
  console.log("请求结果", res);
});
