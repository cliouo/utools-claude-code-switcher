const fs = require('fs');
const path = require('path');
const os = require('os');

// Claude Code settings.json 文件路径 - 支持多平台
const getSettingsPath = () => {
  const homeDir = os.homedir();
  const platform = os.platform();
  
  // Windows 系统
  if (platform === 'win32') {
    const userProfile = process.env.USERPROFILE || homeDir;
    return path.join(userProfile, '.claude', 'settings.json');
  }
  
  // macOS 和 Linux 系统
  return path.join(homeDir, '.claude', 'settings.json');
};

// 获取备份目录
const getBackupDir = () => {
  const homeDir = os.homedir();
  const backupDir = path.join(homeDir, '.claude', 'settings-backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  return backupDir;
};

// 读取当前配置
const readSettings = () => {
  return new Promise((resolve) => {
    const settingsPath = getSettingsPath();
    
    if (!fs.existsSync(settingsPath)) {
      resolve(null);
      return;
    }
    
    fs.readFile(settingsPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading settings:', err);
        resolve(null);
      } else {
        resolve(data);
      }
    });
  });
};

// 写入配置
const writeSettings = (content) => {
  return new Promise((resolve) => {
    const settingsPath = getSettingsPath();
    const settingsDir = path.dirname(settingsPath);
    
    // 确保目录存在
    if (!fs.existsSync(settingsDir)) {
      fs.mkdirSync(settingsDir, { recursive: true });
    }
    
    fs.writeFile(settingsPath, content, 'utf8', (err) => {
      if (err) {
        console.error('Error writing settings:', err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// 备份当前配置
const backupSettings = (backupId) => {
  return new Promise(async (resolve) => {
    const currentSettings = await readSettings();
    if (!currentSettings) {
      resolve(false);
      return;
    }
    
    const backupDir = getBackupDir();
    const backupPath = path.join(backupDir, `settings-${backupId}.json`);
    
    fs.writeFile(backupPath, currentSettings, 'utf8', (err) => {
      if (err) {
        console.error('Error backing up settings:', err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// 暴露给渲染进程的 API
window.preload = {
  readSettings,
  writeSettings,
  backupSettings,
  getSettingsPath
};