import { describe, it, expect } from 'vitest'
import arcadesData from './arcades.json'
import type { ArcadesData } from '../types/arcade'

describe('Arcades Data', () => {
  const data = arcadesData as ArcadesData
  const arcades = data.shops

  it('ゲームセンターデータが存在する', () => {
    expect(data).toBeDefined()
    expect(data.shops).toBeDefined()
    expect(arcades.length).toBeGreaterThan(0)
  })

  it('各ゲームセンターが必須フィールドを持つ', () => {
    arcades.forEach((arcade) => {
      expect(arcade.name).toBeDefined()
      expect(arcade.address).toBeDefined()
      expect(arcade.latitude).toBeDefined()
      expect(arcade.longitude).toBeDefined()
      expect(arcade.tel).toBeDefined()
      expect(arcade.operation_time).toBeDefined()
      expect(arcade.holiday).toBeDefined()
      expect(arcade.access).toBeDefined()
    })
  })

  it('緯度経度が有効な範囲内', () => {
    arcades.forEach((arcade) => {
      const lat = parseFloat(arcade.latitude)
      const lng = parseFloat(arcade.longitude)
      
      // 日本の緯度: 約24-46度
      expect(lat).toBeGreaterThanOrEqual(24)
      expect(lat).toBeLessThanOrEqual(46)
      // 日本の経度: 約122-154度
      expect(lng).toBeGreaterThanOrEqual(122)
      expect(lng).toBeLessThanOrEqual(154)
    })
  })

  it('店舗名がユニーク', () => {
    const names = arcades.map(a => a.name)
    const uniqueNames = new Set(names)
    expect(names.length).toBe(uniqueNames.size)
  })
})

