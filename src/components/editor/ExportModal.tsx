import { useState } from 'react';
import { Download, Check, Image as ImgIcon, FileImage, Loader2 } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import type { AspectRatio, ExportFormat, TemplateConfig } from '@/types';
import { CANVAS_SIZES, EXPORT_FORMATS } from '@/types';
import { downloadDataURL } from '@/utils/canvas';
import { useCanvasRender } from '@/hooks/useCanvasRender';

interface Props {
  open: boolean;
  onClose: () => void;
  layouts: Record<AspectRatio, TemplateConfig> | null;
  templateName: string;
}

export function ExportModal({ open, onClose, layouts, templateName }: Props) {
  const [selected, setSelected] = useState<AspectRatio[]>(['9:16']);
  const [format, setFormat] = useState<ExportFormat>('png');
  const [quality, setQuality] = useState(92);
  const [exporting, setExporting] = useState(false);
  const { exportDataURL } = useCanvasRender(null, '1:1');

  const toggleAspect = (a: AspectRatio) => {
    setSelected((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  };

  const handleExport = async () => {
    if (!layouts || selected.length === 0 || exporting) return;
    setExporting(true);
    try {
      for (let i = 0; i < selected.length; i++) {
        const a = selected[i];
        const cfg = layouts[a];
        const dataUrl = await exportDataURL(a, cfg, format, quality / 100);
        const fname = `${templateName}-${CANVAS_SIZES[a].label}-${Date.now()}.${format}`;
        downloadDataURL(dataUrl, fname);
        if (i < selected.length - 1) await new Promise((r) => setTimeout(r, 400));
      }
    } finally {
      setExporting(false);
      onClose();
    }
  };

  const safeName = (templateName || 'cover').replace(/[^\u4e00-\u9fa5a-zA-Z0-9-]/g, '_').slice(0, 30);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="导出版本"
      width={560}
      footer={
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-ink-500">
            已选择 <span className="font-semibold text-brand-600">{selected.length}</span> 个尺寸
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-secondary">取消</button>
            <button
              onClick={handleExport}
              disabled={selected.length === 0 || exporting || !layouts}
              className="btn-primary min-w-[140px]"
            >
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 正在导出...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> 下载 {selected.length > 1 ? `(${selected.length})` : ''}
                </>
              )}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-ink-700 mb-2 block">选择导出尺寸</label>
          <div className="grid grid-cols-3 gap-3">
            {(['16:9', '9:16', '1:1'] as AspectRatio[]).map((a) => {
              const s = CANVAS_SIZES[a];
              const active = selected.includes(a);
              return (
                <div
                  key={a}
                  onClick={() => toggleAspect(a)}
                  className={`relative rounded-2xl border-2 p-3 cursor-pointer transition-all ${
                    active ? 'border-brand-500 bg-brand-50/50 shadow-md' : 'border-ink-200 bg-white hover:border-brand-300'
                  }`}
                >
                  <div
                    className={`mx-auto rounded-lg bg-ink-100 checkerboard mb-2 ${
                      a === '16:9' ? 'aspect-video max-h-[70px]' : a === '9:16' ? 'aspect-[9/16] max-w-[50px]' : 'aspect-square max-w-[70px]'
                    }`}
                  />
                  <div className="text-center">
                    <div className="text-xs font-semibold text-ink-800">{s.label}</div>
                    <div className="text-[10px] text-ink-400 mt-0.5">{s.width}×{s.height}</div>
                  </div>
                  {active && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-ink-700 mb-2 block">文件格式</label>
            <div className="segmented w-full">
              {EXPORT_FORMATS.map((f) => (
                <div
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`segmented-item flex-1 flex items-center justify-center gap-1.5 ${format === f ? 'active' : ''}`}
                >
                  {f === 'png' ? <FileImage className="w-3.5 h-3.5" /> : <ImgIcon className="w-3.5 h-3.5" />}
                  <span className="uppercase font-medium text-xs">{f}</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-ink-400 mt-1.5">
              {format === 'png' ? '无损压缩 · 支持透明' : '文件更小 · 适合网络传输'}
            </div>
          </div>
          {format === 'jpeg' && (
            <div>
              <label className="text-sm font-semibold text-ink-700 mb-2 block">图片质量 {quality}%</label>
              <input
                type="range"
                min={60}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="input-slider mt-4"
              />
              <div className="flex justify-between text-[10px] text-ink-400 mt-1">
                <span>较小</span><span>均衡</span><span>最佳</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-ink-50">
          <div className="text-xs font-semibold text-ink-600 mb-1">文件命名预览</div>
          <div className="font-mono text-xs text-ink-700 break-all">
            {safeName}-{CANVAS_SIZES[selected[0] ?? '9:16'].label}-xxxxxxxx.{format}
          </div>
        </div>
      </div>
    </Modal>
  );
}
