import {
    randomInRange as o,
    itemFromArray as l,
    rangeColorToHsl as e,
    getHslAnimationFromHsl as t
} from "tsparticles-engine";

function updateColorValue(l, e, t, r, i) {
    var a, n;
    const s = e;
    if (!s || !s.enable) return;
    const d = o(t.offset),
        u = (null !== (a = e.velocity) && void 0 !== a ? a : 0) * l.factor + 3.6 * d,
        v = null !== (n = e.decay) && void 0 !== n ? n : 1;
    if (i && 0 !== s.status) {
        s.value -= u;
        if (s.value < 0) {
            s.status = 0;
            s.value += s.value
        }
    } else {
        s.value += u;
        if (i && s.value > r) {
            s.status = 1;
            s.value -= s.value % r
        }
    }
    s.velocity && 1 !== v && (s.velocity *= v);
    s.value > r && (s.value %= r)
}

function updateStrokeColor(o, l) {
    var e, t, r, i, a, n, s, d, u, v;
    if (!(null === (e = o.stroke) || void 0 === e ? void 0 : e.color)) return;
    const c = o.stroke.color.animation,
        k = null !== (r = null === (t = o.strokeColor) || void 0 === t ? void 0 : t.h) && void 0 !== r ? r : null === (i = o.color) || void 0 === i ? void 0 : i.h;
    k && updateColorValue(l, k, c.h, 360, false);
    const p = null !== (n = null === (a = o.strokeColor) || void 0 === a ? void 0 : a.s) && void 0 !== n ? n : null === (s = o.color) || void 0 === s ? void 0 : s.s;
    p && updateColorValue(l, p, c.s, 100, true);
    const C = null !== (u = null === (d = o.strokeColor) || void 0 === d ? void 0 : d.l) && void 0 !== u ? u : null === (v = o.color) || void 0 === v ? void 0 : v.l;
    C && updateColorValue(l, C, c.l, 100, true)
}
class StrokeColorUpdater {
    constructor(o) {
        this.container = o
    }
    init(o) {
        var r, i;
        const a = this.container;
        o.stroke = o.options.stroke instanceof Array ? l(o.options.stroke, o.id, o.options.reduceDuplicates) : o.options.stroke;
        o.strokeWidth = o.stroke.width * a.retina.pixelRatio;
        const n = null !== (r = e(o.stroke.color)) && void 0 !== r ? r : o.getFillColor();
        n && (o.strokeColor = t(n, null === (i = o.stroke.color) || void 0 === i ? void 0 : i.animation, a.retina.reduceFactor))
    }
    isEnabled(o) {
        var l, e, t, r;
        const i = null === (l = o.stroke) || void 0 === l ? void 0 : l.color;
        return !o.destroyed && !o.spawning && !!i && (void 0 !== (null === (e = o.strokeColor) || void 0 === e ? void 0 : e.h.value) && i.animation.h.enable || void 0 !== (null === (t = o.strokeColor) || void 0 === t ? void 0 : t.s.value) && i.animation.s.enable || void 0 !== (null === (r = o.strokeColor) || void 0 === r ? void 0 : r.l.value) && i.animation.l.enable)
    }
    update(o, l) {
        this.isEnabled(o) && updateStrokeColor(o, l)
    }
}
async function loadStrokeColorUpdater(o) {
    await o.addParticleUpdater("strokeColor", (o => new StrokeColorUpdater(o)))
}
export {
    loadStrokeColorUpdater
};

//# sourceMappingURL=index.js.map