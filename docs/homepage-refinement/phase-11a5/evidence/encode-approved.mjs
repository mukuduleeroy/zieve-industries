import sharp from 'sharp';
import { readFile,writeFile,mkdir,stat } from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='docs/homepage-refinement/phase-11a5';
const all=JSON.parse(await readFile(`${root}/evidence/shortlist.json`,'utf8'));
const ids=['PH02','PH05','PH07-B','PH08','PH10','PH11'];const register=[];
for(const id of ids){let record=all.find(x=>x.id===id);if(id==='PH07-B') record={id,owner:'Edge2Edge Media',source:'https://unsplash.com/photos/silver-and-black-metal-tools-qHhJkxare7A',filename:'solutions/neutral-steel-fasteners.webp',alt:'Silver nuts and bolts arranged on a neutral background. Not a Zieve facility or inventory photograph.',desktop:'50% 50%',mobile:'50% 50%'};
if(id==='PH02'){record.filename='company/industrial-component-detail.webp';record.alt='Large metal component suspended in an industrial workshop. Not a Zieve facility photograph.';record.desktop='50% 50%';record.mobile='50% 50%';}
const master=`/private/tmp/zieve-photo-originals/${id==='PH05'?'PH05-curl':id}.jpg`;const info=await sharp(master).metadata();
// Decode the entire original before publishing any derivative; header metadata alone cannot validate completeness.
await sharp(master).stats();const out=`public/images/industrial/${record.filename}`;await mkdir(out.slice(0,out.lastIndexOf('/')),{recursive:true});
const pipeline=sharp(master).rotate();if(id==='PH02')pipeline.extract({left:700,top:54,width:2800,height:3360});
await pipeline.resize({width:id==='PH02'?1600:1800,withoutEnlargement:true}).webp({quality:82,effort:6}).toFile(out);
const buf=await readFile(out),original=await readFile(master);register.push({...record,sourceFilename:master,originalWidth:info.width,originalHeight:info.height,originalBytes:(await stat(master)).size,originalSha256:createHash('sha256').update(original).digest('hex'),localFilename:out,bytes:buf.length,sha256:createHash('sha256').update(buf).digest('hex'),width:(await sharp(out).metadata()).width,height:(await sharp(out).metadata()).height,status:'Integrated under conditional Stage B authorization; final visual review pending',licenseChecked:'2026-11-17'});
}
await writeFile(`${root}/evidence/stage-b/integrated-images.json`,JSON.stringify(register,null,2)+'\n');
