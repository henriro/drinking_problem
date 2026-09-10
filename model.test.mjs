import test from 'node:test';import assert from 'node:assert/strict';import {curve,grams,validDrink,HOUR} from './dist/model.js';
const now=Date.now(),drink=(time,abv=5)=>({name:'Test',volume:500,abv,time});
test('ethanol conversion and one-drink Widmark calculation',()=>{const d=drink(now);assert.equal(grams(d),19.725);const c=curve([d],75,.68,.15,now);assert.ok(Math.abs(c.current-19.725/(75*.68))<1e-10);assert.ok(Math.abs(c.zero-now-c.current/.15*HOUR)<1);});
test('long gaps do not give negative BAC credit to later drinks',()=>{const c=curve([drink(now-24*HOUR),drink(now)],75,.68,.15,now);assert.equal(c.current,curve([drink(now)],75,.68,.15,now).current);});
test('midnight and unsorted entries preserve chronology',()=>{const t=new Date('2026-09-10T23:40:00Z').getTime();assert.deepEqual(curve([drink(t+HOUR),drink(t)],75,.68,.15,t+2*HOUR),curve([drink(t),drink(t+HOUR)],75,.68,.15,t+2*HOUR));});
test('slower elimination gives later zero and zero BAC is clamped',()=>{assert.ok(curve([drink(now)],75,.68,.1,now).zero>curve([drink(now)],75,.68,.2,now).zero);assert.equal(curve([drink(now-24*HOUR)],75,.68,.15,now).current,0);});
test('zero ABV and missing metrics',()=>{assert.equal(curve([drink(now,0)],75,.68,.15,now).zero,null);assert.throws(()=>curve([],0,.68,.15));});
test('invalid and future drink inputs rejected',()=>{assert.ok(validDrink(drink(now),now));assert.ok(!validDrink(drink(now+HOUR),now));assert.ok(!validDrink({...drink(now),volume:-10},now));assert.ok(!validDrink({...drink(now),abv:100},now));assert.ok(!validDrink({...drink(now),name:' '},now));});
