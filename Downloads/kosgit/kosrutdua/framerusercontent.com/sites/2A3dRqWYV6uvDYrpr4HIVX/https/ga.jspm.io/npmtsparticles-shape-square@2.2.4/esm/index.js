const a = Math.sqrt(2);
class SquareDrawer {
    draw(e, r, t) {
        e.rect(-t / a, -t / a, 2 * t / a, 2 * t / a)
    }
    getSidesCount() {
        return 4
    }
}
async function loadSquareShape(a) {
    const e = new SquareDrawer;
    await a.addShape("edge", e);
    await a.addShape("square", e)
}
export {
    loadSquareShape
};

//# sourceMappingURL=index.js.map