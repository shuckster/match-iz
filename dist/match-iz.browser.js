/*
 * match-iz
 * v5.0.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var X=Object.defineProperty;var As=Object.getOwnPropertyDescriptor;var Ns=Object.getOwnPropertyNames,Q=Object.getOwnPropertySymbols;var Dt=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var Te=(t,e,n)=>e in t?X(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e)=>{for(var n in e||(e={}))Dt.call(e,n)&&Te(t,n,e[n]);if(Q)for(var n of Q(e))ye.call(e,n)&&Te(t,n,e[n]);return t};var we=(t,e)=>{var n={};for(var s in t)Dt.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&Q)for(var s of Q(t))e.indexOf(s)<0&&ye.call(t,s)&&(n[s]=t[s]);return n};var Mt=(t,e)=>{for(var n in e)X(t,n,{get:e[n],enumerable:!0})},Ws=(t,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ns(e))!Dt.call(t,i)&&i!==n&&X(t,i,{get:()=>e[i],enumerable:!(s=As(e,i))||s.enumerable});return t};var vs=t=>Ws(X({},"__esModule",{value:!0}),t);var uo={};Mt(uo,{against:()=>nt,allOf:()=>rt,anyOf:()=>ot,cata:()=>Vt,deepEq:()=>Yt,defined:()=>Et,empty:()=>it,endsWith:()=>Bt,eq:()=>st,every:()=>Nt,falsy:()=>Gt,firstOf:()=>vt,getIterationLimit:()=>wt,gt:()=>Pt,gte:()=>Jt,hasOwn:()=>zt,inDay:()=>pe,inDays:()=>Os,inMonth:()=>he,inMonths:()=>bs,inRange:()=>Rt,inTheFuture:()=>Y,inTheNext:()=>Y,inThePast:()=>_,inYear:()=>le,inYears:()=>Ys,includedIn:()=>$t,includes:()=>Kt,instanceOf:()=>dt,isAM:()=>fe,isAfter:()=>Fs,isAfternoon:()=>Ss,isApr:()=>cs,isArray:()=>C,isAug:()=>gs,isBefore:()=>xs,isDate:()=>K,isDay:()=>me,isDayOfWeek:()=>Ms,isDec:()=>ls,isEvening:()=>Us,isFeb:()=>rs,isFri:()=>_n,isFunction:()=>U,isHour:()=>R,isIterable:()=>et,isJan:()=>os,isJul:()=>ms,isJun:()=>us,isLeapYear:()=>Ds,isMar:()=>is,isMay:()=>as,isMinute:()=>ys,isMon:()=>$n,isMonth:()=>ge,isMorning:()=>Cs,isNov:()=>hs,isNumber:()=>tt,isOct:()=>ps,isPM:()=>ws,isPojo:()=>x,isRegExp:()=>$,isSat:()=>Gn,isSecond:()=>ds,isSep:()=>fs,isStrictly:()=>jt,isString:()=>W,isSun:()=>Kn,isThu:()=>Vn,isTime:()=>T,isTue:()=>jn,isWed:()=>zn,isWeekNumber:()=>Ts,isYear:()=>J,lastOf:()=>It,lt:()=>Lt,lte:()=>Ht,match:()=>St,not:()=>At,nthFri:()=>es,nthMon:()=>Xn,nthSat:()=>ns,nthSun:()=>Qn,nthThu:()=>ts,nthTue:()=>Zn,nthWed:()=>kn,otherwise:()=>xt,pluck:()=>Ot,rest:()=>bt,setIterationLimit:()=>Ct,some:()=>Wt,spread:()=>Xt,startsWith:()=>qt,truthy:()=>_t,utc:()=>ao,when:()=>Ft});var O={};Mt(O,{against:()=>nt,allOf:()=>rt,anyOf:()=>ot,cata:()=>Vt,deepEq:()=>Yt,defined:()=>Et,empty:()=>it,endsWith:()=>Bt,eq:()=>st,every:()=>Nt,falsy:()=>Gt,firstOf:()=>vt,getIterationLimit:()=>wt,gt:()=>Pt,gte:()=>Jt,hasOwn:()=>zt,inRange:()=>Rt,includedIn:()=>$t,includes:()=>Kt,instanceOf:()=>dt,isArray:()=>C,isDate:()=>K,isFunction:()=>U,isIterable:()=>et,isNumber:()=>tt,isPojo:()=>x,isRegExp:()=>$,isStrictly:()=>jt,isString:()=>W,lastOf:()=>It,lt:()=>Lt,lte:()=>Ht,match:()=>St,not:()=>At,otherwise:()=>xt,pluck:()=>Ot,rest:()=>bt,setIterationLimit:()=>Ct,some:()=>Wt,spread:()=>Xt,startsWith:()=>qt,truthy:()=>_t,when:()=>Ft});var B={};Mt(B,{instanceOf:()=>I,isArguments:()=>Se,isArray:()=>Es,isDate:()=>Ps,isFormData:()=>$s,isFunction:()=>Ue,isIterable:()=>Ks,isMap:()=>qs,isNumber:()=>Js,isObject:()=>xe,isPojo:()=>Bs,isRegExp:()=>Hs,isSet:()=>Rs,isString:()=>Ls});var Ce=Object.prototype,Is=Ce.toString,Z=t=>e=>typeof e===t,I=t=>e=>e instanceof t,{isArray:Es}=Array,Se=t=>Is.call(t)==="[object Arguments]",Ps=t=>I(Date)(t)&&!isNaN(t),Ue=Z("function"),Ls=Z("string"),Js=t=>t===t&&Z("number")(t),xe=t=>t!==null&&Z("object")(t),Hs=I(RegExp),Rs=I(Set),qs=I(Map),Bs=t=>t===null||!xe(t)||Se(t)?!1:Object.getPrototypeOf(t)===Ce,Ks=t=>t!=null&&[t[Symbol.iterator],t.next].every(Ue),$s=t=>typeof FormData!="undefined"&&I(FormData)(t);var{isArguments:js,isArray:C,isDate:K,isFunction:U,isNumber:tt}=B,{isPojo:x,isRegExp:$,isString:W,instanceOf:dt}=B,{isMap:zs,isSet:Vs,isIterable:et,isFormData:_s}=B,{keys:N,entries:Gs,assign:k}=Object,E=2e4,Qs=!0,wt=()=>E,Ct=t=>{let e=E;return E=t,()=>E=e};function Xs(t,e){for(let n=t.length-1;n>=0;n--)if(e(t[n]))return t[n]}function Fe(t,e){if(Qs&&!yt(e)){let n=`Exhausted all patterns without finding a match for input: ${JSON.stringify(t)}. Handle it, or use otherwise() for the fall-through case.`;throw new Error(n)}}function St(t){return(...e)=>nt(...e)(t)}var nt=(...t)=>e=>{let[n,s]=js(e)?[{},Array.from(e)]:zs(e)||_s(e)?[{isMap:!0},e.entries()]:Vs(e)?[{isSet:!0},e.values()]:[{},e];if(!et(s)){let f=s,{found:w,result:M}=Oe(...t)(f);if(w)return M;let q=Xs(t,yt);return Fe(f,q),M}let i=s,[p,l]=t.reduce(([f,w],M)=>yt(M)?[M,w]:[f,[...w,M]],[()=>({value:()=>{}}),[]]),a=[];do{let{value:f,done:w}=i.next();if(w)return Fe(i,p),p().value();a.push(f);let{found:M,result:q}=Oe(...l)(n.isSet?f:n.isMap?{key:f[0],value:f[1]}:[...a]);if(M)return q}while(a.length<E||n.isSet||n.isMap);throw new Error(`Hit iterationLimit: ${E}. Use setIterationLimit(Infinity) to disable.`)},Oe=(...t)=>{let e;return n=>({found:!!t.find(i=>{let p=i(n),{matched:l,value:a}=p||{};return[l,a].every(U)?l(n)&&(e=a(n),!0):p&&(e=p)}),result:e})},Ut="@@match-iz/rest",Zs=t=>U(t==null?void 0:t[Ut]),ks=t=>t[Ut],be=Symbol("@@match-iz/otherwise"),yt=t=>(t==null?void 0:t[be])===!0,xt=t=>{let e=n=>({matched:()=>!0,value:()=>U(t)?t(n):t});return e[be]=!0,e},Tt=t=>e=>n=>{let s={haystack:n};return{matched:()=>D(t,n,i=>n=i,s),value:()=>U(e)?W(n)&&$(t)?e(...to(n.match(t),s.rest)):e(n,s.rest):e}},Ft=(...t)=>{if(t.length===1){let[e]=t;return Tt(e)}if(t.length===2){let[e,n]=t;return Tt(e)(n)}if(t.length>2){let e=t.slice(-1)[0],n=t.slice(0,-1);return Tt(rt(n))(e)}throw new Error("Expected at least 1 argument")},to=t=>{let{groups:e}=t;return e?[e,t]:[t]},D=(t,e,n,s={haystack:e})=>x(t)?N(t).every(i=>(s.consumedKeys=s.consumedKeys||[],s.consumedKeys.push(i),s.key=i,D(t[i],e==null?void 0:e[i],n,s))):C(t)?C(e)&&t.every((i,p)=>{let l=Zs(i)?ks(i):i;return s.key=p,D(l,e==null?void 0:e[p],n,s)}):U(t)?t(e,n,s):W(e)&&$(t)?t.test(e):t===e||[t,e].every(Number.isNaN),Ot=(...t)=>(e,n,s)=>t.length===0||(U(t[0])?t[0](e):D(t[0],e,n,s))?(n(e),!0):!1,bt=(...t)=>{let e=t.length===0?()=>!0:t[0],n=()=>e,s=p=>(l,a)=>k(l,{[a]:p.haystack[a]}),i=(p,l)=>k(p,{[l]:e});return{[Ut]:(p,l,a)=>{if(x(a.haystack)){let f=[],w=N(a.haystack).reduce((Me,lt)=>((a.consumedKeys||[]).includes(lt)?f.push(lt):Me.push(lt),Me),[]),M=f.reduce(s(a),{}),q=w.reduce(i,{}),De=D(k({},M,q),a.haystack,l);return De&&(a.rest=w.reduce(s(a),{})),De}if(C(a.haystack)){let f=a.haystack.slice(0,a.key),w=a.haystack.slice(a.key).map(n),M=D(f.concat(w),a.haystack,l);return M&&(a.rest=a.haystack.slice(a.key)),M}return!1}}},eo=(t,e)=>[t,e].every(C)?t.length===e.length:[t,e].every(x)?N(t).length===N(e).length:!0,st=t=>(e,n,s)=>eo(t,e)&&D(t,e,n,s),Yt=t=>Qt(t,e=>x(e)?st(e):e),At=t=>(e,n,s)=>!D(t,e,n,s),ot=(...t)=>(e,n,s)=>t.flat().some(i=>D(i,e,n,s)),rt=(...t)=>(e,n,s)=>t.flat().every(i=>D(i,e,n,s)),Nt=t=>Ae((e,n,s)=>e.every(i=>D(t,i,n,s))),Wt=t=>Ae((e,n,s)=>e.some(i=>D(t,i,n,s))),vt=(...t)=>Zt((e,n,s)=>t.length<=e.length&&D(t,e.slice(0,t.length),n,s)),It=(...t)=>Zt((e,n,s)=>t.length<=e.length&&D(t,e.slice(e.length-t.length),n,s)),it=t=>t!==t||!t&&t!==0&&t!==!1||C(t)&&!t.length||x(t)&&!N(t).length,Et=t=>!it(t),Pt=t=>j(e=>e>t),Lt=t=>j(e=>e<t),Jt=t=>j(e=>e>=t),Ht=t=>j(e=>e<=t),Rt=(t,e)=>j(n=>n>=Math.min(t,e)&&n<=Math.max(t,e)),qt=t=>Ye(e=>e.startsWith(t)),Bt=t=>Ye(e=>e.endsWith(t)),Kt=t=>Zt(e=>e.includes(t)),$t=ot,jt=t=>e=>e===t,zt=(...t)=>e=>x(e)&&(([n,s])=>n.length&&n.every(i=>s.includes(i)))([t.flat(),N(e)]),Vt=n=>{var s=n,{getValue:t}=s,e=we(s,["getValue"]);return Gs(e).reduce((i,[p,l])=>k(i,{[p]:a=>f=>({matched:()=>l(f),value:()=>U(a)?a(t(f)):a})}),{})},_t=t=>!!t,Gt=t=>!t,no=t=>(e,n)=>(e[n]=Qt(e[n],t),e),so=t=>e=>Qt(e,t),Qt=(t,e)=>e(x(t)?N(t).reduce(no(e),de({},t)):C(t)?t.map(so(e)):t),Xt=t=>new Proxy({},{get:()=>t}),Ye=t=>e=>W(e)&&t(e),j=t=>e=>tt(e)&&t(e),Ae=t=>(e,n,s)=>C(e)&&t(e,n,s),Zt=t=>(e,n,s)=>(C(e)||W(e))&&t(e,n,s);var o=t=>e=>K(e)&&t(e),ct=t=>(e,n)=>n===t,at=t=>(e,n,s)=>n===s.length+t;function*y(t,e){for(let n=t;n<=e;n++)yield n}var F=t=>e=>(...n)=>new Date(new Date(t)[`set${e}`](...n));var{match:ut,against:d,when:r,otherwise:We}=O,{allOf:mt,anyOf:kt,every:ve,inRange:v,lt:Ie,gt:Ee,eq:m}=O,{isArray:z,isDate:Pe,isFunction:b,isNumber:c}=O,Le=t=>F(t)("UTCMonth")(t.getUTCMonth()+1,0).getUTCDate(),Ne=t=>{let e=F(t)("UTCDate")(t.getUTCDate()+4-(t.getUTCDay()||7)),n=F(t)("UTCMonth")(0,1);return Math.ceil(((+e-+n)/864e5+1)/7)},[Je,He,Re,qe,Be,Ke,$e]=[...y(0,6)].map(t=>o(e=>e.getUTCDay()===t)),[je,ze,Ve,_e,Ge,Qe,Xe]=[...y(0,6)].map(t=>e=>o(n=>[...y(1,Le(n))].map(F(n)("UTCDate")).filter(s=>s.getUTCDay()===t).filter(e<0?at(e):ct(e-1)).filter(mt(te(n.getUTCDate()),ee(n.getUTCMonth()+1),P(n.getUTCFullYear()))).map(s=>s.getUTCDate()).includes(n.getUTCDate()))),Ze=t=>o(e=>e.getUTCMonth()===t),[ke,tn,en,nn,sn,on]=[...y(0,5)].map(Ze),[rn,cn,an,un,mn,gn]=[...y(6,11)].map(Ze),te=d(r(b)(t=>o(e=>t(e.getUTCDate()))),r(c)(t=>t<0?o(e=>e.getUTCDate()===Le(e)+t+1):o(e=>e.getUTCDate()===t))),ee=d(r(b)(t=>o(e=>t(e.getUTCMonth()+1))),r(c)(t=>o(e=>e.getUTCMonth()===t-1))),P=d(r(b)(t=>o(e=>t(e.getUTCFullYear()))),r(c)(t=>o(e=>e.getUTCFullYear()===t))),fn=o(kt(P(t=>t%400===0),mt(P(t=>t%4===0),P(t=>t%100!==0)))),pn=d(r(b)(t=>o(e=>t(e.getUTCDay()))),r(c)(t=>o(e=>e.getUTCDay()===t))),hn=d(r(b)(t=>o(e=>t(Ne(e)))),r(c)(t=>o(e=>Ne(e)===t))),L=d(r(b)(t=>o(e=>t(e.getUTCHours()))),r(c)(t=>o(e=>e.getUTCHours()===t))),ln=d(r(b)(t=>o(e=>t(e.getUTCMinutes()))),r(c)(t=>o(e=>e.getUTCMinutes()===t))),Dn=d(r(b)(t=>o(e=>t(e.getUTCSeconds()))),r(c)(t=>o(e=>e.getUTCSeconds()===t))),ne=L(v(0,11)),Mn=L(v(12,23)),Tn=ne,yn=L(v(12,17)),dn=L(v(18,23)),T=d(r(b)(t=>o(e=>t(e.getTime()))),r(c)(t=>o(e=>e.getTime()===t))),h=t=>([e])=>{let n=Date.now();return T(v(n,n+e*t-1))},wn=1,se=1e3,oe=60*se,re=60*oe,V=24*re,Cn=7*V,Sn=30*V,Un=365*V,xn=/^(ms|milliseconds?)/i,Fn=/^(s|secs?|seconds?)/i,On=/^(m|mins?|minutes?)$/i,bn=/^(h|hours?)/i,Yn=/^(d|days?)/i,An=/^(w|weeks?)/i,Nn=/^(mo|months?)/i,Wn=/^(y|years?)/i,_=(...t)=>ut(t)(r(m([]))(()=>T(Ie(Date.now()))),r(m([c,xn]))(h(-wn)),r(m([c,Fn]))(h(-se)),r(m([c,On]))(h(-oe)),r(m([c,bn]))(h(-re)),r(m([c,Yn]))(h(-V)),r(m([c,An]))(h(-Cn)),r(m([c,Nn]))(h(-Sn)),r(m([c,Wn]))(h(-Un)),We(()=>{throw new Error("inThePast: invalid arguments")})),Y=(...t)=>ut(t)(r(m([]))(()=>T(Ee(Date.now()))),r(m([c,xn]))(h(wn)),r(m([c,Fn]))(h(se)),r(m([c,On]))(h(oe)),r(m([c,bn]))(h(re)),r(m([c,Yn]))(h(V)),r(m([c,An]))(h(Cn)),r(m([c,Nn]))(h(Sn)),r(m([c,Wn]))(h(Un)),We(()=>{throw new Error("inTheNext/inTheFuture: invalid arguments")})),gt=t=>ut(t)(r(kt(Pe,c))(e=>new Date(e)),r(m([c]))(([e])=>new Date(Date.UTC(e,0,1))),r(m([c,c]))(([e,n])=>new Date(Date.UTC(e,n-1,1))),r(mt(z,{length:v(3,7)},ve(c)))(([e,n,s,...i])=>new Date(Date.UTC(e,n-1,s,...i)))),oo=t=>ut(t)(r(kt(Pe,c))(e=>new Date(e)),r(m([c]))(([e])=>new Date(Date.UTC(e+1,0,0))),r(m([c,c]))(([e,n])=>new Date(Date.UTC(e,n,0))),r(m([c,c,c]))(([e,n,s])=>new Date(Date.UTC(e,n-1,s))),r(mt(z,{length:v(4,7)},ve(c)))(([e,n,s,...i])=>new Date(Date.UTC(e,n-1,s,...i)))),vn=t=>T(Ie(gt(t))),In=t=>T(Ee(oo(t))),ie=t=>{let e=gt(t);return o(n=>n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth()&&n.getUTCDate()===e.getUTCDate())},ce=t=>{let e=gt(t);return o(n=>n.getUTCFullYear()===e.getUTCFullYear()&&n.getUTCMonth()===e.getUTCMonth())},ae=t=>{let e=gt(t);return o(n=>n.getUTCFullYear()===e.getUTCFullYear())},En=d(r(z)(t=>e=>t.some(n=>ie(n)(e)))),Pn=d(r(z)(t=>e=>t.some(n=>ce(n)(e)))),Ln=d(r(z)(t=>e=>t.some(n=>ae(n)(e))));var{match:Hn,against:S,when:u}=O,{allOf:pt,anyOf:ue,every:Rn,inRange:H,gt:ro,lt:io,eq:ft}=O,{isArray:G,isDate:qn,isFunction:A,isNumber:g}=O,Bn=t=>F(t)("Month")(t.getMonth()+1,0).getDate(),Jn=t=>{let e=F(t)("Date")(t.getDate()+4-(t.getDay()||7)),n=F(t)("Month")(0,1);return Math.ceil(((+e-+n)/864e5+1)/7)},[Kn,$n,jn,zn,Vn,_n,Gn]=[...y(0,6)].map(t=>o(e=>e.getDay()===t)),[Qn,Xn,Zn,kn,ts,es,ns]=[...y(0,6)].map(t=>e=>o(n=>[...y(1,Bn(n))].map(F(n)("Date")).filter(s=>s.getDay()===t).filter(e<0?at(e):ct(e-1)).filter(pt(me(n.getDate()),ge(n.getMonth()+1),J(n.getFullYear()))).map(s=>s.getDate()).includes(n.getDate()))),ss=t=>o(e=>e.getMonth()===t),[os,rs,is,cs,as,us]=[...y(0,5)].map(ss),[ms,gs,fs,ps,hs,ls]=[...y(6,11)].map(ss),me=S(u(A)(t=>o(e=>t(e.getDate()))),u(g)(t=>t<0?o(e=>e.getDate()===Bn(e)+t+1):o(e=>e.getDate()===t))),ge=S(u(A)(t=>o(e=>t(e.getMonth()+1))),u(g)(t=>o(e=>e.getMonth()===t-1))),J=S(u(A)(t=>o(e=>t(e.getFullYear()))),u(g)(t=>o(e=>e.getFullYear()===t))),Ds=o(ue(J(t=>t%400===0),pt(J(t=>t%4===0),J(t=>t%100!==0)))),Ms=S(u(A)(t=>o(e=>t(e.getDay()))),u(g)(t=>o(e=>e.getDay()===t))),Ts=S(u(A)(t=>o(e=>t(Jn(e)))),u(g)(t=>o(e=>Jn(e)===t))),R=S(u(A)(t=>o(e=>t(e.getHours()))),u(g)(t=>o(e=>e.getHours()===t))),ys=S(u(A)(t=>o(e=>t(e.getMinutes()))),u(g)(t=>o(e=>e.getMinutes()===t))),ds=S(u(A)(t=>o(e=>t(e.getSeconds()))),u(g)(t=>o(e=>e.getSeconds()===t))),fe=R(H(0,11)),ws=R(H(12,23)),Cs=fe,Ss=R(H(12,17)),Us=R(H(18,23)),ht=t=>Hn(t)(u(ue(qn,g))(e=>new Date(e)),u(ft([g]))(([e])=>new Date(e,0,1)),u(ft([g,g]))(([e,n])=>new Date(e,n-1,1)),u(pt(G,{length:H(3,7)},Rn(g)))(([e,n,s,...i])=>new Date(e,n-1,s,...i))),co=t=>Hn(t)(u(ue(qn,g))(e=>new Date(e)),u(ft([g]))(([e])=>new Date(e+1,0,0)),u(ft([g,g]))(([e,n])=>new Date(e,n,0)),u(pt(G,{length:H(3,7)},Rn(g)))(([e,n,s,...i])=>new Date(e,n-1,s+1,...i))),xs=t=>T(io(ht(t))),Fs=t=>T(ro(co(t))),pe=t=>{let e=ht(t);return o(n=>n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth()&&n.getDate()===e.getDate())},he=t=>{let e=ht(t);return o(n=>n.getFullYear()===e.getFullYear()&&n.getMonth()===e.getMonth())},le=t=>{let e=ht(t);return o(n=>n.getFullYear()===e.getFullYear())},Os=S(u(G)(t=>e=>t.some(n=>pe(n)(e)))),bs=S(u(G)(t=>e=>t.some(n=>he(n)(e)))),Ys=S(u(G)(t=>e=>t.some(n=>le(n)(e))));var ao={isSun:Je,isMon:He,isTue:Re,isWed:qe,isThu:Be,isFri:Ke,isSat:$e,nthSun:je,nthMon:ze,nthTue:Ve,nthWed:_e,nthThu:Ge,nthFri:Qe,nthSat:Xe,isJan:ke,isFeb:tn,isMar:en,isApr:nn,isMay:sn,isJun:on,isJul:rn,isAug:cn,isSep:an,isOct:un,isNov:mn,isDec:gn,isDay:te,isMonth:ee,isYear:P,isLeapYear:fn,isDayOfWeek:pn,isWeekNumber:hn,isHour:L,isMinute:ln,isSecond:Dn,isAM:ne,isPM:Mn,isMorning:Tn,isAfternoon:yn,isEvening:dn,isTime:T,inThePast:_,inTheNext:Y,inTheFuture:Y,isBefore:vn,isAfter:In,inDay:ie,inMonth:ce,inYear:ae,inDays:En,inMonths:Pn,inYears:Ln};return vs(uo);})();
