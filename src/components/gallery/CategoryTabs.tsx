import { UtensilsCrossed, MapPin, Lightbulb, ShoppingBag, LayoutGrid } from 'lucide-react';
import type { Category } from '@/types';
import { CATEGORY_META } from '@/types';

type CatType = Category | 'all';

interface Props {
  value: CatType;
  onChange: (v: CatType) => void;
}

const CATEGORIES: Array<{ key: CatType; label: string; icon: any }> = [
  { key: 'all', label: '全部', icon: LayoutGrid },
  { key: 'food', label: CATEGORY_META.food.label, icon: UtensilsCrossed },
  { key: 'explore', label: CATEGORY_META.explore.label, icon: MapPin },
  { key: 'knowledge', label: CATEGORY_META.knowledge.label, icon: Lightbulb },
  { key: 'ecommerce', label: CATEGORY_META.ecommerce.label, icon: ShoppingBag },
];

export function CategoryTabs({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
      {CATEGORIES.map(({ key, label, icon: Icon }) => {
        const active = value === key;
        const isAll = key === 'all';
        const meta = isAll ? null : CATEGORY_META[key as Category];
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              active
                ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-white text-ink-600 border border-ink-200 hover:border-brand-400 hover:text-brand-600 shadow-sm'
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                active ? 'text-white' : meta ? meta.color : 'text-ink-500'
              }`}
              strokeWidth={2.2}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
