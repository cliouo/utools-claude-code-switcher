# 窗口

# 窗口 ​
用来实现一些跟 uTools 窗口相关的功能
## `utools.hideMainWindow(isRestorePreWindow)` ​
执行该方法将会隐藏 uTools 主窗口，包括此时正在主窗口运行的插件应用，分离的插件应用不会被隐藏。
### 类型定义 ​
ts
    
    function hideMainWindow(isRestorePreWindow?: boolean): boolean;
  * `isRestorePreWindow`表示是否焦点回归到前面的活动窗口，默认 true


### 示例代码 ​
js
    
    utools.hideMainWindow();
## `utools.showMainWindow()` ​
执行该方法将会显示 uTools 主窗口，包括此时正在主窗口运行的插件应用。
### 类型定义 ​
ts
    
    function showMainWindow(): boolean;
### 示例代码 ​
js
    
    utools.showMainWindow();
## `utools.setExpendHeight(height)` ​
设置插件应用在主窗口中的高度，单位为像素。
### 类型定义 ​
ts
    
    function setExpendHeight(height: number): boolean;
  * `height` 插件应用高度


### 示例代码 ​
js
    
    utools.setExpendHeight(300);
## `utools.setSubInput(onChange[, placeholder[, isFocus]])` ​
设置子输入框，进入插件应用后，原本 uTools 的搜索条主输入框将会变成子输入框，子输入框可以为插件应用所使用。
### 类型定义 ​
ts
    
    function setSubInput(onChange: (details: { text: string }) => void, placeholder?: string, isFocus?: boolean): boolean;
  * `onChange`: 输入框内容变化时的回调函数
  * `placeholder`: 输入框占位符
  * `isFocus`: 是否自动聚焦，默认为 `true`


### 示例代码 ​
js
    
    utools.setSubInput(({ text }) => {
      console.log(text);
    }, "搜索");
#### 效果截图 ​
![设置子输入框](https://res.u-tools.cn/website/subInput.png)设置子输入框
## `utools.removeSubInput()` ​
移除子输入框。
### 类型定义 ​
ts
    
    function removeSubInput(): boolean;
### 示例代码 ​
js
    
    utools.removeSubInput();
## `utools.setSubInputValue(text)` ​
直接对子输入框的值进行设置。
### 类型定义 ​
ts
    
    function setSubInputValue(text: string): boolean;
  * `text` 子输入框赋值的文本


### 示例代码 ​
js
    
    utools.setSubInputValue("hello world");
## `utools.subInputFocus()` ​
聚焦子输入框。
### 类型定义 ​
ts
    
    function subInputFocus(): boolean;
### 示例代码 ​
js
    
    utools.subInputFocus();
## `utools.subInputBlur()` ​
子输入框失去焦点，插件应用获得焦点
### 类型定义 ​
ts
    
    function subInputBlur(): boolean;
### 示例代码 ​
js
    
    utools.subInputBlur();
## `utools.subInputSelect()` ​
子输入框获得焦点并选中子输入框的内容
### 类型定义 ​
ts
    
    function subInputSelect(): boolean;
### 示例代码 ​
js
    
    utools.subInputSelect();
## `utools.outPlugin([isKill])` ​
退出插件应用，默认将插件应用隐藏后台。
### 类型定义 ​
ts
    
    function outPlugin(isKill?: boolean): boolean;
  * `isKill` 为 `true` 时，将结束运行插件应用(杀死进程)


### 示例代码 ​
js
    
    utools.outPlugin();
## `utools.redirect(label[, payload])` ​
跳转到另一个插件应用，并可以携带匹配指令的内容，如果插件应用不存在，则跳转到插件应用市场进行下载。
### 类型定义 ​
ts
    
    function redirect(label: string | [string, string], payload?: any): boolean;
  * `label` 为 `string` 时参数为指令名称。若传递数组，则第一个元素为插件应用名称，第二个元素为指令名称 
>     * 只传递指令名称，底座会查找所有拥有该指令的插件应用，如果只查找到一个插件应用则直接打开，多个则让用户选择打开，未找到将跳转至插件应用市场并搜索该指令名称
>     * 传递数组，即包含插件应用名称和指令名称，底座将定位到该插件应用并打开对应指令，若插件应用未下载，将跳转至插件应用市场下载再打开。
  * `payload` 跳转「功能指令」该参数设为空。若跳转「匹配指令」则该参数必须为指令可匹配的内容


### 示例代码 ​
js
    
    // 跳转到插件应用「聚合翻译」并翻译内容
    utools.redirect(["聚合翻译", "翻译"], "hello world");
    
    // 找到 “翻译” 指令，并自动跳转到对应插件应用
    utools.redirect("翻译", "hello world");
    
    // 跳转到插件应用「OCR 文字识别」并识别图片中文字
    utools.redirect(["OCR 文字识别", "OCR 文字识别"], {
      type: "img",
      data: "data:image/png;base64,", // base64
    });
    
    // 跳转到插件应用「JSON 编辑器」查看 Json 文件
    utools.redirect(["JSON 编辑器", "Json"], {
      type: "files",
      data: "/path/to/test.json", // 支持数组
    });
## `utools.showOpenDialog(options)` ​
弹出文件选择框
### 类型定义 ​
ts
    
    function showOpenDialog(options: OpenDialogOptions): string[] | undefined;
  * `OpenDialogOptions` 与[Electron `showOpenDialogSync#options`](https://www.electronjs.org/docs/api/dialog#dialogshowopendialogsyncbrowserwindow-options) 一致
  * 返回文件路径数组。用户取消则返回空


### 示例代码 ​
js
    
    const files = utools.showOpenDialog({
      filters: [{ name: "plugin.json", extensions: ["json"] }],
      properties: ["openFile"],
    });
    
    console.log(files);
## `utools.showSaveDialog(options)` ​
弹出文件保存框
### 类型定义 ​
ts
    
    function showSaveDialog(options: SaveDialogOptions): string | undefined;
  * `SaveDialogOptions` 与[Electron `showSaveDialogSync#options`](https://www.electronjs.org/docs/api/dialog#dialogshowsavedialogsyncbrowserwindow-options) 一致
  * 返回选择的文件夹路径。用户取消则返回空


### 示例代码 ​
js
    
    const savePath = utools.showSaveDialog({
      title: "保存位置",
      defaultPath: utools.getPath("downloads"),
      buttonLabel: "保存",
    });
    console.log(savePath);
## `utools.findInPage(text[, options])` ​
在当前页面中查找文本
### 类型定义 ​
ts
    
    function findInPage(text: string, options?: FindInPageOptions): void;
  * `text` 查找的文本
  * `FindInPageOptions` 与[Electron `webContents.findInPage#options`](https://www.electronjs.org/docs/api/web-contents#contentsfindinpagetext-options) 一致


### 示例代码 ​
js
    
    utools.findInPage("hello world");
## `utools.stopFindInPage(action)` ​
停止查找，与`findInPage` 配合使用
### 类型定义 ​
ts
    
    function stopFindInPage(
      action: "clearSelection" | "keepSelection" | "activateSelection"
    ): void;
  * `action`: `clearSelection` 清除选中文本，`keepSelection` 保留选中文本，`activateSelection` 激活选中文本，默认值为 `clearSelection`


### 示例代码 ​
js
    
    utools.stopFindInPage("clearSelection");
## `utools.startDrag(filePath)` ​
从插件中拖拽文件到其他窗口，拖拽产生一系列原生文件
### 类型定义 ​
ts
    
    function startDrag(filePath: string | string[]): void;
  * `filePath` 是文件路径，也可以是文件路径数组


### 示例代码 ​
js
    
    utools.startDrag("/path/to/abc.txt");
    utools.startDrag(["/path/to/1.txt", "/path/to/2.txt"]);
## `utools.createBrowserWindow(url[, options][, callback])` ​
创建一个独立窗口
### 类型定义 ​
ts
    
    function createBrowserWindow(url: string, options: BrowserWindowConstructorOptions, callback?: Function): BrowserWindow;
  * `url` 相对路径的 html 文件
  * `options` 参数参考 Electron 的 [BrowserWindowConstructorOptions](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions)。**注意：preload 配置也是相对路径** 。
  * `callback` 在页面加载完成后调用
  * 返回的 `BrowserWindow` 由 uTools 定制，大部分的函数和属性都是继承 Electron 的 [BrowserWindow](https://electronjs.org/docs/api/browser-window)。**注意：不包含 BrowserWindow 和 webContents 的实例事件** 。


### 示例代码 ​
父窗口子窗口
js
    
    const ubWindow = utools.createBrowserWindow(
      "test.html",
      {
        show: false,
        title: "测试窗口",
        webPreferences: {
          preload: "preload.js",
        },
      },
      () => {
        // 显示
        ubWindow.show();
        // 置顶
        ubWindow.setAlwaysOnTop(true);
        // 窗口全屏
        ubWindow.setFullScreen(true);
        // 向子窗口发送消息
        ubWindow.webContents.send("ping", "test");
        // 执行脚本
        ubWindow.webContents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())').then((result) => {
          console.log(result); // Will be the JSON object from the fetch call
        });
      }
    );
    console.log(ubWindow);
js
    
    // 在新建窗口的 preload.js 中接收父窗口传递过来的数据
    const { ipcRenderer } = require("electron");
    ipcRenderer.on("ping", (event, data) => {
      console.log(data);
    });
    utools.sendToParent("pong", "hello world"); // 版本：>= 6.1.0
## `utools.sendToParent(channel[, ...args])` ​
发送消息到父窗口
### 类型定义 ​
ts
    
    function sendToParent(channel: string, ...args: any[]): void; // 版本：>=6.1.0
  * `channel` 消息通道名称


### 示例代码 ​
js
    
    // 通过 utools.createBrowserWindow 创建的窗口调用
    utools.sendToParent("pong", "hello", 123); // 版本：>= 6.1.0
## `utools.getWindowType()` ​
获取当前窗口类型, 'main' 主窗口、'detach' 分离窗口、'browser' 由 `createBrowserWindow` 创建的窗口
### 类型定义 ​
ts
    
    function getWindowType(): "main" | "detach" | "browser";
### 示例代码 ​
js
    
    utools.onPluginEnter(({ code, type, payload }) => {
      if (utools.getWindowType() === "main") {
        utools.showNotification("当前窗口为主窗口");
      }
    });
## `utools.isDarkColors()` ​
获取是否深色主题
### 类型定义 ​
ts
    
    function isDarkColors(): boolean;
### 示例代码 ​
js
    
    utools.onPluginEnter(({ code, type, payload }) => {
      document.body.className = utools.isDarkColors() ? "dark-mode" : "";
    });
推荐
更推荐 web 原生方式判断
js
    
      let theme
      // 是否深色主题
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme = isDark ? 'dark' : 'light'
      // 监听主题切换
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        theme = e.matches ? 'dark' : 'light'
      })
