import { describe, it, expect } from 'vitest'
import type { Arcade, ArcadesData } from './arcade'

describe('Arcade Types', () => {
  it('Arcade型が正しい構造を持つ', () => {
    const arcade: Arcade = {
      name: 'テストゲーセン',
      operation_time: '10:00～23:00',
      holiday: '無し',
      latitude: '35.6895',
      longitude: '139.6917',
      tel: '03-1234-5678',
      address: '東京都渋谷区',
      access: 'JR渋谷駅徒歩5分'
    }

    expect(arcade.name).toBe('テストゲーセン')
    expect(arcade.operation_time).toBe('10:00～23:00')
    expect(arcade.latitude).toBe('35.6895')
    expect(arcade.longitude).toBe('139.6917')
    expect(arcade.tel).toBe('03-1234-5678')
  })

  it('ArcadesData型が正しい構造を持つ', () => {
    const data: ArcadesData = {
      shops: [
        {
          name: 'テストゲーセン1',
          operation_time: '10:00～23:00',
          holiday: '無し',
          latitude: '35.6895',
          longitude: '139.6917',
          tel: '03-1234-5678',
          address: '東京都渋谷区',
          access: 'JR渋谷駅徒歩5分'
        },
        {
          name: 'テストゲーセン2',
          operation_time: '10:00～22:00',
          holiday: '月曜日',
          latitude: '35.6762',
          longitude: '139.6503',
          tel: '03-9876-5432',
          address: '東京都新宿区',
          access: 'JR新宿駅徒歩3分'
        }
      ]
    }

    expect(data.shops).toHaveLength(2)
    expect(data.shops[0].name).toBe('テストゲーセン1')
    expect(data.shops[1].name).toBe('テストゲーセン2')
  })
})

