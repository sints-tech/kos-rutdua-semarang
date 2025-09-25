class CircleDrawer {
    draw(a, e, r) {
        a.arc(0, 0, r, 0, 2 * Math.PI, false)
    }
    getSidesCount() {
        return 12
    }
}
async function loadCircleShape(a) {
    await a.addShape("circle", new CircleDrawer)
}
export {
    loadCircleShape
};

//# sourceMappingURL=index.js.map