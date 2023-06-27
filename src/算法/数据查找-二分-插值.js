    // 数据要求按某种规则排好序
    const seriesData = [5, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

    // 二分查找法
    function findxIndexByHalfSearch(arr, targetVal) {
      let low = 0;
      let heigh = arr.length; // 数据长度

      while (low < heigh && low >= 0) {
        let mid = Math.ceil(( heigh-low) / 2)+low;
        if (arr[mid] === targetVal) {
          return mid;
        }
        if (arr[mid] > targetVal) {
          heigh = mid;
        } else if (arr[mid] < targetVal) {
          low = mid;
        }

        console.log("循环");
      }
      return -1;
    }

    //插值查找法
    function findIndexByinsertVal(arr, targetVal) {
      let low = 0; // 第一个数据的位置
      let heigh = arr.length-1;
      while (low < heigh && low > -1&&heigh<arr.length) {
        let mid = Math.floor((targetVal+arr[low])/(arr[low]+arr[heigh])*(heigh-low)+low);
        if (arr[mid] === targetVal) {
          return mid;
        }
        if (arr[mid] > targetVal) {
          heigh = mid;
        } else if (arr[mid] < targetVal) {
          low = mid;
        }

        
      }
      return -1;
    }

    console.log("seriesData", seriesData);
    console.log("1111>>>>>>", findxIndexByHalfSearch(seriesData, 100))