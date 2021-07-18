/*
 * match-iz
 * v1.0.4
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var R=(t,s)=>()=>(s||t((s={exports:{}}).exports,s),s.exports);var p=R((Z,O)=>{var f=Object.prototype,c=t=>typeof t,W=f.toString,m=t=>W.call(t)==="[object Arguments]",h=t=>c(t)==="function",b=t=>c(t)==="object"&&t!==null,w=t=>Array.isArray(t),N=t=>t instanceof RegExp,q=t=>c(t)==="string",F=t=>c(t)==="number",k=t=>t===null||!b(t)||m(t)?!1:Object.getPrototypeOf(t)===f;O.exports={isArguments:m,isFunction:h,isObject:b,isArray:w,isRegExp:N,isString:q,isNumber:F,isPojo:k}});var{isFunction:e,isRegExp:A,isPojo:d,isArray:u,isString:i,isNumber:M}=p();function j(...t){let s;return n=>t.find(E=>{let r=E(n),{matched:y,value:g}=r||{};return[y,g].every(e)?y(n)&&(s=g(n),!0):r&&(s=r)})&&s}function z(t){return(...s)=>j(...s)(t)}var B=t=>s=>n=>({matched:()=>S(t,n),value:()=>e(s)?i(n)&&A(t)?s(n.match(t)):s(n):s}),C=t=>s=>e(t)?t(s):t,S=(t,s)=>d(t)?Object.keys(t).every(n=>x(t[n],s[n])):u(t)?t.some(n=>S(n,s)):x(t,s),x=(t,s)=>e(t)?t(s):i(s)&&A(t)?t.test(s):t===s,D=t=>!!t,G=t=>!t&&t!==0||u(t)&&!t.length||d(t)&&!Object.keys(t).length,H=t=>o(s=>s>t),I=t=>o(s=>s<t),J=t=>o(s=>s>=t),K=t=>o(s=>s<=t),L=o((t,s)=>n=>n>=t&&n<=s),Q=t=>P(s=>s.startsWith(t)),T=t=>P(s=>s.endsWith(t)),U=t=>X(s=>s.includes(t)),V=t=>new Proxy({},{get:()=>t});function P(t){return(...s)=>s.every(i)&&t(...s)}function X(t){return(...s)=>s.every(n=>u(n)||i(n))&&t(...s)}function o(t){return(...s)=>s.every(M)&&t(...s)}module.exports={against:j,match:z,defined:D,empty:G,gt:H,lt:I,gte:J,lte:K,inRange:L,startsWith:Q,endsWith:T,includes:U,spread:V,when:B,otherwise:C};
