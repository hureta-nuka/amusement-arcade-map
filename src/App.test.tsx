import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('アプリのタイトルが表示される', () => {
    render(<App />)
    expect(screen.getByText('🎮 ポラリスコード店舗マップ')).toBeInTheDocument()
  })

  it('検索パネルが表示される', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('店名や住所で検索...')).toBeInTheDocument()
  })

  it('ポラリスコード店舗検索のタイトルが表示される', () => {
    render(<App />)
    expect(screen.getByText('🔍 ポラリスコード店舗検索')).toBeInTheDocument()
  })

  it('店舗情報が表示される', () => {
    render(<App />)
    expect(screen.getByText(/ポラリスコードが設置されているゲームセンター店舗を掲載しています/)).toBeInTheDocument()
  })
})

