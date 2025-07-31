# 模拟按键

# 模拟按键 ​
模拟用户的键盘与鼠标操作。
## `utools.simulateKeyboardTap(key[, ...modifiers])` ​
模拟键盘按键
### 类型定义 ​
ts
    
    function simulateKeyboardTap(key: string, ...modifiers: string[]): void;
  * `key`: 要模拟的按键
  * `modifiers`: 要模拟的修饰键，一般为 `shift`、`ctrl`、`alt`、`meta`


### 示例代码 ​
js
    
    // 模拟键盘敲击 Enter
    utools.simulateKeyboardTap("enter");
    // windows linux 模拟粘贴
    utools.simulateKeyboardTap("v", "ctrl");
    // macOS 模拟粘贴
    utools.simulateKeyboardTap("v", "command");
    // 模拟 Ctrl + Alt + A
    utools.simulateKeyboardTap("a", "ctrl", "alt");
## `utools.simulateMouseMove(x, y)` ​
模拟鼠标移动到指定位置
### 类型定义 ​
ts
    
    function simulateMouseMove(x: number, y: number): void;
  * `x` 距离屏幕左侧的位置(像素)
  * `y` 距离屏幕顶部的位置(像素)


### 示例代码 ​
js
    
    // 将鼠标移动到屏幕左上角
    utools.simulateMouseMove(50, 50);
## `utools.simulateMouseClick(x, y)` ​
模拟鼠标左键点击
### 类型定义 ​
ts
    
    function simulateMouseClick(x: number, y: number): void;
  * `x` 距离屏幕左侧的位置(像素)
  * `y` 距离屏幕顶部的位置(像素)


### 示例代码 ​
js
    
    // 在屏幕距离左侧 100 像素顶部 100 像素的位置点击
    utools.simulateMouseClick(100, 100);
## `utools.simulateMouseDoubleClick(x, y)` ​
模拟鼠标左键双击
### 类型定义 ​
ts
    
    function simulateMouseDoubleClick(x: number, y: number): void;
  * `x` 距离屏幕左侧的位置(像素)
  * `y` 距离屏幕顶部的位置(像素)


### 示例代码 ​
js
    
    // 在屏幕距离左侧 100 像素顶部 100 像素的位置双击
    utools.simulateMouseDoubleClick(100, 100);
## `utools.simulateMouseRightClick(x, y)` ​
模拟鼠标右键点击
### 类型定义 ​
ts
    
    function simulateMouseRightClick(x: number, y: number): void;
  * `x` 距离屏幕左侧的位置(像素)
  * `y` 距离屏幕顶部的位置(像素)


### 示例代码 ​
js
    
    // 在屏幕距离左侧 100 像素顶部 100 像素的位置右击
    utools.simulateMouseRightClick(100, 100);
