google.maps.__gjsload__('search_impl', function(_) {
    var vsb = function(a, b) {
            return _.vg(a, 1, b)
        },
        wsb = function(a, b) {
            return _.vg(a, 2, b)
        },
        ysb = function(a) {
            if (_.eq[15]) {
                var b = a.Ig;
                const c = a.Ig = a.getMap();
                b && a.Fg && (a.Hg ? (b = b.__gm.Ck, b.set(b.get().ho(a.Fg))) : a.Fg && _.oSa(a.Fg, b) && ((a.Gg || []).forEach(_.Am), a.Gg = null));
                if (c) {
                    b = new _.MA;
                    const d = a.get("layerId").split("|");
                    b.layerId = d[0];
                    for (let e = 1; e < d.length; ++e) {
                        const [f, ...g] = d[e].split(":");
                        b.parameters[f] = g.join(":")
                    }
                    a.get("spotlightDescription") && (b.spotlightDescription = _.gh(_.$z, _.KI(a.get("spotlightDescription"))));
                    a.get("paintExperimentIds") && (b.paintExperimentIds = a.get("paintExperimentIds").slice(0));
                    a.get("styler") && (b.styler = _.gh(_.Wz, _.KI(a.get("styler"))));
                    a.get("roadmapStyler") && (b.roadmapStyler = _.gh(_.Wz, _.KI(a.get("roadmapStyler"))));
                    a.get("travelMapRequest") && (b.travelMapRequest = _.gh(_.gD, _.KI(a.get("travelMapRequest"))));
                    a.get("mapsApiLayer") && (b.mapsApiLayer = _.gh(_.aA, _.KI(a.get("mapsApiLayer"))));
                    a.get("mapFeatures") && (b.mapFeatures = a.get("mapFeatures"));
                    a.get("clickableCities") && (b.clickableCities =
                        a.get("clickableCities"));
                    a.get("searchPipeMetadata") && (b.searchPipeMetadata = _.gh(_.NC, _.KI(a.get("searchPipeMetadata"))));
                    a.get("gmmContextPipeMetadata") && (b.gmmContextPipeMetadata = _.gh(_.RC, _.KI(a.get("gmmContextPipeMetadata"))));
                    a.get("overlayLayer") && (b.overlayLayer = _.gh(_.bA, _.KI(a.get("overlayLayer"))));
                    a.get("caseExperimentIds") && (b.caseExperimentIds = a.get("caseExperimentIds").slice(0));
                    a.get("boostMapExperimentIds") && (b.boostMapExperimentIds = a.get("boostMapExperimentIds").slice(0));
                    a.get("airQualityPipeMetadata") &&
                        (b.airQualityPipeMetadata = _.gh(_.fD, _.KI(a.get("airQualityPipeMetadata"))));
                    a.get("directionsPipeParameters") && (b.directionsPipeParameters = _.gh(_.eD, _.KI(a.get("directionsPipeParameters"))));
                    a.get("clientSignalPipeMetadata") && (b.clientSignalPipeMetadata = _.gh(_.wC, _.KI(a.get("clientSignalPipeMetadata"))));
                    b.darkLaunch = !!a.get("darkLaunch");
                    a.Fg = b;
                    a.Hg = a.get("renderOnBaseMap");
                    a.Hg ? (a = c.__gm.Ck, a.set(_.Zx(a.get(), b))) : xsb(a, c, b);
                    _.yn(c, "Lg");
                    _.N(c, 148282)
                }
            }
        },
        xsb = function(a, b, c) {
            var d = new zsb;
            d = _.IL(d);
            c.Hg = d.load.bind(d);
            c.clickable = a.get("clickable") !== !1;
            _.NRa(c, _.NS(b));
            b = [];
            b.push(_.ym(c, "click", Asb.bind(null, a)));
            for (const e of ["mouseover", "mouseout", "mousemove"]) b.push(_.ym(c, e, Bsb.bind(null, a, e)));
            b.push(_.ym(a, "clickable_changed", () => {
                a.Fg.clickable = a.get("clickable") !== !1
            }));
            a.Gg = b
        },
        Asb = function(a, b, c, d, e) {
            let f = null;
            if (e && (f = {
                    status: e.getStatus()
                }, e.getStatus() === 0)) {
                f.location = _.Bw(e, _.qC, 2) ? new _.im(_.Py(_.F(e, _.qC, 2)), _.Ry(_.F(e, _.qC, 2))) : null;
                const g = {};
                f.fields = g;
                const h = _.Tw(e,
                    _.TS, 3);
                for (let l = 0; l < h; ++l) {
                    const n = _.Sw(e, 3, _.TS, l);
                    g[n.getKey()] = n.getValue()
                }
            }
            _.O(a, "click", b, c, d, f)
        },
        Bsb = function(a, b, c, d, e, f, g) {
            let h = null;
            f && (h = {
                title: f[1].title,
                snippet: f[1].snippet
            });
            _.O(a, b, c, d, e, h, g)
        },
        Csb = class extends _.M {
            constructor(a) {
                super(a)
            }
            lk() {
                return _.G(this, 2)
            }
            zi(a) {
                return _.vg(this, 3, a)
            }
            Yj() {
                return _.Cw(this, 3)
            }
        },
        Dsb = _.Uh(Csb, [0, _.V, -2, _.Y, _.YSa]),
        Esb = class extends _.M {
            constructor(a) {
                super(a)
            }
            getStatus() {
                return _.fg(this, 1, -1)
            }
            getLocation() {
                return _.Uf(this, _.qC, 2)
            }
        },
        Fsb = class {},
        zsb = class {
            constructor() {
                var a = _.es,
                    b = _.bs;
                this.Fg = _.kk;
                this.fetch = _.oB.bind(Fsb, a, _.FD + "/maps/api/js/LayersService.GetFeature", b)
            }
            load(a, b) {
                function c(e) {
                    b(new Esb(e && e))
                }
                const d = wsb(vsb(new Csb, a.layerId.split("|")[0]), a.featureId).zi(this.Fg.Gg().Gg());
                for (const e in a.parameters) _.tRa(_.sf(d, 4, _.TS), e).setValue(a.parameters[e]);
                a = _.Hi(d, Dsb());
                this.fetch(a, c, c);
                return a
            }
            cancel() {
                throw Error("Not implemented");
            }
        };
    _.Ok("search_impl", new class {
        constructor() {
            this.Fg = ysb
        }
    });
});