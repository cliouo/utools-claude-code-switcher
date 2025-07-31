# 输入

# 输入 ​
对外部应用进行一些输入操作，粘贴文本、粘贴图像、粘贴文件。
## `utools.hideMainWindowPasteFile(filePath)` ​
先复制文件再执行粘贴操作
### 类型定义 ​
ts
    
    function hideMainWindowPasteFile(filePath: string | string[]): boolean;
  * `filePath` 为文件路径，可以是单个文件路径，也可以是文件路径数组。


### 示例代码 ​
js
    
    utools.hideMainWindowPasteFile("C:\\Users\\Administrator\\Desktop\\test.txt");
## `utools.hideMainWindowPasteImage(image)` ​
先复制图像再执行粘贴操作
### 类型定义 ​
ts
    
    function hideMainWindowPasteImage(image: string | Uint8Array): boolean;
  * `image` 可以是一张图片文件路径，也可以是图像 Base64 的 Data URL。或图像的 Buffer


### 示例代码 ​
js
    
    // base64
    utools.hideMainWindowPasteImage("data:image/png;base64,......");
    // 路径
    utools.hideMainWindowPasteImage("/path/to/test.png");
## `utools.hideMainWindowPasteText(text)` ​
先复制文本再执行粘贴操作
### 类型定义 ​
ts
    
    function hideMainWindowPasteText(text: string): boolean;
  * `text` 字符串文本


### 示例代码 ​
js
    
    utools.hideMainWindowPasteText("Hello World!");
## `utools.hideMainWindowTypeString(text)` ​
输入文本，与输入法原理类似，可以输入任意字符串
### 类型定义 ​
ts
    
    function hideMainWindowTypeString(text: string): boolean;
  * `text` 要输入的文本，支持 Emoji


### 示例代码 ​
js
    
    utools.hideMainWindowTypeString("uTools 新一代效率工具平台 - 🐼👏🦄👨‍👩‍👧‍👦🚵🏻");
