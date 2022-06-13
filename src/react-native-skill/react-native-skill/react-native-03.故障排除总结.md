#### 在第一次使用 React-native 时经常遇到的问题。这些问题可能与 React native 无关。

1. 升级到软件包的最新可用版本或降低版本。您可以通过再次安装软件包来安装最新版本（例如 npm install package-name）。
2. Metro 如果模块指向本地文件（即模块名称以 开头./），则可能是由于缓存过时。要解决此问题，请尝试以下解决方案。

```js
npx react-native start --reset-cache
```

or

```js
rm -rf $TMPDIR/metro-bundler-cache-*
```

3. 缺少依赖 如果模块指向一个 npm 包（即模块的名称不带./），则可能是由于缺少依赖项。要解决此问题，请在您的项目中安装依赖项：

```js
yarn add name-of-the-module
```

or

```js
yarn install
```

然后再运行 yarn android

4. 有时甚至可能是由于安装损坏。如果清除缓存不起作用，请尝试删除您的 node_modules 文件夹并 yarn install 再次运行。

5. Metro 未支持的文件扩展

- ```js
  Error: While trying to resolve module "@react-navigation/native" from file "/path/to/src/App.js", the package "/path/to/node_modules/@react-navigation/native/package.json" was successfully found. However, this package itself specifies a "main" module field that could not be resolved ("/path/to/node_modules/@react-navigation/native/src/index.tsx"
  ```

6. metro.config.js 在项目中查找文件并检查您是否指定了该 sourceExts 选项。它至少应该具有以下配置：

```js
sourceExts: ["js", "json", "ts", "tsx"];
```

如果缺少文件后缀，则添加它们，然后清除 Metro 缓存，重新运行

7. 如果升级/降级包版本未能解决问题 尝试删除 node_modules 的以及锁定文（.lock）件并重新安装依赖项。

- ```js
   rm -rf node_modules
   rm yarn.lock
   yarn
  ```

8. an error "null is not an object (evaluating 'RNGestureHandlerModule.default.Direction')" 链接库出现问题
   - react-native 有许多包会在本地启用 因此需要:
   ```js
   react-native link `packge name`
   ```
9. an error "Tried to register two views with the same name RNCSafeAreaProvider" 有两个不同版本的依赖包

10. 开发时安装了新的依赖包需要重新运行项目

11. 视图布局使用 <SafeAreaProvider> 防止刘海屏，缺口屏视图被遮挡

```jsx
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Demo() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>{/*(...) */}</NavigationContainer>
    </SafeAreaProvider>
  );
}
```

12. react-navigation 隐藏头部导航

```jsx
<Stack.Navigator screenOptions={{ headerShown: false }}>

```

13. eact-navigation 路由钩子在组件内部通过监听事件的方式实现 `路由守卫`

```jsx
React.useEffect(
  () =>
    navigation.addListener("beforeRemove", (e) => {
      if (!hasUnsavedChanges) {
        // If we don't have unsaved changes, then we don't need to do anything
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert("Discard changes?", "You have unsaved changes. Are you sure to discard them and leave the screen?", [
        { text: "Don't leave", style: "cancel", onPress: () => {} },
        {
          text: "Discard",
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    }),
  [navigation, hasUnsavedChanges]
);
```
