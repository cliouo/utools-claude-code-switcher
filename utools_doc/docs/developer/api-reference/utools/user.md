# 用户

# 用户 ​
通过用户接口，可以获取到用户的基本信息、临时 token 等。
## `utools.getUser()` ​
获取当前登录的用户信息，包括头像、昵称等。
### 类型定义 ​
ts
    
    function getUser(): UserInfo | null;
  * `getUser` 登录时返回用户信息，未登录时返回 `null`

`UserInfo` 类型定义
ts
    
    interface UserInfo {
      avatar: string;
      nickname: string;
      type: "member" | "user";
    }
#### 字段说明 ​
  * `avatar`
    * 用户头像
  * `nickname`
    * 用户昵称
  * `type`
    * 用户类型，member: 会员用户, user: 普通用户


### 示例代码 ​
js
    
    const user = utools.getUser();
    if (user) {
      console.log(user);
    }
## `utools.fetchUserServerTemporaryToken()` ​
获取用户服务端临时令牌。
### 类型定义 ​
ts
    
    function fetchUserServerTemporaryToken(): Promise<TempToken>;
`TempToken` 类型定义
ts
    
    interface TempToken {
      token: string;
      expired_at: number;
    }
#### 字段说明 ​
  * `token`
    * 临时令牌
  * `expired_at`
    * 令牌过期时间戳


### 示例代码 ​
js
    
    const { token, expire_at } = await utools.fetchUserServerTemporaryToken();
    console.log(token);
    console.log(expire_at);
