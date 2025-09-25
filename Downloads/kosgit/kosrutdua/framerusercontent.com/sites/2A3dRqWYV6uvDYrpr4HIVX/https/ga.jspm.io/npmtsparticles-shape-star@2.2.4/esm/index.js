class StarDrawer {
    draw(a, t, o) {
        var e;
        const i = t.shapeData,
            n = this.getSidesCount(t),
            d = null !== (e = null === i || void 0 === i ? void 0 : i.inset) && void 0 !== e ? e : 2;
        a.moveTo(0, 0 - o);
        for (let t = 0; t < n; t++) {
            a.rotate(Math.PI / n);
            a.lineTo(0, 0 - o * d);
            a.rotate(Math.PI / n);
            a.lineTo(0, 0 - o)
        }
    }
    getSidesCount(a) {
        var t, o;
        const e = a.shapeData;
        return null !== (o = null !== (t = null === e || void 0 === e ? void 0 : e.sides) && void 0 !== t ? t : null === e || void 0 === e ? void 0 : e.nb_sides) && void 0 !== o ? o : 5
    }
}
async function loadStarShape(a) {
    await a.addShape("star", new StarDrawer)
}
export {
    loadStarShape
};

//# sourceMappingURL=index.js.map