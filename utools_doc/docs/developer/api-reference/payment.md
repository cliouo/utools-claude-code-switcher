# 用户付费

# 用户付费 ​
## `utools.isPurchasedUser()` ​
是否付费用户
### 类型定义 ​
ts
    
    function isPurchasedUser(): boolean | string
  * 返回 `false` 非付费用户，返回 `true` 永久授权用户(付费买断)，返回 "yyyy-mm-dd hh:mm:ss" 日期字符串表示授权用户到期时间


### 示例代码 ​
js
    
    utools.onPluginEnter(({ type, code, payload }) => {
      const purchasedUser = utools.isPurchasedUser();
      if (purchasedUser) {
        // 已付费的合法用户，可使用插件应用完整功能
        // purchasedUser === true 永久授权(付费买断)
        // purchasedUser === "yyyy-mm-dd hh:mm:ss", 授权到期时间
      } else {
        // 打开付费
        utools.openPurchase({ goodsId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }, () => {
          console.log("付费成功");
        });
      }
    });
## `utools.openPurchase(options, callback)` ​
打开付费 (适用软件付费模式)
软件付费
软件付费指的是，用户按天数购买授权，在授权生效期内，可以使用对应的插件应用功能
付费模式
  * 插件应用基础功能免费，高级功能付费使用（推荐）
  * 插件应用完全收费


### 类型定义 ​
ts
    
    function openPurchase(options: OpenPurchaseOptions, callback?: () => void): void
`OpenPurchaseOptions` 类型定义
ts
    
    interface OpenPurchaseOptions {
      goodsId: string;
      outOrderId?: string;
      attach?: string;
    }
#### 字段说明 ​
  * `goodsId`
    * 商品 ID，在 “ uTools 开发者工具” 插件应用中创建
  * `outOrderId`
    * 第三方服务生成的订单号（6 - 64 字符）
  * `attach`
    * 第三方服务附加数据，在查询 API 和支付通知中原样返回，可作为自定义参数使用（最多 256 字符）


  * `options` 付费参数
  * `callback` 付费成功执行的回调函数


### 示例代码 ​
js
    
    utools.onPluginEnter(({ type, code, payload }) => {
      const purchasedUser = utools.isPurchasedUser();
      if (purchasedUser) {
        // 已付费的合法用户，可使用插件应用完整功能
        // purchasedUser === true 永久授权(付费买断)
        // purchasedUser === "yyyy-mm-dd hh:mm:ss", 授权到期时间
      } else {
        // 打开付费
        utools.openPurchase({ goodsId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }, () => {
          console.log("付费成功");
        });
      }
    });
## `utools.openPayment(options, callback)` ​
打开支付 (适用服务付费模式)
服务付费
服务付费指的是，用户按使用量购买应用服务，在购买后，可以在固定的次数或者数量下，使用应用服务。
付费模式
  * 服务 API 按次/按量购买。
  * 售卖虚拟商品。


### 类型定义 ​
ts
    
    function openPayment(options: OpenPaymentOptions, callback?: () => void): void
`OpenPaymentOptions` 类型定义
ts
    
    interface OpenPaymentOptions {
      goodsId: string;
      outOrderId?: string;
      attach?: string;
    }
#### 字段说明 ​
  * `goodsId`
    * 商品 ID，在 “ uTools 开发者工具” 插件应用中创建
  * `outOrderId`
    * 第三方服务生成的订单号（6 - 64 字符）
  * `attach`
    * 第三方服务附加数据，在查询 API 和支付通知中原样返回，可作为自定义参数使用（最多 256 字符）


  * `options` 支付参数
  * `callback` 支付成功执行的回调函数


### 示例代码 ​
js
    
    // 1. 配置好服务端支付通知地址
    // 2. 打开支付
    utools.openPayment({ goodsId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }, () => {
      console.log("支付成功");
      // 重新从服务器获取已购买商品量
    });
## `utools.fetchUserPayments()` ​
获取用户支付记录
### 类型定义 ​
ts
    
    function fetchUserPayments(): Promise<Payment[]>
`Payment` 类型定义
ts
    
    interface Payment {
      order_id: string;
      out_order_id: string;
      open_id: string;
      pay_fee: number;
      body: string;
      attach: string;
      goods_id: string;
      paid_at: string;
      created_at: string;
    }
#### 字段说明 ​
  * `order_id`
    * uTools 订单 ID
  * `out_order_id`
    * 外部或第三方服务生成的订单号
  * `open_id`
    * uTools 用户 ID
  * `pay_fee`
    * 支付金额，单位为分
  * `body`
    * 商品描述
  * `attach`
    * 附加数据
  * `goods_id`
    * 商品 ID
  * `paid_at`
    * 支付时间
  * `created_at`
    * 订单生成时间


### 示例代码 ​
js
    
    utools.fetchUserPayments().then((payments) => {
      console.log(payments);
    });
