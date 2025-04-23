'use client'

import { useSearchParams, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import CodeEditor from '@/components/Editor/CodeEditor'

export default function DocumentEditorPage() {
  const { documentId } = useParams()
  const searchParams = useSearchParams()

  const name = searchParams.get('name') || 'Untitled'
  const langFromQuery = searchParams.get('lang') || 'javascript'

  const [code, setCode] = useState('')
  const [language, setLanguage] = useState(langFromQuery)

  // Optional: fetch language from backend if you want
  // But not needed unless you want to ensure full sync

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <CodeEditor
        code={code}
        language={language}
        onChange={(val) => setCode(val)}
      />
    </div>
  )
}
