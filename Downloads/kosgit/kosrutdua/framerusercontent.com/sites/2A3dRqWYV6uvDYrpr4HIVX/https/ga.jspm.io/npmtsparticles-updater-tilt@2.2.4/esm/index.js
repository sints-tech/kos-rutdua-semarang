import {
    setRangeValue as t,
    ValueWithRandom as i,
    getRangeValue as e,
    getRandom as l
} from "tsparticles-engine";
class TiltAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false
    }
    load(i) {
        if (i) {
            void 0 !== i.enable && (this.enable = i.enable);
            void 0 !== i.speed && (this.speed = t(i.speed));
            void 0 !== i.decay && (this.decay = t(i.decay));
            void 0 !== i.sync && (this.sync = i.sync)
        }
    }
}
class Tilt extends i {
    constructor() {
        super();
        this.animation = new TiltAnimation;
        this.direction = "clockwise";
        this.enable = false;
        this.value = 0
    }
    load(t) {
        super.load(t);
        if (t) {
            this.animation.load(t.animation);
            void 0 !== t.direction && (this.direction = t.direction);
            void 0 !== t.enable && (this.enable = t.enable)
        }
    }
}

function updateTilt(t, i) {
    var e, l;
    if (!t.tilt || !t.options.tilt) return;
    const a = t.options.tilt,
        o = a.animation,
        n = (null !== (e = t.tilt.velocity) && void 0 !== e ? e : 0) * i.factor,
        s = 2 * Math.PI,
        c = null !== (l = t.tilt.decay) && void 0 !== l ? l : 1;
    if (o.enable) {
        switch (t.tilt.status) {
            case 0:
                t.tilt.value += n;
                t.tilt.value > s && (t.tilt.value -= s);
                break;
            case 1:
            default:
                t.tilt.value -= n;
                t.tilt.value < 0 && (t.tilt.value += s);
                break
        }
        t.tilt.velocity && 1 !== c && (t.tilt.velocity *= c)
    }
}
class TiltUpdater {
    constructor(t) {
        this.container = t
    }
    getTransformValues(t) {
        var i;
        const e = (null === (i = t.tilt) || void 0 === i ? void 0 : i.enable) && t.tilt;
        return {
            b: e ? Math.cos(e.value) * e.cosDirection : void 0,
            c: e ? Math.sin(e.value) * e.sinDirection : void 0
        }
    }
    init(t) {
        var i;
        const a = t.options.tilt;
        if (!a) return;
        t.tilt = {
            enable: a.enable,
            value: e(a.value) * Math.PI / 180,
            sinDirection: l() >= .5 ? 1 : -1,
            cosDirection: l() >= .5 ? 1 : -1
        };
        let o = a.direction;
        if ("random" === o) {
            const t = Math.floor(2 * l());
            o = t > 0 ? "counter-clockwise" : "clockwise"
        }
        switch (o) {
            case "counter-clockwise":
            case "counterClockwise":
                t.tilt.status = 1;
                break;
            case "clockwise":
                t.tilt.status = 0;
                break
        }
        const n = null === (i = t.options.tilt) || void 0 === i ? void 0 : i.animation;
        if (null === n || void 0 === n ? void 0 : n.enable) {
            t.tilt.decay = 1 - e(n.decay);
            t.tilt.velocity = e(n.speed) / 360 * this.container.retina.reduceFactor;
            n.sync || (t.tilt.velocity *= l())
        }
    }
    isEnabled(t) {
        var i;
        const e = null === (i = t.options.tilt) || void 0 === i ? void 0 : i.animation;
        return !t.destroyed && !t.spawning && !!(null === e || void 0 === e ? void 0 : e.enable)
    }
    loadOptions(t, ...i) {
        t.tilt || (t.tilt = new Tilt);
        for (const e of i) t.tilt.load(null === e || void 0 === e ? void 0 : e.tilt)
    }
    update(t, i) {
        this.isEnabled(t) && updateTilt(t, i)
    }
}
async function loadTiltUpdater(t) {
    await t.addParticleUpdater("tilt", (t => new TiltUpdater(t)))
}
export {
    loadTiltUpdater
};

//# sourceMappingURL=index.js.map