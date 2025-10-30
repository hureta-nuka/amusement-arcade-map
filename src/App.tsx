import { useState, useMemo, useEffect } from 'react'
import Map from './components/Map'
import SearchPanel from './components/SearchPanel'
import arcadesData from './data/arcades.json'
import { ArcadesData } from './types/arcade'
import './App.scss'

function App() {
  const [searchText, setSearchText] = useState('')
  // 位置情報のstate追加
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  // 初回のみ現在地にズームするための初期ビュー
  const [initialView, setInitialView] = useState<{
    center: [number, number]
    zoom: number
  } | null>(null)

  // ←ここでarcades群を宣言
  const data = arcadesData as ArcadesData
  const arcades = data.shops

  useEffect(() => {
    let watchId: number | undefined
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          setCurrentPosition(null)
          setLocationError('位置情報の取得に失敗しました（未許可、またはエラー）')
        }
      )
    } else {
      setLocationError('お使いのブラウザは位置情報取得に対応していません')
    }
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [])

  // ページ初回表示時のみ現在地へズーム
  useEffect(() => {
    if (!initialView && currentPosition) {
      setInitialView({
        center: [currentPosition.lat, currentPosition.lng],
        zoom: 13,
      })
    }
  }, [currentPosition, initialView])

  // 現在地更新時はマップを動かさない

  // center/zoom は現在地更新時に地図を動かさないため計算しない

  // 現在地に戻るボタン押下用ハンドラ 削除

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
      {locationError && (
        <div className="location-error-banner">{locationError}</div>
      )}
      <header className="app-header">
        <h1>ポラリスコード店舗マップ</h1>
      </header>
      <div className="app-content">
        <SearchPanel
          searchText={searchText}
          onSearchChange={setSearchText}
        />
        <Map arcades={filteredArcades}
             center={initialView ? initialView.center : undefined}
             zoom={initialView ? initialView.zoom : undefined}
             currentPosition={currentPosition}
        />
      </div>
    </div>
  )
}

export default App

