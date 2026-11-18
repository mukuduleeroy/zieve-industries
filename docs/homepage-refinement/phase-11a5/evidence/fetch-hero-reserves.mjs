import {writeFile} from 'node:fs/promises';
for(const id of ['31762069','32047997']){const res=await fetch(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=1600`,{signal:AbortSignal.timeout(30000)});if(!res.ok)throw Error(String(res.status));await writeFile(`docs/homepage-refinement/phase-11a5/previews/final-selection/hero-${id}.jpg`,Buffer.from(await res.arrayBuffer()));}
