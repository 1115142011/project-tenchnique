#### npm 包 如何实现多版本并存于同一个项目

##### 比如如下场景，antd 3 版本和 4 版本如何共存？旧项目想使用 antd 新版本组件的 API，但又不想重构，相信也有不少小伙伴有过这想法。

##### 我们在给项目安装 npm 包时是可以给包设置别名的：

```js
    npm install antd-v4@npm:antd@4.17.1
    or yarn add antd-v4@npm:antd@4.17.1
    /** package.json */
     "antd-v3": "npm:antd@4.17.1",
```

#### v4 版本的包管理时将使用 命名的别名进行管理 例如 npm uninstall antd-v4 | yarn remove antd-v4 | import {button} from 'antd-v4'

#### 如果共存的包有全局配置则配置方式应以版本最高者为准

#### config 全局配置

```jsx
<ConfigProvider locale={zhCN} prefixCls="ant-v4">
```

#### 全局语言配置

```js
import locale from "antd-v4/lib/locale/zh_CN";
```

####
