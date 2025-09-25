import {
    getDistances as i,
    getRandom as e,
    clamp as t,
    isInArray as n,
    getDistance as o,
    getRangeValue as a,
    getRangeMax as s
} from "tsparticles-engine";

function applyDistance(t) {
    const n = t.initialPosition,
        {
            dx: o,
            dy: a
        } = i(n, t.position),
        s = Math.abs(o),
        c = Math.abs(a),
        r = t.retina.maxDistance.horizontal,
        l = t.retina.maxDistance.vertical;
    if (r || l)
        if ((r && s >= r || l && c >= l) && !t.misplaced) {
            t.misplaced = !!r && s > r || !!l && c > l;
            r && (t.velocity.x = t.velocity.y / 2 - t.velocity.x);
            l && (t.velocity.y = t.velocity.x / 2 - t.velocity.y)
        } else if ((!r || s < r) && (!l || c < l) && t.misplaced) t.misplaced = false;
    else if (t.misplaced) {
        const i = t.position,
            o = t.velocity;
        r && (i.x < n.x && o.x < 0 || i.x > n.x && o.x > 0) && (o.x *= -e());
        l && (i.y < n.y && o.y < 0 || i.y > n.y && o.y > 0) && (o.y *= -e())
    }
}

function spin(i, e) {
    const t = i.container;
    if (!i.spin) return;
    const n = {
        x: "clockwise" === i.spin.direction ? Math.cos : Math.sin,
        y: "clockwise" === i.spin.direction ? Math.sin : Math.cos
    };
    i.position.x = i.spin.center.x + i.spin.radius * n.x(i.spin.angle);
    i.position.y = i.spin.center.y + i.spin.radius * n.y(i.spin.angle);
    i.spin.radius += i.spin.acceleration;
    const o = Math.max(t.canvas.size.width, t.canvas.size.height);
    if (i.spin.radius > o / 2) {
        i.spin.radius = o / 2;
        i.spin.acceleration *= -1
    } else if (i.spin.radius < 0) {
        i.spin.radius = 0;
        i.spin.acceleration *= -1
    }
    i.spin.angle += e / 100 * (1 - i.spin.radius / o)
}

function applyPath(i, e) {
    var n;
    const o = i.options;
    const a = o.move.path;
    const s = a.enable;
    if (!s) return;
    if (i.lastPathTime <= i.pathDelay) {
        i.lastPathTime += e.value;
        return
    }
    const c = null === (n = i.pathGenerator) || void 0 === n ? void 0 : n.generate(i);
    c && i.velocity.addTo(c);
    if (a.clamp) {
        i.velocity.x = t(i.velocity.x, -1, 1);
        i.velocity.y = t(i.velocity.y, -1, 1)
    }
    i.lastPathTime -= i.pathDelay
}

function getProximitySpeedFactor(i) {
    const e = i.container;
    const t = e.actualOptions;
    const a = n("slow", t.interactivity.events.onHover.mode);
    if (!a) return 1;
    const s = i.container.interactivity.mouse.position;
    if (!s) return 1;
    const c = i.getPosition();
    const r = o(s, c);
    const l = e.retina.slowModeRadius;
    if (r > l) return 1;
    const p = r / l || 0;
    const v = t.interactivity.modes.slow.factor;
    return p / v
}
class BaseMover {
    init(i) {
        var e;
        const t = i.container,
            n = i.options,
            s = n.move.gravity,
            c = n.move.spin;
        i.gravity = {
            enable: s.enable,
            acceleration: a(s.acceleration),
            inverse: s.inverse
        };
        if (c.enable) {
            const n = null !== (e = c.position) && void 0 !== e ? e : {
                x: 50,
                y: 50
            };
            const s = {
                x: n.x / 100 * t.canvas.size.width,
                y: n.y / 100 * t.canvas.size.height
            };
            const r = i.getPosition();
            const l = o(r, s);
            const p = a(c.acceleration);
            i.retina.spinAcceleration = p * t.retina.pixelRatio;
            i.spin = {
                center: s,
                direction: i.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
                angle: i.velocity.angle,
                radius: l,
                acceleration: i.retina.spinAcceleration
            }
        }
    }
    isEnabled(i) {
        return !i.destroyed && i.options.move.enable
    }
    move(i, e) {
        var t, n, o;
        var c, r;
        const l = i.options,
            p = l.move;
        if (!p.enable) return;
        const v = i.container,
            y = getProximitySpeedFactor(i),
            d = (null !== (t = (c = i.retina).moveSpeed) && void 0 !== t ? t : c.moveSpeed = a(p.speed) * v.retina.pixelRatio) * v.retina.reduceFactor,
            u = null !== (n = (r = i.retina).moveDrift) && void 0 !== n ? n : r.moveDrift = a(i.options.move.drift) * v.retina.pixelRatio,
            x = s(l.size.value) * v.retina.pixelRatio,
            m = p.size ? i.getRadius() / x : 1,
            f = m * y * (e.factor || 1),
            h = 2,
            g = d * f / h;
        applyPath(i, e);
        const M = i.gravity,
            b = (null === M || void 0 === M ? void 0 : M.enable) && M.inverse ? -1 : 1;
        (null === M || void 0 === M ? void 0 : M.enable) && g && (i.velocity.y += b * (M.acceleration * e.factor) / (60 * g));
        u && g && (i.velocity.x += u * e.factor / (60 * g));
        const w = i.moveDecay;
        1 != w && i.velocity.multTo(w);
        const P = i.velocity.mult(g),
            z = null !== (o = i.retina.maxSpeed) && void 0 !== o ? o : v.retina.maxSpeed;
        if ((null === M || void 0 === M ? void 0 : M.enable) && z > 0 && (!M.inverse && P.y >= 0 && P.y >= z || M.inverse && P.y <= 0 && P.y <= -z)) {
            P.y = b * z;
            g && (i.velocity.y = P.y / g)
        }
        const D = i.options.zIndex,
            R = (1 - i.zIndexFactor) ** D.velocityRate;
        if (p.spin.enable) spin(i, g);
        else {
            1 != R && P.multTo(R);
            i.position.addTo(P);
            if (p.vibrate) {
                i.position.x += Math.sin(i.position.x * Math.cos(i.position.y));
                i.position.y += Math.cos(i.position.y * Math.sin(i.position.x))
            }
        }
        applyDistance(i)
    }
}
async function loadBaseMover(i) {
    i.addMover("base", (() => new BaseMover))
}
export {
    loadBaseMover
};

//# sourceMappingURL=index.js.map