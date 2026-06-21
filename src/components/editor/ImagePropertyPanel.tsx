import { useRef } from 'react';
import { Upload, ImagePlus, Trash2, Maximize2, Circle, Square, Radius } from 'lucide-react';
import type { ImageConfig } from '@/types';
import { fileToDataURL } from '@/utils/storage';

interface Props {
  images: ImageConfig[];
  onChange: (id: string, patch: Partial<ImageConfig>) => void;
}

function ImageItem({ img, onChange }: { img: ImageConfig; onChange: (p: Partial<ImageConfig>) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isHero = img.type === 'hero';
  const label = isHero ? '人物/主图' : '背景图';

  const handleFile = async (file: File) => {
    const dataUrl = await fileToDataURL(file);
    onChange({ src: dataUrl });
  };

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isHero ? 'bg-shop-500/10 text-shop-500' : 'bg-knowledge-500/10 text-knowledge-500'}`}>
            <ImagePlus className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink-800">{label}</div>
            <div className="text-[11px] text-ink-400">
              {img.src ? '已上传 · 点击可替换' : '点击上传图片'}
            </div>
          </div>
        </div>
        {img.src && (
          <button
            onClick={() => onChange({ src: null })}
            className="p-1.5 rounded-full text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="移除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all ${
          img.src ? 'border-2 border-ink-100' : 'border-2 border-dashed border-ink-200 hover:border-brand-400 hover:bg-brand-50/50'
        }`}
      >
        {img.src ? (
          <img src={img.src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-400">
            <Upload className="w-8 h-8 mb-2" strokeWidth={1.8} />
            <div className="text-xs">点击上传 {label}</div>
            <div className="text-[10px] mt-0.5 opacity-70">支持 JPG / PNG</div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
      </div>

      {img.src && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block">不透明度 {Math.round(img.opacity * 100)}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(img.opacity * 100)}
              onChange={(e) => onChange({ opacity: Number(e.target.value) / 100 })}
              className="input-slider"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block flex items-center gap-1">
              <Radius className="w-3 h-3" /> 圆角 {img.borderRadius}
            </label>
            <input
              type="range"
              min={0}
              max={300}
              value={img.borderRadius}
              onChange={(e) => onChange({ borderRadius: Number(e.target.value), maskShape: 'rounded' })}
              className="input-slider"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block">裁剪形状</label>
            <div className="segmented w-full">
              {[
                { v: 'rounded', Icon: Square, label: '圆角' },
                { v: 'circle', Icon: Circle, label: '圆形' },
                { v: 'none', Icon: Maximize2, label: '直角' },
              ].map(({ v, Icon, label }) => (
                <div
                  key={v}
                  onClick={() => onChange({
                    maskShape: v as any,
                    borderRadius: v === 'circle' ? Math.max(img.borderRadius, 500) : v === 'rounded' ? 40 : 0,
                  })}
                  className={`segmented-item flex-1 flex items-center justify-center gap-1.5 ${(img.maskShape ?? 'rounded') === v ? 'active' : ''}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ImagePropertyPanel({ images, onChange }: Props) {
  return (
    <div className="space-y-3">
      {images.map((img) => (
        <ImageItem key={img.id} img={img} onChange={(p) => onChange(img.id, p)} />
      ))}
    </div>
  );
}
