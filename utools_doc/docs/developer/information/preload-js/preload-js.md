# 认识 preload

# 认识 `preload` ​
当你在 `plugin.json` 文件配置了 `preload` 字段，指定的 js 文件将被预加载，该 js 文件可以调用 Node.js API 的本地原生能力和 Electron 渲染进程 API。
## 为什么需要 `preload` ​
在传统的 web 开发中，为了保持用户运行环境的安全，JavaScript 被做了很强的沙箱限制，比如不能访问本地文件，不能访问跨域网络资源，不能访问本地存储等。
uTools 基于 Electron 构建，通过 preload 机制，在渲染线程中，释放了沙箱限制，使得用户可以通过调用 Node.js 的 API 来访问本地文件、跨域网络资源、本地存储等。
## `preload` 的定义 ​
`preload` 是完全独立于前端项目的一个特殊文件，它应当与 `plugin.json` 位于同一目录或其子目录下，保证可以在打包插件应用时可以被一起打包。
`preload` js 文件遵循 `CommonJS` 规范，因此你可以使用 `require` 来引入 Node.js 模块，此部分可以参考 [Node.js 文档](https://nodejs.org/api/modules.html)。
## 前端使用 `preload` ​
只需给 `window` 对象自定义一个属性，前端就可直接访问该属性。
preload.jsApp.jsx
js
    
    const fs = require("fs");
    
    window.customApis = {
      readFile: (path) => {
        return fs.readFileSync(path, "utf8");
      },
    };
jsx
    
    import { useEffect, useState } from "react";
    export default function App() {
      const [file, setFile] = useState("");
      useEffect(() => {
        window.customApis.readFile("/path/to/README.md").then((data) => {
          setFile(data);
        }
      }, []);
    
      return (
        <div>
          <pre>{file}</pre>
        <div>
      )
    }
## `preload` js 规范 ​
由于 `preload` js 文件可使用本地原生能力，为了防止开发者滥用各种读写文件、网络等能力，uTools 规定：
  * `preload` js 文件代码不能进行打包/压缩/混淆等操作，要保证每一行代码清晰可读。
  * 引入的第三方模块也必须清晰可读，在提交时将源码一同提交，同样不允许压缩/混淆。


