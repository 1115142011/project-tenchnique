### node 概述
- 可以将node看作是javascript 的另一个宿主环境，node的核心是v8引擎，
- node 以回调函数的方式实现异步I/O
- node 与浏览器最大的不同:其不支持ui相关技术实现
- node 的应用场景I/O密集型
- node 底层实现了大量的异步I/O API
- node 保留了单线程的特点，对于CPU密集型 node提供了child_process
- node 将任务暴露为一个个事件 并利用事件循环的能力，有效的减少资源占用