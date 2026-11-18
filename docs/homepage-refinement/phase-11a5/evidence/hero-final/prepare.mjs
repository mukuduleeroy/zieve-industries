import sharp from 'sharp';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const original='/private/tmp/zieve-photo-originals/PH01-R1-original.jpg';
await sharp(original).stats();const metadata=await sharp(original).metadata();if(metadata.width!==3648||metadata.height!==2736)throw Error('Unexpected original dimensions');
const out='public/images/industrial/hero';await mkdir(out,{recursive:true});
const assets=[];
for(const [name,crop,width] of [
 ['sunrise-excavator-desktop',{left:0,top:650,width:2600,height:1463},2600],
 ['sunrise-excavator-mobile-focus',{left:1350,top:0,width:1100,height:1750},1000],
]){
const path=`${out}/${name}.webp`;await sharp(original).extract(crop).resize({width,withoutEnlargement:true}).webp({quality:83,effort:6}).toFile(path);const data=await readFile(path),info=await sharp(path).metadata();assets.push({path,crop,width:info.width,height:info.height,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});}
const data=await readFile(original);
await writeFile('docs/homepage-refinement/phase-11a5/evidence/hero-final/acquisition.json',JSON.stringify({placement:'PH01',selection:'R1',photographer:'Metehan Özaras',source:'https://www.pexels.com/photo/silhouette-of-excavator-at-sunrise-11562423/',download:'https://images.pexels.com/photos/11562423/pexels-photo-11562423.jpeg?cs=srgb&dl=pexels-metehan-11562423.jpg&fm=jpg',license:'https://www.pexels.com/license/',terms:'https://www.pexels.com/terms-of-service/',acquired:new Date().toISOString(),localOriginal:original,originalWidth:metadata.width,originalHeight:metadata.height,originalBytes:data.length,originalSha256:createHash('sha256').update(data).digest('hex'),commercialUse:'Combined generic industrial website hero; source-specific Free link and detailed terms verified; no prominent marks or identifiable people observed. No Zieve ownership/endorsement claim.',downloadPermitted:true,modificationPermitted:true,attributionRequired:false,credit:'Visible photographer / Pexels credit in existing hero caption',mirrored:false,assets},null,2)+'\n');
