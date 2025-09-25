import {
    clamp as e
} from "tsparticles-engine";

function checkDestroy(e, s, i, o) {
    switch (e.options.size.animation.destroy) {
        case "max":
            s >= o && e.destroy();
            break;
        case "min":
            s <= i && e.destroy();
            break
    }
}

function updateSize(s, i) {
    var o, a, l, t, z;
    const d = (null !== (o = s.size.velocity) && void 0 !== o ? o : 0) * i.factor,
        n = s.size.min,
        p = s.size.max,
        r = null !== (a = s.size.decay) && void 0 !== a ? a : 1;
    if (!(s.destroyed || !s.size.enable || (null !== (l = s.size.maxLoops) && void 0 !== l ? l : 0) > 0 && (null !== (t = s.size.loops) && void 0 !== t ? t : 0) > (null !== (z = s.size.maxLoops) && void 0 !== z ? z : 0))) {
        switch (s.size.status) {
            case 0:
                if (s.size.value >= p) {
                    s.size.status = 1;
                    s.size.loops || (s.size.loops = 0);
                    s.size.loops++
                } else s.size.value += d;
                break;
            case 1:
                if (s.size.value <= n) {
                    s.size.status = 0;
                    s.size.loops || (s.size.loops = 0);
                    s.size.loops++
                } else s.size.value -= d
        }
        s.size.velocity && 1 !== r && (s.size.velocity *= r);
        checkDestroy(s, s.size.value, n, p);
        s.destroyed || (s.size.value = e(s.size.value, n, p))
    }
}
class SizeUpdater {
    init() {}
    isEnabled(e) {
        var s, i, o, a;
        return !e.destroyed && !e.spawning && e.size.enable && ((null !== (s = e.size.maxLoops) && void 0 !== s ? s : 0) <= 0 || (null !== (i = e.size.maxLoops) && void 0 !== i ? i : 0) > 0 && (null !== (o = e.size.loops) && void 0 !== o ? o : 0) < (null !== (a = e.size.maxLoops) && void 0 !== a ? a : 0))
    }
    update(e, s) {
        this.isEnabled(e) && updateSize(e, s)
    }
}
async function loadSizeUpdater(e) {
    await e.addParticleUpdater("size", (() => new SizeUpdater))
}
export {
    loadSizeUpdater
};

//# sourceMappingURL=index.js.map