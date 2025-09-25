import {
    getRandom as t,
    setRangeValue as i,
    deepExtend as e,
    AnimatableColor as s,
    rangeColorToHsl as o,
    getRangeValue as a,
    isPointInside as r,
    Vector as n,
    calcPositionOrRandomFromSizeRanged as l,
    itemFromArray as h,
    randomInRange as d,
    arrayRandomIndex as c,
    isInArray as u
} from "tsparticles-engine";
class CircleShape {
    randomPosition(i, e, s) {
        const generateTheta = (i, e) => {
                const s = t() / 4,
                    o = Math.atan(e / i * Math.tan(2 * Math.PI * s)),
                    a = t();
                return a < .25 ? o : a < .5 ? Math.PI - o : a < .75 ? Math.PI + o : -o
            },
            radius = (t, i, e) => t * i / Math.sqrt((i * Math.cos(e)) ** 2 + (t * Math.sin(e)) ** 2),
            [o, a] = [e.width / 2, e.height / 2],
            r = generateTheta(o, a),
            n = radius(o, a, r),
            l = s ? n * Math.sqrt(t()) : n;
        return {
            x: i.x + l * Math.cos(r),
            y: i.y + l * Math.sin(r)
        }
    }
}
class EmitterLife {
    constructor() {
        this.wait = false
    }
    load(t) {
        if (void 0 !== t) {
            void 0 !== t.count && (this.count = t.count);
            void 0 !== t.delay && (this.delay = t.delay);
            void 0 !== t.duration && (this.duration = t.duration);
            void 0 !== t.wait && (this.wait = t.wait)
        }
    }
}
class EmitterRate {
    constructor() {
        this.quantity = 1;
        this.delay = .1
    }
    load(t) {
        if (void 0 !== t) {
            void 0 !== t.quantity && (this.quantity = i(t.quantity));
            void 0 !== t.delay && (this.delay = i(t.delay))
        }
    }
}
class EmitterSize {
    constructor() {
        this.mode = "percent";
        this.height = 0;
        this.width = 0
    }
    load(t) {
        if (void 0 !== t) {
            void 0 !== t.mode && (this.mode = t.mode);
            void 0 !== t.height && (this.height = t.height);
            void 0 !== t.width && (this.width = t.width)
        }
    }
}
class Emitter {
    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife;
        this.rate = new EmitterRate;
        this.shape = "square";
        this.startCount = 0
    }
    load(t) {
        if (void 0 !== t) {
            void 0 !== t.autoPlay && (this.autoPlay = t.autoPlay);
            if (void 0 !== t.size) {
                void 0 === this.size && (this.size = new EmitterSize);
                this.size.load(t.size)
            }
            void 0 !== t.direction && (this.direction = t.direction);
            this.domId = t.domId;
            void 0 !== t.fill && (this.fill = t.fill);
            this.life.load(t.life);
            this.name = t.name;
            void 0 !== t.particles && (t.particles instanceof Array ? this.particles = t.particles.map((t => e({}, t))) : this.particles = e({}, t.particles));
            this.rate.load(t.rate);
            void 0 !== t.shape && (this.shape = t.shape);
            if (void 0 !== t.position) {
                this.position = {};
                void 0 !== t.position.x && (this.position.x = i(t.position.x));
                void 0 !== t.position.y && (this.position.y = i(t.position.y))
            }
            if (void 0 !== t.spawnColor) {
                void 0 === this.spawnColor && (this.spawnColor = new s);
                this.spawnColor.load(t.spawnColor)
            }
            void 0 !== t.startCount && (this.startCount = t.startCount)
        }
    }
}
var m = (void 0, function(t, i, e, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
});
var v = (void 0, function(t, i, e, s) {
    if ("a" === e && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof i ? t !== i || !s : !i.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? s : "a" === e ? s.call(t) : s ? s.value : i.get(t)
});
var p, f, y;
class EmitterInstance {
    constructor(t, i, s, a, r) {
        var n, l, h, d, c, u, w;
        var E;
        this.emitters = i;
        this.container = s;
        p.set(this, void 0);
        f.set(this, void 0);
        y.set(this, void 0);
        m(this, p, t, "f");
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = r;
        if (a instanceof Emitter) this.options = a;
        else {
            this.options = new Emitter;
            this.options.load(a)
        }
        this.spawnDelay = 1e3 * (null !== (n = this.options.life.delay) && void 0 !== n ? n : 0) / this.container.retina.reduceFactor;
        this.position = null !== (l = this.initialPosition) && void 0 !== l ? l : this.calcPosition();
        this.name = this.options.name;
        this.shape = null === (h = v(this, p, "f").emitterShapeManager) || void 0 === h ? void 0 : h.getShape(this.options.shape);
        this.fill = this.options.fill;
        m(this, f, !this.options.life.wait, "f");
        m(this, y, false, "f");
        let g = e({}, this.options.particles);
        null !== g && void 0 !== g ? g : g = {};
        null !== (d = g.move) && void 0 !== d ? d : g.move = {};
        null !== (c = (E = g.move).direction) && void 0 !== c ? c : E.direction = this.options.direction;
        this.options.spawnColor && (this.spawnColor = o(this.options.spawnColor));
        this.paused = !this.options.autoPlay;
        this.particlesOptions = g;
        this.size = null !== (u = this.options.size) && void 0 !== u ? u : (() => {
            const t = new EmitterSize;
            t.load({
                height: 0,
                mode: "percent",
                width: 0
            });
            return t
        })();
        this.lifeCount = null !== (w = this.options.life.count) && void 0 !== w ? w : -1;
        this.immortal = this.lifeCount <= 0;
        v(this, p, "f").dispatchEvent("emitterCreated", {
            container: s,
            data: {
                emitter: this
            }
        });
        this.play()
    }
    externalPause() {
        this.paused = true;
        this.pause()
    }
    externalPlay() {
        this.paused = false;
        this.play()
    }
    getPosition() {
        if (this.options.domId) {
            const t = this.container,
                i = document.getElementById(this.options.domId);
            if (i) {
                const e = i.getBoundingClientRect();
                return {
                    x: (e.x + e.width / 2) * t.retina.pixelRatio,
                    y: (e.y + e.height / 2) * t.retina.pixelRatio
                }
            }
        }
        return this.position
    }
    getSize() {
        const t = this.container;
        if (this.options.domId) {
            const i = document.getElementById(this.options.domId);
            if (i) {
                const e = i.getBoundingClientRect();
                return {
                    width: e.width * t.retina.pixelRatio,
                    height: e.height * t.retina.pixelRatio
                }
            }
        }
        return {
            width: "percent" === this.size.mode ? t.canvas.size.width * this.size.width / 100 : this.size.width,
            height: "percent" === this.size.mode ? t.canvas.size.height * this.size.height / 100 : this.size.height
        }
    }
    pause() {
        this.paused || delete this.emitDelay
    }
    play() {
        var t;
        if (!this.paused && this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal || !this.options.life.count) && (v(this, f, "f") || this.currentSpawnDelay >= (null !== (t = this.spawnDelay) && void 0 !== t ? t : 0))) {
            if (void 0 === this.emitDelay) {
                const t = a(this.options.rate.delay);
                this.emitDelay = 1e3 * t / this.container.retina.reduceFactor
            }(this.lifeCount > 0 || this.immortal) && this.prepareToDie()
        }
    }
    resize() {
        const t = this.initialPosition;
        this.position = t && r(t, this.container.canvas.size, n.origin) ? t : this.calcPosition()
    }
    update(t) {
        var i, e, s;
        if (!this.paused) {
            if (v(this, f, "f")) {
                m(this, f, false, "f");
                this.currentSpawnDelay = null !== (i = this.spawnDelay) && void 0 !== i ? i : 0;
                this.currentEmitDelay = null !== (e = this.emitDelay) && void 0 !== e ? e : 0
            }
            if (!v(this, y, "f")) {
                m(this, y, true, "f");
                this.emitParticles(this.options.startCount)
            }
            if (void 0 !== this.duration) {
                this.currentDuration += t.value;
                if (this.currentDuration >= this.duration) {
                    this.pause();
                    void 0 !== this.spawnDelay && delete this.spawnDelay;
                    this.immortal || this.lifeCount--;
                    if (this.lifeCount > 0 || this.immortal) {
                        this.position = this.calcPosition();
                        this.spawnDelay = 1e3 * (null !== (s = this.options.life.delay) && void 0 !== s ? s : 0) / this.container.retina.reduceFactor
                    } else this.destroy();
                    this.currentDuration -= this.duration;
                    delete this.duration
                }
            }
            if (void 0 !== this.spawnDelay) {
                this.currentSpawnDelay += t.value;
                if (this.currentSpawnDelay >= this.spawnDelay) {
                    v(this, p, "f").dispatchEvent("emitterPlay", {
                        container: this.container
                    });
                    this.play();
                    this.currentSpawnDelay -= this.currentSpawnDelay;
                    delete this.spawnDelay
                }
            }
            if (void 0 !== this.emitDelay) {
                this.currentEmitDelay += t.value;
                if (this.currentEmitDelay >= this.emitDelay) {
                    this.emit();
                    this.currentEmitDelay -= this.emitDelay
                }
            }
        }
    }
    calcPosition() {
        return l({
            size: this.container.canvas.size,
            position: this.options.position
        })
    }
    destroy() {
        this.emitters.removeEmitter(this);
        v(this, p, "f").dispatchEvent("emitterDestroyed", {
            container: this.container,
            data: {
                emitter: this
            }
        })
    }
    emit() {
        if (this.paused) return;
        const t = a(this.options.rate.quantity);
        this.emitParticles(t)
    }
    emitParticles(t) {
        var i, s, o;
        const a = this.getPosition(),
            r = this.getSize(),
            n = this.particlesOptions instanceof Array ? h(this.particlesOptions) : this.particlesOptions;
        for (let l = 0; l < t; l++) {
            const t = e({}, n);
            if (this.spawnColor) {
                const e = null === (i = this.options.spawnColor) || void 0 === i ? void 0 : i.animation;
                if (e) {
                    this.spawnColor.h = this.setColorAnimation(e.h, this.spawnColor.h, 360);
                    this.spawnColor.s = this.setColorAnimation(e.s, this.spawnColor.s, 100);
                    this.spawnColor.l = this.setColorAnimation(e.l, this.spawnColor.l, 100)
                }
                t.color ? t.color.value = this.spawnColor : t.color = {
                    value: this.spawnColor
                }
            }
            if (!a) return;
            const l = null !== (o = null === (s = this.shape) || void 0 === s ? void 0 : s.randomPosition(a, r, this.fill)) && void 0 !== o ? o : a;
            this.container.particles.addParticle(l, t)
        }
    }
    prepareToDie() {
        var t;
        if (this.paused) return;
        const i = null === (t = this.options.life) || void 0 === t ? void 0 : t.duration;
        this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal) && void 0 !== i && i > 0 && (this.duration = 1e3 * i)
    }
    setColorAnimation(t, i, e) {
        var s;
        const o = this.container;
        if (!t.enable) return i;
        const r = d(t.offset),
            n = a(this.options.rate.delay),
            l = 1e3 * n / o.retina.reduceFactor,
            h = a(null !== (s = t.speed) && void 0 !== s ? s : 0);
        return (i + h * o.fpsLimit / l + 3.6 * r) % e
    }
}
p = new WeakMap, f = new WeakMap, y = new WeakMap;
var w = (void 0, function(t, i, e, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
});
var E = (void 0, function(t, i, e, s) {
    if ("a" === e && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof i ? t !== i || !s : !i.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? s : "a" === e ? s.call(t) : s ? s.value : i.get(t)
});
var g;
class Emitters {
    constructor(t, i) {
        this.container = i;
        g.set(this, void 0);
        w(this, g, t, "f");
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = {
            random: {
                count: 1,
                enable: false
            },
            value: []
        };
        i.getEmitter = t => void 0 === t || "number" === typeof t ? this.array[t || 0] : this.array.find((i => i.name === t));
        i.addEmitter = (t, i) => this.addEmitter(t, i);
        i.removeEmitter = t => {
            const e = i.getEmitter(t);
            e && this.removeEmitter(e)
        };
        i.playEmitter = t => {
            const e = i.getEmitter(t);
            e && e.externalPlay()
        };
        i.pauseEmitter = t => {
            const e = i.getEmitter(t);
            e && e.externalPause()
        }
    }
    addEmitter(t, i) {
        const e = new Emitter;
        e.load(t);
        const s = new EmitterInstance(E(this, g, "f"), this, this.container, e, i);
        this.array.push(s);
        return s
    }
    handleClickMode(t) {
        const i = this.emitters,
            s = this.interactivityEmitters;
        if ("emitter" === t) {
            let t;
            if (s && s.value instanceof Array)
                if (s.value.length > 0 && s.random.enable) {
                    t = [];
                    const i = [];
                    for (let e = 0; e < s.random.count; e++) {
                        const o = c(s.value);
                        if (i.includes(o) && i.length < s.value.length) e--;
                        else {
                            i.push(o);
                            t.push(h(s.value, o))
                        }
                    }
                } else t = s.value;
            else t = null === s || void 0 === s ? void 0 : s.value;
            const o = null !== t && void 0 !== t ? t : i,
                a = this.container.interactivity.mouse.clickPosition;
            if (o instanceof Array)
                for (const t of o) this.addEmitter(t, a);
            else this.addEmitter(e({}, o), a)
        }
    }
    init(t) {
        var i, e, s, o, a, r, n, l;
        if (!t) return;
        if (t.emitters)
            if (t.emitters instanceof Array) this.emitters = t.emitters.map((t => {
                const i = new Emitter;
                i.load(t);
                return i
            }));
            else {
                this.emitters instanceof Array && (this.emitters = new Emitter);
                this.emitters.load(t.emitters)
            }
        const h = null === (e = null === (i = t.interactivity) || void 0 === i ? void 0 : i.modes) || void 0 === e ? void 0 : e.emitters;
        if (h)
            if (h instanceof Array) this.interactivityEmitters = {
                random: {
                    count: 1,
                    enable: true
                },
                value: h.map((t => {
                    const i = new Emitter;
                    i.load(t);
                    return i
                }))
            };
            else {
                const t = h;
                if (void 0 !== t.value)
                    if (t.value instanceof Array) this.interactivityEmitters = {
                        random: {
                            count: null !== (s = this.interactivityEmitters.random.count) && void 0 !== s ? s : 1,
                            enable: null !== (o = this.interactivityEmitters.random.enable) && void 0 !== o && o
                        },
                        value: t.value.map((t => {
                            const i = new Emitter;
                            i.load(t);
                            return i
                        }))
                    };
                    else {
                        const i = new Emitter;
                        i.load(t.value);
                        this.interactivityEmitters = {
                            random: {
                                count: null !== (a = this.interactivityEmitters.random.count) && void 0 !== a ? a : 1,
                                enable: null !== (r = this.interactivityEmitters.random.enable) && void 0 !== r && r
                            },
                            value: i
                        }
                    }
                else {
                    const t = new Emitter;
                    t.load(h);
                    this.interactivityEmitters = {
                        random: {
                            count: null !== (n = this.interactivityEmitters.random.count) && void 0 !== n ? n : 1,
                            enable: null !== (l = this.interactivityEmitters.random.enable) && void 0 !== l && l
                        },
                        value: t
                    }
                }
            }
        if (this.emitters instanceof Array)
            for (const t of this.emitters) this.addEmitter(t);
        else this.addEmitter(this.emitters)
    }
    pause() {
        for (const t of this.array) t.pause()
    }
    play() {
        for (const t of this.array) t.play()
    }
    removeEmitter(t) {
        const i = this.array.indexOf(t);
        i >= 0 && this.array.splice(i, 1)
    }
    resize() {
        for (const t of this.array) t.resize()
    }
    stop() {
        this.array = []
    }
    update(t) {
        for (const i of this.array) i.update(t)
    }
}
g = new WeakMap;
var C = (void 0, function(t, i, e, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
});
var P;
const S = new Map;
class ShapeManager {
    constructor(t) {
        P.set(this, void 0);
        C(this, P, t, "f")
    }
    addShape(t, i) {
        this.getShape(t) || S.set(t, i)
    }
    getShape(t) {
        return S.get(t)
    }
    getSupportedShapes() {
        return S.keys()
    }
}
P = new WeakMap;

function randomSquareCoordinate(i, e) {
    return i + e * (t() - .5)
}
class SquareShape {
    randomPosition(i, e, s) {
        if (s) return {
            x: randomSquareCoordinate(i.x, e.width),
            y: randomSquareCoordinate(i.y, e.height)
        }; {
            const s = e.width / 2,
                o = e.height / 2,
                a = Math.floor(4 * t()),
                r = 2 * (t() - .5);
            switch (a) {
                case 0:
                    return {
                        x: i.x + r * s,
                        y: i.y - o
                    };
                case 1:
                    return {
                        x: i.x - s,
                        y: i.y + r * o
                    };
                case 2:
                    return {
                        x: i.x + r * s,
                        y: i.y + o
                    };
                case 3:
                default:
                    return {
                        x: i.x + s,
                        y: i.y + r * o
                    }
            }
        }
    }
}
var b = (void 0, function(t, i, e, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
});
var D = (void 0, function(t, i, e, s) {
    if ("a" === e && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof i ? t !== i || !s : !i.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? s : "a" === e ? s.call(t) : s ? s.value : i.get(t)
});
var x;
class EmittersPlugin {
    constructor(t) {
        x.set(this, void 0);
        b(this, x, t, "f");
        this.id = "emitters"
    }
    getPlugin(t) {
        return new Emitters(D(this, x, "f"), t)
    }
    loadOptions(t, i) {
        var e, s, o, a, r, n;
        if (!this.needsPlugin(t) && !this.needsPlugin(i)) return;
        const l = t;
        if (null === i || void 0 === i ? void 0 : i.emitters)
            if ((null === i || void 0 === i ? void 0 : i.emitters) instanceof Array) l.emitters = null === i || void 0 === i ? void 0 : i.emitters.map((t => {
                const i = new Emitter;
                i.load(t);
                return i
            }));
            else {
                let t = l.emitters;
                void 0 === (null === t || void 0 === t ? void 0 : t.load) && (l.emitters = t = new Emitter);
                t.load(null === i || void 0 === i ? void 0 : i.emitters)
            }
        const h = null === (s = null === (e = null === i || void 0 === i ? void 0 : i.interactivity) || void 0 === e ? void 0 : e.modes) || void 0 === s ? void 0 : s.emitters;
        if (h)
            if (h instanceof Array) l.interactivity.modes.emitters = {
                random: {
                    count: 1,
                    enable: true
                },
                value: h.map((t => {
                    const i = new Emitter;
                    i.load(t);
                    return i
                }))
            };
            else {
                const t = h;
                if (void 0 !== t.value)
                    if (t.value instanceof Array) l.interactivity.modes.emitters = {
                        random: {
                            count: null !== (o = t.random.count) && void 0 !== o ? o : 1,
                            enable: null !== (a = t.random.enable) && void 0 !== a && a
                        },
                        value: t.value.map((t => {
                            const i = new Emitter;
                            i.load(t);
                            return i
                        }))
                    };
                    else {
                        const i = new Emitter;
                        i.load(t.value);
                        l.interactivity.modes.emitters = {
                            random: {
                                count: null !== (r = t.random.count) && void 0 !== r ? r : 1,
                                enable: null !== (n = t.random.enable) && void 0 !== n && n
                            },
                            value: i
                        }
                    }
                else {
                    const t = l.interactivity.modes.emitters = {
                        random: {
                            count: 1,
                            enable: false
                        },
                        value: new Emitter
                    };
                    t.value.load(h)
                }
            }
    }
    needsPlugin(t) {
        var i, e, s;
        if (!t) return false;
        const o = t.emitters;
        return o instanceof Array && !!o.length || void 0 !== o || !!(null === (s = null === (e = null === (i = t.interactivity) || void 0 === i ? void 0 : i.events) || void 0 === e ? void 0 : e.onClick) || void 0 === s ? void 0 : s.mode) && u("emitter", t.interactivity.events.onClick.mode)
    }
}
x = new WeakMap;
async function loadEmittersPlugin(t) {
    t.emitterShapeManager || (t.emitterShapeManager = new ShapeManager(t));
    t.addEmitterShape || (t.addEmitterShape = (i, e) => {
        var s;
        null === (s = t.emitterShapeManager) || void 0 === s ? void 0 : s.addShape(i, e)
    });
    const i = new EmittersPlugin(t);
    await t.addPlugin(i);
    t.addEmitterShape("circle", new CircleShape);
    t.addEmitterShape("square", new SquareShape)
}
export {
    loadEmittersPlugin
};

//# sourceMappingURL=index.js.map