// src/components/Editor/CodeEditor.tsx
import { useRef, useEffect, useState } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor = ({ code, language, onChange, readOnly = false }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [editorOptions, setEditorOptions] = useState({
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    readOnly,
    automaticLayout: true,
  });

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange: OnChange = (value) => {
    if (value) {
      onChange(value);
    }
  };

  return (
    <div className="h-full w-full border border-gray-300 rounded">
      <Editor
        height="90vh"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={editorOptions}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;