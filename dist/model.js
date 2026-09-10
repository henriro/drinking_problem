export const HOUR=3600000;
export const grams=d=>d.volume*d.abv/100*0.789;
export function validDrink(d,now=Date.now()){return typeof d.name==='string'&&d.name.trim().length>0&&d.name.length<=100&&Number.isFinite(d.volume)&&d.volume>0&&d.volume<=3000&&Number.isFinite(d.abv)&&d.abv>=0&&d.abv<=96&&Number.isFinite(d.time)&&d.time<=now&&d.time>=now-7*24*HOUR;}
// Instantaneous absorption at completion: deliberately no elimination credit before completion.
// Concentration convention here is g/kg (per mille), not breath alcohol or a legal threshold.
export function curve(drinks,weight,r,beta,now=Date.now()){
 if(!(weight>=35&&weight<=300&&[0.68,0.55].includes(r)))throw Error('Invalid body metrics');
 const ds=[...drinks].sort((a,b)=>a.time-b.time);let bac=0,last=ds[0]?.time??now;const points=[{t:last-0.25*HOUR,b:0}];let zero=null;
 for(const d of ds){if(bac>0&&last+bac/beta*HOUR<d.time)points.push({t:last+bac/beta*HOUR,b:0});bac=Math.max(0,bac-beta*(d.time-last)/HOUR);points.push({t:d.time,b:bac});bac+=grams(d)/(weight*r);points.push({t:d.time,b:bac});last=d.time;}
 if(bac>0){zero=last+bac/beta*HOUR;points.push({t:zero,b:0});}
 return {points,zero,current:Math.max(0,bac-beta*(now-last)/HOUR)};
}
