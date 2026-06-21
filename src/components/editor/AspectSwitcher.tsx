import { Monitor, Smartphone, Square } from 'lucide-react';
import type { AspectRatio } from '@/types';
import { CANVAS_SIZES } from '@/types';

interface Props {
  value: AspectRatio;
  onChange: (v: AspectRatio) => void;
}

const OPTIONS: Array<{ value: AspectRatio; icon: any; label: string; hint: string }> = [
  { value: '16:9', icon: Monitor, label: '横版', hint: '1920×1080' },
  { value: '9:16', icon: Smartphone, label: '竖版', hint: '1080×1920' },
  { value: '1:1', icon: Square, label: '方图', hint: '1200×1200' },
];

export function AspectSwitcher({ value, onChange }: Props) {
  return (
    <div className="segmented">
      {OPTIONS.map(({ value: v, icon: Icon, label, hint }) => {
        const active = value === v;
        return (
          <div
            key={v}
            onClick={() => onChange(v)}
            className={`segmented-item ${active ? 'active' : ''} flex items-center gap-2`}
            title={`${label} ${hint}`}
          >
            <Icon className="w-4 h-4" strokeWidth={active ? 2.4 : 2} />
            <span className="font-medium">{label}</span>
            <span className="text-[10px] opacity-60 hidden sm:inline">{CANVAS_SIZES[v].label}</span>
          </div>
        );
      })}
    </div>
  );
}
