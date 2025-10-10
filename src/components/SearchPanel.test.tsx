import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchPanel from './SearchPanel'

describe('SearchPanel', () => {
  const mockOnSearchChange = vi.fn()
  const mockOnTagsChange = vi.fn()

  it('検索入力欄が正しく表示される', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
        selectedTags={[]}
        onTagsChange={mockOnTagsChange}
      />
    )
    expect(screen.getByPlaceholderText('店名や住所で検索...')).toBeInTheDocument()
  })

  it('検索テキストが入力できる', async () => {
    const user = userEvent.setup()
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
        selectedTags={[]}
        onTagsChange={mockOnTagsChange}
      />
    )
    
    const input = screen.getByPlaceholderText('店名や住所で検索...')
    await user.type(input, '秋葉原')
    
    expect(mockOnSearchChange).toHaveBeenCalled()
  })

  it('カテゴリータグがクリックできる', async () => {
    const user = userEvent.setup()
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
        selectedTags={[]}
        onTagsChange={mockOnTagsChange}
      />
    )
    
    const tagButton = screen.getByText('音ゲー')
    await user.click(tagButton)
    
    expect(mockOnTagsChange).toHaveBeenCalled()
  })

  it('選択されたタグがアクティブスタイルになる', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
        selectedTags={['音ゲー']}
        onTagsChange={mockOnTagsChange}
      />
    )
    
    const tagButton = screen.getByText('音ゲー').closest('button')
    expect(tagButton).toHaveClass('active')
  })

  it('フィルターがある場合、クリアボタンが表示される', () => {
    render(
      <SearchPanel
        searchText="test"
        onSearchChange={mockOnSearchChange}
        selectedTags={[]}
        onTagsChange={mockOnTagsChange}
      />
    )
    
    expect(screen.getByText('✕ フィルターをクリア')).toBeInTheDocument()
  })

  it('フィルターがない場合、クリアボタンが非表示', () => {
    render(
      <SearchPanel
        searchText=""
        onSearchChange={mockOnSearchChange}
        selectedTags={[]}
        onTagsChange={mockOnTagsChange}
      />
    )
    
    expect(screen.queryByText('✕ フィルターをクリア')).not.toBeInTheDocument()
  })
})

