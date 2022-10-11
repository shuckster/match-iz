/*
 * match-iz
 * v3.8.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var I=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames,v=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var L=(t,n,e)=>n in t?I(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,E=(t,n)=>{for(var e in n||(n={}))D.call(n,e)&&L(t,e,n[e]);if(v)for(var e of v(n))P.call(n,e)&&L(t,e,n[e]);return t};var q=(t,n)=>{var e={};for(var o in t)D.call(t,o)&&n.indexOf(o)<0&&(e[o]=t[o]);if(t!=null&&v)for(var o of v(t))n.indexOf(o)<0&&P.call(t,o)&&(e[o]=t[o]);return e};var R=(t,n)=>{for(var e in n)I(t,e,{get:n[e],enumerable:!0})},y=(t,n,e,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of j(n))!D.call(t,r)&&r!==e&&I(t,r,{get:()=>n[r],enumerable:!(o=_(n,r))||o.enumerable});return t};var a=t=>y(I({},"__esModule",{value:!0}),t);var yt={};R(yt,{against:()=>C,allOf:()=>Q,anyOf:()=>K,cata:()=>Tt,deepEq:()=>Mt,defined:()=>Vt,empty:()=>T,endsWith:()=>Ct,eq:()=>J,every:()=>Pt,falsy:()=>Yt,firstOf:()=>qt,getIterationLimit:()=>bt,gt:()=>ht,gte:()=>Ht,hasOwn:()=>Qt,inRange:()=>$t,includedIn:()=>Jt,includes:()=>Gt,instanceOf:()=>gt,isArray:()=>f,isDate:()=>lt,isFunction:()=>l,isIterable:()=>B,isNumber:()=>$,isPojo:()=>g,isRegExp:()=>W,isStrictly:()=>Kt,isString:()=>b,lastOf:()=>Rt,lt:()=>zt,lte:()=>Ut,match:()=>vt,not:()=>Lt,otherwise:()=>xt,pluck:()=>Wt,setIterationLimit:()=>Nt,some:()=>Et,spread:()=>jt,startsWith:()=>Bt,truthy:()=>Xt,when:()=>Dt});module.exports=a(yt);var d={};R(d,{instanceOf:()=>p,isArguments:()=>h,isArray:()=>tt,isDate:()=>nt,isFormData:()=>mt,isFunction:()=>z,isIterable:()=>ut,isMap:()=>it,isNumber:()=>ot,isObject:()=>H,isPojo:()=>ct,isRegExp:()=>rt,isSet:()=>st,isString:()=>et});var V=Object.prototype,k=V.toString,x=t=>n=>typeof n===t,p=t=>n=>n instanceof t,{isArray:tt}=Array,h=t=>k.call(t)==="[object Arguments]",nt=t=>p(Date)(t)&&!isNaN(t),z=x("function"),et=x("string"),ot=t=>t===t&&x("number")(t),H=t=>t!==null&&x("object")(t),rt=p(RegExp),st=p(Set),it=p(Map),ct=t=>t===null||!H(t)||h(t)?!1:Object.getPrototypeOf(t)===V,ut=t=>t!=null&&[t[Symbol.iterator],t.next].every(z),mt=t=>typeof FormData!="undefined"&&p(FormData)(t);var{isArguments:ft,isArray:f,isDate:lt,isFunction:l,isNumber:$}=d,{isPojo:g,isRegExp:W,isString:b,instanceOf:gt}=d,{isMap:pt,isSet:Ot,isIterable:B,isFormData:wt}=d,{keys:w,entries:St,assign:dt}=Object,O=2e4,bt=()=>O,Nt=t=>{let n=O;return O=t,()=>O=n};function vt(t){return(...n)=>C(...n)(t)}var C=(...t)=>n=>{let[e,o]=ft(n)?[{},Array.from(n)]:pt(n)||wt(n)?[{isMap:!0},n.entries()]:Ot(n)?[{isSet:!0},n.values()]:[{},n];if(!B(o))return U(...t)(o).result;let[r,u]=t.reduce(([s,m],S)=>It(S)?[S,m]:[s,[...m,S]],[()=>({value:()=>{}}),[]]),c=[];do{let{value:s,done:m}=o.next();if(m)return r().value();c.push(s);let{found:S,result:Z}=U(...u)(e.isSet?s:e.isMap?{key:s[0],value:s[1]}:[...c]);if(S)return Z}while(c.length<O||e.isSet||e.isMap);throw new Error(`Hit iterationLimit: ${O}. Use setIterationLimit(Infinity) to disable.`)},U=(...t)=>{let n;return e=>({found:!!t.find(r=>{let u=r(e),{matched:c,value:s}=u||{};return[c,s].every(l)?c(e)&&(n=s(e),!0):u&&(n=u)}),result:n})},G=Symbol("@@match-iz/otherwise"),It=t=>(t==null?void 0:t[G])===!0,xt=t=>{let n=e=>({matched:()=>!0,value:()=>l(t)?t(e):t});return n[G]=!0,n},F=t=>n=>e=>({matched:()=>i(t,e,o=>e=o),value:()=>l(n)?b(e)&&W(t)?n(...Ft(e.match(t))):n(e):n}),Dt=(...t)=>{if(t.length===1){let[n]=t;return F(n)}if(t.length===2){let[n,e]=t;return F(n)(e)}if(t.length>2){let n=t.slice(-1)[0],e=t.slice(0,-1);return F(Q(e))(n)}throw new Error("expected 1 or 2 arguments")},Ft=t=>{let{groups:n}=t;return n?[n,t]:[t]},i=(t,n,e)=>g(t)?w(t).every(o=>i(t[o],n==null?void 0:n[o],e)):f(t)?f(n)&&t.length===n.length&&t.every((o,r)=>i(o,n==null?void 0:n[r],e)):l(t)?t(n,e):b(n)&&W(t)?t.test(n):t===n||[t,n].every(Number.isNaN),Wt=(...t)=>(n,e)=>t.length===0||(l(t[0])?t[0](n):i(t[0],n,e))?(e(n),!0):!1,At=(t,n)=>[t,n].every(g)?w(t).length===w(n).length:!0,J=t=>(n,e)=>At(t,n)&&i(t,n,e),Mt=t=>A(t,n=>g(n)?J(n):n),Lt=t=>(n,e)=>!i(t,n,e),K=(...t)=>(n,e)=>t.flat().some(o=>i(o,n,e)),Q=(...t)=>(n,e)=>t.flat().every(o=>i(o,n,e)),Pt=t=>Y(n=>n.every(e=>i(t,e))),Et=t=>Y(n=>n.some(e=>i(t,e))),qt=(...t)=>M((n,e)=>t.length<=n.length&&i(t,n.slice(0,t.length),e)),Rt=(...t)=>M((n,e)=>t.length<=n.length&&i(t,n.slice(n.length-t.length),e)),T=t=>t!==t||!t&&t!==0&&t!==!1||f(t)&&!t.length||g(t)&&!w(t).length,Vt=t=>!T(t),ht=t=>N(n=>n>t),zt=t=>N(n=>n<t),Ht=t=>N(n=>n>=t),Ut=t=>N(n=>n<=t),$t=(t,n)=>N(e=>e>=Math.min(t,n)&&e<=Math.max(t,n)),Bt=t=>X(n=>n.startsWith(t)),Ct=t=>X(n=>n.endsWith(t)),Gt=t=>M(n=>n.includes(t)),Jt=K,Kt=t=>n=>n===t,Qt=(...t)=>n=>g(n)&&(([e,o])=>e.length&&e.every(r=>o.includes(r)))([t.flat(),w(n)]),Tt=e=>{var o=e,{getValue:t}=o,n=q(o,["getValue"]);return St(n).reduce((r,[u,c])=>dt(r,{[u]:s=>m=>({matched:()=>c(m),value:()=>l(s)?s(t(m)):s})}),{})},Xt=t=>!!t,Yt=t=>!t,Zt=t=>(n,e)=>(n[e]=A(n[e],t),n),_t=t=>n=>A(n,t),A=(t,n)=>n(g(t)?w(t).reduce(Zt(n),E({},t)):f(t)?t.map(_t(n)):t),jt=t=>new Proxy({},{get:()=>t}),X=t=>n=>b(n)&&t(n),N=t=>n=>$(n)&&t(n),Y=t=>(n,e)=>f(n)&&t(n,e),M=t=>(n,e)=>(f(n)||b(n))&&t(n,e);0&&(module.exports={against,allOf,anyOf,cata,deepEq,defined,empty,endsWith,eq,every,falsy,firstOf,getIterationLimit,gt,gte,hasOwn,inRange,includedIn,includes,instanceOf,isArray,isDate,isFunction,isIterable,isNumber,isPojo,isRegExp,isStrictly,isString,lastOf,lt,lte,match,not,otherwise,pluck,setIterationLimit,some,spread,startsWith,truthy,when});
