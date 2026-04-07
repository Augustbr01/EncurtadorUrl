import { useState } from 'react'
import type { UrlEntry } from '../types/url'

interface Props {
  urls: UrlEntry[]
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export default function UrlList({ urls, loading, error, onRefresh }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleCopy(id: string, text: string) {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function formatDate(dateStr: string) {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">URLs Encurtadas</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-xl transition-colors"
        >
          <svg
            className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && urls.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <p className="text-sm">Nenhuma URL encurtada ainda</p>
        </div>
      )}

      {urls.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-gray-500 font-medium">URL Original</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">URL Encurtada</th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium whitespace-nowrap">Data</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {urls.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 max-w-xs">
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 hover:underline truncate block"
                      title={entry.url}
                    >
                      {entry.url}
                    </a>
                  </td>
                  <td className="py-3 px-2">
                    <a
                      href={entry.urlEncurtada}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-mono"
                    >
                      {entry.urlEncurtada}
                    </a>
                  </td>
                  <td className="py-3 px-2 text-gray-500 whitespace-nowrap">
                    {formatDate(entry.date)}
                  </td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleCopy(entry.id, entry.urlEncurtada)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 rounded-lg transition-colors"
                    >
                      {copiedId === entry.id ? 'Copiado!' : 'Copiar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
