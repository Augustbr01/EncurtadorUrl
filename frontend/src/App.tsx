import { useEffect, useState, useCallback } from 'react'
import { getAllUrls } from './api/urlApi'
import type { UrlEntry } from './types/url'
import UrlShortenerForm from './components/UrlShortenerForm'
import UrlList from './components/UrlList'

export default function App() {
  const [urls, setUrls] = useState<UrlEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUrls = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllUrls()
      setUrls(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar URLs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUrls()
  }, [fetchUrls])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Encurtador de URL</h1>
            <p className="text-xs text-gray-500">Simplifique seus links</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <UrlShortenerForm onSuccess={fetchUrls} />
        <UrlList urls={urls} loading={loading} error={error} onRefresh={fetchUrls} />
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        Encurtador de URL &mdash; PhelipeProject
      </footer>
    </div>
  )
}
