import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { Arcade } from '../types/arcade'
import './Map.scss'

// ポラリスコードのゲームセンターアイコンを作成
const createGameIcon = () => {
  return L.divIcon({
    html: `
      <div class="custom-marker">
        <div class="marker-icon">🎮</div>
      </div>
    `,
    className: 'custom-marker-container',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

const gameIcon = createGameIcon()

// クラスタリングコンポーネント
function MarkerCluster({ arcades }: { arcades: Arcade[] }) {
  const map = useMap()

  useEffect(() => {
    // 既存のマーカーをクリア
    map.eachLayer((layer) => {
      if (layer instanceof L.MarkerClusterGroup) {
        map.removeLayer(layer)
      }
    })

    // クラスターグループを作成
    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50, // クラスター化する半径（ピクセル）
      spiderfyOnMaxZoom: true, // 最大ズーム時にスパイダー表示
      showCoverageOnHover: false, // ホバー時のカバレッジ表示を無効
      zoomToBoundsOnClick: true, // クリック時にズーム
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount()
        let size = 'small'
        if (count > 100) size = 'large'
        else if (count > 20) size = 'medium'

        return L.divIcon({
          html: `<div class="marker-cluster marker-cluster-${size}">${count}</div>`,
          className: 'marker-cluster-container',
          iconSize: L.point(40, 40)
        })
      }
    })

    // マーカーを追加
    arcades.forEach((arcade) => {
      const marker = L.marker([parseFloat(arcade.latitude), parseFloat(arcade.longitude)], {
        icon: gameIcon
      })

      // ポップアップを追加
      const popupContent = `
        <div class="popup-content">
          <h3>${arcade.name}</h3>
          <p class="address">📍 ${arcade.address}</p>
          ${arcade.tel ? `<p class="tel">📞 ${arcade.tel}</p>` : ''}
          ${arcade.operation_time ? `<p class="hours">⏰ ${arcade.operation_time}</p>` : ''}
          ${arcade.holiday ? `<p class="holiday">📅 定休日: ${arcade.holiday}</p>` : ''}
          ${arcade.access ? `<p class="access">🚶 ${arcade.access}</p>` : ''}
        </div>
      `
      marker.bindPopup(popupContent)
      clusterGroup.addLayer(marker)
    })

    // クラスターグループをマップに追加
    map.addLayer(clusterGroup)

    // クリーンアップ
    return () => {
      map.removeLayer(clusterGroup)
    }
  }, [map, arcades])

  return null
}

interface MapProps {
  arcades: Arcade[]
}

function Map({ arcades }: MapProps) {
  // 日本の中心（東京周辺）
  const center: [number, number] = [36.5, 138.0]
  const zoom = 6

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={zoom} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCluster arcades={arcades} />
      </MapContainer>
    </div>
  )
}

export default Map

