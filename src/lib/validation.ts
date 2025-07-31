// 获取友好的 JSON 错误信息
export function getJsonErrorMessage(error: any): string {
  if (error instanceof SyntaxError) {
    const match = error.message.match(/position (\d+)/);
    if (match) {
      return `JSON 格式错误（位置 ${match[1]} 附近）`;
    }
    return 'JSON 格式错误：' + error.message;
  }
  return 'JSON 解析失败';
}

// 验证配置的基本结构
export function validateSettings(settings: any): { valid: boolean; error?: string } {
  if (typeof settings !== 'object' || settings === null) {
    return { valid: false, error: '配置必须是一个对象' };
  }

  // 检查一些关键字段的类型
  if (settings.permissions && typeof settings.permissions !== 'object') {
    return { valid: false, error: 'permissions 必须是对象类型' };
  }

  if (settings.env && typeof settings.env !== 'object') {
    return { valid: false, error: 'env 必须是对象类型' };
  }

  if (settings.cleanupPeriodDays && typeof settings.cleanupPeriodDays !== 'number') {
    return { valid: false, error: 'cleanupPeriodDays 必须是数字类型' };
  }

  if (settings.includeCoAuthoredBy !== undefined && typeof settings.includeCoAuthoredBy !== 'boolean') {
    return { valid: false, error: 'includeCoAuthoredBy 必须是布尔类型' };
  }

  return { valid: true };
}