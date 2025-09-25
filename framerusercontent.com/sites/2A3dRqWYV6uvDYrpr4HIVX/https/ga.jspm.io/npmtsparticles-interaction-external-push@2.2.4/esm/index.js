import {
    ExternalInteractorBase as t,
    itemFromArray as e
} from "tsparticles-engine";
class Push {
    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4
    }
    get particles_nb() {
        return this.quantity
    }
    set particles_nb(t) {
        this.quantity = t
    }
    load(t) {
        var e;
        if (!t) return;
        void 0 !== t.default && (this.default = t.default);
        void 0 !== t.groups && (this.groups = t.groups.map((t => t)));
        this.groups.length || (this.default = true);
        const r = null !== (e = t.quantity) && void 0 !== e ? e : t.particles_nb;
        void 0 !== r && (this.quantity = r)
    }
}
var r = (void 0, function(t, e, r, i, s) {
    if ("m" === i) throw new TypeError("Private method is not writable");
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === i ? s.call(t, r) : s ? s.value = r : e.set(t, r), r
});
var i = (void 0, function(t, e, r, i) {
    if ("a" === r && !i) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !i : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === r ? i : "a" === r ? i.call(t) : i ? i.value : e.get(t)
});
var s;
class Pusher extends t {
    constructor(t) {
        super(t);
        s.set(this, void 0);
        r(this, s, t, "f");
        this.handleClickMode = t => {
            if ("push" !== t) return;
            const r = i(this, s, "f"),
                a = r.actualOptions,
                o = a.interactivity.modes.push;
            if (!o) return;
            const n = o.quantity;
            if (n <= 0) return;
            const u = e([void 0, ...o.groups]),
                c = void 0 !== u ? r.actualOptions.particles.groups[u] : void 0;
            r.particles.push(n, r.interactivity.mouse, c, u)
        }
    }
    clear() {}
    init() {}
    async interact() {}
    isEnabled() {
        return true
    }
    loadModeOptions(t, ...e) {
        t.push || (t.push = new Push);
        for (const r of e) t.push.load(null === r || void 0 === r ? void 0 : r.push)
    }
    reset() {}
}
s = new WeakMap;
async function loadExternalPushInteraction(t) {
    await t.addInteractor("externalPush", (t => new Pusher(t)))
}
export {
    Push,
    loadExternalPushInteraction
};

//# sourceMappingURL=index.js.map