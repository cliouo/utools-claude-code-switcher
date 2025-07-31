# 系统

# 系统 ​
提供一些系统级 API 的封装，也包含部分对于 uTools 底座功能的封装。
## `utools.showNotification(body[, clickFeatureCode])` ​
弹出系统通知
### 类型定义 ​
ts
    
    function showNotification(body: string, clickFeatureCode?: string): void;
  * `body` 通知的内容
  * `clickFeatureCode` 对应 plugin.json 配置的 feature.code，点击通知进入插件应用


### 示例代码 ​
js
    
    utools.showNotification("hello test");
## `utools.shellOpenPath(fullPath)` ​
系统默认方式打开给定的文件
### 类型定义 ​
ts
    
    function shellOpenPath(fullPath: string): void;
  * `fullPath` 文件(夹)路径


### 示例代码 ​
js
    
    utools.shellOpenPath("C:\\Users\\Public\\Desktop\\test.txt");
## `utools.shellTrashItem(fullPath)` ​
删除文件到回收站
### 类型定义 ​
ts
    
    function shellTrashItem(fullPath: string): void;
  * `fullPath` 文件路径


### 示例代码 ​
js
    
    utools.shellTrashItem("C:\\Users\\Public\\Desktop\\test.txt");
## `utools.shellShowItemInFolder(fullPath)` ​
在文件管理器中显示文件
### 类型定义 ​
ts
    
    function shellShowItemInFolder(fullPath: string): void;
  * `fullPath` 文件(夹)路径


### 示例代码 ​
js
    
    utools.shellShowItemInFolder("C:\\Users\\Public\\Desktop\\test.txt");
## `utools.shellOpenExternal(url)` ​
系统默认的协议打开 URL
### 类型定义 ​
ts
    
    function shellOpenExternal(url: string): void;
  * `url` 常规是 http 协议的 url, 也可以其他协议的 url, 例如：写邮件 [mailto:example@example.com](mailto:example@example.com)?subject=Hello&body=How%20are%20you%3F


### 示例代码 ​
js
    
    // 打开 uTools 官网
    utools.shellOpenExternal("https://www.u-tools.cn");
## `utools.shellBeep()` ​
播放系统提示音
### 类型定义 ​
ts
    
    function shellBeep(): void;
### 示例代码 ​
js
    
    utools.shellBeep();
## `utools.getNativeId()` ​
获取设备 ID，用于区别设备
### 类型定义 ​
ts
    
    function getNativeId(): string;
### 示例代码 ​
js
    
    // 存储只与当前设备相关的信息
    const nativeId = utools.getNativeId();
    utools.dbStorage.setItem(nativeId + "/key", "native value");
## `utools.getAppName()` ​
获取软件名称
### 类型定义 ​
ts
    
    function getAppName(): string;
### 示例代码 ​
js
    
    console.log(utools.getAppName());
## `utools.getAppVersion()` ​
获取软件版本
### 类型定义 ​
ts
    
    function getAppVersion(): string;
### 示例代码 ​
js
    
    console.log(utools.getAppVersion());
## `utools.getPath(name)` ​
获取路径，提供了一些特殊的路径获取方法
### 类型定义 ​
ts
    
    function getPath(name: string): string;
  * `name` 可以是以下特定的值 
    * `home` 用户主目录
    * `appData` 应用程序数据目录 
      * `%APPDATA%` (Windows)
      * `~/Library/Application Support` (macOS)
    * `userData` 应用程序用户数据目录，默认是 appData 文件夹附加应用的名称
    * `temp` 临时目录
    * `exe` 当前可执行文件的绝对路径
    * `desktop` 用户桌面目录
    * `documents` 用户文档目录
    * `downloads` 用户下载目录
    * `music` 用户音乐目录
    * `pictures` 用户图片目录
    * `videos` 用户视频目录
    * `logs` 用户日志目录


## `utools.getFileIcon(filePath)` ​
获取系统图标
### 类型定义 ​
ts
    
    function getFileIcon(filePath: string): string;
  * `filePath` 文件路径或文件扩展名 
    * 文件夹用 'folder'
  * 返回图标的 base64 Data Url


### 示例代码 ​
js
    
    // txt 文件扩展类型的系统图标
    const txtIcon = utools.getFileIcon(".txt");
    // 文件夹系统图标
    const folderIcon = utools.getFileIcon("folder");
    // 微信图标
    const folderIcon = utools.getFileIcon("C:\\Users\\Public\\Desktop\\微信.lnk");
## `utools.readCurrentFolderPath()` ​
读取当前文件管理器窗口路径 (linux 不支持)，前提当前活动系统窗口是「文件管理器」
### 类型定义 ​
ts
    
    function readCurrentFolderPath(): Promise<string>;
### 示例代码 ​
js
    
    const folderPath = await utools.readCurrentFolderPath();
    console.log(folderPath);
## `utools.readCurrentBrowserUrl()` ​
读取当前浏览器窗口路径 (linux 不支持)，前提当前活动系统窗口是浏览器
警告
由于浏览器差异，目前仅对以下浏览器完成测试：
  * MacOS: Safari、Chrome、Microsoft Edge、Opera、Vivaldi、Brave
  * Windows: Chrome、Firefox、Edge、IE、Opera、Brave


### 类型定义 ​
ts
    
    function readCurrentBrowserUrl(): Promise<string>;
### 示例代码 ​
js
    
    const url = await utools.readCurrentBrowserUrl();
    console.log(url);
## `utools.isDev()` ​
判断插件应用是否在开发环境
提示
插件应用开发环境是指：插件应用项目在 uTools 开发者工具中接入开发打开的
### 类型定义 ​
ts
    
    function isDev(): boolean;
### 示例代码 ​
js
    
    if (utools.isDev()) {
      console.log("插件应用开发环境");
    }
## `utools.isMacOS()` ​
判断当前系统是否是 macOS
### 类型定义 ​
ts
    
    function isMacOS(): boolean;
### 示例代码 ​
js
    
    if (utools.isMacOS()) {
      console.log("当前系统是 macOS");
    }
## `utools.isWindows()` ​
判断当前系统是否是 Windows
### 类型定义 ​
ts
    
    function isWindows(): boolean;
### 示例代码 ​
js
    
    if (utools.isWindows()) {
      console.log("当前系统是 Windows");
    }
## `utools.isLinux()` ​
判断当前系统是否是 Linux
### 类型定义 ​
ts
    
    function isLinux(): boolean;
### 示例代码 ​
js
    
    if (utools.isLinux()) {
      console.log("当前系统是 Linux");
    }
