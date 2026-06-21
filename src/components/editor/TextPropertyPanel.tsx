import { ChevronDown, ChevronRight, Type, Palette, Move, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useState } from 'react';
import type { TextConfig } from '@/types';

interface Props {
  texts: TextConfig[];
  onChange: (id: string, patch: Partial<TextConfig>) => void;
}

const COLOR_PRESETS = ['#FFFFFF', '#000000', '#FF6B35', '#FFD166', '#E63946', '#2A9D8F', '#7B2CBF', '#1A1A2E'];

function TextItem({ text, onChange }: { text: TextConfig; onChange: (p: Partial<TextConfig>) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const isTitle = text.type === 'title';
  return (
    <div className="panel p-4">
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isTitle ? 'bg-brand-100 text-brand-600' : 'bg-ink-100 text-ink-500'}`}>
            <Type className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink-800">
              {isTitle ? (text.id === 't1' || text.id === 'title' ? '主标题' : '副标题') : text.type === 'subtitle' ? '副标题' : '标签'}
            </div>
            <div className="text-[11px] text-ink-400 truncate max-w-[180px]">{text.content || '（空）'}</div>
          </div>
        </div>
        {collapsed ? <ChevronRight className="w-4 h-4 text-ink-400" /> : <ChevronDown className="w-4 h-4 text-ink-400" />}
      </button>
      {!collapsed && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block">文字内容</label>
            <textarea
              value={text.content}
              onChange={(e) => onChange({ content: e.target.value })}
              rows={2}
              className="input-field resize-none text-sm"
              placeholder="输入文字..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-ink-600 mb-1.5 block flex items-center gap-1">
                <Move className="w-3 h-3" /> 字号 {text.fontSize}
              </label>
              <input
                type="range"
                min={isTitle ? 60 : 20}
                max={isTitle ? 260 : 100}
                value={text.fontSize}
                onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
                className="input-slider"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink-600 mb-1.5 block flex items-center gap-1">
                <Palette className="w-3 h-3" /> 颜色
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => onChange({ color: c })}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-lg border-2 transition-transform hover:scale-110 ${text.color === c ? 'border-brand-500 shadow-md' : 'border-white shadow-sm'}`}
                  />
                ))}
                <input
                  type="color"
                  value={text.color}
                  onChange={(e) => onChange({ color: e.target.value })}
                  className="w-6 h-6 rounded-lg cursor-pointer border border-ink-200"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block">对齐方式</label>
            <div className="segmented">
              {[
                { v: 'left', Icon: AlignLeft },
                { v: 'center', Icon: AlignCenter },
                { v: 'right', Icon: AlignRight },
              ].map(({ v, Icon }) => (
                <div
                  key={v}
                  onClick={() => onChange({ textAlign: v as any })}
                  className={`segmented-item !px-3 !py-1 ${text.textAlign === v ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TextPropertyPanel({ texts, onChange }: Props) {
  return (
    <div className="space-y-3">
      {texts.map((t) => (
        <TextItem key={t.id} text={t} onChange={(p) => onChange(t.id, p)} />
      ))}
    </div>
  );
}
