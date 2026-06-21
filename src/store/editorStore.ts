import { create } from 'zustand';
import type { Template, TemplateConfig, AspectRatio, TextConfig, ImageConfig, VersionSnapshot, UserVersion } from '@/types';
import { getTemplateById, cloneTemplate } from '@/data/templates';
import { uid } from '@/utils/storage';

interface EditorState {
  templateId: string | null;
  template: Template | null;
  userVersionId: string | null;
  currentAspect: AspectRatio;
  layouts: Record<AspectRatio, TemplateConfig> | null;
  snapshots: VersionSnapshot[];
  history: Array<Record<AspectRatio, TemplateConfig>>;
  historyIndex: number;
  setTemplate: (templateId: string, userVersionId?: string) => void;
  setAspect: (aspect: AspectRatio) => void;
  updateText: (textId: string, patch: Partial<TextConfig>) => void;
  updateImage: (imageId: string, patch: Partial<ImageConfig>) => void;
  updateCurrentLayout: (patch: Partial<TemplateConfig>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: () => void;
  resetToTemplate: () => void;
  loadSnapshot: (snapshot: VersionSnapshot) => void;
  saveSnapshot: (name: string, thumbnail: string) => VersionSnapshot;
  deleteSnapshot: (id: string) => void;
  loadUserVersion: (version: UserVersion) => void;
}

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export const useEditorStore = create<EditorState>((set, get) => ({
  templateId: null,
  template: null,
  userVersionId: null,
  currentAspect: '9:16',
  layouts: null,
  snapshots: [],
  history: [],
  historyIndex: -1,

  setTemplate: (templateId, userVersionId) => {
    const tpl = getTemplateById(templateId);
    if (!tpl) return;
    const cloned = cloneTemplate(tpl);
    const initial = deepClone(cloned.layouts);
    set({
      templateId,
      template: cloned,
      userVersionId: userVersionId ?? null,
      layouts: initial,
      currentAspect: '9:16',
      snapshots: [],
      history: [initial],
      historyIndex: 0,
    });
  },

  setAspect: (aspect) => set({ currentAspect: aspect }),

  updateText: (textId, patch) => {
    const s = get();
    if (!s.layouts) return;
    const layouts = deepClone(s.layouts);
    const cfg = layouts[s.currentAspect];
    const idx = cfg.texts.findIndex((t) => t.id === textId);
    if (idx >= 0) {
      cfg.texts[idx] = { ...cfg.texts[idx], ...patch };
      const history = s.history.slice(0, s.historyIndex + 1);
      history.push(layouts);
      set({ layouts, history, historyIndex: history.length - 1 });
    }
  },

  updateImage: (imageId, patch) => {
    const s = get();
    if (!s.layouts) return;
    const layouts = deepClone(s.layouts);
    const cfg = layouts[s.currentAspect];
    const idx = cfg.images.findIndex((i) => i.id === imageId);
    if (idx >= 0) {
      cfg.images[idx] = { ...cfg.images[idx], ...patch };
      const history = s.history.slice(0, s.historyIndex + 1);
      history.push(layouts);
      set({ layouts, history, historyIndex: history.length - 1 });
    }
  },

  updateCurrentLayout: (patch) => {
    const s = get();
    if (!s.layouts) return;
    const layouts = deepClone(s.layouts);
    layouts[s.currentAspect] = { ...layouts[s.currentAspect], ...patch };
    const history = s.history.slice(0, s.historyIndex + 1);
    history.push(layouts);
    set({ layouts, history, historyIndex: history.length - 1 });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => {
    const s = get();
    return s.historyIndex < s.history.length - 1;
  },

  undo: () => {
    const s = get();
    if (s.historyIndex <= 0) return;
    const next = s.historyIndex - 1;
    set({ historyIndex: next, layouts: deepClone(s.history[next]) });
  },

  redo: () => {
    const s = get();
    if (s.historyIndex >= s.history.length - 1) return;
    const next = s.historyIndex + 1;
    set({ historyIndex: next, layouts: deepClone(s.history[next]) });
  },

  pushHistory: () => {
    const s = get();
    if (!s.layouts) return;
    const history = s.history.slice(0, s.historyIndex + 1);
    history.push(deepClone(s.layouts));
    set({ history, historyIndex: history.length - 1 });
  },

  resetToTemplate: () => {
    const s = get();
    if (!s.template) return;
    const fresh = deepClone(cloneTemplate(s.template).layouts);
    const history = s.history.slice(0, s.historyIndex + 1);
    history.push(fresh);
    set({ layouts: fresh, history, historyIndex: history.length - 1 });
  },

  loadSnapshot: (snapshot) => {
    const s = get();
    const layouts = deepClone(snapshot.layouts);
    const history = s.history.slice(0, s.historyIndex + 1);
    history.push(layouts);
    set({ layouts, history, historyIndex: history.length - 1 });
  },

  saveSnapshot: (name, thumbnail) => {
    const s = get();
    const snap: VersionSnapshot = {
      id: uid('snap_'),
      name,
      timestamp: Date.now(),
      thumbnail,
      layouts: deepClone(s.layouts!),
    };
    set({ snapshots: [snap, ...s.snapshots] });
    return snap;
  },

  deleteSnapshot: (id) => set({ snapshots: get().snapshots.filter((s) => s.id !== id) }),

  loadUserVersion: (version) => {
    const s = get();
    s.setTemplate(version.templateId, version.id);
    const st = get();
    set({
      layouts: deepClone(version.layouts),
      currentAspect: version.currentAspect,
      snapshots: version.snapshots,
      userVersionId: version.id,
      history: [deepClone(version.layouts)],
      historyIndex: 0,
    });
  },
}));
