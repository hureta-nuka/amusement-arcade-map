import { ArcadeTag } from '../types/arcade'
import './SearchPanel.scss'

interface SearchPanelProps {
  searchText: string
  onSearchChange: (text: string) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

const tagIcons: Record<ArcadeTag, string> = {
  '音ゲー': '🎵',
  '格ゲー': '🥊',
  'クレーンゲーム': '🦾',
  'レトロゲーム': '👾',
  'メダルゲーム': '🪙',
  'プライズ': '🧸'
}

const availableTags: ArcadeTag[] = [
  '音ゲー',
  '格ゲー',
  'クレーンゲーム',
  'レトロゲーム',
  'メダルゲーム',
  'プライズ'
]

function SearchPanel({ searchText, onSearchChange, selectedTags, onTagsChange }: SearchPanelProps) {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    onSearchChange('')
    onTagsChange([])
  }

  return (
    <div className="search-panel">
      <div className="search-section">
        <h2>🔍 検索</h2>
        <input
          type="text"
          placeholder="店名や住所で検索..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <h2>🏷️ カテゴリー</h2>
        <div className="tags-container">
          {availableTags.map((tag) => (
            <button
              key={tag}
              className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleTagToggle(tag)}
            >
              <span className="tag-icon">{tagIcons[tag]}</span>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {(searchText || selectedTags.length > 0) && (
        <button className="clear-button" onClick={clearFilters}>
          ✕ フィルターをクリア
        </button>
      )}

      <div className="info-section">
        <p className="info-text">
          日本全国のゲームセンター情報を掲載しています。
          マーカーをクリックすると詳細情報が表示されます。
        </p>
      </div>
    </div>
  )
}

export default SearchPanel

