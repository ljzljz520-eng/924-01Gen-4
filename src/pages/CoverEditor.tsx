import { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Type, Image as ImgIcon, Sparkles, Check, AlertCircle } from 'lucide-react';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { CanvasPreview } from '@/components/editor/CanvasPreview';
import { AspectSwitcher } from '@/components/editor/AspectSwitcher';
import { TextPropertyPanel } from '@/components/editor/TextPropertyPanel';
import { ImagePropertyPanel } from '@/components/editor/ImagePropertyPanel';
import { VersionManager } from '@/components/editor/VersionManager';
import { ExportModal } from '@/components/editor/ExportModal';
import { Modal } from '@/components/common/Modal';
import { useEditorStore } from '@/store/editorStore';
import { useUserStore } from '@/store/userStore';
import { getTemplateById } from '@/data/templates';
import type { AspectRatio, VersionSnapshot, UserVersion } from '@/types';
import { useCanvasRender } from '@/hooks/useCanvasRender';
import { CATEGORY_META } from '@/types';

export default function CoverEditor() {
  const { templateId } = useParams<{ templateId: string }>();
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const vid = sp.get('vid');

  const s = useEditorStore();
  const user = useUserStore();
  const { exportDataURL, generateThumbnail } = useCanvasRender(null, '9:16');

  const [tab, setTab] = useState<'text' | 'image'>('text');
  const [showVersions, setShowVersions] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [initDone, setInitDone] = useState(false);

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    if (!templateId) return;
    const tpl = getTemplateById(templateId);
    if (!tpl) {
      navigate('/');
      return;
    }
    if (vid) {
      const v = user.getVersion(vid);
      if (v) {
        s.loadUserVersion(v);
        setSaveName(v.name);
      } else {
        s.setTemplate(templateId);
        setSaveName(tpl.name + ' · 我的版本');
      }
    } else {
      s.setTemplate(templateId);
      setSaveName(tpl.name + ' · 我的版本');
    }
    user.load();
    setTimeout(() => setInitDone(true), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, vid]);

  if (!s.layouts || !s.template) {
    return (
      <div className="h-screen flex items-center justify-center bg-ink-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
          <div className="text-ink-500 text-sm">加载模板中...</div>
        </div>
      </div>
    );
  }

  const currentLayout = s.layouts[s.currentAspect];
  const category = s.template.category;
  const meta = CATEGORY_META[category];

  const doSave = () => {
    setSaveOpen(true);
  };

  const confirmSave = async () => {
    if (!s.layouts) return;
    const thumb = await generateThumbnail(s.layouts[s.currentAspect], s.currentAspect);
    const v = user.saveCurrent(
      s.templateId!,
      s.userVersionId,
      (saveName || s.template!.name).trim(),
      s.currentAspect,
      s.layouts,
      s.snapshots,
      thumb
    );
    useEditorStore.setState({ userVersionId: v.id });
    setSaveOpen(false);
    showToast('已保存到我的作品');
  };

  const handleAddSnapshot = async (name: string) => {
    if (!s.layouts) return;
    const thumb = await generateThumbnail(s.layouts[s.currentAspect], s.currentAspect);
    s.saveSnapshot(name, thumb);
    showToast('版本快照已保存');
  };

  const handleLoadSnapshot = (snap: VersionSnapshot) => {
    if (confirm('恢复到该版本会覆盖当前编辑，是否继续？')) {
      s.loadSnapshot(snap);
      setShowVersions(false);
      showToast(`已恢复：${snap.name}`);
    }
  };

  const handleExport = () => setShowExport(true);
  const handleChangeAspect = (a: AspectRatio) => s.setAspect(a);

  const handleBack = () => navigate('/');

  const handleUserVersionLink = (version: UserVersion) => {
    navigate(`/editor/${version.templateId}?vid=${version.id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-ink-50">
      <EditorToolbar
        onBack={handleBack}
        canUndo={s.canUndo()}
        canRedo={s.canRedo()}
        onUndo={s.undo}
        onRedo={s.redo}
        onReset={s.resetToTemplate}
        onSave={doSave}
        onExport={handleExport}
        onOpenVersions={() => setShowVersions(true)}
        snapshotCount={s.snapshots.length}
        title={`${s.template.name}${s.userVersionId ? '（已保存）' : ''}`}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3 border-b border-ink-100 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`tag-pill ${meta.bg} ${meta.color}`}>{meta.label}</span>
              <span className="text-xs text-ink-500 hidden sm:inline truncate max-w-[260px]">
                {s.template.tags.map((t) => `#${t}`).join(' ')}
              </span>
            </div>
            <AspectSwitcher value={s.currentAspect} onChange={handleChangeAspect} />
          </div>

          <div className="flex-1 min-h-0 relative">
            {initDone && (
              <CanvasPreview
                key={s.currentAspect + '-' + s.templateId}
                config={currentLayout}
                aspect={s.currentAspect}
              />
            )}
          </div>
        </div>

        <aside className="w-full lg:w-[400px] xl:w-[440px] shrink-0 border-t lg:border-t-0 lg:border-l border-ink-100 bg-white flex flex-col max-h-[50vh] lg:max-h-none">
          <div className="border-b border-ink-100 p-1.5 m-2 rounded-xl bg-ink-50 inline-flex self-start w-[calc(100%-16px)]">
            {[
              { k: 'text', Icon: Type, label: '文字' },
              { k: 'image', Icon: ImgIcon, label: '图片' },
            ].map(({ k, Icon, label }) => {
              const active = tab === k;
              return (
                <button
                  key={k}
                  onClick={() => setTab(k as any)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-500 hover:text-ink-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {active && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-600 text-[10px] font-bold">
                      {k === 'text' ? currentLayout.texts.length : currentLayout.images.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 pt-2 space-y-4">
            {tab === 'text' ? (
              <TextPropertyPanel texts={currentLayout.texts} onChange={s.updateText} />
            ) : (
              <ImagePropertyPanel images={currentLayout.images} onChange={s.updateImage} />
            )}
            <div className="pt-2 border-t border-dashed border-ink-200">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-50/60 border border-brand-100">
                <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <div className="text-xs text-brand-800 leading-relaxed">
                  <div className="font-semibold mb-0.5">系列内容创作小技巧</div>
                  完成一套封面后，点击顶部「保存」按钮存到「我的作品」；下次进入可直接继续编辑，更换文字和图片即可生成新的一期。
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <VersionManager
        open={showVersions}
        onClose={() => setShowVersions(false)}
        snapshots={s.snapshots}
        onAdd={handleAddSnapshot}
        onLoad={handleLoadSnapshot}
        onDelete={s.deleteSnapshot}
      />

      <ExportModal
        open={showExport}
        onClose={() => setShowExport(false)}
        layouts={s.layouts}
        templateName={saveName || s.template.name}
      />

      <Modal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        title="保存到我的作品"
        width={480}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setSaveOpen(false)} className="btn-secondary">取消</button>
            <button onClick={confirmSave} className="btn-primary">
              <Check className="w-4 h-4" /> 保存
            </button>
          </div>
        }
      >
        <label className="text-sm font-medium text-ink-700 mb-2 block">作品名称</label>
        <input
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          className="input-field"
          placeholder="输入一个名称，方便下次找到..."
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && confirmSave()}
        />
        <div className="mt-4 text-xs text-ink-500">
          保存后可以在「我的作品」中随时打开继续编辑，适合用来做系列封面。
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl text-white ${
              toast.ok ? 'bg-ink-800' : 'bg-red-500'
            }`}
          >
            {toast.ok ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm font-medium">{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
