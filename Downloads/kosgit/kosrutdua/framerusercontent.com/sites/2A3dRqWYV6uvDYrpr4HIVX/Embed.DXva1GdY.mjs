import{__esmMin as e}from"./rolldown-runtime.BsiyxANx.mjs";import{init_jsx_runtime as t,init_npm_react_18_2 as n,init_ssg_sandbox_shims as r,p as i,pe as a,ue as o,window as s,ye as c}from"./react.BZjszdR-.mjs";import{ControlType as l,addPropertyControls as u,init_framer_L7DRXRFF as d}from"./framer.yFKJ9WG2.mjs";import{containerStyles as f,emptyStateStyle as p,init_colorFromToken as m,init_constants as h,init_isBrowser as g,init_isMotionValue as _,init_propUtils as v,init_useAutoMotionValue as y,init_useConstant as b,init_useControlledState as x,init_useFontControls as S,init_useOnChange as C,init_useOnNavigationTargetChange as w,init_useRenderTarget as T,init_useUniqueClassName as E,init_variantUtils as D,useIsOnCanvas as O}from"./shared-lib.DNzPQo1K.mjs";var k=e((()=>{h(),w(),b(),m(),_(),E(),D(),g(),C(),y(),S(),T(),x(),v()}));function A({type:e,url:t,html:n,zoom:r,radius:a,border:o,style:s={}}){return e===`url`&&t?i(M,{url:t,zoom:r,radius:a,border:o,style:s}):e===`html`&&n?i(P,{html:n,style:s}):i(j,{style:s})}function j({style:e}){return i(`div`,{style:{minHeight:V(e),...p,overflow:`hidden`,...e},children:i(`div`,{style:W,children:`To embed a website or widget, add it to the properties\xA0panel.`})})}function M({url:e,zoom:t,radius:n,border:r,style:a}){let s=!a.height;/[a-z]+:\/\//.test(e)||(e=`https://`+e);let l=O(),[u,d]=c(l?void 0:!1);if(o(()=>{if(!l)return;let t=!0;d(void 0);async function n(){let n=await fetch(`https://api.framer.com/functions/check-iframe-url?url=`+encodeURIComponent(e));if(n.status==200){let{isBlocked:e}=await n.json();t&&d(e)}else{let e=await n.text();console.error(e),d(Error(`This site can’t be reached.`))}}return n().catch(e=>{console.error(e),d(e)}),()=>{t=!1}},[e]),l&&s)return i(B,{message:`URL embeds do not support auto height.`,style:a});if(!e.startsWith(`https://`))return i(B,{message:`Unsupported protocol.`,style:a});if(u===void 0)return i(z,{});if(u instanceof Error)return i(B,{message:u.message,style:a});if(u===!0){let t=`Can’t embed ${e} due to its content security policy.`;return i(B,{message:t,style:a})}return i(`iframe`,{src:e,style:{...H,...a,...r,zoom:t,borderRadius:n,transformOrigin:`top center`},loading:`lazy`,fetchPriority:l?`low`:`auto`,referrerPolicy:`no-referrer`,sandbox:N(l)})}function N(e){let t=[`allow-same-origin`,`allow-scripts`];return e||t.push(`allow-downloads`,`allow-forms`,`allow-modals`,`allow-orientation-lock`,`allow-pointer-lock`,`allow-popups`,`allow-popups-to-escape-sandbox`,`allow-presentation`,`allow-storage-access-by-user-activation`,`allow-top-navigation-by-user-activation`),t.join(` `)}function P({html:e,...t}){if(e.includes(`<\/script>`)){let n=e.includes(`</spline-viewer>`),r=e.includes(`<!-- framer-direct-embed -->`);return i(n||r?I:F,{html:e,...t})}return i(L,{html:e,...t})}function F({html:e,style:t}){let n=a(),[r,l]=c(0);o(()=>{let e=n.current?.contentWindow;function t(t){if(t.source!==e)return;let n=t.data;if(typeof n!=`object`||!n)return;let r=n.embedHeight;typeof r==`number`&&l(r)}return s.addEventListener(`message`,t),e?.postMessage(`getEmbedHeight`,`*`),()=>{s.removeEventListener(`message`,t)}},[]);let u=`
<html>
    <head>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }

            body {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :root {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            * {
                box-sizing: border-box;
                -webkit-font-smoothing: inherit;
            }

            h1, h2, h3, h4, h5, h6, p, figure {
                margin: 0;
            }

            body, input, textarea, select, button {
                font-size: 12px;
                font-family: sans-serif;
            }
        </style>
    </head>
    <body>
        ${e}
        <script type="module">
            let height = 0

            function sendEmbedHeight() {
                window.parent.postMessage({
                    embedHeight: height
                }, "*")
            }

            const observer = new ResizeObserver((entries) => {
                if (entries.length !== 1) return
                const entry = entries[0]
                if (entry.target !== document.body) return

                height = entry.contentRect.height
                sendEmbedHeight()
            })

            observer.observe(document.body)

            window.addEventListener("message", (event) => {
                if (event.source !== window.parent) return
                if (event.data !== "getEmbedHeight") return
                sendEmbedHeight()
            })
        <\/script>
    <body>
</html>
`,d={...H,...t};return t.height||(d.height=r+`px`),i(`iframe`,{ref:n,style:d,srcDoc:u})}function I({html:e,style:t}){let n=a();return o(()=>{let t=n.current;if(t)return t.innerHTML=e,R(t),()=>{t.innerHTML=``}},[e]),i(`div`,{ref:n,style:{...U,...t}})}function L({html:e,style:t}){return i(`div`,{style:{...U,...t},dangerouslySetInnerHTML:{__html:e}})}function R(e){if(e instanceof Element&&e.tagName===`SCRIPT`){let t=document.createElement(`script`);t.text=e.innerHTML;for(let{name:n,value:r}of e.attributes)t.setAttribute(n,r);e.parentElement.replaceChild(t,e)}else for(let t of e.childNodes)R(t)}function z(){return i(`div`,{className:`framerInternalUI-componentPlaceholder`,style:{...f,overflow:`hidden`},children:i(`div`,{style:W,children:`Loading…`})})}function B({message:e,style:t}){return i(`div`,{className:`framerInternalUI-errorPlaceholder`,style:{minHeight:V(t),...f,overflow:`hidden`,...t},children:i(`div`,{style:W,children:e})})}function V(e){if(!e.height)return 200}var H,U,W,G=e((()=>{r(),t(),n(),d(),k(),u(A,{type:{type:l.Enum,defaultValue:`url`,displaySegmentedControl:!0,options:[`url`,`html`],optionTitles:[`URL`,`HTML`]},url:{title:`URL`,type:l.String,description:`Some websites don’t support embedding.`,hidden(e){return e.type!==`url`}},html:{title:`HTML`,type:l.String,displayTextArea:!0,hidden(e){return e.type!==`html`}},border:{title:`Border`,type:l.Border,optional:!0,hidden(e){return e.type!==`url`}},radius:{type:l.BorderRadius,title:`Radius`,hidden(e){return e.type!==`url`}},zoom:{title:`Zoom`,defaultValue:1,type:l.Number,hidden(e){return e.type!==`url`},min:.1,max:1,step:.1,displayStepper:!0}}),H={width:`100%`,height:`100%`,border:`none`},U={width:`100%`,height:`100%`,display:`flex`,flexDirection:`column`,justifyContent:`center`,alignItems:`center`},W={textAlign:`center`,minWidth:140}}));export{A as Embed,G as init_Embed};
//# sourceMappingURL=Embed.DXva1GdY.mjs.map