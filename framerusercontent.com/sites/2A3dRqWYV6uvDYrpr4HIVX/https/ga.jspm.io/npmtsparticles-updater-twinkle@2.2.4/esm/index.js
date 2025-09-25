import {
    OptionsColor as e,
    setRangeValue as i,
    getRandom as t,
    getRangeValue as l,
    rangeColorToHsl as o,
    getStyleFromHsl as n
} from "tsparticles-engine";
class TwinkleValues {
    constructor() {
        this.enable = false;
        this.frequency = .05;
        this.opacity = 1
    }
    load(t) {
        if (t) {
            void 0 !== t.color && (this.color = e.create(this.color, t.color));
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.frequency && (this.frequency = t.frequency);
            void 0 !== t.opacity && (this.opacity = i(t.opacity))
        }
    }
}
class Twinkle {
    constructor() {
        this.lines = new TwinkleValues;
        this.particles = new TwinkleValues
    }
    load(e) {
        if (e) {
            this.lines.load(e.lines);
            this.particles.load(e.particles)
        }
    }
}
class TwinkleUpdater {
    getColorStyles(e, i, a, s) {
        const r = e.options,
            c = r.twinkle;
        if (!c) return {};
        const d = c.particles,
            p = d.enable && t() < d.frequency,
            w = e.options.zIndex,
            k = (1 - e.zIndexFactor) ** w.opacityRate,
            u = p ? l(d.opacity) * k : s,
            f = o(d.color),
            y = f ? n(f, u) : void 0,
            h = {},
            v = p && y;
        h.fill = v ? y : void 0;
        h.stroke = v ? y : void 0;
        return h
    }
    init() {}
    isEnabled(e) {
        const i = e.options,
            t = i.twinkle;
        return !!t && t.particles.enable
    }
    loadOptions(e, ...i) {
        e.twinkle || (e.twinkle = new Twinkle);
        for (const t of i) e.twinkle.load(null === t || void 0 === t ? void 0 : t.twinkle)
    }
    update() {}
}
async function loadTwinkleUpdater(e) {
    await e.addParticleUpdater("twinkle", (() => new TwinkleUpdater))
}
export {
    loadTwinkleUpdater
};

//# sourceMappingURL=index.js.map