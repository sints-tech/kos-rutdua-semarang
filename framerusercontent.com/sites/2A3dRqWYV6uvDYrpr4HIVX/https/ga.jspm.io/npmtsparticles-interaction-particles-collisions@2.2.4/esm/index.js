import {
    clamp as e,
    circleBounce as i,
    circleBounceDataFromParticle as s,
    ParticlesInteractorBase as o,
    getDistance as t
} from "tsparticles-engine";

function absorb(i, s, o, t) {
    if (void 0 === i.getRadius() && void 0 !== s.getRadius()) i.destroy();
    else if (void 0 !== i.getRadius() && void 0 === s.getRadius()) s.destroy();
    else if (void 0 !== i.getRadius() && void 0 !== s.getRadius())
        if (i.getRadius() >= s.getRadius()) {
            const a = e(i.getRadius() / s.getRadius(), 0, s.getRadius()) * o;
            i.size.value += a;
            s.size.value -= a;
            if (s.getRadius() <= t) {
                s.size.value = 0;
                s.destroy()
            }
        } else {
            const a = e(s.getRadius() / i.getRadius(), 0, i.getRadius()) * o;
            i.size.value -= a;
            s.size.value += a;
            if (i.getRadius() <= t) {
                i.size.value = 0;
                i.destroy()
            }
        }
}

function bounce(e, o) {
    i(s(e), s(o))
}

function destroy(e, i) {
    e.unbreakable || i.unbreakable || bounce(e, i);
    void 0 === e.getRadius() && void 0 !== i.getRadius() ? e.destroy() : void 0 !== e.getRadius() && void 0 === i.getRadius() ? i.destroy() : void 0 !== e.getRadius() && void 0 !== i.getRadius() && (e.getRadius() >= i.getRadius() ? i.destroy() : e.destroy())
}

function resolveCollision(e, i, s, o) {
    switch (e.options.collisions.mode) {
        case "absorb":
            absorb(e, i, s, o);
            break;
        case "bounce":
            bounce(e, i);
            break;
        case "destroy":
            destroy(e, i);
            break
    }
}
class Collider extends o {
    constructor(e) {
        super(e)
    }
    clear() {}
    init() {}
    async interact(e) {
        const i = this.container,
            s = e.getPosition(),
            o = e.getRadius(),
            a = i.particles.quadTree.queryCircle(s, 2 * o);
        for (const n of a) {
            if (e === n || !n.options.collisions.enable || e.options.collisions.mode !== n.options.collisions.mode || n.destroyed || n.spawning) continue;
            const a = n.getPosition();
            const d = n.getRadius();
            if (Math.abs(Math.round(s.z) - Math.round(a.z)) > o + d) continue;
            const r = t(s, a);
            const u = o + d;
            r > u || resolveCollision(e, n, i.fpsLimit / 1e3, i.retina.pixelRatio)
        }
    }
    isEnabled(e) {
        return e.options.collisions.enable
    }
    reset() {}
}
async function loadParticlesCollisionsInteraction(e) {
    await e.addInteractor("particlesCollisions", (e => new Collider(e)))
}
export {
    loadParticlesCollisionsInteraction
};

//# sourceMappingURL=index.js.map