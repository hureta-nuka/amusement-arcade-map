import { useState, useMemo } from 'react'
import Map from './components/Map'
import SearchPanel from './components/SearchPanel'
import arcadesData from './data/arcades.json'
import { Arcade } from './types/arcade'
import './App.scss'

function App() {
  const [searchText, setSearchText] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const arcades = arcadesData as Arcade[]

  const filteredArcades = useMemo(() => {
    return arcades.filter(arcade => {
      const matchesSearch = searchText === '' || 
        arcade.name.toLowerCase().includes(searchText.toLowerCase()) ||
        arcade.address.toLowerCase().includes(searchText.toLowerCase())
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => arcade.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [arcades, searchText, selectedTags])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 日本ゲームセンターマップ</h1>
      </header>
      <div className="app-content">
        <SearchPanel
          searchText={searchText}
          onSearchChange={setSearchText}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
        <Map arcades={filteredArcades} />
      </div>
    </div>
  )
}

export default App

