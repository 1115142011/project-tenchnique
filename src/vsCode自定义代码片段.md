### vscode 添加自定义代码片段

```js

/**
 * @author 开发者
 * @filename 文件名.tsx (这个后缀和文件名后缀相同)
 * @date 日期
 * @description 页面的相关说明
 */

/**
 * @author 开发者
 * @date 日期
 * @function 方法相关说明
 * @param {类型} 参数名
 * @return {返回类型}
 */
function(){

}
```

> 以上注释代码均可到 vscode 代码片段中进行相关设置, 共计有 2 个

- 操作如下 使用 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> 打开搜索栏, 输入 **configure user Snippets**, 选择下面文件替换当中内容:

- javascriptreact.json
- typescriptreact.json

```json
{
  "页面注释": {
    "prefix": "zs_page",
    "body": [
      "/**",
      " * @author painter",
      " * @filename $TM_FILENAME",
      " * @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_DAY_NAME",
      " * @description $1",
      " */"
    ],
    "description": "页面注释"
  },
  "函数注释": {
    "prefix": "zs_fun",
    "body": [
      "/**",
      " * @author painter",
      " * @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_DAY_NAME",
      " * @function $1",
      " * @param {$2} $3",
      " * @return {$4}",
      " */"
    ],
    "description": "函数注释"
  },
  "普通注释": {
    "prefix": "zs_normal",
    "body": ["/**  \n * $1 \n */"],
    "description": "普通注释"
  },
}
```
