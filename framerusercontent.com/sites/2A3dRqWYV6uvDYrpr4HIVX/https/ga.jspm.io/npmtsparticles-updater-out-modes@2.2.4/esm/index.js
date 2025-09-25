import {
    getValue as t,
    calculateBounds as o,
    getDistances as i,
    isPointInside as e,
    Vector as n,
    getRandom as s,
    randomInRange as a
} from "tsparticles-engine";

function bounceHorizontal(o) {
    if ("bounce" !== o.outMode && "bounce-horizontal" !== o.outMode && "bounceHorizontal" !== o.outMode && "split" !== o.outMode) return;
    o.bounds.right < 0 ? o.particle.position.x = o.size + o.offset.x : o.bounds.left > o.canvasSize.width && (o.particle.position.x = o.canvasSize.width - o.size - o.offset.x);
    const i = o.particle.velocity.x;
    let e = false;
    if ("right" === o.direction && o.bounds.right >= o.canvasSize.width && i > 0 || "left" === o.direction && o.bounds.left <= 0 && i < 0) {
        const i = t(o.particle.options.bounce.horizontal);
        o.particle.velocity.x *= -i;
        e = true
    }
    if (!e) return;
    const n = o.offset.x + o.size;
    o.bounds.right >= o.canvasSize.width ? o.particle.position.x = o.canvasSize.width - n : o.bounds.left <= 0 && (o.particle.position.x = n);
    "split" === o.outMode && o.particle.destroy()
}

function bounceVertical(o) {
    if ("bounce" !== o.outMode && "bounce-vertical" !== o.outMode && "bounceVertical" !== o.outMode && "split" !== o.outMode) return;
    o.bounds.bottom < 0 ? o.particle.position.y = o.size + o.offset.y : o.bounds.top > o.canvasSize.height && (o.particle.position.y = o.canvasSize.height - o.size - o.offset.y);
    const i = o.particle.velocity.y;
    let e = false;
    if ("bottom" === o.direction && o.bounds.bottom >= o.canvasSize.height && i > 0 || "top" === o.direction && o.bounds.top <= 0 && i < 0) {
        const i = t(o.particle.options.bounce.vertical);
        o.particle.velocity.y *= -i;
        e = true
    }
    if (!e) return;
    const n = o.offset.y + o.size;
    o.bounds.bottom >= o.canvasSize.height ? o.particle.position.y = o.canvasSize.height - n : o.bounds.top <= 0 && (o.particle.position.y = n);
    "split" === o.outMode && o.particle.destroy()
}
class BounceOutMode {
    constructor(t) {
        this.container = t;
        this.modes = ["bounce", "bounce-vertical", "bounce-horizontal", "bounceVertical", "bounceHorizontal", "split"]
    }
    update(t, i, e, n) {
        if (!this.modes.includes(n)) return;
        const s = this.container;
        let a = false;
        for (const [, o] of s.plugins) {
            void 0 !== o.particleBounce && (a = o.particleBounce(t, e, i));
            if (a) break
        }
        if (a) return;
        const r = t.getPosition(),
            c = t.offset,
            d = t.getRadius(),
            u = o(r, d),
            l = s.canvas.size;
        bounceHorizontal({
            particle: t,
            outMode: n,
            direction: i,
            bounds: u,
            canvasSize: l,
            offset: c,
            size: d
        });
        bounceVertical({
            particle: t,
            outMode: n,
            direction: i,
            bounds: u,
            canvasSize: l,
            offset: c,
            size: d
        })
    }
}
class DestroyOutMode {
    constructor(t) {
        this.container = t;
        this.modes = ["destroy"]
    }
    update(t, o, s, a) {
        if (!this.modes.includes(a)) return;
        const r = this.container;
        switch (t.outType) {
            case "normal":
            case "outside":
                if (e(t.position, r.canvas.size, n.origin, t.getRadius(), o)) return;
                break;
            case "inside":
                {
                    const {
                        dx: o,
                        dy: e
                    } = i(t.position, t.moveCenter);
                    const {
                        x: n,
                        y: s
                    } = t.velocity;
                    if (n < 0 && o > t.moveCenter.radius || s < 0 && e > t.moveCenter.radius || n >= 0 && o < -t.moveCenter.radius || s >= 0 && e < -t.moveCenter.radius) return;
                    break
                }
        }
        r.particles.remove(t, void 0, true)
    }
}
class NoneOutMode {
    constructor(t) {
        this.container = t;
        this.modes = ["none"]
    }
    update(t, o, i, s) {
        if (!this.modes.includes(s)) return;
        if (t.options.move.distance.horizontal && ("left" === o || "right" === o) || t.options.move.distance.vertical && ("top" === o || "bottom" === o)) return;
        const a = t.options.move.gravity,
            r = this.container;
        const c = r.canvas.size;
        const d = t.getRadius();
        if (a.enable) {
            const i = t.position;
            (!a.inverse && i.y > c.height + d && "bottom" === o || a.inverse && i.y < -d && "top" === o) && r.particles.remove(t)
        } else {
            if (t.velocity.y > 0 && t.position.y <= c.height + d || t.velocity.y < 0 && t.position.y >= -d || t.velocity.x > 0 && t.position.x <= c.width + d || t.velocity.x < 0 && t.position.x >= -d) return;
            e(t.position, r.canvas.size, n.origin, d, o) || r.particles.remove(t)
        }
    }
}
class OutOutMode {
    constructor(t) {
        this.container = t;
        this.modes = ["out"]
    }
    update(t, r, c, d) {
        if (!this.modes.includes(d)) return;
        const u = this.container;
        switch (t.outType) {
            case "inside":
                {
                    const {
                        x: o,
                        y: e
                    } = t.velocity;
                    const s = n.origin;s.length = t.moveCenter.radius;s.angle = t.velocity.angle + Math.PI;s.addTo(n.create(t.moveCenter));
                    const {
                        dx: r,
                        dy: c
                    } = i(t.position, s);
                    if (o <= 0 && r >= 0 || e <= 0 && c >= 0 || o >= 0 && r <= 0 || e >= 0 && c <= 0) return;t.position.x = Math.floor(a({
                        min: 0,
                        max: u.canvas.size.width
                    }));t.position.y = Math.floor(a({
                        min: 0,
                        max: u.canvas.size.height
                    }));
                    const {
                        dx: d,
                        dy: l
                    } = i(t.position, t.moveCenter);t.direction = Math.atan2(-l, -d);t.velocity.angle = t.direction;
                    break
                }
            default:
                if (e(t.position, u.canvas.size, n.origin, t.getRadius(), r)) return;
                switch (t.outType) {
                    case "outside":
                        {
                            t.position.x = Math.floor(a({
                                min: -t.moveCenter.radius,
                                max: t.moveCenter.radius
                            })) + t.moveCenter.x;t.position.y = Math.floor(a({
                                min: -t.moveCenter.radius,
                                max: t.moveCenter.radius
                            })) + t.moveCenter.y;
                            const {
                                dx: o,
                                dy: e
                            } = i(t.position, t.moveCenter);
                            if (t.moveCenter.radius) {
                                t.direction = Math.atan2(e, o);
                                t.velocity.angle = t.direction
                            }
                            break
                        }
                    case "normal":
                        {
                            const i = t.options.move.warp,
                                e = u.canvas.size,
                                n = {
                                    bottom: e.height + t.getRadius() + t.offset.y,
                                    left: -t.getRadius() - t.offset.x,
                                    right: e.width + t.getRadius() + t.offset.x,
                                    top: -t.getRadius() - t.offset.y
                                },
                                a = t.getRadius(),
                                c = o(t.position, a);
                            if ("right" === r && c.left > e.width + t.offset.x) {
                                t.position.x = n.left;
                                t.initialPosition.x = t.position.x;
                                if (!i) {
                                    t.position.y = s() * e.height;
                                    t.initialPosition.y = t.position.y
                                }
                            } else if ("left" === r && c.right < -t.offset.x) {
                                t.position.x = n.right;
                                t.initialPosition.x = t.position.x;
                                if (!i) {
                                    t.position.y = s() * e.height;
                                    t.initialPosition.y = t.position.y
                                }
                            }
                            if ("bottom" === r && c.top > e.height + t.offset.y) {
                                if (!i) {
                                    t.position.x = s() * e.width;
                                    t.initialPosition.x = t.position.x
                                }
                                t.position.y = n.top;
                                t.initialPosition.y = t.position.y
                            } else if ("top" === r && c.bottom < -t.offset.y) {
                                if (!i) {
                                    t.position.x = s() * e.width;
                                    t.initialPosition.x = t.position.x
                                }
                                t.position.y = n.bottom;
                                t.initialPosition.y = t.position.y
                            }
                            break
                        }
                }
                break
        }
    }
}
class OutOfCanvasUpdater {
    constructor(t) {
        this.container = t;
        this.updaters = [new BounceOutMode(t), new DestroyOutMode(t), new OutOutMode(t), new NoneOutMode(t)]
    }
    init() {}
    isEnabled(t) {
        return !t.destroyed && !t.spawning
    }
    update(t, o) {
        var i, e, n, s;
        const a = t.options.move.outModes;
        this.updateOutMode(t, o, null !== (i = a.bottom) && void 0 !== i ? i : a.default, "bottom");
        this.updateOutMode(t, o, null !== (e = a.left) && void 0 !== e ? e : a.default, "left");
        this.updateOutMode(t, o, null !== (n = a.right) && void 0 !== n ? n : a.default, "right");
        this.updateOutMode(t, o, null !== (s = a.top) && void 0 !== s ? s : a.default, "top")
    }
    updateOutMode(t, o, i, e) {
        for (const n of this.updaters) n.update(t, e, o, i)
    }
}
async function loadOutModesUpdater(t) {
    await t.addParticleUpdater("outModes", (t => new OutOfCanvasUpdater(t)))
}
export {
    loadOutModesUpdater
};

//# sourceMappingURL=index.js.map