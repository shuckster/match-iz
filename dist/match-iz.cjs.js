/*
 * match-iz
 * v1.0.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var a=(t,s)=>()=>(s||t((s={exports:{}}).exports,s),s.exports);var b=a((U,m)=>{var y=Object.prototype,e=t=>typeof t,v=y.toString,g=t=>v.call(t)==="[object Arguments]",E=t=>e(t)==="function",f=t=>e(t)==="object"&&t!==null,R=t=>Array.isArray(t),W=t=>t instanceof RegExp,l=t=>e(t)==="string",w=t=>e(t)==="number",N=t=>t===null||!f(t)||g(t)?!1:Object.getPrototypeOf(t)===y;m.exports={isArguments:g,isFunction:E,isObject:f,isArray:R,isRegExp:W,isString:l,isNumber:w,isPojo:N}});var{isFunction:c,isRegExp:p,isPojo:h,isArray:A,isString:O,isNumber:q}=b();function d(...t){let s;return n=>t.find(P=>{let i=P(n),{matched:r,value:u}=i||{};return[r,u].every(c)?r(n)&&(s=u(n),!0):i&&(s=i)})&&s}function F(t){return(...s)=>d(...s)(t)}var M=t=>s=>n=>({matched:()=>S(t,n),value:()=>c(s)?p(t)?s(n.match(t)):s(n):s}),_=t=>s=>c(t)?t(s):t,S=(t,s)=>h(t)?Object.keys(t).every(n=>j(t[n],s[n])):A(t)?t.some(n=>S(n,s)):j(t,s),j=(t,s)=>c(t)?t(s):p(t)?t.test(s):t===s,k=()=>t=>!!t,z=()=>t=>!t,B=t=>o(s=>s>t),C=t=>o(s=>s<t),D=t=>o(s=>s>=t),G=t=>o(s=>s<=t),H=o((t,s)=>n=>n>=t&&n<=s),I=t=>x(s=>s.startsWith(t)),J=t=>x(s=>s.endsWith(t)),K=t=>Q(s=>s.includes(t)),L=t=>new Proxy(t,{get:(s,n)=>t(n)});function x(t){return(...s)=>s.every(O)&&t(...s)}function Q(t){return(...s)=>s.every(n=>A(n)||O(n))&&t(...s)}function o(t){return(...s)=>s.every(q)&&t(...s)}module.exports={against:d,match:F,defined:k,empty:z,gt:B,lt:C,gte:D,lte:G,inRange:H,startsWith:I,endsWith:J,includes:K,spread:L,when:M,otherwise:_};
