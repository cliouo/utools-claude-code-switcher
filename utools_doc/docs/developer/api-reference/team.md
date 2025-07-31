# 团队应用

# 团队应用 ​
提供团队版插件相关的接口，用来获取团队版管理配置的信息。
TIP
团队应用 API 需要配合团队管理后台使用，请在团队后台创建对应应用后可以使用。（暂未开放第三方应用）
## `utools.team.info()` ​
获取当前团队信息
### 类型定义 ​
ts
    
    function info(): TeamInfo;
`TeamInfo` 类型定义
ts
    
    interface TeamInfo {
      teamId: string;
      teamName: string;
      teamLogo: string;
      userId: string;
      userName: string;
      userAvatar: string;
    }
#### 字段说明 ​
  * `teamId`
    * 团队 ID，创建团队时生成
  * `teamName`
    * 团队名称，创建团队时填写
  * `teamLogo`
    * 团队图标，返回图片的网络地址
  * `userId`
    * 团队成员 ID，加入团队时生成
  * `userName`
    * 团队成员名字，加入团队时填写
  * `userAvatar`
    * 团队成员头像


### 示例代码 ​
js
    
    const { teamName } = utools.team.info();
    
    console.log(`当前团队为：${teamName}`);
## `utools.team.preset(key)` ​
获取对应的团队配置，获取的配置需要在团队版，返回的数据为一个 JSON 对象
### 类型定义 ​
ts
    
    function preset<T>(key: string): T | null;
### 示例代码 ​
js
    
    // 读取配置
    const configValue = utools.team.preset("config-key");
    console.log(configValue);
## `utools.team.allPresets([keyStartsWith])` ​
获取当前团队下发的所有配置，支持接收一个 key 前缀或者 keys 来过滤
### 类型定义 ​
ts
    
    function allPresets(keyStartsWith?: string): Promise<{ key: string; value: any }[]>;
    function allPresets(keys: string[]): Promise<{ key: string; value: any }[]>;
### 示例代码 ​
js
    
    // 获取 key 是 "config-" 开头的所有配置
    const allPresets1 = utools.team.allPresets("config-");
    // 获取 key 数组对应的配置
    const allPresets2 = utools.team.allPresets(["config-key-1", "config-key-2"]);
    // 获取所有配置
    const allPresets3 = utools.team.allPresets();
