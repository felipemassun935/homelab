# bandito · homelab portfolio

Portfolio estático del homelab personal "bandito". Construido con Vite + React + TypeScript + Tailwind CSS v4.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [framer-motion](https://www.framer.com/motion/) — animaciones sutiles
- [lucide-react](https://lucide.dev/) — íconos

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo con HMR
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Contenido

Todo el contenido vive en **`src/data/homelab.ts`**:

- `HOST` — specs del servidor físico
- `STATS` — estadísticas del hero
- `SERVICES` — array de servicios con categoría, rol y stack
- `ARCH_DECISIONS` — decisiones arquitectónicas (problema → decisión → por qué)
- `TECH_STACK` — herramientas base
- `ROADMAP` — próximas mejoras

Para agregar o editar un servicio, modificar ese archivo. No hay backend ni base de datos.

## Build para producción

```bash
npm run build
```

Los archivos estáticos quedan en `dist/`.

## Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

O conectar el repositorio en [vercel.com](https://vercel.com) — Vercel detecta Vite automáticamente.

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

O arrastrar la carpeta `dist/` al dashboard de Netlify.

### GitHub Pages

Agregar en `vite.config.ts`:

```ts
export default defineConfig({
  base: "/nombre-del-repo/",
  // ...
})
```

Luego usar [gh-pages](https://github.com/tschaub/gh-pages):

```bash
npm install -D gh-pages
npm run build && npx gh-pages -d dist
```

## Antes de publicar

- Reemplazar los URLs placeholder en `src/components/Footer.tsx` (GitHub y LinkedIn)
- El nombre del tailnet está genericizado como `<tailnet>.ts.net` en `src/data/homelab.ts`
- No incluir secretos, tokens ni contenido de archivos `.env`
