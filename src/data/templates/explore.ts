import type { Template } from '@/types';

const baseText = (id: string, type: 'title' | 'subtitle' | 'tag', content: string, x: number, y: number, maxWidth: number, override: any = {}) => ({
  id, type, content, x, y, maxWidth,
  fontSize: type === 'title' ? 140 : type === 'subtitle' ? 56 : 44,
  fontFamily: '"PingFang SC", "Source Han Sans CN", sans-serif',
  fontWeight: type === 'title' ? 900 : type === 'subtitle' ? 600 : 700,
  color: '#FFFFFF', strokeColor: type === 'title' ? 'rgba(0,0,0,0.5)' : undefined,
  strokeWidth: type === 'title' ? 8 : undefined, shadow: type === 'title',
  textAlign: 'left', lineHeight: 1.2, ...override,
});

const hero = (x: number, y: number, w: number, h: number, r = 40) => ({
  id: 'hero', type: 'hero' as const, src: null, x, y, width: w, height: h, opacity: 1, borderRadius: r, maskShape: 'rounded' as const,
});

const bg = (src: string) => ({
  id: 'bg', type: 'background' as const, src, x: 0, y: 0, width: 1920, height: 1080, opacity: 0.45, borderRadius: 0, maskShape: 'none' as const,
});

const CITY_BG = null;
const CAFE_BG = null;

export const exploreTemplates: Template[] = [
  {
    id: 'explore-001',
    name: '城市漫步 · 蓝调时刻',
    category: 'explore',
    tags: ['城市', '夜景', '大片感'],
    layouts: {
      '16:9': {
        backgroundColor: '#0F1C2E', backgroundGradient: { type: 'linear', colors: ['#1E3A5F', '#0A1628'], angle: 135 }, overlayColor: 'rgba(10,22,40,0.35)',
        texts: [
          { id: 'tag', type: 'tag' as const, content: '📍 周末去哪儿', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#7EC8E3', x: 120, y: 110, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '这座城市', 120, 200, 1100, { color: '#FFFFFF' }),
          baseText('t2', 'title', '藏得太深了', 120, 400, 1100, { color: '#7EC8E3' }),
          baseText('sub', 'subtitle', '本地人私藏的8个宝藏打卡地', 120, 830, 1100, { fontSize: 52, color: '#DEE2E6', fontWeight: 500 }),
        ],
        images: [{ ...bg(CITY_BG), width: 1920, height: 1080, opacity: 0.35 }, hero(1340, 200, 460, 620, 48)],
        decorativeShapes: [
          { type: 'line' as const, color: '#2A9D8F', opacity: 1, x: 120, y: 760, width: 180, height: 8, radius: 4 },
          { type: 'badge' as const, color: '#2A9D8F', opacity: 1, x: 1520, y: 860, width: 280, height: 90, radius: 45, text: 'VLOG 03', textColor: '#FFF' },
        ],
      },
      '9:16': {
        backgroundColor: '#0F1C2E', backgroundGradient: { type: 'linear', colors: ['#1E3A5F', '#0A1628'], angle: 180 }, overlayColor: 'rgba(10,22,40,0.4)',
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🏙️ 城市漫游', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#7EC8E3', x: 540, y: 170, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '独自逛遍', 540, 270, 900, { textAlign: 'center', color: '#FFFFFF', fontSize: 160 }),
          baseText('t2', 'title', '整座城', 540, 490, 900, { textAlign: 'center', color: '#7EC8E3', fontSize: 160 }),
          baseText('sub', 'subtitle', '治愈系城市散步指南', 540, 1660, 880, { textAlign: 'center', fontSize: 48, color: '#DEE2E6', fontWeight: 500 }),
        ],
        images: [{ ...bg(CITY_BG), width: 1080, height: 1920, opacity: 0.3 }, hero(120, 760, 840, 820, 48)],
        decorativeShapes: [
          { type: 'badge' as const, color: '#2A9D8F', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '城市探索', textColor: '#FFF' },
          { type: 'circle' as const, color: '#7EC8E3', opacity: 0.9, x: 820, y: 1700, width: 180, height: 180, text: 'GO', textColor: '#0F1C2E' },
        ],
      },
      '1:1': {
        backgroundColor: '#0F1C2E', backgroundGradient: { type: 'radial', colors: ['#1E3A5F', '#081420'] }, overlayColor: 'rgba(10,22,40,0.3)',
        texts: [
          { id: 'tag', type: 'tag' as const, content: '📸 拍照圣地', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#7EC8E3', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '小众', 600, 220, 1000, { textAlign: 'center', fontSize: 160, color: '#FFFFFF' }),
          baseText('t2', 'title', '宝藏地', 600, 460, 1000, { textAlign: 'center', fontSize: 160, color: '#7EC8E3' }),
          baseText('sub', 'subtitle', '人少景美超出片', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#DEE2E6', fontWeight: 500 }),
        ],
        images: [{ ...bg(CITY_BG), width: 1200, height: 1200, opacity: 0.28 }, hero(200, 640, 800, 400, 40)],
        decorativeShapes: [
          { type: 'rect' as const, color: '#2A9D8F', opacity: 0.85, x: 80, y: 80, width: 200, height: 72, radius: 36, text: '探店', textColor: '#FFF' },
          { type: 'line' as const, color: '#2A9D8F', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
        ],
      },
    },
  },
  {
    id: 'explore-002',
    name: '咖啡日记 · 温馨暖光',
    category: 'explore',
    tags: ['咖啡馆', '慢生活', '治愈'],
    layouts: {
      '16:9': {
        backgroundColor: '#F5EFE6', backgroundGradient: { type: 'linear', colors: ['#FBF7F0', '#E8DED0'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '☕ 今日限定', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#8B5A2B', x: 120, y: 100, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '藏在巷子里的', 120, 200, 1000, { color: '#3E2723', fontSize: 130 }),
          baseText('t2', 'title', '神仙咖啡馆', 120, 380, 1000, { color: '#A0522D', fontSize: 160 }),
          baseText('sub', 'subtitle', '手冲冠军坐镇 · 环境超出片', 120, 820, 1000, { fontSize: 52, color: '#5D4037', fontWeight: 500 }),
        ],
        images: [{ ...bg(CAFE_BG), width: 820, height: 720, x: 1020, y: 180, opacity: 1, borderRadius: 40, maskShape: 'rounded', type: 'hero' as const }],
        decorativeShapes: [
          { type: 'rect' as const, color: '#D7CCC8', opacity: 0.7, x: 90, y: 180, width: 280, height: 22, radius: 11 },
          { type: 'circle' as const, color: '#3E2723', opacity: 1, x: 1620, y: 120, width: 180, height: 180, text: '推荐', textColor: '#FFD166' },
        ],
      },
      '9:16': {
        backgroundColor: '#F5EFE6', backgroundGradient: { type: 'linear', colors: ['#FBF7F0', '#E8DED0'], angle: 160 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '📖 阅读角落', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#8B5A2B', x: 540, y: 160, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '周末的', 540, 260, 900, { textAlign: 'center', fontSize: 160, color: '#3E2723' }),
          baseText('t2', 'title', '慢时光', 540, 490, 900, { textAlign: 'center', fontSize: 150, color: '#A0522D' }),
          baseText('sub', 'subtitle', '一杯咖啡 一本书 一下午', 540, 1780, 880, { textAlign: 'center', fontSize: 48, color: '#5D4037', fontWeight: 500 }),
        ],
        images: [{ type: 'hero' as const, src: CAFE_BG, id: 'hero', x: 100, y: 800, width: 880, height: 900, opacity: 1, borderRadius: 48, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'badge' as const, color: '#8B5A2B', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '咖啡地图', textColor: '#FFF' },
          { type: 'circle' as const, color: '#FFD166', opacity: 1, x: 820, y: 1560, width: 180, height: 180, text: '☕', textColor: '#3E2723' },
        ],
      },
      '1:1': {
        backgroundColor: '#F5EFE6', backgroundGradient: { type: 'radial', colors: ['#FBF7F0', '#E0D3BE'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🏠 社区小店', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#8B5A2B', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '氛围感', 600, 220, 1000, { textAlign: 'center', fontSize: 160, color: '#3E2723' }),
          baseText('t2', 'title', '拉满', 600, 460, 1000, { textAlign: 'center', fontSize: 160, color: '#A0522D' }),
          baseText('sub', 'subtitle', '适合发呆的宝藏咖啡店', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#5D4037', fontWeight: 500 }),
        ],
        images: [{ type: 'hero' as const, src: CAFE_BG, id: 'hero', x: 150, y: 600, width: 900, height: 440, opacity: 1, borderRadius: 40, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'rect' as const, color: '#FFCC80', opacity: 0.7, x: 350, y: 440, width: 500, height: 28, radius: 14 },
          { type: 'badge' as const, color: '#8B5A2B', opacity: 1, x: 900, y: 80, width: 220, height: 80, radius: 40, text: '必打卡', textColor: '#FFF' },
        ],
      },
    },
  },
  {
    id: 'explore-003',
    name: '老街记忆 · 胶片质感',
    category: 'explore',
    tags: ['老街', '怀旧', '人文'],
    layouts: {
      '16:9': {
        backgroundColor: '#2D241B', backgroundGradient: { type: 'linear', colors: ['#3D3326', '#1A1510'], angle: 135 }, overlayColor: 'rgba(0,0,0,0.25)',
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🎞️ 时光切片', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#FFB085', x: 120, y: 110, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '走一遍', 120, 200, 1000, { color: '#FFE4B5', fontSize: 140 }),
          baseText('t2', 'title', '百年老街', 120, 400, 1000, { color: '#FF8C42', fontSize: 160 }),
          baseText('sub', 'subtitle', '每一块砖都藏着故事', 120, 830, 1000, { fontSize: 52, color: '#D7CCC8', fontWeight: 500 }),
        ],
        images: [hero(1320, 180, 480, 640, 40)],
        decorativeShapes: [
          { type: 'line' as const, color: '#FF8C42', opacity: 1, x: 120, y: 760, width: 180, height: 8, radius: 4 },
          { type: 'rect' as const, color: '#FFE4B5', opacity: 0.12, x: 1300, y: 160, width: 520, height: 680, radius: 48 },
        ],
      },
      '9:16': {
        backgroundColor: '#2D241B', backgroundGradient: { type: 'linear', colors: ['#3D3326', '#1A1510'], angle: 180 }, overlayColor: 'rgba(0,0,0,0.3)',
        texts: [
          { id: 'tag', type: 'tag' as const, content: '📷 胶片滤镜', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#FFB085', x: 540, y: 170, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '老城区的', 540, 270, 900, { textAlign: 'center', fontSize: 150, color: '#FFE4B5' }),
          baseText('t2', 'title', '温柔时光', 540, 490, 900, { textAlign: 'center', fontSize: 140, color: '#FF8C42' }),
          baseText('sub', 'subtitle', '本地人带路 · 避开人潮', 540, 1660, 880, { textAlign: 'center', fontSize: 48, color: '#D7CCC8', fontWeight: 500 }),
        ],
        images: [hero(100, 760, 880, 820, 44)],
        decorativeShapes: [
          { type: 'badge' as const, color: '#FF8C42', opacity: 1, x: 360, y: 90, width: 360, height: 76, radius: 38, text: '人文纪实', textColor: '#FFF' },
          { type: 'rect' as const, color: '#FFE4B5', opacity: 0.12, x: 80, y: 740, width: 920, height: 860, radius: 52 },
        ],
      },
      '1:1': {
        backgroundColor: '#2D241B', backgroundGradient: { type: 'radial', colors: ['#3D3326', '#140F0A'] }, overlayColor: 'rgba(0,0,0,0.25)',
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🚶 City Walk', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#FFB085', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '回得去的', 600, 220, 1000, { textAlign: 'center', fontSize: 150, color: '#FFE4B5' }),
          baseText('t2', 'title', '旧时光', 600, 460, 1000, { textAlign: 'center', fontSize: 150, color: '#FF8C42' }),
          baseText('sub', 'subtitle', '带妈妈逛她的童年', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#D7CCC8', fontWeight: 500 }),
        ],
        images: [hero(200, 620, 800, 420, 36)],
        decorativeShapes: [
          { type: 'rect' as const, color: '#FF8C42', opacity: 0.85, x: 80, y: 80, width: 200, height: 72, radius: 36, text: '怀旧', textColor: '#FFF' },
          { type: 'line' as const, color: '#FF8C42', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
        ],
      },
    },
  },
];

export default exploreTemplates;
