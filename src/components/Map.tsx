import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Arcade, ArcadeTag } from '../types/arcade'
import './Map.scss'

// ゲームアーケードっぽいカスタムアイコンを作成
const createGameIcon = () => {
  return L.divIcon({
    html: `
      <div class="custom-marker">
        <div class="marker-icon">🕹️</div>
      </div>
    `,
    className: 'custom-marker-container',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

const gameIcon = createGameIcon()

const tagIcons: Record<ArcadeTag, string> = {
  '音ゲー': '🎵',
  '格ゲー': '🥊',
  'クレーンゲーム': '🦾',
  'レトロゲーム': '👾',
  'メダルゲーム': '🪙',
  'プライズ': '🧸'
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
        {arcades.map((arcade) => (
          <Marker
            key={arcade.id}
            position={[arcade.latitude, arcade.longitude]}
            icon={gameIcon}
          >
            <Popup>
              <div className="popup-content">
                <h3>{arcade.name}</h3>
                <p className="address">{arcade.address}</p>
                {arcade.description && (
                  <p className="description">{arcade.description}</p>
                )}
                {arcade.openingHours && (
                  <p className="hours">⏰ {arcade.openingHours}</p>
                )}
                <div className="tags">
                  {arcade.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      <span className="tag-icon">{tagIcons[tag as ArcadeTag]}</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map

