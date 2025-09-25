import {
    ExternalInteractorBase as e,
    mouseMoveEvent as s,
    isInArray as t,
    divModeExecute as i,
    isDivModeEnabled as o,
    Circle as r,
    getDistances as n,
    Vector as l,
    clamp as a,
    calcEasing as c,
    Rectangle as p,
    divMode as u
} from "tsparticles-engine";
class RepulseBase {
    constructor() {
        this.distance = 200;
        this.duration = .4;
        this.factor = 100;
        this.speed = 1;
        this.maxSpeed = 50;
        this.easing = "ease-out-quad"
    }
    load(e) {
        if (e) {
            void 0 !== e.distance && (this.distance = e.distance);
            void 0 !== e.duration && (this.duration = e.duration);
            void 0 !== e.easing && (this.easing = e.easing);
            void 0 !== e.factor && (this.factor = e.factor);
            void 0 !== e.speed && (this.speed = e.speed);
            void 0 !== e.maxSpeed && (this.maxSpeed = e.maxSpeed)
        }
    }
}
class RepulseDiv extends RepulseBase {
    constructor() {
        super();
        this.selectors = []
    }
    get ids() {
        return this.selectors instanceof Array ? this.selectors.map((e => e.replace("#", ""))) : this.selectors.replace("#", "")
    }
    set ids(e) {
        this.selectors = e instanceof Array ? e.map((() => `#${e}`)) : `#${e}`
    }
    load(e) {
        super.load(e);
        if (e) {
            void 0 !== e.ids && (this.ids = e.ids);
            void 0 !== e.selectors && (this.selectors = e.selectors)
        }
    }
}
class Repulse extends RepulseBase {
    load(e) {
        super.load(e);
        if (e)
            if (e.divs instanceof Array) this.divs = e.divs.map((e => {
                const s = new RepulseDiv;
                s.load(e);
                return s
            }));
            else {
                (this.divs instanceof Array || !this.divs) && (this.divs = new RepulseDiv);
                this.divs.load(e.divs)
            }
    }
}
var d = (void 0, function(e, s, t, i, o) {
    if ("m" === i) throw new TypeError("Private method is not writable");
    if ("a" === i && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof s ? e !== s || !o : !s.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === i ? o.call(e, t) : o ? o.value = t : s.set(e, t), t
});
var f = (void 0, function(e, s, t, i) {
    if ("a" === t && !i) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof s ? e !== s || !i : !s.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === t ? i : "a" === t ? i.call(e) : i ? i.value : s.get(e)
});
var h;
class Repulser extends e {
    constructor(e) {
        super(e);
        h.set(this, void 0);
        d(this, h, e, "f");
        e.repulse || (e.repulse = {
            particles: []
        });
        this.handleClickMode = s => {
            const t = f(this, h, "f").actualOptions,
                i = t.interactivity.modes.repulse;
            if (i && "repulse" === s) {
                e.repulse || (e.repulse = {
                    particles: []
                });
                e.repulse.clicking = true;
                e.repulse.count = 0;
                for (const s of e.repulse.particles) this.isEnabled(s) && s.velocity.setTo(s.initialVelocity);
                e.repulse.particles = [];
                e.repulse.finish = false;
                setTimeout((() => {
                    if (!e.destroyed) {
                        e.repulse || (e.repulse = {
                            particles: []
                        });
                        e.repulse.clicking = false
                    }
                }), 1e3 * i.duration)
            }
        }
    }
    clear() {}
    init() {
        const e = f(this, h, "f"),
            s = e.actualOptions.interactivity.modes.repulse;
        s && (e.retina.repulseModeDistance = s.distance * e.retina.pixelRatio)
    }
    async interact() {
        const e = f(this, h, "f"),
            o = e.actualOptions,
            r = e.interactivity.status === s,
            n = o.interactivity.events,
            l = n.onHover.enable,
            a = n.onHover.mode,
            c = n.onClick.enable,
            p = n.onClick.mode,
            u = n.onDiv;
        r && l && t("repulse", a) ? this.hoverRepulse() : c && t("repulse", p) ? this.clickRepulse() : i("repulse", u, ((e, s) => this.singleSelectorRepulse(e, s)))
    }
    isEnabled(e) {
        var s;
        const i = f(this, h, "f"),
            r = i.actualOptions,
            n = i.interactivity.mouse,
            l = (null !== (s = null === e || void 0 === e ? void 0 : e.interactivity) && void 0 !== s ? s : r.interactivity).events,
            a = l.onDiv,
            c = o("repulse", a);
        if (!(c || l.onHover.enable && n.position || l.onClick.enable && n.clickPosition)) return false;
        const p = l.onHover.mode,
            u = l.onClick.mode;
        return t("repulse", p) || t("repulse", u) || c
    }
    loadModeOptions(e, ...s) {
        e.repulse || (e.repulse = new Repulse);
        for (const t of s) e.repulse.load(null === t || void 0 === t ? void 0 : t.repulse)
    }
    reset() {}
    clickRepulse() {
        const e = f(this, h, "f"),
            s = e.actualOptions.interactivity.modes.repulse;
        if (s) {
            e.repulse || (e.repulse = {
                particles: []
            });
            if (!e.repulse.finish) {
                e.repulse.count || (e.repulse.count = 0);
                e.repulse.count++;
                e.repulse.count === e.particles.count && (e.repulse.finish = true)
            }
            if (e.repulse.clicking) {
                const t = e.retina.repulseModeDistance;
                if (!t || t < 0) return;
                const i = Math.pow(t / 6, 3),
                    o = e.interactivity.mouse.clickPosition;
                if (void 0 === o) return;
                const a = new r(o.x, o.y, i),
                    c = e.particles.quadTree.query(a, (e => this.isEnabled(e)));
                for (const t of c) {
                    const {
                        dx: r,
                        dy: a,
                        distance: c
                    } = n(o, t.position), p = c ** 2, u = s.speed, d = -i * u / p;
                    if (p <= i) {
                        e.repulse.particles.push(t);
                        const s = l.create(r, a);
                        s.length = d;
                        t.velocity.setTo(s)
                    }
                }
            } else if (false === e.repulse.clicking) {
                for (const s of e.repulse.particles) s.velocity.setTo(s.initialVelocity);
                e.repulse.particles = []
            }
        }
    }
    hoverRepulse() {
        const e = f(this, h, "f"),
            s = e.interactivity.mouse.position,
            t = e.retina.repulseModeDistance;
        !t || t < 0 || !s || this.processRepulse(s, t, new r(s.x, s.y, t))
    }
    processRepulse(e, s, t, i) {
        var o;
        const r = f(this, h, "f"),
            p = r.particles.quadTree.query(t, (e => this.isEnabled(e))),
            u = r.actualOptions.interactivity.modes.repulse;
        if (u)
            for (const t of p) {
                const {
                    dx: r,
                    dy: p,
                    distance: d
                } = n(t.position, e), f = (null !== (o = null === i || void 0 === i ? void 0 : i.speed) && void 0 !== o ? o : u.speed) * u.factor, h = a(c(1 - d / s, u.easing) * f, 0, u.maxSpeed), v = l.create(0 === d ? f : r / d * h, 0 === d ? f : p / d * h);
                t.position.addTo(v)
            }
    }
    singleSelectorRepulse(e, s) {
        const t = f(this, h, "f"),
            i = t.actualOptions.interactivity.modes.repulse;
        if (!i) return;
        const o = document.querySelectorAll(e);
        o.length && o.forEach((e => {
            const o = e,
                n = t.retina.pixelRatio,
                l = {
                    x: (o.offsetLeft + o.offsetWidth / 2) * n,
                    y: (o.offsetTop + o.offsetHeight / 2) * n
                },
                a = o.offsetWidth / 2 * n,
                c = "circle" === s.type ? new r(l.x, l.y, a) : new p(o.offsetLeft * n, o.offsetTop * n, o.offsetWidth * n, o.offsetHeight * n),
                d = i.divs,
                f = u(d, o);
            this.processRepulse(l, a, c, f)
        }))
    }
}
h = new WeakMap;
async function loadExternalRepulseInteraction(e) {
    await e.addInteractor("externalRepulse", (e => new Repulser(e)))
}
export {
    Repulse,
    RepulseBase,
    RepulseDiv,
    loadExternalRepulseInteraction
};

//# sourceMappingURL=index.js.map