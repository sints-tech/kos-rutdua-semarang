import {
    itemFromArray as t,
    isInArray as a,
    loadFont as e
} from "tsparticles-engine";
const o = ["text", "character", "char"];
class TextDrawer {
    draw(a, e, o, n) {
        var i, s, r;
        const l = e.shapeData;
        if (void 0 === l) return;
        const c = l.value;
        if (void 0 === c) return;
        const f = e;
        void 0 === f.text && (f.text = c instanceof Array ? t(c, e.randomIndexData) : c);
        const d = f.text,
            p = null !== (i = l.style) && void 0 !== i ? i : "",
            h = null !== (s = l.weight) && void 0 !== s ? s : "400",
            x = 2 * Math.round(o),
            u = null !== (r = l.font) && void 0 !== r ? r : "Verdana",
            w = e.fill,
            v = d.length * o / 2;
        a.font = `${p} ${h} ${x}px "${u}"`;
        const y = {
            x: -v,
            y: o / 2
        };
        a.globalAlpha = n;
        w ? a.fillText(d, y.x, y.y) : a.strokeText(d, y.x, y.y);
        a.globalAlpha = 1
    }
    getSidesCount() {
        return 12
    }
    async init(t) {
        const n = t.actualOptions;
        if (o.find((t => a(t, n.particles.shape.type)))) {
            const t = o.map((t => n.particles.shape.options[t])).find((t => !!t));
            if (t instanceof Array) {
                const a = [];
                for (const o of t) {
                    const t = o;
                    a.push(e(t.font, t.weight))
                }
                await Promise.allSettled(a)
            } else if (void 0 !== t) {
                const a = t;
                await e(a.font, a.weight)
            }
        }
    }
}
async function loadTextShape(t) {
    const a = new TextDrawer;
    for (const e of o) await t.addShape(e, a)
}
export {
    loadTextShape
};

//# sourceMappingURL=index.js.map