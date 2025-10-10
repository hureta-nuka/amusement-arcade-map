import { describe, it, expect } from 'vitest'
import arcadesData from './arcades.json'
import type { Arcade } from '../types/arcade'

describe('Arcades Data', () => {
  const arcades = arcadesData as Arcade[]

  it('ゲームセンターデータが存在する', () => {
    expect(arcades).toBeDefined()
    expect(arcades.length).toBeGreaterThan(0)
  })

  it('各ゲームセンターが必須フィールドを持つ', () => {
    arcades.forEach((arcade) => {
      expect(arcade.id).toBeDefined()
      expect(arcade.name).toBeDefined()
      expect(arcade.address).toBeDefined()
      expect(arcade.latitude).toBeDefined()
      expect(arcade.longitude).toBeDefined()
      expect(arcade.tags).toBeDefined()
    })
  })

  it('緯度経度が有効な範囲内', () => {
    arcades.forEach((arcade) => {
      // 日本の緯度: 約24-46度
      expect(arcade.latitude).toBeGreaterThanOrEqual(24)
      expect(arcade.latitude).toBeLessThanOrEqual(46)
      // 日本の経度: 約122-154度
      expect(arcade.longitude).toBeGreaterThanOrEqual(122)
      expect(arcade.longitude).toBeLessThanOrEqual(154)
    })
  })

  it('各ゲームセンターが少なくとも1つのタグを持つ', () => {
    arcades.forEach((arcade) => {
      expect(arcade.tags.length).toBeGreaterThan(0)
    })
  })

  it('IDがユニーク', () => {
    const ids = arcades.map(a => a.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
  })
})

