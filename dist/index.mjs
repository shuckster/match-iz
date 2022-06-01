/*
 * match-iz
 * v3.7.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var d=Object.defineProperty;var w=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var P=(t,n)=>{var o={};for(var s in t)I.call(t,s)&&n.indexOf(s)<0&&(o[s]=t[s]);if(t!=null&&w)for(var s of w(t))n.indexOf(s)<0&&q.call(t,s)&&(o[s]=t[s]);return o};var v=(t,n)=>{for(var o in n)d(t,o,{get:n[o],enumerable:!0})};var l={};v(l,{instanceOf:()=>b,isArguments:()=>A,isArray:()=>B,isDate:()=>C,isFunction:()=>G,isNumber:()=>J,isObject:()=>D,isPojo:()=>L,isRegExp:()=>K,isString:()=>H});var W=Object.prototype,z=W.toString,m=t=>n=>typeof n===t,b=t=>n=>n instanceof t,{isArray:B}=Array,A=t=>z.call(t)==="[object Arguments]",C=t=>b(Date)(t)&&!isNaN(t),G=m("function"),H=m("string"),J=t=>t===t&&m("number")(t),D=t=>t!==null&&m("object")(t),K=b(RegExp),L=t=>t===null||!D(t)||A(t)?!1:Object.getPrototypeOf(t)===W;var{isArray:c,isDate:Z,isFunction:i,isNumber:M}=l,{isPojo:N,isRegExp:F,isString:O,instanceOf:_}=l;function $(t){return(...n)=>Q(...n)(t)}var Q=(...t)=>{let n;return o=>t.find(s=>{let r=s(o),{matched:g,value:u}=r||{};return[g,u].every(i)?g(o)&&(n=u(o),!0):r&&(n=r)})&&n},h=t=>n=>({matched:()=>!0,value:()=>i(t)?t(n):t}),x=t=>n=>o=>({matched:()=>e(t,o,s=>o=s),value:()=>i(n)?O(o)&&F(t)?n(...T(o.match(t))):n(o):n}),y=(...t)=>{if(t.length===1){let[n]=t;return x(n)}if(t.length===2){let[n,o]=t;return x(n)(o)}if(t.length>2){let n=t.slice(-1)[0],o=t.slice(0,-1);return x(V(o))(n)}throw new Error("expected 1 or 2 arguments")},T=t=>{let{groups:n}=t;return n?[n,t]:[t]},e=(t,n,o)=>N(t)?Object.keys(t).every(s=>e(t[s],n==null?void 0:n[s],o)):c(t)?c(n)&&t.length===n.length&&t.every((s,r)=>e(s,n==null?void 0:n[r],o)):i(t)?t(n,o):O(n)&&F(t)?t.test(n):t===n||[t,n].every(Number.isNaN),k=(...t)=>(n,o)=>t.length===0||(i(t[0])?t[0](n):e(t[0],n,o))?(o(n),!0):!1,a=t=>(n,o)=>!e(t,n,o),U=(...t)=>(n,o)=>t.flat().some(s=>e(s,n,o)),V=(...t)=>(n,o)=>t.flat().every(s=>e(s,n,o)),tt=t=>R(n=>n.every(o=>e(t,o))),nt=t=>R(n=>n.some(o=>e(t,o))),ot=(...t)=>j((n,o)=>t.length<=n.length&&e(t,n.slice(0,t.length),o)),st=(...t)=>j((n,o)=>t.length<=n.length&&e(t,n.slice(n.length-t.length),o)),X=t=>t!==t||!t&&t!==0&&t!==!1||c(t)&&!t.length||N(t)&&!Object.keys(t).length,et=t=>!X(t),rt=t=>f(n=>n>t),it=t=>f(n=>n<t),ct=t=>f(n=>n>=t),ft=t=>f(n=>n<=t),gt=(t,n)=>f(o=>o>=Math.min(t,n)&&o<=Math.max(t,n)),ut=t=>E(n=>n.startsWith(t)),mt=t=>E(n=>n.endsWith(t)),lt=t=>j(n=>n.includes(t)),Ot=U,pt=t=>n=>n===t,bt=(...t)=>n=>N(n)&&(([o,s])=>o.length&&o.every(r=>s.includes(r)))([t.flat(),Object.keys(n)]),xt=o=>{var s=o,{getValue:t}=s,n=P(s,["getValue"]);return Object.entries(n).reduce((r,[g,u])=>Object.assign(r,{[g]:p=>S=>({matched:()=>u(S),value:()=>i(p)?p(t(S)):p})}),{})},Nt=t=>!!t,jt=t=>!t,St=t=>new Proxy({},{get:()=>t}),E=t=>n=>O(n)&&t(n),f=t=>n=>M(n)&&t(n),R=t=>(n,o)=>c(n)&&t(n,o),j=t=>(n,o)=>(c(n)||O(n))&&t(n,o);export{Q as against,V as allOf,U as anyOf,xt as cata,et as defined,X as empty,mt as endsWith,tt as every,jt as falsy,ot as firstOf,rt as gt,ct as gte,bt as hasOwn,gt as inRange,Ot as includedIn,lt as includes,_ as instanceOf,c as isArray,Z as isDate,i as isFunction,M as isNumber,N as isPojo,F as isRegExp,pt as isStrictly,O as isString,st as lastOf,it as lt,ft as lte,$ as match,a as not,h as otherwise,k as pluck,nt as some,St as spread,ut as startsWith,Nt as truthy,y as when};
