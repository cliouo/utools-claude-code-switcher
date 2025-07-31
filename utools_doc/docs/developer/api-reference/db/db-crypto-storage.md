# dbCryptoStorage

# dbCryptoStorage ​
dbCryptoStorage 是基于 [本地数据库](./local-db.html) 基础上，封装的一套类似 [LocalStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 的 API，通过键值对形式加密存储数据。
## `utools.dbCryptoStorage.setItem(key, value)` ​
存储一个键值对数据，若键已存在，则覆盖它的值。
### 类型定义 ​
ts
    
    function setItem(key: string, value: any): void;
  * `key` 键值
  * `value` 要加密存储的值


### 示例代码 ​
js
    
    utools.dbCryptoStorage.setItem("key", "value will encrypt");
## `utools.dbCryptoStorage.getItem(key)` ​
获取一个键值对数据。
### 类型定义 ​
ts
    
    function getItem(key: string): any;
  * `key` 键值


### 示例代码 ​
js
    
    const value = utools.dbCryptoStorage.getItem("key");
    console.log(value);
## `utools.dbCryptoStorage.removeItem(key)` ​
删除一个键值对数据。
### 类型定义 ​
ts
    
    function removeItem(key: string): void;
  * `key` 键值


### 示例代码 ​
js
    
    utools.dbCryptoStorage.removeItem("key");
