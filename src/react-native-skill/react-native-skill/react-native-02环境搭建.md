### react-native 环境搭建 windows 篇

#### 必须安装的依赖

1. node （node 版本应> 14）
2. JDK (Java SE Development Kit (JDK))
3. Android Studio (安装目的-->获得编译 Adroid app 所需的工具和环境)

```js
// android studio 官网 https://developer.android.google.cn/studio/#downloads
// android stutio 必须勾选的选项
//1, Android Virtual Device  需要 android 11 版本的sdk 目前 rn 支持 android 5 以上的系统
//2,Android SDK
//3,Android SDK Platform
// -sdk Android SDK Platform 30
// -sdk Intel x86 Atom_64 System Image（官方模拟器镜像文件)
// -sdk Android SDK Build-Tools 30.0.2 版本
// -sdk Ndk 20.1.5948944版本
```

3. 配置 ANDROID_SDK_ROOT 环境变量

   - React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。
   - 环境变量不要配错到用户变量
   - java JDK 安装完成后 还需要配置环境变量 JAVA_HOME 否者 会有 JAVA_HOME 路径无效的报错
   - 环境变量配置完成后 必须重启命令行工具 环境变量才会生效

4. 编辑环境变量中 path 属性 添加

   - %ANDROID_SDK_ROOT%\platform-tools
   - %ANDROID_SDK_ROOT%\emulator
   - %ANDROID_SDK_ROOT%\tools
   - %ANDROID_SDK_ROOT%\tools\bin

5. adb ---> android debug bridge 安卓调试桥接程序

6. metro --->开发服务器 可理解为 webpack-dev-server metro 也称之为 packager 开发过程中必然会使用到 metro

7. react-native 在调试中 有快速刷新和 完全刷新两种机制 快速刷新--> hot module replace 完全刷新 --> live reload

8. 快速刷新时会保持 函数组件的本地 state class 组件的本地 state 会被重置

9. 可以在 Chrom 开发工具中调试 JavaScript 代码 开发者菜单打开 Debug JS Remotely 选项 地址栏必须时 Localhost //-->Chrome 中并不能直接看到 App 的用户界面，仅提供 console 的输出

10. 使用背景图片需要专门的标签 <BackgroundImage>

11. 元素样式的写法-> 普通的 JavaScript 对象 或对象数组/对象数组中相同的样式 后面覆盖前面

12. 单独设置图片某个圆角-在 ios 上不支持 如： borderTopLeftRadius

13. 图片下载自动会有 loading 效果 --->图片解码是在另一线程中完成的

14. react-native 中的颜色支持 rgb() rgba() hsl() hsla()

15. Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具。它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置，抛弃了基于XML的各种繁琐配置。
