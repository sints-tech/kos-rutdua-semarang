import {
    ParticlesInteractorBase as t,
    getDistances as e
} from "tsparticles-engine";
class Attractor extends t {
    constructor(t) {
        super(t)
    }
    clear() {}
    init() {}
    async interact(t) {
        var a;
        const r = this.container,
            o = null !== (a = t.retina.attractDistance) && void 0 !== a ? a : r.retina.attractDistance,
            i = t.getPosition(),
            n = r.particles.quadTree.queryCircle(i, o);
        for (const a of n) {
            if (t === a || !a.options.move.attract.enable || a.destroyed || a.spawning) continue;
            const r = a.getPosition(),
                {
                    dx: o,
                    dy: n
                } = e(i, r),
                c = t.options.move.attract.rotate,
                s = o / (1e3 * c.x),
                l = n / (1e3 * c.y),
                d = a.size.value / t.size.value,
                y = 1 / d;
            t.velocity.x -= s * d;
            t.velocity.y -= l * d;
            a.velocity.x += s * y;
            a.velocity.y += l * y
        }
    }
    isEnabled(t) {
        return t.options.move.attract.enable
    }
    reset() {}
}
async function loadParticlesAttractInteraction(t) {
    await t.addInteractor("particlesAttract", (t => new Attractor(t)))
}
export {
    loadParticlesAttractInteraction
};

//# sourceMappingURL=index.js.map