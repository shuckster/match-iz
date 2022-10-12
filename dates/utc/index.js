/*
 * match-iz
 * v3.9.2
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var tt=Object.create;var p=Object.defineProperty;var et=Object.getOwnPropertyDescriptor;var st=Object.getOwnPropertyNames;var nt=Object.getPrototypeOf,ot=Object.prototype.hasOwnProperty;var it=(t,e)=>{for(var n in e)p(t,n,{get:e[n],enumerable:!0})},S=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of st(e))!ot.call(t,c)&&c!==n&&p(t,c,{get:()=>e[c],enumerable:!(a=et(e,c))||a.enumerable});return t};var rt=(t,e,n)=>(n=t!=null?tt(nt(t)):{},S(e||!t||!t.__esModule?p(n,"default",{value:t,enumerable:!0}):n,t)),at=t=>S(p({},"__esModule",{value:!0}),t);var Kt={};it(Kt,{inTheFuture:()=>$t,inTheNext:()=>$t,inThePast:()=>_t,isAM:()=>B,isAfter:()=>Gt,isAfternoon:()=>Bt,isApr:()=>It,isAug:()=>At,isBefore:()=>zt,isDay:()=>L,isDayOfWeek:()=>vt,isDec:()=>Yt,isEvening:()=>Rt,isFeb:()=>ft,isFri:()=>Ut,isHour:()=>m,isJan:()=>yt,isJul:()=>Ft,isJun:()=>bt,isLeapYear:()=>Ot,isMar:()=>dt,isMay:()=>St,isMinute:()=>Et,isMon:()=>Tt,isMonth:()=>P,isMorning:()=>Pt,isNov:()=>Wt,isOct:()=>Nt,isPM:()=>Lt,isSat:()=>ht,isSecond:()=>Jt,isSep:()=>kt,isSun:()=>ct,isThu:()=>Ct,isTime:()=>U,isTue:()=>Dt,isWed:()=>gt,isWeekNumber:()=>Ht,isYear:()=>u,nthFri:()=>lt,nthMon:()=>mt,nthSat:()=>wt,nthSun:()=>ut,nthThu:()=>xt,nthTue:()=>Mt,nthWed:()=>pt});module.exports=at(Kt);var w=rt(require("match-iz"),1);var b=require("match-iz"),i=t=>e=>(0,b.isDate)(e)&&t(e),F=t=>(e,n)=>n===t,A=t=>(e,n,a)=>n===a.length+t;function*C(t,e){for(let n=t;n<=e;n++)yield n}var h=t=>e=>(...n)=>new Date(new Date(t)[`set${e}`](...n));var{match:x,against:T,when:s,otherwise:N}=w,{allOf:l,anyOf:y,every:W,inRange:g,lt:Y,gt:O}=w,{isArray:v,isDate:H,isFunction:D,isNumber:o}=w,E=t=>h(t)("UTCMonth")(t.getUTCMonth()+1,0).getUTCDate(),k=t=>{let e=h(t)("UTCDate")(t.getUTCDate()+4-(t.getUTCDay()||7)),n=h(t)("UTCMonth")(0,1);return Math.ceil(((e-n)/864e5+1)/7)},[ct,Tt,Dt,gt,Ct,Ut,ht]=[...C(0,6)].map(t=>i(e=>e.getUTCDay()===t)),[ut,mt,Mt,pt,xt,lt,wt]=[...C(0,6)].map(t=>e=>i(n=>[...C(1,E(n))].map(h(n)("UTCDate")).filter(a=>a.getUTCDay()===t).filter(e<0?A(e):F(e-1)).filter(l(L(n.getUTCDate()),P(n.getUTCMonth()+1),u(n.getUTCFullYear()))).map(a=>a.getUTCDate()).includes(n.getUTCDate()))),J=t=>i(e=>e.getUTCMonth()===t),[yt,ft,dt,It,St,bt]=[...C(0,5)].map(J),[Ft,At,kt,Nt,Wt,Yt]=[...C(6,11)].map(J),L=T(s(D)(t=>i(e=>t(e.getUTCDate()))),s(o)(t=>t<0?i(e=>e.getUTCDate()===E(e)+t+1):i(e=>e.getUTCDate()===t))),P=T(s(D)(t=>i(e=>t(e.getUTCMonth()+1))),s(o)(t=>i(e=>e.getUTCMonth()===t-1))),u=T(s(D)(t=>i(e=>t(e.getUTCFullYear()))),s(o)(t=>i(e=>e.getUTCFullYear()===t))),Ot=i(y(u(t=>t%400===0),l(u(t=>t%4===0),u(t=>t%100!==0)))),vt=T(s(D)(t=>i(e=>t(e.getUTCDay()))),s(o)(t=>i(e=>e.getUTCDay()===t))),Ht=T(s(D)(t=>i(e=>t(k(e)))),s(o)(t=>i(e=>k(e)===t))),m=T(s(D)(t=>i(e=>t(e.getUTCHours()))),s(o)(t=>i(e=>e.getUTCHours()===t))),Et=T(s(D)(t=>i(e=>t(e.getUTCMinutes()))),s(o)(t=>i(e=>e.getUTCMinutes()===t))),Jt=T(s(D)(t=>i(e=>t(e.getUTCSeconds()))),s(o)(t=>i(e=>e.getUTCSeconds()===t))),B=m(g(0,11)),Lt=m(g(12,23)),Pt=B,Bt=m(g(12,17)),Rt=m(g(18,23)),U=T(s(D)(t=>i(e=>t(e.getTime()))),s(o)(t=>i(e=>e.getTime()===t))),r=t=>([e])=>{let n=Date.now();return U(g(n,n+e*t))},R=1,f=1e3,d=60*f,I=60*d,M=24*I,_=7*M,$=30*M,j=365*M,q=/^ms|milliseconds?/i,z=/^s|secs?|seconds?/i,G=/^m|mins?|minutes?/i,K=/^h|hours?/i,Q=/^d|days?/i,V=/^w|weeks?/i,X=/^mo|months?/i,Z=/^y|years?/i,_t=(...t)=>x(t)(s([])(()=>U(Y(Date.now()))),s([o,q])(r(-R)),s([o,z])(r(-f)),s([o,G])(r(-d)),s([o,K])(r(-I)),s([o,Q])(r(-M)),s([o,V])(r(-_)),s([o,X])(r(-$)),s([o,Z])(r(-j)),N(()=>{throw new Error("inThePast: invalid arguments")})),$t=(...t)=>x(t)(s([])(()=>U(O(Date.now()))),s([o,q])(r(R)),s([o,z])(r(f)),s([o,G])(r(d)),s([o,K])(r(I)),s([o,Q])(r(M)),s([o,V])(r(_)),s([o,X])(r($)),s([o,Z])(r(j)),N(()=>{throw new Error("inTheNext/inTheFuture: invalid arguments")})),jt=t=>x(t)(s(y(H,o))(e=>new Date(e)),s([o])(([e])=>new Date(Date.UTC(e,0,1))),s([o,o])(([e,n])=>new Date(Date.UTC(e,n-1,1))),s(l(v,{length:g(3,7)},W(o)))(([e,n,a,...c])=>new Date(Date.UTC(e,n-1,a,...c)))),qt=t=>x(t)(s(y(H,o))(e=>new Date(e)),s([o])(([e])=>new Date(Date.UTC(e+1,0,0))),s([o,o])(([e,n])=>new Date(Date.UTC(e,n,0))),s([o,o,o])(([e,n,a])=>new Date(Date.UTC(e,n-1,a))),s(l(v,{length:g(4,7)},W(o)))(([e,n,a,...c])=>new Date(Date.UTC(e,n-1,a,...c)))),zt=t=>U(Y(jt(t))),Gt=t=>U(O(qt(t)));0&&(module.exports={inTheFuture,inTheNext,inThePast,isAM,isAfter,isAfternoon,isApr,isAug,isBefore,isDay,isDayOfWeek,isDec,isEvening,isFeb,isFri,isHour,isJan,isJul,isJun,isLeapYear,isMar,isMay,isMinute,isMon,isMonth,isMorning,isNov,isOct,isPM,isSat,isSecond,isSep,isSun,isThu,isTime,isTue,isWed,isWeekNumber,isYear,nthFri,nthMon,nthSat,nthSun,nthThu,nthTue,nthWed});
