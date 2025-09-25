import {
    getStyleFromHsl as e
} from "tsparticles-engine";
const a = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;

function replaceColorSvg(r, o, t) {
    const {
        svgData: i
    } = r;
    if (!i) return "";
    const n = e(o, t);
    if (i.includes("fill")) return i.replace(a, (() => n));
    const s = i.indexOf(">");
    return `${i.substring(0,s)} fill="${n}"${i.substring(s)}`
}
async function loadImage(e) {
    return new Promise((a => {
        e.loading = true;
        const r = new Image;
        e.element = r;
        r.addEventListener("load", (() => {
            e.loading = false;
            a()
        }));
        r.addEventListener("error", (() => {
            e.element = void 0;
            e.error = true;
            e.loading = false;
            console.error(`Error tsParticles - loading image: ${e.source}`);
            a()
        }));
        r.src = e.source
    }))
}
async function downloadSvgImage(e) {
    if ("svg" !== e.type) {
        await loadImage(e);
        return
    }
    e.loading = true;
    const a = await fetch(e.source);
    if (!a.ok) {
        console.error("Error tsParticles - Image not found");
        e.error = true
    }
    e.error || (e.svgData = await a.text());
    e.loading = false
}

function replaceImageColor(e, a, r, o) {
    var t, i, n;
    const s = replaceColorSvg(e, r, null !== (i = null === (t = o.opacity) || void 0 === t ? void 0 : t.value) && void 0 !== i ? i : 1),
        l = {
            color: r,
            data: Object.assign(Object.assign({}, e), {
                svgData: s
            }),
            loaded: false,
            ratio: a.width / a.height,
            replaceColor: null !== (n = a.replaceColor) && void 0 !== n ? n : a.replace_color,
            source: a.src
        };
    return new Promise((a => {
        const r = new Blob([s], {
                type: "image/svg+xml"
            }),
            o = URL || window.URL || window.webkitURL || window,
            t = o.createObjectURL(r),
            i = new Image;
        i.addEventListener("load", (() => {
            l.loaded = true;
            l.element = i;
            a(l);
            o.revokeObjectURL(t)
        }));
        i.addEventListener("error", (async () => {
            o.revokeObjectURL(t);
            const r = Object.assign(Object.assign({}, e), {
                error: false,
                loading: true
            });
            await loadImage(r);
            l.loaded = true;
            l.element = r.element;
            a(l)
        }));
        i.src = t
    }))
}
var r = (void 0, function(e, a, r, o, t) {
    if ("m" === o) throw new TypeError("Private method is not writable");
    if ("a" === o && !t) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof a ? e !== a || !t : !a.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === o ? t.call(e, r) : t ? t.value = r : a.set(e, r), r
});
var o = (void 0, function(e, a, r, o) {
    if ("a" === r && !o) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof a ? e !== a || !o : !a.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === r ? o : "a" === r ? o.call(e) : o ? o.value : a.get(e)
});
var t;
class ImageDrawer {
    constructor() {
        t.set(this, void 0);
        r(this, t, [], "f")
    }
    addImage(e, a) {
        const r = this.getImages(e);
        null === r || void 0 === r ? void 0 : r.images.push(a)
    }
    destroy() {
        r(this, t, [], "f")
    }
    draw(e, a, r, o) {
        var t;
        const i = a.image,
            n = null === i || void 0 === i ? void 0 : i.element;
        if (!n) return;
        const s = null !== (t = null === i || void 0 === i ? void 0 : i.ratio) && void 0 !== t ? t : 1,
            l = {
                x: -r,
                y: -r
            };
        e.globalAlpha = o;
        e.drawImage(n, l.x, l.y, 2 * r, 2 * r / s);
        e.globalAlpha = 1
    }
    getImages(e) {
        const a = o(this, t, "f").find((a => a.id === e.id));
        if (a) return a;
        o(this, t, "f").push({
            id: e.id,
            images: []
        });
        return this.getImages(e)
    }
    getSidesCount() {
        return 12
    }
    loadShape(e) {
        if ("image" !== e.shape && "images" !== e.shape) return;
        const a = e.container,
            r = this.getImages(a).images,
            o = e.shapeData,
            t = r.find((e => e.source === o.src));
        t ? !t.error : this.loadImageShape(a, o).then((() => {
            this.loadShape(e)
        }))
    }
    particleInit(e, a) {
        var r;
        if ("image" !== a.shape && "images" !== a.shape) return;
        const o = this.getImages(e).images,
            t = a.shapeData,
            i = a.getFillColor(),
            n = null !== (r = t.replaceColor) && void 0 !== r ? r : t.replace_color,
            s = o.find((e => e.source === t.src));
        s && (s.loading ? setTimeout((() => {
            this.particleInit(e, a)
        })) : (async () => {
            var e, r;
            let o;
            o = s.svgData && n && i ? await replaceImageColor(s, t, i, a) : {
                color: i,
                data: s,
                element: s.element,
                loaded: true,
                ratio: t.width / t.height,
                replaceColor: n,
                source: t.src
            };
            o.ratio || (o.ratio = 1);
            const l = null !== (e = t.fill) && void 0 !== e ? e : a.fill,
                c = null !== (r = t.close) && void 0 !== r ? r : a.close,
                d = {
                    image: o,
                    fill: l,
                    close: c
                };
            a.image = d.image;
            a.fill = d.fill;
            a.close = d.close
        })())
    }
    async loadImageShape(e, a) {
        var r;
        const o = a.src;
        if (!o) throw new Error("Error tsParticles - No image.src");
        try {
            const t = {
                source: o,
                type: o.substring(o.length - 3),
                error: false,
                loading: true
            };
            this.addImage(e, t);
            const i = (null !== (r = a.replaceColor) && void 0 !== r ? r : a.replace_color) ? downloadSvgImage : loadImage;
            await i(t)
        } catch (e) {
            throw new Error(`tsParticles error - ${a.src} not found`)
        }
    }
}
t = new WeakMap;
async function loadImageShape(e) {
    const a = new ImageDrawer;
    await e.addShape("image", a);
    await e.addShape("images", a)
}
export {
    loadImageShape
};

//# sourceMappingURL=index.js.map