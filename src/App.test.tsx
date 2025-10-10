import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('アプリのタイトルが表示される', () => {
    render(<App />)
    expect(screen.getByText('🎮 日本ゲームセンターマップ')).toBeInTheDocument()
  })

  it('検索パネルが表示される', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('店名や住所で検索...')).toBeInTheDocument()
  })

  it('カテゴリーフィルターが表示される', () => {
    render(<App />)
    expect(screen.getByText('🏷️ カテゴリー')).toBeInTheDocument()
  })

  it('すべてのカテゴリータグが表示される', () => {
    render(<App />)
    expect(screen.getByText('音ゲー')).toBeInTheDocument()
    expect(screen.getByText('格ゲー')).toBeInTheDocument()
    expect(screen.getByText('クレーンゲーム')).toBeInTheDocument()
    expect(screen.getByText('レトロゲーム')).toBeInTheDocument()
    expect(screen.getByText('メダルゲーム')).toBeInTheDocument()
    expect(screen.getByText('プライズ')).toBeInTheDocument()
  })
})

