# 使用 uTools API 提示

# 使用 uTools API 提示 ​
当你需要在项目中使用 TypeScript 时，一般会遇到无法正常使用 `utools` 的 API 的情况。
因此 uTools 官方推出了完整的类型定义文件，这份类型文件完整的列举了目前 `utools` 对象下所有的 API，并会根据版本的迭代同步更新。
## utools-api-types ​
`utools-api-types` 是官方开源的一个 TypeScript 类型定义代码库，你可以直接访问 <https://github.com/uTools-Labs/utools-api-types> 进行查看相关信息。
当然，若要使用到项目中，可以通过 npm 进行安装，并通过简单的配置启用。
### 安装 ​
shell
    
    npm install utools-api-types --save-dev
### 配置 tsconfig ​
json5
    
    {
      "compilerOptions": {
        "types": ["utools-api-types"]
      },
      "includes": [
        // 如果使用ts或者框架，请添加需要类型提示的文件范围
        // 案例：
        // src/**/*.ts
        // preload.js
      ]
    }
