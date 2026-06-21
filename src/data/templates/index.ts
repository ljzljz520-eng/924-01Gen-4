import foodTemplates from './food';
import exploreTemplates from './explore';
import knowledgeTemplates from './knowledge';
import ecommerceTemplates from './ecommerce';
import type { Template, Category } from '@/types';

export const allTemplates: Template[] = [
  ...foodTemplates,
  ...exploreTemplates,
  ...knowledgeTemplates,
  ...ecommerceTemplates,
];

export function getTemplatesByCategory(category: Category | 'all'): Template[] {
  if (category === 'all') return allTemplates;
  return allTemplates.filter((t) => t.category === category);
}

export function getTemplateById(id: string): Template | undefined {
  return allTemplates.find((t) => t.id === id);
}

export function cloneTemplate(tpl: Template): Template {
  return JSON.parse(JSON.stringify(tpl));
}

export * from './food';
export * from './explore';
export * from './knowledge';
export * from './ecommerce';
