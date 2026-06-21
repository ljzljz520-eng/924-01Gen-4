import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Clock, Sparkles } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { getTemplateById } from '@/data/templates';
import { CATEGORY_META } from '@/types';
import { formatTime } from '@/utils/storage';

interface Props {
  onOpenEditor?: (id: string, versionId: string) => void;
  limit?: number;
}

export function MyWorksPanel({ onOpenEditor, limit }: Props) {
  const { versions, load, deleteVersion, getVersion } = useUserStore();

  useEffect(() => {
    load();
  }, [load]);

  const list = limit ? versions.slice(0, limit) : versions;

  if (list.length === 0) {
    return (
      <div className="panel p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-brand-500" />
        </div>
        <h3 className="font-semibold text-ink-800 mb-1">还没有作品</h3>
        <p className="text-sm text-ink-500 mb-6">选择一个模板，开启你的创作之旅吧</p>
        <Link to="/" className="btn-primary inline-flex">
          <Plus className="w-4 h-4" /> 去选模板
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {list.map((v) => {
        const tpl = getTemplateById(v.templateId);
        const meta = tpl ? CATEGORY_META[tpl.category] : null;
        const handleClick = () => {
          if (onOpenEditor) {
            onOpenEditor(v.templateId, v.id);
          }
        };
        const wrapped = onOpenEditor ? (
          <div onClick={handleClick} className="card cursor-pointer group block animate-pop">
            {renderContent()}
          </div>
        ) : (
          <Link to={`/editor/${v.templateId}?vid=${v.id}`} className="card group block animate-pop">
            {renderContent()}
          </Link>
        );
        function renderContent() {
          return (
            <>
              <div className="aspect-[9/16] bg-ink-100 relative overflow-hidden">
                {v.thumbnail ? (
                  <img src={v.thumbnail} alt={v.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full checkerboard" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5" /> 继续编辑
                    </span>
                  </div>
                </div>
                {meta && (
                  <div className={`absolute top-3 left-3 tag-pill text-[10px] ${meta.bg} ${meta.color}`}>
                    {meta.label}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-ink-800 text-sm truncate group-hover:text-brand-600 transition-colors">
                  {v.name}
                </h4>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] text-ink-400">
                    <Clock className="w-3 h-3" />
                    {formatTime(v.updatedAt).slice(5)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm('确定删除这个作品吗？')) deleteVersion(v.id);
                    }}
                    className="p-1 rounded-full text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          );
        }
        return wrapped;
      })}
    </div>
  );
}
