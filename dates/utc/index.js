/*
 * match-iz
 * v3.3.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var G=Object.create;var x=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var V=Object.getPrototypeOf,X=Object.prototype.hasOwnProperty;var Z=(t,s)=>{for(var n in s)x(t,n,{get:s[n],enumerable:!0})},w=(t,s,n,T)=>{if(s&&typeof s=="object"||typeof s=="function")for(let u of Q(s))!X.call(t,u)&&u!==n&&x(t,u,{get:()=>s[u],enumerable:!(T=K(s,u))||T.enumerable});return t};var tt=(t,s,n)=>(n=t!=null?G(V(t)):{},w(s||!t||!t.__esModule?x(n,"default",{value:t,enumerable:!0}):n,t)),st=t=>w(x({},"__esModule",{value:!0}),t);var _t={};Z(_t,{inTheFuture:()=>Rt,inTheNext:()=>Rt,inThePast:()=>Pt,isAM:()=>H,isAfternoon:()=>Jt,isApr:()=>ft,isAug:()=>St,isDay:()=>O,isDayOfWeek:()=>Yt,isDec:()=>Nt,isEvening:()=>Lt,isFeb:()=>lt,isFri:()=>gt,isHour:()=>M,isJan:()=>pt,isJul:()=>It,isJun:()=>dt,isLeapYear:()=>Wt,isMar:()=>yt,isMay:()=>wt,isMinute:()=>At,isMon:()=>rt,isMonth:()=>A,isMorning:()=>Et,isNov:()=>kt,isOct:()=>Ft,isPM:()=>vt,isSat:()=>ut,isSecond:()=>Ht,isSep:()=>bt,isSun:()=>it,isThu:()=>Tt,isTime:()=>D,isTue:()=>ct,isWed:()=>at,isWeekNumber:()=>Ot,isYear:()=>m,nthFri:()=>xt,nthMon:()=>mt,nthSat:()=>Dt,nthSun:()=>ht,nthThu:()=>Ut,nthTue:()=>Ct,nthWed:()=>Mt});module.exports=st(_t);var p=tt(require("match-iz"),1);var d=require("match-iz"),i=t=>s=>(0,d.isDate)(s)&&t(s),I=t=>(s,n)=>n===t,S=t=>(s,n,T)=>n===T.length+t;function*g(t,s){for(let n=t;n<=s;n++)yield n}var h=t=>s=>(...n)=>new Date(new Date(t)[`set${s}`](...n));var{match:F,against:c,when:e,otherwise:k}=p,{allOf:N,anyOf:et,inRange:C,gt:nt,lt:ot}=p,{isFunction:a,isNumber:o}=p,W=t=>h(t)("UTCMonth")(t.getUTCMonth()+1,0).getUTCDate(),b=t=>{let s=h(t)("UTCDate")(t.getUTCDate()+4-(t.getUTCDay()||7)),n=h(t)("UTCMonth")(0,1);return Math.ceil(((s-n)/864e5+1)/7)},[it,rt,ct,at,Tt,gt,ut]=[...g(0,6)].map(t=>i(s=>s.getUTCDay()===t)),[ht,mt,Ct,Mt,Ut,xt,Dt]=[...g(0,6)].map(t=>s=>i(n=>[...g(1,W(n))].map(h(n)("UTCDate")).filter(T=>T.getUTCDay()===t).filter(s<0?S(s):I(s-1)).filter(N(O(n.getUTCDate()),A(n.getUTCMonth()+1),m(n.getUTCFullYear()))).map(T=>T.getUTCDate()).includes(n.getUTCDate()))),Y=t=>i(s=>s.getUTCMonth()===t),[pt,lt,yt,ft,wt,dt]=[...g(0,5)].map(Y),[It,St,bt,Ft,kt,Nt]=[...g(6,11)].map(Y),O=c(e(a)(t=>i(s=>t(s.getUTCDate()))),e(o)(t=>t<0?i(s=>s.getUTCDate()===W(s)+t+1):i(s=>s.getUTCDate()===t))),A=c(e(a)(t=>i(s=>t(s.getUTCMonth()+1))),e(o)(t=>i(s=>s.getUTCMonth()===t-1))),m=c(e(a)(t=>i(s=>t(s.getUTCFullYear()))),e(o)(t=>i(s=>s.getUTCFullYear()===t))),Wt=i(et(m(t=>t%400===0),N(m(t=>t%4===0),m(t=>t%100!==0)))),Yt=c(e(a)(t=>i(s=>t(s.getUTCDay()))),e(o)(t=>i(s=>s.getUTCDay()===t))),Ot=c(e(a)(t=>i(s=>t(b(s)))),e(o)(t=>i(s=>b(s)===t))),M=c(e(a)(t=>i(s=>t(s.getUTCHours()))),e(o)(t=>i(s=>s.getUTCHours()===t))),At=c(e(a)(t=>i(s=>t(s.getUTCMinutes()))),e(o)(t=>i(s=>s.getUTCMinutes()===t))),Ht=c(e(a)(t=>i(s=>t(s.getUTCSeconds()))),e(o)(t=>i(s=>s.getUTCSeconds()===t))),H=M(C(0,11)),vt=M(C(12,23)),Et=H,Jt=M(C(12,17)),Lt=M(C(18,23)),D=c(e(a)(t=>i(s=>t(s.getTime()))),e(o)(t=>i(s=>s.getTime()===t))),r=t=>([s])=>{let n=Date.now();return D(C(n,n+s*t))},v=1,l=1e3,y=60*l,f=60*y,U=24*f,E=7*U,J=30*U,L=365*U,P=/^ms|milliseconds?/i,R=/^s|secs?|seconds?/i,_=/^m|mins?|minutes?/i,$=/^h|hours?/i,j=/^d|days?/i,q=/^w|weeks?/i,z=/^mo|months?/i,B=/^y|years?/i,Pt=(...t)=>F(t)(e([])(()=>D(ot(Date.now()))),e([o,P])(r(-v)),e([o,R])(r(-l)),e([o,_])(r(-y)),e([o,$])(r(-f)),e([o,j])(r(-U)),e([o,q])(r(-E)),e([o,z])(r(-J)),e([o,B])(r(-L)),k(()=>{throw new Error("inThePast: invalid arguments")})),Rt=(...t)=>F(t)(e([])(()=>D(nt(Date.now()))),e([o,P])(r(v)),e([o,R])(r(l)),e([o,_])(r(y)),e([o,$])(r(f)),e([o,j])(r(U)),e([o,q])(r(E)),e([o,z])(r(J)),e([o,B])(r(L)),k(()=>{throw new Error("inTheNext/inTheFuture: invalid arguments")}));0&&(module.exports={inTheFuture,inTheNext,inThePast,isAM,isAfternoon,isApr,isAug,isDay,isDayOfWeek,isDec,isEvening,isFeb,isFri,isHour,isJan,isJul,isJun,isLeapYear,isMar,isMay,isMinute,isMon,isMonth,isMorning,isNov,isOct,isPM,isSat,isSecond,isSep,isSun,isThu,isTime,isTue,isWed,isWeekNumber,isYear,nthFri,nthMon,nthSat,nthSun,nthThu,nthTue,nthWed});
