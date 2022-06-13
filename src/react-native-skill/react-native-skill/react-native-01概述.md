#### React-Native 概述

- react-native 提供了编译为 Android | ios app 的能力，并提供了访问移动平台的 api
- react-native 组件最终会编译为原生 ui 组件 如 <Uiview /> <FrameLayout /> <linearLauout />
- react-native 中事件名称与 web 界面有细微的差别 如 onChange 事件-->onChangeText
- react-native 在布上区分滚动容器和非滚动容器 <View /> <ScrollView /> scroll 默认滚动时纵向
- react-native 长列表渲染 <FlatList> <SectionList>
- scrollView 会渲染容器类所有原素 FlatList 优先渲染屏幕上可见的元素
- sectionList 主要用于渲染分组数据、
- react-native 用于检测平台的模块 Platform

```js
Platform.os; //--->ios | android
Platfor.select({
    ios:{background:'red'}
    android:{background:'blue'}
})
```

- Platform.select({}) 以平台名称为 key 返回对应的数据对象
- React-Native 可根据运行平台加载相应的文件

```js
//文件
BigButton.ios.js;
BigButton.android.js;
// 引用方式
import BigButton from "./BigButton";
// 会自动寻找对应平台后缀的文件
```

- React-native 自带打包工具 Metro

```js
Container.js; //# 由 Webpack, Rollup 或者其他打包工具打包的文件
Container.native.js; //# 由 React Native 自带打包工具(Metro) 为ios和android 打包的文件
```
