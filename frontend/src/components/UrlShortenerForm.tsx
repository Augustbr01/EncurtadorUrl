import { useState } from 'react'
import { addUrl } from '../api/urlApi'
import type { AddUrlResponse } from '../types/url'

interface Props {
  onSuccess: () => void
}

export default function UrlShortenerForm({ onSuccess }: Props) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<AddUrlResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const data = await addUrl(url)
      setResult(data)
      setUrl('')
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Encurtar URL</h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com/url-muito-longa..."
          required
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors duration-200 whitespace-nowrap"
        >
          {loading ? 'Encurtando...' : 'Encurtar'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-700 font-medium mb-2">
            {result.success ? 'URL encurtada com sucesso!' : result.message}
          </p>
          {result.success && (
            <div className="flex items-center gap-3">
              <a
                href={result.message}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-mono break-all"
              >
                {result.message}
              </a>
              <button
                onClick={() => handleCopy(result.message)}
                className="shrink-0 px-3 py-1 text-xs bg-white border border-green-300 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
