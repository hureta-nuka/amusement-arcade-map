import { useState, useMemo } from 'react'
import Map from './components/Map'
import SearchPanel from './components/SearchPanel'
import arcadesData from './data/arcades.json'
import { ArcadesData } from './types/arcade'
import './App.scss'

function App() {
  const [searchText, setSearchText] = useState('')

  const data = arcadesData as ArcadesData
  const arcades = data.shops

  const filteredArcades = useMemo(() => {
    return arcades.filter(arcade => {
      const matchesSearch = searchText === '' || 
        arcade.name.toLowerCase().includes(searchText.toLowerCase()) ||
        arcade.address.toLowerCase().includes(searchText.toLowerCase()) ||
        arcade.tel.includes(searchText)
      
      return matchesSearch
    })
  }, [arcades, searchText])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 ポラリスコード店舗マップ</h1>
      </header>
      <div className="app-content">
        <SearchPanel
          searchText={searchText}
          onSearchChange={setSearchText}
        />
        <Map arcades={filteredArcades} />
      </div>
    </div>
  )
}

export default App

