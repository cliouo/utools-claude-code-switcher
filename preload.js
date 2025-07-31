const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// 最大备份数量
const MAX_BACKUPS = 10;

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

// 默认配置内容
const getDefaultSettings = () => {
  return {
    "env": {
      "ANTHROPIC_AUTH_TOKEN": "sk-xxxxx",
      "ANTHROPIC_BASE_URL": "https://api.xxx.com"
    },
    "permissions": {
      "allow": [],
      "deny": []
    }
  };
};

// 读取当前配置
const readSettings = () => {
  return new Promise((resolve) => {
    const settingsPath = getSettingsPath();
    const settingsDir = path.dirname(settingsPath);
    
    // 如果配置文件不存在，创建默认配置
    if (!fs.existsSync(settingsPath)) {
      // 确保目录存在
      if (!fs.existsSync(settingsDir)) {
        fs.mkdirSync(settingsDir, { recursive: true });
      }
      
      // 创建默认配置文件
      const defaultSettings = getDefaultSettings();
      const defaultContent = JSON.stringify(defaultSettings, null, 2);
      
      fs.writeFile(settingsPath, defaultContent, 'utf8', (err) => {
        if (err) {
          console.error('Error creating default settings:', err);
          resolve(null);
        } else {
          resolve(defaultContent);
        }
      });
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

// 计算内容的哈希值
const getContentHash = (content) => {
  return crypto.createHash('md5').update(content).digest('hex');
};

// 获取最新备份的哈希值
const getLatestBackupHash = async (backupDir) => {
  return new Promise((resolve) => {
    fs.readdir(backupDir, (err, files) => {
      if (err || files.length === 0) {
        resolve(null);
        return;
      }
      
      // 获取所有备份文件
      const backupFiles = files
        .filter(f => f.startsWith('settings-') && f.endsWith('.json'))
        .sort((a, b) => b.localeCompare(a)); // 按时间降序排序
      
      if (backupFiles.length === 0) {
        resolve(null);
        return;
      }
      
      // 读取最新备份的内容
      const latestBackup = path.join(backupDir, backupFiles[0]);
      fs.readFile(latestBackup, 'utf8', (err, data) => {
        if (err) {
          resolve(null);
        } else {
          resolve(getContentHash(data));
        }
      });
    });
  });
};

// 清理旧备份，保留最新的 N 个
const cleanupOldBackups = async (backupDir) => {
  return new Promise((resolve) => {
    fs.readdir(backupDir, (err, files) => {
      if (err) {
        resolve();
        return;
      }
      
      // 获取所有备份文件并按时间排序
      const backupFiles = files
        .filter(f => f.startsWith('settings-') && f.endsWith('.json'))
        .sort((a, b) => b.localeCompare(a)); // 按时间降序排序
      
      // 如果备份数量超过限制，删除旧的
      if (backupFiles.length > MAX_BACKUPS) {
        const filesToDelete = backupFiles.slice(MAX_BACKUPS);
        filesToDelete.forEach(file => {
          fs.unlink(path.join(backupDir, file), (err) => {
            if (err) console.error('Error deleting old backup:', err);
          });
        });
      }
      
      resolve();
    });
  });
};

// 备份当前配置（智能备份）
const backupSettings = (backupId) => {
  return new Promise(async (resolve) => {
    const currentSettings = await readSettings();
    if (!currentSettings) {
      resolve(false);
      return;
    }
    
    const backupDir = getBackupDir();
    
    // 检查是否需要备份（与最新备份比较）
    const currentHash = getContentHash(currentSettings);
    const latestHash = await getLatestBackupHash(backupDir);
    
    if (currentHash === latestHash) {
      // 内容相同，无需备份
      resolve(true);
      return;
    }
    
    // 创建新备份
    const backupPath = path.join(backupDir, `settings-${backupId}.json`);
    
    fs.writeFile(backupPath, currentSettings, 'utf8', async (err) => {
      if (err) {
        console.error('Error backing up settings:', err);
        resolve(false);
      } else {
        // 清理旧备份
        await cleanupOldBackups(backupDir);
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