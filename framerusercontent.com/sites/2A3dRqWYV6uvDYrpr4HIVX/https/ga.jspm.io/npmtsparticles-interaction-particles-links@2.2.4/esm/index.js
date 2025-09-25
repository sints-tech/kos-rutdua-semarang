import {
    OptionsColor as i,
    getDistance as n,
    ParticlesInteractorBase as t,
    CircleWarp as o,
    Circle as s,
    getLinkRandomColor as e,
    drawLine as l,
    getDistances as a,
    getStyleFromRgb as r,
    rangeColorToRgb as c,
    drawTriangle as d,
    getRandom as k,
    getRangeValue as h,
    getLinkColor as u
} from "tsparticles-engine";
class LinksShadow {
    constructor() {
        this.blur = 5;
        this.color = new i;
        this.color.value = "#000";
        this.enable = false
    }
    load(n) {
        if (n) {
            void 0 !== n.blur && (this.blur = n.blur);
            this.color = i.create(this.color, n.color);
            void 0 !== n.enable && (this.enable = n.enable)
        }
    }
}
class LinksTriangle {
    constructor() {
        this.enable = false;
        this.frequency = 1
    }
    load(n) {
        if (n) {
            void 0 !== n.color && (this.color = i.create(this.color, n.color));
            void 0 !== n.enable && (this.enable = n.enable);
            void 0 !== n.frequency && (this.frequency = n.frequency);
            void 0 !== n.opacity && (this.opacity = n.opacity)
        }
    }
}
class Links {
    constructor() {
        this.blink = false;
        this.color = new i;
        this.color.value = "#fff";
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new LinksShadow;
        this.triangles = new LinksTriangle;
        this.width = 1;
        this.warp = false
    }
    load(n) {
        if (n) {
            void 0 !== n.id && (this.id = n.id);
            void 0 !== n.blink && (this.blink = n.blink);
            this.color = i.create(this.color, n.color);
            void 0 !== n.consent && (this.consent = n.consent);
            void 0 !== n.distance && (this.distance = n.distance);
            void 0 !== n.enable && (this.enable = n.enable);
            void 0 !== n.frequency && (this.frequency = n.frequency);
            void 0 !== n.opacity && (this.opacity = n.opacity);
            this.shadow.load(n.shadow);
            this.triangles.load(n.triangles);
            void 0 !== n.width && (this.width = n.width);
            void 0 !== n.warp && (this.warp = n.warp)
        }
    }
}

function getLinkDistance(i, t, o, s, e) {
    let l = n(i, t);
    if (!e || l <= o) return l;
    const a = {
        x: t.x - s.width,
        y: t.y
    };
    l = n(i, a);
    if (l <= o) return l;
    const r = {
        x: t.x - s.width,
        y: t.y - s.height
    };
    l = n(i, r);
    if (l <= o) return l;
    const c = {
        x: t.x,
        y: t.y - s.height
    };
    l = n(i, c);
    return l
}
class Linker extends t {
    constructor(i) {
        super(i);
        this.linkContainer = i
    }
    clear() {}
    init() {
        this.linkContainer.particles.linksColors = new Map
    }
    async interact(i) {
        var n;
        if (!i.options.links) return;
        i.links = [];
        const t = i.getPosition(),
            e = this.container,
            l = e.canvas.size;
        if (t.x < 0 || t.y < 0 || t.x > l.width || t.y > l.height) return;
        const a = i.options.links,
            r = a.opacity,
            c = null !== (n = i.retina.linksDistance) && void 0 !== n ? n : 0,
            d = a.warp,
            k = d ? new o(t.x, t.y, c, l) : new s(t.x, t.y, c),
            h = e.particles.quadTree.query(k);
        for (const n of h) {
            const o = n.options.links;
            if (i === n || !(null === o || void 0 === o ? void 0 : o.enable) || a.id !== o.id || n.spawning || n.destroyed || !n.links || -1 !== i.links.map((i => i.destination)).indexOf(n) || -1 !== n.links.map((i => i.destination)).indexOf(i)) continue;
            const s = n.getPosition();
            if (s.x < 0 || s.y < 0 || s.x > l.width || s.y > l.height) continue;
            const e = getLinkDistance(t, s, c, l, d && o.warp);
            if (e > c) return;
            const k = (1 - e / c) * r;
            this.setColor(i);
            i.links.push({
                destination: n,
                opacity: k
            })
        }
    }
    isEnabled(i) {
        var n;
        return !!(null === (n = i.options.links) || void 0 === n ? void 0 : n.enable)
    }
    loadParticlesOptions(i, ...n) {
        var t, o;
        i.links || (i.links = new Links);
        for (const s of n) i.links.load(null !== (o = null !== (t = null === s || void 0 === s ? void 0 : s.links) && void 0 !== t ? t : null === s || void 0 === s ? void 0 : s.lineLinked) && void 0 !== o ? o : null === s || void 0 === s ? void 0 : s.line_linked)
    }
    reset() {}
    setColor(i) {
        if (!i.options.links) return;
        const n = this.linkContainer,
            t = i.options.links;
        let o = void 0 === t.id ? n.particles.linksColor : n.particles.linksColors.get(t.id);
        if (o) return;
        const s = t.color;
        o = e(s, t.blink, t.consent);
        void 0 === t.id ? n.particles.linksColor = o : n.particles.linksColors.set(t.id, o)
    }
}
async function loadInteraction(i) {
    await i.addInteractor("particlesLinks", (i => new Linker(i)))
}

function drawLinkLine(i, t, o, s, e, d, k, h, u, p, f, y) {
    let v = false;
    if (n(o, s) <= e) {
        l(i, o, s);
        v = true
    } else if (k) {
        let n;
        let t;
        const r = {
            x: s.x - d.width,
            y: s.y
        };
        const c = a(o, r);
        if (c.distance <= e) {
            const i = o.y - c.dy / c.dx * o.x;
            n = {
                x: 0,
                y: i
            };
            t = {
                x: d.width,
                y: i
            }
        } else {
            const i = {
                x: s.x,
                y: s.y - d.height
            };
            const l = a(o, i);
            if (l.distance <= e) {
                const i = o.y - l.dy / l.dx * o.x;
                const s = -i / (l.dy / l.dx);
                n = {
                    x: s,
                    y: 0
                };
                t = {
                    x: s,
                    y: d.height
                }
            } else {
                const i = {
                    x: s.x - d.width,
                    y: s.y - d.height
                };
                const l = a(o, i);
                if (l.distance <= e) {
                    const i = o.y - l.dy / l.dx * o.x;
                    const s = -i / (l.dy / l.dx);
                    n = {
                        x: s,
                        y: i
                    };
                    t = {
                        x: n.x + d.width,
                        y: n.y + d.height
                    }
                }
            }
        }
        if (n && t) {
            l(i, o, n);
            l(i, s, t);
            v = true
        }
    }
    if (v) {
        i.lineWidth = t;
        h && (i.globalCompositeOperation = u);
        i.strokeStyle = r(p, f);
        if (y.enable) {
            const n = c(y.color);
            if (n) {
                i.shadowBlur = y.blur;
                i.shadowColor = r(n)
            }
        }
        i.stroke()
    }
}

function drawLinkTriangle(i, n, t, o, s, e, l, a) {
    d(i, n, t, o);
    s && (i.globalCompositeOperation = e);
    i.fillStyle = r(l, a);
    i.fill()
}
class LinkInstance {
    constructor(i) {
        this.container = i
    }
    drawParticle(i, n) {
        var t;
        const o = this.container,
            s = n.options;
        if (!n.links || n.links.length <= 0) return;
        i.save();
        const e = n.links.filter((i => s.links && o.particles.getLinkFrequency(n, i.destination) <= s.links.frequency));
        for (const i of e) {
            this.drawTriangles(o, s, n, i, e);
            i.opacity > 0 && (null !== (t = n.retina.linksWidth) && void 0 !== t ? t : 0) > 0 && this.drawLinkLine(n, i)
        }
        i.restore()
    }
    particleCreated(i) {
        i.links = [];
        if (!i.options.links) return;
        const n = this.container.retina.pixelRatio;
        i.retina.linksDistance = i.options.links.distance * n;
        i.retina.linksWidth = i.options.links.width * n
    }
    particleDestroyed(i) {
        i.links = []
    }
    drawLinkLine(i, n) {
        const t = this.container,
            o = t.actualOptions,
            s = n.destination,
            e = i.getPosition(),
            l = s.getPosition();
        let a = n.opacity;
        t.canvas.draw((n => {
            var r, d, p;
            if (!i.options.links) return;
            let f;
            const y = null === (r = i.options.twinkle) || void 0 === r ? void 0 : r.lines;
            if (null === y || void 0 === y ? void 0 : y.enable) {
                const i = y.frequency,
                    n = c(y.color),
                    t = k() < i;
                if (t && n) {
                    f = n;
                    a = h(y.opacity)
                }
            }
            if (!f) {
                const n = i.options.links,
                    o = void 0 !== (null === n || void 0 === n ? void 0 : n.id) ? t.particles.linksColors.get(n.id) : t.particles.linksColor;
                f = u(i, s, o)
            }
            if (!f) return;
            const v = null !== (d = i.retina.linksWidth) && void 0 !== d ? d : 0,
                w = null !== (p = i.retina.linksDistance) && void 0 !== p ? p : 0;
            drawLinkLine(n, v, e, l, w, t.canvas.size, i.options.links.warp, o.backgroundMask.enable, o.backgroundMask.composite, f, a, i.options.links.shadow)
        }))
    }
    drawLinkTriangle(i, t, o) {
        var s;
        if (!i.options.links) return;
        const e = this.container,
            l = e.actualOptions,
            a = t.destination,
            r = o.destination,
            d = i.options.links.triangles,
            k = null !== (s = d.opacity) && void 0 !== s ? s : (t.opacity + o.opacity) / 2;
        k <= 0 || e.canvas.draw((t => {
            var o;
            const s = i.getPosition(),
                h = a.getPosition(),
                p = r.getPosition(),
                f = null !== (o = i.retina.linksDistance) && void 0 !== o ? o : 0;
            if (n(s, h) > f || n(p, h) > f || n(p, s) > f) return;
            let y = c(d.color);
            if (!y) {
                const n = i.options.links,
                    t = void 0 !== (null === n || void 0 === n ? void 0 : n.id) ? e.particles.linksColors.get(n.id) : e.particles.linksColor;
                y = u(i, a, t)
            }
            y && drawLinkTriangle(t, s, h, p, l.backgroundMask.enable, l.backgroundMask.composite, y, k)
        }))
    }
    drawTriangles(i, n, t, o, s) {
        var e, l, a;
        const r = o.destination,
            c = i.particles;
        if (!((null === (e = n.links) || void 0 === e ? void 0 : e.triangles.enable) && (null === (l = r.options.links) || void 0 === l ? void 0 : l.triangles.enable))) return;
        const d = null === (a = r.links) || void 0 === a ? void 0 : a.filter((n => {
            const t = i.particles.getLinkFrequency(r, n.destination);
            return r.options.links && t <= r.options.links.frequency && s.findIndex((i => i.destination === n.destination)) >= 0
        }));
        if (null === d || void 0 === d ? void 0 : d.length)
            for (const i of d) {
                const s = i.destination,
                    e = c.getTriangleFrequency(t, r, s);
                e > n.links.triangles.frequency || this.drawLinkTriangle(t, o, i)
            }
    }
}
class LinksPlugin {
    constructor() {
        this.id = "links"
    }
    getPlugin(i) {
        return new LinkInstance(i)
    }
    loadOptions() {}
    needsPlugin() {
        return true
    }
}
async function loadPlugin(i) {
    const n = new LinksPlugin;
    await i.addPlugin(n)
}
async function loadParticlesLinksInteraction(i) {
    await loadInteraction(i);
    await loadPlugin(i)
}
export {
    Links,
    LinksShadow,
    LinksTriangle,
    loadParticlesLinksInteraction
};

//# sourceMappingURL=index.js.map