import {
    ValueWithRandom as e,
    getRangeValue as i,
    getRandom as t,
    setRangeValue as n,
    randomInRange as a
} from "tsparticles-engine";
class LifeDelay extends e {
    constructor() {
        super();
        this.sync = false
    }
    load(e) {
        if (e) {
            super.load(e);
            void 0 !== e.sync && (this.sync = e.sync)
        }
    }
}
class LifeDuration extends e {
    constructor() {
        super();
        this.random.minimumValue = 1e-4;
        this.sync = false
    }
    load(e) {
        if (e) {
            super.load(e);
            void 0 !== e.sync && (this.sync = e.sync)
        }
    }
}
class Life {
    constructor() {
        this.count = 0;
        this.delay = new LifeDelay;
        this.duration = new LifeDuration
    }
    load(e) {
        if (e) {
            void 0 !== e.count && (this.count = e.count);
            this.delay.load(e.delay);
            this.duration.load(e.duration)
        }
    }
}
class LifeUpdater {
    constructor(e) {
        this.container = e
    }
    init(e) {
        const n = this.container,
            a = e.options,
            o = a.life;
        if (o) {
            e.life = {
                delay: n.retina.reduceFactor ? i(o.delay.value) * (o.delay.sync ? 1 : t()) / n.retina.reduceFactor * 1e3 : 0,
                delayTime: 0,
                duration: n.retina.reduceFactor ? i(o.duration.value) * (o.duration.sync ? 1 : t()) / n.retina.reduceFactor * 1e3 : 0,
                time: 0,
                count: o.count
            };
            e.life.duration <= 0 && (e.life.duration = -1);
            e.life.count <= 0 && (e.life.count = -1);
            e.life && (e.spawning = e.life.delay > 0)
        }
    }
    isEnabled(e) {
        return !e.destroyed
    }
    loadOptions(e, ...i) {
        e.life || (e.life = new Life);
        for (const t of i) e.life.load(null === t || void 0 === t ? void 0 : t.life)
    }
    update(e, t) {
        if (!this.isEnabled(e) || !e.life) return;
        const o = e.life;
        let r = false;
        if (e.spawning) {
            o.delayTime += t.value;
            if (!(o.delayTime >= e.life.delay)) return;
            r = true;
            e.spawning = false;
            o.delayTime = 0;
            o.time = 0
        }
        if (-1 === o.duration) return;
        if (e.spawning) return;
        r ? o.time = 0 : o.time += t.value;
        if (o.time < o.duration) return;
        o.time = 0;
        e.life.count > 0 && e.life.count--;
        if (0 === e.life.count) {
            e.destroy();
            return
        }
        const s = this.container.canvas.size,
            l = n(0, s.width),
            d = n(0, s.width);
        e.position.x = a(l);
        e.position.y = a(d);
        e.spawning = true;
        o.delayTime = 0;
        o.time = 0;
        e.reset();
        const u = e.options.life;
        if (u) {
            o.delay = 1e3 * i(u.delay.value);
            o.duration = 1e3 * i(u.duration.value)
        }
    }
}
async function loadLifeUpdater(e) {
    await e.addParticleUpdater("life", (e => new LifeUpdater(e)))
}
export {
    loadLifeUpdater
};

//# sourceMappingURL=index.js.map