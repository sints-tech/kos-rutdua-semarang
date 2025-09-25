import {
    isSsr as a
} from "tsparticles-engine";
class ParallaxMover {
    init() {}
    isEnabled(e) {
        return !a() && !e.destroyed && e.container.actualOptions.interactivity.events.onHover.parallax.enable
    }
    move(e) {
        const t = e.container,
            n = t.actualOptions;
        if (a() || !n.interactivity.events.onHover.parallax.enable) return;
        const o = n.interactivity.events.onHover.parallax.force,
            r = t.interactivity.mouse.position;
        if (!r) return;
        const i = {
                x: t.canvas.size.width / 2,
                y: t.canvas.size.height / 2
            },
            s = n.interactivity.events.onHover.parallax.smooth,
            l = e.getRadius() / o,
            v = {
                x: (r.x - i.x) * l,
                y: (r.y - i.y) * l
            };
        e.offset.x += (v.x - e.offset.x) / s;
        e.offset.y += (v.y - e.offset.y) / s
    }
}
async function loadParallaxMover(a) {
    a.addMover("parallax", (() => new ParallaxMover))
}
export {
    loadParallaxMover
};

//# sourceMappingURL=index.js.map