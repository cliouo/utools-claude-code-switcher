# 屏幕

# 屏幕 ​
提供一些针对用户屏幕的操作
## `utools.screenColorPick(callback)` ​
屏幕取色，弹出一个取色器，用户取完色执行回调函数
### 类型定义 ​
ts
    
    function screenColorPick(callback: (colors: { hex: string; rgb: string }) => void): void;
  * `callback`: 颜色选择后的回调函数 
    * `colors`: 颜色对象 
      * `hex`: 十六进制颜色值
      * `rgb`: RGB 颜色值


### 示例代码 ​
js
    
    // 取色
    utools.screenColorPick((colors) => {
      const { hex, rgb } = colors;
      console.log(hex, rgb);
    });
## `utools.screenCapture(callback)` ​
屏幕截图，会进入截图模式，用户截图完执行回调函数
### 类型定义 ​
ts
    
    function screenCapture(callback: (image: string) => void): void;
  * `callback`: 截图完的回调函数 
    * `image` 截图的图像 base64 Data Url


### 示例代码 ​
js
    
    // 截图完将图片发送到「OCR 文字识别」再跳转到进行翻译
    utools.screenCapture((image) => {
      utools.redirect(['OCR 文字识别', '文字识别+翻译'], image)
    });
## `utools.getPrimaryDisplay()` ​
获取主显示器
### 类型定义 ​
ts
    
    function getPrimaryDisplay(): Display;
提示
在下列获取屏幕对象时，`Display` 类型定义见 [Display](https://www.electronjs.org/docs/api/screen#screengetprimarydisplay)
### 示例代码 ​
js
    
    const display = utools.getPrimaryDisplay();
    console.log(display);
## `utools.getAllDisplays()` ​
获取所有显示器
### 类型定义 ​
ts
    
    function getAllDisplays(): Display[];
### 示例代码 ​
js
    
    const displays = utools.getAllDisplays();
    console.log(displays);
## `utools.getCursorScreenPoint()` ​
获取鼠标当前位置，为鼠标在系统中的绝对位置
### 类型定义 ​
ts
    
    function getCursorScreenPoint(): { x: number; y: number };
### 示例代码 ​
js
    
    const { x, y } = utools.getCursorScreenPoint();
    console.log(x, y);
## `utools.getDisplayNearestPoint(point)` ​
获取点位置所在的显示器
### 类型定义 ​
ts
    
    function getDisplayNearestPoint(point: { x: number; y: number }): Display;
  * `point` 包含 x 和 y 的位置对象


### 示例代码 ​
js
    
    const display = utools.getDisplayNearestPoint({ x: 100, y: 100 });
    console.log(display);
## `utools.getDisplayMatching(rect)` ​
获取矩形所在的显示器
### 类型定义 ​
ts
    
    function getDisplayMatching(rect: { x: number; y: number; width: number; height: number; }): Display;
  * `rect` 矩形对象


### 示例代码 ​
js
    
    const display = utools.getDisplayMatching({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
    });
    console.log(display);
## `utools.screenToDipPoint(point)` ​
屏幕物理坐标转 DIP 坐标
### 类型定义 ​
ts
    
    function screenToDipPoint(point: { x: number; y: number }): { x: number; y: number; };
  * `point` 包含 x 和 y 的位置对象


### 示例代码 ​
js
    
    const dipPoint = utools.screenToDipPoint({ x: 200, y: 200 });
    console.log(dipPoint);
## `utools.dipToScreenPoint(point)` ​
屏幕 DIP 坐标转物理坐标
### 类型定义 ​
ts
    
    function dipToScreenPoint(point: { x: number; y: number }): { x: number; y: number;};
  * `point` 包含 x 和 y 的位置对象


### 示例代码 ​
js
    
    const screenPoint = utools.dipToScreenPoint({ x: 200, y: 200 });
    console.log(screenPoint);
## `utools.screenToDipRect(rect)` ​
屏幕物理区域转 DIP 区域
### 类型定义 ​
ts
    
    function screenToDipRect(rect: { x: number; y: number; width: number; height: number; }): { x: number; y: number; width: number; height: number; };
  * `rect` 矩形对象


### 示例代码 ​
js
    
    const dipRect = utools.screenToDipRect({ x: 0, y: 0, width: 200, height: 200 });
    console.log(dipRect);
## `utools.dipToScreenRect(rect)` ​
DIP 区域转屏幕物理区域
### 类型定义 ​
ts
    
    function dipToScreenRect(rect: { x: number; y: number; width: number; height: number; }): { x: number; y: number; width: number; height: number; };
  * `rect` 矩形对象


### 示例代码 ​
js
    
    const rect = utools.dipToScreenRect({ x: 0, y: 0, width: 200, height: 200 });
    console.log(rect);
## `utools.desktopCaptureSources(options)` ​
获取桌面录屏源
### 类型定义 ​
ts
    
    function desktopCaptureSources(options: DesktopCaptureSourcesOptions): Promise<DesktopCaptureSource[]>;
  * `options` 用法请参考[utools.desktopCaptureSources](https://docs.autocode.com/utools/api/desktopCaptureSources.html)


### 示例代码 ​
js
    
    (async () => {
      const ousrces = await utools.desktopCaptureSources({
        types: ["window", "screen"],
      });
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: ousrces[0].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });
      const video = document.querySelector("video");
      video.srcObject = stream;
      video.onloadedmetadata = (e) => video.play();
    })();
