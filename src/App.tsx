import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Settings, Save, FileText, Plus, Trash2, Check, FileCode, Command, AlertCircle } from 'lucide-react';
import { SimpleJsonEditor } from './components/SimpleJsonEditor';
import { ConfigReference } from './components/ConfigReference';
import { SyncStatus } from './components/SyncStatus';
import { dbService } from './services/database';
import { generateRandomName } from './lib/utils';
import type { SettingsProfile, ClaudeCodeSettings } from './types/settings';

function App() {
  const [profiles, setProfiles] = useState<SettingsProfile[]>([]);
  const [currentSettings, setCurrentSettings] = useState<ClaudeCodeSettings | null>(null);
  const [currentSettingsStr, setCurrentSettingsStr] = useState<string>('');
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingProfileName, setEditingProfileName] = useState<string | null>(null);
  const [editingProfileContent, setEditingProfileContent] = useState<string | null>(null);
  const [editingProfileJson, setEditingProfileJson] = useState<string>('');
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [editingJson, setEditingJson] = useState('');
  const [syncLoading, setSyncLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setSyncLoading(true);
    await loadProfiles();
    await loadCurrentSettings();
    await loadActiveProfile();
    setSyncLoading(false);
  };

  const loadProfiles = async () => {
    const loadedProfiles = await dbService.getAllProfiles();
    setProfiles(loadedProfiles);
    setupQuickCommands(loadedProfiles);
  };

  const loadActiveProfile = async () => {
    const activeId = await dbService.getActiveProfileId();
    setActiveProfileId(activeId);
    
    // 检查激活的配置是否仍然存在
    if (activeId) {
      const exists = await dbService.profileExists(activeId);
      if (!exists) {
        // 如果配置已被删除，清除激活状态
        await dbService.setActiveProfile(null);
        setActiveProfileId(null);
        window.utools?.showNotification('当前激活的配置已被删除');
      }
    }
  };

  const loadCurrentSettings = async () => {
    if (window.preload) {
      const settingsContent = await window.preload.readSettings();
      if (settingsContent) {
        try {
          const settings = JSON.parse(settingsContent);
          setCurrentSettings(settings);
          setCurrentSettingsStr(settingsContent);
          setEditingJson(JSON.stringify(settings, null, 2));
        } catch (error) {
          console.error('Failed to parse settings:', error);
          window.utools?.showNotification('配置文件格式错误');
        }
      }
    }
  };

  const setupQuickCommands = (profileList: SettingsProfile[]) => {
    // 移除所有旧的快捷指令
    profileList.forEach((profile) => {
      window.utools?.removeFeature(`quick-switch-${profile.id}`);
    });

    // 添加新的快捷指令
    profileList.forEach((profile) => {
      window.utools?.setFeature({
        code: `quick-switch-${profile.id}`,
        explain: `快速切换到 "${profile.name}" 配置`,
        cmds: [
          `cc-${profile.name}`,
          `切换${profile.name}`,
          `switch-${profile.name}`
        ]
      });
    });
  };

  const saveProfile = async () => {
    if (!currentSettings) return;

    const randomName = generateRandomName();
    const newProfile: SettingsProfile = {
      id: Date.now().toString(),
      name: randomName,
      settings: currentSettings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const success = await dbService.saveProfile(newProfile);
    if (success) {
      await loadProfiles();
      window.utools?.showNotification(`配置已保存为 "${randomName}"`);
    } else {
      window.utools?.showNotification('保存配置失败');
    }
  };

  const switchProfile = async (profile: SettingsProfile) => {
    setLoading(true);
    try {
      // 先备份当前配置
      await window.preload?.backupSettings(new Date().toISOString());
      
      // 写入新配置
      const success = await window.preload?.writeSettings(JSON.stringify(profile.settings, null, 2));
      
      if (success) {
        // 设置为当前设备的激活配置
        await dbService.setActiveProfile(profile.id);
        setActiveProfileId(profile.id);
        
        setCurrentSettings(profile.settings);
        setCurrentSettingsStr(JSON.stringify(profile.settings, null, 2));
        setEditingJson(JSON.stringify(profile.settings, null, 2));
        window.utools?.showNotification(`已切换到配置 "${profile.name}"`);
      } else {
        window.utools?.showNotification('切换配置失败');
      }
    } catch (error) {
      console.error('Failed to switch profile:', error);
      window.utools?.showNotification('切换配置时出错');
    }
    setLoading(false);
  };

  const deleteProfile = async (profileId: string) => {
    const profileToDelete = profiles.find(p => p.id === profileId);
    if (profileToDelete) {
      // 移除对应的快捷指令
      window.utools?.removeFeature(`quick-switch-${profileId}`);
      
      const success = await dbService.deleteProfile(profileId);
      if (success) {
        await loadProfiles();
        // 如果删除的是当前激活的配置，重新加载激活状态
        if (activeProfileId === profileId) {
          await loadActiveProfile();
        }
        window.utools?.showNotification('配置已删除');
      } else {
        window.utools?.showNotification('删除配置失败');
      }
    }
  };

  const updateProfileName = async (profileId: string, newName: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      const updatedProfile = { ...profile, name: newName };
      const success = await dbService.saveProfile(updatedProfile);
      if (success) {
        await loadProfiles();
        setEditingProfileName(null);
      }
    }
  };

  const handleSaveEditedJson = async () => {
    try {
      const parsedSettings = JSON.parse(editingJson);
      const success = await window.preload?.writeSettings(editingJson);
      
      if (success) {
        setCurrentSettings(parsedSettings);
        setCurrentSettingsStr(editingJson);
        
        // 如果当前有激活的配置，同步更新它
        if (activeProfileId) {
          const activeProfile = profiles.find(p => p.id === activeProfileId);
          if (activeProfile) {
            const updatedProfile = {
              ...activeProfile,
              settings: parsedSettings,
              updatedAt: new Date().toISOString()
            };
            await dbService.saveProfile(updatedProfile);
            await loadProfiles();
            window.utools?.showNotification('配置已更新并同步到已保存的配置');
          }
        } else {
          window.utools?.showNotification('配置已更新');
        }
        
        setShowJsonEditor(false);
      } else {
        window.utools?.showNotification('保存配置失败');
      }
    } catch (error) {
      window.utools?.showNotification('JSON 格式错误');
    }
  };

  const handleSaveEditedProfileJson = async (profileId: string) => {
    try {
      const parsedSettings = JSON.parse(editingProfileJson);
      const profile = profiles.find(p => p.id === profileId);
      if (!profile) return;

      const updatedProfile = {
        ...profile,
        settings: parsedSettings,
        updatedAt: new Date().toISOString()
      };

      const success = await dbService.saveProfile(updatedProfile);
      if (success) {
        await loadProfiles();
        
        // 如果编辑的是当前激活的配置，同步更新当前配置文件
        if (profileId === activeProfileId) {
          const writeSuccess = await window.preload?.writeSettings(JSON.stringify(parsedSettings, null, 2));
          if (writeSuccess) {
            setCurrentSettings(parsedSettings);
            setCurrentSettingsStr(JSON.stringify(parsedSettings, null, 2));
            setEditingJson(JSON.stringify(parsedSettings, null, 2));
            window.utools?.showNotification('配置已更新并同步到当前配置文件');
          }
        } else {
          window.utools?.showNotification('配置已更新');
        }
        
        setEditingProfileContent(null);
      } else {
        window.utools?.showNotification('保存配置失败');
      }
    } catch (error) {
      window.utools?.showNotification('JSON 格式错误');
    }
  };

  // 监听快捷指令触发
  useEffect(() => {
    window.utools?.onPluginEnter((action) => {
      if (action.code.startsWith('quick-switch-')) {
        const profileId = action.code.replace('quick-switch-', '');
        const profile = profiles.find(p => p.id === profileId);
        if (profile) {
          switchProfile(profile);
        }
      }
    });
  }, [profiles]);

  // 定期检查配置是否被其他设备删除
  useEffect(() => {
    const checkInterval = setInterval(async () => {
      if (activeProfileId) {
        const exists = await dbService.profileExists(activeProfileId);
        if (!exists) {
          await loadActiveProfile();
          await loadProfiles();
        }
      }
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [activeProfileId]);

  if (syncLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在同步数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Claude Code 配置切换器
                </CardTitle>
                <CardDescription>
                  管理和切换不同的 Claude Code 配置文件 (支持 Windows/macOS/Linux)
                </CardDescription>
              </div>
              <SyncStatus />
            </div>
          </CardHeader>
        </Card>

        {/* Current Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                当前配置
                {activeProfileId && (
                  <span className="text-sm font-normal text-gray-600">
                    (已绑定到: {profiles.find(p => p.id === activeProfileId)?.name})
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveProfile}
                  disabled={!currentSettings}
                >
                  <Save className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJsonEditor(!showJsonEditor)}
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  {showJsonEditor ? '关闭编辑器' : '编辑配置'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentSettings ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  配置路径: {window.preload?.getSettingsPath()}
                </p>
                <p className="text-sm text-gray-600">
                  设备ID: {window.utools?.getNativeId()?.slice(0, 8)}...
                </p>
                {currentSettings.model && (
                  <p className="text-sm">模型: {currentSettings.model}</p>
                )}
                {currentSettings.forceLoginMethod && (
                  <p className="text-sm">登录方式: {currentSettings.forceLoginMethod}</p>
                )}
                {!showJsonEditor && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                      查看完整配置
                    </summary>
                    <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-60 text-xs">
                      {JSON.stringify(currentSettings, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ) : (
              <p className="text-gray-500">未找到配置文件</p>
            )}
          </CardContent>
        </Card>

        {/* JSON Editor for Current Settings */}
        {showJsonEditor && currentSettings && (
          <SimpleJsonEditor
            value={editingJson}
            onChange={setEditingJson}
            onSave={handleSaveEditedJson}
          />
        )}

        {/* JSON Editor for Saved Profile */}
        {editingProfileContent && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  编辑配置: {profiles.find(p => p.id === editingProfileContent)?.name}
                </CardTitle>
              </CardHeader>
            </Card>
            <SimpleJsonEditor
              value={editingProfileJson}
              onChange={setEditingProfileJson}
              onSave={() => handleSaveEditedProfileJson(editingProfileContent)}
              onCancel={() => setEditingProfileContent(null)}
            />
          </>
        )}

        {/* Saved Profiles */}
        {!showJsonEditor && !editingProfileContent && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">已保存的配置</CardTitle>
              <CardDescription>
                可使用快捷指令快速切换，如: cc-配置名
              </CardDescription>
            </CardHeader>
            <CardContent>
              {profiles.length > 0 ? (
                <div className="space-y-3">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`p-4 border rounded-lg ${
                        profile.id === activeProfileId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {editingProfileName === profile.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                defaultValue={profile.name}
                                className="px-2 py-1 border rounded"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    updateProfileName(profile.id, (e.target as HTMLInputElement).value);
                                  }
                                }}
                                onBlur={(e) => {
                                  updateProfileName(profile.id, e.target.value);
                                }}
                                autoFocus
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingProfileName(null)}
                              >
                                取消
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-medium flex items-center gap-2">
                                <span 
                                  className="cursor-pointer hover:text-blue-600"
                                  onClick={() => setEditingProfileName(profile.id)}
                                >
                                  {profile.name}
                                </span>
                                {profile.id === activeProfileId && (
                                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                                    当前使用
                                  </span>
                                )}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                快捷指令: <code className="bg-gray-100 px-1 rounded">cc-{profile.name}</code>
                              </p>
                              <p className="text-xs text-gray-500">
                                更新于 {new Date(profile.updatedAt).toLocaleString()}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => switchProfile(profile)}
                            disabled={loading || profile.id === activeProfileId}
                          >
                            {profile.id === activeProfileId ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                已激活
                              </>
                            ) : (
                              '切换'
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingProfileContent(profile.id);
                              setEditingProfileJson(JSON.stringify(profile.settings, null, 2));
                            }}
                            title="编辑配置内容"
                          >
                            <FileCode className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteProfile(profile.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  暂无保存的配置，请先保存当前配置
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Configuration Reference */}
        {!showJsonEditor && !editingProfileContent && <ConfigReference />}
      </div>
    </div>
  );
}

export default App;