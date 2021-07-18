/*
 * match-iz
 * v1.0.2
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var g=(t,s)=>()=>(s||t((s={exports:{}}).exports,s),s.exports);var A=g((X,p)=>{var f=Object.prototype,e=t=>typeof t,W=f.toString,m=t=>W.call(t)==="[object Arguments]",a=t=>e(t)==="function",b=t=>e(t)==="object"&&t!==null,v=t=>Array.isArray(t),w=t=>t instanceof RegExp,N=t=>e(t)==="string",l=t=>e(t)==="number",q=t=>t===null||!b(t)||m(t)?!1:Object.getPrototypeOf(t)===f;p.exports={isArguments:m,isFunction:a,isObject:b,isArray:v,isRegExp:w,isString:N,isNumber:l,isPojo:q}});var U=g((Y,E)=>{var{isFunction:c,isRegExp:O,isPojo:F,isArray:d,isString:i,isNumber:h}=A();function S(...t){let s;return n=>t.find(R=>{let r=R(n),{matched:u,value:y}=r||{};return[u,y].every(c)?u(n)&&(s=y(n),!0):r&&(s=r)})&&s}function M(t){return(...s)=>S(...s)(t)}var _=t=>s=>n=>({matched:()=>j(t,n),value:()=>c(s)?i(n)&&O(t)?s(n.match(t)):s(n):s}),k=t=>s=>c(t)?t(s):t,j=(t,s)=>F(t)?Object.keys(t).every(n=>x(t[n],s[n])):d(t)?t.some(n=>j(n,s)):x(t,s),x=(t,s)=>c(t)?t(s):i(s)&&O(t)?t.test(s):t===s,z=()=>t=>!!t,B=()=>t=>!t,C=t=>o(s=>s>t),D=t=>o(s=>s<t),G=t=>o(s=>s>=t),H=t=>o(s=>s<=t),I=o((t,s)=>n=>n>=t&&n<=s),J=t=>P(s=>s.startsWith(t)),K=t=>P(s=>s.endsWith(t)),L=t=>T(s=>s.includes(t)),Q=t=>new Proxy({},{get:(s,n)=>t(n)});function P(t){return(...s)=>s.every(i)&&t(...s)}function T(t){return(...s)=>s.every(n=>d(n)||i(n))&&t(...s)}function o(t){return(...s)=>s.every(h)&&t(...s)}E.exports={against:S,match:M,defined:z,empty:B,gt:C,lt:D,gte:G,lte:H,inRange:I,startsWith:J,endsWith:K,includes:L,spread:Q,when:_,otherwise:k}});return U();})();
