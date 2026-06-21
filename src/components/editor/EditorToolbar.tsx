import { ArrowLeft, Undo2, Redo2, Save, RotateCcw, Download, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onBack?: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
  onExport: () => void;
  onOpenVersions: () => void;
  snapshotCount: number;
  title: string;
}

export function EditorToolbar({
  onBack, canUndo, canRedo, onUndo, onRedo, onReset, onSave, onExport, onOpenVersions, snapshotCount, title,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-ink-100">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => (onBack ? onBack() : navigate('/'))}
            className="btn-ghost !p-2 rounded-full"
            title="返回广场"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="font-semibold text-ink-800 truncate max-w-[300px]">{title}</div>
            <div className="text-[11px] text-ink-400">在线封面编辑器</div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex items-center bg-ink-50 rounded-full p-1">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-2 rounded-full text-ink-500 hover:bg-white hover:text-ink-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              title="撤销"
            >
              <Undo2 className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 rounded-full text-ink-500 hover:bg-white hover:text-ink-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              title="重做"
            >
              <Redo2 className="w-4.5 h-4.5" />
            </button>
            <div className="w-px h-5 bg-ink-200 mx-1" />
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-ink-500 hover:bg-white hover:text-ink-800 transition-colors"
              title="重置为模板默认"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              重置
            </button>
            <button
              onClick={onOpenVersions}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-ink-500 hover:bg-white hover:text-ink-800 transition-colors relative"
              title="历史版本"
            >
              <Layers className="w-3.5 h-3.5" />
              版本
              {snapshotCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {snapshotCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onSave} className="btn-secondary !px-4 !py-2 !text-sm">
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">保存</span>
            </button>
            <button onClick={onExport} className="btn-primary !px-4 !py-2 !text-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">导出下载</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
