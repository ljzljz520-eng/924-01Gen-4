import type { UserVersion } from '@/types';

const STORAGE_KEY = 'cover-shop:user-versions';

export function loadUserVersions(): UserVersion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as UserVersion[]) : [];
  } catch {
    return [];
  }
}

export function saveUserVersions(list: UserVersion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Storage error', e);
  }
}

export function upsertUserVersion(version: UserVersion): UserVersion[] {
  const list = loadUserVersions();
  const idx = list.findIndex((v) => v.id === version.id);
  if (idx >= 0) {
    list[idx] = version;
  } else {
    list.unshift(version);
  }
  saveUserVersions(list);
  return list;
}

export function deleteUserVersion(id: string): UserVersion[] {
  const list = loadUserVersions().filter((v) => v.id !== id);
  saveUserVersions(list);
  return list;
}

export function uid(prefix = ''): string {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function formatTime(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
