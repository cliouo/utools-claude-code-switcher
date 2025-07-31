import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ExternalLink } from 'lucide-react';

const configItems = [
  {
    key: 'model',
    description: '指定使用的 Claude 模型，如 claude-3-5-sonnet-20241022'
  },
  {
    key: 'apiKeyHelper',
    description: '自定义脚本生成 API 密钥，输出将作为认证头发送'
  },
  {
    key: 'forceLoginMethod',
    description: '限制登录方式：claudeai (Claude.ai账户) 或 console (API账户)'
  },
  {
    key: 'includeCoAuthoredBy',
    description: '是否在 git 提交中包含 "co-authored-by Claude" 署名'
  },
  {
    key: 'cleanupPeriodDays',
    description: '本地聊天记录保留天数，默认 30 天'
  },
  {
    key: 'permissions.allow',
    description: '允许的工具权限规则数组，如 ["Bash(npm run test)"]'
  },
  {
    key: 'permissions.deny',
    description: '拒绝的工具权限规则数组，如 ["WebFetch", "Bash(curl:*)"]'
  },
  {
    key: 'env',
    description: '每个会话应用的环境变量，如 {"FOO": "bar"}'
  }
];

export function ConfigReference() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">配置项参考</CardTitle>
        <CardDescription>
          Claude Code 核心配置项说明
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-medium">配置项</th>
                <th className="text-left py-2 px-3 font-medium">说明</th>
              </tr>
            </thead>
            <tbody>
              {configItems.map((item) => (
                <tr key={item.key} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 font-mono text-xs">{item.key}</td>
                  <td className="py-2 px-3 text-gray-600">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => window.utools?.shellOpenExternal('https://docs.anthropic.com/en/docs/claude-code/settings')}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            查看完整配置文档
            <ExternalLink className="w-3 h-3 ml-1" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}