var f;(n=>(n.isTouch="ontouchstart"in window||navigator.maxTouchPoints>0,n.isChrome=navigator.userAgent.toLowerCase().includes("chrome/"),n.isWebKit=navigator.userAgent.toLowerCase().includes("applewebkit/"),n.isSafari=n.isWebKit&&!n.isChrome,n.isSafariDesktop=n.isSafari&&!n.isTouch,n.isWindows=/Win/u.test(navigator.platform),n.isMacOS=/Mac/u.test(navigator.platform),n.isAndroidWebView=n.isChrome&&navigator.userAgent.toLowerCase().includes("; wv)"),n.isIosWebView=n.isWebKit&&!navigator.userAgent.toLowerCase().includes("safari/"),n.isWebView=n.isAndroidWebView||n.isIosWebView))(f||={});var p="__framer_hide_editorbar_until",w="2147483647";function M(){let s=localStorage.getItem(p);if(!s)return!1;let d=Date.now(),c=Number(s);return d>=c||Number.isNaN(c)?(localStorage.removeItem(p),!1):!0}function V(){return window.self!==window.top}var H=`
#__framer-editorbar {
    --padding-right: 10px;
    color-scheme: light;
    overflow: hidden;
    position: fixed;
    right: var(--padding-right);
    border: none;
    z-index: ${w};
    top: 0;
    width: calc(100vw - var(--padding-right));
    height: 100vh;
}

#__framer-editorbar.status_hidden {
    display: none;
}

#__framer-editorbar.status_measuring {
    clip-path: unset;
}

#__framer-editorbar.fullscreen {
    --padding-right: 0px;
    left: 0;
    right: initial;
}
`,b=document.createElement("style");b.type="text/css";b.innerHTML=H;document.head.appendChild(b);var N=new URL(import.meta.url),m=N.origin,P=/^\/(.+)\/.+$/u.exec(N.pathname)?.[1]??"";function X({dependencies:s}){if(s.__version!==1)throw new Error("Unsupported dependencies version");if(M()||V()||f.isWebView)return function(){return null};let{createElement:d,memo:c,useCallback:g,useEffect:u,useRef:S,useState:l}=s.react,{createPortal:E}=s["react-dom"],{useCurrentRoute:h,useLocaleInfo:x,useRouter:n}=s.framer;function v(){let[r,o]=l(!1),t=g(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>{o(!0)}):setTimeout(()=>{o(!0)},300)},[]);return u(()=>{let e;return document.readyState==="complete"?t():(e=()=>{document.readyState==="complete"&&t()},document.addEventListener("readystatechange",e,{once:!0})),()=>{e&&document.removeEventListener("readystatechange",e)}},[t]),r}function D(){let[r,o]=l({className:"status_hidden"});return u(()=>{let t=e=>{e.origin===m&&typeof e.data=="object"&&e.data?.apiVersion===1&&(e.data.type==="beginSizeMeasuring"&&o({className:"status_measuring"}),e.data.type==="updateStyle"&&o({style:{clipPath:e.data.clipPath}}),e.data.type==="editorBarHidden"&&(o({className:"status_hidden"}),window.removeEventListener("message",t)),e.data.type==="enterFullscreen"&&(o({className:"fullscreen"}),window.removeEventListener("message",t)))};return window.addEventListener("message",t),()=>{window.removeEventListener("message",t)}},[]),r}function R(){let[r,o]=l(!1);return u(()=>{if(r)return;let t=e=>{if(e.origin===m&&typeof e.data=="object"&&e.data?.apiVersion===1&&e.data.type==="editorBarHidden"&&!r){let a=Date.now()+6048e5;localStorage.setItem(p,a.toString()),o(!0),window.removeEventListener("message",t)}};return window.addEventListener("message",t),()=>{window.removeEventListener("message",t)}},[]),r}function L({iframeRef:r}){let[o,t]=l(void 0),e=C();return u(()=>{t(i=>i??e),e&&r.current&&r.current.contentWindow.postMessage({apiVersion:1,type:"updateNodeId",nodeId:e},m)},[r,e]),o}function C(){let r=h(),o=x()?.activeLocale??void 0,{collectionUtils:t}=n(),[e,i]=l(void 0),a=r?.id,_=r?.collectionId,y=r?.pathVariables;return u(()=>{let I=!1;return A({activeLocale:o,collectionId:_,collectionUtils:t,pathVariables:y}).then(W=>{I||i(W??a)}).catch(()=>{I||i(a)}),()=>{I=!0}},[o,_,t,y,a]),e}async function A({activeLocale:r,collectionId:o,collectionUtils:t,pathVariables:e}){if(o){let i=Object.values(e);if(i.length!==1)return;let a=t?.[o];return await(await a?.())?.getRecordIdBySlug(i[0],r)}}function T({framerSiteId:r,features:o,iframeRef:t,measuringProps:e,initialNodeId:i}){let a=new URLSearchParams;return a.set("framerSiteId",r),a.set("nodeId",i),a.set("source",window.location.hostname),a.set("features",JSON.stringify(o||{})),d("iframe",{...e,id:"__framer-editorbar",ref:t,src:`${m}/${P}?${a.toString()}`,className:e.className})}function U({framerSiteId:r,features:o}){let t=S(null),e=v(),i=D(),a=L({iframeRef:t});return R(),!e||!a?null:E(d(T,{framerSiteId:r,features:{...o,editorBarSubtle:!0},iframeRef:t,measuringProps:i,initialNodeId:a}),document.body)}return c(U)}export{X as createEditorBar};
