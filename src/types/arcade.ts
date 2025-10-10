export interface Arcade {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  tags: string[];
  openingHours?: string;
}

export type ArcadeTag = '音ゲー' | '格ゲー' | 'クレーンゲーム' | 'レトロゲーム' | 'メダルゲーム' | 'プライズ';

