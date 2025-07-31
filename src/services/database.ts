import type { SettingsProfile, ProfileDoc, DeviceSettingsDoc } from '../types/settings';

class DatabaseService {
  private deviceId: string;
  private deviceSettingsId = 'claude-code-device-settings';

  constructor() {
    // 获取设备唯一标识
    this.deviceId = window.utools?.getNativeId() || 'unknown-device';
  }

  // 等待云同步完成
  async waitForSync(maxWaitTime: number = 5000): Promise<void> {
    const startTime = Date.now();
    let state = await window.utools?.db.promises.replicateStateFromCloud();
    
    while (state === 1 && (Date.now() - startTime) < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 100));
      state = await window.utools?.db.promises.replicateStateFromCloud();
    }
    
    // 如果超时仍在同步，发出警告
    if (state === 1) {
      console.warn('Cloud sync timeout, proceeding with local data');
    }
  }

  // 获取所有配置
  async getAllProfiles(): Promise<SettingsProfile[]> {
    await this.waitForSync();
    const docs = await window.utools?.db.promises.allDocs('claude-code-profile/');
    return docs
      .filter((doc: any) => doc.type === 'profile')
      .map((doc: any) => (doc as ProfileDoc).profile)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  // 获取单个配置
  async getProfile(profileId: string): Promise<SettingsProfile | null> {
    const doc = await window.utools?.db.promises.get(`claude-code-profile/${profileId}`) as ProfileDoc;
    return doc?.profile || null;
  }

  // 保存配置
  async saveProfile(profile: SettingsProfile): Promise<boolean> {
    const docId = `claude-code-profile/${profile.id}`;
    const existingDoc = await window.utools?.db.promises.get(docId) as ProfileDoc;
    
    const doc: ProfileDoc = {
      _id: docId,
      _rev: existingDoc?._rev,
      type: 'profile',
      profile: {
        ...profile,
        updatedAt: new Date().toISOString()
      }
    };

    const result = await window.utools?.db.promises.put(doc);
    return result?.ok || false;
  }

  // 删除配置
  async deleteProfile(profileId: string): Promise<boolean> {
    const docId = `claude-code-profile/${profileId}`;
    const result = await window.utools?.db.promises.remove(docId);
    
    // 如果删除的是当前激活的配置，清除激活状态
    const deviceSettings = await this.getDeviceSettings();
    if (deviceSettings?.activeProfileId === profileId) {
      await this.setActiveProfile(null);
    }
    
    return result?.ok || false;
  }

  // 获取设备设置
  async getDeviceSettings(): Promise<DeviceSettingsDoc | null> {
    await this.waitForSync();
    const doc = await window.utools?.db.promises.get(this.deviceSettingsId) as DeviceSettingsDoc;
    return doc;
  }

  // 设置当前激活的配置
  async setActiveProfile(profileId: string | null): Promise<boolean> {
    const existingDoc = await window.utools?.db.promises.get(this.deviceSettingsId) as DeviceSettingsDoc;
    
    const doc: DeviceSettingsDoc = {
      _id: this.deviceSettingsId,
      _rev: existingDoc?._rev,
      type: 'device-settings',
      deviceId: this.deviceId,
      activeProfileId: profileId || undefined,
      lastSync: new Date().toISOString()
    };

    const result = await window.utools?.db.promises.put(doc);
    return result?.ok || false;
  }

  // 获取当前设备激活的配置ID
  async getActiveProfileId(): Promise<string | null> {
    const settings = await this.getDeviceSettings();
    
    // 确保是当前设备的设置
    if (settings?.deviceId === this.deviceId) {
      return settings.activeProfileId || null;
    }
    
    return null;
  }

  // 检查配置是否存在
  async profileExists(profileId: string): Promise<boolean> {
    const profile = await this.getProfile(profileId);
    return profile !== null;
  }

  // 批量更新配置
  async updateProfiles(profiles: SettingsProfile[]): Promise<boolean> {
    const docs: ProfileDoc[] = [];
    
    for (const profile of profiles) {
      const docId = `claude-code-profile/${profile.id}`;
      const existingDoc = await window.utools?.db.promises.get(docId) as ProfileDoc;
      
      docs.push({
        _id: docId,
        _rev: existingDoc?._rev,
        type: 'profile',
        profile: {
          ...profile,
          updatedAt: new Date().toISOString()
        }
      });
    }

    const results = await window.utools?.db.promises.bulkDocs(docs);
    return results.every(r => r.ok);
  }
}

export const dbService = new DatabaseService();