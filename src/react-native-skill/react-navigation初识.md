### react-navigation 是有一系列的程序包组成的 正常使用时需要拍配套的 react-native-screens 和 react-native-safe-area-contentx

- react-safe-area-contentx 的主要作用 保证异形屏幕·显示是正常的，例如刘海屏，页面会被摄像头遮挡
- 安装依赖是会收到 项目存在多个不同版本的 react 依赖 ，如项目能正常构建该警告可以忽略
- ios 开发需要安装 pods 该依赖包需要有稳定的翻墙工具
- react-native-screens 构建·安卓应用时需要额外的配置

  - ```java
       // android/app/src/main/java/<your package name>/MainActivity.javaMainActivity.java
       @Override
        protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
     }
    ```

- 使用 react-navigation 作为用用程序的导航时，应用程序的所有组件需要包装在 NavigationContainer 组件下
- react-navigation 提供了三种导航模式，这三种导航模式可以根据需要组合使用
  1. 堆栈导航 createNativeStackNavigator 类似于 web 的 history 对象
  2. 底部的 tabbar
  3. 模态框 菜单
