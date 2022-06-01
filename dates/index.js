/*
 * match-iz
 * v3.7.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var L=Object.create;var M=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty;var E=(t,e)=>{for(var n in e)M(t,n,{get:e[n],enumerable:!0})},S=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of B(e))!_.call(t,a)&&a!==n&&M(t,a,{get:()=>e[a],enumerable:!(r=v(e,a))||r.enumerable});return t};var R=(t,e,n)=>(n=t!=null?L(P(t)):{},S(e||!t||!t.__esModule?M(n,"default",{value:t,enumerable:!0}):n,t)),$=t=>S(M({},"__esModule",{value:!0}),t);var Yt={};E(Yt,{inTheFuture:()=>D.inTheFuture,inTheNext:()=>D.inTheNext,inThePast:()=>D.inThePast,isAM:()=>J,isAfter:()=>Wt,isAfternoon:()=>Ft,isApr:()=>ct,isAug:()=>ut,isBefore:()=>Ot,isDay:()=>k,isDayOfWeek:()=>xt,isDec:()=>Mt,isEvening:()=>At,isFeb:()=>rt,isFri:()=>U,isHour:()=>m,isJan:()=>it,isJul:()=>pt,isJun:()=>Dt,isLeapYear:()=>lt,isMar:()=>at,isMay:()=>gt,isMinute:()=>wt,isMon:()=>C,isMonth:()=>H,isMorning:()=>Tt,isNov:()=>mt,isOct:()=>ft,isPM:()=>bt,isSat:()=>V,isSecond:()=>St,isSep:()=>ht,isSun:()=>z,isThu:()=>Q,isTime:()=>D.isTime,isTue:()=>G,isWed:()=>K,isWeekNumber:()=>yt,isYear:()=>f,nthFri:()=>st,nthMon:()=>Z,nthSat:()=>ot,nthSun:()=>X,nthThu:()=>nt,nthTue:()=>tt,nthWed:()=>et});module.exports=$(Yt);var x=R(require("match-iz"),1),y=require("match-iz/dates/utc");var b=require("match-iz"),o=t=>e=>(0,b.isDate)(e)&&t(e),T=t=>(e,n)=>n===t,F=t=>(e,n,r)=>n===r.length+t;function*p(t,e){for(let n=t;n<=e;n++)yield n}var h=t=>e=>(...n)=>new Date(new Date(t)[`set${e}`](...n));var D=require("match-iz/dates/utc"),{match:d,against:c,when:s}=x,{allOf:l,anyOf:w,every:N,inRange:u,gt:j,lt:q}=x,{isArray:O,isDate:W,isFunction:g,isNumber:i}=x,Y=t=>h(t)("Month")(t.getMonth()+1,0).getDate(),A=t=>{let e=h(t)("Date")(t.getDate()+4-(t.getDay()||7)),n=h(t)("Month")(0,1);return Math.ceil(((e-n)/864e5+1)/7)},[z,C,G,K,Q,U,V]=[...p(0,6)].map(t=>o(e=>e.getDay()===t)),[X,Z,tt,et,nt,st,ot]=[...p(0,6)].map(t=>e=>o(n=>[...p(1,Y(n))].map(h(n)("Date")).filter(r=>r.getDay()===t).filter(e<0?F(e):T(e-1)).filter(l(k(n.getDate()),H(n.getMonth()+1),f(n.getFullYear()))).map(r=>r.getDate()).includes(n.getDate()))),I=t=>o(e=>e.getMonth()===t),[it,rt,at,ct,gt,Dt]=[...p(0,5)].map(I),[pt,ut,ht,ft,mt,Mt]=[...p(6,11)].map(I),k=c(s(g)(t=>o(e=>t(e.getDate()))),s(i)(t=>t<0?o(e=>e.getDate()===Y(e)+t+1):o(e=>e.getDate()===t))),H=c(s(g)(t=>o(e=>t(e.getMonth()+1))),s(i)(t=>o(e=>e.getMonth()===t-1))),f=c(s(g)(t=>o(e=>t(e.getFullYear()))),s(i)(t=>o(e=>e.getFullYear()===t))),lt=o(w(f(t=>t%400===0),l(f(t=>t%4===0),f(t=>t%100!==0)))),xt=c(s(g)(t=>o(e=>t(e.getDay()))),s(i)(t=>o(e=>e.getDay()===t))),yt=c(s(g)(t=>o(e=>t(A(e)))),s(i)(t=>o(e=>A(e)===t))),m=c(s(g)(t=>o(e=>t(e.getHours()))),s(i)(t=>o(e=>e.getHours()===t))),wt=c(s(g)(t=>o(e=>t(e.getMinutes()))),s(i)(t=>o(e=>e.getMinutes()===t))),St=c(s(g)(t=>o(e=>t(e.getSeconds()))),s(i)(t=>o(e=>e.getSeconds()===t))),J=m(u(0,11)),bt=m(u(12,23)),Tt=J,Ft=m(u(12,17)),At=m(u(18,23)),dt=t=>d(t)(s(w(W,i))(e=>new Date(e)),s([i])(([e])=>new Date(e,0,1)),s([i,i])(([e,n])=>new Date(e,n-1,1)),s(l(O,{length:u(3,7)},N(i)))(([e,n,r,...a])=>new Date(e,n-1,r,...a))),Nt=t=>d(t)(s(w(W,i))(e=>new Date(e)),s([i])(([e])=>new Date(e+1,0,0)),s([i,i])(([e,n])=>new Date(e,n,0)),s(l(O,{length:u(3,7)},N(i)))(([e,n,r,...a])=>new Date(e,n-1,r+1,...a))),Ot=t=>(0,y.isTime)(q(dt(t))),Wt=t=>(0,y.isTime)(j(Nt(t)));0&&(module.exports={inTheFuture,inTheNext,inThePast,isAM,isAfter,isAfternoon,isApr,isAug,isBefore,isDay,isDayOfWeek,isDec,isEvening,isFeb,isFri,isHour,isJan,isJul,isJun,isLeapYear,isMar,isMay,isMinute,isMon,isMonth,isMorning,isNov,isOct,isPM,isSat,isSecond,isSep,isSun,isThu,isTime,isTue,isWed,isWeekNumber,isYear,nthFri,nthMon,nthSat,nthSun,nthThu,nthTue,nthWed});
