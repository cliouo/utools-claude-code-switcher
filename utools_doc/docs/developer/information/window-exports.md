# 模板插件应用

# 模板插件应用 ​
uTools 为插件开发者提供了自由的插件设计方式，你可以使用任意的前端框架、任意的样式对插件进行开发。
但是有时候，你可能会需要更加轻量、快捷并且符合 uTools 官方设计规范的插件，你的插件可能只需要较为简单的交互逻辑，亦或者你不是一个前端开发者，你希望使用一个现成的模板来快速开发。
uTools 提供了模板插件应用，你可以使用模板插件来快速开发你的插件。
提示
uTools 的模板插件提供了以下的优势：
  1. 高质量、高性能的通用模版。
  2. 简单易用的 API 设计，你可以通过少量的代码添加你需要的插件交互逻辑。


当你使用模板插件应用时，将无法同时启用自定义的插件界面，但是你可以将多个插件界面同时启用，所以根据你真实的需求进行选择。
## 使你的插件应用成为模板插件应用 ​
  1. 删除 `plugin.json` 中的 `main` 字段，并保证设置了 `preload` 字段。


plugin.json
json
    
    {
      "main": "index.html", ,
      "preload": "preload.js", 
      "logo": "logo.png",
      "features": [
        {
          "code": "hello",
          "explain": "hello world",
          "icon": "icon.png",
          "cmds": ["hello"]
        }
      ]
    }
  2. 在 `preload.js` 中，为 `window` 对象挂载 `exports` 属性，该属性是一个对象，你可以通过该对象来暴露你的插件交互逻辑。


preload.js
js
    
    window.exports = {
      // 这里的hello与plugin.json中的code一致
      hello: {
        mode: "none", // 无UI模式
        args: {
          // 插件执行入口
          enter: () => {
            utools.showNotification("hello world");
          },
        },
      },
    };
## 支持的模板 ​
### 无 UI 模式 ​
通过将 `mode` 设置为 `none`，即可开启无 UI 模式。
无 UI 模式下，插件将不会显示插件界面，你可以用来实现一些对用户无干扰的交互逻辑。
通过设置 `args.enter` 字段来设置对应的功能指令入口。
preload.js
js
    
    window.exports = {
      // 这里的hello与plugin.json中的code一致
      hello: {
        mode: "none", // 无UI模式
        args: {
          // 插件执行入口
          enter: () => {
            utools.showNotification("hello world");
          },
        },
      },
    };
### 列表模式 ​
通过将 `mode` 设置为 `list`，即可开启列表模式。
列表模式下，插件将显示一个列表界面，你可以通过列表来选择一个选项，然后执行对应的交互逻辑。
通过设置 `args.enter` 字段来设置对应的功能指令入口。
通过设置 `args.placeholder` \+ `args.search` 字段来支持搜索功能，其中 `args.placeholder` 字段是搜索框的提示文字。
通过设置 `args.select` 字段来支持选择功能。
preload.js
js
    
    window.exports = {
      "features.code": {
        // 注意：键对应的是 plugin.json 中的 features.code
        mode: "list", // 列表模式
        args: {
          // 进入插件应用时调用（可选）
          enter: (action, callbackSetList) => {
            // 如果进入插件应用就要显示列表数据
            callbackSetList([
              {
                title: "这是标题",
                description: "这是描述",
                icon: "", // 图标(可选)
              },
            ]);
          },
          // 子输入框内容变化时被调用 可选 (未设置则无搜索)
          search: (action, searchWord, callbackSetList) => {
            // 获取一些数据
            // 执行 callbackSetList 显示出来
            callbackSetList([
              {
                title: "这是标题",
                description: "这是描述",
                icon: "", // 图标
                url: "https://yuanliao.info",
              },
            ]);
          },
          // 用户选择列表中某个条目时被调用
          select: (action, itemData, callbackSetList) => {
            window.utools.hideMainWindow();
            const url = itemData.url;
            require("electron").shell.openExternal(url);
            window.utools.outPlugin();
          },
          // 子输入框为空时的占位符，默认为字符串"搜索"
          placeholder: "搜索",
        },
      },
    };
### 文档模式 ​
通过将 `mode` 设置为 `doc`，即可开启文档模式。
![文档模式](https://res.u-tools.cn/website/docs.png)PHP 文档
文档模式下，插件将显示一个文档列表界面，你可以通过切换列表项来查看对应的文档内容。
通过设置 `args.indexes` 字段，传递一个索引数组，用于指定显示的文档列表。
文档模式下，默认启动了文档搜索功能，但是你可以通过设置 `args.placeholder` 字段来修改搜索框的提示文字，默认为 `搜索`。
preload.js
js
    
    window.exports = {
      "features.code": {
        // 注意：键对应的是 plugin.json 中的 features.code
        mode: "doc", // 文档模式
        args: {
          // 索引集合
          // indexes: require('./indexes.json')
          indexes: [
            {
              t: "这是标题",
              d: "这是描述",
              p: "doc/xxx.html", //页面, 只能是相对路径
            },
          ],
          // 子输入框为空时的占位符，默认为字符串"搜索"
          placeholder: "搜索",
        },
      },
    };
## 示例项目 ​
### 无 UI 模式 ​
  * [utools-template-noneui-example](https://github.com/uTools-Labs/utools-tutorials/tree/main/utools-template-noneui-example)


### 列表模式 ​
  * [utools-template-list-example](https://github.com/uTools-Labs/utools-tutorials/tree/main/utools-template-list-example)


### 文档模式 ​
  * [MDN 文档](https://github.com/in3102/utools-mdn-doc)
  * [Python 文档](https://github.com/in3102/utools-python-doc)
  * [Linux 文档](https://github.com/in3102/utools-linux-doc)
  * [PHP 文档](https://github.com/in3102/utools-php-doc)


### 无 UI 模式 + 列表模式 ​
  * [Chrome 小助手](https://github.com/in3102/utools-chrome_helper)


