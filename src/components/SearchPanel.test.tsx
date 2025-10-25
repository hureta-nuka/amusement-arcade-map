import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchPanel from './SearchPanel'

describe('SearchPanel', () => {
  const mockOnSearchChange = vi.fn()

  it('検索入力欄が正しく表示される', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
      />
    )
    expect(screen.getByPlaceholderText('店名や住所で検索...')).toBeInTheDocument()
  })

  it('ポラリスコード店舗検索のタイトルが表示される', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
      />
    )
    expect(screen.getByText('🔍 ポラリスコード店舗検索')).toBeInTheDocument()
  })

  it('検索テキストが入力できる', async () => {
    const user = userEvent.setup()
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
      />
    )
    
    const input = screen.getByPlaceholderText('店名や住所で検索...')
    await user.type(input, '福岡')
    
    expect(mockOnSearchChange).toHaveBeenCalled()
  })

  it('検索テキストがある場合、クリアボタンが表示される', () => {
    render(
      <SearchPanel
        searchText="test"
        onSearchChange={mockOnSearchChange}
      />
    )
    
    expect(screen.getByText('✕ 検索をクリア')).toBeInTheDocument()
  })

  it('検索テキストがない場合、クリアボタンが非表示', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
      />
    )
    
    expect(screen.queryByText('✕ 検索をクリア')).not.toBeInTheDocument()
  })

  it('クリアボタンがクリックできる', async () => {
    const user = userEvent.setup()
    render(
      <SearchPanel
        searchText="test"
        onSearchChange={mockOnSearchChange}
      />
    )
    
    const clearButton = screen.getByText('✕ 検索をクリア')
    await user.click(clearButton)
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('')
  })

  it('店舗情報が表示される', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
      />
    )
    
    expect(screen.getByText(/ポラリスコードが設置されているゲームセンター店舗を掲載しています/)).toBeInTheDocument()
  })
})

