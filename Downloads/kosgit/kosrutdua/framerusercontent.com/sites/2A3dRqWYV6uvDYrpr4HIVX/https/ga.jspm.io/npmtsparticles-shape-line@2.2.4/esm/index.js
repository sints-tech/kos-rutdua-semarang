class LineDrawer {
    draw(e, a, n) {
        e.moveTo(-n / 2, 0);
        e.lineTo(n / 2, 0)
    }
    getSidesCount() {
        return 1
    }
}
async function loadLineShape(e) {
    await e.addShape("line", new LineDrawer)
}
export {
    loadLineShape
};

//# sourceMappingURL=index.js.map