/*
 * match-iz
 * v3.3.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var matchiz=(()=>{var re=Object.create;var W=Object.defineProperty;var ce=Object.getOwnPropertyDescriptor;var ge=Object.getOwnPropertyNames,et=Object.getOwnPropertySymbols,ue=Object.getPrototypeOf,st=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable;var w=(t=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(t,{get:(n,e)=>(typeof require!="undefined"?require:n)[e]}):t)(function(t){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var ot=(t,n)=>{var e={};for(var o in t)st.call(t,o)&&n.indexOf(o)<0&&(e[o]=t[o]);if(t!=null&&et)for(var o of et(t))n.indexOf(o)<0&&me.call(t,o)&&(e[o]=t[o]);return e};var it=(t,n)=>{for(var e in n)W(t,e,{get:n[e],enumerable:!0})},rt=(t,n,e,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let c of ge(n))!st.call(t,c)&&c!==e&&W(t,c,{get:()=>n[c],enumerable:!(o=ce(n,c))||o.enumerable});return t};var ct=(t,n,e)=>(e=t!=null?re(ue(t)):{},rt(n||!t||!t.__esModule?W(e,"default",{value:t,enumerable:!0}):e,t)),ae=t=>rt(W({},"__esModule",{value:!0}),t);var We={};it(We,{against:()=>_,allOf:()=>q,anyOf:()=>$,cata:()=>wt,defined:()=>Tt,empty:()=>z,endsWith:()=>Ut,falsy:()=>At,gt:()=>Dt,gte:()=>yt,hasOwn:()=>Wt,inRange:()=>bt,includedIn:()=>Ft,includes:()=>dt,instanceOf:()=>pt,isAM:()=>Q,isAfternoon:()=>Dn,isApr:()=>en,isArray:()=>T,isAug:()=>cn,isDate:()=>at,isDay:()=>G,isDayOfWeek:()=>fn,isDec:()=>an,isEvening:()=>Sn,isFeb:()=>tn,isFri:()=>$t,isFunction:()=>f,isHour:()=>y,isJan:()=>kt,isJul:()=>rn,isJun:()=>on,isLeapYear:()=>pn,isMar:()=>nn,isMay:()=>sn,isMinute:()=>Mn,isMon:()=>vt,isMonth:()=>K,isMorning:()=>Tn,isNov:()=>mn,isNumber:()=>R,isOct:()=>un,isPM:()=>ln,isPojo:()=>C,isRegExp:()=>I,isSat:()=>qt,isSecond:()=>xn,isSep:()=>gn,isString:()=>D,isSun:()=>jt,isThu:()=>_t,isTue:()=>Lt,isWed:()=>Rt,isWeekNumber:()=>hn,isYear:()=>S,lt:()=>St,lte:()=>Ot,match:()=>ft,not:()=>lt,nthFri:()=>Vt,nthMon:()=>Bt,nthSat:()=>Xt,nthSun:()=>zt,nthThu:()=>Qt,nthTue:()=>Gt,nthWed:()=>Kt,otherwise:()=>ht,pluck:()=>xt,spread:()=>It,startsWith:()=>Ct,truthy:()=>Nt,utc:()=>Fe,when:()=>Mt});var A={};it(A,{instanceOf:()=>v,isArguments:()=>ut,isArray:()=>fe,isDate:()=>he,isFunction:()=>Me,isNumber:()=>le,isObject:()=>mt,isPojo:()=>De,isRegExp:()=>Te,isString:()=>xe});var gt=Object.prototype,pe=gt.toString,N=t=>n=>typeof n===t,v=t=>n=>n instanceof t,{isArray:fe}=Array,ut=t=>pe.call(t)==="[object Arguments]",he=t=>v(Date)(t)&&!isNaN(t),Me=N("function"),xe=N("string"),le=t=>t===t&&N("number")(t),mt=t=>t!==null&&N("object")(t),Te=v(RegExp),De=t=>t===null||!mt(t)||ut(t)?!1:Object.getPrototypeOf(t)===gt;var{isArray:T,isDate:at,isFunction:f,isNumber:R}=A,{isPojo:C,isRegExp:I,isString:D,instanceOf:pt}=A;function ft(t){return(...n)=>_(...n)(t)}var _=(...t)=>{let n;return e=>t.find(o=>{let c=o(e),{matched:d,value:F}=c||{};return[d,F].every(f)?d(e)&&(n=F(e),!0):c&&(n=c)})&&n},ht=t=>n=>({matched:()=>!0,value:()=>f(t)?t(n):t}),L=t=>n=>e=>({matched:()=>l(t,e,o=>e=o),value:()=>f(n)?D(e)&&I(t)?n(...Se(e.match(t))):n(e):n}),Mt=(...t)=>{if(t.length===1){let[n]=t;return L(n)}if(t.length===2){let[n,e]=t;return L(n)(e)}if(t.length>2){let n=t.slice(-1)[0],e=t.slice(0,-1);return L(q(e))(n)}throw new Error("expected 1 or 2 arguments")},Se=t=>{let{groups:n}=t;return n?[n,t]:[t]},l=(t,n,e)=>C(t)?Object.keys(t).every(o=>l(t[o],n==null?void 0:n[o],e)):T(t)?T(n)&&t.length===n.length&&t.every((o,c)=>l(o,n==null?void 0:n[c],e)):f(t)?t(n,e):D(n)&&I(t)?t.test(n):t===n||[t,n].every(Number.isNaN),xt=(...t)=>(n,e)=>t.length===0||(f(t[0])?t[0](n):l(t[0],n,e))?(e(n),!0):!1,lt=t=>(n,e)=>!l(t,n,e),$=(...t)=>(n,e)=>t.flat().some(o=>l(o,n,e)),q=(...t)=>(n,e)=>t.flat().every(o=>l(o,n,e));var z=t=>t!==t||!t&&t!==0&&t!==!1||T(t)&&!t.length||C(t)&&!Object.keys(t).length,Tt=t=>!z(t),Dt=t=>U(n=>n>t),St=t=>U(n=>n<t),yt=t=>U(n=>n>=t),Ot=t=>U(n=>n<=t),bt=(t,n)=>U(e=>e>=Math.min(t,n)&&e<=Math.max(t,n)),Ct=t=>Yt(n=>n.startsWith(t)),Ut=t=>Yt(n=>n.endsWith(t)),dt=t=>ye(n=>n.includes(t)),Ft=$,Wt=(...t)=>n=>C(n)&&(([e,o])=>e.length&&e.every(c=>o.includes(c)))([t.flat(),Object.keys(n)]),wt=e=>{var o=e,{getValue:t}=o,n=ot(o,["getValue"]);return Object.entries(n).reduce((c,[d,F])=>Object.assign(c,{[d]:j=>nt=>({matched:()=>F(nt),value:()=>f(j)?j(t(nt)):j})}),{})},Nt=t=>!!t,At=t=>!t,It=t=>new Proxy({},{get:()=>t}),Yt=t=>n=>D(n)&&t(n),U=t=>n=>R(n)&&t(n),ye=t=>(n,e)=>(T(n)||D(n))&&t(n,e);var B=ct(w("match-iz"),1);var Pt=w("match-iz"),s=t=>n=>(0,Pt.isDate)(n)&&t(n),Y=t=>(n,e)=>e===t,P=t=>(n,e,o)=>e===o.length+t;function*g(t,n){for(let e=t;e<=n;e++)yield e}var u=t=>n=>(...e)=>new Date(new Date(t)[`set${n}`](...e));var E=w("match-iz/dates/utc"),{against:h,when:r}=B,{allOf:Et,anyOf:Oe,inRange:J}=B,{isFunction:M,isNumber:x}=B,Ht=t=>u(t)("Month")(t.getMonth()+1,0).getDate(),Jt=t=>{let n=u(t)("Date")(t.getDate()+4-(t.getDay()||7)),e=u(t)("Month")(0,1);return Math.ceil(((n-e)/864e5+1)/7)},[jt,vt,Lt,Rt,_t,$t,qt]=[...g(0,6)].map(t=>s(n=>n.getDay()===t)),[zt,Bt,Gt,Kt,Qt,Vt,Xt]=[...g(0,6)].map(t=>n=>s(e=>[...g(1,Ht(e))].map(u(e)("Date")).filter(o=>o.getDay()===t).filter(n<0?P(n):Y(n-1)).filter(Et(G(e.getDate()),K(e.getMonth()+1),S(e.getFullYear()))).map(o=>o.getDate()).includes(e.getDate()))),Zt=t=>s(n=>n.getMonth()===t),[kt,tn,nn,en,sn,on]=[...g(0,5)].map(Zt),[rn,cn,gn,un,mn,an]=[...g(6,11)].map(Zt),G=h(r(M)(t=>s(n=>t(n.getDate()))),r(x)(t=>t<0?s(n=>n.getDate()===Ht(n)+t+1):s(n=>n.getDate()===t))),K=h(r(M)(t=>s(n=>t(n.getMonth()+1))),r(x)(t=>s(n=>n.getMonth()===t-1))),S=h(r(M)(t=>s(n=>t(n.getFullYear()))),r(x)(t=>s(n=>n.getFullYear()===t))),pn=s(Oe(S(t=>t%400===0),Et(S(t=>t%4===0),S(t=>t%100!==0)))),fn=h(r(M)(t=>s(n=>t(n.getDay()))),r(x)(t=>s(n=>n.getDay()===t))),hn=h(r(M)(t=>s(n=>t(Jt(n)))),r(x)(t=>s(n=>Jt(n)===t))),y=h(r(M)(t=>s(n=>t(n.getHours()))),r(x)(t=>s(n=>n.getHours()===t))),Mn=h(r(M)(t=>s(n=>t(n.getMinutes()))),r(x)(t=>s(n=>n.getMinutes()===t))),xn=h(r(M)(t=>s(n=>t(n.getSeconds()))),r(x)(t=>s(n=>n.getSeconds()===t))),Q=y(J(0,11)),ln=y(J(12,23)),Tn=Q,Dn=y(J(12,17)),Sn=y(J(18,23));var V=ct(w("match-iz"),1);var{match:Pe,against:m,when:i,otherwise:Je}=V,{allOf:On,anyOf:be,inRange:H,gt:Ee,lt:He}=V,{isFunction:a,isNumber:p}=V,bn=t=>u(t)("UTCMonth")(t.getUTCMonth()+1,0).getUTCDate(),yn=t=>{let n=u(t)("UTCDate")(t.getUTCDate()+4-(t.getUTCDay()||7)),e=u(t)("UTCMonth")(0,1);return Math.ceil(((n-e)/864e5+1)/7)},[Cn,Un,dn,Fn,Wn,wn,Nn]=[...g(0,6)].map(t=>s(n=>n.getUTCDay()===t)),[An,In,Yn,Pn,Jn,En,Hn]=[...g(0,6)].map(t=>n=>s(e=>[...g(1,bn(e))].map(u(e)("UTCDate")).filter(o=>o.getUTCDay()===t).filter(n<0?P(n):Y(n-1)).filter(On(X(e.getUTCDate()),Z(e.getUTCMonth()+1),O(e.getUTCFullYear()))).map(o=>o.getUTCDate()).includes(e.getUTCDate()))),jn=t=>s(n=>n.getUTCMonth()===t),[vn,Ln,Rn,_n,$n,qn]=[...g(0,5)].map(jn),[zn,Bn,Gn,Kn,Qn,Vn]=[...g(6,11)].map(jn),X=m(i(a)(t=>s(n=>t(n.getUTCDate()))),i(p)(t=>t<0?s(n=>n.getUTCDate()===bn(n)+t+1):s(n=>n.getUTCDate()===t))),Z=m(i(a)(t=>s(n=>t(n.getUTCMonth()+1))),i(p)(t=>s(n=>n.getUTCMonth()===t-1))),O=m(i(a)(t=>s(n=>t(n.getUTCFullYear()))),i(p)(t=>s(n=>n.getUTCFullYear()===t))),Xn=s(be(O(t=>t%400===0),On(O(t=>t%4===0),O(t=>t%100!==0)))),Zn=m(i(a)(t=>s(n=>t(n.getUTCDay()))),i(p)(t=>s(n=>n.getUTCDay()===t))),kn=m(i(a)(t=>s(n=>t(yn(n)))),i(p)(t=>s(n=>yn(n)===t))),b=m(i(a)(t=>s(n=>t(n.getUTCHours()))),i(p)(t=>s(n=>n.getUTCHours()===t))),te=m(i(a)(t=>s(n=>t(n.getUTCMinutes()))),i(p)(t=>s(n=>n.getUTCMinutes()===t))),ne=m(i(a)(t=>s(n=>t(n.getUTCSeconds()))),i(p)(t=>s(n=>n.getUTCSeconds()===t))),k=b(H(0,11)),ee=b(H(12,23)),se=k,oe=b(H(12,17)),ie=b(H(18,23)),ve=m(i(a)(t=>s(n=>t(n.getTime()))),i(p)(t=>s(n=>n.getTime()===t)));var Ce=1e3,Ue=60*Ce,de=60*Ue,tt=24*de,Le=7*tt,Re=30*tt,_e=365*tt;var Fe={isSun:Cn,isMon:Un,isTue:dn,isWed:Fn,isThu:Wn,isFri:wn,isSat:Nn,nthSun:An,nthMon:In,nthTue:Yn,nthWed:Pn,nthThu:Jn,nthFri:En,nthSat:Hn,isJan:vn,isFeb:Ln,isMar:Rn,isApr:_n,isMay:$n,isJun:qn,isJul:zn,isAug:Bn,isSep:Gn,isOct:Kn,isNov:Qn,isDec:Vn,isDay:X,isMonth:Z,isYear:O,isLeapYear:Xn,isDayOfWeek:Zn,isWeekNumber:kn,isHour:b,isMinute:te,isSecond:ne,isAM:k,isPM:ee,isMorning:se,isAfternoon:oe,isEvening:ie};return ae(We);})();
