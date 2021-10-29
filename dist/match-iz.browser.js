/*
 * match-iz
 * v1.10.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var N=Object.defineProperty;var W=t=>N(t,"__esModule",{value:!0});var E=(t,n)=>{W(t);for(var o in n)N(t,o,{get:n[o],enumerable:!0})};var d={};E(d,{against:()=>P,allOf:()=>G,anyOf:()=>w,defined:()=>H,empty:()=>A,endsWith:()=>U,falsy:()=>_,gt:()=>J,gte:()=>L,hasOwn:()=>Y,inRange:()=>Q,includedIn:()=>X,includes:()=>V,instanceOf:()=>p,isArray:()=>e,isFunction:()=>i,isNumber:()=>b,isPojo:()=>g,isRegExp:()=>O,isString:()=>f,lt:()=>K,lte:()=>M,match:()=>y,not:()=>D,otherwise:()=>z,pluck:()=>C,spread:()=>$,startsWith:()=>T,truthy:()=>Z,when:()=>B});var S=Object.prototype,F=S.toString,u=t=>n=>typeof n===t,p=t=>n=>n instanceof t,I=t=>F.call(t)==="[object Arguments]",e=Array.isArray,i=u("function"),f=u("string"),b=t=>t===t&&u("number")(t),q=t=>t!==null&&u("object")(t),O=p(RegExp),g=t=>t===null||!q(t)||I(t)?!1:Object.getPrototypeOf(t)===S;function y(t){return(...n)=>P(...n)(t)}var P=(...t)=>{let n;return o=>t.find(s=>{let r=s(o),{matched:j,value:x}=r||{};return[j,x].every(i)?j(o)&&(n=x(o),!0):r&&(n=r)})&&n},z=t=>n=>({matched:()=>!0,value:()=>i(t)?t(n):t}),B=t=>n=>o=>({matched:()=>c(t,o,s=>o=s),value:()=>i(n)?f(o)&&O(t)?n(o.match(t)):n(o):n}),c=(t,n,o)=>g(t)?Object.keys(t).every(s=>c(t[s],n==null?void 0:n[s],o)):e(t)?e(n)?t.length===n.length&&t.every((s,r)=>c(s,n==null?void 0:n[r],o)):t.some(s=>c(s,n,o)):i(t)?t(n,o):f(n)&&O(t)?t.test(n):t===n||[t,n].every(Number.isNaN),C=(...t)=>(n,o)=>t.length===0||(i(t[0])?t[0](n):c(t[0],n,o))?(o(n),!0):!1,D=t=>(n,o)=>!c(t,n,o),w=(...t)=>t.flat(),G=(...t)=>(n,o)=>t.flat().every(s=>c(s,n,o)),A=t=>t!==t||!t&&t!==0&&t!==!1||e(t)&&!t.length||g(t)&&!Object.keys(t).length,H=t=>!A(t),J=t=>m(n=>n>t),K=t=>m(n=>n<t),L=t=>m(n=>n>=t),M=t=>m(n=>n<=t),Q=(t,n)=>m(o=>o>=t&&o<=n),T=t=>R(n=>n.startsWith(t)),U=t=>R(n=>n.endsWith(t)),V=t=>l(n=>n.includes(t)),X=w,Y=(...t)=>n=>g(n)&&(([o,s])=>o.length&&o.every(r=>s.includes(r)))([t.flat(),Object.keys(n)]),Z=t=>!!t,_=t=>!t,$=t=>new Proxy({},{get:()=>t}),R=t=>n=>f(n)&&t(n),m=t=>n=>b(n)&&t(n),l=t=>n=>(e(n)||f(n))&&t(n);return d;})();
