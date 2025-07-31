# 可编程浏览器

# 可编程浏览器 ​
uTools browser 简称 ubrowser，是根据 uTools 的特性，量身打造的一个可编程浏览器。利用 ubrowser 可以轻而易举连接一切互联网服务，且与 uTools 完美结合。
小技巧
ubrowser 拥有优雅的链式调用接口，可以用口语化的数行代码，实现一系列匪夷所思的操作。例如：
  1. RPA 自动化
  2. 网页内容魔改
  3. 网页内容抓取


### `ubrowser.goto(url[, headers][, timeout])` ​
打开一个 ubrowser 窗口，并跳转到指定网页
#### 类型定义 ​
ts
    
    function goto(
      url: string,
      headers?: Record<string, string>,
      timeout?: number
    ): UBrowser;
  * `url`: 要跳转的网页地址
  * `headers`: 请求头
  * `timeout`: 超时时间，单位毫秒


### `ubrowser.useragent(ua)` ​
设置用户代理（User-Agent）
#### 类型定义 ​
ts
    
    function useragent(ua: string): UBrowser;
  * `ua`: User-Agent 字符串


### `ubrowser.viewport(width, height)` ​
设置浏览器视窗大小
#### 类型定义 ​
ts
    
    function viewport(width: number, height: number): UBrowser;
  * `width`: 视窗宽度
  * `height`: 视窗高度


### `ubrowser.hide()` ​
隐藏 ubrowser 窗口
#### 类型定义 ​
ts
    
    function hide(): UBrowser;
### `ubrowser.show()` ​
显示 ubrowser 窗口
#### 类型定义 ​
ts
    
    function show(): UBrowser;
## 网页操作 ​
ubrowser 支持网页内容魔改，即在网页加载前对网页内容进行修改，例如添加自定义 CSS、JavaScript 等。
### `ubrowser.css(css)` ​
添加自定义 CSS
#### 类型定义 ​
ts
    
    function css(css: string): UBrowser;
  * `css`: 自定义 CSS


### `ubrowser.evaluate(func[, params])` ​
在网页中执行自定义 JS 代码
#### 类型定义 ​
ts
    
    function evaluate(func: Function, params?: any[]): UBrowser;
  * `func`: 网页内执行的 JS 函数，函数若有返回值，则会在 `run` Promise 结果返回
  * `params`: 传递给`func`的参数


### `ubrowser.press(key[, modifiers])` ​
模拟键盘按键
#### 类型定义 ​
ts
    
    function press(key: string, ...modifiers: string[]): UBrowser;
  * `key`: 要模拟的按键
  * `modifiers`: 要模拟的修饰键，一般为 `shift`、`ctrl`、`alt`、`meta`


### `ubrowser.click(selector)` ​
执行点击操作
#### 类型定义 ​
ts
    
    function click(selector: string): UBrowser;
  * `selector`: CSS 选择器或 XPath 选择器


### `ubrowser.mousedown(selector)` ​
执行鼠标按下操作
#### 类型定义 ​
ts
    
    function mousedown(selector: string): UBrowser;
  * `selector`: CSS 选择器或 XPath 选择器


### `ubrowser.mouseup(selector)` ​
执行鼠标抬起操作
#### 类型定义 ​
ts
    
    function mouseup(selector: string): UBrowser;
  * `selector`: CSS 选择器或 XPath 选择器


### `ubrowser.file(selector, payload)` ​
对网页中的 input 元素设置文件
#### 类型定义 ​
ts
    
    function file(selector: string, payload: string | string[] | Buffer): UBrowser;
  * `selector` 元素必须是可选择文件的输入元素 `input[type=file]`
  * `payload` 可以是文件路径、文件路径集合以及文件 Buffer


### `ubrowser.value(selector, payload)` ​
对网页中的 input 元素设置值
#### 类型定义 ​
ts
    
    function value(selector: string, payload: string): UBrowser;
  * `selector` 必须是 `input`、`textarea`、`select` 元素，使用 CSS 选择器或 XPath 选择器
  * `payload` 将会设置到 `value` 属性上


### `ubrowser.check(selector, checked)` ​
执行勾选操作
#### 类型定义 ​
ts
    
    function check(selector: string, checked: boolean): UBrowser;
  * `selector` 必须是 `checkbox`、`radio` 元素，使用 CSS 选择器或 XPath 选择器
  * `checked` 为 `true` 时，勾选，否则取消勾选


### `ubrowser.focus(selector)` ​
执行聚焦操作
#### 类型定义 ​
ts
    
    function focus(selector: string): UBrowser;
  * `selector`: CSS 选择器或 XPath 选择器


### `ubrowser.scroll(selector)` ​
执行滚动操作
#### 类型定义 ​
ts
    
    function scroll(selector: string): UBrowser;
    function scroll(y: number): UBrowser;
    function scroll(x: number, y: number): UBrowser;
  * `selector` 为 `string` 时，滚动到指定元素, 使用 CSS 选择器或 XPath 选择器
  * `selector` 为 `number` 时，只有一个参数表示 y 轴，滚动到纵向指定位置。两个参数则表示 x 轴。
  * 传递 `x` 和 `y`，滚动到指定位置


### `ubrowser.download(url[, savePath])` ​
执行下载操作
#### 类型定义 ​
ts
    
    function download(url: string, savePath?: string): UBrowser;
    function download(
      func: (...params: any[]) => string,
      savePath: string | null,
      ...params: any[]
    ): UBrowser;
  * `url` 待下载的资源 URL
  * `savePath` 指定下载路径，不传则下载到默认路径
  * `func` 网页内执行的 JS 函数, 函数可返回资源 URL，再根据返回 URL 下载资源
  * `params` 传递给 `func` 的参数


### `ubrowser.paste(text)` ​
先复制再执行粘贴操作
#### 类型定义 ​
ts
    
    function paste(text: string): UBrowser;
  * `text`: 要粘贴的内容，支持普通文本跟图像 Base64 Data URL


### `ubrowser.screenshot(target[, savePath])` ​
对网页进行截屏并保持到指定路径，将会保存成为 png 格式
#### 类型定义 ​
ts
    
    function screenshot(target?: string | Rect, savePath?: string): UBrowser;
  * 没有参数时，整个网页窗口截屏
  * 当 `target` 为 `string` 时，`target` 为选择器。可以传入一个 `Rect` 对象，表示截取指定区域。
  * `savePath` 保存路径，没有传递 `savePath` 的时，默认存储在临时目录。

`Rect` 类型定义
ts
    
    interface Rect {
      x: number;
      y: number;
      width: number;
      height: number;
    }
### `ubrowser.markdown([selector])` ​
将当前网页内容转换为 markdown
#### 类型定义 ​
ts
    
    function markdown(selector?: string): UBrowser;
  * `selector`: 可选，指定要转换的元素，使用 CSS 选择器或 XPath 选择器，不传递则转换整个网页内容


### `ubrowser.pdf(options[, savePath])` ​
将网页保存为 PDF
#### 类型定义 ​
ts
    
    function pdf(options: PdfOptions, savePath?: string): UBrowser;
  * `PdfOptions` 参考 [Electron `PrintToPDFOptions`](https://www.electronjs.org/docs/latest/api/web-contents#contentsprinttopdfoptions)
>   * `savePath` 保存路径，没有传递 `savePath` 的时，默认存储在临时目录。


### `ubrowser.device(options)` ​
模拟移动设备
#### 类型定义 ​
ts
    
    function device(options: DeviceOptions): UBrowser;
  * `options` 模拟设备信息

`DeviceOptions` 类型定义
ts
    
    interface DeviceOptions {
      userAgent: string;
      size: {
        width: number;
        height: number;
      };
    }
### `ubrowser.wait(ms)` ​
执行等待操作
#### 类型定义 ​
ts
    
    // 等待时间
    function wait(ms: number): this;
    // 等待元素出现
    function wait(selector: string, timeout?: number): this;
    // 等待函数返回 true
    function wait(
      func: (...params: any[]) => boolean,
      timeout?: number,
      ...params: any[]
    ): this;
  * `ms` 等待指定毫秒数
  * `selector` 等待元素出现，使用 CSS 选择器或 XPath 选择器
  * `timeout` 等待超时时间，默认为 60000 ms (60 秒)
  * `func` 网页内执行的 JS 函数, 返回 `true` 等待结束
  * `params` 传递给 `func` 的参数


### `ubrowser.when(selector)` ​
条件判断
#### 类型定义 ​
ts
    
    // 判断存在元素
    function when(selector: string): UBrowser;
    // 判断函数结果
    function when(func: (...params: any[]) => boolean, ...params: any[]): UBrowser;
  * `selector` 判断是否存在元素，使用 CSS 选择器或 XPath 选择器
  * `func` 网页内执行的 JS 函数, 判断函数返回的结果
  * `params` 传递给 `func` 的参数


### `ubrowser.end()` ​
结束上一个 `when`
#### 类型定义 ​
ts
    
    function end(): UBrowser;
### `ubrowser.devTools([mode])` ​
打开 ubrowser 开发者工具。
#### 类型定义 ​
ts
    
    function devTools(mode?: string): void;
  * `mode`: 可选值 'right' | 'bottom' | 'undocked' | 'detach' ，默认 'detach'


### `ubrowser.cookies([name])` ​
获取 ubrowser cookie
#### 类型定义 ​
ts
    
    // 在当前 url 根据名称获取 cookie, 为空获取当前 url 全部 cookie
    function cookies(name?: string): UBrowser;
    // 根据条件获取 Cookie
    function cookies(filter: CookieFilter): UBrowser;
  * `name` cookie 名称
  * `filter` 过滤对象

`CookieFilter` 类型定义
ts
    
    interface CookieFilter {
      url?: string;
      name?: string;
      domain?: string;
      path?: string;
      secure?: boolean;
      session?: boolean;
      httpOnly?: boolean;
    }
  * `url` 检索与 url 相关的 cookie。 空意味着检索所有 URL 的 cookie 。
  * `name` 按名称筛选 cookie。
  * `domain` 检索与域名或者 domain 子域名匹配的 cookie。
  * `path` 检索路径与 path 匹配的 cookie。
  * `secure` 通过其 Secure 属性筛选 cookie。
  * `session` 筛选出 session 内可用或持久性 cookie。
  * `httpOnly` 通过其 httpOnly 属性筛选 cookie。


### `ubrowser.setCookies` ​
设置 ubrowser 的 cookie
#### 类型定义 ​
ts
    
    function setCookies(name: string, value: string): UBrowser;
    function setCookies(cookies: { name: string; value: string }[]): UBrowser;
  * `name` cookie 名称
  * `value` cookie 值
  * `cookies` cookie 名称和值对象的集合


### `ubrowser.removeCookies(name)` ​
删除 ubrowser 的 cookie
#### 类型定义 ​
ts
    
    function removeCookies(name: string): UBrowser;
  * `name` cookie 名称


### `ubrowser.clearCookies([url])` ​
清空 ubrowser 的 cookie 信息。
#### 类型定义 ​
ts
    
    function clearCookies(url?: string): UBrowser;
  * `url`: 根据 url 清除 cookie，`clearCookies` 在 `goto` 函数之前调用时 `url` 不能为空。在 `goto` 之后调用则清空当前 url 的 cookie


### `ubrowser.run()` ​
开始运行 ubrowser 实例，并返回执行结果
#### 类型定义 ​
ts
    
    function run(
      ubrowserId?: number,
      options?: UBrowserOptions
    ): Promise<[...any, UBrowserInstance]>;
  * `ubrowserId` 一般以下两种形式获取： 
    * `ubrowser.run` 返回的 `UBrowserInstance` 的 `id` 属性（ubrowser 窗口仍在显示时）。
    * [`utools.getIdleUBrowser`](./manage.html#utools-getidleubrowsers) 返回的 `UBrowserInstance` 的 `id` 属性。
  * `run` 返回将会返回一个包含数组的 Promise 对象，数组的最后一个元素是当前未关闭窗口的 UBrowser 实例，其余的元素则是运行过程中，其他 ubrowser 方法的返回值，比如`evaluate`、`cookies`等。

`UBrowserOptions` 类型定义
ts
    
    interface UBrowserOptions {
      show?: boolean;
      width?: number;
      height?: number;
      x?: number;
      y?: number;
      center?: boolean;
      minWidth?: number;
      minHeight?: number;
      maxWidth?: number;
      maxHeight?: number;
      resizable?: boolean;
      movable?: boolean;
      minimizable?: boolean;
      maximizable?: boolean;
      alwaysOnTop?: boolean;
      fullscreen?: boolean;
      fullscreenable?: boolean;
      enableLargerThanScreen?: boolean;
      opacity?: number;
      frame?: boolean;
      closable?: boolean;
      focusable?: boolean;
      skipTaskbar?: boolean;
      backgroundColor?: string;
      hasShadow?: boolean;
      transparent?: boolean;
      titleBarStyle?: string;
      thickFrame?: boolean;
    }
  * `show`: 是否显示浏览器窗口
  * `width`: 浏览器窗口宽度，默认`800`
  * `height`: 浏览器窗口高度，默认`600`
  * `x`: 浏览器窗口位置 x 坐标
  * `y`: 浏览器窗口位置 y 坐标
  * `center`: 浏览器窗口是否居中
  * `minWidth`: 浏览器窗口最小宽度，默认`0`
  * `minHeight`: 浏览器窗口最小高度，默认`0`
  * `maxWidth`: 浏览器窗口最大宽度，默认无限制
  * `maxHeight`: 浏览器窗口最大高度，默认无限制
  * `resizable`: 浏览器窗口是否可缩放，默认`true`
  * `movable`: 浏览器窗口是否可移动，默认`true`
  * `minimizable`: 浏览器窗口是否可最小化，默认`true`
  * `maximizable`: 浏览器窗口是否可最大化，默认`true`
  * `alwaysOnTop`: 浏览器窗口是否置顶，默认`false`
  * `fullscreen`: 浏览器窗口是否全屏，默认`false`
  * `fullscreenable`: 浏览器窗口是否可全屏，默认`true`
  * `enableLargerThanScreen`: 浏览器窗口是否可超出屏幕，默认`false`，仅在 macOS 下生效
  * `opacity`: 浏览器窗口透明度，默认`1`，支持`0`-`1`之间的值，仅在 macOS 跟 Windows 下生效
  * `frame`: 浏览器窗口是否有边框，默认`true`
  * `closable`: 浏览器窗口是否可关闭，默认`true`
  * `focusable`: 浏览器窗口是否可聚焦，默认`true`
  * `skipTaskbar`: 浏览器窗口是否跳过任务栏，默认`false`
  * `backgroundColor`: 浏览器窗口背景颜色，默认`#ffffff`
  * `hasShadow`: 浏览器窗口是否有阴影，默认`false`
  * `transparent`: 浏览器窗口是否透明，默认`false`
  * `titleBarStyle`: 浏览器窗口标题栏样式，默认`default`，可选值`hidden`、`hiddenInset`、`customButtonsOnHover`
  * `thickFrame`: 浏览器窗口边框是否加粗，默认`false`

`UBrowserInstance` 类型定义
ts
    
    interface UBrowserInstance {
      id: string;
      url: string;
      title: string;
      width: number;
      height: number;
      x: number;
      y: number;
    }
### 示例代码 ​
js
    
    const address = "福州烟台山";
    // 在地图上显示地址位置
    utools.ubrowser
      // 打开百度地图站点
      .goto("https://map.baidu.com")
      // 等待出现搜索框
      .wait("#sole-input")
      // 搜索框获得焦点
      .focus("#sole-input")
      // 地址搜索框输入地址
      .value("#sole-input", address)
      // 等待 300 毫秒
      .wait(300)
      // 按下回车
      .press("enter")
      // 开始运行
      .run({ width: 1200, height: 800 });
js
    
    const expressNo = "YT8933937901850";
    // 快递 100 查询快递单号
    utools.ubrowser
      // 打开快递 100
      .goto("https://www.kuaidi100.com/")
      // 等待输入框
      .wait("#input")
      // 滚动到合适位置
      .scroll(0, 450)
      // 输入快递单号
      .value("#input", expressNo)
      // 点击查询
      .click("#query")
      // 开始运行(窗口大小 1280x720)
      .run({ width: 1280, height: 720 });
js
    
    const image = "/path/to/test.png";
    // 图片自动去背景
    utools.ubrowser
      // 清空 cookies
      .clearCookies("https://www.remove.bg")
      // 前往站点
      .goto("https://www.remove.bg/zh/upload")
      // 等界面加载出现上传按钮
      .wait('//div[text() = "上传图片"]')
      // 粘贴图片
      .paste(image)
      // 处理中，等待出现下载按钮
      .wait('//div[text() = "下载"]')
      // 再等待 3 秒，等结果返回
      .wait(3000)
      // 下载图片
      .download(function () {
        document
          .evaluate(
            '//div[text() = "下载"]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          )
          .singleNodeValue?.click();
      }, utools.getPath("downloads") + "/removebg_" + Date.now() + ".png")
      // 关闭窗口
      .hide()
      // 开始运行
      .run({ width: 880, height: 720 });
js
    
    const filePath = `/path/to/test.zip`;
    // 发送文件到微信文件传输助手
    utools.ubrowser
      .goto("https://filehelper.weixin.qq.com")
      // 等待扫码登录
      .wait("textarea")
      // 上传文件，自动发送
      .file("#btnFile", filePath)
      // 开始运行
      .run({ width: 720, Height: 680 });
js
    
    const text = `https://pan.baidu.com/s/1ekPm-ooS0uvVA_J7ZqVGDQ 提取码: kvr5`;
    const matchs = text.match(
      /(https?:\/\/[a-z0-9-._~:/?=#]+)\s*(?:\(|（)?(?:提取密?码?|访问密?码|密码)\s*(?::|：)?\s*([a-z0-9]{4,6})/i
    );
    // 网盘自动提取
    utools.ubrowser
      // 打开网盘地址
      .goto(matchs[1])
      // 等待页面加载完成出现 input 元素
      .wait("input")
      // 等待 500 ms
      .wait(500)
      // 让提取码输入框获得焦点
      .evaluate(function () {
        const inputDoms = Array.from(document.querySelectorAll("input"));
        const targetInput =
          inputDoms.find(
            (x) =>
              x.placeholder.includes("提取码") || x.placeholder.includes("访问码")
          ) || inputDoms[0];
        targetInput.focus();
      })
      // 粘贴提取码
      .paste(matchs[2])
      // 等待 300 ms
      .wait(300)
      // 回车
      .press("enter")
      .run({ width: 1280, height: 720 });
