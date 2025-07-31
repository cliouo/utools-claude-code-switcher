# 复制

# 复制 ​
执行复制文本、图像、文件(夹)
## `utools.copyText(text)` ​
复制文本
### 类型定义 ​
ts
    
    function copyText(text: string): boolean;
  * `text` 被复制的文本


### 示例代码 ​
js
    
    utools.copyText("Hello World!");
## `utools.copyFile(filePath)` ​
复制文件
### 类型定义 ​
ts
    
    function copyFile(filePath: string | string[]): boolean;
  * `filePath` 为文件路径，可以是单个文件路径，也可以是文件路径数组。


### 示例代码 ​
js
    
    utools.copyFile("C:\\Users\\Administrator\\Desktop\\test.txt");
## `utools.copyImage(image)` ​
复制图像
### 类型定义 ​
ts
    
    function copyImage(image: string | Uint8Array): boolean;
  * `image` 可以是一张图片文件路径，也可以是图像 Base64 的 Data URL。或图像的 Buffer


### 示例代码 ​
js
    
    // base64
    utools.copyImage("data:image/png;base64,......");
    // 路径
    utools.copyImage("/path/to/img.png");
## `utools.getCopyedFiles()` ​
获取系统剪贴板中复制的文件列表，返回一个数组，数组中的元素为文件路径。
### 类型定义 ​
ts
    
    function getCopyedFiles(): CopiedFile[];
`CopiedFile` 类型定义
ts
    
    interface CopiedFile {
      path: string;
      isDiractory: boolean;
      isFile: boolean;
      name: string;
    }
#### 字段说明 ​
  * `path`
    * 文件路径
  * `isDiractory`
    * 是否为文件夹
  * `isFile`
    * 是否为文件
  * `name`
    * 文件名


