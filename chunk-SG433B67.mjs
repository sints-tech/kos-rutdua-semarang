import{a as g,b as V,i as w}from"./chunk-RCS3CGJP.mjs";import{fa as m,ia as x,n as y,s as v,t as C,w as r}from"./chunk-ORYOEHBX.mjs";import{c as h}from"./chunk-XNQNUANK.mjs";function E({type:e,url:t,html:o,zoom:n,radius:a,border:d,style:i={}}){return e==="url"&&t?r(_,{url:t,zoom:n,radius:a,border:d,style:i}):e==="html"&&o?r(z,{html:o,style:i}):r(A,{style:i})}x(E,{type:{type:m.Enum,defaultValue:"url",displaySegmentedControl:!0,options:["url","html"],optionTitles:["URL","HTML"]},url:{title:"URL",type:m.String,description:"Some websites don\u2019t support embedding.",hidden(e){return e.type!=="url"}},html:{title:"HTML",type:m.String,displayTextArea:!0,hidden(e){return e.type!=="html"}},border:{title:"Border",type:m.Border,optional:!0,hidden(e){return e.type!=="url"}},radius:{type:m.BorderRadius,title:"Radius",hidden(e){return e.type!=="url"}},zoom:{title:"Zoom",defaultValue:1,type:m.Number,hidden(e){return e.type!=="url"},min:.1,max:1,step:.1,displayStepper:!0}});function A({style:e}){return r("div",{style:{minHeight:T(e),...V,overflow:"hidden",...e},children:r("div",{style:S,children:"To embed a website or widget, add it to the properties\xA0panel."})})}function _({url:e,zoom:t,radius:o,border:n,style:a}){let d=!a.height;/[a-z]+:\/\//.test(e)||(e="https://"+e);let i=w(),[f,l]=C(i?void 0:!1);if(y(()=>{if(!i)return;let c=!0;l(void 0);async function p(){let s=await fetch("https://api.framer.com/functions/check-iframe-url?url="+encodeURIComponent(e));if(s.status==200){let{isBlocked:u}=await s.json();c&&l(u)}else{let u=await s.text();console.error(u);let L=new Error("This site can\u2019t be reached.");l(L)}}return p().catch(s=>{console.error(s),l(s)}),()=>{c=!1}},[e]),i&&d)return r(b,{message:"URL embeds do not support auto height.",style:a});if(!e.startsWith("https://"))return r(b,{message:"Unsupported protocol.",style:a});if(f===void 0)return r(j,{});if(f instanceof Error)return r(b,{message:f.message,style:a});if(f===!0){let c=`Can\u2019t embed ${e} due to its content security policy.`;return r(b,{message:c,style:a})}return r("iframe",{src:e,style:{...H,...a,...n,zoom:t,borderRadius:o,transformOrigin:"top center"},loading:"lazy",fetchPriority:i?"low":"auto",referrerPolicy:"no-referrer",sandbox:k(i)})}var H={width:"100%",height:"100%",border:"none"};function k(e){let t=["allow-same-origin","allow-scripts"];return e||t.push("allow-downloads","allow-forms","allow-modals","allow-orientation-lock","allow-pointer-lock","allow-popups","allow-popups-to-escape-sandbox","allow-presentation","allow-storage-access-by-user-activation","allow-top-navigation-by-user-activation"),t.join(" ")}function z({html:e,...t}){if(e.includes("<\/script>")){let n=e.includes("</spline-viewer>"),a=e.includes("<!-- framer-direct-embed -->");return n||a?r(P,{html:e,...t}):r(U,{html:e,...t})}return r(W,{html:e,...t})}function U({html:e,style:t}){let o=v(),[n,a]=C(0);y(()=>{let l=o.current?.contentWindow;function c(p){if(p.source!==l)return;let s=p.data;if(typeof s!="object"||s===null)return;let u=s.embedHeight;typeof u=="number"&&a(u)}return h.addEventListener("message",c),l?.postMessage("getEmbedHeight","*"),()=>{h.removeEventListener("message",c)}},[]);let d=`
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
`,i={...H,...t};return!t.height&&(i.height=n+"px"),r("iframe",{ref:o,style:i,srcDoc:d})}function P({html:e,style:t}){let o=v();return y(()=>{let n=o.current;if(n)return n.innerHTML=e,M(n),()=>{n.innerHTML=""}},[e]),r("div",{ref:o,style:{...I,...t}})}function W({html:e,style:t}){return r("div",{style:{...I,...t},dangerouslySetInnerHTML:{__html:e}})}var I={width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"};function M(e){if(e instanceof Element&&e.tagName==="SCRIPT"){let t=document.createElement("script");t.text=e.innerHTML;for(let{name:o,value:n}of e.attributes)t.setAttribute(o,n);e.parentElement.replaceChild(t,e)}else for(let t of e.childNodes)M(t)}function j(){return r("div",{className:"framerInternalUI-componentPlaceholder",style:{...g,overflow:"hidden"},children:r("div",{style:S,children:"Loading\u2026"})})}function b({message:e,style:t}){return r("div",{className:"framerInternalUI-errorPlaceholder",style:{minHeight:T(t),...g,overflow:"hidden",...t},children:r("div",{style:S,children:e})})}var S={textAlign:"center",minWidth:140};function T(e){if(!e.height)return 200}export{E as a};
//# sourceMappingURL=chunk-SG433B67.mjs.map
