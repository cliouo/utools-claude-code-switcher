# plugin.json 配置

# plugin.json 配置 ​
`plugin.json` 文件是插件应用的配置文件，它是最重要的一个文件，用来定义这个插件应用将如何与 uTools 集成。 每当你创建一个插件应用时，都需要从创建一个 `plugin.json` 文件开始。
## 配置文件格式 ​
plugin.json 文件是一个标准的 JSON 文件，它的结构如下：
json
    
    {
      "main": "index.html",
      "logo": "logo.png",
      "preload": "preload.js",
      "features": [
        {
          "code": "hello",
          "explain": "hello world",
          "cmds": ["hello", "你好"]
        }
      ]
    }
## 基础字段说明 ​
### `main` ​
> 类型：`string`
> 必填：`main` 与 `preload` 至少存在一个
必须是一个相对于 `plugin.json`的相对路径，且只能是一个 `.html` 文件。
### `logo` ​
> 类型：`string`
> 必填：是
插件应用 Logo，必须为 `png` 或 `jpg` 文件
### `preload` ​
> 类型：`string`
> 必填：`main` 与 `preload` 至少存在一个
预加载 js 文件，这是一个关键文件，你可以在此文件内调用 nodejs、 electron 提供的 api。查看更多关于 [preload.js](./preload-js/preload-js.html)
## 开发模式字段说明 ​
### `development` ​
> 类型：`object`
> 必填：否
开发模式下的配置，对象的同名字段会会覆盖基础配置字段。
### `development.main` ​
> 类型：`string`
> 必填：否
开发模式下，插件应用的入口文件，与基础配置字段 `main` 字段相同，但是此处可以配置为一个 `http` 协议的地址（不推荐）。
注意
支持 `http` 协议的地址，是为了方便开发者配合前端框架或者各种构建工具的使用，请勿将基础字段 `main` 字段配置为 `http` 协议的地址。
## 插件应用设置字段说明 ​
### `pluginSetting` ​
> 类型：`object`
> 必填：否
插件应用设置，可以配置一些插件在基座中的默认行为或者样式。
### `pluginSetting.single` ​
> 类型：`boolean`
> 必填：否
> 默认值：`true`
是否单例，默认为 `true`，表示插件在基座中只能存在一个应用实例。
### `pluginSetting.height` ​
> 类型：`number`
> 必填：否
> 最小值：`1`
插件应用初始高度。可以通过 [`utools.setExpendHeight`](./../api-reference/utools/window.html#utools-setexpendheight) 动态修改。
## 插件应用功能字段说明 ​
### `features` ​
> 类型：`Array<object>`
> 必填：是
> 最小长度：`1`
features 定义插件应用的指令集合，一个插件应用可定义多个功能，一个功能可配置多条指令。
features 的每个元素都是一个 feature 对象，对象中包含以下字段：
### `feature.code` ​
> 类型：`string`
> 必填：是
功能编码，此字段的值必须唯一。进入插件应用会将该编码带入，根据不同编码实现功能区分执行
### `feature.explain` ​
> 类型：`string`
> 必填：否
功能描述
### `feature.icon` ​
> 类型：`string`
> 必填：否
功能图标
支持 png、jpg、svg 格式。
### `feature.platform` ​
> 类型：`Array<string>|string`
> 必填：否
指定功能可用平台，可设置的值是 ["win32","darwin","linux"] 分别对应 Windows、macOS、Linux 平台
### `feature.mainPush` ​
> 类型：`boolean`
> 必填：否
是否向搜索框推送内容。
### `feature.mainHide` ​
> 类型：`boolean`
> 必填：否
若配置为`true`，打开此功能不主动显示搜索框。
### `feature.cmds` ​
> 类型：`Array<string|object>`
> 必填：是
> 最小长度：`1`
配置该功能的指令集合，指令分「功能指令」和「匹配指令」
## 功能指令 ​
搜索框可直接搜索和打开的指令
plugin.json
json
    
    {
      "features": [
        {
          "code": "text",
          "cmds": ["测试", "你好"]
        }
      ]
    }
WARNING
  * 指令配置为中文时，**无需再配置** 它的拼音和首字母作为指令，uTools 支持拼音和首字母搜索。
  * 必须配置至少一个「功能指令」，不然用户将**无法安装** 插件应用


## 匹配指令 ​
搜索框输入任意文本或粘贴图片、文件(夹)匹配出可处理它的指令
### `regex` ​
正则匹配特定文本
plugin.json
json
    
    {
      "features": [
        {
          "code": "regex",
          "cmds": [
            {
              // 类型标记（必须）
              "type": "regex",
              // 指令名称（必须）
              "label": "打开网址",
              // 正则表达式字符串
              // 注意: 正则表达式存如果在斜杠 "\" 需要多加一个，"\\"
              // 注意：“任意匹配的正则” 会被 uTools 忽视，例如：/.*/ 、/(.)+/、/[\s\S]*/ ...
              "match": "/^https?:\\/\\/[^\\s/$.?#]\\S+$|^[a-z0-9][-a-z0-9]{0,62}(\\.[a-z0-9][-a-z0-9]{0,62}){1,10}(:[0-9]{1,5})?$/i",
              // 最少字符数 (可选)
              "minLength": 1,
              // 最多字符数 (可选)
              "maxLength": 1000
            }
          ]
        }
      ]
    }
### `over` ​
匹配任意文本
plugin.json
json
    
    {
      "features": [
        {
          "code": "over",
          "cmds": [
            {
              // 类型标记（必须）
              "type": "over",
              // 指令名称（必须）
              "label": "百度一下",
              // 排除的正则表达式字符串 (任意文本中排除的部分) (可选)
              "exclude": "/\\n/",
              // 最少字符数 (可选)
              "minLength": 1,
              // 最多字符数 (默认最多为 10000) (可选)
              "maxLength": 500
            }
          ]
        }
      ]
    }
### `img` ​
匹配图像
plugin.json
json
    
    {
      "features": [
        {
          "code": "img",
          "cmds": [
            {
              // 类型标记（必须）
              "type": "img",
              // 指令名称（必须）
              "label": "图像保存为文件"
            }
          ]
        }
      ]
    }
### `files` ​
匹配文件(夹)
plugin.json
json
    
    {
      "features": [
        {
          "code": "files",
          "cmds": [
            {
              // 类型标记（必须）
              "type": "files",
              // 指令名称（必须）
              "label": "图片批量处理",
              // 文件类型 - "file"、"directory" (可选)
              "fileType": "file",
              // 文件扩展名 (可选)
              "extensions": ["png", "jpg", "jpeg", "svg", "webp", "tiff", "avif", "heic", "bmp", "gif"],
              // 匹配文件(夹)名称的正则表达式字符串，与 extensions 二选一 (可选)
              "match": "/\\.(?:jpg|jpeg|png|svg|webp|tiff|avif|heic|bmp)$/i",
              // 最少文件数 (可选)
              "minLength": 1,
              // 最多文件数 (可选)
              "maxLength": 100
            }
          ]
        }
      ]
    }
### `window` ​
匹配当前活动的系统窗口
plugin.json
json
    
    {
      "features": [
        {
          "code": "window",
          "cmds": [
            {
              // 类型标记（必须）
              "type": "window",
              // 指令名称（必须）
              "label": "窗口置顶",
              // 窗口匹配规则
              "match": {
                // 应用名称（必须）
                "app": ["xxx.app", "xxx.exe"],
                // 匹配窗口标题的正则表达式字符串 (可选)
                "title": "/xxx/",
                // 窗口类 (Windows 专有) (可选)
                "class": ["xxx"]
              }
            }
          ]
        }
      ]
    }
WARNING
正则表达式存如果在斜杠 "" 需要多加一个，"\"
## 配置示例 ​
### 正则匹配 ​
  * [utools-match-text-example](https://github.com/uTools-Labs/utools-tutorials/tree/main/utools-match-text-example)


### 图像匹配 ​
  * [utools-match-img-example](https://github.com/uTools-Labs/utools-tutorials/tree/main/utools-match-img-example)


### 文件匹配 ​
  * [utools-match-files-example](https://github.com/uTools-Labs/utools-tutorials/tree/main/utools-match-files-example)


### 窗口匹配 ​
  * [utools-match-window-example](https://github.com/uTools-Labs/utools-tutorials/tree/main/utools-match-window-example)


