import { useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useCanvasRender } from '@/hooks/useCanvasRender';
import type { TemplateConfig, AspectRatio } from '@/types';
import { CANVAS_SIZES } from '@/types';

interface Props {
  config: TemplateConfig | null;
  aspect: AspectRatio;
  onReady?: () => void;
}

export function CanvasPreview({ config, aspect, onReady }: Props) {
  const { canvasRef, ready, getScaledSize } = useCanvasRender(config, aspect, [config, aspect]);
  const [zoom, setZoom] = useState(1);
  const size = CANVAS_SIZES[aspect];

  const display = getScaledSize(window.innerWidth > 1280 ? 820 : window.innerWidth - 80, window.innerHeight - 280);
  const w = display.width * zoom;
  const h = display.height * zoom;

  useEffect(() => {
    if (ready && onReady) onReady();
  }, [ready, onReady]);

  const changeZoom = (delta: number) => setZoom((z) => Math.min(2, Math.max(0.3, +(z + delta).toFixed(2))));

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-[#15161C] overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(123,44,191,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,107,53,0.12) 0%, transparent 40%)',
        }}
      />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs">
          <span className="font-medium">{CANVAS_SIZES[aspect].label}</span>
          <span className="w-px h-3 bg-white/20 mx-1" />
          <span className="opacity-70">{size.width} × {size.height}</span>
        </div>
        <div className="pointer-events-auto inline-flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1">
          <button onClick={() => changeZoom(-0.1)} className="p-1.5 rounded-full text-white/80 hover:bg-white/15"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs text-white/90 w-12 text-center font-medium">{Math.round(zoom * 100)}%</span>
          <button onClick={() => changeZoom(0.1)} className="p-1.5 rounded-full text-white/80 hover:bg-white/15"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => setZoom(1)} className="p-1.5 rounded-full text-white/80 hover:bg-white/15"><Maximize2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="relative" style={{ width: w, height: h }}>
        <div className="absolute -inset-3 bg-gradient-to-br from-brand-500/20 via-knowledge-500/10 to-shop-500/20 rounded-3xl blur-xl opacity-70" />
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-canvas animate-pop checkerboard">
          {config && (
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                opacity: ready ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          )}
          {!ready && config && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-white/20 border-t-brand-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
