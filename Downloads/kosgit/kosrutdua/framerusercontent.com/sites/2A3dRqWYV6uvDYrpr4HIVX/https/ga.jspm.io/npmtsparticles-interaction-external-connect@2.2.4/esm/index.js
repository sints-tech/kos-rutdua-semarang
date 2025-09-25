import {
    colorMix as t,
    getStyleFromHsl as n,
    getStyleFromRgb as e,
    drawLine as i,
    ExternalInteractorBase as o,
    isInArray as a
} from "tsparticles-engine";
class ConnectLinks {
    constructor() {
        this.opacity = .5
    }
    load(t) {
        t && void 0 !== t.opacity && (this.opacity = t.opacity)
    }
}
class Connect {
    constructor() {
        this.distance = 80;
        this.links = new ConnectLinks;
        this.radius = 60
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
        var n, e;
        if (t) {
            void 0 !== t.distance && (this.distance = t.distance);
            this.links.load(null !== (e = null !== (n = t.links) && void 0 !== n ? n : t.lineLinked) && void 0 !== e ? e : t.line_linked);
            void 0 !== t.radius && (this.radius = t.radius)
        }
    }
}
var r = (void 0, function(t, n, e, i, o) {
    if ("m" === i) throw new TypeError("Private method is not writable");
    if ("a" === i && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof n ? t !== n || !o : !n.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === i ? o.call(t, e) : o ? o.value = e : n.set(t, e), e
});
var s = (void 0, function(t, n, e, i) {
    if ("a" === e && !i) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof n ? t !== n || !i : !n.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? i : "a" === e ? i.call(t) : i ? i.value : n.get(t)
});
var c;

function gradient(i, o, a, r) {
    const s = Math.floor(a.getRadius() / o.getRadius()),
        c = o.getFillColor(),
        d = a.getFillColor();
    if (!c || !d) return;
    const l = o.getPosition(),
        u = a.getPosition(),
        v = t(c, d, o.getRadius(), a.getRadius()),
        f = i.createLinearGradient(l.x, l.y, u.x, u.y);
    f.addColorStop(0, n(c, r));
    f.addColorStop(s > 1 ? 1 : s, e(v, r));
    f.addColorStop(1, n(d, r));
    return f
}

function drawConnectLine(t, n, e, o, a) {
    t.save();
    i(t, o, a);
    t.lineWidth = n;
    t.strokeStyle = e;
    t.stroke();
    t.restore()
}

function lineStyle(t, n, e, i) {
    const o = t.actualOptions,
        a = o.interactivity.modes.connect;
    if (a) return gradient(n, e, i, a.links.opacity)
}

function drawConnection(t, n, e) {
    t.canvas.draw((i => {
        var o;
        const a = lineStyle(t, i, n, e);
        if (!a) return;
        const r = n.getPosition(),
            s = e.getPosition();
        drawConnectLine(i, null !== (o = n.retina.linksWidth) && void 0 !== o ? o : 0, a, r, s)
    }))
}
class Connector extends o {
    constructor(t) {
        super(t);
        c.set(this, void 0);
        r(this, c, t, "f")
    }
    clear() {}
    init() {
        const t = s(this, c, "f"),
            n = t.actualOptions.interactivity.modes.connect;
        if (n) {
            t.retina.connectModeDistance = n.distance * t.retina.pixelRatio;
            t.retina.connectModeRadius = n.radius * t.retina.pixelRatio
        }
    }
    async interact() {
        const t = s(this, c, "f"),
            n = t.actualOptions;
        if (n.interactivity.events.onHover.enable && "pointermove" === t.interactivity.status) {
            const n = t.interactivity.mouse.position;
            if (!t.retina.connectModeDistance || t.retina.connectModeDistance < 0 || !t.retina.connectModeRadius || t.retina.connectModeRadius < 0 || !n) return;
            const e = Math.abs(t.retina.connectModeRadius),
                i = t.particles.quadTree.queryCircle(n, e, (t => this.isEnabled(t)));
            let o = 0;
            for (const n of i) {
                const e = n.getPosition();
                for (const a of i.slice(o + 1)) {
                    const i = a.getPosition(),
                        o = Math.abs(t.retina.connectModeDistance),
                        r = Math.abs(e.x - i.x),
                        s = Math.abs(e.y - i.y);
                    r < o && s < o && drawConnection(t, n, a)
                }++o
            }
        }
    }
    isEnabled(t) {
        var n;
        const e = this.container,
            i = e.interactivity.mouse,
            o = (null !== (n = null === t || void 0 === t ? void 0 : t.interactivity) && void 0 !== n ? n : e.actualOptions.interactivity).events;
        return !(!o.onHover.enable || !i.position) && a("connect", o.onHover.mode)
    }
    loadModeOptions(t, ...n) {
        t.connect || (t.connect = new Connect);
        for (const e of n) t.connect.load(null === e || void 0 === e ? void 0 : e.connect)
    }
    reset() {}
}
c = new WeakMap;
async function loadExternalConnectInteraction(t) {
    await t.addInteractor("externalConnect", (t => new Connector(t)))
}
export {
    Connect,
    ConnectLinks,
    loadExternalConnectInteraction
};

//# sourceMappingURL=index.js.map