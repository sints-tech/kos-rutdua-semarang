import {
    ExternalInteractorBase as t,
    mouseMoveEvent as a,
    isInArray as e,
    Circle as i,
    getDistances as r,
    clamp as c,
    calcEasing as o,
    Vector as n
} from "tsparticles-engine";
class Attract {
    constructor() {
        this.distance = 200;
        this.duration = .4;
        this.easing = "ease-out-quad";
        this.factor = 1;
        this.maxSpeed = 50;
        this.speed = 1
    }
    load(t) {
        if (t) {
            void 0 !== t.distance && (this.distance = t.distance);
            void 0 !== t.duration && (this.duration = t.duration);
            void 0 !== t.easing && (this.easing = t.easing);
            void 0 !== t.factor && (this.factor = t.factor);
            void 0 !== t.maxSpeed && (this.maxSpeed = t.maxSpeed);
            void 0 !== t.speed && (this.speed = t.speed)
        }
    }
}
var s = (void 0, function(t, a, e, i, r) {
    if ("m" === i) throw new TypeError("Private method is not writable");
    if ("a" === i && !r) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof a ? t !== a || !r : !a.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === i ? r.call(t, e) : r ? r.value = e : a.set(t, e), e
});
var d = (void 0, function(t, a, e, i) {
    if ("a" === e && !i) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof a ? t !== a || !i : !a.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? i : "a" === e ? i.call(t) : i ? i.value : a.get(t)
});
var l;
class Attractor extends t {
    constructor(t) {
        super(t);
        l.set(this, void 0);
        s(this, l, t, "f");
        t.attract || (t.attract = {
            particles: []
        });
        this.handleClickMode = a => {
            const e = d(this, l, "f").actualOptions,
                i = e.interactivity.modes.attract;
            if (i && "attract" === a) {
                t.attract || (t.attract = {
                    particles: []
                });
                t.attract.clicking = true;
                t.attract.count = 0;
                for (const a of t.attract.particles) this.isEnabled(a) && a.velocity.setTo(a.initialVelocity);
                t.attract.particles = [];
                t.attract.finish = false;
                setTimeout((() => {
                    if (!t.destroyed) {
                        t.attract || (t.attract = {
                            particles: []
                        });
                        t.attract.clicking = false
                    }
                }), 1e3 * i.duration)
            }
        }
    }
    clear() {}
    init() {
        const t = d(this, l, "f"),
            a = t.actualOptions.interactivity.modes.attract;
        a && (t.retina.attractModeDistance = a.distance * t.retina.pixelRatio)
    }
    async interact() {
        const t = d(this, l, "f"),
            i = t.actualOptions,
            r = t.interactivity.status === a,
            c = i.interactivity.events,
            o = c.onHover.enable,
            n = c.onHover.mode,
            s = c.onClick.enable,
            f = c.onClick.mode;
        r && o && e("attract", n) ? this.hoverAttract() : s && e("attract", f) && this.clickAttract()
    }
    isEnabled(t) {
        var a;
        const i = d(this, l, "f"),
            r = i.actualOptions,
            c = i.interactivity.mouse,
            o = (null !== (a = null === t || void 0 === t ? void 0 : t.interactivity) && void 0 !== a ? a : r.interactivity).events;
        if ((!c.position || !o.onHover.enable) && (!c.clickPosition || !o.onClick.enable)) return false;
        const n = o.onHover.mode,
            s = o.onClick.mode;
        return e("attract", n) || e("attract", s)
    }
    loadModeOptions(t, ...a) {
        t.attract || (t.attract = new Attract);
        for (const e of a) t.attract.load(null === e || void 0 === e ? void 0 : e.attract)
    }
    reset() {}
    clickAttract() {
        const t = d(this, l, "f");
        t.attract || (t.attract = {
            particles: []
        });
        if (!t.attract.finish) {
            t.attract.count || (t.attract.count = 0);
            t.attract.count++;
            t.attract.count === t.particles.count && (t.attract.finish = true)
        }
        if (t.attract.clicking) {
            const a = t.interactivity.mouse.clickPosition,
                e = t.retina.attractModeDistance;
            if (!e || e < 0 || !a) return;
            this.processAttract(a, e, new i(a.x, a.y, e))
        } else false === t.attract.clicking && (t.attract.particles = [])
    }
    hoverAttract() {
        const t = d(this, l, "f"),
            a = t.interactivity.mouse.position,
            e = t.retina.attractModeDistance;
        !e || e < 0 || !a || this.processAttract(a, e, new i(a.x, a.y, e))
    }
    processAttract(t, a, e) {
        const i = d(this, l, "f"),
            s = i.actualOptions.interactivity.modes.attract;
        if (!s) return;
        const f = i.particles.quadTree.query(e, (t => this.isEnabled(t)));
        for (const e of f) {
            const {
                dx: i,
                dy: d,
                distance: l
            } = r(e.position, t);
            const f = s.speed * s.factor;
            const u = c(o(1 - l / a, s.easing) * f, 0, s.maxSpeed);
            const p = n.create(0 === l ? f : i / l * u, 0 === l ? f : d / l * u);
            e.position.subFrom(p)
        }
    }
}
l = new WeakMap;
async function loadExternalAttractInteraction(t) {
    await t.addInteractor("externalAttract", (t => new Attractor(t)))
}
export {
    Attract,
    loadExternalAttractInteraction
};

//# sourceMappingURL=index.js.map