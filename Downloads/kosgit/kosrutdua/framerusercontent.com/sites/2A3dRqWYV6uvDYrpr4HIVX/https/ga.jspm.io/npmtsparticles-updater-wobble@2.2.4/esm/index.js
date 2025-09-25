import {
    setRangeValue as e,
    getRandom as o,
    getRangeValue as l
} from "tsparticles-engine";
class WobbleSpeed {
    constructor() {
        this.angle = 50;
        this.move = 10
    }
    load(o) {
        if (o) {
            void 0 !== o.angle && (this.angle = e(o.angle));
            void 0 !== o.move && (this.move = e(o.move))
        }
    }
}
class Wobble {
    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = new WobbleSpeed
    }
    load(o) {
        if (o) {
            void 0 !== o.distance && (this.distance = e(o.distance));
            void 0 !== o.enable && (this.enable = o.enable);
            if (void 0 !== o.speed)
                if ("number" === typeof o.speed) this.speed.load({
                    angle: o.speed
                });
                else {
                    const e = o.speed;
                    void 0 !== e.min ? this.speed.load({
                        angle: e
                    }) : this.speed.load(o.speed)
                }
        }
    }
}

function updateWobble(e, o) {
    var l;
    const a = e.options.wobble;
    if (!(null === a || void 0 === a ? void 0 : a.enable) || !e.wobble) return;
    const n = e.wobble.angleSpeed * o.factor,
        i = e.wobble.moveSpeed * o.factor,
        t = i * ((null !== (l = e.retina.wobbleDistance) && void 0 !== l ? l : 0) * o.factor) / (1e3 / 60),
        b = 2 * Math.PI;
    e.wobble.angle += n;
    e.wobble.angle > b && (e.wobble.angle -= b);
    e.position.x += t * Math.cos(e.wobble.angle);
    e.position.y += t * Math.abs(Math.sin(e.wobble.angle))
}
class WobbleUpdater {
    constructor(e) {
        this.container = e
    }
    init(e) {
        var a;
        const n = e.options.wobble;
        (null === n || void 0 === n ? void 0 : n.enable) ? e.wobble = {
            angle: o() * Math.PI * 2,
            angleSpeed: l(n.speed.angle) / 360,
            moveSpeed: l(n.speed.move) / 10
        }: e.wobble = {
            angle: 0,
            angleSpeed: 0,
            moveSpeed: 0
        };
        e.retina.wobbleDistance = l(null !== (a = null === n || void 0 === n ? void 0 : n.distance) && void 0 !== a ? a : 0) * this.container.retina.pixelRatio
    }
    isEnabled(e) {
        var o;
        return !e.destroyed && !e.spawning && !!(null === (o = e.options.wobble) || void 0 === o ? void 0 : o.enable)
    }
    loadOptions(e, ...o) {
        e.wobble || (e.wobble = new Wobble);
        for (const l of o) e.wobble.load(null === l || void 0 === l ? void 0 : l.wobble)
    }
    update(e, o) {
        this.isEnabled(e) && updateWobble(e, o)
    }
}
async function loadWobbleUpdater(e) {
    await e.addParticleUpdater("wobble", (e => new WobbleUpdater(e)))
}
export {
    loadWobbleUpdater
};

//# sourceMappingURL=index.js.map