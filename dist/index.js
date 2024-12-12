/*
 * match-iz
 * v4.0.4
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var N=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var st=Object.getOwnPropertyNames,F=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var q=(t,e,n)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,C=(t,e)=>{for(var n in e||(e={}))D.call(e,n)&&q(t,n,e[n]);if(F)for(var n of F(e))z.call(e,n)&&q(t,n,e[n]);return t};var H=(t,e)=>{var n={};for(var s in t)D.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&F)for(var s of F(t))e.indexOf(s)<0&&z.call(t,s)&&(n[s]=t[s]);return n};var V=(t,e)=>{for(var n in e)N(t,n,{get:e[n],enumerable:!0})},ot=(t,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of st(e))!D.call(t,o)&&o!==n&&N(t,o,{get:()=>e[o],enumerable:!(s=nt(e,o))||s.enumerable});return t};var rt=t=>ot(N({},"__esModule",{value:!0}),t);var ce={};V(ce,{against:()=>X,allOf:()=>x,anyOf:()=>_,cata:()=>ee,deepEq:()=>Ct,defined:()=>Jt,empty:()=>k,endsWith:()=>Zt,eq:()=>Z,every:()=>Vt,falsy:()=>se,firstOf:()=>jt,getIterationLimit:()=>Et,gt:()=>Ut,gte:()=>Qt,hasOwn:()=>te,inRange:()=>Xt,includedIn:()=>xt,includes:()=>_t,instanceOf:()=>St,isArray:()=>g,isDate:()=>Ot,isFunction:()=>p,isIterable:()=>T,isNumber:()=>Q,isPojo:()=>d,isRegExp:()=>W,isStrictly:()=>kt,isString:()=>v,lastOf:()=>Bt,lt:()=>Gt,lte:()=>Tt,match:()=>Kt,not:()=>Ht,otherwise:()=>At,pluck:()=>Rt,rest:()=>qt,setIterationLimit:()=>It,some:()=>$t,spread:()=>ie,startsWith:()=>Yt,truthy:()=>ne,when:()=>Lt});module.exports=rt(ce);var S={};V(S,{instanceOf:()=>w,isArguments:()=>j,isArray:()=>ct,isDate:()=>ut,isFormData:()=>at,isFunction:()=>B,isIterable:()=>ht,isMap:()=>pt,isNumber:()=>ft,isObject:()=>J,isPojo:()=>dt,isRegExp:()=>mt,isSet:()=>gt,isString:()=>lt});var $=Object.prototype,it=$.toString,y=t=>e=>typeof e===t,w=t=>e=>e instanceof t,{isArray:ct}=Array,j=t=>it.call(t)==="[object Arguments]",ut=t=>w(Date)(t)&&!isNaN(t),B=y("function"),lt=y("string"),ft=t=>t===t&&y("number")(t),J=t=>t!==null&&y("object")(t),mt=w(RegExp),gt=w(Set),pt=w(Map),dt=t=>t===null||!J(t)||j(t)?!1:Object.getPrototypeOf(t)===$,ht=t=>t!=null&&[t[Symbol.iterator],t.next].every(B),at=t=>typeof FormData!="undefined"&&w(FormData)(t);var{isArguments:wt,isArray:g,isDate:Ot,isFunction:p,isNumber:Q}=S,{isPojo:d,isRegExp:W,isString:v,instanceOf:St}=S,{isMap:vt,isSet:bt,isIterable:T,isFormData:Ft}=S,{keys:h,entries:Nt,assign:E}=Object,O=2e4,yt=!0,Et=()=>O,It=t=>{let e=O;return O=t,()=>O=e};function Dt(t,e){for(let n=t.length-1;n>=0;n--)if(e(t[n]))return t[n]}function U(t,e){if(yt&&!M(e)){let n=`Exhausted all patterns without finding a match for input: ${JSON.stringify(t)}. Handle it, or use otherwise() for the fall-through case.`;throw new Error(n)}}function Kt(t){return(...e)=>X(...e)(t)}var X=(...t)=>e=>{let[n,s]=wt(e)?[{},Array.from(e)]:vt(e)||Ft(e)?[{isMap:!0},e.entries()]:bt(e)?[{isSet:!0},e.values()]:[{},e];if(!T(s)){let c=s,{found:f,result:m}=G(...t)(c);if(f)return m;let a=Dt(t,M);return U(c,a),m}let o=s,[i,r]=t.reduce(([c,f],m)=>M(m)?[m,f]:[c,[...f,m]],[()=>({value:()=>{}}),[]]),u=[];do{let{value:c,done:f}=o.next();if(f)return U(o,i),i().value();u.push(c);let{found:m,result:a}=G(...r)(n.isSet?c:n.isMap?{key:c[0],value:c[1]}:[...u]);if(m)return a}while(u.length<O||n.isSet||n.isMap);throw new Error(`Hit iterationLimit: ${O}. Use setIterationLimit(Infinity) to disable.`)},G=(...t)=>{let e;return n=>({found:!!t.find(o=>{let i=o(n),{matched:r,value:u}=i||{};return[r,u].every(p)?r(n)&&(e=u(n),!0):i&&(e=i)}),result:e})},A="@@match-iz/rest",Mt=t=>p(t==null?void 0:t[A]),Wt=t=>t[A],Y=Symbol("@@match-iz/otherwise"),M=t=>(t==null?void 0:t[Y])===!0,At=t=>{let e=n=>({matched:()=>!0,value:()=>p(t)?t(n):t});return e[Y]=!0,e},K=t=>e=>n=>{let s={haystack:n};return{matched:()=>l(t,n,o=>n=o,s),value:()=>p(e)?v(n)&&W(t)?e(...Pt(n.match(t),s.rest)):e(n,s.rest):e}},Lt=(...t)=>{if(t.length===1){let[e]=t;return K(e)}if(t.length===2){let[e,n]=t;return K(e)(n)}if(t.length>2){let e=t.slice(-1)[0],n=t.slice(0,-1);return K(x(n))(e)}throw new Error("Expected at least 1 argument")},Pt=t=>{let{groups:e}=t;return e?[e,t]:[t]},l=(t,e,n,s={haystack:e})=>d(t)?h(t).every(o=>(s.consumedKeys=s.consumedKeys||[],s.consumedKeys.push(o),s.key=o,l(t[o],e==null?void 0:e[o],n,s))):g(t)?g(e)&&t.every((o,i)=>{let r=Mt(o)?Wt(o):o;return s.key=i,l(r,e==null?void 0:e[i],n,s)}):p(t)?t(e,n,s):v(e)&&W(t)?t.test(e):t===e||[t,e].every(Number.isNaN),Rt=(...t)=>(e,n,s)=>t.length===0||(p(t[0])?t[0](e):l(t[0],e,n,s))?(n(e),!0):!1,qt=(...t)=>{let e=t.length===0?()=>!0:t[0],n=o=>(i,r)=>E(i,{[r]:o.haystack[r]}),s=(o,i)=>E(o,{[i]:e});return{[A]:(o,i,r)=>{if(d(r.haystack)){let u=[],c=h(r.haystack).reduce((R,I)=>((r.consumedKeys||[]).includes(I)?u.push(I):R.push(I),R),[]),f=u.reduce(n(r),{}),m=c.reduce(s,{}),a=l(E({},f,m),r.haystack,i);return a&&(r.rest=c.reduce(n(r),{})),a}if(g(r.haystack)){let u=r.haystack.slice(0,r.key),c=r.haystack.slice(r.key).map(()=>e),f=l(u.concat(c),r.haystack,i);return f&&(r.rest=r.haystack.slice(r.key)),f}return!1}}},zt=(t,e)=>[t,e].every(g)?t.length===e.length:[t,e].every(d)?h(t).length===h(e).length:!0,Z=t=>(e,n,s)=>zt(t,e)&&l(t,e,n,s),Ct=t=>L(t,e=>d(e)?Z(e):e),Ht=t=>(e,n,s)=>!l(t,e,n,s),_=(...t)=>(e,n,s)=>t.flat().some(o=>l(o,e,n,s)),x=(...t)=>(e,n,s)=>t.flat().every(o=>l(o,e,n,s)),Vt=t=>et((e,n,s)=>e.every(o=>l(t,o,n,s))),$t=t=>et((e,n,s)=>e.some(o=>l(t,o,n,s))),jt=(...t)=>P((e,n,s)=>t.length<=e.length&&l(t,e.slice(0,t.length),n,s)),Bt=(...t)=>P((e,n,s)=>t.length<=e.length&&l(t,e.slice(e.length-t.length),n,s)),k=t=>t!==t||!t&&t!==0&&t!==!1||g(t)&&!t.length||d(t)&&!h(t).length,Jt=t=>!k(t),Ut=t=>b(e=>e>t),Gt=t=>b(e=>e<t),Qt=t=>b(e=>e>=t),Tt=t=>b(e=>e<=t),Xt=(t,e)=>b(n=>n>=Math.min(t,e)&&n<=Math.max(t,e)),Yt=t=>tt(e=>e.startsWith(t)),Zt=t=>tt(e=>e.endsWith(t)),_t=t=>P(e=>e.includes(t)),xt=_,kt=t=>e=>e===t,te=(...t)=>e=>d(e)&&(([n,s])=>n.length&&n.every(o=>s.includes(o)))([t.flat(),h(e)]),ee=n=>{var s=n,{getValue:t}=s,e=H(s,["getValue"]);return Nt(e).reduce((o,[i,r])=>E(o,{[i]:u=>c=>({matched:()=>r(c),value:()=>p(u)?u(t(c)):u})}),{})},ne=t=>!!t,se=t=>!t,oe=t=>(e,n)=>(e[n]=L(e[n],t),e),re=t=>e=>L(e,t),L=(t,e)=>e(d(t)?h(t).reduce(oe(e),C({},t)):g(t)?t.map(re(e)):t),ie=t=>new Proxy({},{get:()=>t}),tt=t=>e=>v(e)&&t(e),b=t=>e=>Q(e)&&t(e),et=t=>(e,n,s)=>g(e)&&t(e,n,s),P=t=>(e,n,s)=>(g(e)||v(e))&&t(e,n,s);0&&(module.exports={against,allOf,anyOf,cata,deepEq,defined,empty,endsWith,eq,every,falsy,firstOf,getIterationLimit,gt,gte,hasOwn,inRange,includedIn,includes,instanceOf,isArray,isDate,isFunction,isIterable,isNumber,isPojo,isRegExp,isStrictly,isString,lastOf,lt,lte,match,not,otherwise,pluck,rest,setIterationLimit,some,spread,startsWith,truthy,when});
