!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.jzmn=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=Array.prototype,g=function(a){return void 0===a||null===a?[]:"function"!=typeof a&&void 0!==a.length?f.slice.call(a):[a]},h=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return Object.assign.apply(Object,[{}].concat(b))},i=function a(b){return g(b).reduce(function(b,c){return Array.isArray(c)?b.concat(a(c)):b.concat([c])},[])},j=function(a){return a},k=function(a){return function(b){return b===a}},l=function(a){return"[object Function]"==Object.prototype.toString.call(a)},m=function(a){return"[object String]"===Object.prototype.toString.call(a)},n=function(a){return Array.isArray(a)},o=function(a){return function(b,c,d){if(c){if(b.length||0===b.length)return f[a].call(b,c,d);var e={};return Object.keys(b)[a](function(a,f){var g=c.call(d||b,b[a],a,b);return g&&(e[a]=g),g}),e}}},p=o("forEach"),q=o("map"),r=o("filter"),s=function(a,b,c){return a.length||0===a.length?f.reduce.call(a,b,c):Object.keys(a).reduce(function(d,e,f){if(!f){if(!c)return a[e];d=c}return b.call(a,d,a[e],e)},"")},t=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},b=a.oldDefaults,c=void 0===b?{input:"individual",output:"wrapped"}:b,e=a.oldInputParser,f=void 0===e?{array:function(a,b,c){return i(a.call.apply(a,[null,b].concat(d(c)))||b)},single:function(a,b,c){return i(a.call.apply(a,[null,b[0]].concat(d(c)))||b[0])},individual:function(a,b,c){return i(b.map(function(b){return a.call.apply(a,[null,b].concat(d(c)))||b}))}}:e,j=a.oldOutputParser,m=void 0===j?{wrapped:function(a,b,c){return a(b||c.value)},bare:function(a,b,c){return b.length>1?b:b[0]},self:function(a,b,c){return a(c.value)},"bare || self":function(a,b,c){return b.every(k(void 0))?a(c.value):b.length>1?b:b[0]}}:j,n=function(a,b){var c=this,d=c.extendFn,e=h(d.defaults,b),f=e.input,i=e.output;return Object.keys(a).forEach(function(b){var e=a[b],h=l(f)?f:d.inputParser[f]||d.inputParser[d.defaults.inputType],j=l(i)?i:d.outputParser[i]||d.outputParser[d.defaults.outputType];c.fn[b]=function(){for(var a=g(this.value),b=arguments.length,c=Array(b),d=0;d<b;d++)c[d]=arguments[d];var f=h(e,a,c);return j(this.__wrapper__,f,this)}}),c};return n.defaults=h(c),n.inputParser=h(f),n.outputParser=h(m),n},u=function(a,b,c){var d=this,e=a?d[a]||(d[a]={}):d;return Object.assign(e,b),d.extendFn(b,c),d},v=function(a,b){var c=b&&b.extendFn,d=t(c);a.extendFn=d,a.extendWrapper=u},w=function(a,b){return Object.assign(a,b),a.branch=x,a.fn=h(b.fn),a.fn.__wrapper__=a,v(a,b),a.extendFn({invoke:function(a,b){for(var c=arguments.length,d=Array(c>2?c-2:0),e=2;e<c;e++)d[e-2]=arguments[e];return a[b].apply(a,d)}}),a},x=function(a){var b=a.parser,c=void 0===b?j:b,d=a.oldVersion,e=void 0===d?{}:d,f=function a(b){var d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c,e=Object.create(a.fn);return e.value=d(b),e};return w(f,e)},y=x({parser:g,oldVersion:self.jzmn});y.extendFn({at:function(a,b){return a[b]}},{input:"array"}).extendFn({prop:function(a,b){return a[b]}},{input:"individual",output:"bare"}),y.extendWrapper("util",{flatten:i,arrify:g}).extendWrapper("util",{each:p,map:q,filter:r,reduce:s},{input:"array"});var z=function(a){return a.nodeType},A=function(a){var b=Object.prototype.toString.call(a);return"object"===("undefined"==typeof a?"undefined":e(a))&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(b)&&(0==a.length||"object"===e(a[0])&&a[0].nodeType)},B=function(a,b){var c=Element.prototype,d=c.matches||c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return d.call(element,b)},C=function a(b,c,d){var e=g(b);return n(c)?(c.forEach(function(b){return a(e,b,d)}),e):(e.forEach(function(a){var b=l(d)?d(a,c):d;if(!z(a))throw new TypeError("Element is not a node");a.classList&&c.search(" ")<0?a.classList[b?"add":"remove"](c):a.className=b?a.className+=" "+c:a.className.replace(new RegExp("(^|\\b)"+c.split(" ").join("|")+"(\\b|$)","gi")," ")}),e)},D=function(a,b){var c=g(a)[0];if(!c)return!1;if(!z(c))throw new TypeError("Element is not a node");return c.classList?c.classList.contains(b):c.className.search(b)>-1},E=function(a,b){return C(a,b,function(a,b){return!D(a,b)})},F=function(a,b){return C(a,b,!1)},G=function(a,b){return C(a,b,!0)},H=/#(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/,I=/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/g,J=/[^.#][a-zA-Z]*/,K=function a(b,c){c&&(c.nodeType?b.appendChild(c):c===c.toString()?b.innerHTML+=c:c.length&&Array.prototype.forEach.call(c,a.bind(null,b)))},L=function(a,b){a.innerHTML="",K(a,b)},M=function(a,b,c){var d=a.match(J)[0],e=a.match(H),f=a.match(I),g=document.createElement(d);return e&&g.setAttribute("id",e[1]),f&&g.setAttribute("class",f.join("").split(".").join(" ")),b&&Object.keys(b).forEach(function(a,c){var d=b[a]instanceof Array?b[a].join(" "):b[a];g.setAttribute(a,d)}),K(g,c),g},N=y.branch({oldVersion:y,parser:function(a){return a?n(a)?a:a.nodeType?[a]:A(a)?f.slice.call(a):m(a)?f.slice.call(document.querySelectorAll(a)):[a]:[]}});N.extendWrapper("dom",{find:function(a,b){return g(a.querySelectorAll(b))},ancestor:function(a,b){return b?a.closest(b):a.parentNode},on:function(a,b,c){return a.addEventListener(b,c)}}),N.extendWrapper("dom",{matches:B,attr:function(a,b,c){return void 0===c?a.getAttribute(b):void(null===c?a.removeAttribute(b):a.setAttribute(b))},html:function(a,b){return void 0===b?a.innerHTML:void(a.innerHTML=b)}},{output:"bare || self"}),N.extendWrapper("dom",{hasClass:D},{output:"bare"}),N.extendWrapper("dom",{changeClass:C,toggleClass:E,removeClass:F,addClass:G},{input:"array"}),N.createEl=M,N.extendWrapper("dom",{appendChildren:K,replaceChildren:L}),N.el=function(a){return document.querySelector(a)},N.els=function(a){return document.querySelectorAll(a)},b.exports=N},{}]},{},[1])(1)});