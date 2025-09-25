import {
    OptionsColor as e,
    clamp as i,
    ExternalInteractorBase as t,
    isInArray as o,
    divModeExecute as b,
    isDivModeEnabled as l,
    getDistance as s,
    getRangeMax as a,
    mouseMoveEvent as n,
    mouseLeaveEvent as r,
    itemFromArray as u,
    rangeColorToHsl as c,
    rgbToHsl as d,
    colorMix as v,
    Circle as f,
    Rectangle as p,
    divMode as h
} from "tsparticles-engine";
class BubbleBase {
    constructor() {
        this.distance = 200;
        this.duration = .4;
        this.mix = false
    }
    load(i) {
        if (i) {
            void 0 !== i.distance && (this.distance = i.distance);
            void 0 !== i.duration && (this.duration = i.duration);
            void 0 !== i.mix && (this.mix = i.mix);
            void 0 !== i.opacity && (this.opacity = i.opacity);
            if (void 0 !== i.color)
                if (i.color instanceof Array) this.color = i.color.map((i => e.create(void 0, i)));
                else {
                    this.color instanceof Array && (this.color = new e);
                    this.color = e.create(this.color, i.color)
                }
            void 0 !== i.size && (this.size = i.size)
        }
    }
}
class BubbleDiv extends BubbleBase {
    constructor() {
        super();
        this.selectors = []
    }
    get ids() {
        return this.selectors instanceof Array ? this.selectors.map((e => e.replace("#", ""))) : this.selectors.replace("#", "")
    }
    set ids(e) {
        this.selectors = e instanceof Array ? e.map((e => `#${e}`)) : `#${e}`
    }
    load(e) {
        super.load(e);
        if (e) {
            void 0 !== e.ids && (this.ids = e.ids);
            void 0 !== e.selectors && (this.selectors = e.selectors)
        }
    }
}
class Bubble extends BubbleBase {
    load(e) {
        super.load(e);
        if (e)
            if (e.divs instanceof Array) this.divs = e.divs.map((e => {
                const i = new BubbleDiv;
                i.load(e);
                return i
            }));
            else {
                (this.divs instanceof Array || !this.divs) && (this.divs = new BubbleDiv);
                this.divs.load(e.divs)
            }
    }
}
var y = (void 0, function(e, i, t, o, b) {
    if ("m" === o) throw new TypeError("Private method is not writable");
    if ("a" === o && !b) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? e !== i || !b : !i.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === o ? b.call(e, t) : b ? b.value = t : i.set(e, t), t
});
var B = (void 0, function(e, i, t, o) {
    if ("a" === t && !o) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof i ? e !== i || !o : !i.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === t ? o : "a" === t ? o.call(e) : o ? o.value : i.get(e)
});
var m;

function calculateBubbleValue(e, t, o, b) {
    if (t >= o) {
        const l = e + (t - o) * b;
        return i(l, e, t)
    }
    if (t < o) {
        const l = e - (o - t) * b;
        return i(l, t, e)
    }
}
class Bubbler extends t {
    constructor(e) {
        super(e);
        m.set(this, void 0);
        y(this, m, e, "f");
        e.bubble || (e.bubble = {});
        this.handleClickMode = i => {
            if ("bubble" === i) {
                e.bubble || (e.bubble = {});
                e.bubble.clicking = true
            }
        }
    }
    clear(e, i) {
        if (!e.bubble.inRange || i) {
            delete e.bubble.div;
            delete e.bubble.opacity;
            delete e.bubble.radius;
            delete e.bubble.color
        }
    }
    init() {
        const e = B(this, m, "f"),
            i = e.actualOptions.interactivity.modes.bubble;
        if (i) {
            e.retina.bubbleModeDistance = i.distance * e.retina.pixelRatio;
            void 0 !== i.size && (e.retina.bubbleModeSize = i.size * e.retina.pixelRatio)
        }
    }
    async interact() {
        const e = B(this, m, "f").actualOptions,
            i = e.interactivity.events,
            t = i.onHover,
            l = i.onClick,
            s = t.enable,
            a = t.mode,
            n = l.enable,
            r = l.mode,
            u = i.onDiv;
        s && o("bubble", a) ? this.hoverBubble() : n && o("bubble", r) ? this.clickBubble() : b("bubble", u, ((e, i) => this.singleSelectorHover(e, i)))
    }
    isEnabled(e) {
        var i;
        const t = B(this, m, "f"),
            b = t.actualOptions,
            s = t.interactivity.mouse,
            a = (null !== (i = null === e || void 0 === e ? void 0 : e.interactivity) && void 0 !== i ? i : b.interactivity).events,
            n = a.onDiv,
            r = l("bubble", n);
        if (!(r || a.onHover.enable && s.position || a.onClick.enable && s.clickPosition)) return false;
        const u = a.onHover.mode;
        const c = a.onClick.mode;
        return o("bubble", u) || o("bubble", c) || r
    }
    loadModeOptions(e, ...i) {
        e.bubble || (e.bubble = new Bubble);
        for (const t of i) e.bubble.load(null === t || void 0 === t ? void 0 : t.bubble)
    }
    reset(e) {
        e.bubble.inRange = false
    }
    clickBubble() {
        var e, i;
        const t = B(this, m, "f"),
            o = t.actualOptions,
            b = t.interactivity.mouse.clickPosition,
            l = o.interactivity.modes.bubble;
        if (!l || !b) return;
        t.bubble || (t.bubble = {});
        const n = t.retina.bubbleModeDistance;
        if (!n || n < 0) return;
        const r = t.particles.quadTree.queryCircle(b, n, (e => this.isEnabled(e)));
        for (const o of r) {
            if (!t.bubble.clicking) continue;
            o.bubble.inRange = !t.bubble.durationEnd;
            const r = o.getPosition(),
                u = s(r, b),
                c = ((new Date).getTime() - (t.interactivity.mouse.clickTime || 0)) / 1e3;
            c > l.duration && (t.bubble.durationEnd = true);
            if (c > 2 * l.duration) {
                t.bubble.clicking = false;
                t.bubble.durationEnd = false
            }
            const d = {
                bubbleObj: {
                    optValue: t.retina.bubbleModeSize,
                    value: o.bubble.radius
                },
                particlesObj: {
                    optValue: a(o.options.size.value) * t.retina.pixelRatio,
                    value: o.size.value
                },
                type: "size"
            };
            this.process(o, u, c, d);
            const v = {
                bubbleObj: {
                    optValue: l.opacity,
                    value: o.bubble.opacity
                },
                particlesObj: {
                    optValue: a(o.options.opacity.value),
                    value: null !== (i = null === (e = o.opacity) || void 0 === e ? void 0 : e.value) && void 0 !== i ? i : 1
                },
                type: "opacity"
            };
            this.process(o, u, c, v);
            t.bubble.durationEnd ? delete o.bubble.color : u <= n ? this.hoverBubbleColor(o, u) : delete o.bubble.color
        }
    }
    hoverBubble() {
        const e = B(this, m, "f"),
            i = e.interactivity.mouse.position,
            t = e.retina.bubbleModeDistance;
        if (!t || t < 0 || void 0 === i) return;
        const o = e.particles.quadTree.queryCircle(i, t, (e => this.isEnabled(e)));
        for (const b of o) {
            b.bubble.inRange = true;
            const o = b.getPosition(),
                l = s(o, i),
                a = 1 - l / t;
            if (l <= t) {
                if (a >= 0 && e.interactivity.status === n) {
                    this.hoverBubbleSize(b, a);
                    this.hoverBubbleOpacity(b, a);
                    this.hoverBubbleColor(b, a)
                }
            } else this.reset(b);
            e.interactivity.status === r && this.reset(b)
        }
    }
    hoverBubbleColor(e, i, t) {
        const o = B(this, m, "f").actualOptions;
        const b = null !== t && void 0 !== t ? t : o.interactivity.modes.bubble;
        if (b) {
            if (!e.bubble.finalColor) {
                const i = b.color;
                if (!i) return;
                const t = i instanceof Array ? u(i) : i;
                e.bubble.finalColor = c(t)
            }
            if (e.bubble.finalColor)
                if (b.mix) {
                    e.bubble.color = void 0;
                    const t = e.getFillColor();
                    e.bubble.color = t ? d(v(t, e.bubble.finalColor, 1 - i, i)) : e.bubble.finalColor
                } else e.bubble.color = e.bubble.finalColor
        }
    }
    hoverBubbleOpacity(e, i, t) {
        var o, b, l, s;
        const n = B(this, m, "f"),
            r = n.actualOptions,
            u = null !== (o = null === t || void 0 === t ? void 0 : t.opacity) && void 0 !== o ? o : null === (b = r.interactivity.modes.bubble) || void 0 === b ? void 0 : b.opacity;
        if (!u) return;
        const c = e.options.opacity.value;
        const d = null !== (s = null === (l = e.opacity) || void 0 === l ? void 0 : l.value) && void 0 !== s ? s : 1;
        const v = calculateBubbleValue(d, u, a(c), i);
        void 0 !== v && (e.bubble.opacity = v)
    }
    hoverBubbleSize(e, i, t) {
        const o = B(this, m, "f"),
            b = (null === t || void 0 === t ? void 0 : t.size) ? t.size * o.retina.pixelRatio : o.retina.bubbleModeSize;
        if (void 0 === b) return;
        const l = a(e.options.size.value) * o.retina.pixelRatio;
        const s = e.size.value;
        const n = calculateBubbleValue(s, b, l, i);
        void 0 !== n && (e.bubble.radius = n)
    }
    process(e, i, t, o) {
        const b = B(this, m, "f"),
            l = o.bubbleObj.optValue,
            s = b.actualOptions,
            a = s.interactivity.modes.bubble;
        if (!a || void 0 === l) return;
        const n = a.duration,
            r = b.retina.bubbleModeDistance,
            u = o.particlesObj.optValue,
            c = o.bubbleObj.value,
            d = o.particlesObj.value || 0,
            v = o.type;
        if (r && !(r < 0) && l !== u) {
            b.bubble || (b.bubble = {});
            if (b.bubble.durationEnd) {
                if (c) {
                    "size" === v && delete e.bubble.radius;
                    "opacity" === v && delete e.bubble.opacity
                }
            } else if (i <= r) {
                const i = null !== c && void 0 !== c ? c : d;
                if (i !== l) {
                    const i = d - t * (d - l) / n;
                    "size" === v && (e.bubble.radius = i);
                    "opacity" === v && (e.bubble.opacity = i)
                }
            } else {
                "size" === v && delete e.bubble.radius;
                "opacity" === v && delete e.bubble.opacity
            }
        }
    }
    singleSelectorHover(e, i) {
        const t = B(this, m, "f"),
            o = document.querySelectorAll(e),
            b = t.actualOptions.interactivity.modes.bubble;
        b && o.length && o.forEach((e => {
            const o = e,
                l = t.retina.pixelRatio,
                s = {
                    x: (o.offsetLeft + o.offsetWidth / 2) * l,
                    y: (o.offsetTop + o.offsetHeight / 2) * l
                },
                a = o.offsetWidth / 2 * l,
                n = "circle" === i.type ? new f(s.x, s.y, a) : new p(o.offsetLeft * l, o.offsetTop * l, o.offsetWidth * l, o.offsetHeight * l),
                r = t.particles.quadTree.query(n, (e => this.isEnabled(e)));
            for (const e of r) {
                if (!n.contains(e.getPosition())) continue;
                e.bubble.inRange = true;
                const i = b.divs;
                const t = h(i, o);
                if (!e.bubble.div || e.bubble.div !== o) {
                    this.clear(e, true);
                    e.bubble.div = o
                }
                this.hoverBubbleSize(e, 1, t);
                this.hoverBubbleOpacity(e, 1, t);
                this.hoverBubbleColor(e, 1, t)
            }
        }))
    }
}
m = new WeakMap;
async function loadExternalBubbleInteraction(e) {
    await e.addInteractor("externalBubble", (e => new Bubbler(e)))
}
export {
    Bubble,
    BubbleBase,
    BubbleDiv,
    loadExternalBubbleInteraction
};

//# sourceMappingURL=index.js.map