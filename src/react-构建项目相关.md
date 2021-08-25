### cssmodule 解决css模块化的问题
1. css样式的全局污染
2. css命名混乱（cssmodule 会处理css的 class 名称）
3. 组件依赖管理不彻底（单个组件可能需要加载多个 css 文件且组件中只用到了少部分的样式）
4. 无法共享变量（针对复杂组件中需要javascript 和 css 共同处理样式） 
5. 代码压缩不彻底（针对移动端css 极限压缩）
### cssmodule 实现原理
```css
:import('path/to/deps.css'){
    localAlias:keyFromDep
}

:export{
    exportedKey:exportedValue
}
```
#### 启用cssmodule后 在webpack 中localIdentName配置生成样式的命名规则
```js
//webpack.config.js
css?modules&localIdentName= [name]_[local]-[hash:base64:5]
```
#### 使用
```jsx
import React from 'react'
import styles from './index.less'
console.log(styles)
/**
 *object{
     normal:button-normal-abcd5432
 } 
*/
export default function Botton (props){
    return <button classname={style.normal}></button>
}
```
#### 最终输出HTML
```HTML
<button class='button-normal-abcd5432'>
```
### 在cssmodule 中修改全局样式 
```css
:global{
    .link{
        color:#f40
    }
}
```
### 使用composes组合样式
```css
.base{/* 通用样式 */}
.normal{
    composes:base
    /* 其他样式代码 */
}
```
### cssmodule 使用技巧
- 不适用选择器，只使用class名来定义样式
- 不层叠多个class,只是用1个class把所有样式定义好
- 不嵌套
- 所有样式通过composes组合来实现复用
- 如果不想频繁的输入 style.*** 可以使用 react-css-module 库
### react-css-module 是通过高阶组件的形式来避免重复输入styles.***
```jsx
import React ,{Component} from 'react'
import classnames from 'classnames'
import cssModule from 'react-css-module'
import styles from './index.css'

class Dialog extends Component{
    render(){
        return (
            <div styleName='root'></div>
        )
    }
}
export default cssModule(Dialog,styles)
```
### react-addons-perf react 官方提供的的性能检测插件，因内置Date对象获取时间是异步的，用Date对象来记录性能耗时并不可靠
```js
import Perf from 'react-addons-perf'
/* 记录渲染开始时间点 */
Perf.start()
render()
/*记录结束时间点 */
Perf.end()
```
### 动画库
- react-smooth
- svg 线条动画 vivus.js
- react css transition