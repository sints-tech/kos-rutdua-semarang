google.maps.__gjsload__('overlay', function(_) {
    var Qua = function() {},
        AI = function(a) {
            a.EB = a.EB || new Qua;
            return a.EB
        },
        Rua = function(a) {
            this.Fg = new _.Pp(() => {
                const b = a.EB;
                if (a.getPanes()) {
                    if (a.getProjection()) {
                        if (!b.Hg && a.onAdd) a.onAdd();
                        b.Hg = !0;
                        a.draw()
                    }
                } else {
                    if (b.Hg)
                        if (a.onRemove) a.onRemove();
                        else a.remove();
                    b.Hg = !1
                }
            }, 0)
        },
        Tua = function(a, b) {
            const c = AI(a);
            let d = c.Gg;
            d || (d = c.Gg = new Rua(a));
            _.Rb(c.Fg || [], _.Am);
            var e = c.Ig = c.Ig || new _.Nla;
            const f = b.__gm;
            e.bindTo("zoom", f);
            e.bindTo("offset", f);
            e.bindTo("center", f, "projectionCenterQ");
            e.bindTo("projection",
                b);
            e.bindTo("projectionTopLeft", f);
            e = c.Kg = c.Kg || new Sua(e);
            e.bindTo("zoom", f);
            e.bindTo("offset", f);
            e.bindTo("projection", b);
            e.bindTo("projectionTopLeft", f);
            a.bindTo("projection", e, "outProjection");
            a.bindTo("panes", f);
            e = () => _.Qp(d.Fg);
            c.Fg = [_.ym(a, "panes_changed", e), _.ym(f, "zoom_changed", e), _.ym(f, "offset_changed", e), _.ym(b, "projection_changed", e), _.ym(f, "projectioncenterq_changed", e)];
            _.Qp(d.Fg);
            b instanceof _.fn ? (_.yn(b, "Ox"), _.N(b, 148440)) : b instanceof _.Yn && (_.yn(b, "Oxs"), _.N(b, 181451))
        },
        Uua = function(a) {
            const b =
                AI(a);
            var c = b.Ig;
            c && c.unbindAll();
            (c = b.Kg) && c.unbindAll();
            a.unbindAll();
            a.set("panes", null);
            a.set("projection", null);
            b.Fg && b.Fg.forEach(d => {
                _.Am(d)
            });
            b.Fg = null;
            b.Gg && (_.Rp(b.Gg.Fg), b.Gg = null)
        },
        Zua = function(a) {
            if (a) {
                var b = a.getMap();
                if (Vua(a) !== b && b && b instanceof _.fn) {
                    const c = b.__gm;
                    c.overlayLayer ? a.__gmop = new Wua(b, a, c.overlayLayer) : c.Gg.then(({
                        dh: d
                    }) => {
                        const e = new Xua(b, d);
                        d.Ri(e);
                        c.overlayLayer = e;
                        Yua(a);
                        Zua(a)
                    })
                }
            }
        },
        Yua = function(a) {
            if (a) {
                var b = a.__gmop;
                b && (a.__gmop = null, b.overlay.unbindAll(), b.overlay.set("panes",
                    null), b.overlay.set("projection", null), b.overlayLayer.fo(b), b.Fg && (b.Fg = !1, b.overlay.onRemove ? b.overlay.onRemove() : b.overlay.remove()))
            }
        },
        Vua = function(a) {
            return (a = a.__gmop) ? a.map : null
        },
        $ua = function(a, b) {
            a.overlay.get("projection") !== b && (a.overlay.bindTo("panes", a.map.__gm), a.overlay.set("projection", b))
        },
        Sua = class extends _.Qm {
            constructor(a) {
                super();
                this.projection = a
            }
            changed(a) {
                a !== "outProjection" && (a = !!(this.get("offset") && this.get("projectionTopLeft") && this.get("projection") && _.nl(this.get("zoom"))),
                    a === !this.get("outProjection") && this.set("outProjection", a ? this.projection : null))
            }
        };
    _.Oa(Rua, _.Qm);
    var Wua = class {
            constructor(a, b, c) {
                this.map = a;
                this.overlay = b;
                this.overlayLayer = c;
                this.Fg = !1;
                _.yn(this.map, "Ox");
                _.N(this.map, 148440);
                c.Gn(this)
            }
            draw() {
                this.Fg || (this.Fg = !0, this.overlay.onAdd && this.overlay.onAdd());
                this.overlay.draw && this.overlay.draw()
            }
        },
        Xua = class {
            constructor(a, b) {
                this.map = a;
                this.dh = b;
                this.Fg = null;
                this.Gg = []
            }
            dispose() {}
            Gh(a, b, c, d, e, f, g, h) {
                const l = this.Fg = this.Fg || new _.JD(this.map, this.dh, () => {});
                l.Gh(a, b, c, d, e, f, g, h);
                for (const n of this.Gg) $ua(n, l), n.draw()
            }
            Gn(a) {
                this.Gg.push(a);
                this.Fg &&
                    $ua(a, this.Fg);
                this.dh.refresh()
            }
            fo(a) {
                _.Vb(this.Gg, a)
            }
        };
    _.Ok("overlay", {
        FD: function(a) {
            if (a) {
                Uua(a);
                delete AI(a).Jg;
                Yua(a);
                var b = a.getMap();
                b && (b instanceof _.fn ? Zua(a) : a && (b = a.getMap(), (AI(a).Jg || null) !== b && (b && Tua(a, b), AI(a).Jg = b)))
            }
        },
        preventMapHitsFrom: a => {
            _.Vz(a, {
                Yl: ({
                    event: b
                }) => {
                    _.My(b.Fg)
                },
                Hk: b => {
                    _.Gz(b)
                },
                Oq: b => {
                    _.Hz(b)
                },
                El: b => {
                    _.Hz(b)
                },
                Sk: b => {
                    _.Iz(b)
                }
            }).cr(!0)
        },
        preventMapHitsAndGesturesFrom: a => {
            a.addEventListener("click", _.wm);
            a.addEventListener("contextmenu", _.wm);
            a.addEventListener("dblclick", _.wm);
            a.addEventListener("mousedown", _.wm);
            a.addEventListener("mousemove",
                _.wm);
            a.addEventListener("MSPointerDown", _.wm);
            a.addEventListener("pointerdown", _.wm);
            a.addEventListener("touchstart", _.wm);
            a.addEventListener("wheel", _.wm)
        }
    });
});