import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const dir='/private/tmp/zieve-photo-originals';await mkdir(dir,{recursive:true});
const shortlist=JSON.parse(await readFile('docs/homepage-refinement/phase-11a5/evidence/shortlist.json','utf8'));
const items=shortlist.filter(x=>['PH02','PH03','PH05','PH08','PH09','PH10','PH11'].includes(x.id));
items.push({id:'PH07-B',source:'https://unsplash.com/photos/silver-and-black-metal-tools-qHhJkxare7A',original:'https://images.unsplash.com/photo-1605701249987-f0bb9b505d06',owner:'Edge2Edge Media'});
items.push({id:'HERO-A',source:'https://unsplash.com/photos/a-silhouette-of-an-excavator-against-a-sunset-sky-i2giQxJQ43o',original:'https://images.unsplash.com/photo-1653315919118-9122a6896706',owner:'Matt Seymour'});
items.push({id:'HERO-B',source:'https://www.pexels.com/photo/yellow-and-black-heavy-equipment-at-the-site-during-sunset-10410019/',original:'https://images.pexels.com/photos/10410019/pexels-photo-10410019.jpeg',owner:'saravut vanset'});
const results=[];
await Promise.allSettled(items.map(async(item)=>{const path=`${dir}/${item.id}.jpg`;let buf;try{buf=await readFile(path);}catch{const response=await fetch(item.original+(item.original.includes('unsplash')?`?w=${item.width||6000}&fm=jpg&q=85&cs=srgb`:''),{signal:AbortSignal.timeout(45000)});if(!response.ok)throw Error(`${item.id} ${response.status}`);buf=Buffer.from(await response.arrayBuffer());await writeFile(path,buf);}
const meta=await sharp(buf).metadata();results.push({id:item.id,source:item.source,download:item.original,owner:item.owner,path,bytes:buf.length,width:meta.width,height:meta.height,format:meta.format,sha256:createHash('sha256').update(buf).digest('hex'),checked:new Date().toISOString()});
if(['PH07-B','HERO-A'].includes(item.id))await sharp(buf).resize({width:1600,withoutEnlargement:true}).jpeg({quality:85}).toFile(`docs/homepage-refinement/phase-11a5/previews/final-selection/${item.id}.jpg`);
process.stdout.write(`${item.id} ${meta.width}x${meta.height} ${buf.length}\n`); }));
await writeFile('docs/homepage-refinement/phase-11a5/evidence/stage-b/original-downloads.json',JSON.stringify(results,null,2)+'\n');
