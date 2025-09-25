import {
    OptionsColor as t,
    drawLine as i,
    getStyleFromRgb as e,
    ExternalInteractorBase as n,
    mouseMoveEvent as o,
    getDistance as r,
    getLinkRandomColor as a,
    getLinkColor as s,
    isInArray as c
} from "tsparticles-engine";
class GrabLinks {
    constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1
    }
    load(i) {
        if (i) {
            void 0 !== i.blink && (this.blink = i.blink);
            void 0 !== i.color && (this.color = t.create(this.color, i.color));
            void 0 !== i.consent && (this.consent = i.consent);
            void 0 !== i.opacity && (this.opacity = i.opacity)
        }
    }
}
class Grab {
    constructor() {
        this.distance = 100;
        this.links = new GrabLinks
    }
    get lineLinked() {
        return this.links
    }
    set lineLinked(t) {
        this.links = t
    }
    get line_linked() {
        return this.links
    }
    set line_linked(t) {
        this.links = t
    }
    load(t) {
        var i, e;
        if (t) {
            void 0 !== t.distance && (this.distance = t.distance);
            this.links.load(null !== (e = null !== (i = t.links) && void 0 !== i ? i : t.lineLinked) && void 0 !== e ? e : t.line_linked)
        }
    }
}
var l = (void 0, function(t, i, e, n, o) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === n ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
});
var d = (void 0, function(t, i, e, n) {
    if ("a" === e && !n) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof i ? t !== i || !n : !i.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? n : "a" === e ? n.call(t) : n ? n.value : i.get(t)
});
var v;

function drawGrabLine(t, n, o, r, a, s) {
    t.save();
    i(t, o, r);
    t.strokeStyle = e(a, s);
    t.lineWidth = n;
    t.stroke();
    t.restore()
}

function drawGrab(t, i, e, n, o) {
    t.canvas.draw((t => {
        var r;
        const a = i.getPosition();
        drawGrabLine(t, null !== (r = i.retina.linksWidth) && void 0 !== r ? r : 0, a, o, e, n)
    }))
}
class Grabber extends n {
    constructor(t) {
        super(t);
        v.set(this, void 0);
        l(this, v, t, "f")
    }
    clear() {}
    init() {
        const t = d(this, v, "f"),
            i = t.actualOptions.interactivity.modes.grab;
        i && (t.retina.grabModeDistance = i.distance * t.retina.pixelRatio)
    }
    async interact() {
        var t, i;
        const e = d(this, v, "f"),
            n = e.actualOptions,
            c = n.interactivity;
        if (!c.modes.grab || !c.events.onHover.enable || e.interactivity.status !== o) return;
        const l = e.interactivity.mouse.position;
        if (!l) return;
        const b = e.retina.grabModeDistance;
        if (!b || b < 0) return;
        const u = e.particles.quadTree.queryCircle(l, b, (t => this.isEnabled(t)));
        for (const n of u) {
            const o = n.getPosition(),
                d = r(o, l);
            if (d > b) continue;
            const v = c.modes.grab.links,
                u = v.opacity,
                f = u - d * u / b;
            if (f <= 0) continue;
            const h = null !== (t = v.color) && void 0 !== t ? t : null === (i = n.options.links) || void 0 === i ? void 0 : i.color;
            if (!e.particles.grabLineColor && h) {
                const t = c.modes.grab.links;
                e.particles.grabLineColor = a(h, t.blink, t.consent)
            }
            const p = s(n, void 0, e.particles.grabLineColor);
            if (!p) return;
            drawGrab(e, n, p, f, l)
        }
    }
    isEnabled(t) {
        var i;
        const e = this.container,
            n = e.interactivity.mouse,
            o = (null !== (i = null === t || void 0 === t ? void 0 : t.interactivity) && void 0 !== i ? i : e.actualOptions.interactivity).events;
        return o.onHover.enable && !!n.position && c("grab", o.onHover.mode)
    }
    loadModeOptions(t, ...i) {
        t.grab || (t.grab = new Grab);
        for (const e of i) t.grab.load(null === e || void 0 === e ? void 0 : e.grab)
    }
    reset() {}
}
v = new WeakMap;
async function loadExternalGrabInteraction(t) {
    await t.addInteractor("externalGrab", (t => new Grabber(t)))
}
export {
    Grab,
    GrabLinks,
    loadExternalGrabInteraction
};

//# sourceMappingURL=index.js.map