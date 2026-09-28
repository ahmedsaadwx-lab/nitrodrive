// Downloads the author-published gameplay images for the 4 verified games,
// converts them to 960x600 WebP, and writes attribution to SOURCES.md.
// Run from the project root:  node scripts/fetch-real-thumbnails.mjs
// Requires Node 18+ and `sharp` (already installed with Next.js).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public', 'images', 'games', 'real');

const SOURCES = [
  {
    slug: 'redline',
    url: 'https://raw.githubusercontent.com/victorgalvez56/redline/main/docs/preview.gif',
    repo: 'https://github.com/victorgalvez56/redline',
    author: 'Victor Galvez',
    note: 'README gameplay preview (animated GIF; first frame used)',
  },
  {
    slug: 'gravity-car',
    url: 'https://raw.githubusercontent.com/webdevbyjoss/html5-gravity-car/main/docs/screenshot.png',
    repo: 'https://github.com/webdevbyjoss/html5-gravity-car',
    author: 'Joseph Chereshnovsky',
    note: 'README gameplay screenshot',
  },
  {
    slug: 'outrun',
    url: 'https://i.ibb.co/h7zz1w8/outrun.png',
    repo: 'https://github.com/Gamesflow/Outrun',
    author: 'Gamesflow',
    note: 'README screenshot',
  },
  {
    slug: 'crash-car',
    // Stable form of the README's GitHub-hosted gameplay GIF asset.
    url: 'https://github.com/user-attachments/assets/962313a0-f482-4f10-8ee2-ec9cd290d70e',
    repo: 'https://github.com/varunbudati/Crash_Car',
    author: 'Varun Budati',
    note: 'README gameplay GIF (first frame used)',
  },
];

await mkdir(OUT, { recursive: true });
const done = [];
const failed = [];

for (const s of SOURCES) {
  try {
    const res = await fetch(s.url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf, { animated: false })
      .resize(960, 600, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${s.slug}.webp`));
    done.push(s);
    console.log(`ok      ${s.slug}`);
  } catch (err) {
    failed.push(s);
    console.error(`FAILED  ${s.slug}: ${err.message}  (${s.url})`);
  }
}

const lines = [
  '# Real thumbnail sources',
  '',
  'Images below are author-published gameplay images from each game\'s own MIT-licensed repository.',
  'Keep this file with the images to satisfy attribution.',
  '',
  ...done.map((s) => `- **${s.slug}** — ${s.author}, ${s.repo} (MIT). ${s.note}. Source file: ${s.url}`),
];
await writeFile(path.join(OUT, 'SOURCES.md'), lines.join('\n') + '\n');

if (failed.length) {
  console.error(`\n${failed.length} image(s) failed. Those cards keep their existing SVG thumbnail.`);
  process.exitCode = 1;
}
