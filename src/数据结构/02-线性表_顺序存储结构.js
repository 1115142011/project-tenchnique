/**
 *  链表的顺序存储结构-数组下标与内存地址存在对应关系·
 * @params{number} size linklist length 申请的内存空间的长度
 * tips:数组标代表内存控件的地址，游标表示元素在链表的位置
 * 链表中的每个元素都有一个数据域与指针域->(指针域存储的是数据的内存地址)
 */
function LinkList(size) {
  const elStore = JSON.parse(JSON.stringify(new Array(size).fill({ data: null, next: null })));
  /** 这里记录一个问题 Array,fill({data:null,next:null}) 填充的数据是一份对象引用，修改其一 相当于修改全部因此使用 JSON 方法发保存一份快照 否则 while 会陷入死循环  */
  /** 设置一个链表的头节点存储size 信息 */
  elStore[0] = { data: null, next: 1, size: 0 };
  return {
    size: () => {
      /** 查询当前数组非空值的长度 */
      return elStore[0].size;
    },
    getEl: (cursor) => {
      /** 初始游标 */
      let current = elStore[0].next;
      /** 遍历查找直到找到对应元素或游标为null*/
      while (current) {
        if (current === cursor) {
          return elStore[current].data;
        }
        current = elStore[current].next;
      }
      return null;
    },
    addEl: (data) => {
      /** 添加元素 */
      //1,遍历找到空闲的内存位置

      let current = elStore[0].next;
      while (elStore[current].next) {
        current = elStore[current].next;
      }
      /** 将数据存储到对应的内存位置 */
      elStore[current].data = data;
      elStore[current].next = current + 1;
      elStore[0].size = elStore[0].size + 1;
    },
    removeEl: (cursor) => {
      /** 将指针域跳过 指定的元素 */
      elStore[cursor - 1].next = elStore[cursor].next;
      elStore[0].size = elStore[0].size - 1;
      for (let i = elStore.length - 1; i === cursor; i--) {
        elStore[i].next = elStore[i - 1].next;
        // 将元素向前移动
        elStore[i - 1] = elStore[i];
      }
    },
    insertEl: (data, cursor) => {
      if (elStore.size() === elStore.length) {
        // 线性表已存满数据
        return "error";
      }
      if (cursor < 1 || cursor >= elStore.length) {
        // 插入的下表已超出范围
        return "error";
      }
      for (let i = elStore.length - 1; i === cursor; i--) {
        elStore[i].next = elStore[i + 1].next;
        // 将元素向后移动
        elStore[i + 1] = elStore[i];
      }

      elStore[cursor] = data;
    },
  };
}

const myLinkList = new LinkList(20);
myLinkList.addEl({ first: "第一个元素" });
console.log("获取>>>>", myLinkList.getEl(1)); // {first:"第一个元素"}
myLinkList.addEl({ first: "第二个元素" });
console.log("获取>>>>", myLinkList.getEl(2)); // {first:"第二个元素"}
console.log("size>>>>", myLinkList.size()); // 2
myLinkList.removeEl(2);
console.log("获取>>>>", myLinkList.getEl(2)); // null
console.log("size>>>>", myLinkList.size()); // 1
