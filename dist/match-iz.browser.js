/*
 * match-iz
 * v3.8.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var R=Object.defineProperty;var $n=Object.getOwnPropertyDescriptor;var jn=Object.getOwnPropertyNames,L=Object.getOwnPropertySymbols;var et=Object.prototype.hasOwnProperty,qt=Object.prototype.propertyIsEnumerable;var Bt=(t,e,n)=>e in t?R(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,_t=(t,e)=>{for(var n in e||(e={}))et.call(e,n)&&Bt(t,n,e[n]);if(L)for(var n of L(e))qt.call(e,n)&&Bt(t,n,e[n]);return t};var Vt=(t,e)=>{var n={};for(var s in t)et.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&L)for(var s of L(t))e.indexOf(s)<0&&qt.call(t,s)&&(n[s]=t[s]);return n};var nt=(t,e)=>{for(var n in e)R(t,n,{get:e[n],enumerable:!0})},zn=(t,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of jn(e))!et.call(t,a)&&a!==n&&R(t,a,{get:()=>e[a],enumerable:!(s=$n(e,a))||s.enumerable});return t};var Gn=t=>zn(R({},"__esModule",{value:!0}),t);var Ss={};nt(Ss,{against:()=>V,allOf:()=>z,anyOf:()=>j,cata:()=>Ct,deepEq:()=>ut,defined:()=>pt,empty:()=>G,endsWith:()=>Mt,eq:()=>$,falsy:()=>Ot,gt:()=>ft,gte:()=>Dt,hasOwn:()=>yt,inRange:()=>lt,inTheFuture:()=>S,inTheNext:()=>S,inThePast:()=>J,includedIn:()=>St,includes:()=>wt,instanceOf:()=>it,isAM:()=>Lt,isAfter:()=>Vn,isAfternoon:()=>Bn,isApr:()=>On,isArray:()=>D,isAug:()=>Wn,isBefore:()=>_n,isDate:()=>I,isDay:()=>Et,isDayOfWeek:()=>vn,isDec:()=>Pn,isEvening:()=>qn,isFeb:()=>Cn,isFri:()=>pn,isFunction:()=>T,isHour:()=>b,isJan:()=>yn,isJul:()=>Fn,isJun:()=>An,isLeapYear:()=>Yn,isMar:()=>Un,isMay:()=>dn,isMinute:()=>En,isMon:()=>an,isMonth:()=>Ht,isMorning:()=>Rn,isNov:()=>In,isNumber:()=>_,isOct:()=>bn,isPM:()=>Ln,isPojo:()=>l,isRegExp:()=>P,isSat:()=>fn,isSecond:()=>Hn,isSep:()=>Nn,isString:()=>U,isSun:()=>cn,isThu:()=>gn,isTime:()=>g,isTue:()=>mn,isWed:()=>un,isWeekNumber:()=>Jn,isYear:()=>W,lt:()=>ht,lte:()=>Tt,match:()=>rt,not:()=>gt,nthFri:()=>Mn,nthMon:()=>Dn,nthSat:()=>wn,nthSun:()=>hn,nthThu:()=>xn,nthTue:()=>Tn,nthWed:()=>ln,otherwise:()=>ct,pluck:()=>mt,spread:()=>At,startsWith:()=>xt,truthy:()=>Ut,utc:()=>ws,when:()=>at});var x={};nt(x,{against:()=>V,allOf:()=>z,anyOf:()=>j,cata:()=>Ct,deepEq:()=>ut,defined:()=>pt,empty:()=>G,endsWith:()=>Mt,eq:()=>$,every:()=>cs,falsy:()=>Ot,firstOf:()=>ms,gt:()=>ft,gte:()=>Dt,hasOwn:()=>yt,inRange:()=>lt,includedIn:()=>St,includes:()=>wt,instanceOf:()=>it,isArray:()=>D,isDate:()=>I,isFunction:()=>T,isNumber:()=>_,isPojo:()=>l,isRegExp:()=>P,isStrictly:()=>gs,isString:()=>U,lastOf:()=>us,lt:()=>ht,lte:()=>Tt,match:()=>rt,not:()=>gt,otherwise:()=>ct,pluck:()=>mt,some:()=>as,spread:()=>At,startsWith:()=>xt,truthy:()=>Ut,when:()=>at});var q={};nt(q,{instanceOf:()=>st,isArguments:()=>jt,isArray:()=>Qn,isDate:()=>Xn,isFunction:()=>Zn,isNumber:()=>ts,isObject:()=>zt,isPojo:()=>ns,isRegExp:()=>es,isString:()=>kn});var $t=Object.prototype,Kn=$t.toString,B=t=>e=>typeof e===t,st=t=>e=>e instanceof t,{isArray:Qn}=Array,jt=t=>Kn.call(t)==="[object Arguments]",Xn=t=>st(Date)(t)&&!isNaN(t),Zn=B("function"),kn=B("string"),ts=t=>t===t&&B("number")(t),zt=t=>t!==null&&B("object")(t),es=st(RegExp),ns=t=>t===null||!zt(t)||jt(t)?!1:Object.getPrototypeOf(t)===$t;var{isArray:D,isDate:I,isFunction:T,isNumber:_}=q,{isPojo:l,isRegExp:P,isString:U,instanceOf:it}=q,{keys:d,entries:ss,assign:os}=Object;function rt(t){return(...e)=>V(...e)(t)}var V=(...t)=>{let e;return n=>t.find(s=>{let a=s(n),{matched:E,value:H}=a||{};return[E,H].every(T)?E(n)&&(e=H(n),!0):a&&(e=a)})&&e},ct=t=>e=>({matched:()=>!0,value:()=>T(t)?t(e):t}),ot=t=>e=>n=>({matched:()=>p(t,n,s=>n=s),value:()=>T(e)?U(n)&&P(t)?e(...is(n.match(t))):e(n):e}),at=(...t)=>{if(t.length===1){let[e]=t;return ot(e)}if(t.length===2){let[e,n]=t;return ot(e)(n)}if(t.length>2){let e=t.slice(-1)[0],n=t.slice(0,-1);return ot(z(n))(e)}throw new Error("expected 1 or 2 arguments")},is=t=>{let{groups:e}=t;return e?[e,t]:[t]},p=(t,e,n)=>l(t)?d(t).every(s=>p(t[s],e==null?void 0:e[s],n)):D(t)?D(e)&&t.length===e.length&&t.every((s,a)=>p(s,e==null?void 0:e[a],n)):T(t)?t(e,n):U(e)&&P(t)?t.test(e):t===e||[t,e].every(Number.isNaN),mt=(...t)=>(e,n)=>t.length===0||(T(t[0])?t[0](e):p(t[0],e,n))?(n(e),!0):!1,rs=(t,e)=>[t,e].every(l)?d(t).length===d(e).length:!0,$=t=>(e,n)=>rs(t,e)&&p(t,e,n),ut=t=>dt(t,e=>l(e)?$(e):e),gt=t=>(e,n)=>!p(t,e,n),j=(...t)=>(e,n)=>t.flat().some(s=>p(s,e,n)),z=(...t)=>(e,n)=>t.flat().every(s=>p(s,e,n)),cs=t=>Kt(e=>e.every(n=>p(t,n))),as=t=>Kt(e=>e.some(n=>p(t,n))),ms=(...t)=>Ft((e,n)=>t.length<=e.length&&p(t,e.slice(0,t.length),n)),us=(...t)=>Ft((e,n)=>t.length<=e.length&&p(t,e.slice(e.length-t.length),n)),G=t=>t!==t||!t&&t!==0&&t!==!1||D(t)&&!t.length||l(t)&&!d(t).length,pt=t=>!G(t),ft=t=>Y(e=>e>t),ht=t=>Y(e=>e<t),Dt=t=>Y(e=>e>=t),Tt=t=>Y(e=>e<=t),lt=(t,e)=>Y(n=>n>=Math.min(t,e)&&n<=Math.max(t,e)),xt=t=>Gt(e=>e.startsWith(t)),Mt=t=>Gt(e=>e.endsWith(t)),wt=t=>Ft(e=>e.includes(t)),St=j,gs=t=>e=>e===t,yt=(...t)=>e=>l(e)&&(([n,s])=>n.length&&n.every(a=>s.includes(a)))([t.flat(),d(e)]),Ct=n=>{var s=n,{getValue:t}=s,e=Vt(s,["getValue"]);return ss(e).reduce((a,[E,H])=>os(a,{[E]:tt=>Rt=>({matched:()=>H(Rt),value:()=>T(tt)?tt(t(Rt)):tt})}),{})},Ut=t=>!!t,Ot=t=>!t,ps=t=>(e,n)=>(e[n]=dt(e[n],t),e),fs=t=>e=>dt(e,t),dt=(t,e)=>e(l(t)?d(t).reduce(ps(e),_t({},t)):D(t)?t.map(fs(e)):t),At=t=>new Proxy({},{get:()=>t}),Gt=t=>e=>U(e)&&t(e),Y=t=>e=>_(e)&&t(e),Kt=t=>(e,n)=>D(e)&&t(e,n),Ft=t=>(e,n)=>(D(e)||U(e))&&t(e,n);var o=t=>e=>I(e)&&t(e),K=t=>(e,n)=>n===t,Q=t=>(e,n,s)=>n===s.length+t;function*f(t,e){for(let n=t;n<=e;n++)yield n}var h=t=>e=>(...n)=>new Date(new Date(t)[`set${e}`](...n));var{match:X,against:M,when:i,otherwise:Xt}=x,{allOf:Z,anyOf:Wt,every:Zt,inRange:O,lt:kt,gt:te}=x,{isArray:ee,isDate:ne,isFunction:w,isNumber:r}=x,se=t=>h(t)("UTCMonth")(t.getUTCMonth()+1,0).getUTCDate(),Qt=t=>{let e=h(t)("UTCDate")(t.getUTCDate()+4-(t.getUTCDay()||7)),n=h(t)("UTCMonth")(0,1);return Math.ceil(((e-n)/864e5+1)/7)},[oe,ie,re,ce,ae,me,ue]=[...f(0,6)].map(t=>o(e=>e.getUTCDay()===t)),[ge,pe,fe,he,De,Te,le]=[...f(0,6)].map(t=>e=>o(n=>[...f(1,se(n))].map(h(n)("UTCDate")).filter(s=>s.getUTCDay()===t).filter(e<0?Q(e):K(e-1)).filter(Z(Nt(n.getUTCDate()),bt(n.getUTCMonth()+1),A(n.getUTCFullYear()))).map(s=>s.getUTCDate()).includes(n.getUTCDate()))),xe=t=>o(e=>e.getUTCMonth()===t),[Me,we,Se,ye,Ce,Ue]=[...f(0,5)].map(xe),[Oe,de,Ae,Fe,We,Ne]=[...f(6,11)].map(xe),Nt=M(i(w)(t=>o(e=>t(e.getUTCDate()))),i(r)(t=>t<0?o(e=>e.getUTCDate()===se(e)+t+1):o(e=>e.getUTCDate()===t))),bt=M(i(w)(t=>o(e=>t(e.getUTCMonth()+1))),i(r)(t=>o(e=>e.getUTCMonth()===t-1))),A=M(i(w)(t=>o(e=>t(e.getUTCFullYear()))),i(r)(t=>o(e=>e.getUTCFullYear()===t))),be=o(Wt(A(t=>t%400===0),Z(A(t=>t%4===0),A(t=>t%100!==0)))),Ie=M(i(w)(t=>o(e=>t(e.getUTCDay()))),i(r)(t=>o(e=>e.getUTCDay()===t))),Pe=M(i(w)(t=>o(e=>t(Qt(e)))),i(r)(t=>o(e=>Qt(e)===t))),F=M(i(w)(t=>o(e=>t(e.getUTCHours()))),i(r)(t=>o(e=>e.getUTCHours()===t))),Ye=M(i(w)(t=>o(e=>t(e.getUTCMinutes()))),i(r)(t=>o(e=>e.getUTCMinutes()===t))),ve=M(i(w)(t=>o(e=>t(e.getUTCSeconds()))),i(r)(t=>o(e=>e.getUTCSeconds()===t))),It=F(O(0,11)),Je=F(O(12,23)),Ee=It,He=F(O(12,17)),Le=F(O(18,23)),g=M(i(w)(t=>o(e=>t(e.getTime()))),i(r)(t=>o(e=>e.getTime()===t))),u=t=>([e])=>{let n=Date.now();return g(O(n,n+e*t))},Re=1,Pt=1e3,Yt=60*Pt,vt=60*Yt,v=24*vt,Be=7*v,qe=30*v,_e=365*v,Ve=/^ms|milliseconds?/i,$e=/^s|secs?|seconds?/i,je=/^m|mins?|minutes?/i,ze=/^h|hours?/i,Ge=/^d|days?/i,Ke=/^w|weeks?/i,Qe=/^mo|months?/i,Xe=/^y|years?/i,J=(...t)=>X(t)(i([])(()=>g(kt(Date.now()))),i([r,Ve])(u(-Re)),i([r,$e])(u(-Pt)),i([r,je])(u(-Yt)),i([r,ze])(u(-vt)),i([r,Ge])(u(-v)),i([r,Ke])(u(-Be)),i([r,Qe])(u(-qe)),i([r,Xe])(u(-_e)),Xt(()=>{throw new Error("inThePast: invalid arguments")})),S=(...t)=>X(t)(i([])(()=>g(te(Date.now()))),i([r,Ve])(u(Re)),i([r,$e])(u(Pt)),i([r,je])(u(Yt)),i([r,ze])(u(vt)),i([r,Ge])(u(v)),i([r,Ke])(u(Be)),i([r,Qe])(u(qe)),i([r,Xe])(u(_e)),Xt(()=>{throw new Error("inTheNext/inTheFuture: invalid arguments")})),hs=t=>X(t)(i(Wt(ne,r))(e=>new Date(e)),i([r])(([e])=>new Date(Date.UTC(e,0,1))),i([r,r])(([e,n])=>new Date(Date.UTC(e,n-1,1))),i(Z(ee,{length:O(3,7)},Zt(r)))(([e,n,s,...a])=>new Date(Date.UTC(e,n-1,s,...a)))),Ds=t=>X(t)(i(Wt(ne,r))(e=>new Date(e)),i([r])(([e])=>new Date(Date.UTC(e+1,0,0))),i([r,r])(([e,n])=>new Date(Date.UTC(e,n,0))),i([r,r,r])(([e,n,s])=>new Date(Date.UTC(e,n-1,s))),i(Z(ee,{length:O(4,7)},Zt(r)))(([e,n,s,...a])=>new Date(Date.UTC(e,n-1,s,...a)))),Ze=t=>g(kt(hs(t))),ke=t=>g(te(Ds(t)));var{match:en,against:y,when:c}=x,{allOf:k,anyOf:Jt,every:nn,inRange:N,gt:Ts,lt:ls}=x,{isArray:sn,isDate:on,isFunction:C,isNumber:m}=x,rn=t=>h(t)("Month")(t.getMonth()+1,0).getDate(),tn=t=>{let e=h(t)("Date")(t.getDate()+4-(t.getDay()||7)),n=h(t)("Month")(0,1);return Math.ceil(((e-n)/864e5+1)/7)},[cn,an,mn,un,gn,pn,fn]=[...f(0,6)].map(t=>o(e=>e.getDay()===t)),[hn,Dn,Tn,ln,xn,Mn,wn]=[...f(0,6)].map(t=>e=>o(n=>[...f(1,rn(n))].map(h(n)("Date")).filter(s=>s.getDay()===t).filter(e<0?Q(e):K(e-1)).filter(k(Et(n.getDate()),Ht(n.getMonth()+1),W(n.getFullYear()))).map(s=>s.getDate()).includes(n.getDate()))),Sn=t=>o(e=>e.getMonth()===t),[yn,Cn,Un,On,dn,An]=[...f(0,5)].map(Sn),[Fn,Wn,Nn,bn,In,Pn]=[...f(6,11)].map(Sn),Et=y(c(C)(t=>o(e=>t(e.getDate()))),c(m)(t=>t<0?o(e=>e.getDate()===rn(e)+t+1):o(e=>e.getDate()===t))),Ht=y(c(C)(t=>o(e=>t(e.getMonth()+1))),c(m)(t=>o(e=>e.getMonth()===t-1))),W=y(c(C)(t=>o(e=>t(e.getFullYear()))),c(m)(t=>o(e=>e.getFullYear()===t))),Yn=o(Jt(W(t=>t%400===0),k(W(t=>t%4===0),W(t=>t%100!==0)))),vn=y(c(C)(t=>o(e=>t(e.getDay()))),c(m)(t=>o(e=>e.getDay()===t))),Jn=y(c(C)(t=>o(e=>t(tn(e)))),c(m)(t=>o(e=>tn(e)===t))),b=y(c(C)(t=>o(e=>t(e.getHours()))),c(m)(t=>o(e=>e.getHours()===t))),En=y(c(C)(t=>o(e=>t(e.getMinutes()))),c(m)(t=>o(e=>e.getMinutes()===t))),Hn=y(c(C)(t=>o(e=>t(e.getSeconds()))),c(m)(t=>o(e=>e.getSeconds()===t))),Lt=b(N(0,11)),Ln=b(N(12,23)),Rn=Lt,Bn=b(N(12,17)),qn=b(N(18,23)),xs=t=>en(t)(c(Jt(on,m))(e=>new Date(e)),c([m])(([e])=>new Date(e,0,1)),c([m,m])(([e,n])=>new Date(e,n-1,1)),c(k(sn,{length:N(3,7)},nn(m)))(([e,n,s,...a])=>new Date(e,n-1,s,...a))),Ms=t=>en(t)(c(Jt(on,m))(e=>new Date(e)),c([m])(([e])=>new Date(e+1,0,0)),c([m,m])(([e,n])=>new Date(e,n,0)),c(k(sn,{length:N(3,7)},nn(m)))(([e,n,s,...a])=>new Date(e,n-1,s+1,...a))),_n=t=>g(ls(xs(t))),Vn=t=>g(Ts(Ms(t)));var ws={isSun:oe,isMon:ie,isTue:re,isWed:ce,isThu:ae,isFri:me,isSat:ue,nthSun:ge,nthMon:pe,nthTue:fe,nthWed:he,nthThu:De,nthFri:Te,nthSat:le,isJan:Me,isFeb:we,isMar:Se,isApr:ye,isMay:Ce,isJun:Ue,isJul:Oe,isAug:de,isSep:Ae,isOct:Fe,isNov:We,isDec:Ne,isDay:Nt,isMonth:bt,isYear:A,isLeapYear:be,isDayOfWeek:Ie,isWeekNumber:Pe,isHour:F,isMinute:Ye,isSecond:ve,isAM:It,isPM:Je,isMorning:Ee,isAfternoon:He,isEvening:Le,isTime:g,inThePast:J,inTheNext:S,inTheFuture:S,isBefore:Ze,isAfter:ke};return Gn(Ss);})();
