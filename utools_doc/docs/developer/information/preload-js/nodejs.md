# 使用 Node.js

# 使用 Node.js ​
`preload` js 文件遵循 `CommonJS` 规范，通过 `require` 引入 Node.js (16.x 版本) 模块
可以引入 Node.js 所有原生模块，开发者自己编写的 Node.js 模块以及第三方 Node.js 模块。
## 引入 Node.js 原生模块 ​
preload.js
js
    
    const fs = require("node:fs");
    const path = require("node:path");
    const os = require("node:os");
    const { execSync } = require("node:child_process");
    
    window.services = {
      readFile: (filename) => {
        return fs.readFileSync(filename, { encoding: "utf-8" });
      },
      getFolder: (filepath) => {
        return path.dirname(filepath);
      },
      getOSInfo: () => {
        return { arch: os.arch(), cpus: os.cpus(), release: os.release() };
      },
      execCommand: (command) => {
        execSync(command);
      },
    };
## 引入自己编写的模块 ​
preload.jslibs/writeText.js
js
    
    const writeText = require("./libs/writeText.js");
    
    window.services = {
      writeText,
    };
js
    
    const fs = require("fs");
    const path = require("path");
    
    module.exports = function writeText(text, filePath) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, text);
        return true;
      }
      return false;
    };
## 引入第三方模块 ​
### 通过 `npm` 安装 ​
在 `preload.js` 同级目录下，保证存在一个独立的 `package.json`，并且设置 `type` 为 `commons`。
json
    
    {
      "type": "commonjs"
      "dependencies": {}
    }
在 `preload.js` 同级目录下，执行 `npm install` 安装第三方模块，保证 `node_modules` 目录存在。
以下是通过 `npm` 引入 `colord` 的示例:
bash
    
    npm install colord
preload.js
js
    
    const { getFormat, colord } = require("colord");
    
    window.services = {
      colord: {
        darken(text) {
          const fmt = getFormat(text);
          if (!fmt) {
            return [null, "请输入一个有效的颜色值，比如 #000 或 rgb(0,0,0)"];
          } else {
            const darkColor = colord(text).darken(0.1);
            return [darkColor, null];
          }
        },
      },
    };
### 通过源码引入 ​
在 `preload.js` 同级目录下，下载源码，并使用 `require` 引入。
比如从 `github` 下载 `nodemailer`：
bash
    
    git clone https://github.com/nodemailer/nodemailer.git
preload.js
js
    
    const nodemailer = require("./nodemailer");
    const _setImmediate = setImmediate;
    process.once("loaded", function () {
      global.setImmediate = _setImmediate;
    });
    const sendMail = () => {
      let transporter = require("./nodemailer").createTransport({
        host: "smtp.qq.com",
        port: 465,
        secure: true,
        auth: {
          user: "aaa@qq.com",
          pass: "xxx",
        },
      });
      let mailOptions = {
        from: "aaa@qq.com",
        to: "bbb@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    };
    window.services = {
      sendMail: () => {
        return sendMail();
      },
    };
## 引入 Electron 渲染进程 API ​
preload.js
js
    
    const { clipboard, nativeImage } = require("electron");
    
    window.services = {
      copyImage: (imageFilePath) => {
        clipboard.writeImage(nativeImage.createFromPath(imageFilePath))
      },
    };
