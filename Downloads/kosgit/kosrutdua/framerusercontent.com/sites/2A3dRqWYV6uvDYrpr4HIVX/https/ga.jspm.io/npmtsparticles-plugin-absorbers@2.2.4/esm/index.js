import {
    ValueWithRandom as i,
    OptionsColor as s,
    setRangeValue as t,
    Vector as o,
    getRangeValue as r,
    rangeColorToRgb as e,
    getDistance as a,
    getDistances as n,
    getStyleFromRgb as b,
    isPointInside as l,
    calcPositionOrRandomFromSizeRanged as d,
    calcPositionOrRandomFromSize as c,
    getRandom as h,
    itemFromArray as v,
    isInArray as u
} from "tsparticles-engine";
class AbsorberSizeLimit {
    constructor() {
        this.radius = 0;
        this.mass = 0
    }
    load(i) {
        if (i) {
            void 0 !== i.mass && (this.mass = i.mass);
            void 0 !== i.radius && (this.radius = i.radius)
        }
    }
}
class AbsorberSize extends i {
    constructor() {
        super();
        this.density = 5;
        this.value = 50;
        this.limit = new AbsorberSizeLimit
    }
    load(i) {
        if (i) {
            super.load(i);
            void 0 !== i.density && (this.density = i.density);
            "number" === typeof i.limit ? this.limit.radius = i.limit : this.limit.load(i.limit)
        }
    }
}
class Absorber {
    constructor() {
        this.color = new s;
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new AbsorberSize
    }
    load(i) {
        if (void 0 !== i) {
            void 0 !== i.color && (this.color = s.create(this.color, i.color));
            void 0 !== i.draggable && (this.draggable = i.draggable);
            this.name = i.name;
            void 0 !== i.opacity && (this.opacity = i.opacity);
            if (void 0 !== i.position) {
                this.position = {};
                void 0 !== i.position.x && (this.position.x = t(i.position.x));
                void 0 !== i.position.y && (this.position.y = t(i.position.y))
            }
            void 0 !== i.size && this.size.load(i.size);
            void 0 !== i.destroy && (this.destroy = i.destroy);
            void 0 !== i.orbits && (this.orbits = i.orbits)
        }
    }
}
class AbsorberInstance {
    constructor(i, s, t, a) {
        var n, b, l;
        this.absorbers = i;
        this.container = s;
        this.initialPosition = a ? o.create(a.x, a.y) : void 0;
        if (t instanceof Absorber) this.options = t;
        else {
            this.options = new Absorber;
            this.options.load(t)
        }
        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = r(this.options.size.value) * s.retina.pixelRatio;
        this.mass = this.size * this.options.size.density * s.retina.reduceFactor;
        const d = this.options.size.limit;
        this.limit = {
            radius: d.radius * s.retina.pixelRatio * s.retina.reduceFactor,
            mass: d.mass
        };
        this.color = null !== (n = e(this.options.color)) && void 0 !== n ? n : {
            b: 0,
            g: 0,
            r: 0
        };
        this.position = null !== (l = null === (b = this.initialPosition) || void 0 === b ? void 0 : b.copy()) && void 0 !== l ? l : this.calcPosition()
    }
    attract(i) {
        const s = this.container,
            t = this.options;
        if (t.draggable) {
            const i = s.interactivity.mouse;
            if (i.clicking && i.downPosition) {
                const s = a(this.position, i.downPosition);
                s <= this.size && (this.dragging = true)
            } else this.dragging = false;
            if (this.dragging && i.position) {
                this.position.x = i.position.x;
                this.position.y = i.position.y
            }
        }
        const r = i.getPosition(),
            {
                dx: e,
                dy: b,
                distance: l
            } = n(this.position, r),
            d = o.create(e, b);
        d.length = this.mass / Math.pow(l, 2) * s.retina.reduceFactor;
        if (l < this.size + i.getRadius()) {
            const o = .033 * i.getRadius() * s.retina.pixelRatio;
            if (this.size > i.getRadius() && l < this.size - i.getRadius() || void 0 !== i.absorberOrbit && i.absorberOrbit.length < 0)
                if (t.destroy) i.destroy();
                else {
                    i.needsNewPosition = true;
                    this.updateParticlePosition(i, d)
                }
            else {
                t.destroy && (i.size.value -= o);
                this.updateParticlePosition(i, d)
            }(this.limit.radius <= 0 || this.size < this.limit.radius) && (this.size += o);
            (this.limit.mass <= 0 || this.mass < this.limit.mass) && (this.mass += o * this.options.size.density * s.retina.reduceFactor)
        } else this.updateParticlePosition(i, d)
    }
    draw(i) {
        i.translate(this.position.x, this.position.y);
        i.beginPath();
        i.arc(0, 0, this.size, 0, 2 * Math.PI, false);
        i.closePath();
        i.fillStyle = b(this.color, this.opacity);
        i.fill()
    }
    resize() {
        const i = this.initialPosition;
        this.position = i && l(i, this.container.canvas.size, o.origin) ? i : this.calcPosition()
    }
    calcPosition() {
        const i = d({
            size: this.container.canvas.size,
            position: this.options.position
        });
        return o.create(i.x, i.y)
    }
    updateParticlePosition(i, s) {
        var t;
        if (i.destroyed) return;
        const r = this.container,
            e = r.canvas.size;
        if (i.needsNewPosition) {
            const s = c({
                size: e
            });
            i.position.setTo(s);
            i.velocity.setTo(i.initialVelocity);
            i.absorberOrbit = void 0;
            i.needsNewPosition = false
        }
        if (this.options.orbits) {
            if (void 0 === i.absorberOrbit) {
                i.absorberOrbit = o.create(0, 0);
                i.absorberOrbit.length = a(i.getPosition(), this.position);
                i.absorberOrbit.angle = h() * Math.PI * 2
            }
            if (i.absorberOrbit.length <= this.size && !this.options.destroy) {
                const s = Math.min(e.width, e.height);
                i.absorberOrbit.length = s * (.2 * h() - .1 + 1)
            }
            void 0 === i.absorberOrbitDirection && (i.absorberOrbitDirection = i.velocity.x >= 0 ? "clockwise" : "counter-clockwise");
            const n = i.absorberOrbit.length,
                b = i.absorberOrbit.angle,
                l = i.absorberOrbitDirection;
            i.velocity.setTo(o.origin);
            const d = {
                x: "clockwise" === l ? Math.cos : Math.sin,
                y: "clockwise" === l ? Math.sin : Math.cos
            };
            i.position.x = this.position.x + n * d.x(b);
            i.position.y = this.position.y + n * d.y(b);
            i.absorberOrbit.length -= s.length;
            i.absorberOrbit.angle += (null !== (t = i.retina.moveSpeed) && void 0 !== t ? t : 0) * r.retina.pixelRatio / 100 * r.retina.reduceFactor
        } else {
            const t = o.origin;
            t.length = s.length;
            t.angle = s.angle;
            i.velocity.addTo(t)
        }
    }
}
class Absorbers {
    constructor(i) {
        this.container = i;
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];
        i.getAbsorber = i => void 0 === i || "number" === typeof i ? this.array[i || 0] : this.array.find((s => s.name === i));
        i.addAbsorber = (i, s) => this.addAbsorber(i, s)
    }
    addAbsorber(i, s) {
        const t = new AbsorberInstance(this, this.container, i, s);
        this.array.push(t);
        return t
    }
    draw(i) {
        for (const s of this.array) {
            i.save();
            s.draw(i);
            i.restore()
        }
    }
    handleClickMode(i) {
        const s = this.absorbers,
            t = this.interactivityAbsorbers;
        if ("absorber" === i) {
            let i;
            t instanceof Array ? t.length > 0 && (i = v(t)) : i = t;
            const o = null !== i && void 0 !== i ? i : s instanceof Array ? v(s) : s,
                r = this.container.interactivity.mouse.clickPosition;
            this.addAbsorber(o, r)
        }
    }
    init(i) {
        var s, t;
        if (!i) return;
        if (i.absorbers)
            if (i.absorbers instanceof Array) this.absorbers = i.absorbers.map((i => {
                const s = new Absorber;
                s.load(i);
                return s
            }));
            else {
                this.absorbers instanceof Array && (this.absorbers = new Absorber);
                this.absorbers.load(i.absorbers)
            }
        const o = null === (t = null === (s = i.interactivity) || void 0 === s ? void 0 : s.modes) || void 0 === t ? void 0 : t.absorbers;
        if (o)
            if (o instanceof Array) this.interactivityAbsorbers = o.map((i => {
                const s = new Absorber;
                s.load(i);
                return s
            }));
            else {
                this.interactivityAbsorbers instanceof Array && (this.interactivityAbsorbers = new Absorber);
                this.interactivityAbsorbers.load(o)
            }
        if (this.absorbers instanceof Array)
            for (const i of this.absorbers) this.addAbsorber(i);
        else this.addAbsorber(this.absorbers)
    }
    particleUpdate(i) {
        for (const s of this.array) {
            s.attract(i);
            if (i.destroyed) break
        }
    }
    removeAbsorber(i) {
        const s = this.array.indexOf(i);
        s >= 0 && this.array.splice(s, 1)
    }
    resize() {
        for (const i of this.array) i.resize()
    }
    stop() {
        this.array = []
    }
}
class AbsorbersPlugin {
    constructor() {
        this.id = "absorbers"
    }
    getPlugin(i) {
        return new Absorbers(i)
    }
    loadOptions(i, s) {
        var t, o;
        if (!this.needsPlugin(i) && !this.needsPlugin(s)) return;
        const r = i;
        if (null === s || void 0 === s ? void 0 : s.absorbers)
            if ((null === s || void 0 === s ? void 0 : s.absorbers) instanceof Array) r.absorbers = null === s || void 0 === s ? void 0 : s.absorbers.map((i => {
                const s = new Absorber;
                s.load(i);
                return s
            }));
            else {
                let i = r.absorbers;
                void 0 === (null === i || void 0 === i ? void 0 : i.load) && (r.absorbers = i = new Absorber);
                i.load(null === s || void 0 === s ? void 0 : s.absorbers)
            }
        const e = null === (o = null === (t = null === s || void 0 === s ? void 0 : s.interactivity) || void 0 === t ? void 0 : t.modes) || void 0 === o ? void 0 : o.absorbers;
        if (e)
            if (e instanceof Array) r.interactivity.modes.absorbers = e.map((i => {
                const s = new Absorber;
                s.load(i);
                return s
            }));
            else {
                let i = r.interactivity.modes.absorbers;
                void 0 === (null === i || void 0 === i ? void 0 : i.load) && (r.interactivity.modes.absorbers = i = new Absorber);
                i.load(e)
            }
    }
    needsPlugin(i) {
        var s, t, o;
        if (!i) return false;
        const r = i.absorbers;
        return r instanceof Array ? !!r.length : !!r || !(!(null === (o = null === (t = null === (s = i.interactivity) || void 0 === s ? void 0 : s.events) || void 0 === t ? void 0 : t.onClick) || void 0 === o ? void 0 : o.mode) || !u("absorber", i.interactivity.events.onClick.mode))
    }
}
async function loadAbsorbersPlugin(i) {
    const s = new AbsorbersPlugin;
    await i.addPlugin(s)
}
export {
    loadAbsorbersPlugin
};

//# sourceMappingURL=index.js.map