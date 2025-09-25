import {
    randomInRange as o,
    rangeColorToHsl as l,
    getHslAnimationFromHsl as e
} from "tsparticles-engine";

function updateColorValue(l, e, a, t, i) {
    var r, n;
    const u = e;
    if (!u || !a.enable) return;
    const d = o(a.offset),
        c = (null !== (r = e.velocity) && void 0 !== r ? r : 0) * l.factor + 3.6 * d,
        v = null !== (n = e.decay) && void 0 !== n ? n : 1;
    if (i && 0 !== u.status) {
        u.value -= c;
        if (u.value < 0) {
            u.status = 0;
            u.value += u.value
        }
    } else {
        u.value += c;
        if (i && u.value > t) {
            u.status = 1;
            u.value -= u.value % t
        }
    }
    u.velocity && 1 !== v && (u.velocity *= v);
    u.value > t && (u.value %= t)
}

function updateColor(o, l) {
    var e, a, t;
    const i = o.options.color.animation;
    void 0 !== (null === (e = o.color) || void 0 === e ? void 0 : e.h) && updateColorValue(l, o.color.h, i.h, 360, false);
    void 0 !== (null === (a = o.color) || void 0 === a ? void 0 : a.s) && updateColorValue(l, o.color.s, i.s, 100, true);
    void 0 !== (null === (t = o.color) || void 0 === t ? void 0 : t.l) && updateColorValue(l, o.color.l, i.l, 100, true)
}
class ColorUpdater {
    constructor(o) {
        this.container = o
    }
    init(o) {
        const a = l(o.options.color, o.id, o.options.reduceDuplicates);
        a && (o.color = e(a, o.options.color.animation, this.container.retina.reduceFactor))
    }
    isEnabled(o) {
        var l, e, a;
        const t = o.options.color.animation;
        return !o.destroyed && !o.spawning && (void 0 !== (null === (l = o.color) || void 0 === l ? void 0 : l.h.value) && t.h.enable || void 0 !== (null === (e = o.color) || void 0 === e ? void 0 : e.s.value) && t.s.enable || void 0 !== (null === (a = o.color) || void 0 === a ? void 0 : a.l.value) && t.l.enable)
    }
    update(o, l) {
        updateColor(o, l)
    }
}
async function loadColorUpdater(o) {
    await o.addParticleUpdater("color", (o => new ColorUpdater(o)))
}
export {
    loadColorUpdater
};

//# sourceMappingURL=index.js.map