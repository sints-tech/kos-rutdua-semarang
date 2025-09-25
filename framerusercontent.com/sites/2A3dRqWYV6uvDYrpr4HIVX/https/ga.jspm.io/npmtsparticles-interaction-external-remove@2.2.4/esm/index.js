import {
    ExternalInteractorBase as e
} from "tsparticles-engine";
class Remove {
    constructor() {
        this.quantity = 2
    }
    get particles_nb() {
        return this.quantity
    }
    set particles_nb(e) {
        this.quantity = e
    }
    load(e) {
        var t;
        if (!e) return;
        const r = null !== (t = e.quantity) && void 0 !== t ? t : e.particles_nb;
        void 0 !== r && (this.quantity = r)
    }
}
var t = (void 0, function(e, t, r, o, n) {
    if ("m" === o) throw new TypeError("Private method is not writable");
    if ("a" === o && !n) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof t ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === o ? n.call(e, r) : n ? n.value = r : t.set(e, r), r
});
var r = (void 0, function(e, t, r, o) {
    if ("a" === r && !o) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof t ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === r ? o : "a" === r ? o.call(e) : o ? o.value : t.get(e)
});
var o;
class Remover extends e {
    constructor(e) {
        super(e);
        o.set(this, void 0);
        t(this, o, e, "f");
        this.handleClickMode = e => {
            const t = r(this, o, "f"),
                n = t.actualOptions;
            if (!n.interactivity.modes.remove || "remove" !== e) return;
            const a = n.interactivity.modes.remove.quantity;
            t.particles.removeQuantity(a)
        }
    }
    clear() {}
    init() {}
    async interact() {}
    isEnabled() {
        return true
    }
    loadModeOptions(e, ...t) {
        e.remove || (e.remove = new Remove);
        for (const r of t) e.remove.load(null === r || void 0 === r ? void 0 : r.remove)
    }
    reset() {}
}
o = new WeakMap;

function loadExternalRemoveInteraction(e) {
    e.addInteractor("externalRemove", (e => new Remover(e)))
}
export {
    Remove,
    loadExternalRemoveInteraction
};

//# sourceMappingURL=index.js.map