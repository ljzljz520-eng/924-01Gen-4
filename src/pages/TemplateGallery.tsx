import { useMemo, useState } from 'react';
import { Search, TrendingUp, Palette, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { AppHeader } from '@/components/common/AppHeader';
import { CategoryTabs } from '@/components/gallery/CategoryTabs';
import { TemplateCard } from '@/components/gallery/TemplateCard';
import { MyWorksPanel } from '@/components/gallery/MyWorksPanel';
import { getTemplatesByCategory } from '@/data/templates';
import type { Category } from '@/types';

type CatType = Category | 'all';

export default function TemplateGallery() {
  const [category, setCategory] = useState<CatType>('all');
  const [keyword, setKeyword] = useState('');

  const templates = useMemo(() => {
    const list = getTemplatesByCategory(category);
    if (!keyword.trim()) return list;
    const k = keyword.trim().toLowerCase();
    return list.filter(
      (t) =>
        t.name.toLowerCase().includes(k) ||
        t.tags.some((tag) => tag.toLowerCase().includes(k))
    );
  }, [category, keyword]);

  return (
    <div className="min-h-full flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-400 to-brand-300">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/40 blur-3xl" />
            <div className="absolute -bottom-60 right-0 w-[700px] h-[700px] rounded-full bg-yellow-200/30 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-3xl animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-5">
                <Sparkles className="w-4 h-4" />
                全新模板上线 · 每日更新
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                5分钟搞定
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                  爆款短视频封面
                </span>
              </h1>
              <p className="mt-5 text-lg text-white/90 max-w-xl leading-relaxed">
                精选美食、探店、知识、带货四大主题模板，一键替换标题与人物图，
                自动适配横版竖版方图多尺寸，轻松搞定系列内容。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="搜索模板名称或标签..."
                    className="w-full pl-12 pr-5 py-3.5 rounded-full bg-white shadow-xl placeholder:text-ink-400 text-ink-800 focus:outline-none focus:ring-4 focus:ring-white/30"
                  />
                </div>
                <div className="flex items-center gap-5 text-white/90 text-sm">
                  <span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4" />12+ 精品模板</span>
                  <span className="inline-flex items-center gap-1.5"><Palette className="w-4 h-4" />4 大主题</span>
                  <span className="inline-flex items-center gap-1.5"><TrendingUp className="w-4 h-4" />3 种尺寸</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-ink-50 to-transparent" />
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ink-800 mb-1">精选模板库</h2>
              <p className="text-ink-500 text-sm">选择主题，开启你的封面创作</p>
            </div>
            <CategoryTabs value={category} onChange={setCategory} />
          </div>

          {templates.length === 0 ? (
            <div className="panel p-16 text-center">
              <div className="text-ink-400 mb-2">没有找到相关模板</div>
              <button onClick={() => { setCategory('all'); setKeyword(''); }} className="btn-secondary">
                查看全部模板
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {templates.map((t, i) => (
                <TemplateCard key={t.id} template={t} index={i} />
              ))}
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-ink-800 mb-1">我的作品</h2>
              <p className="text-ink-500 text-sm">已保存的封面版本，随时继续编辑</p>
            </div>
            <a href="#my-works" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              查看全部 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div id="my-works">
            <MyWorksPanel limit={5} />
          </div>
        </section>

        <footer className="border-t border-ink-100 py-10 text-center text-sm text-ink-400">
          <p>封面工坊 CoverLab Studio · 让每一条视频都拥有爆款封面</p>
        </footer>
      </main>
    </div>
  );
}
