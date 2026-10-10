// next/image paints this as the img background and removes it once the photo loads.
export function skeleton({ width, height }: { width: number; height: number }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g"><stop offset="0" stop-color="#e8eeeb" stop-opacity="0"/><stop offset=".5" stop-color="#f7faf8"/><stop offset="1" stop-color="#e8eeeb" stop-opacity="0"/></linearGradient></defs><style>.s{animation:m 1.4s ease-in-out infinite}@keyframes m{from{transform:translateX(-${width}px)}to{transform:translateX(${width}px)}}@media (prefers-reduced-motion:reduce){.s{animation:none;opacity:0}}</style><rect width="${width}" height="${height}" fill="#e8eeeb"/><rect class="s" width="${width}" height="${height}" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}` as const;
}
