import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import fm from 'front-matter';

const root = resolve(import.meta.dir, '..');
const directory = resolve(root, 'src/content/projects');
const slugs = new Set<string>();
const orders = new Set<number>();
let featured = 0;
for (const name of readdirSync(directory).filter(name => name.endsWith('.md'))) {
  const source = readFileSync(resolve(directory, name), 'utf8');
  const { attributes: item } = fm<{ slug: string; title: string; status?: string; featuredOrder?: number; image: string }>(source);
  if (!item.slug || !item.title || slugs.has(item.slug)) throw new Error(`Missing or duplicate project identity: ${name}`);
  slugs.add(item.slug);
  if (item.featuredOrder === undefined) continue;
  if (!Number.isInteger(item.featuredOrder) || item.featuredOrder < 1 || orders.has(item.featuredOrder)) throw new Error(`Invalid featured order: ${name}`);
  if (!item.status) throw new Error(`Featured project needs an explicit status: ${name}`);
  orders.add(item.featuredOrder);
  featured++;
  const localPaths = [item.image, ...[...source.matchAll(/\]\((\/evidence\/[^)]+)\)/g)].map(match => match[1])].filter(path => path.startsWith('/'));
  for (const path of localPaths) if (!existsSync(resolve(root, 'public', path.slice(1)))) throw new Error(`Missing public evidence: ${path}`);
}
if (featured === 0) throw new Error('No featured projects.');
console.log(`Validated ${slugs.size} project identities, ${featured} unique featured positions, explicit featured status, and local evidence paths.`);
