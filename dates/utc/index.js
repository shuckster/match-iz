/*
 * match-iz
 * v4.0.4
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var ot=Object.create;var p=Object.defineProperty;var it=Object.getOwnPropertyDescriptor;var rt=Object.getOwnPropertyNames;var at=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var Tt=(t,e)=>{for(var n in e)p(t,n,{get:e[n],enumerable:!0})},S=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let T of rt(e))!ct.call(t,T)&&T!==n&&p(t,T,{get:()=>e[T],enumerable:!(a=it(e,T))||a.enumerable});return t};var gt=(t,e,n)=>(n=t!=null?ot(at(t)):{},S(e||!t||!t.__esModule?p(n,"default",{value:t,enumerable:!0}):n,t)),Ct=t=>S(p({},"__esModule",{value:!0}),t);var ee={};Tt(ee,{inDay:()=>et,inDays:()=>Xt,inMonth:()=>nt,inMonths:()=>Zt,inTheFuture:()=>Gt,inTheNext:()=>Gt,inThePast:()=>zt,inYear:()=>st,inYears:()=>te,isAM:()=>R,isAfter:()=>Vt,isAfternoon:()=>jt,isApr:()=>bt,isAug:()=>Wt,isBefore:()=>Qt,isDay:()=>P,isDayOfWeek:()=>Lt,isDec:()=>Et,isEvening:()=>qt,isFeb:()=>It,isFri:()=>lt,isHour:()=>l,isJan:()=>Yt,isJul:()=>Nt,isJun:()=>kt,isLeapYear:()=>Jt,isMar:()=>St,isMay:()=>At,isMinute:()=>Bt,isMon:()=>Dt,isMonth:()=>B,isMorning:()=>$t,isNov:()=>Ht,isOct:()=>vt,isPM:()=>_t,isSat:()=>mt,isSecond:()=>Rt,isSep:()=>Ot,isSun:()=>Ut,isThu:()=>Mt,isTime:()=>D,isTue:()=>ut,isWed:()=>ht,isWeekNumber:()=>Pt,isYear:()=>h,nthFri:()=>dt,nthMon:()=>yt,nthSat:()=>Ft,nthSun:()=>pt,nthThu:()=>ft,nthTue:()=>xt,nthWed:()=>wt});module.exports=Ct(ee);var f=gt(require("match-iz"),1);var b=require("match-iz"),i=t=>e=>(0,b.isDate)(e)&&t(e),A=t=>(e,n)=>n===t,k=t=>(e,n,a)=>n===a.length+t;function*U(t,e){for(let n=t;n<=e;n++)yield n}var u=t=>e=>(...n)=>new Date(new Date(t)[`set${e}`](...n));var{match:y,against:c,when:s,otherwise:W}=f,{allOf:x,anyOf:d,every:O,inRange:C,lt:v,gt:H}=f,{isArray:M,isDate:E,isFunction:g,isNumber:o}=f,J=t=>u(t)("UTCMonth")(t.getUTCMonth()+1,0).getUTCDate(),N=t=>{let e=u(t)("UTCDate")(t.getUTCDate()+4-(t.getUTCDay()||7)),n=u(t)("UTCMonth")(0,1);return Math.ceil(((+e-+n)/864e5+1)/7)},[Ut,Dt,ut,ht,Mt,lt,mt]=[...U(0,6)].map(t=>i(e=>e.getUTCDay()===t)),[pt,yt,xt,wt,ft,dt,Ft]=[...U(0,6)].map(t=>e=>i(n=>[...U(1,J(n))].map(u(n)("UTCDate")).filter(a=>a.getUTCDay()===t).filter(e<0?k(e):A(e-1)).filter(x(P(n.getUTCDate()),B(n.getUTCMonth()+1),h(n.getUTCFullYear()))).map(a=>a.getUTCDate()).includes(n.getUTCDate()))),L=t=>i(e=>e.getUTCMonth()===t),[Yt,It,St,bt,At,kt]=[...U(0,5)].map(L),[Nt,Wt,Ot,vt,Ht,Et]=[...U(6,11)].map(L),P=c(s(g)(t=>i(e=>t(e.getUTCDate()))),s(o)(t=>t<0?i(e=>e.getUTCDate()===J(e)+t+1):i(e=>e.getUTCDate()===t))),B=c(s(g)(t=>i(e=>t(e.getUTCMonth()+1))),s(o)(t=>i(e=>e.getUTCMonth()===t-1))),h=c(s(g)(t=>i(e=>t(e.getUTCFullYear()))),s(o)(t=>i(e=>e.getUTCFullYear()===t))),Jt=i(d(h(t=>t%400===0),x(h(t=>t%4===0),h(t=>t%100!==0)))),Lt=c(s(g)(t=>i(e=>t(e.getUTCDay()))),s(o)(t=>i(e=>e.getUTCDay()===t))),Pt=c(s(g)(t=>i(e=>t(N(e)))),s(o)(t=>i(e=>N(e)===t))),l=c(s(g)(t=>i(e=>t(e.getUTCHours()))),s(o)(t=>i(e=>e.getUTCHours()===t))),Bt=c(s(g)(t=>i(e=>t(e.getUTCMinutes()))),s(o)(t=>i(e=>e.getUTCMinutes()===t))),Rt=c(s(g)(t=>i(e=>t(e.getUTCSeconds()))),s(o)(t=>i(e=>e.getUTCSeconds()===t))),R=l(C(0,11)),_t=l(C(12,23)),$t=R,jt=l(C(12,17)),qt=l(C(18,23)),D=c(s(g)(t=>i(e=>t(e.getTime()))),s(o)(t=>i(e=>e.getTime()===t))),r=t=>([e])=>{let n=Date.now();return D(C(n,n+e*t))},_=1,F=1e3,Y=60*F,I=60*Y,m=24*I,$=7*m,j=30*m,q=365*m,z=/^ms|milliseconds?/i,G=/^s|secs?|seconds?/i,K=/^(m|mins?|minutes?)$/i,Q=/^h|hours?/i,V=/^d|days?/i,X=/^w|weeks?/i,Z=/^mo|months?/i,tt=/^y|years?/i,zt=(...t)=>y(t)(s([])(()=>D(v(Date.now()))),s([o,z])(r(-_)),s([o,G])(r(-F)),s([o,K])(r(-Y)),s([o,Q])(r(-I)),s([o,V])(r(-m)),s([o,X])(r(-$)),s([o,Z])(r(-j)),s([o,tt])(r(-q)),W(()=>{throw new Error("inThePast: invalid arguments")})),Gt=(...t)=>y(t)(s([])(()=>D(H(Date.now()))),s([o,z])(r(_)),s([o,G])(r(F)),s([o,K])(r(Y)),s([o,Q])(r(I)),s([o,V])(r(m)),s([o,X])(r($)),s([o,Z])(r(j)),s([o,tt])(r(q)),W(()=>{throw new Error("inTheNext/inTheFuture: invalid arguments")})),w=t=>y(t)(s(d(E,o))(e=>new Date(e)),s([o])(([e])=>new Date(Date.UTC(e,0,1))),s([o,o])(([e,n])=>new Date(Date.UTC(e,n-1,1))),s(x(M,{length:C(3,7)},O(o)))(([e,n,a,...T])=>new Date(Date.UTC(e,n-1,a,...T)))),Kt=t=>y(t)(s(d(E,o))(e=>new Date(e)),s([o])(([e])=>new Date(Date.UTC(e+1,0,0))),s([o,o])(([e,n])=>new Date(Date.UTC(e,n,0))),s([o,o,o])(([e,n,a])=>new Date(Date.UTC(e,n-1,a))),s(x(M,{length:C(4,7)},O(o)))(([e,n,a,...T])=>new Date(Date.UTC(e,n-1,a,...T)))),Qt=t=>D(v(w(t))),Vt=t=>D(H(Kt(t))),et=t=>{let e=w(t);return i(n=>n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth()&&n.getUTCDate()===e.getUTCDate())},nt=t=>{let e=w(t);return i(n=>n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth())},st=t=>{let e=w(t);return i(n=>n.getUTCFullYear()===e.getUTCFullYear())},Xt=c(s(M)(t=>e=>t.some(n=>et(n)(e)))),Zt=c(s(M)(t=>e=>t.some(n=>nt(n)(e)))),te=c(s(M)(t=>e=>t.some(n=>st(n)(e))));0&&(module.exports={inDay,inDays,inMonth,inMonths,inTheFuture,inTheNext,inThePast,inYear,inYears,isAM,isAfter,isAfternoon,isApr,isAug,isBefore,isDay,isDayOfWeek,isDec,isEvening,isFeb,isFri,isHour,isJan,isJul,isJun,isLeapYear,isMar,isMay,isMinute,isMon,isMonth,isMorning,isNov,isOct,isPM,isSat,isSecond,isSep,isSun,isThu,isTime,isTue,isWed,isWeekNumber,isYear,nthFri,nthMon,nthSat,nthSun,nthThu,nthTue,nthWed});
