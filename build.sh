#!/bin/bash

# 构建脚本
echo "开始构建 uTools Claude Code 配置切换器..."

# 清理之前的构建
rm -rf dist/
rm -f utools-claude-code-switcher.upx

# 构建前端
echo "构建前端..."
npm run build

# 复制必要文件到 dist
echo "复制必要文件..."
cp plugin.json dist/
cp logo.png dist/
cp preload.js dist/

# 创建 upx 包
echo "创建 upx 安装包..."
cd dist
zip -r ../utools-claude-code-switcher.upx *
cd ..

echo "构建完成！"
echo "安装包: utools-claude-code-switcher.upx"
echo ""
echo "安装方法:"
echo "1. 打开 uTools"
echo "2. 输入 '插件管理' 并回车"
echo "3. 点击右上角 '开发者' 按钮"
echo "4. 拖拽 utools-claude-code-switcher.upx 到窗口中安装"