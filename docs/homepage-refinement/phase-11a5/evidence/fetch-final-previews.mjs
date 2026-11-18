import { writeFile } from 'node:fs/promises';
const dir='docs/homepage-refinement/phase-11a5/previews/final-selection/';
const sources={ 'hero-saravut':'https://images.pexels.com/photos/10410019/pexels-photo-10410019.jpeg?w=1600', 'hero-silhouette':'https://unsplash.com/photos/i2giQxJQ43o/download?force=true', 'spares-neutral':'https://images.unsplash.com/photo-1605701249987-f0bb9b505d06?w=1600&q=85&fm=jpg' };
for(const [name,url] of Object.entries(sources)) {const res=await fetch(url);if(!res.ok)throw Error(`${name}: ${res.status}`);await writeFile(`${dir}${name}.jpg`,Buffer.from(await res.arrayBuffer()));process.stdout.write(`${name}: ${res.url}\n`);}
