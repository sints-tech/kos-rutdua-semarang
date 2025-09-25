import {
    ExternalInteractorBase as e,
    mouseMoveEvent as t,
    isInArray as o,
    divModeExecute as n,
    isDivModeEnabled as i,
    Circle as s,
    circleBounce as r,
    circleBounceDataFromParticle as a,
    Vector as c,
    Rectangle as u,
    rectBounce as f,
    calculateBounds as l
} from "tsparticles-engine";
class Bounce {
    constructor() {
        this.distance = 200
    }
    load(e) {
        e && void 0 !== e.distance && (this.distance = e.distance)
    }
}
var d = (void 0, function(e, t, o, n, i) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !i) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof t ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === n ? i.call(e, o) : i ? i.value = o : t.set(e, o), o
});
var v = (void 0, function(e, t, o, n) {
    if ("a" === o && !n) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof t ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === o ? n : "a" === o ? n.call(e) : n ? n.value : t.get(e)
});
var h;
class Bouncer extends e {
    constructor(e) {
        super(e);
        h.set(this, void 0);
        d(this, h, e, "f")
    }
    clear() {}
    init() {
        const e = v(this, h, "f"),
            t = e.actualOptions.interactivity.modes.bounce;
        t && (e.retina.bounceModeDistance = t.distance * e.retina.pixelRatio)
    }
    async interact() {
        const e = v(this, h, "f"),
            i = e.actualOptions,
            s = i.interactivity.events,
            r = e.interactivity.status === t,
            a = s.onHover.enable,
            c = s.onHover.mode,
            u = s.onDiv;
        r && a && o("bounce", c) ? this.processMouseBounce() : n("bounce", u, ((e, t) => this.singleSelectorBounce(e, t)))
    }
    isEnabled(e) {
        var t;
        const n = v(this, h, "f"),
            s = n.actualOptions,
            r = n.interactivity.mouse,
            a = (null !== (t = null === e || void 0 === e ? void 0 : e.interactivity) && void 0 !== t ? t : s.interactivity).events,
            c = a.onDiv;
        return r.position && a.onHover.enable && o("bounce", a.onHover.mode) || i("bounce", c)
    }
    loadModeOptions(e, ...t) {
        e.bounce || (e.bounce = new Bounce);
        for (const o of t) e.bounce.load(null === o || void 0 === o ? void 0 : o.bounce)
    }
    reset() {}
    processBounce(e, t, o) {
        const n = v(this, h, "f").particles.quadTree.query(o, (e => this.isEnabled(e)));
        for (const i of n) o instanceof s ? r(a(i), {
            position: e,
            radius: t,
            mass: t ** 2 * Math.PI / 2,
            velocity: c.origin,
            factor: c.origin
        }) : o instanceof u && f(i, l(e, t))
    }
    processMouseBounce() {
        const e = v(this, h, "f"),
            t = e.retina.pixelRatio,
            o = 10 * t,
            n = e.interactivity.mouse.position,
            i = e.retina.bounceModeDistance;
        !i || i < 0 || !n || this.processBounce(n, i, new s(n.x, n.y, i + o))
    }
    singleSelectorBounce(e, t) {
        const o = v(this, h, "f"),
            n = document.querySelectorAll(e);
        n.length && n.forEach((e => {
            const n = e,
                i = o.retina.pixelRatio,
                r = {
                    x: (n.offsetLeft + n.offsetWidth / 2) * i,
                    y: (n.offsetTop + n.offsetHeight / 2) * i
                },
                a = n.offsetWidth / 2 * i,
                c = 10 * i,
                f = "circle" === t.type ? new s(r.x, r.y, a + c) : new u(n.offsetLeft * i - c, n.offsetTop * i - c, n.offsetWidth * i + 2 * c, n.offsetHeight * i + 2 * c);
            this.processBounce(r, a, f)
        }))
    }
}
h = new WeakMap;
async function loadExternalBounceInteraction(e) {
    await e.addInteractor("externalBounce", (e => new Bouncer(e)))
}
export {
    Bounce,
    loadExternalBounceInteraction
};

//# sourceMappingURL=index.js.map