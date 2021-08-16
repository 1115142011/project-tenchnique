#### 所谓的react元素即不可变的描述对象
##### 构成元素的两大必要条件
- ##### 类型
- ##### 属性
 ```js
 {
     type:'button',
     props:{
         color:'red',
         children:'click me'
     }

 }
 ```
 #### react 自定义编写的元素最终会转译成React.createElement 调用
