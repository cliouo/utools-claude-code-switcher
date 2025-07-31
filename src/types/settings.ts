export interface ClaudeCodeSettings {
  permissions?: {
    allow?: string[];
    deny?: string[];
    additionalDirectories?: string[];
    defaultMode?: string;
    disableBypassPermissionsMode?: string;
  };
  env?: Record<string, string>;
  apiKeyHelper?: string;
  cleanupPeriodDays?: number;
  includeCoAuthoredBy?: boolean;
  hooks?: Record<string, any>;
  model?: string;
  forceLoginMethod?: string;
  enableAllProjectMcpServers?: boolean;
  enabledMcpjsonServers?: string[];
  disabledMcpjsonServers?: string[];
  awsAuthRefresh?: string;
  awsCredentialExport?: string;
}

export interface SettingsProfile {
  id: string;
  name: string;
  description?: string;
  settings: ClaudeCodeSettings;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

// 数据库文档格式
export interface ProfileDoc extends DbDoc {
  _id: string;
  _rev?: string;
  type: 'profile';
  profile: SettingsProfile;
}

export interface DeviceSettingsDoc extends DbDoc {
  _id: string;
  _rev?: string;
  type: 'device-settings';
  deviceId: string;
  activeProfileId?: string;
  lastSync?: string;
}