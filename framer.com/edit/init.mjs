var ee=Object.defineProperty;var te=(e,t,n)=>t in e?ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var A=(e,t,n)=>te(e,typeof t!="symbol"?t+"":t,n);var R="__framer_force_showing_editorbar_since",I="2147483647";var b=12,k="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAApNJREFUSA2tlUtLlFEYgEe7mtFFQ8NLFBG1SJAwahtiLVy5ceVSEPQH1LZf0Lp9FO1bdYNyI7gyBFcS2kAzilYq3sfxeYZ55Zv6FGfohWfOd97vnPd23u9MXeZoaeb1Q7gPHXAFzsAS5GACxiEPqVKXqs1kmtAPQi+cAtedToz1PJ8ExxPwDl7CAlRImoN7rBiF86ABHTiGAzMIh8n3O+ifwWc4EL0n5TGTYQijvjNSxbUadozInUeGZ3nuh1WYgpIkM+hGMwYajAgdrfUn+AaLoLTCAxiAOxCZxL4RdB+gZMjxEjwHo4hS8Jh5DR9hz0mKaNizegoNEI7Wee6FXJTISG6AUgDr+QImoAiHie+mwZJow/PRps4uwnsnRj8Epqc4voVJJ8eULOtW4BFYYjPpgjc+3IWI2sh/wFeoVl6xYQ48dDGLfjOwc/ygQqz595hUMVouS9QHBm4l6k3HWpnBLqicgVrlCxujSbR1Swd+UDpQYRS/oVaZZ2MWwlZBB9Zdxf+QTYw8SRgq6sAvz7vH6JULEB9USVHFjzZskgPRQR4ayxoXXIdaHdg9HrB2rErByWxZERnYtrWUzD0esDbtTmXPhzXwHrKLxEUbYGbVyDkWWwkdadfqbPmwDXZSCyh2VAf8BM/nOOJH5Y0QopMt2I5U/KO4DZZJB47XwEX+ex0mGroMV8sLwp56gyuGwiyW4SZ4c8bt2cZzO7jBNeqtsRHbeZ1g9krsMbhfYPv/c5gecA+4yAVuitFszE5Hjva872OMdXagF19JIoOYWyozMTI3J0tmA6gLvXPfO1cc/XOqOLe/HbjwD8yCXRD3VNJROEgatiRZMJsKsbZHia3nAdphtq8fkiWyXJbBe8uM1aXKPouNnz2Bm1kwAAAAAElFTkSuQmCC",S="__framer-editorbar-container",h="__framer-editorbar-label",x="__framer-editorbar-button",v="__framer-editorbar-loading-spinner",T="__framer-editorbar-button-tooltip-visible",ne=`
#${S} {
    align-items: center;
    bottom: 50%;
    display: flex;
    gap: 8px;
    position: fixed;
    right: 10px;
    transform: translateY(50%);
    z-index: calc(${I});
}

#${h} {
    background-color: #111;
    border-radius: 8px;
    font-family: "Inter", "Inter-Regular", system-ui, Arial, sans-serif;
    font-size: 12px;
    height: fit-content;
    opacity: 0;
    padding: 4px 8px;
    transition: opacity 0.4s ease-out;
    font-weight: 500;
}

#${x} {
    all: unset;
    align-items: center;
    border-radius: 15px;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 30px;
}

#${h}.${T} {
    opacity: 1;
}

#${h}, #${x} {
    backdrop-filter: blur(10px);
    background-color: rgba(34, 34, 34, 0.8);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px;
    color: #fff;
}

#${v} {
    width: ${b}px;
    height: ${b}px;
    -webkit-mask: url(${k});
    mask: url(${k});
    -webkit-mask-size: ${b}px;
    mask-size: ${b}px;
    background-color: #fff;


    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-name: __framer-loading-spin;
    animation-timing-function: linear;
}

@keyframes __framer-loading-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`,O=document.createElement("style");O.innerHTML=ne;document.head.appendChild(O);var L;(s=>(s.isTouch="ontouchstart"in window||navigator.maxTouchPoints>0,s.isChrome=navigator.userAgent.toLowerCase().includes("chrome/"),s.isWebKit=navigator.userAgent.toLowerCase().includes("applewebkit/"),s.isSafari=s.isWebKit&&!s.isChrome,s.isSafariDesktop=s.isSafari&&!s.isTouch,s.isWindows=/Win/u.test(navigator.platform),s.isMacOS=/Mac/u.test(navigator.platform),s.isAndroidWebView=s.isChrome&&navigator.userAgent.toLowerCase().includes("; wv)"),s.isIosWebView=s.isWebKit&&!navigator.userAgent.toLowerCase().includes("safari/"),s.isWebView=s.isAndroidWebView||s.isIosWebView))(L||={});var w=class extends Promise{constructor(){let n,i;super((o,r)=>{n=o,i=r});A(this,"_state","initial");A(this,"resolve");A(this,"reject");this.resolve=o=>{this._state="fulfilled",n(o)},this.reject=o=>{this._state="rejected",i(o)}}get state(){return this._state}pending(){return this._state="pending",this}isResolved(){return this._state==="fulfilled"||this._state==="rejected"}};w.prototype.constructor=Promise;var C="framer_",f="editSite";function E(e){let t=window.__framer_editorBarDependencies;if(!t)throw new Error("Dependencies not found");if(t.__version<1||t.__version>2)throw new Error("Unsupported version");let n=t[e];if(!n)throw new Error("Dependency not found");return n}var{createElement:D,memo:F,useCallback:M,useEffect:p,useRef:N,useState:u}=E("react");var{createPortal:B}=E("react-dom");var U="autoplay";function d(e,t,n){let{children:i,...o}=t??{};return D(e,n?{...o,key:n}:o,i)}var P=d;function V({isLoading:e,isEditorVisible:t,onClick:n}){let[i,o]=u(!1),[r,a]=u(t);return r!==t&&(a(t),t||o(!1)),P("div",{id:S,children:[d("span",{"aria-label":"Edit Framer Content",id:h,className:i?T:void 0,children:"Edit Content"}),d("button",{type:"button","aria-labelledby":h,id:x,onClick:n,onMouseMove:()=>{o(!0)},onMouseLeave:()=>{o(!1)},children:e?d(re,{}):d(oe,{})})]})}function oe(){return P("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",fill:"none",children:[d("path",{d:"M8.75 2.25a1.77 1.77 0 0 1 2.5 0h0c.69.69.69 1.81 0 2.5l-7 7h-2.5v-2.5Z",fill:"transparent",strokeWidth:"1.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),d("path",{d:"M8 11.75h3.75",fill:"transparent",strokeWidth:"1.5",stroke:"currentColor",strokeLinecap:"round"})]})}function re(){return d("div",{id:v})}var _="data-original-href",W="link[rel*='icon']",ie=`${W}:not([${_}])`,se="https://framerusercontent.com/sites/icons/writing-hand-favicon.png";function z(){document.querySelectorAll(ie).forEach(e=>{e instanceof HTMLLinkElement&&(e.setAttribute(_,e.href),e.setAttribute("href",se))})}function j(){document.querySelectorAll(W).forEach(e=>{e instanceof HTMLLinkElement&&e.getAttribute(_)&&(e.setAttribute("href",e.getAttribute(_)??""),e.removeAttribute(_))})}function Y(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function H(e,t){let[n,i]=u(!1);return p(()=>{let o=r=>{if(r.origin!==e||!Y(r.data))return;let{apiVersion:a,type:l,component:c}=r.data;a===1&&l==="initializeComponent"&&c===t&&i(!0)};return window.addEventListener("message",o),()=>{window.removeEventListener("message",o)}},[e,t]),n}var{useCurrentRoute:X,useLocaleInfo:Z,useRouter:G}=E("framer");function $(){let e=X(),t=Z()?.activeLocale??void 0,{collectionUtils:n}=G(),[i,o]=u(),r=e?.id,a=e?.collectionId,l=e?.pathVariables;return p(()=>{if(!r)return;let c=!1;return ae(t,a,n,l).then(g=>{c||o({collectionItemNodeId:g,webPageNodeId:r})}).catch(()=>{c||o({collectionItemNodeId:void 0,webPageNodeId:r})}),()=>{c=!0}},[t,a,n,l,r]),i}async function ae(e,t,n,i){if(!t)return;let o=Object.values(i??{}),[r]=o;if(o.length!==1||!r||typeof r!="string")return;let a=n?.[t];return(await a?.())?.getRecordIdBySlug(r,e)}function J(e,t){let n=$(),i=H(t,"OnPageActiveRouteStore");p(()=>{i&&e.current?.contentWindow?.postMessage({apiVersion:1,type:"updateNodeIds",nodeIds:n},t)},[e,n,t,i])}var ue=Date.now();function de(){return window.self!==window.top}var le=`
#__framer-editorbar {
    /* https://sergeyski.com/css-color-scheme-and-iframes-lessons-learned-from-disqus-background-bug */
    color-scheme: light dark;
    overflow: hidden;
    position: fixed;
    border: none;
    z-index: calc(${I});
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    touch-action: manipulation;
}

@supports (height: 100dvh) {
    #__framer-editorbar {
        height: 100dvh;
    }
}

#__framer-editorbar.status_hidden {
    display: none;
}

#__framer-editorbar.status_visually_hidden {
    clip-path: circle(1px at calc(100% - 20px) calc(50% + 4px));
    z-index: calc(${I} - 1);
}

#__framer-editorbar.status_measuring {
    clip-path: unset;
}
`,K=document.createElement("style");K.innerHTML=le;document.head.appendChild(K);var y=new URL(import.meta.url).origin;function fe(){if(localStorage.getItem(R)!==null)return q(),!0;let e=new URL(window.location.href),t=e.searchParams.has(f),n=e.searchParams.has(f.toLowerCase());if(!t&&!n)return!1;let i=t?f:f.toLowerCase(),o=e.searchParams.get(i);if(o!==""&&o!==null)return!1;for(let r of e.searchParams.keys())if(r!==f&&r!==f.toLowerCase()&&!r.startsWith(C))return!1;return q(),localStorage.setItem(R,new Date().toString()),!0}function q(){let e=new URL(window.location.href);e.searchParams.has(f)&&(e.searchParams.delete(f),e.searchParams.delete(f.toLowerCase()),window.history.replaceState({},"",e.toString()))}var pe=fe();function Q(){return null}function me(){let e=document.getElementsByClassName("lenis-scrolling");for(let t of e)t.classList.remove("lenis-scrolling")}function ge(){let[e,t]=u(!1),n=M(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>{t(!0)}):setTimeout(()=>{t(!0)},300)},[]);return p(()=>{document.readyState==="complete"?n():document.addEventListener("readystatechange",()=>{document.readyState==="complete"&&n()},{once:!0})},[n]),e}function he(e){let[t,n]=u(!1),[i,o]=u(!0),[r,a]=u(!1),[l,c]=u("hidden"),g=N();return g.current??=new w,p(()=>{function s(m){m.origin===y&&typeof m.data=="object"&&m.data?.apiVersion===1&&(m.data.type==="accessResult"&&m.data.data.status==="success"?n(!0):m.data.type==="exitFullscreen"?(document.body.style.overflow="auto",window.scrollTo({behavior:"instant",top:m.data.position?.top??0}),c("hidden")):m.data.type==="sandboxReadyState"&&m.data.data.status==="ready"&&(o(!1),setTimeout(()=>{g.current?.resolve()},50)))}return window.addEventListener("message",s),()=>{window.removeEventListener("message",s)}},[n,o,c]),{showEntrypointButton:t,entrypointButtonLoading:r?i:!1,iframeState:l,onEditContent:()=>{e.current?.contentWindow?.postMessage({apiVersion:1,type:"enterOnPageEditing"},y),c("fullscreen"),a(!0),g.current?.then(()=>{e.current?.contentWindow?.postMessage({apiVersion:1,type:"showCanvas",position:{top:window.scrollY}},y),setTimeout(()=>{document.body.style.overflow="hidden"},300),a(!1)}),me()}}}function Ee({framerSiteId:e,features:t,iframeRef:n,className:i}){J(n,y);let o=new URL(import.meta.url),r=o.pathname.lastIndexOf("/");if(r<0)throw new Error("Invalid pathname");let a=t?.editorBarDisableFrameAncestorsSecurity?"fake-domain.example":window.location.hostname;return o.pathname=o.pathname.slice(0,r),o.searchParams.set("framerSiteId",e),o.searchParams.set("source",a),o.searchParams.set("features",JSON.stringify(t||{})),o.searchParams.set("loadStart",ue.toString()),pe&&o.searchParams.set("forceShow","true"),d("iframe",{id:"__framer-editorbar",ref:n,src:o.href,"aria-hidden":"true",allow:U,tabIndex:-1,className:i})}function Ie({framerSiteId:e,features:t}){let n=N(null),i=ge(),{showEntrypointButton:o,entrypointButtonLoading:r,iframeState:a,onEditContent:l}=he(n);if(p(()=>{if(a!=="fullscreen")return;let g=document.title;return document.title="Editing Page...",z(),()=>{document.title=g,j()}},[a]),!i)return null;let c;return a==="fullscreen"?c="fullscreen":o?c="status_visually_hidden":c="status_hidden",B([o?d(V,{isLoading:r,onClick:l,isEditorVisible:a==="fullscreen"},"button"):null,d(Ee,{framerSiteId:e,features:t,iframeRef:n,className:c},"iframe")],document.body)}function dt(){return de()?(console.log("[Framer Editor Bar] Unavailable because site is embedded in iframe"),Q):L.isWebView?(console.log("[Framer Editor Bar] Unavailable because running in WebView"),Q):F(Ie)}export{dt as createEditorBar};
//# sourceMappingURL=https://app.framerstatic.com/editorbar-initializer.46BHEGX3.mjs.map
