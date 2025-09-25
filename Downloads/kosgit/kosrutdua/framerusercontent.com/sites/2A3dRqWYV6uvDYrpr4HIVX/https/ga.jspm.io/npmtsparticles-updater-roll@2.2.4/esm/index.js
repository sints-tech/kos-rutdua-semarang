import {
    setRangeValue as l,
    OptionsColor as e,
    getRandom as o,
    getRangeValue as a,
    rangeColorToHsl as n
} from "tsparticles-engine";
class RollLight {
    constructor() {
        this.enable = false;
        this.value = 0
    }
    load(e) {
        if (e) {
            void 0 !== e.enable && (this.enable = e.enable);
            void 0 !== e.value && (this.value = l(e.value))
        }
    }
}
class Roll {
    constructor() {
        this.darken = new RollLight;
        this.enable = false;
        this.enlighten = new RollLight;
        this.mode = "vertical";
        this.speed = 25
    }
    load(o) {
        if (o) {
            void 0 !== o.backColor && (this.backColor = e.create(this.backColor, o.backColor));
            this.darken.load(o.darken);
            void 0 !== o.enable && (this.enable = o.enable);
            this.enlighten.load(o.enlighten);
            void 0 !== o.mode && (this.mode = o.mode);
            void 0 !== o.speed && (this.speed = l(o.speed))
        }
    }
}

function updateRoll(l, e) {
    const o = l.options.roll;
    if (!l.roll || !(null === o || void 0 === o ? void 0 : o.enable)) return;
    const a = l.roll.speed * e.factor,
        n = 2 * Math.PI;
    l.roll.angle += a;
    l.roll.angle > n && (l.roll.angle -= n)
}
class RollUpdater {
    getTransformValues(l) {
        var e;
        const o = (null === (e = l.roll) || void 0 === e ? void 0 : e.enable) && l.roll,
            a = o && o.horizontal,
            n = o && o.vertical;
        return {
            a: a ? Math.cos(o.angle) : void 0,
            d: n ? Math.sin(o.angle) : void 0
        }
    }
    init(l) {
        const e = l.options.roll;
        if (null === e || void 0 === e ? void 0 : e.enable) {
            l.roll = {
                enable: e.enable,
                horizontal: "horizontal" === e.mode || "both" === e.mode,
                vertical: "vertical" === e.mode || "both" === e.mode,
                angle: o() * Math.PI * 2,
                speed: a(e.speed) / 360
            };
            if (e.backColor) l.backColor = n(e.backColor);
            else if (e.darken.enable && e.enlighten.enable) {
                const n = o() >= .5 ? "darken" : "enlighten";
                l.roll.alter = {
                    type: n,
                    value: a("darken" === n ? e.darken.value : e.enlighten.value)
                }
            } else e.darken.enable ? l.roll.alter = {
                type: "darken",
                value: a(e.darken.value)
            } : e.enlighten.enable && (l.roll.alter = {
                type: "enlighten",
                value: a(e.enlighten.value)
            })
        } else l.roll = {
            enable: false,
            horizontal: false,
            vertical: false,
            angle: 0,
            speed: 0
        }
    }
    isEnabled(l) {
        const e = l.options.roll;
        return !l.destroyed && !l.spawning && !!(null === e || void 0 === e ? void 0 : e.enable)
    }
    loadOptions(l, ...e) {
        l.roll || (l.roll = new Roll);
        for (const o of e) l.roll.load(null === o || void 0 === o ? void 0 : o.roll)
    }
    update(l, e) {
        this.isEnabled(l) && updateRoll(l, e)
    }
}
async function loadRollUpdater(l) {
    await l.addParticleUpdater("roll", (() => new RollUpdater))
}
export {
    loadRollUpdater
};

//# sourceMappingURL=index.js.map