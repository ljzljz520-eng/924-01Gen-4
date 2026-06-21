import { AppHeader } from '@/components/common/AppHeader';
import { MyWorksPanel } from '@/components/gallery/MyWorksPanel';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { FileImage, Plus } from 'lucide-react';

export default function MyWorks() {
  const { versions, load } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-full flex flex-col">
      <AppHeader />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-ink-800 mb-2">我的作品</h1>
            <p className="text-ink-500">
              共 <span className="font-semibold text-brand-600">{versions.length}</span> 个已保存版本
            </p>
          </div>
          <button onClick={() => navigate('/')} className="btn-primary">
            <Plus className="w-4 h-4" /> 新建封面
          </button>
        </div>

        {versions.length === 0 ? (
          <div className="panel p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-brand-50 flex items-center justify-center">
              <FileImage className="w-10 h-10 text-brand-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-ink-800 mb-2">还没有任何作品</h3>
            <p className="text-ink-500 mb-6 max-w-md mx-auto">
              去模板广场选一个心仪的模板，开始你的第一款封面创作吧
            </p>
            <button onClick={() => navigate('/')} className="btn-primary">
              <Plus className="w-4 h-4" /> 去选模板
            </button>
          </div>
        ) : (
          <MyWorksPanel
            onOpenEditor={(tid, vid) => {
              navigate(`/editor/${tid}?vid=${vid}`);
            }}
          />
        )}
      </main>
    </div>
  );
}
