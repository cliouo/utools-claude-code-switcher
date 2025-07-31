import React from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, Check } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  height?: string;
}

export function JsonEditor({ value, onChange, onSave, height = "400px" }: JsonEditorProps) {
  const [isValid, setIsValid] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue === undefined) return;
    
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
        <div className="border rounded-md overflow-hidden">
          <Editor
            height={height}
            defaultLanguage="json"
            value={value}
            onChange={handleEditorChange}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              formatOnPaste: true,
              formatOnType: true,
            }}
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