!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.1.2"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.1.2"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(1);const s=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class r extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}n(0);const c=[],a={get:()=>c,add(e){c.push(...e)}};const o={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},i=e=>[o.prefix,e,o.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||i(o.precache),l=new Set;const u=(e,t)=>e.filter(e=>t in e),f=async({request:e,mode:t,plugins:n=[]})=>{const s=u(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},d=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const c=await self.caches.open(e),a=await f({plugins:r,request:t,mode:"read"});let o=await c.match(a,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:a})}return o},p=async({cacheName:e,request:t,response:n,event:s,plugins:c=[],matchOptions:a})=>{const o=await f({plugins:c,request:t,mode:"write"});if(!n)throw new r("cache-put-with-no-response",{url:(i=o.url,new URL(String(i),location.href).href.replace(new RegExp("^"+location.origin),""))});var i;const h=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,c=!1;for(const t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return c||(r=r&&200===r.status?r:void 0),r||null})({event:s,plugins:c,response:n,request:o});if(!h)return void 0;const p=await self.caches.open(e),y=u(c,"cacheDidUpdate"),w=y.length>0?await d({cacheName:e,matchOptions:a,request:o}):null;try{await p.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of l)await e()}(),e}for(const t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:w,newResponse:h,request:o})},y=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const c=u(s,"fetchDidFail"),a=c.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:n,request:o,response:r}));return r}catch(e){0;for(const t of c)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:o.clone()});throw e}};let w;async function g(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,c=function(){if(void 0===w){const e=new Response("");if("body"in e)try{new Response(e.body),w=!0}catch(e){w=!1}w=!1}return w}()?n.body:await n.blob();return new Response(c,r)}function m(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),c=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:c.href}}class R{constructor(e){this._cacheName=h(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=m(n),c="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,c),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),c=await r.keys(),a=new Set(c.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)a.has(t)?s.push(e):n.push({cacheKey:t,url:e});const o=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),c=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:c,event:e,integrity:r,plugins:t,url:s})});return await Promise.all(o),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:c,integrity:a}){const o=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let i,h=await y({event:s,plugins:c,request:o});for(const e of c||[])"cacheWillUpdate"in e&&(i=e);if(!(i?await i.cacheWillUpdate({event:s,request:o,response:h}):h.status<400))throw new r("bad-precaching-response",{url:t,status:h.status});h.redirected&&(h=await g(h)),await p({event:s,plugins:c,response:h,request:e===t?o:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new r("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let v;const _=()=>(v||(v=new R),v);const U=(e,t)=>{const n=_().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const a=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(c,t);if(yield a.href,n&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=n,yield e.href}if(s){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let L=!1;function q(e){L||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=h();self.addEventListener("fetch",c=>{const a=U(c.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!a)return void 0;let o=self.caches.open(r).then(e=>e.match(a)).then(e=>e||fetch(a));c.respondWith(o)})})(e),L=!0)}const T=e=>{const t=_(),n=a.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},K=e=>{const t=_();e.waitUntil(t.activate())};var b;(function(e){_().addToCacheList(e),e.length>0&&(self.addEventListener("install",T),self.addEventListener("activate",K))})([{'revision':'3278670bba5917b5c810045cc1f4e91b','url':'assets/sprites/answer-box.png'},{'revision':'175e0ad6ee522aad1bf405468b2bbb16','url':'assets/sprites/blackboard.png'},{'revision':'ca954d2b3ef68b9921299cf5a995010a','url':'assets/sprites/bullet.png'},{'revision':'17a66c7e2f2f450520ed565f666e7e7d','url':'assets/sprites/door.png'},{'revision':'61b5bd753a012fab703e0673b120e93a','url':'assets/sprites/gun.png'},{'revision':'173f0d115ce8121c006840ea9b4c61d6','url':'assets/sprites/hand.png'},{'revision':'f2fea59e8da71f6f62bcd49cbf8b2e0e','url':'assets/sprites/monster-1.png'},{'revision':'775dd6588c3739c2f4a56b837b8dbdcd','url':'assets/sprites/monster-5.png'},{'revision':'556960b566530f95d55bca1fc38996a1','url':'assets/sprites/monster-hand.png'},{'revision':'0dcf8c3f5470849c3b87d24772592863','url':'assets/sprites/platform.png'},{'revision':'b35f2b0fbb33c440f85e6ccff9f11bf6','url':'assets/sprites/player.png'},{'revision':'f700c7ed862d1aec4bcf2894926980c7','url':'assets/sprites/player_complete.png'},{'revision':'a936ee087954465de42ee0e82d5e4581','url':'assets/sprites/sprites.svg'},{'revision':'05b81306badc7c1db9a56de6fde5562c','url':'assets/sprites/teacher.png'},{'revision':'8a75f69ddf82ae1716192356a32194c5','url':'favicon.ico'},{'revision':'2ffbc23293ee8a797bc61e9c02534206','url':'icons/icons-192.png'},{'revision':'8bdcc486cda9b423f50e886f2ddb6604','url':'icons/icons-512.png'},{'revision':'1e172399de98592e0fd3aa311b2a69de','url':'index.html'},{'revision':'3830bb2da6c67d33af98d96b1b07511a','url':'main.2d65e23758f43d536485.bundle.js'},{'revision':'ff0d08eca92dee1c2fc3a94297f58aeb','url':'manifest.json'},{'revision':'a59c59a0d7811c009edaa4264268248f','url':'vendors.ed12d36a0ce141f2f15e.bundle.js'}]),q(b)}]);