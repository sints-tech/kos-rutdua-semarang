import {
    clamp as a,
    getRangeMax as o,
    getRangeMin as t,
    getRangeValue as i,
    randomInRange as c,
    getRandom as e
} from "tsparticles-engine";

function checkDestroy(a, o, t, i) {
    switch (a.options.opacity.animation.destroy) {
        case "max":
            o >= i && a.destroy();
            break;
        case "min":
            o <= t && a.destroy();
            break
    }
}

function updateOpacity(o, t) {
    var i, c, e, p, y, s;
    if (!o.opacity) return;
    const l = o.opacity.min,
        n = o.opacity.max,
        u = null !== (i = o.opacity.decay) && void 0 !== i ? i : 1;
    if (!(o.destroyed || !o.opacity.enable || (null !== (c = o.opacity.maxLoops) && void 0 !== c ? c : 0) > 0 && (null !== (e = o.opacity.loops) && void 0 !== e ? e : 0) > (null !== (p = o.opacity.maxLoops) && void 0 !== p ? p : 0))) {
        switch (o.opacity.status) {
            case 0:
                if (o.opacity.value >= n) {
                    o.opacity.status = 1;
                    o.opacity.loops || (o.opacity.loops = 0);
                    o.opacity.loops++
                } else o.opacity.value += (null !== (y = o.opacity.velocity) && void 0 !== y ? y : 0) * t.factor;
                break;
            case 1:
                if (o.opacity.value <= l) {
                    o.opacity.status = 0;
                    o.opacity.loops || (o.opacity.loops = 0);
                    o.opacity.loops++
                } else o.opacity.value -= (null !== (s = o.opacity.velocity) && void 0 !== s ? s : 0) * t.factor;
                break
        }
        o.opacity.velocity && 1 !== o.opacity.decay && (o.opacity.velocity *= u);
        checkDestroy(o, o.opacity.value, l, n);
        o.destroyed || (o.opacity.value = a(o.opacity.value, l, n))
    }
}
class OpacityUpdater {
    constructor(a) {
        this.container = a
    }
    init(a) {
        const p = a.options.opacity;
        a.opacity = {
            enable: p.animation.enable,
            max: o(p.value),
            min: t(p.value),
            value: i(p.value),
            loops: 0,
            maxLoops: i(p.animation.count)
        };
        const y = p.animation;
        if (y.enable) {
            a.opacity.decay = 1 - i(y.decay);
            a.opacity.status = 0;
            const s = p.value;
            a.opacity.min = t(s);
            a.opacity.max = o(s);
            switch (y.startValue) {
                case "min":
                    a.opacity.value = a.opacity.min;
                    a.opacity.status = 0;
                    break;
                case "random":
                    a.opacity.value = c(a.opacity);
                    a.opacity.status = e() >= .5 ? 0 : 1;
                    break;
                case "max":
                default:
                    a.opacity.value = a.opacity.max;
                    a.opacity.status = 1;
                    break
            }
            a.opacity.velocity = i(y.speed) / 100 * this.container.retina.reduceFactor;
            y.sync || (a.opacity.velocity *= e())
        }
    }
    isEnabled(a) {
        var o, t, i, c;
        return !a.destroyed && !a.spawning && !!a.opacity && a.opacity.enable && ((null !== (o = a.opacity.maxLoops) && void 0 !== o ? o : 0) <= 0 || (null !== (t = a.opacity.maxLoops) && void 0 !== t ? t : 0) > 0 && (null !== (i = a.opacity.loops) && void 0 !== i ? i : 0) < (null !== (c = a.opacity.maxLoops) && void 0 !== c ? c : 0))
    }
    update(a, o) {
        this.isEnabled(a) && updateOpacity(a, o)
    }
}
async function loadOpacityUpdater(a) {
    await a.addParticleUpdater("opacity", (a => new OpacityUpdater(a)))
}
export {
    loadOpacityUpdater
};

//# sourceMappingURL=index.js.map