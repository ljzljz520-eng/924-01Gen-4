import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wand2 } from 'lucide-react';
import type { Template } from '@/types';
import { CATEGORY_META, CANVAS_SIZES, type AspectRatio } from '@/types';
import { renderCoverToCanvas } from '@/utils/canvas';

interface Props {
  template: Template;
  index: number;
}

export function TemplateCard({ template, index }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const categoryMeta = CATEGORY_META[template.category];
  const aspect: AspectRatio = '9:16';
  const size = CANVAS_SIZES[aspect];
  const scale = 240 / size.height;
  const w = Math.round(size.width * scale);
  const h = 240;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await new Promise((r) => setTimeout(r, index * 40));
      if (cancelled || !canvasRef.current) return;
      const c = canvasRef.current;
      c.width = w * 2;
      c.height = h * 2;
      const ctx = c.getContext('2d');
      if (ctx) ctx.scale(scale * 2, scale * 2);
      await renderCoverToCanvas(c, template.layouts[aspect], aspect);
      if (!cancelled) setLoaded(true);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [template, aspect, w, scale, index]);

  return (
    <Link
      to={`/editor/${template.id}`}
      className="group card block animate-fadeIn"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="relative p-4 bg-gradient-to-br from-ink-50 to-white overflow-hidden">
        <div className="flex items-center justify-center checkerboard rounded-xl p-4" style={{ minHeight: 260 }}>
          <canvas
            ref={canvasRef}
            style={{ width: w, height: h }}
            className={`rounded-lg shadow-lg transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        <div className={`absolute top-6 left-6 tag-pill ${categoryMeta.bg} ${categoryMeta.color}`}>
          {categoryMeta.label}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <div className="w-full flex items-center justify-between text-white">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <Wand2 className="w-4 h-4" />
              立即使用
            </span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-ink-100">
        <h3 className="font-semibold text-ink-800 text-[15px] leading-snug group-hover:text-brand-600 transition-colors">
          {template.name}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {template.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] rounded-full bg-ink-50 text-ink-500 border border-ink-100"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
