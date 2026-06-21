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

const hero = (x: number, y: number, w: number, h: number, r = 40, mask: 'circle' | 'rounded' | 'none' = 'rounded') => ({
  id: 'hero', type: 'hero' as const, src: null, x, y, width: w, height: h, opacity: 1, borderRadius: r, maskShape: mask,
});

export const ecommerceTemplates: Template[] = [
  {
    id: 'ecommerce-001',
    name: '爆款狂欢 · 金币红',
    category: 'ecommerce',
    tags: ['促销', '限时', '爆款'],
    layouts: {
      '16:9': {
        backgroundColor: '#B71C1C', backgroundGradient: { type: 'linear', colors: ['#E53935', '#8E0000'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🔥 年度最低价', fontSize: 50, fontFamily: '"PingFang SC"', fontWeight: 800, color: '#FFEB3B', x: 120, y: 100, textAlign: 'left', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '闭眼入', 120, 200, 900, { color: '#FFFFFF', fontSize: 180 }),
          baseText('t2', 'title', '不踩雷', 120, 440, 900, { color: '#FFEB3B', fontSize: 180 }),
          baseText('sub', 'subtitle', '老粉回购10次以上的口碑好物', 120, 830, 1000, { fontSize: 54, color: '#FFCDD2', fontWeight: 500 }),
        ],
        images: [hero(1300, 180, 520, 520, 260, 'circle')],
        decorativeShapes: [
          { type: 'circle' as const, color: '#FFEB3B', opacity: 0.18, x: 1200, y: 80, width: 720, height: 720 },
          { type: 'badge' as const, color: '#FFEB3B', opacity: 1, x: 1400, y: 830, width: 320, height: 100, radius: 50, text: '立省 ¥200', textColor: '#B71C1C' },
          { type: 'line' as const, color: '#FFEB3B', opacity: 1, x: 120, y: 760, width: 200, height: 8, radius: 4 },
        ],
      },
      '9:16': {
        backgroundColor: '#B71C1C', backgroundGradient: { type: 'linear', colors: ['#E53935', '#7A0000'], angle: 180 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '⏰ 最后3小时', fontSize: 48, fontFamily: '"PingFang SC"', fontWeight: 800, color: '#FFEB3B', x: 540, y: 150, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '全网', 540, 260, 900, { textAlign: 'center', fontSize: 180, color: '#FFFFFF' }),
          baseText('t2', 'title', '最低价', 540, 480, 900, { textAlign: 'center', fontSize: 180, color: '#FFEB3B' }),
          baseText('sub', 'subtitle', '错过等一年 · 手慢无', 540, 1720, 880, { textAlign: 'center', fontSize: 50, color: '#FFCDD2', fontWeight: 500 }),
        ],
        images: [hero(240, 780, 600, 600, 300, 'circle')],
        decorativeShapes: [
          { type: 'circle' as const, color: '#FFEB3B', opacity: 0.18, x: 140, y: 680, width: 800, height: 800 },
          { type: 'badge' as const, color: '#FFEB3B', opacity: 1, x: 360, y: 80, width: 360, height: 80, radius: 40, text: '直播专享', textColor: '#B71C1C' },
          { type: 'circle' as const, color: '#FFEB3B', opacity: 1, x: 820, y: 1600, width: 200, height: 200, text: '抢', textColor: '#B71C1C' },
        ],
      },
      '1:1': {
        backgroundColor: '#B71C1C', backgroundGradient: { type: 'radial', colors: ['#E53935', '#7A0000'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🎁 买一送一', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 800, color: '#FFEB3B', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '双十一', 600, 220, 1000, { textAlign: 'center', fontSize: 180, color: '#FFFFFF' }),
          baseText('t2', 'title', '必囤清单', 600, 460, 1000, { textAlign: 'center', fontSize: 160, color: '#FFEB3B' }),
          baseText('sub', 'subtitle', '销量10W+ · 好评如潮', 600, 1080, 900, { textAlign: 'center', fontSize: 50, color: '#FFCDD2', fontWeight: 500 }),
        ],
        images: [hero(320, 620, 560, 560, 280, 'circle')],
        decorativeShapes: [
          { type: 'circle' as const, color: '#FFEB3B', opacity: 0.18, x: 220, y: 520, width: 760, height: 760 },
          { type: 'rect' as const, color: '#FFEB3B', opacity: 1, x: 80, y: 80, width: 220, height: 72, radius: 36, text: '爆款', textColor: '#B71C1C' },
          { type: 'line' as const, color: '#FFEB3B', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
        ],
      },
    },
  },
  {
    id: 'ecommerce-002',
    name: '轻奢好物 · 高级黑金',
    category: 'ecommerce',
    tags: ['品质', '轻奢', '精选'],
    layouts: {
      '16:9': {
        backgroundColor: '#1A1A1A', backgroundGradient: { type: 'linear', colors: ['#2D2D2D', '#0A0A0A'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '✨ 品质严选', fontSize: 48, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#D4AF37', x: 120, y: 100, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '一眼', 120, 200, 900, { color: '#FFFFFF', fontSize: 150 }),
          baseText('t2', 'title', '心动', 120, 400, 900, { color: '#D4AF37', fontSize: 180 }),
          baseText('sub', 'subtitle', '提升生活质感的10件好物', 120, 830, 1000, { fontSize: 54, color: '#BDBDBD', fontWeight: 500 }),
        ],
        images: [hero(1280, 180, 540, 660, 32)],
        decorativeShapes: [
          { type: 'line' as const, color: '#D4AF37', opacity: 1, x: 120, y: 760, width: 220, height: 4, radius: 2 },
          { type: 'rect' as const, color: '#D4AF37', opacity: 0.15, x: 1260, y: 160, width: 580, height: 700, radius: 36 },
          { type: 'rect' as const, color: '#D4AF37', opacity: 1, x: 1500, y: 880, width: 300, height: 72, radius: 36, text: '上新', textColor: '#1A1A1A' },
        ],
      },
      '9:16': {
        backgroundColor: '#1A1A1A', backgroundGradient: { type: 'linear', colors: ['#2D2D2D', '#0A0A0A'], angle: 180 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🏆 口碑之选', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#D4AF37', x: 540, y: 160, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '贵一点', 540, 260, 900, { textAlign: 'center', fontSize: 160, color: '#FFFFFF' }),
          baseText('t2', 'title', '好很多', 540, 480, 900, { textAlign: 'center', fontSize: 180, color: '#D4AF37' }),
          baseText('sub', 'subtitle', '用过就回不去的品质好物', 540, 1720, 880, { textAlign: 'center', fontSize: 50, color: '#BDBDBD', fontWeight: 500 }),
        ],
        images: [hero(180, 780, 720, 820, 36)],
        decorativeShapes: [
          { type: 'rect' as const, color: '#D4AF37', opacity: 0.15, x: 160, y: 760, width: 760, height: 860, radius: 42 },
          { type: 'badge' as const, color: '#D4AF37', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '严选好物', textColor: '#1A1A1A' },
          { type: 'circle' as const, color: '#D4AF37', opacity: 1, x: 820, y: 1620, width: 200, height: 200, text: '购', textColor: '#1A1A1A' },
        ],
      },
      '1:1': {
        backgroundColor: '#1A1A1A', backgroundGradient: { type: 'radial', colors: ['#2D2D2D', '#050505'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🎁 送礼首选', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#D4AF37', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '精致', 600, 220, 1000, { textAlign: 'center', fontSize: 180, color: '#FFFFFF' }),
          baseText('t2', 'title', '好物', 600, 460, 1000, { textAlign: 'center', fontSize: 180, color: '#D4AF37' }),
          baseText('sub', 'subtitle', '生活需要一点仪式感', 600, 1080, 900, { textAlign: 'center', fontSize: 50, color: '#BDBDBD', fontWeight: 500 }),
        ],
        images: [hero(240, 620, 720, 440, 28)],
        decorativeShapes: [
          { type: 'rect' as const, color: '#D4AF37', opacity: 0.15, x: 220, y: 600, width: 760, height: 480, radius: 36 },
          { type: 'rect' as const, color: '#D4AF37', opacity: 0.85, x: 80, y: 80, width: 200, height: 72, radius: 36, text: '精选', textColor: '#1A1A1A' },
          { type: 'line' as const, color: '#D4AF37', opacity: 1, x: 500, y: 1000, width: 200, height: 4, radius: 2 },
        ],
      },
    },
  },
  {
    id: 'ecommerce-003',
    name: '新品首发 · 活力橙',
    category: 'ecommerce',
    tags: ['新品', '首发', '种草'],
    layouts: {
      '16:9': {
        backgroundColor: '#FFF3E0', backgroundGradient: { type: 'linear', colors: ['#FFF8E1', '#FFE0B2'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🆕 新品首发', fontSize: 48, fontFamily: '"PingFang SC"', fontWeight: 800, color: '#E65100', x: 120, y: 100, textAlign: 'left', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '终于', 120, 200, 900, { color: '#BF360C', fontSize: 160, strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '等到了', 120, 400, 900, { color: '#FF6B35', fontSize: 180, strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '全网首发 · 前1000名送赠品', 120, 830, 1000, { fontSize: 54, color: '#5D4037', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(1260, 180, 540, 640, 40)],
        decorativeShapes: [
          { type: 'circle' as const, color: '#FFAB40', opacity: 0.35, x: 1180, y: 100, width: 700, height: 700 },
          { type: 'badge' as const, color: '#FF6B35', opacity: 1, x: 1400, y: 860, width: 340, height: 90, radius: 45, text: '前100单5折', textColor: '#FFF' },
          { type: 'line' as const, color: '#FF6B35', opacity: 1, x: 120, y: 760, width: 200, height: 8, radius: 4 },
        ],
      },
      '9:16': {
        backgroundColor: '#FFF3E0', backgroundGradient: { type: 'linear', colors: ['#FFF8E1', '#FFE0B2'], angle: 180 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '💥 重磅上新', fontSize: 48, fontFamily: '"PingFang SC"', fontWeight: 800, color: '#E65100', x: 540, y: 150, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '被问爆', 540, 260, 900, { textAlign: 'center', fontSize: 170, color: '#BF360C', strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '的好物', 540, 480, 900, { textAlign: 'center', fontSize: 170, color: '#FF6B35', strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '首发价只卖3天', 540, 1720, 880, { textAlign: 'center', fontSize: 52, color: '#5D4037', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(140, 780, 800, 820, 44)],
        decorativeShapes: [
          { type: 'circle' as const, color: '#FFAB40', opacity: 0.3, x: 60, y: 700, width: 960, height: 960 },
          { type: 'badge' as const, color: '#FF6B35', opacity: 1, x: 360, y: 80, width: 360, height: 80, radius: 40, text: '新品速递', textColor: '#FFF' },
          { type: 'circle' as const, color: '#FF6B35', opacity: 1, x: 820, y: 1620, width: 200, height: 200, text: '冲', textColor: '#FFF' },
        ],
      },
      '1:1': {
        backgroundColor: '#FFF3E0', backgroundGradient: { type: 'radial', colors: ['#FFF8E1', '#FFD180'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🌱 种草清单', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 800, color: '#E65100', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '看一眼', 600, 220, 1000, { textAlign: 'center', fontSize: 170, color: '#BF360C', strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '就心动', 600, 460, 1000, { textAlign: 'center', fontSize: 170, color: '#FF6B35', strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '姐妹们这个真的可以冲', 600, 1080, 900, { textAlign: 'center', fontSize: 50, color: '#5D4037', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(200, 600, 800, 440, 36)],
        decorativeShapes: [
          { type: 'circle' as const, color: '#FFAB40', opacity: 0.3, x: 100, y: 500, width: 1000, height: 640 },
          { type: 'rect' as const, color: '#FF6B35', opacity: 1, x: 80, y: 80, width: 220, height: 72, radius: 36, text: '种草', textColor: '#FFF' },
          { type: 'line' as const, color: '#FF6B35', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
        ],
      },
    },
  },
];

export default ecommerceTemplates;
