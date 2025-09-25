import {
    deepExtend as t,
    ExternalInteractorBase as i,
    isInArray as e
} from "tsparticles-engine";
class Trail {
    constructor() {
        this.delay = 1;
        this.pauseOnStop = false;
        this.quantity = 1
    }
    load(i) {
        if (i) {
            void 0 !== i.delay && (this.delay = i.delay);
            void 0 !== i.quantity && (this.quantity = i.quantity);
            void 0 !== i.particles && (this.particles = t({}, i.particles));
            void 0 !== i.pauseOnStop && (this.pauseOnStop = i.pauseOnStop)
        }
    }
}
var a = (void 0, function(t, i, e, a, o) {
    if ("m" === a) throw new TypeError("Private method is not writable");
    if ("a" === a && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === a ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
});
var o = (void 0, function(t, i, e, a) {
    if ("a" === e && !a) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof i ? t !== i || !a : !i.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? a : "a" === e ? a.call(t) : a ? a.value : i.get(t)
});
var r;
class TrailMaker extends i {
    constructor(t) {
        super(t);
        r.set(this, void 0);
        a(this, r, t, "f");
        this.delay = 0
    }
    clear() {}
    init() {}
    async interact(t) {
        var i, e, a, n;
        if (!this.container.retina.reduceFactor) return;
        const s = o(this, r, "f"),
            l = s.actualOptions,
            c = l.interactivity.modes.trail;
        if (!c) return;
        const d = 1e3 * c.delay / this.container.retina.reduceFactor;
        this.delay < d && (this.delay += t.value);
        if (this.delay < d) return;
        let u = true;
        c.pauseOnStop && (s.interactivity.mouse.position === this.lastPosition || (null === (i = s.interactivity.mouse.position) || void 0 === i ? void 0 : i.x) === (null === (e = this.lastPosition) || void 0 === e ? void 0 : e.x) && (null === (a = s.interactivity.mouse.position) || void 0 === a ? void 0 : a.y) === (null === (n = this.lastPosition) || void 0 === n ? void 0 : n.y)) && (u = false);
        s.interactivity.mouse.position ? this.lastPosition = {
            x: s.interactivity.mouse.position.x,
            y: s.interactivity.mouse.position.y
        } : delete this.lastPosition;
        u && s.particles.push(c.quantity, s.interactivity.mouse, c.particles);
        this.delay -= d
    }
    isEnabled(t) {
        var i;
        const a = this.container,
            o = a.actualOptions,
            r = a.interactivity.mouse,
            n = (null !== (i = null === t || void 0 === t ? void 0 : t.interactivity) && void 0 !== i ? i : o.interactivity).events;
        return r.clicking && r.inside && !!r.position && e("trail", n.onClick.mode) || r.inside && !!r.position && e("trail", n.onHover.mode)
    }
    loadModeOptions(t, ...i) {
        t.trail || (t.trail = new Trail);
        for (const e of i) t.trail.load(null === e || void 0 === e ? void 0 : e.trail)
    }
    reset() {}
}
r = new WeakMap;
async function loadExternalTrailInteraction(t) {
    await t.addInteractor("externalTrail", (t => new TrailMaker(t)))
}
export {
    Trail,
    loadExternalTrailInteraction
};

//# sourceMappingURL=index.js.map