// src/app/editor/[documentId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchDocument, saveDocument } from '@/lib/api';
import CodeEditor from '@/components/Editor/CodeEditor';

export default function EditorPage() {
  const params = useParams();
  const documentId = params.documentId as string;
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [documentName, setDocumentName] = useState('Untitled');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const loadDocument = async () => {
      if (documentId === 'new') {
        setCode('// Start coding here');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const document = await fetchDocument(documentId);
        setCode(document.content);
        setLanguage(document.language);
        setDocumentName(document.name);
        setLastSaved(new Date(document.updatedAt));
      } catch (error) {
        console.error('Failed to load document', error);
        setCode('// Error loading document');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [documentId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveDocument(documentId, {
        content: code,
        language,
        name: documentName,
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save document', error);
      alert('Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={documentName}
            onChange={handleNameChange}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="go">Go</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <span className="text-sm text-gray-400">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <CodeEditor code={code} language={language} onChange={handleCodeChange} />
      </div>
    </div>
  );
}