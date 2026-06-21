import type { Template, AspectRatio, TemplateConfig, ImageConfig, TextConfig } from '@/types';

const FOOD_BG =
  null;

const baseText = (
  id: string,
  type: 'title' | 'subtitle' | 'tag',
  content: string,
  x: number,
  y: number,
  maxWidth: number,
  override: Partial<TextConfig> = {}
): TextConfig => ({
  id,
  type,
  content,
  x,
  y,
  maxWidth,
  fontSize: type === 'title' ? 140 : type === 'subtitle' ? 56 : 44,
  fontFamily: '"PingFang SC", "Source Han Sans CN", sans-serif',
  fontWeight: type === 'title' ? 900 : type === 'subtitle' ? 600 : 700,
  color: type === 'tag' ? '#FFFFFF' : '#FFFFFF',
  strokeColor: type === 'title' ? 'rgba(0,0,0,0.5)' : undefined,
  strokeWidth: type === 'title' ? 8 : undefined,
  shadow: type === 'title',
  textAlign: 'left',
  lineHeight: 1.2,
  ...override,
});

const heroImage = (
  x: number,
  y: number,
  w: number,
  h: number,
  radius = 40,
  mask: 'circle' | 'rounded' | 'none' = 'rounded'
): ImageConfig => ({
  id: 'hero',
  type: 'hero',
  src: null,
  x,
  y,
  width: w,
  height: h,
  opacity: 1,
  borderRadius: radius,
  maskShape: mask,
});

const bgImage = (): ImageConfig => ({
  id: 'bg',
  type: 'background',
  src: null,
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  opacity: 0.5,
  borderRadius: 0,
  maskShape: 'none',
});

const foodHorizontal = (): TemplateConfig => ({
  backgroundColor: '#2B1D16',
  backgroundGradient: { type: 'linear', colors: ['#3D2317', '#1A0F0A'], angle: 135 },
  overlayColor: 'rgba(0,0,0,0.25)',
  texts: [
    {
      id: 'tag',
      type: 'tag',
      content: '🔥 今日必吃',
      fontSize: 46,
      fontFamily: '"PingFang SC", sans-serif',
      fontWeight: 700,
      color: '#FFFFFF',
      x: 120,
      y: 120,
      textAlign: 'left',
      maxWidth: 600,
      lineHeight: 1.2,
    },
    baseText('title', 'title', '这家店藏得太深了', 120, 220, 1100, {
      fontSize: 150,
      color: '#FFD166',
      strokeColor: 'rgba(0,0,0,0.55)',
    }),
    baseText('sub', 'subtitle', '排队3小时才能吃到的宝藏餐厅 · 第3家绝了', 120, 760, 1200, {
      fontSize: 52,
      color: '#F8F9FA',
      fontWeight: 500,
    }),
  ],
  images: [
    { ...bgImage(), width: 1920, height: 1080, x: 0, y: 0, opacity: 0.35 },
    heroImage(1380, 220, 420, 560, 48),
  ],
  decorativeShapes: [
    { type: 'line', color: '#FF6B35', opacity: 1, x: 120, y: 700, width: 180, height: 8, radius: 4 },
    { type: 'badge', color: '#E63946', opacity: 1, x: 1580, y: 830, width: 240, height: 90, radius: 45, text: '探店Vlog', textColor: '#FFFFFF' },
  ],
});

const foodVertical = (): TemplateConfig => ({
  backgroundColor: '#2B1D16',
  backgroundGradient: { type: 'linear', colors: ['#1A0F0A', '#3D2317'], angle: 180 },
  overlayColor: 'rgba(0,0,0,0.3)',
  texts: [
    {
      id: 'tag',
      type: 'tag',
      content: '🍜 宝藏美食',
      fontSize: 44,
      fontFamily: '"PingFang SC", sans-serif',
      fontWeight: 700,
      color: '#FFF',
      x: 540,
      y: 180,
      textAlign: 'center',
      maxWidth: 800,
      lineHeight: 1.2,
    },
    baseText('title', 'title', '深夜食堂', 540, 280, 900, {
      textAlign: 'center',
      fontSize: 170,
      color: '#FFB703',
      strokeColor: 'rgba(0,0,0,0.6)',
      strokeWidth: 10,
    }),
    baseText('title2', 'title', 'TOP5必打卡', 540, 520, 900, {
      textAlign: 'center',
      fontSize: 120,
      color: '#FFFFFF',
    }),
    baseText('sub', 'subtitle', '吃遍全城最好吃的5家小店', 540, 1620, 880, {
      textAlign: 'center',
      fontSize: 50,
      color: '#F8F9FA',
      fontWeight: 500,
    }),
  ],
  images: [
    { ...bgImage(), width: 1080, height: 1920, x: 0, y: 0, opacity: 0.3 },
    heroImage(160, 760, 760, 760, 60),
  ],
  decorativeShapes: [
    { type: 'rect', color: '#E63946', opacity: 1, x: 340, y: 70, width: 400, height: 80, radius: 40, text: '美食地图', textColor: '#FFF' },
    { type: 'circle', color: '#FF6B35', opacity: 0.9, x: 820, y: 1720, width: 180, height: 180, text: 'GO!', textColor: '#FFF' },
  ],
});

const foodSquare = (): TemplateConfig => ({
  backgroundColor: '#2B1D16',
  backgroundGradient: { type: 'radial', colors: ['#3D2317', '#120806'] },
  overlayColor: 'rgba(0,0,0,0.2)',
  texts: [
    { id: 'tag', type: 'tag', content: '🥘 探店推荐', fontSize: 44, fontFamily: '"PingFang SC", sans-serif', fontWeight: 700, color: '#FFF', x: 600, y: 120, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
    baseText('title', 'title', '好吃到', 600, 220, 1000, { textAlign: 'center', fontSize: 160, color: '#FFD166', strokeColor: 'rgba(0,0,0,0.55)' }),
    baseText('title2', 'title', '想搬家', 600, 440, 1000, { textAlign: 'center', fontSize: 160, color: '#FFFFFF', strokeColor: 'rgba(0,0,0,0.55)' }),
    baseText('sub', 'subtitle', '附近居民私藏的老馆子', 600, 1050, 900, { textAlign: 'center', fontSize: 50, color: '#DEE2E6', fontWeight: 500 }),
  ],
  images: [
    { ...bgImage(), width: 1200, height: 1200, x: 0, y: 0, opacity: 0.28 },
    heroImage(200, 680, 800, 340, 40),
  ],
  decorativeShapes: [
    { type: 'badge', color: '#E63946', opacity: 1, x: 80, y: 80, width: 200, height: 72, radius: 36, text: '爆款', textColor: '#FFF' },
    { type: 'line', color: '#FF6B35', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
  ],
});

export const foodTemplates: Template[] = [
  {
    id: 'food-001',
    name: '深夜食堂 · 暖光系列',
    category: 'food',
    tags: ['爆款', '美食地图', 'Vlog'],
    layouts: { '16:9': foodHorizontal(), '9:16': foodVertical(), '1:1': foodSquare() },
  },
  {
    id: 'food-002',
    name: '街头小吃 · 烟火气',
    category: 'food',
    tags: ['接地气', '街头', '平价'],
    layouts: {
      '16:9': {
        backgroundColor: '#FFFBF5',
        backgroundGradient: { type: 'linear', colors: ['#FFF7E6', '#FFE4C4'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag', content: '人均20吃到撑', fontSize: 48, fontFamily: '"PingFang SC", sans-serif', fontWeight: 800, color: '#E63946', x: 120, y: 100, textAlign: 'left', maxWidth: 800, lineHeight: 1.2 },
          baseText('title', 'title', '这条老街', 120, 200, 1000, { fontSize: 150, color: '#2B2D42' }),
          baseText('title2', 'title', '藏着整个青春', 120, 400, 1000, { fontSize: 150, color: '#FF6B35' }),
          baseText('sub', 'subtitle', '10家宝藏小吃 · 学生党必看', 120, 820, 1000, { fontSize: 52, color: '#495057', fontWeight: 500 }),
        ],
        images: [
          { ...bgImage(), src: null, width: 900, height: 680, x: 980, y: 200, opacity: 1, borderRadius: 40, maskShape: 'rounded', type: 'hero' },
        ],
        decorativeShapes: [
          { type: 'rect', color: '#FFD166', opacity: 0.6, x: 90, y: 180, width: 260, height: 22, radius: 11 },
          { type: 'circle', color: '#2B2D42', opacity: 1, x: 1640, y: 120, width: 180, height: 180, text: '必吃', textColor: '#FFD166' },
        ],
      },
      '9:16': {
        backgroundColor: '#FFFBF5',
        backgroundGradient: { type: 'linear', colors: ['#FFF7E6', '#FFE4C4'], angle: 160 },
        texts: [
          { id: 'tag', type: 'tag', content: '💰 省钱攻略', fontSize: 44, fontFamily: '"PingFang SC", sans-serif', fontWeight: 800, color: '#E63946', x: 540, y: 160, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('title', 'title', '100块', 540, 260, 900, { textAlign: 'center', fontSize: 180, color: '#2B2D42' }),
          baseText('title2', 'title', '吃遍一条街', 540, 520, 900, { textAlign: 'center', fontSize: 130, color: '#FF6B35' }),
          baseText('sub', 'subtitle', '本地人私藏的美食地图', 540, 1780, 900, { textAlign: 'center', fontSize: 48, color: '#495057', fontWeight: 500 }),
        ],
        images: [{ ...bgImage(), src: null, type: 'hero', width: 880, height: 880, x: 100, y: 820, opacity: 1, borderRadius: 48, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'badge', color: '#E63946', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '街头小吃大赏', textColor: '#FFF' },
          { type: 'circle', color: '#2B2D42', opacity: 1, x: 820, y: 1560, width: 180, height: 180, text: 'GO', textColor: '#FFD166' },
        ],
      },
      '1:1': {
        backgroundColor: '#FFFBF5',
        backgroundGradient: { type: 'linear', colors: ['#FFF7E6', '#FFE8CC'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag', content: '🏮 夜市必吃', fontSize: 44, fontFamily: '"PingFang SC", sans-serif', fontWeight: 800, color: '#E63946', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('title', 'title', '碳水', 600, 220, 1000, { textAlign: 'center', fontSize: 170, color: '#2B2D42' }),
          baseText('title2', 'title', '快乐星球', 600, 460, 1000, { textAlign: 'center', fontSize: 150, color: '#FF6B35' }),
          baseText('sub', 'subtitle', '8家老底子味道 · 闭眼入', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#495057', fontWeight: 500 }),
        ],
        images: [{ ...bgImage(), src: null, type: 'hero', width: 900, height: 480, x: 150, y: 600, opacity: 1, borderRadius: 40, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'rect', color: '#FFD166', opacity: 0.7, x: 330, y: 380, width: 540, height: 28, radius: 14 },
          { type: 'badge', color: '#E63946', opacity: 1, x: 900, y: 80, width: 220, height: 80, radius: 40, text: 'TOP榜', textColor: '#FFF' },
        ],
      },
    },
  },
  {
    id: 'food-003',
    name: '家常厨房 · 暖黄色调',
    category: 'food',
    tags: ['教程', '家常菜', '手作'],
    layouts: {
      '16:9': {
        backgroundColor: '#FFF8E7',
        backgroundGradient: { type: 'radial', colors: ['#FFF4D6', '#FFE5A8'] },
        texts: [
          { id: 'tag', type: 'tag', content: '👩‍🍳 30分钟搞定', fontSize: 44, fontFamily: '"PingFang SC", sans-serif', fontWeight: 700, color: '#8B5E34', x: 120, y: 120, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('title', 'title', '外婆的', 120, 200, 800, { fontSize: 130, color: '#8B5E34' }),
          baseText('title2', 'title', '红烧肉', 120, 380, 800, { fontSize: 170, color: '#C1440E' }),
          baseText('sub', 'subtitle', '入口即化 · 零失败教学', 120, 820, 800, { fontSize: 52, color: '#5C4033', fontWeight: 500 }),
        ],
        images: [{ type: 'hero', src: null, id: 'hero', x: 1060, y: 150, width: 720, height: 780, opacity: 1, borderRadius: 48, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'circle', color: '#FFD166', opacity: 0.5, x: 980, y: 60, width: 240, height: 240 },
          { type: 'badge', color: '#C1440E', opacity: 1, x: 120, y: 700, width: 260, height: 80, radius: 40, text: '收藏级', textColor: '#FFF' },
        ],
      },
      '9:16': {
        backgroundColor: '#FFF8E7',
        backgroundGradient: { type: 'linear', colors: ['#FFF4D6', '#FFE5A8'], angle: 180 },
        texts: [
          { id: 'tag', type: 'tag', content: '🥢 家常菜谱', fontSize: 44, fontFamily: '"PingFang SC", sans-serif', fontWeight: 700, color: '#8B5E34', x: 540, y: 160, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('title', 'title', '3步做出', 540, 280, 900, { textAlign: 'center', fontSize: 130, color: '#8B5E34' }),
          baseText('title2', 'title', '神仙美味', 540, 460, 900, { textAlign: 'center', fontSize: 150, color: '#C1440E' }),
          baseText('sub', 'subtitle', '简单到有手就会', 540, 1760, 880, { textAlign: 'center', fontSize: 48, color: '#5C4033', fontWeight: 500 }),
        ],
        images: [{ type: 'hero', src: null, id: 'hero', x: 120, y: 760, width: 840, height: 880, opacity: 1, borderRadius: 48, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'circle', color: '#FFD166', opacity: 0.5, x: 820, y: 80, width: 200, height: 200 },
          { type: 'badge', color: '#C1440E', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '新手友好', textColor: '#FFF' },
        ],
      },
      '1:1': {
        backgroundColor: '#FFF8E7',
        backgroundGradient: { type: 'radial', colors: ['#FFF4D6', '#FFE0B2'] },
        texts: [
          { id: 'tag', type: 'tag', content: '🍳 一人食', fontSize: 44, fontFamily: '"PingFang SC", sans-serif', fontWeight: 700, color: '#8B5E34', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('title', 'title', '治愈系', 600, 220, 1000, { textAlign: 'center', fontSize: 160, color: '#8B5E34' }),
          baseText('title2', 'title', '晚饭', 600, 460, 1000, { textAlign: 'center', fontSize: 160, color: '#C1440E' }),
          baseText('sub', 'subtitle', '下班后的15分钟快手菜', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#5C4033', fontWeight: 500 }),
        ],
        images: [{ type: 'hero', src: null, id: 'hero', x: 200, y: 600, width: 800, height: 440, opacity: 1, borderRadius: 40, maskShape: 'rounded' }],
        decorativeShapes: [
          { type: 'rect', color: '#FFD166', opacity: 0.6, x: 330, y: 440, width: 540, height: 28, radius: 14 },
          { type: 'circle', color: '#C1440E', opacity: 1, x: 960, y: 960, width: 180, height: 180, text: '学', textColor: '#FFF' },
        ],
      },
    },
  },
];

export default foodTemplates;
