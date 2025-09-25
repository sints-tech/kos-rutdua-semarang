// src/code-generation/components/cms/bundled/getRichTextJsonResolver.tsx?bundle
import {
    jsx as e
} from "react/jsx-runtime";
import {
    ComponentPresetsConsumer as r,
    Link as t,
    motion as n
} from "framer"; // ../../library/src/router/lazy.tsx
import {
    isValidElement as o
} from "react";
var a, i = "preload";

function u(e) {
    return "object" == typeof e && null !== e && ! /*#__PURE__*/ o(e) && i in e;
} // src/code-generation/components/cms/bundled/getRichTextJsonResolver.tsx?bundle
import {
    Fragment as c,
    createElement as l
} from "react"; // src/code-generation/components/cms/bundled/assert.ts
function m(e, ...r) {
    if (!e) throw Error("Assertion Error" + (r.length > 0 ? ": " + r.join(" ") : ""));
} // src/code-generation/components/cms/bundled/getRichTextJsonResolver.tsx?bundle
var s = ((a = s || {})[a.Fragment = 1] = "Fragment", a[a.Link = 2] = "Link", a[a.Module = 3] = "Module", a[a.Tag = 4] = "Tag", a[a.Text = 5] = "Text", a);

function f(o) {
    let a = /* @__PURE__ */ new Map;
    return i => {
        let s = a.get(i);
        if (s) return s;
        let f = JSON.parse(i),
            p = function a(i) {
                switch (i[0]) {
                    case 1 /* Fragment */ :
                        {
                            let [, ...e] = i,
                            r = e.map(a);
                            return /*#__PURE__*/ l(c, void 0, ...r);
                        }
                    case 2 /* Link */ :
                        {
                            let [, e, ...r] = i,
                            n = r.map(a);
                            return /*#__PURE__*/ l(t, e, ...n);
                        }
                    case 3 /* Module */ :
                        {
                            let [, t, n] = i,
                            a = o[t];
                            return m(a, "Module not found"),
                            u(a) && a.preload(),
                            /*#__PURE__*/ e(r, {
                                componentIdentifier: t,
                                children: r => /*#__PURE__*/ e(a, { ...r,
                                    ...n
                                })
                            });
                        }
                    case 4 /* Tag */ :
                        {
                            let [, e, r, ...t] = i,
                            o = t.map(a);
                            if ("a" === e) return /*#__PURE__*/ l(n.a, r, ...o);
                            return /*#__PURE__*/ l(e, r, ...o);
                        }
                    case 5 /* Text */ :
                        {
                            let [, e] = i;
                            return e;
                        }
                }
            }(f);
        return a.set(i, p), p;
    };
}
export {
    s as RichTextJsonType, f as getRichTextJsonResolver
};
export const __FramerMetadata__ = {
    "exports": {
        "getRichTextJsonResolver": {
            "type": "reactComponent",
            "name": "getRichTextJsonResolver",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "RichTextJsonType": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}