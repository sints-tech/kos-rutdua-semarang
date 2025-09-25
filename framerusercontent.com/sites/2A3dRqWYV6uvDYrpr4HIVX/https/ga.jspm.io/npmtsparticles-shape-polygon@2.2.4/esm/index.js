class PolygonDrawerBase {
    draw(e, n, o) {
        const a = this.getCenter(n, o);
        const t = this.getSidesData(n, o);
        const r = t.count.numerator * t.count.denominator;
        const l = t.count.numerator / t.count.denominator;
        const i = 180 * (l - 2) / l;
        const s = Math.PI - Math.PI * i / 180;
        if (e) {
            e.beginPath();
            e.translate(a.x, a.y);
            e.moveTo(0, 0);
            for (let n = 0; n < r; n++) {
                e.lineTo(t.length, 0);
                e.translate(t.length, 0);
                e.rotate(s)
            }
        }
    }
    getSidesCount(e) {
        var n, o;
        const a = e.shapeData;
        return null !== (o = null !== (n = null === a || void 0 === a ? void 0 : a.sides) && void 0 !== n ? n : null === a || void 0 === a ? void 0 : a.nb_sides) && void 0 !== o ? o : 5
    }
}
class PolygonDrawer extends PolygonDrawerBase {
    getCenter(e, n) {
        const o = this.getSidesCount(e);
        return {
            x: -n / (o / 3.5),
            y: -n / .76
        }
    }
    getSidesData(e, n) {
        var o, a;
        const t = e.shapeData;
        const r = null !== (a = null !== (o = null === t || void 0 === t ? void 0 : t.sides) && void 0 !== o ? o : null === t || void 0 === t ? void 0 : t.nb_sides) && void 0 !== a ? a : 5;
        return {
            count: {
                denominator: 1,
                numerator: r
            },
            length: 2.66 * n / (r / 3)
        }
    }
}
class TriangleDrawer extends PolygonDrawerBase {
    getCenter(e, n) {
        return {
            x: -n,
            y: n / 1.66
        }
    }
    getSidesCount() {
        return 3
    }
    getSidesData(e, n) {
        return {
            count: {
                denominator: 2,
                numerator: 3
            },
            length: 2 * n
        }
    }
}
async function loadGenericPolygonShape(e) {
    await e.addShape("polygon", new PolygonDrawer)
}
async function loadTriangleShape(e) {
    await e.addShape("triangle", new TriangleDrawer)
}
async function loadPolygonShape(e) {
    await loadGenericPolygonShape(e);
    await loadTriangleShape(e)
}
export {
    loadGenericPolygonShape,
    loadPolygonShape,
    loadTriangleShape
};

//# sourceMappingURL=index.js.map