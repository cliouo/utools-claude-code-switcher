# plugin.json 配置提示

# plugin.json 配置提示 ​
在进行 uTools 的插件开发时， `plugin.json` 文件是必不可少的。
但是 `plugin.json` 目前只能使用 JSON 文件进行编写，而插件配置的字段比较繁多且复杂，所以配置时，需要经常翻看文档，容易造成开发流程的不通畅。
为了提高开发效率，uTools 官方开源了 `plugin.json` 相关的 JSONSchema 文件。
TIP
关于 JSONSchema，请参考 <https://json-schema.org/>
## 如何使用 ​
JSONSchema 通常作为 JSON 文件一种默认支持的协议文件，支持多种加载方式，同时支持远程加载跟本地加载。
### 远程地址 ​
当你网络足够友好，能够直接访问 GitHub 时，可以通过直接在 `plugin.json` 中加入以下代码实现。
json
    
    {
      "$schema": "https://raw.githubusercontent.com/uTools-Labs/utools-api-types/refs/heads/main/resource/utools.schema.json"
    }
### 本地访问 ​
一般情况下，为了能够正常访问，我们可以考虑将 JSONSchema 文件下载到项目文件夹内，并通过相对路径（相对于 `plugin.json` 文件）进行访问。
我们假设 `plugin.json` 目前位于项目的 `public` 文件夹下，而 JSONScchema 位于项目的 `resource` 文件夹下，则编写如下代码
./public/plugin.json
json
    
    {
      "$schema": "../resource/utools.schema.json"
    }
### 跟随 `utools-api-type` 安装 ​
目前，JSONSchema 并没有被单独开源，而是跟随 [`utools-api-type`](./typescript.html) 一同开源，因此当你安装过 `utools-api-type` 时，可以直接在项目中访问 JSONSchema 。
我们假设 `plugin.json` 目前位于项目的 `public` 文件夹下，而 JSONScchema 位于项目的 `resource` 文件夹下，则编写如下代码
./public/plugin.json
json
    
    {
      "$schema": "../node_modules/utools-api-types/resource/utools.schema.json"
    }
