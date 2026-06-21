export type Category = 'food' | 'explore' | 'knowledge' | 'ecommerce';

export type AspectRatio = '16:9' | '9:16' | '1:1';

export const CANVAS_SIZES: Record<AspectRatio, { width: number; height: number; label: string }> = {
  '16:9': { width: 1920, height: 1080, label: '横版' },
  '9:16': { width: 1080, height: 1920, label: '竖版' },
  '1:1': { width: 1200, height: 1200, label: '方图' },
};

export interface TextConfig {
  id: string;
  type: 'title' | 'subtitle' | 'tag';
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  x: number;
  y: number;
  textAlign: 'left' | 'center' | 'right';
  maxWidth: number;
  lineHeight: number;
  strokeColor?: string;
  strokeWidth?: number;
  shadow?: boolean;
}

export interface ImageConfig {
  id: string;
  type: 'hero' | 'background';
  src: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  borderRadius: number;
  maskShape?: 'circle' | 'rounded' | 'none';
}

export interface DecorativeShape {
  type: 'rect' | 'circle' | 'line' | 'badge';
  color: string;
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  text?: string;
  textColor?: string;
}

export interface TemplateConfig {
  backgroundColor: string;
  backgroundGradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    angle?: number;
  };
  overlayColor?: string;
  texts: TextConfig[];
  images: ImageConfig[];
  decorativeShapes?: DecorativeShape[];
}

export interface Template {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  layouts: Record<AspectRatio, TemplateConfig>;
}

export interface VersionSnapshot {
  id: string;
  name: string;
  timestamp: number;
  thumbnail: string;
  layouts: Record<AspectRatio, TemplateConfig>;
}

export interface UserVersion {
  id: string;
  templateId: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  currentAspect: AspectRatio;
  layouts: Record<AspectRatio, TemplateConfig>;
  snapshots: VersionSnapshot[];
  thumbnail: string;
}

export const CATEGORY_META: Record<Category, { label: string; color: string; bg: string; icon: string }> = {
  food: { label: '美食', color: 'text-food-500', bg: 'bg-food-500/10', icon: 'UtensilsCrossed' },
  explore: { label: '探店', color: 'text-explore-500', bg: 'bg-explore-500/10', icon: 'MapPin' },
  knowledge: { label: '知识', color: 'text-knowledge-500', bg: 'bg-knowledge-500/10', icon: 'Lightbulb' },
  ecommerce: { label: '带货', color: 'text-shop-500', bg: 'bg-shop-500/10', icon: 'ShoppingBag' },
};

export const EXPORT_FORMATS = ['png', 'jpeg'] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number];
