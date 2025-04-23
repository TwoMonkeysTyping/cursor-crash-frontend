'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import { Button } from '@/components/ui/button'

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState('javascript')
  const [isLoading, setIsLoading] = useState(false)
  const [untitledCount, setUntitledCount] = useState(0) // count how many have been created

  const router = useRouter()

  const createDocument = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${apiUrl}/api/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      })

      const data = await res.json()
      if (res.ok) {
        // increment untitled count and redirect
        setUntitledCount((prev) => prev + 1)
        router.push(`/editor/${data.document.id}?name=Untitled-${untitledCount + 1}&lang=${language}`)
      } else {
        alert(data.message || 'Failed to create document')
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Documents</h1>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>+ New Document</Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold">New Document</Dialog.Title>
            <div className="mt-4">
              <label className="block mb-2 text-sm">Select Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={createDocument} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
