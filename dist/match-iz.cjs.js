/*
 * match-iz
 * v1.4.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var N=(t,n)=>()=>(n||t((n={exports:{}}).exports,n),n.exports);var x=N((v,j)=>{var O=Object.prototype,q=O.toString,i=t=>typeof t,y=t=>q.call(t)==="[object Arguments]",F=t=>Array.isArray(t),d=t=>i(t)==="function",z=t=>i(t)==="number",A=t=>i(t)==="object"&&t!==null,B=t=>t instanceof RegExp,C=t=>i(t)==="string",D=t=>t===null||!A(t)||y(t)?!1:Object.getPrototypeOf(t)===O;j.exports={isArguments:y,isArray:F,isFunction:d,isNumber:z,isObject:A,isRegExp:B,isString:C,isPojo:D}});var{isArray:e,isFunction:o,isNumber:S,isRegExp:p,isString:c,isPojo:u}=x();function G(t){return(...n)=>P(...n)(t)}function P(...t){let n;return s=>t.find(w=>{let g=w(s),{matched:m,value:b}=g||{};return[m,b].every(o)?m(s)&&(n=b(s),!0):g&&(n=g)})&&n}var H=t=>n=>({matched:()=>!0,value:()=>o(t)?t(n):t}),I=t=>n=>s=>({matched:()=>f(t,s),value:()=>o(n)?c(s)&&p(t)?n(s.match(t)):n(s):n}),f=(t,n)=>u(t)?Object.keys(t).every(s=>E(t[s],n==null?void 0:n[s])):e(t)?t.some(s=>f(s,n)):E(t,n),E=(t,n)=>u(t)?f(t,n):o(t)?t(n):c(n)&&p(t)?t.test(n):t===n,R=t=>t!==t||!t&&t!==0&&t!==!1||e(t)&&!t.length||u(t)&&!Object.keys(t).length,J=t=>!R(t),K=t=>r(n=>n>t),L=t=>r(n=>n<t),M=t=>r(n=>n>=t),Q=t=>r(n=>n<=t),T=(t,n)=>r(s=>s>=t&&s<=n),U=t=>W(n=>n.startsWith(t)),V=t=>W(n=>n.endsWith(t)),X=t=>$(n=>n.includes(t)),Y=t=>!!t,Z=t=>!t,_=t=>new Proxy({},{get:()=>t});function W(t){return n=>c(n)&&t(n)}function $(t){return n=>(e(n)||c(n))&&t(n)}function r(t){return n=>S(n)&&t(n)}module.exports={against:P,match:G,when:I,otherwise:H,defined:J,empty:R,gt:K,lt:L,gte:M,lte:Q,inRange:T,startsWith:U,endsWith:V,includes:X,truthy:Y,falsy:Z,spread:_,isArray:e,isFunction:o,isNumber:S,isRegExp:p,isString:c,isPojo:u};
