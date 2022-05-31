/*
 * match-iz
 * v3.6.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var x=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames,W=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,K=Object.prototype.propertyIsEnumerable;var D=(t,n)=>{var o={};for(var e in t)A.call(t,e)&&n.indexOf(e)<0&&(o[e]=t[e]);if(t!=null&&W)for(var e of W(t))n.indexOf(e)<0&&K.call(t,e)&&(o[e]=t[e]);return o};var F=(t,n)=>{for(var o in n)x(t,o,{get:n[o],enumerable:!0})},L=(t,n,o,e)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of J(n))!A.call(t,s)&&s!==o&&x(t,s,{get:()=>n[s],enumerable:!(e=H(n,s))||e.enumerable});return t};var M=t=>L(x({},"__esModule",{value:!0}),t);var Wt={};F(Wt,{against:()=>q,allOf:()=>z,anyOf:()=>v,cata:()=>jt,defined:()=>ct,empty:()=>B,endsWith:()=>pt,every:()=>et,falsy:()=>St,firstOf:()=>rt,gt:()=>ft,gte:()=>ut,hasOwn:()=>Nt,inRange:()=>Ot,includedIn:()=>xt,includes:()=>bt,instanceOf:()=>h,isArray:()=>c,isDate:()=>$,isFunction:()=>i,isNumber:()=>I,isPojo:()=>p,isRegExp:()=>w,isString:()=>f,lastOf:()=>it,lt:()=>gt,lte:()=>mt,match:()=>y,not:()=>ot,otherwise:()=>k,pluck:()=>nt,some:()=>st,spread:()=>Pt,startsWith:()=>lt,truthy:()=>wt,when:()=>a});module.exports=M(Wt);var l={};F(l,{instanceOf:()=>N,isArguments:()=>R,isArray:()=>T,isDate:()=>U,isFunction:()=>V,isNumber:()=>Y,isObject:()=>d,isPojo:()=>_,isRegExp:()=>Z,isString:()=>X});var E=Object.prototype,Q=E.toString,O=t=>n=>typeof n===t,N=t=>n=>n instanceof t,{isArray:T}=Array,R=t=>Q.call(t)==="[object Arguments]",U=t=>N(Date)(t)&&!isNaN(t),V=O("function"),X=O("string"),Y=t=>t===t&&O("number")(t),d=t=>t!==null&&O("object")(t),Z=N(RegExp),_=t=>t===null||!d(t)||R(t)?!1:Object.getPrototypeOf(t)===E;var{isArray:c,isDate:$,isFunction:i,isNumber:I}=l,{isPojo:p,isRegExp:w,isString:f,instanceOf:h}=l;function y(t){return(...n)=>q(...n)(t)}var q=(...t)=>{let n;return o=>t.find(e=>{let s=e(o),{matched:u,value:m}=s||{};return[u,m].every(i)?u(o)&&(n=m(o),!0):s&&(n=s)})&&n},k=t=>n=>({matched:()=>!0,value:()=>i(t)?t(n):t}),j=t=>n=>o=>({matched:()=>r(t,o,e=>o=e),value:()=>i(n)?f(o)&&w(t)?n(...tt(o.match(t))):n(o):n}),a=(...t)=>{if(t.length===1){let[n]=t;return j(n)}if(t.length===2){let[n,o]=t;return j(n)(o)}if(t.length>2){let n=t.slice(-1)[0],o=t.slice(0,-1);return j(z(o))(n)}throw new Error("expected 1 or 2 arguments")},tt=t=>{let{groups:n}=t;return n?[n,t]:[t]},r=(t,n,o)=>p(t)?Object.keys(t).every(e=>r(t[e],n==null?void 0:n[e],o)):c(t)?c(n)&&t.length===n.length&&t.every((e,s)=>r(e,n==null?void 0:n[s],o)):i(t)?t(n,o):f(n)&&w(t)?t.test(n):t===n||[t,n].every(Number.isNaN),nt=(...t)=>(n,o)=>t.length===0||(i(t[0])?t[0](n):r(t[0],n,o))?(o(n),!0):!1,ot=t=>(n,o)=>!r(t,n,o),v=(...t)=>(n,o)=>t.flat().some(e=>r(e,n,o)),z=(...t)=>(n,o)=>t.flat().every(e=>r(e,n,o)),et=t=>G(n=>n.every(o=>r(t,o))),st=t=>G(n=>n.some(o=>r(t,o))),rt=(...t)=>S((n,o)=>t.length<=n.length&&r(t,n.slice(0,t.length),o)),it=(...t)=>S((n,o)=>t.length<=n.length&&r(t,n.slice(n.length-t.length),o)),B=t=>t!==t||!t&&t!==0&&t!==!1||c(t)&&!t.length||p(t)&&!Object.keys(t).length,ct=t=>!B(t),ft=t=>g(n=>n>t),gt=t=>g(n=>n<t),ut=t=>g(n=>n>=t),mt=t=>g(n=>n<=t),Ot=(t,n)=>g(o=>o>=Math.min(t,n)&&o<=Math.max(t,n)),lt=t=>C(n=>n.startsWith(t)),pt=t=>C(n=>n.endsWith(t)),bt=t=>S(n=>n.includes(t)),xt=v,Nt=(...t)=>n=>p(n)&&(([o,e])=>o.length&&o.every(s=>e.includes(s)))([t.flat(),Object.keys(n)]),jt=o=>{var e=o,{getValue:t}=e,n=D(e,["getValue"]);return Object.entries(n).reduce((s,[u,m])=>Object.assign(s,{[u]:b=>P=>({matched:()=>m(P),value:()=>i(b)?b(t(P)):b})}),{})},wt=t=>!!t,St=t=>!t,Pt=t=>new Proxy({},{get:()=>t}),C=t=>n=>f(n)&&t(n),g=t=>n=>I(n)&&t(n),G=t=>(n,o)=>c(n)&&t(n,o),S=t=>(n,o)=>(c(n)||f(n))&&t(n,o);0&&(module.exports={against,allOf,anyOf,cata,defined,empty,endsWith,every,falsy,firstOf,gt,gte,hasOwn,inRange,includedIn,includes,instanceOf,isArray,isDate,isFunction,isNumber,isPojo,isRegExp,isString,lastOf,lt,lte,match,not,otherwise,pluck,some,spread,startsWith,truthy,when});
