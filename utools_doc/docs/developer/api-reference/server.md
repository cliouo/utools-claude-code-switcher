# 服务端 API

# 服务端 API ​
通过 uTools 的服务端 API，可以将你的应用和 uTools 用户关联，实现帐号互通、接收支付通知、查询用户支付记录等，为保护密钥安全，请仅在服务端调用接口。
## 公共定义 ​
### 返回状态码 ​
状态码| 说明  
---|---  
200| 成功  
400| 客户端错误  
401| 位置用户（sign 错误）  
403| 无权限访问（timestamp 过期）  
404| 未找到对应插件  
422| 请求参数校验失败  
500| uTools 暂时无法提供服务  
## 获取用户基础信息 ​
此接口用于获取 uTools 用户的基础信息、验证用户真实性，与第三方系统进行帐号打通，实现系统间免登录跳转等。
### 接口定义 ​
http
    
    GET https://open.u-tools.cn/baseinfo
    Accept: application/json
### 请求参数 ​
参数名| 类型| 必填| 说明  
---|---|---|---  
plugin_id| string| 是| 插件 ID  
access_token| string| 是| 用户登录凭证，点击查看获取方式  
timestamp| string| 是| 请求时间戳(秒)，误差需小于 10 分钟  
sign| string| 是| 签名，详见签名算法  
### 响应数据 ​
  * 状态`200`时返回


json
    
    {
      "resource": {
        "avatar": "https://res.u-tools.cn/assets/avatars/eZCBIawAkspLw8Xg.png",
        "member": 1, // 是否 uTools 会员（0: 否，1: 是）
        "nickname": "却步.",
        "open_id": "00a50cd81c37c4e381e8161b2d762158", // uTools 用户 ID, 对于此插件应用不变且唯一
        "timestamp": 1624329616
      },
      "sign": "4dbf21a9d5a0f0e3906a0180522fd6393b4e91f738d57cafddf309afc6c547bb" // 签名算法与 1.3 相同
    }
  * 其他状态时返回


json
    
    {
      "message": "The given data was invalid.", // message 字段始终存在
      "errors": {
        // 可能没有详细错误信息
        "access_token": ["access token 必须是 32 个字符。"]
      }
    }
### 调用步骤 ​
  1. 在客户端获取用户登录凭证 access_token，[通过`utools.fetchUserServerTemporaryToken`获取](./utools/user.html#utools-fetchuserservertemporarytoken)
  2. 服务端签名算法


  * 对请求参数按参数名升序排序
  * 对参数内容进行 `url_encode` 编码后，组合成 URL 参数形式的字符串，如：`access_token=aaaaaaa&plugin_id=ccccc&timestamp=1624329435`
  * 使用 HMAC 方法对字符串生成带有密钥的哈希值，得到签名


phpnodejs
php
    
    $params = [
      "plugin_id" => "zueadppw", // 可在开发者插件应用中获得
      "access_token" => "user access_token 32位",
      "timestamp" => "1624329435",
    ];
    // 1. 按照键名对数组进行升序排序
    ksort($params);
    // 2. 生成 URL-encode 之后的请求字符串
    $str = http_build_query($params);
    // 3. 使用 HMAC 方法生成带有密钥的哈希值
    $secret = "your secret 32位"; // secret 在开发者插件应用中通过重置获取
    $sign = hash_hmac("sha256", $str, $secret);
js
    
    const crypto = require("crypto");
    const params = {
      plugin_id: "zueadppw", // 可在开发者插件应用中获得
      access_token: "user access_token 32位",
      timestamp: "1624329435",
    };
    // 1. 按照键名对数组进行升序排序
    const keys = Object.keys(params).sort();
    const sortedParams = keys.reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});
    // 2. 生成 URL-encode 之后的请求字符串
    const str = new URLSearchParams(sortedParams).toString();
    // 3. 使用 HMAC 方法生成带有密钥的哈希值
    const secret = "your secret 32位"; // secret 在开发者插件应用中通过重置获取
    const sign = crypto.createHmac("sha256", secret).update(str).digest("hex");
  3. 发起请求


curlphpnodejs
bash
    
    curl --location --request GET 'https://open.u-tools.cn/baseinfo' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "plugin_id": "zueadppw", // 可在开发者插件应用中获得
      "access_token": "user access_token 32位",
      "timestamp": "1624329435",
      "sign": "xxx"
      }'
php
    
    $ch = curl_init();
    $url = "https://open.u-tools.cn/baseinfo?" . http_build_query($params);
    $headers = array(
      "Content-Type: application/json",
      "Accept: application/json",
    )
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    if (!curl_errno($ch)) {
      $json = json_decode($response, true);
      echo $json;
    }
    curl_close($ch);
js
    
    const fetch = require('node-fetch')
    const params = {
      plugin_id: "zueadppw", // 可在开发者插件应用中获得
      access_token: "user access_token 32位",
      timestamp: "1624329435",
      sign: "xxx"
    }
    fetch('https://open.u-tools.cn/baseinfo?' + new URLSearchParams(params), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    ).then(res => res.json()).then(data => {
      console.log(data)
    })
## 支付订单查询接口 ​
此接口用于主动查询订单支付状态。
### 接口定义 ​
http
    
    GET https://open.u-tools.cn/payments/record
    Accept: application/json
### 请求参数 ​
参数名| 类型| 必填| 说明  
---|---|---|---  
plugin_id| string| 是| 插件 ID  
out_order_id| string| 是| 传 out_order_id 或 order_id 均可  
timestamp| int| 是| 时间戳（秒），误差需小于 10 分钟  
sign| string| 是| 签名，详见签名算法  
### 响应数据 ​
  * 状态`200`时返回


json
    
    {
      "resource": {
        "attach": "", // 附加数据
        "body": "会员1年", // 支付内容
        "created_at": "2021-06-18 16:42:16", // 订单生成时间
        "goods_id": "6n193s7P95p9gA13786YkwQ5oxHpVW4f", // 商品ID
        "open_id": "a331127d654761ac91d086b942aae7b6", // uTools 用户 ID
        "order_id": "KMFSOZt5cMe5A0ClkdCAAyPasyXZJzP6", // uTools 订单号
        "out_order_id": "123456", // 外部订单号
        "paid_at": "", // 用户支付时间
        "pay_fee": 1, // 支付金额（分）
        "plugin_id": "FFFFFFFF",
        "status": 0, // 是否支付（0: 未支付，10: 已支付）
        "timestamp": 1624346603 // 请求发送时间戳
      },
      "sign": "dbb3d05f6e794ca3b2bc2fa7ef45c3f7cd6a3b20c601b37317863b67998d535e"
    }
## 创建商品接口 ​
此接口用于动态创建商品，主要解决不固定金额商品问题，一般为一次性使用，通过此 API 创建的商品不会出现在开发者工具的商品列表中
### 接口定义 ​
http
    
    POST https://open.u-tools.cn/goods
    Accept: application/json
### 请求参数 ​
参数名| 类型| 必填| 说明  
---|---|---|---  
plugin_id| string| 是| 插件 ID  
access_token| string| 是| 用户登录凭证，点击查看获取方式  
timestamp| int| 是| 时间戳（秒），误差需小于 10 分钟  
sign| string| 是| 签名，点击查看签名方式  
### 响应数据 ​
json
    
    {
      "message": "ZyxrbSpWBH360pSWG0ueYI3rKSWXMcic"
    }
## 用户支付成功回调接口 ​
当用户通过 uTools 在你的插件应用内完成支付，且在开发者工具中配置了回调地址，在收到付款时，会将信息推送到配置的回调地址。
### 接口定义 ​
此处的接口定义指的是开发者工具中配置的回调地址，将会以 `POST` 方式推送数据到开发者工具中配置的回调地址。
http
    
    POST /<*api_path>
    Content-Type: application/json
### 请求参数 ​
此处的请求参数指的是将对开发者工具中配置的回调地址发起 `POST` 请求时，会被携带的参数。
json
    
    {
      "resource": {
        "attach": "", // 附加数据
        "body": "支付内容", // 支付内容
        "created_at": "2021-06-18 16:42:16", // 订单生成时间
        "goods_id": "xxx", // 商品ID
        "open_id": "xxx", // uTools 用户 ID
        "order_id": "xxx", // uTools 订单号
        "out_order_id": "123456", // 外部订单号
        "paid_at": "2021-06-18 16:42:36", // 用户支付时间
        "pay_fee": 1, // 支付金额（分）
        "plugin_id": "FFFFFFFF",
        "status": 10, // 是否支付（0: 未支付，10: 已支付）
        "timestamp": 1624346603 // 请求发送时间戳
      },
      "sign": "xxx"
    }
注意事项
  1. 当处理完成后，请返回字符串 SUCCESS
  2. 如果返回值为其他，uTools 会延时后再次通知，最多通知 5 次，时间间隔 [15, 30, 60, 300, 600] 秒。
  3. 通知最长等待 10 秒。
  4. 避免消息伪造，请务必验证 sign，签名方式与获取用户基础信息接口 1.3 一致


