/*
 * match-iz
 * v2.2.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var U=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var Y=(n,e)=>{for(var s in e)U(n,s,{get:e[s],enumerable:!0})},O=(n,e,s,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of b(e))!F.call(n,c)&&c!==s&&U(n,c,{get:()=>e[c],enumerable:!(i=S(e,c))||i.enumerable});return n};var W=n=>O(U({},"__esModule",{value:!0}),n);var Tt={};Y(Tt,{isAM:()=>y,isAfternoon:()=>rt,isApr:()=>z,isAug:()=>Q,isDate:()=>gt,isDay:()=>p,isDayOfWeek:()=>nt,isDec:()=>tt,isEvening:()=>at,isFeb:()=>j,isFri:()=>w,isHour:()=>a,isJan:()=>$,isJul:()=>K,isJun:()=>G,isLeapYear:()=>et,isMar:()=>q,isMay:()=>B,isMinute:()=>u,isMon:()=>H,isMonth:()=>C,isMorning:()=>it,isNov:()=>Z,isOct:()=>X,isPM:()=>ot,isSat:()=>J,isSecond:()=>f,isSep:()=>V,isSun:()=>A,isThu:()=>k,isTime:()=>ct,isTue:()=>I,isWed:()=>N,isWeekNumber:()=>st,isYear:()=>r,nthFri:()=>P,nthMon:()=>d,nthSat:()=>R,nthSun:()=>L,nthThu:()=>E,nthTue:()=>_,nthWed:()=>v});module.exports=W(Tt);var t=require("match-iz");var D=require("match-iz"),o=n=>e=>(0,D.isDate)(e)&&n(e),M=n=>(e,s)=>s===n,h=n=>(e,s,i)=>s===i.length+n;function*g(n,e){for(let s=n;s<=e;s++)yield s}var T=n=>e=>(...s)=>new Date(new Date(n)[`set${e}`](...s));var m=n=>T(n)("UTCMonth")(n.getUTCMonth()+1,0).getUTCDate(),l=n=>{let e=T(n)("UTCDate")(n.getUTCDate()+4-(n.getUTCDay()||7)),s=T(n)("UTCMonth")(0,1);return Math.ceil(((e-s)/864e5+1)/7)},[A,H,I,N,k,w,J]=[...g(0,6)].map(n=>o(e=>e.getUTCDay()===n)),[L,d,_,v,E,P,R]=[...g(0,6)].map(n=>e=>o(s=>[...g(1,m(s))].map(T(s)("UTCDate")).filter(i=>i.getUTCDay()===n).filter(e<0?h(e):M(e-1)).filter((0,t.allOf)(p(s.getUTCDate()),C(s.getUTCMonth()+1),r(s.getUTCFullYear()))).map(i=>i.getUTCDate()).includes(s.getUTCDate()))),x=n=>o(e=>e.getUTCMonth()===n),[$,j,q,z,B,G]=[...g(0,5)].map(x),[K,Q,V,X,Z,tt]=[...g(6,11)].map(x),p=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCDate()))),(0,t.when)(t.isNumber)(n=>n<0?o(e=>e.getUTCDate()===m(e)+n+1):o(e=>e.getUTCDate()===n))),C=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCMonth()+1))),(0,t.when)(t.isNumber)(n=>o(e=>e.getUTCMonth()===n-1))),r=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCFullYear()))),(0,t.when)(t.isNumber)(n=>o(e=>e.getUTCFullYear()===n))),et=o((0,t.anyOf)(r(n=>n%400===0),(0,t.allOf)(r(n=>n%4===0),r(n=>n%100!==0)))),nt=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCDay()))),(0,t.when)(t.isNumber)(n=>o(e=>e.getUTCDay()===n))),st=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(l(e)))),(0,t.when)(t.isNumber)(n=>o(e=>l(e)===n))),a=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCHours()))),(0,t.when)(t.isNumber)(n=>o(e=>e.getUTCHours()===n))),u=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCMinutes()))),(0,t.when)(t.isNumber)(n=>o(e=>e.getUTCMinutes()===n))),f=(0,t.against)((0,t.when)(t.isFunction)(n=>o(e=>n(e.getUTCSeconds()))),(0,t.when)(t.isNumber)(n=>o(e=>e.getUTCSeconds()===n))),y=a((0,t.inRange)(0,11)),ot=a((0,t.inRange)(12,23)),it=y,rt=a((0,t.inRange)(12,17)),at=a((0,t.inRange)(18,23)),gt=(...n)=>(0,t.match)(n)((0,t.when)([t.isFunction])(e=>o(s=>e(s.getFullYear(),s.getMonth()+1,s.getDate()))),(0,t.when)([t.isNumber,t.isNumber,t.isNumber])(([e,s,i])=>(0,t.allOf)(r(e),C(s),p(i))),(0,t.when)([t.isNumber,t.isNumber])(([e,s])=>(0,t.allOf)(r(e),C(s))),(0,t.when)([t.isNumber])(([e])=>r(e))),ct=(...n)=>(0,t.match)(n)((0,t.when)([t.isFunction])(e=>o(s=>e(s.getHours(),s.getMinutes(),s.getSeconds()))),(0,t.when)([t.isNumber,t.isNumber,t.isNumber])(([e,s,i])=>(0,t.allOf)(a(e),u(s),f(i))),(0,t.when)([t.isNumber,t.isNumber])(([e,s])=>(0,t.allOf)(a(e),u(s))),(0,t.when)([t.isNumber])(([e])=>a(e)));0&&(module.exports={isAM,isAfternoon,isApr,isAug,isDate,isDay,isDayOfWeek,isDec,isEvening,isFeb,isFri,isHour,isJan,isJul,isJun,isLeapYear,isMar,isMay,isMinute,isMon,isMonth,isMorning,isNov,isOct,isPM,isSat,isSecond,isSep,isSun,isThu,isTime,isTue,isWed,isWeekNumber,isYear,nthFri,nthMon,nthSat,nthSun,nthThu,nthTue,nthWed});