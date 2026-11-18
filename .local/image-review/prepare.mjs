import sharp from 'sharp';
import {readFile,writeFile,stat,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base=new URL('./',import.meta.url);
const candidates=[
 {id:'earthmoving',file:'earthmoving-adrian-sulyok.jpg',source:'https://unsplash.com/photos/excavator-bucket-dumping-dirt-against-a-blue-sky-KDTd-1lYHrE',original:'https://images.unsplash.com/photo-1768053823555-b75cd4ead6c4?q=95&fm=jpg',author:'Adrian Sulyok',license:'https://unsplash.com/license',terms:'https://unsplash.com/terms',credit:'Adrian Sulyok / Unsplash · sulyokimaging.ro',alt:'Excavator bucket unloading earth against a blue sky. Illustrative stock, not a Zieve project.',ratio:1.6},
 {id:'lubricants',file:'lubrication-connor-lucock.jpg',source:'https://www.pexels.com/photo/industrial-gear-lubrication-process-in-action-28752000/',original:'https://images.pexels.com/photos/28752000/pexels-photo-28752000.jpeg',author:'Connor Lucock',license:'https://www.pexels.com/terms-of-service/',credit:'Connor Lucock / Pexels',alt:'Fluid applied to an industrial metal gear during machining. Illustrative stock, not a Zieve facility.',ratio:1.6,crop:{left:0,top:650,width:4000,height:2500}},
 {id:'civil',file:'civil-jeffrey-eisen.jpg',source:'https://unsplash.com/photos/bridge-construction-over-wide-river-3AapCKPPklQ',original:'https://images.unsplash.com/photo-1786471919740-ef5e4b5504da?q=95&fm=jpg',author:'Jeffrey Eisen',license:'https://unsplash.com/license',terms:'https://unsplash.com/terms',credit:'Jeffrey Eisen / Unsplash',alt:'Bridge infrastructure under construction across a river. Illustrative stock, not a Zieve project.',ratio:4/3},
];
for(const c of candidates){
 const original=new URL(`sources/${c.file}`,base),bytes=await readFile(original),meta=await sharp(bytes).metadata();
 c.originalDimensions=[meta.width,meta.height];c.originalSha256=createHash('sha256').update(bytes).digest('hex');c.acquiredAt=(await stat(original)).mtime.toISOString();
 if(!c.crop){let width=meta.width,height=Math.floor(width/c.ratio);if(height>meta.height){height=meta.height;width=Math.floor(height*c.ratio);}c.crop={left:Math.floor((meta.width-width)/2),top:Math.floor((meta.height-height)/2),width,height};}
 c.assets=[];
 for(const [variant,width]of[['desktop',1600],['mobile',800]]){
  const output=`assets/${c.id}-${variant}.webp`;await sharp(bytes).extract(c.crop).resize({width}).webp({quality:82}).toFile(new URL(output,base).pathname);
  c.assets.push({variant,path:output,bytes:(await stat(new URL(output,base))).size});
 }
 c.status='PRIVATE PREVIEW ONLY — specific image and crop approval required';c.approvedForPlacement=false;
 c.rightsReview='Original publisher copyright licence permits commercial use and modification; selected subject/crop visually checked for prominent marks and identifiable people. No affiliation/endorsement or Zieve ownership implied. No additional release warranty inferred.';
}
await writeFile(new URL('selection.json',base),JSON.stringify({candidates,elution:{status:'Schematic retained: no commercially cleared authentic industrial elution/electrowinning photograph and approved crop found',referenceOnly:'https://s22.q4cdn.com/115151820/files/doc_presentations/2023/09/ar-analyst-site-tour-final.pdf#page=39',referenceRights:'Commercial republication permission unverified; not downloaded or placed in preview.'}},null,2));
for(const file of ['sources/earthmoving-john-kakuk.jpg','sources/earthmoving-konstantin.jpg','sources/earthmoving-vadym.jpg','sources/civil-tolga-durum.jpg','sources/civil-erik-mclean.jpg','earthmoving-konstantin-inspect.jpg','earthmoving-vadym-inspect.jpg','civil-erik-mclean-inspect.jpg','earthmoving-adrian-inspect.jpg','civil-jeffrey-inspect.jpg','lubrication-inspect.jpg'])await unlink(new URL(file,base)).catch(()=>{});
