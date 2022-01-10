/*
 * match-iz
 * v1.11.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var x=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var I=t=>x(t,"__esModule",{value:!0});var q=(t,n)=>{for(var o in n)x(t,o,{get:n[o],enumerable:!0})},z=(t,n,o,s)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of E(n))!F.call(t,r)&&(o||r!=="default")&&x(t,r,{get:()=>n[r],enumerable:!(s=D(n,r))||s.enumerable});return t};var B=(t=>(n,o)=>t&&t.get(n)||(o=z(I({}),n,1),t&&t.set(n,o),o))(typeof WeakMap!="undefined"?new WeakMap:0);var nt={};q(nt,{against:()=>w,allOf:()=>T,anyOf:()=>R,defined:()=>U,empty:()=>W,endsWith:()=>l,falsy:()=>k,gt:()=>V,gte:()=>Y,hasOwn:()=>v,inRange:()=>_,includedIn:()=>d,includes:()=>y,instanceOf:()=>u,isArray:()=>e,isDate:()=>P,isFunction:()=>i,isNumber:()=>b,isPojo:()=>g,isRegExp:()=>O,isString:()=>f,lt:()=>X,lte:()=>Z,match:()=>J,not:()=>Q,otherwise:()=>K,pluck:()=>M,spread:()=>a,startsWith:()=>$,truthy:()=>h,when:()=>L});var j=Object.prototype,C=j.toString,p=t=>n=>typeof n===t,u=t=>n=>n instanceof t,{isArray:e}=Array,G=t=>C.call(t)==="[object Arguments]",P=t=>u(Date)(t)&&!isNaN(t),i=p("function"),f=p("string"),b=t=>t===t&&p("number")(t),H=t=>t!==null&&p("object")(t),O=u(RegExp),g=t=>t===null||!H(t)||G(t)?!1:Object.getPrototypeOf(t)===j;function J(t){return(...n)=>w(...n)(t)}var w=(...t)=>{let n;return o=>t.find(s=>{let r=s(o),{matched:N,value:S}=r||{};return[N,S].every(i)?N(o)&&(n=S(o),!0):r&&(n=r)})&&n},K=t=>n=>({matched:()=>!0,value:()=>i(t)?t(n):t}),L=t=>n=>o=>({matched:()=>c(t,o,s=>o=s),value:()=>i(n)?f(o)&&O(t)?n(o.match(t)):n(o):n}),c=(t,n,o)=>g(t)?Object.keys(t).every(s=>c(t[s],n==null?void 0:n[s],o)):e(t)?e(n)?t.length===n.length&&t.every((s,r)=>c(s,n==null?void 0:n[r],o)):t.some(s=>c(s,n,o)):i(t)?t(n,o):f(n)&&O(t)?t.test(n):t===n||[t,n].every(Number.isNaN),M=(...t)=>(n,o)=>t.length===0||(i(t[0])?t[0](n):c(t[0],n,o))?(o(n),!0):!1,Q=t=>(n,o)=>!c(t,n,o),R=(...t)=>t.flat(),T=(...t)=>(n,o)=>t.flat().every(s=>c(s,n,o)),W=t=>t!==t||!t&&t!==0&&t!==!1||e(t)&&!t.length||g(t)&&!Object.keys(t).length,U=t=>!W(t),V=t=>m(n=>n>t),X=t=>m(n=>n<t),Y=t=>m(n=>n>=t),Z=t=>m(n=>n<=t),_=(t,n)=>m(o=>o>=t&&o<=n),$=t=>A(n=>n.startsWith(t)),l=t=>A(n=>n.endsWith(t)),y=t=>tt(n=>n.includes(t)),d=R,v=(...t)=>n=>g(n)&&(([o,s])=>o.length&&o.every(r=>s.includes(r)))([t.flat(),Object.keys(n)]),h=t=>!!t,k=t=>!t,a=t=>new Proxy({},{get:()=>t}),A=t=>n=>f(n)&&t(n),m=t=>n=>b(n)&&t(n),tt=t=>n=>(e(n)||f(n))&&t(n);return B(nt);})();
