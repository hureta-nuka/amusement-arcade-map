import { describe, it, expect } from 'vitest'
import type { Arcade, ArcadeTag } from './arcade'

describe('Arcade Types', () => {
  it('Arcade型が正しい構造を持つ', () => {
    const arcade: Arcade = {
      id: 1,
      name: 'テストゲーセン',
      address: '東京都',
      latitude: 35.6895,
      longitude: 139.6917,
      description: 'テスト用',
      tags: ['音ゲー'],
      openingHours: '10:00-23:00'
    }

    expect(arcade.id).toBe(1)
    expect(arcade.name).toBe('テストゲーセン')
    expect(arcade.tags).toContain('音ゲー')
  })

  it('全てのArcadeTagが定義されている', () => {
    const validTags: ArcadeTag[] = [
      '音ゲー',
      '格ゲー',
      'クレーンゲーム',
      'レトロゲーム',
      'メダルゲーム',
      'プライズ'
    ]

    expect(validTags).toHaveLength(6)
  })
})

