import type { AddUrlResponse, UrlEntry } from '../types/url'

const BASE = '/api'

export async function addUrl(url: string): Promise<AddUrlResponse> {
  const res = await fetch(`${BASE}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!res.ok) throw new Error('Erro ao encurtar a URL')
  return res.json()
}

export async function getAllUrls(): Promise<UrlEntry[]> {
  const res = await fetch(`${BASE}/get/allurl`)
  if (!res.ok) throw new Error('Erro ao buscar URLs')
  return res.json()
}

export async function getUrlById(id: string): Promise<UrlEntry> {
  const res = await fetch(`${BASE}/get/url/${id}`)
  if (!res.ok) throw new Error('URL não encontrada')
  return res.json()
}
