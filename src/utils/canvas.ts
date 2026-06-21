import type { TemplateConfig, TextConfig, ImageConfig, DecorativeShape, AspectRatio } from '@/types';
import { CANVAS_SIZES } from '@/types';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function applyGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  gradient?: { type: 'linear' | 'radial'; colors: string[]; angle?: number }
): void {
  if (!gradient) return;
  let g: CanvasGradient;
  if (gradient.type === 'radial') {
    g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2);
  } else {
    const angle = (gradient.angle ?? 135) * (Math.PI / 180);
    const x1 = w / 2 - Math.cos(angle) * w;
    const y1 = h / 2 - Math.sin(angle) * h;
    const x2 = w / 2 + Math.cos(angle) * w;
    const y2 = h / 2 + Math.sin(angle) * h;
    g = ctx.createLinearGradient(x1, y1, x2, y2);
  }
  gradient.colors.forEach((c, i) => {
    g.addColorStop(i / Math.max(gradient.colors.length - 1, 1), c);
  });
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawDecorativeShape(ctx: CanvasRenderingContext2D, s: DecorativeShape) {
  ctx.save();
  ctx.globalAlpha = s.opacity;
  ctx.fillStyle = s.color;
  if (s.type === 'rect') {
    if (s.radius) {
      roundRectPath(ctx, s.x, s.y, s.width, s.height, s.radius);
      ctx.fill();
    } else {
      ctx.fillRect(s.x, s.y, s.width, s.height);
    }
    if (s.text) {
      ctx.fillStyle = s.textColor ?? '#FFFFFF';
      ctx.font = `700 ${Math.round(s.height * 0.55)}px "PingFang SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.text, s.x + s.width / 2, s.y + s.height / 2 + 2);
    }
  } else if (s.type === 'circle') {
    ctx.beginPath();
    ctx.arc(s.x + s.width / 2, s.y + s.height / 2, Math.min(s.width, s.height) / 2, 0, Math.PI * 2);
    ctx.fill();
    if (s.text) {
      ctx.fillStyle = s.textColor ?? '#FFFFFF';
      ctx.font = `700 ${Math.round(Math.min(s.width, s.height) * 0.4)}px "PingFang SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.text, s.x + s.width / 2, s.y + s.height / 2 + 2);
    }
  } else if (s.type === 'line') {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.height;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.width, s.y);
    ctx.stroke();
  } else if (s.type === 'badge') {
    const r = s.height / 2;
    roundRectPath(ctx, s.x, s.y, s.width, s.height, r);
    ctx.fill();
    if (s.text) {
      ctx.fillStyle = s.textColor ?? '#FFFFFF';
      ctx.font = `700 ${Math.round(s.height * 0.5)}px "PingFang SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.text, s.x + s.width / 2, s.y + s.height / 2 + 1);
    }
  }
  ctx.restore();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const ch of text) {
    const test = current + ch;
    if (ctx.measureText(test).width > maxWidth && current.length > 0) {
      lines.push(current);
      current = ch;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function drawText(ctx: CanvasRenderingContext2D, t: TextConfig) {
  ctx.save();
  ctx.font = `${t.fontWeight} ${t.fontSize}px ${t.fontFamily}`;
  ctx.textAlign = t.textAlign;
  ctx.textBaseline = 'top';
  const lines = wrapText(ctx, t.content, t.maxWidth);
  lines.forEach((line, i) => {
    const y = t.y + i * t.fontSize * t.lineHeight;
    let x = t.x;
    if (t.textAlign === 'center') x = t.x;
    else if (t.textAlign === 'right') x = t.x;
    if (t.shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
    }
    if (t.strokeColor && t.strokeWidth) {
      ctx.lineJoin = 'round';
      ctx.strokeStyle = t.strokeColor;
      ctx.lineWidth = t.strokeWidth;
      ctx.strokeText(line, x, y);
      ctx.shadowColor = 'transparent';
    }
    ctx.fillStyle = t.color;
    ctx.fillText(line, x, y);
  });
  ctx.restore();
}

async function drawImage(ctx: CanvasRenderingContext2D, img: ImageConfig) {
  if (!img.src) return;
  try {
    const image = await loadImage(img.src);
    ctx.save();
    ctx.globalAlpha = img.opacity;
    const mask = img.maskShape ?? 'none';
    if (mask === 'circle') {
      ctx.beginPath();
      ctx.arc(img.x + img.width / 2, img.y + img.height / 2, Math.min(img.width, img.height) / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (img.borderRadius > 0 || mask === 'rounded') {
      roundRectPath(ctx, img.x, img.y, img.width, img.height, img.borderRadius || 32);
      ctx.clip();
    }
    const srcRatio = image.width / image.height;
    const dstRatio = img.width / img.height;
    let sx = 0, sy = 0, sw = image.width, sh = image.height;
    if (srcRatio > dstRatio) {
      sw = image.height * dstRatio;
      sx = (image.width - sw) / 2;
    } else {
      sh = image.width / dstRatio;
      sy = (image.height - sh) / 2;
    }
    ctx.drawImage(image, sx, sy, sw, sh, img.x, img.y, img.width, img.height);
    ctx.restore();
  } catch (e) {
    // fallback: draw placeholder
    ctx.save();
    ctx.globalAlpha = img.opacity * 0.3;
    ctx.fillStyle = '#CED4DA';
    if (img.borderRadius > 0) {
      roundRectPath(ctx, img.x, img.y, img.width, img.height, img.borderRadius);
      ctx.fill();
    } else {
      ctx.fillRect(img.x, img.y, img.width, img.height);
    }
    ctx.restore();
  }
}

export async function renderCoverToCanvas(
  canvas: HTMLCanvasElement,
  config: TemplateConfig,
  aspect: AspectRatio,
  options?: { autoResize?: boolean }
): Promise<void> {
  const size = CANVAS_SIZES[aspect];
  if (options?.autoResize !== false) {
    canvas.width = size.width;
    canvas.height = size.height;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, size.width, size.height);
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, size.width, size.height);

  if (config.backgroundGradient) {
    applyGradient(ctx, size.width, size.height, config.backgroundGradient);
  }

  const bgImg = config.images.find((i) => i.type === 'background');
  if (bgImg && bgImg.src) {
    await drawImage(ctx, bgImg);
  }

  if (config.overlayColor) {
    ctx.save();
    ctx.fillStyle = config.overlayColor;
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.restore();
  }

  if (config.decorativeShapes) {
    for (const s of config.decorativeShapes) {
      drawDecorativeShape(ctx, s);
    }
  }

  const heroImg = config.images.find((i) => i.type === 'hero');
  if (heroImg) {
    await drawImage(ctx, heroImg);
  }

  for (const t of config.texts) {
    drawText(ctx, t);
  }
}

export function canvasToDataURL(canvas: HTMLCanvasElement, format: 'png' | 'jpeg' = 'png', quality = 0.92): string {
  if (format === 'jpeg') {
    return canvas.toDataURL('image/jpeg', quality);
  }
  return canvas.toDataURL('image/png');
}

export function downloadDataURL(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function generatePreviewThumbnail(config: TemplateConfig, aspect: AspectRatio): Promise<string> {
  return new Promise(async (resolve) => {
    const canvas = document.createElement('canvas');
    const size = CANVAS_SIZES[aspect];
    const scale = 320 / Math.max(size.width, size.height);
    canvas.width = Math.round(size.width * scale);
    canvas.height = Math.round(size.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }
    try {
      const fullCanvas = document.createElement('canvas');
      await renderCoverToCanvas(fullCanvas, config, aspect);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(fullCanvas, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    } catch {
      resolve('');
    }
  });
}
