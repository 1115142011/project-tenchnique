 //input 搜索如何防抖，如何处理中文输入-利用 compositionstart | compositionend 时间处理input 中文输入防抖

 function inputDebounceWrap(delay) {
    let timer;
    return function inputHandlet(e) {
      if (e.target.composing) {
        return;
      }
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        console.log("输入的值>>>>", e.target.value);
        timer = null;
      }, delay);
    };
  }

  function onCompositionStart(e) {
    e.target.combineinputing = true;
  }
  function onCompositionEnd(e) {
    e.target.combineinputing = false;

    let buildEvent = document.createEvent("HTMLEvents");
    buildEvent.initEvent("input");
    e.target.dispatchEvent(buildEvent);
  }


  /** 注意 事件是添加到输入元素上的 */
  const inputEle = document.getElementById("myinput");
  inputEle.addEventListener("input", inputDebounceWrap(1000));
  inputEle.addEventListener("compositionstart", onCompositionStart);
  inputEle.addEventListener("compositionend", onCompositionEnd);