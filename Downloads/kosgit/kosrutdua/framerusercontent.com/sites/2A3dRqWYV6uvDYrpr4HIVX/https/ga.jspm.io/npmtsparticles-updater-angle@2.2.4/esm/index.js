import {
    getRangeValue as t,
    getRandom as e
} from "tsparticles-engine";

function updateAngle(t, e) {
    var a, o;
    const n = t.rotate;
    if (!n) return;
    const i = t.options.rotate,
        l = i.animation,
        r = (null !== (a = n.velocity) && void 0 !== a ? a : 0) * e.factor,
        c = 2 * Math.PI,
        s = null !== (o = n.decay) && void 0 !== o ? o : 1;
    if (l.enable) {
        switch (n.status) {
            case 0:
                n.value += r;
                n.value > c && (n.value -= c);
                break;
            case 1:
            default:
                n.value -= r;
                n.value < 0 && (n.value += c);
                break
        }
        n.velocity && 1 !== s && (n.velocity *= s)
    }
}
class AngleUpdater {
    constructor(t) {
        this.container = t
    }
    init(a) {
        const o = a.options.rotate;
        a.rotate = {
            enable: o.animation.enable,
            value: t(o.value) * Math.PI / 180
        };
        let n = o.direction;
        if ("random" === n) {
            const t = Math.floor(2 * e());
            n = t > 0 ? "counter-clockwise" : "clockwise"
        }
        switch (n) {
            case "counter-clockwise":
            case "counterClockwise":
                a.rotate.status = 1;
                break;
            case "clockwise":
                a.rotate.status = 0;
                break
        }
        const i = a.options.rotate.animation;
        if (i.enable) {
            a.rotate.decay = 1 - t(i.decay);
            a.rotate.velocity = t(i.speed) / 360 * this.container.retina.reduceFactor;
            i.sync || (a.rotate.velocity *= e())
        }
        a.rotation = a.rotate.value
    }
    isEnabled(t) {
        const e = t.options.rotate,
            a = e.animation;
        return !t.destroyed && !t.spawning && a.enable && !e.path
    }
    update(t, e) {
        var a, o;
        if (this.isEnabled(t)) {
            updateAngle(t, e);
            t.rotation = null !== (o = null === (a = t.rotate) || void 0 === a ? void 0 : a.value) && void 0 !== o ? o : 0
        }
    }
}
async function loadAngleUpdater(t) {
    await t.addParticleUpdater("angle", (t => new AngleUpdater(t)))
}
export {
    loadAngleUpdater
};

//# sourceMappingURL=index.js.map