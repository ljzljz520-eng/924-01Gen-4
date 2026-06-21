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

export const knowledgeTemplates: Template[] = [
  {
    id: 'knowledge-001',
    name: '知识星球 · 深邃紫',
    category: 'knowledge',
    tags: ['干货', '科普', '知识分享'],
    layouts: {
      '16:9': {
        backgroundColor: '#1A1038', backgroundGradient: { type: 'linear', colors: ['#3C1361', '#120826'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '💡 冷知识 #027', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#C8B6FF', x: 120, y: 100, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '99%的人', 120, 200, 1100, { color: '#FFFFFF' }),
          baseText('t2', 'title', '都不知道', 120, 400, 1100, { color: '#E0AAFF' }),
          baseText('sub', 'subtitle', '看完这期你就超过身边大多数人了', 120, 830, 1100, { fontSize: 52, color: '#D1C4E9', fontWeight: 500 }),
        ],
        images: [hero(1320, 180, 480, 480, 240, 'circle')],
        decorativeShapes: [
          { type: 'circle' as const, color: '#7B2CBF', opacity: 0.35, x: 1260, y: 120, width: 600, height: 600 },
          { type: 'circle' as const, color: '#9D4EDD', opacity: 0.25, x: 1600, y: 500, width: 280, height: 280 },
          { type: 'line' as const, color: '#E0AAFF', opacity: 1, x: 120, y: 760, width: 180, height: 8, radius: 4 },
          { type: 'badge' as const, color: '#7B2CBF', opacity: 1, x: 1400, y: 860, width: 320, height: 90, radius: 45, text: '硬核科普', textColor: '#FFF' },
        ],
      },
      '9:16': {
        backgroundColor: '#1A1038', backgroundGradient: { type: 'linear', colors: ['#3C1361', '#120826'], angle: 180 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '📚 知识分享', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#C8B6FF', x: 540, y: 160, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '一个视频', 540, 260, 900, { textAlign: 'center', fontSize: 160, color: '#FFFFFF' }),
          baseText('t2', 'title', '讲明白', 540, 480, 900, { textAlign: 'center', fontSize: 160, color: '#E0AAFF' }),
          baseText('sub', 'subtitle', '零基础也能听懂的硬核知识', 540, 1680, 880, { textAlign: 'center', fontSize: 48, color: '#D1C4E9', fontWeight: 500 }),
        ],
        images: [hero(270, 780, 540, 540, 270, 'circle')],
        decorativeShapes: [
          { type: 'circle' as const, color: '#7B2CBF', opacity: 0.3, x: 190, y: 700, width: 700, height: 700 },
          { type: 'badge' as const, color: '#7B2CBF', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '涨知识了', textColor: '#FFF' },
          { type: 'circle' as const, color: '#9D4EDD', opacity: 1, x: 820, y: 1600, width: 180, height: 180, text: '赞', textColor: '#FFF' },
        ],
      },
      '1:1': {
        backgroundColor: '#1A1038', backgroundGradient: { type: 'radial', colors: ['#3C1361', '#100720'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🧠 思维模型', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#C8B6FF', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '认知', 600, 220, 1000, { textAlign: 'center', fontSize: 170, color: '#FFFFFF' }),
          baseText('t2', 'title', '升级', 600, 460, 1000, { textAlign: 'center', fontSize: 170, color: '#E0AAFF' }),
          baseText('sub', 'subtitle', '每天进步一点点 · 坚持30天', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#D1C4E9', fontWeight: 500 }),
        ],
        images: [hero(350, 620, 500, 500, 250, 'circle')],
        decorativeShapes: [
          { type: 'circle' as const, color: '#7B2CBF', opacity: 0.3, x: 290, y: 560, width: 620, height: 620 },
          { type: 'rect' as const, color: '#E0AAFF', opacity: 0.85, x: 80, y: 80, width: 200, height: 72, radius: 36, text: '干货', textColor: '#1A1038' },
          { type: 'line' as const, color: '#E0AAFF', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
        ],
      },
    },
  },
  {
    id: 'knowledge-002',
    name: '学习笔记 · 清新学院',
    category: 'knowledge',
    tags: ['学习', '笔记', '学霸'],
    layouts: {
      '16:9': {
        backgroundColor: '#E3F2FD', backgroundGradient: { type: 'linear', colors: ['#F0F9FF', '#CFE8FF'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '📝 备考干货', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#1565C0', x: 120, y: 100, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '熬夜整理的', 120, 200, 1000, { color: '#0D47A1', fontSize: 130, strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '神仙笔记法', 120, 380, 1000, { color: '#7B2CBF', fontSize: 160, strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '效率翻3倍 · 看完就会用', 120, 820, 1000, { fontSize: 52, color: '#37474F', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(1260, 180, 540, 540, 48)],
        decorativeShapes: [
          { type: 'rect' as const, color: '#BBDEFB', opacity: 0.6, x: 90, y: 180, width: 300, height: 22, radius: 11 },
          { type: 'circle' as const, color: '#0D47A1', opacity: 1, x: 1620, y: 760, width: 220, height: 220, text: '收藏', textColor: '#FFD166' },
        ],
      },
      '9:16': {
        backgroundColor: '#E3F2FD', backgroundGradient: { type: 'linear', colors: ['#F0F9FF', '#CFE8FF'], angle: 160 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🎯 考试必看', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#1565C0', x: 540, y: 160, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '学霸都在', 540, 260, 900, { textAlign: 'center', fontSize: 160, color: '#0D47A1', strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '偷偷用', 540, 480, 900, { textAlign: 'center', fontSize: 160, color: '#7B2CBF', strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '5个高效学习方法分享', 540, 1780, 880, { textAlign: 'center', fontSize: 48, color: '#37474F', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(120, 800, 840, 840, 48)],
        decorativeShapes: [
          { type: 'badge' as const, color: '#0D47A1', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '学习笔记', textColor: '#FFF' },
          { type: 'circle' as const, color: '#FFD166', opacity: 1, x: 820, y: 1560, width: 180, height: 180, text: '冲', textColor: '#0D47A1' },
        ],
      },
      '1:1': {
        backgroundColor: '#E3F2FD', backgroundGradient: { type: 'radial', colors: ['#F0F9FF', '#B3D4FC'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🧮 思维脑图', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#1565C0', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '一页纸', 600, 220, 1000, { textAlign: 'center', fontSize: 170, color: '#0D47A1', strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '学完', 600, 460, 1000, { textAlign: 'center', fontSize: 170, color: '#7B2CBF', strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '知识体系可视化 · 过目不忘', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#37474F', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(200, 600, 800, 440, 40)],
        decorativeShapes: [
          { type: 'rect' as const, color: '#BBDEFB', opacity: 0.7, x: 330, y: 440, width: 540, height: 28, radius: 14 },
          { type: 'badge' as const, color: '#1565C0', opacity: 1, x: 900, y: 80, width: 220, height: 80, radius: 40, text: '纯干货', textColor: '#FFF' },
        ],
      },
    },
  },
  {
    id: 'knowledge-003',
    name: '思维突破 · 极简质感',
    category: 'knowledge',
    tags: ['认知', '方法论', '深度'],
    layouts: {
      '16:9': {
        backgroundColor: '#FAFAFA', backgroundGradient: { type: 'linear', colors: ['#FFFFFF', '#ECEFF1'], angle: 135 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🔍 深度思考', fontSize: 46, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#455A64', x: 120, y: 110, textAlign: 'left', maxWidth: 700, lineHeight: 1.2 },
          baseText('t1', 'title', '底层逻辑', 120, 220, 1000, { color: '#1A1A2E', fontSize: 170, strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '看懂本质，少走10年弯路', 120, 820, 1000, { fontSize: 54, color: '#546E7A', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(1300, 200, 500, 680, 32)],
        decorativeShapes: [
          { type: 'line' as const, color: '#FF6B35', opacity: 1, x: 120, y: 700, width: 260, height: 10, radius: 5 },
          { type: 'rect' as const, color: '#1A1A2E', opacity: 1, x: 120, y: 750, width: 220, height: 72, radius: 36, text: '必看', textColor: '#FFF' },
        ],
      },
      '9:16': {
        backgroundColor: '#FAFAFA', backgroundGradient: { type: 'linear', colors: ['#FFFFFF', '#ECEFF1'], angle: 180 },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '💎 认知觉醒', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#455A64', x: 540, y: 170, textAlign: 'center', maxWidth: 800, lineHeight: 1.2 },
          baseText('t1', 'title', '为什么', 540, 280, 900, { textAlign: 'center', fontSize: 170, color: '#1A1A2E', strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '你总是', 540, 500, 900, { textAlign: 'center', fontSize: 140, color: '#1A1A2E', strokeColor: undefined, shadow: false }),
          baseText('t3', 'title', '做不对', 540, 680, 900, { textAlign: 'center', fontSize: 170, color: '#FF6B35', strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '答案可能出乎你意料', 540, 1720, 880, { textAlign: 'center', fontSize: 50, color: '#546E7A', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(140, 900, 800, 700, 40)],
        decorativeShapes: [
          { type: 'line' as const, color: '#FF6B35', opacity: 1, x: 440, y: 1560, width: 200, height: 8, radius: 4 },
          { type: 'badge' as const, color: '#1A1A2E', opacity: 1, x: 380, y: 90, width: 320, height: 76, radius: 38, text: '深度好文', textColor: '#FFF' },
        ],
      },
      '1:1': {
        backgroundColor: '#FAFAFA', backgroundGradient: { type: 'radial', colors: ['#FFFFFF', '#E0E0E0'] },
        texts: [
          { id: 'tag', type: 'tag' as const, content: '🧩 逻辑思维', fontSize: 44, fontFamily: '"PingFang SC"', fontWeight: 700, color: '#455A64', x: 600, y: 120, textAlign: 'center', maxWidth: 900, lineHeight: 1.2 },
          baseText('t1', 'title', '高手的', 600, 220, 1000, { textAlign: 'center', fontSize: 170, color: '#1A1A2E', strokeColor: undefined, shadow: false }),
          baseText('t2', 'title', '思维方式', 600, 460, 1000, { textAlign: 'center', fontSize: 150, color: '#FF6B35', strokeColor: undefined, shadow: false }),
          baseText('sub', 'subtitle', '颠覆认知的5个思考框架', 600, 1080, 900, { textAlign: 'center', fontSize: 48, color: '#546E7A', fontWeight: 500, strokeColor: undefined, shadow: false }),
        ],
        images: [hero(200, 600, 800, 440, 36)],
        decorativeShapes: [
          { type: 'line' as const, color: '#FF6B35', opacity: 1, x: 500, y: 1000, width: 200, height: 8, radius: 4 },
          { type: 'rect' as const, color: '#1A1A2E', opacity: 1, x: 80, y: 80, width: 200, height: 72, radius: 36, text: '深度', textColor: '#FFF' },
        ],
      },
    },
  },
];

export default knowledgeTemplates;
