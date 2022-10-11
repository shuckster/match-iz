/*
 * match-iz
 * v3.9.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var A=Object.defineProperty;var N=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var W=(t,n,e)=>n in t?A(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,L=(t,n)=>{for(var e in n||(n={}))M.call(n,e)&&W(t,e,n[e]);if(N)for(var e of N(n))E.call(n,e)&&W(t,e,n[e]);return t};var P=(t,n)=>{var e={};for(var o in t)M.call(t,o)&&n.indexOf(o)<0&&(e[o]=t[o]);if(t!=null&&N)for(var o of N(t))n.indexOf(o)<0&&E.call(t,o)&&(e[o]=t[o]);return e};var G=(t,n)=>{for(var e in n)A(t,e,{get:n[e],enumerable:!0})};var d={};G(d,{instanceOf:()=>l,isArguments:()=>R,isArray:()=>K,isDate:()=>Q,isFormData:()=>a,isFunction:()=>V,isIterable:()=>y,isMap:()=>_,isNumber:()=>X,isObject:()=>h,isPojo:()=>j,isRegExp:()=>Y,isSet:()=>Z,isString:()=>T});var q=Object.prototype,J=q.toString,v=t=>n=>typeof n===t,l=t=>n=>n instanceof t,{isArray:K}=Array,R=t=>J.call(t)==="[object Arguments]",Q=t=>l(Date)(t)&&!isNaN(t),V=v("function"),T=v("string"),X=t=>t===t&&v("number")(t),h=t=>t!==null&&v("object")(t),Y=l(RegExp),Z=l(Set),_=l(Map),j=t=>t===null||!h(t)||R(t)?!1:Object.getPrototypeOf(t)===q,y=t=>t!=null&&[t[Symbol.iterator],t.next].every(V),a=t=>typeof FormData!="undefined"&&l(FormData)(t);var{isArguments:k,isArray:g,isDate:bt,isFunction:O,isNumber:tt}=d,{isPojo:w,isRegExp:H,isString:I,instanceOf:Nt}=d,{isMap:nt,isSet:et,isIterable:ot,isFormData:rt}=d,{keys:p,entries:st,assign:it}=Object,f=2e4,vt=()=>f,It=t=>{let n=f;return f=t,()=>f=n};function xt(t){return(...n)=>ct(...n)(t)}var ct=(...t)=>n=>{let[e,o]=k(n)?[{},Array.from(n)]:nt(n)||rt(n)?[{isMap:!0},n.entries()]:et(n)?[{isSet:!0},n.values()]:[{},n];if(!ot(o))return z(...t)(o).result;let[i,u]=t.reduce(([r,m],S)=>ut(S)?[S,m]:[r,[...m,S]],[()=>({value:()=>{}}),[]]),c=[];do{let{value:r,done:m}=o.next();if(m)return i().value();c.push(r);let{found:S,result:C}=z(...u)(e.isSet?r:e.isMap?{key:r[0],value:r[1]}:[...c]);if(S)return C}while(c.length<f||e.isSet||e.isMap);throw new Error(`Hit iterationLimit: ${f}. Use setIterationLimit(Infinity) to disable.`)},z=(...t)=>{let n;return e=>({found:!!t.find(i=>{let u=i(e),{matched:c,value:r}=u||{};return[c,r].every(O)?c(e)&&(n=r(e),!0):u&&(n=u)}),result:n})},U=Symbol("@@match-iz/otherwise"),ut=t=>(t==null?void 0:t[U])===!0,Dt=t=>{let n=e=>({matched:()=>!0,value:()=>O(t)?t(e):t});return n[U]=!0,n},x=t=>n=>e=>({matched:()=>s(t,e,o=>e=o),value:()=>O(n)?I(e)&&H(t)?n(...mt(e.match(t))):n(e):n}),Ft=(...t)=>{if(t.length===1){let[n]=t;return x(n)}if(t.length===2){let[n,e]=t;return x(n)(e)}if(t.length>2){let n=t.slice(-1)[0],e=t.slice(0,-1);return x(pt(e))(n)}throw new Error("Expected at least 1 argument")},mt=t=>{let{groups:n}=t;return n?[n,t]:[t]},s=(t,n,e)=>w(t)?p(t).every(o=>s(t[o],n==null?void 0:n[o],e)):g(t)?g(n)&&t.length===n.length&&t.every((o,i)=>s(o,n==null?void 0:n[i],e)):O(t)?t(n,e):I(n)&&H(t)?t.test(n):t===n||[t,n].every(Number.isNaN),Wt=(...t)=>(n,e)=>t.length===0||(O(t[0])?t[0](n):s(t[0],n,e))?(e(n),!0):!1,lt=(t,n)=>[t,n].every(w)?p(t).length===p(n).length:!0,ft=t=>(n,e)=>lt(t,n)&&s(t,n,e),At=t=>D(t,n=>w(n)?ft(n):n),Mt=t=>(n,e)=>!s(t,n,e),gt=(...t)=>(n,e)=>t.flat().some(o=>s(o,n,e)),pt=(...t)=>(n,e)=>t.flat().every(o=>s(o,n,e)),Et=t=>B(n=>n.every(e=>s(t,e))),Lt=t=>B(n=>n.some(e=>s(t,e))),Pt=(...t)=>F((n,e)=>t.length<=n.length&&s(t,n.slice(0,t.length),e)),qt=(...t)=>F((n,e)=>t.length<=n.length&&s(t,n.slice(n.length-t.length),e)),Ot=t=>t!==t||!t&&t!==0&&t!==!1||g(t)&&!t.length||w(t)&&!p(t).length,Rt=t=>!Ot(t),Vt=t=>b(n=>n>t),ht=t=>b(n=>n<t),zt=t=>b(n=>n>=t),Ht=t=>b(n=>n<=t),Ut=(t,n)=>b(e=>e>=Math.min(t,n)&&e<=Math.max(t,n)),$t=t=>$(n=>n.startsWith(t)),Bt=t=>$(n=>n.endsWith(t)),Ct=t=>F(n=>n.includes(t)),Gt=gt,Jt=t=>n=>n===t,Kt=(...t)=>n=>w(n)&&(([e,o])=>e.length&&e.every(i=>o.includes(i)))([t.flat(),p(n)]),Qt=e=>{var o=e,{getValue:t}=o,n=P(o,["getValue"]);return st(n).reduce((i,[u,c])=>it(i,{[u]:r=>m=>({matched:()=>c(m),value:()=>O(r)?r(t(m)):r})}),{})},Tt=t=>!!t,Xt=t=>!t,wt=t=>(n,e)=>(n[e]=D(n[e],t),n),St=t=>n=>D(n,t),D=(t,n)=>n(w(t)?p(t).reduce(wt(n),L({},t)):g(t)?t.map(St(n)):t),Yt=t=>new Proxy({},{get:()=>t}),$=t=>n=>I(n)&&t(n),b=t=>n=>tt(n)&&t(n),B=t=>(n,e)=>g(n)&&t(n,e),F=t=>(n,e)=>(g(n)||I(n))&&t(n,e);export{ct as against,pt as allOf,gt as anyOf,Qt as cata,At as deepEq,Rt as defined,Ot as empty,Bt as endsWith,ft as eq,Et as every,Xt as falsy,Pt as firstOf,vt as getIterationLimit,Vt as gt,zt as gte,Kt as hasOwn,Ut as inRange,Gt as includedIn,Ct as includes,Nt as instanceOf,g as isArray,bt as isDate,O as isFunction,ot as isIterable,tt as isNumber,w as isPojo,H as isRegExp,Jt as isStrictly,I as isString,qt as lastOf,ht as lt,Ht as lte,xt as match,Mt as not,Dt as otherwise,Wt as pluck,It as setIterationLimit,Lt as some,Yt as spread,$t as startsWith,Tt as truthy,Ft as when};
