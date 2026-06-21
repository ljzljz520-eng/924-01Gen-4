import { useState } from 'react';
import { Clock, Plus, Trash2, RotateCcw, Check } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import type { VersionSnapshot } from '@/types';
import { formatTime } from '@/utils/storage';

interface Props {
  open: boolean;
  onClose: () => void;
  snapshots: VersionSnapshot[];
  currentSnapshotId?: string | null;
  onAdd: (name: string) => void;
  onLoad: (s: VersionSnapshot) => void;
  onDelete: (id: string) => void;
}

export function VersionManager({ open, onClose, snapshots, onAdd, onLoad, onDelete }: Props) {
  const [name, setName] = useState('');
  const [pendingName, setPendingName] = useState(false);

  const handleAdd = () => {
    const n = (name || `版本 ${snapshots.length + 1}`).trim();
    onAdd(n);
    setName('');
    setPendingName(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="版本管理"
      width={720}
      footer={
        <div className="flex items-center justify-between">
          <div className="text-xs text-ink-500">共 {snapshots.length} 个历史版本</div>
          <button onClick={onClose} className="btn-secondary">关闭</button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-ink-800 text-sm mb-1">保存当前状态为快照</div>
              <div className="text-xs text-ink-500 mb-3">可以随时恢复到这个版本，适合做系列内容时保存基础模板</div>
              {!pendingName ? (
                <button
                  onClick={() => setPendingName(true)}
                  className="btn-primary !py-2 !text-sm"
                >
                  <Plus className="w-4 h-4" /> 新建快照版本
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="输入版本名称..."
                    className="input-field !py-2 !text-sm flex-1 min-w-[180px]"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  />
                  <button onClick={handleAdd} className="btn-primary !py-2 !text-sm"><Check className="w-4 h-4" /> 保存</button>
                  <button onClick={() => { setPendingName(false); setName(''); }} className="btn-ghost text-sm">取消</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-ink-700 inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-ink-500" /> 历史快照
            </div>
          </div>
          {snapshots.length === 0 ? (
            <div className="p-10 text-center rounded-2xl border border-dashed border-ink-200">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-ink-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-ink-400" />
              </div>
              <div className="text-sm font-medium text-ink-600 mb-1">还没有保存任何版本</div>
              <div className="text-xs text-ink-400">保存当前状态后，可以随时恢复</div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
              {snapshots.map((s, i) => (
                <div
                  key={s.id}
                  className="panel p-3 flex items-center gap-4 hover:border-brand-200 transition-colors"
                >
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-ink-100 relative">
                    {s.thumbnail ? (
                      <img src={s.thumbnail} alt={s.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full checkerboard" />
                    )}
                    <div className="absolute top-0.5 left-0.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold">
                      #{snapshots.length - i}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-ink-800 text-sm truncate">{s.name}</div>
                    <div className="text-xs text-ink-400 mt-0.5 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatTime(s.timestamp)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onLoad(s)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors"
                      title="恢复到此版本"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> 恢复
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`确定删除「${s.name}」吗？`)) onDelete(s.id);
                      }}
                      className="p-1.5 rounded-full text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
