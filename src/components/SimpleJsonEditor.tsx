import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, Check, X } from 'lucide-react';

interface SimpleJsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel?: () => void;
  height?: string;
}

export function SimpleJsonEditor({ value, onChange, onSave, onCancel, height = "400px" }: SimpleJsonEditorProps) {
  const [isValid, setIsValid] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // 验证 JSON 格式
    try {
      JSON.parse(newValue);
      setIsValid(true);
      setError(null);
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const handleSave = () => {
    if (isValid) {
      onSave();
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(value);
      const formatted = JSON.stringify(parsed, null, 2);
      onChange(formatted);
    } catch (e) {
      // Ignore format errors
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>编辑配置</span>
          <div className="flex items-center gap-2">
            {!isValid && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                JSON 格式错误
              </div>
            )}
            <Button 
              onClick={formatJson} 
              variant="outline"
              size="sm"
            >
              格式化
            </Button>
            {onCancel && (
              <Button 
                onClick={onCancel} 
                variant="outline"
                size="sm"
              >
                <X className="w-4 h-4 mr-1" />
                取消
              </Button>
            )}
            <Button 
              onClick={handleSave} 
              disabled={!isValid}
              size="sm"
            >
              <Check className="w-4 h-4 mr-1" />
              保存修改
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <textarea
            value={value}
            onChange={handleChange}
            className={`w-full p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isValid ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{ height, minHeight: '200px' }}
            spellCheck={false}
          />
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-500">
            错误: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}