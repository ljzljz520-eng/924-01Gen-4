import { create } from 'zustand';
import type { UserVersion, AspectRatio, TemplateConfig } from '@/types';
import { loadUserVersions, saveUserVersions, uid } from '@/utils/storage';

interface UserStore {
  versions: UserVersion[];
  load: () => void;
  saveCurrent: (
    templateId: string,
    userVersionId: string | null,
    name: string,
    aspect: AspectRatio,
    layouts: Record<AspectRatio, TemplateConfig>,
    snapshots: UserVersion['snapshots'],
    thumbnail: string
  ) => UserVersion;
  deleteVersion: (id: string) => void;
  getVersion: (id: string) => UserVersion | undefined;
}

export const useUserStore = create<UserStore>((set, get) => ({
  versions: [],

  load: () => set({ versions: loadUserVersions() }),

  saveCurrent: (templateId, userVersionId, name, aspect, layouts, snapshots, thumbnail) => {
    const now = Date.now();
    let v: UserVersion;
    const existing = userVersionId ? get().versions.find((x) => x.id === userVersionId) : undefined;
    if (existing) {
      v = {
        ...existing,
        name,
        updatedAt: now,
        currentAspect: aspect,
        layouts: JSON.parse(JSON.stringify(layouts)),
        snapshots: JSON.parse(JSON.stringify(snapshots)),
        thumbnail,
      };
    } else {
      v = {
        id: uid('uv_'),
        templateId,
        name,
        createdAt: now,
        updatedAt: now,
        currentAspect: aspect,
        layouts: JSON.parse(JSON.stringify(layouts)),
        snapshots: JSON.parse(JSON.stringify(snapshots)),
        thumbnail,
      };
    }
    const list = existing ? get().versions.map((x) => (x.id === v.id ? v : x)) : [v, ...get().versions];
    saveUserVersions(list);
    set({ versions: list });
    return v;
  },

  deleteVersion: (id) => {
    const list = get().versions.filter((v) => v.id !== id);
    saveUserVersions(list);
    set({ versions: list });
  },

  getVersion: (id) => get().versions.find((v) => v.id === id),
}));
