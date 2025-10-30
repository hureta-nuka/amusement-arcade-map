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
  const [nearestArcade, setNearestArcade] = useState<any>(null)
  const [fitParams, setFitParams] = useState<{
    center: [number, number];
    zoom: number;
  } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

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

  // 現在地が更新されたら、最寄りの店舗を探索
  useEffect(() => {
    if (currentPosition) {
      let minDist = Infinity
      let closest = null
      for (const arcade of arcades) {
        const dist = Math.sqrt(
          Math.pow(parseFloat(arcade.latitude) - currentPosition.lat, 2) +
          Math.pow(parseFloat(arcade.longitude) - currentPosition.lng, 2)
        )
        if (dist < minDist) {
          minDist = dist
          closest = arcade
        }
      }
      setNearestArcade(closest)
      // デバッグ表示
      console.log('現在地', currentPosition, '最寄り', closest)
    } else {
      setNearestArcade(null)
    }
  }, [currentPosition, arcades])

  // 現在地と最寄り店舗が両方とも表示範囲に収まるズーム・中心地を計算してMapへcenter・zoomを渡す。必要によりboundsからcenter/zoomを算出（lat,lng2点が両方propsで与えられればよい）。zoom算出にreact-leafletのmapRef活用や固定ズームも許容。
  useEffect(() => {
    if (currentPosition && nearestArcade) {
      // 両者が近ければzoom大きめ・遠ければzoom小さめとする
      const latlngs = [
        [currentPosition.lat, currentPosition.lng],
        [parseFloat(nearestArcade.latitude), parseFloat(nearestArcade.longitude)]
      ]
      // 中心を2点の中間に
      const center: [number, number] = [
        (latlngs[0][0] + latlngs[1][0]) / 2,
        (latlngs[0][1] + latlngs[1][1]) / 2
      ]
      // 距離からzoomを概算 決め打ちでも可（距離に応じる場合）
      const latDiff = Math.abs(latlngs[0][0] - latlngs[1][0])
      const lngDiff = Math.abs(latlngs[0][1] - latlngs[1][1])
      const maxDiff = Math.max(latDiff, lngDiff)
      let zoom = 13
      if (maxDiff > 5) zoom = 8
      else if (maxDiff > 1) zoom = 10
      else if (maxDiff > 0.2) zoom = 12
      setFitParams({ center, zoom })
    } else {
      setFitParams(null)
    }
  }, [currentPosition, nearestArcade])

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
             center={fitParams ? fitParams.center : undefined}
             zoom={fitParams ? fitParams.zoom : undefined}
             currentPosition={currentPosition}
        />
      </div>
    </div>
  )
}

export default App

