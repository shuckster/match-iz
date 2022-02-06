/*
 * match-iz
 * v2.0.4
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var j=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames,w=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var G=t=>j(t,"__esModule",{value:!0});var A=(t,n)=>{var o={};for(var s in t)W.call(t,s)&&n.indexOf(s)<0&&(o[s]=t[s]);if(t!=null&&w)for(var s of w(t))n.indexOf(s)<0&&C.call(t,s)&&(o[s]=t[s]);return o};var H=(t,n)=>{for(var o in n)j(t,o,{get:n[o],enumerable:!0})},J=(t,n,o,s)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of B(n))!W.call(t,r)&&(o||r!=="default")&&j(t,r,{get:()=>n[r],enumerable:!(s=z(n,r))||s.enumerable});return t};var K=(t=>(n,o)=>t&&t.get(n)||(o=J(G({}),n,1),t&&t.set(n,o),o))(typeof WeakMap!="undefined"?new WeakMap:0);var gt={};H(gt,{against:()=>R,allOf:()=>$,anyOf:()=>E,cata:()=>st,defined:()=>M,empty:()=>I,endsWith:()=>a,falsy:()=>it,gt:()=>d,gte:()=>l,hasOwn:()=>ot,inRange:()=>h,includedIn:()=>nt,includes:()=>tt,instanceOf:()=>b,isArray:()=>e,isDate:()=>F,isFunction:()=>i,isNumber:()=>S,isPojo:()=>f,isRegExp:()=>x,isString:()=>g,lt:()=>y,lte:()=>v,match:()=>U,not:()=>_,otherwise:()=>V,pluck:()=>Z,spread:()=>ct,startsWith:()=>k,truthy:()=>rt,when:()=>X});var D=Object.prototype,L=D.toString,p=t=>n=>typeof n===t,b=t=>n=>n instanceof t,{isArray:e}=Array,Q=t=>L.call(t)==="[object Arguments]",F=t=>b(Date)(t)&&!isNaN(t),i=p("function"),g=p("string"),S=t=>t===t&&p("number")(t),T=t=>t!==null&&p("object")(t),x=b(RegExp),f=t=>t===null||!T(t)||Q(t)?!1:Object.getPrototypeOf(t)===D;function U(t){return(...n)=>R(...n)(t)}var R=(...t)=>{let n;return o=>t.find(s=>{let r=s(o),{matched:u,value:O}=r||{};return[u,O].every(i)?u(o)&&(n=O(o),!0):r&&(n=r)})&&n},V=t=>n=>({matched:()=>!0,value:()=>i(t)?t(n):t}),X=t=>n=>o=>({matched:()=>c(t,o,s=>o=s),value:()=>i(n)?g(o)&&x(t)?n(...Y(o.match(t))):n(o):n}),Y=t=>{let{groups:n}=t;return n?[n,t]:[t]},c=(t,n,o)=>f(t)?Object.keys(t).every(s=>c(t[s],n==null?void 0:n[s],o)):e(t)?e(n)?t.length===n.length&&t.every((s,r)=>c(s,n==null?void 0:n[r],o)):t.some(s=>c(s,n,o)):i(t)?t(n,o):g(n)&&x(t)?t.test(n):t===n||[t,n].every(Number.isNaN),Z=(...t)=>(n,o)=>t.length===0||(i(t[0])?t[0](n):c(t[0],n,o))?(o(n),!0):!1,_=t=>(n,o)=>!c(t,n,o),E=(...t)=>t.flat(),$=(...t)=>(n,o)=>t.flat().every(s=>c(s,n,o)),I=t=>t!==t||!t&&t!==0&&t!==!1||e(t)&&!t.length||f(t)&&!Object.keys(t).length,M=t=>!I(t),d=t=>m(n=>n>t),y=t=>m(n=>n<t),l=t=>m(n=>n>=t),v=t=>m(n=>n<=t),h=(t,n)=>m(o=>o>=t&&o<=n),k=t=>q(n=>n.startsWith(t)),a=t=>q(n=>n.endsWith(t)),tt=t=>et(n=>n.includes(t)),nt=E,ot=(...t)=>n=>f(n)&&(([o,s])=>o.length&&o.every(r=>s.includes(r)))([t.flat(),Object.keys(n)]),st=o=>{var s=o,{getValue:t}=s,n=A(s,["getValue"]);return Object.entries(n).reduce((r,[u,O])=>Object.assign(r,{[u]:N=>P=>({matched:()=>O(P),value:()=>i(N)?N(t(P)):N})}),{})},rt=t=>!!t,it=t=>!t,ct=t=>new Proxy({},{get:()=>t}),q=t=>n=>g(n)&&t(n),m=t=>n=>S(n)&&t(n),et=t=>n=>(e(n)||g(n))&&t(n);return K(gt);})();
