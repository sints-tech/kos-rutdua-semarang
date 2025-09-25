const initPjs = o => {
    const particlesJS = (t, n) => o.load(t, n);
    particlesJS.load = (t, n, c) => {
        o.loadJSON(t, n).then((o => {
            o && c(o)
        })).catch((() => {
            c(void 0)
        }))
    };
    particlesJS.setOnClickHandler = t => {
        o.setOnClickHandler(t)
    };
    const t = o.dom();
    return {
        particlesJS: particlesJS,
        pJSDom: t
    }
};
export {
    initPjs
};

//# sourceMappingURL=index.js.map