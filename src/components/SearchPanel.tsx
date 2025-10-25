import './SearchPanel.scss'

interface SearchPanelProps {
  searchText: string
  onSearchChange: (text: string) => void
}

function SearchPanel({ searchText, onSearchChange }: SearchPanelProps) {
  const clearSearch = () => {
    onSearchChange('')
  }

  return (
    <div className="search-panel">
      <div className="search-section">
        <h2>🔍 ポラリスコード店舗検索</h2>
        <input
          type="text"
          placeholder="店名や住所で検索..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {searchText && (
        <button className="clear-button" onClick={clearSearch}>
          ✕ 検索をクリア
        </button>
      )}

      <div className="info-section">
        <p className="info-text">
          ポラリスコードが設置されているゲームセンター店舗を掲載しています。
          マーカーをクリックすると詳細情報が表示されます。
        </p>
      </div>
    </div>
  )
}

export default SearchPanel

