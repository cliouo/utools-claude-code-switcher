# uTools Claude Code 配置切换器

一个简单高效的 uTools 插件，用于一键切换本地 Claude Code 的配置文件。告别手动复制粘贴，在多个 API Key 或配置间快速切换，提升开发效率。

## 功能特性

- 🚀 **一键切换**：快速切换不同的 Claude Code 配置文件
- 💾 **配置管理**：保存、编辑、删除多个配置文件
- 🔒 **安全存储**：使用本地数据库 API 实现配置的安全存储和云同步
- ✏️ **可视化编辑**：内置 JSON 编辑器，支持语法检查和格式化
- ⚡ **快捷指令**：支持 `cc-配置名` 快速切换配置
- 🖥️ **跨平台支持**：完美支持 Windows、macOS、Linux
- 📚 **配置参考**：内置常用配置项说明和官方文档链接
- 🔄 **自动备份**：切换配置时自动备份当前配置
- 🌐 **云端同步**：支持 uTools 账号云同步，多设备共享配置
- 🔐 **设备独立**：每个设备可以独立选择激活的配置
- 🛡️ **安全机制**：配置被删除时自动处理相关状态

## 安装方法

### 方法一：从源码构建

1. 克隆仓库
```bash
git clone https://github.com/yourusername/utools-claude-code-switcher.git
cd utools-claude-code-switcher
```

2. 安装依赖
```bash
npm install
```

3. 构建插件
```bash
./build.sh
```

4. 安装插件
- 打开 uTools
- 输入 "插件管理" 并回车
- 点击右上角 "开发者" 按钮
- 拖拽生成的 `utools-claude-code-switcher.upx` 文件到窗口中安装

### 方法二：开发模式

1. 克隆仓库并安装依赖（同上）

2. 启动开发服务器
```bash
npm run dev
```

3. 在 uTools 开发者工具中加载插件
- 打开 uTools 开发者工具
- 选择 `plugin.json` 文件
- 点击 "接入开发"

## 使用方法

1. 在 uTools 中输入以下任一关键词：
   - `Claude Code配置`
   - `Claude Code Settings`
   - `cc配置`
   - `cc-settings`

2. 功能说明：
   - **查看当前配置**：显示当前正在使用的 Claude Code 配置
   - **编辑配置**：点击"编辑配置"按钮，使用内置 JSON 编辑器直接修改配置
   - **保存配置**：将当前配置保存为新的配置文件
   - **切换配置**：点击已保存的配置进行切换
   - **快捷切换**：使用 `cc-配置名` 快速切换到指定配置
   - **编辑名称**：点击编辑按钮修改配置名称
   - **删除配置**：点击删除按钮移除不需要的配置

## 快捷指令

保存配置后，会自动生成以下快捷指令：
- `cc-配置名` - 快速切换到指定配置
- `切换配置名` - 中文快捷指令
- `switch-配置名` - 英文快捷指令

例如：保存了名为"work"的配置后，可以使用 `cc-work` 快速切换。

## 技术栈

- **前端框架**: React + TypeScript
- **构建工具**: Vite
- **UI 组件**: shadcn/ui + Tailwind CSS
- **图标**: Lucide React
- **平台**: uTools 插件平台

## 配置文件位置

Claude Code 配置文件默认位置：
- **Windows**: `%USERPROFILE%\.claude\settings.json`
- **macOS**: `~/.claude/settings.json`
- **Linux**: `~/.claude/settings.json`

备份文件位置：
- `~/.claude/settings-backups/`

## 数据安全与同步

- **本地数据库存储**：使用 uTools 本地数据库 API，支持秒级云同步
- **设备独立激活**：每个设备独立记录当前激活的配置，互不干扰
- **自动状态同步**：配置被其他设备删除时自动清理本地状态
- **冲突处理**：多设备同时编辑时自动选择最新版本
- **实时同步状态**：界面右上角显示当前云同步状态

## 高级功能

### 编辑配置同步
当你编辑当前配置并保存时，如果该配置已绑定到某个已保存的配置，系统会自动同步更新该配置，无需手动操作。

### 多设备使用
- 配置通过 uTools 账号自动同步到所有设备
- 每个设备可以独立选择不同的激活配置
- 设备间的配置选择状态互不影响
- 支持离线使用，联网后自动同步

## 开发说明

### 项目结构
```
├── src/                    # 源代码
│   ├── components/        # React 组件
│   ├── lib/              # 工具函数
│   └── types/            # TypeScript 类型定义
├── plugin.json           # uTools 插件配置
├── preload.js           # Node.js 预加载脚本
└── build.sh             # 构建脚本
```

### 开发命令
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
./build.sh       # 构建 upx 安装包
```

## 注意事项

- 请确保有 Claude Code 配置文件的读写权限
- 切换配置前会自动备份当前配置，可在备份目录找到历史配置
- 建议在切换配置前关闭 Claude Code，避免配置冲突

## License

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！