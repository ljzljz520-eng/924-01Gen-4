import { useEffect, useRef, useState, useCallback } from 'react';
import { renderCoverToCanvas, canvasToDataURL, generatePreviewThumbnail } from '@/utils/canvas';
import type { TemplateConfig, AspectRatio, ExportFormat } from '@/types';
import { CANVAS_SIZES } from '@/types';

export function useCanvasRender(
  config: TemplateConfig | null,
  aspect: AspectRatio,
  deps: unknown[] = []
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderKey, setRenderKey] = useState(0);
  const [ready, setReady] = useState(false);

  const rerender = useCallback(() => setRenderKey((k) => k + 1), []);

  useEffect(() => {
    if (!canvasRef.current || !config) return;
    let cancelled = false;
    setReady(false);
    (async () => {
      await renderCoverToCanvas(canvasRef.current!, config, aspect);
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, aspect, renderKey, ...deps]);

  const exportDataURL = useCallback(
    async (targetAspect: AspectRatio, targetConfig: TemplateConfig, format: ExportFormat = 'png', quality = 0.92) => {
      const c = document.createElement('canvas');
      await renderCoverToCanvas(c, targetConfig, targetAspect);
      return canvasToDataURL(c, format, quality);
    },
    []
  );

  const generateThumbnail = useCallback(
    (cfg: TemplateConfig, asp: AspectRatio) => generatePreviewThumbnail(cfg, asp),
    []
  );

  const getScaledSize = useCallback((maxW: number, maxH: number) => {
    const size = CANVAS_SIZES[aspect];
    const r = Math.min(maxW / size.width, maxH / size.height, 1);
    return { width: Math.round(size.width * r), height: Math.round(size.height * r), scale: r };
  }, [aspect]);

  return { canvasRef, rerender, ready, exportDataURL, generateThumbnail, getScaledSize };
}
