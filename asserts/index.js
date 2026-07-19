/*
 * match-iz
 * v5.1.0
 * https://github.com/shuckster/match-iz
 * License: MIT
 */
var c=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var w=(t,r)=>{for(var n in r)c(t,n,{get:r[n],enumerable:!0})},k=(t,r,n,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let e of l(r))!m.call(t,e)&&e!==n&&c(t,e,{get:()=>r[e],enumerable:!(s=h(r,e))||s.enumerable});return t};var d=t=>k(c({},"__esModule",{value:!0}),t);var A={};w(A,{asserts:()=>p,makeAsserter:()=>u});module.exports=d(A);var o=require("match-iz"),i="Assertion failed",g=(t,r=i)=>{throw new TypeError(r,{cause:t})};function u(t=g){let r=s=>function(a,f=i){(0,o.match)(a)((0,o.when)(s,()=>!0),(0,o.otherwise)(()=>!1))||t(a,f)};function n(s,e,a){if(arguments.length>=2){r(s)(e,a);return}return r(s)}return n}var p=u();0&&(module.exports={asserts,makeAsserter});
