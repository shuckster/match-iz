/*
 * match-iz
 * v5.0.1
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var N=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var ot=Object.getOwnPropertyNames,F=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var z=(t,e,n)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,H=(t,e)=>{for(var n in e||(e={}))M.call(e,n)&&z(t,n,e[n]);if(F)for(var n of F(e))C.call(e,n)&&z(t,n,e[n]);return t};var V=(t,e)=>{var n={};for(var s in t)M.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&F)for(var s of F(t))e.indexOf(s)<0&&C.call(t,s)&&(n[s]=t[s]);return n};var $=(t,e)=>{for(var n in e)N(t,n,{get:e[n],enumerable:!0})},rt=(t,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ot(e))!M.call(t,o)&&o!==n&&N(t,o,{get:()=>e[o],enumerable:!(s=st(e,o))||s.enumerable});return t};var it=t=>rt(N({},"__esModule",{value:!0}),t);var ue={};$(ue,{against:()=>Y,allOf:()=>k,anyOf:()=>x,cata:()=>ne,deepEq:()=>Ht,defined:()=>Ut,empty:()=>tt,endsWith:()=>_t,eq:()=>_,every:()=>$t,falsy:()=>oe,firstOf:()=>Bt,getIterationLimit:()=>It,gt:()=>Gt,gte:()=>Tt,hasOwn:()=>ee,inRange:()=>Yt,includedIn:()=>kt,includes:()=>xt,instanceOf:()=>vt,isArray:()=>g,isDate:()=>St,isFunction:()=>p,isIterable:()=>X,isNumber:()=>T,isPojo:()=>h,isRegExp:()=>W,isStrictly:()=>te,isString:()=>v,lastOf:()=>Jt,lt:()=>Qt,lte:()=>Xt,match:()=>Kt,not:()=>Vt,otherwise:()=>At,pluck:()=>qt,rest:()=>zt,setIterationLimit:()=>Mt,some:()=>jt,spread:()=>ce,startsWith:()=>Zt,truthy:()=>se,when:()=>Lt});module.exports=it(ue);var S={};$(S,{instanceOf:()=>a,isArguments:()=>B,isArray:()=>ut,isDate:()=>lt,isFormData:()=>wt,isFunction:()=>J,isIterable:()=>at,isMap:()=>ht,isNumber:()=>mt,isObject:()=>U,isPojo:()=>dt,isRegExp:()=>gt,isSet:()=>pt,isString:()=>ft});var j=Object.prototype,ct=j.toString,y=t=>e=>typeof e===t,a=t=>e=>e instanceof t,{isArray:ut}=Array,B=t=>ct.call(t)==="[object Arguments]",lt=t=>a(Date)(t)&&!isNaN(t),J=y("function"),ft=y("string"),mt=t=>t===t&&y("number")(t),U=t=>t!==null&&y("object")(t),gt=a(RegExp),pt=a(Set),ht=a(Map),dt=t=>t===null||!U(t)||B(t)?!1:Object.getPrototypeOf(t)===j,at=t=>t!=null&&[t[Symbol.iterator],t.next].every(J),wt=t=>typeof FormData!="undefined"&&a(FormData)(t);var{isArguments:Ot,isArray:g,isDate:St,isFunction:p,isNumber:T}=S,{isPojo:h,isRegExp:W,isString:v,instanceOf:vt}=S,{isMap:bt,isSet:Ft,isIterable:X,isFormData:Nt}=S,{keys:d,entries:yt,assign:E}=Object,w=2e4,Et=!0,It=()=>w,Mt=t=>{let e=w;return w=t,()=>w=e};function Dt(t,e){for(let n=t.length-1;n>=0;n--)if(e(t[n]))return t[n]}function G(t,e){if(Et&&!K(e)){let n=`Exhausted all patterns without finding a match for input: ${JSON.stringify(t)}. Handle it, or use otherwise() for the fall-through case.`;throw new Error(n)}}function Kt(t){return(...e)=>Y(...e)(t)}var Y=(...t)=>e=>{let[n,s]=Ot(e)?[{},Array.from(e)]:bt(e)||Nt(e)?[{isMap:!0},e.entries()]:Ft(e)?[{isSet:!0},e.values()]:[{},e];if(!X(s)){let i=s,{found:m,result:f}=Q(...t)(i);if(m)return f;let O=Dt(t,K);return G(i,O),f}let o=s,[c,u]=t.reduce(([i,m],f)=>K(f)?[f,m]:[i,[...m,f]],[()=>({value:()=>{}}),[]]),r=[];do{let{value:i,done:m}=o.next();if(m)return G(o,c),c().value();r.push(i);let{found:f,result:O}=Q(...u)(n.isSet?i:n.isMap?{key:i[0],value:i[1]}:[...r]);if(f)return O}while(r.length<w||n.isSet||n.isMap);throw new Error(`Hit iterationLimit: ${w}. Use setIterationLimit(Infinity) to disable.`)},Q=(...t)=>{let e;return n=>({found:!!t.find(o=>{let c=o(n),{matched:u,value:r}=c||{};return[u,r].every(p)?u(n)&&(e=r(n),!0):c&&(e=c)}),result:e})},R="@@match-iz/rest",Wt=t=>p(t==null?void 0:t[R]),Rt=t=>t[R],Z=Symbol("@@match-iz/otherwise"),K=t=>(t==null?void 0:t[Z])===!0,At=t=>{let e=n=>({matched:()=>!0,value:()=>p(t)?t(n):t});return e[Z]=!0,e},D=t=>e=>n=>{let s={haystack:n};return{matched:()=>l(t,n,o=>n=o,s),value:()=>p(e)?v(n)&&W(t)?e(...Pt(n.match(t),s.rest)):e(n,s.rest):e}},Lt=(...t)=>{if(t.length===1){let[e]=t;return D(e)}if(t.length===2){let[e,n]=t;return D(e)(n)}if(t.length>2){let e=t.slice(-1)[0],n=t.slice(0,-1);return D(k(n))(e)}throw new Error("Expected at least 1 argument")},Pt=t=>{let{groups:e}=t;return e?[e,t]:[t]},l=(t,e,n,s={haystack:e})=>h(t)?d(t).every(o=>(s.consumedKeys=s.consumedKeys||[],s.consumedKeys.push(o),s.key=o,l(t[o],e==null?void 0:e[o],n,s))):g(t)?g(e)&&t.every((o,c)=>{let u=Wt(o)?Rt(o):o;return s.key=c,l(u,e==null?void 0:e[c],n,s)}):p(t)?t(e,n,s):v(e)&&W(t)?t.test(e):t===e||[t,e].every(Number.isNaN),qt=(...t)=>(e,n,s)=>t.length===0||(p(t[0])?t[0](e):l(t[0],e,n,s))?(n(e),!0):!1,zt=(...t)=>{let e=t.length===0?()=>!0:t[0],n=()=>e,s=c=>(u,r)=>E(u,{[r]:c.haystack[r]}),o=(c,u)=>E(c,{[u]:e});return{[R]:(c,u,r)=>{if(h(r.haystack)){let i=[],m=d(r.haystack).reduce((q,I)=>((r.consumedKeys||[]).includes(I)?i.push(I):q.push(I),q),[]),f=i.reduce(s(r),{}),O=m.reduce(o,{}),P=l(E({},f,O),r.haystack,u);return P&&(r.rest=m.reduce(s(r),{})),P}if(g(r.haystack)){let i=r.haystack.slice(0,r.key),m=r.haystack.slice(r.key).map(n),f=l(i.concat(m),r.haystack,u);return f&&(r.rest=r.haystack.slice(r.key)),f}return!1}}},Ct=(t,e)=>[t,e].every(g)?t.length===e.length:[t,e].every(h)?d(t).length===d(e).length:!0,_=t=>(e,n,s)=>Ct(t,e)&&l(t,e,n,s),Ht=t=>A(t,e=>h(e)?_(e):e),Vt=t=>(e,n,s)=>!l(t,e,n,s),x=(...t)=>(e,n,s)=>t.flat().some(o=>l(o,e,n,s)),k=(...t)=>(e,n,s)=>t.flat().every(o=>l(o,e,n,s)),$t=t=>nt((e,n,s)=>e.every(o=>l(t,o,n,s))),jt=t=>nt((e,n,s)=>e.some(o=>l(t,o,n,s))),Bt=(...t)=>L((e,n,s)=>t.length<=e.length&&l(t,e.slice(0,t.length),n,s)),Jt=(...t)=>L((e,n,s)=>t.length<=e.length&&l(t,e.slice(e.length-t.length),n,s)),tt=t=>t!==t||!t&&t!==0&&t!==!1||g(t)&&!t.length||h(t)&&!d(t).length,Ut=t=>!tt(t),Gt=t=>b(e=>e>t),Qt=t=>b(e=>e<t),Tt=t=>b(e=>e>=t),Xt=t=>b(e=>e<=t),Yt=(t,e)=>b(n=>n>=Math.min(t,e)&&n<=Math.max(t,e)),Zt=t=>et(e=>e.startsWith(t)),_t=t=>et(e=>e.endsWith(t)),xt=t=>L(e=>e.includes(t)),kt=x,te=t=>e=>e===t,ee=(...t)=>e=>h(e)&&(([n,s])=>n.length&&n.every(o=>s.includes(o)))([t.flat(),d(e)]),ne=n=>{var s=n,{getValue:t}=s,e=V(s,["getValue"]);return yt(e).reduce((o,[c,u])=>E(o,{[c]:r=>i=>({matched:()=>u(i),value:()=>p(r)?r(t(i)):r})}),{})},se=t=>!!t,oe=t=>!t,re=t=>(e,n)=>(e[n]=A(e[n],t),e),ie=t=>e=>A(e,t),A=(t,e)=>e(h(t)?d(t).reduce(re(e),H({},t)):g(t)?t.map(ie(e)):t),ce=t=>new Proxy({},{get:()=>t}),et=t=>e=>v(e)&&t(e),b=t=>e=>T(e)&&t(e),nt=t=>(e,n,s)=>g(e)&&t(e,n,s),L=t=>(e,n,s)=>(g(e)||v(e))&&t(e,n,s);0&&(module.exports={against,allOf,anyOf,cata,deepEq,defined,empty,endsWith,eq,every,falsy,firstOf,getIterationLimit,gt,gte,hasOwn,inRange,includedIn,includes,instanceOf,isArray,isDate,isFunction,isIterable,isNumber,isPojo,isRegExp,isStrictly,isString,lastOf,lt,lte,match,not,otherwise,pluck,rest,setIterationLimit,some,spread,startsWith,truthy,when});
