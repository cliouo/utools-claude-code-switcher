# 事件

# 事件 ​
你可以根据需要，事先传递一些回调函数给这些事件，uTools 会在对应事件被触发时调用它们。
## `utools.onPluginEnter(callback)` ​
进入插件应用时，uTools 将会主动调用这个方法。
### 类型定义 ​
ts
    
    function onPluginEnter(callback: (action: PluginEnterAction) => void): void;
  * `callback` 进入插件应用触发的回调函数

`PluginEnterAction` 类型定义
ts
    
    interface PluginEnterAction {
      code: string;
      type: "text" | "img" | "file" | "regex" | "over" | "window";
      payload: string | MatchFile[] | MatchWindow;
      from: "main" | "panel" | "hotkey" | "reirect";
      option?: {
        mainPush: boolean;
      };
    }
#### 字段说明 ​
  * `code`
    * plugin.json 配置的 feature.code
  * `type`
    * plugin.json 配置的 feature.cmd.type
  * `payload`
    * feature.cmd.type 对应匹配的数据
  * `option`
    * feature.mainPush 设置为 ture ，且当用户选择 onMainPush 返回的选项进入时
  * `from`
    * 根据不同触发来源提供：
>     * `main`: 主面板
    * `panel`: 超级面板
    * `hotkey`: 快捷键
    * `reirect`: 重定向

`MatchFile` 类型定义
ts
    
    interface MatchFile {
      isFile: boolean;
      isDirectory: boolean;
      name: string;
      path: string;
    }
`MatchWindow` 类型定义
ts
    
    interface MatchWindow {
      id: number;
      class: string;
      title: string;
      x: number;
      y: number;
      width: number;
      height: number;
      appPath: string;
      pid: number;
      app: string;
    }
### 示例代码 ​
js
    
    utools.onPluginEnter(({ code, type, payload, option, from }) => {
      console.log("用户进入插件应用", code, type, payload);
      console.log("用户inrush插件的方式：", from);
    });
## `utools.onPluginOut(callback)` ​
插件应用退出时触发
### 类型定义 ​
ts
    
    function onPluginOut(callback: (isKill: boolean) => void): void;
  * `callback` 退出插件应用时触发的回调函数 
    * `isKill` 为 `true` 时，表示插件应用结束运行(进程结束)


### 示例代码 ​
js
    
    utools.onPluginOut((isKill) => {
      if (isKill) {
        console.log("用户结束运行插件应用");
      } else {
        console.log("插件应用被隐藏后台");
      }
    });
## `utools.onMainPush(callback, onSelect)` ​
推送内容到搜索框，并设置从推送的内容选项中打开插件应用的回调
注意
向搜索框推送消息(需要设置 feature.mainPush 设置为 true)，详情请参考 [plugin.json#feature.mainPush](./../../information/plugin-json.html#features-mainpush)
### 类型定义 ​
ts
    
    function onMainPush(
      callback: (action: MainPushAction) => MainPushResult[],
      onSelect: (action: PluginEnterAction) => boolean | undefined
    ): void;
  * `callback` 触发向搜索框推送内容 
    * MainPushAction 触发的参数
>     * MainPushResult 返回的内容
  * `onSelect` 用户选择推送的内容时触发，返回 `true` 表示进入插件应用并显示，不返回则静默执行该函数 
    * PluginEnterAction 参考 `onPluginEnter#PluginEnterAction`

`MainPushAction` 类型定义
ts
    
    interface MainPushAction {
      code: string;
      type: "text" | "img" | "file" | "regex" | "over" | "window";
      payload: string | MatchFile[] | MatchWindow;
    }
#### 字段说明 ​
  * `code`
    * plugin.json 配置的 feature.code
  * `type`
    * plugin.json 配置的 feature.cmd.type
  * `payload`
    * feature.cmd.type 对应匹配的数据，`MatchFile` 和 `MatchWindow` 类型参考 onPluginEnter

`MainPushResult` 类型定义
ts
    
    interface MainPushResult {
      icon: string;
      title: string;
      text: string;
    }
#### 字段说明 ​
  * `icon`
    * 推送消息的图标
  * `title`
    * 推送消息的标题
  * `text`
    * 推送消息的内容


### 示例代码 ​
js
    
    function callback({ code, type, payload }) {
      return [
        {
          icon: "icon.png",
          text: "选项1",
          title: "help text",
        },
        {
          text: "选项2",
          anyField: "xxxx",
        },
      ];
    }
    function selectCallback({ code, type, payload, option }) {
      if (option.xxx) {
        // 返回 true 表示需要进入插件应用处理
        return true;
      }
      // 不进入插件应用 "执行粘贴文本"
      utools.hideMainWindowPasteText(option.text);
    }
    utools.onMainPush(callback, selectCallback);
## `utools.onPluginDetach(callback)` ​
用户对插件应用进行分离操作时触发
### 类型定义 ​
ts
    
    function onPluginDetach(callback: () => void): void;
  * `callback` 插件应用分离为独立窗口时触发的回调函数


### 示例代码 ​
js
    
    utools.onPluginDetach(() => {
      console.log("插件应用分离为独立窗口");
    });
## `utools.onDbPull(callback)` ​
当此插件应用的数据在其他设备上被更改后同步到此设备时触发
### 类型定义 ​
ts
    
    function onDbPull(callback: (docs: DbDoc[]) => void): void;
  * `callback` 当插件应用在运行中，从云端同步该插件应用数据时触发的回调函数 
    * `docs` 同步的数据，类型参考 [DbDoc](./../db/local-db.html#def-dbdoc)


### 示例代码 ​
js
    
    utools.onDbPull((docs) => {
      console.log(docs);
    });
