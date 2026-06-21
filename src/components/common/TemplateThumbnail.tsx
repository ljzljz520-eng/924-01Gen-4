import { useMemo } from 'react';
import { renderCoverToCanvas } from '@/utils/canvas';
import type { TemplateConfig, AspectRatio } from '@/types';
import { CANVAS_SIZES } from '@/types';

interface TemplateThumbnailProps {
  config: TemplateConfig;
  aspect: AspectRatio;
  maxWidth?: number;
  className?: string;
}

export function TemplateThumbnail({ config, aspect, maxWidth = 320, className = '' }: TemplateThumbnailProps) {
  const size = CANVAS_SIZES[aspect];
  const ratio = size.width / size.height;
  const w = Math.min(maxWidth, maxWidth * ratio);
  const h = w / ratio;

  const canvasId = useMemo(() => 'thumb-' + Math.random().toString(36).slice(2, 10), []);

  useMemo(() => {
    setTimeout(async () => {
      const c = document.getElementById(canvasId) as HTMLCanvasElement | null;
      if (!c) return;
      const scale = w / size.width;
      c.width = Math.round(size.width * scale);
      c.height = Math.round(size.height * scale);
      const ctx = c.getContext('2d');
      if (ctx) ctx.scale(scale, scale);
      await renderCoverToCanvas(c, config, aspect);
    }, 0);
  }, [canvasId, config, aspect, w, size.width, size.height]);

  return (
    <canvas
      id={canvasId}
      style={{ width: w, height: h }}
      className={`rounded-xl shadow-md ${className}`}
    />
  );
}
