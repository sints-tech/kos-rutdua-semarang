import {
    OptionsColor as t,
    stringToAlpha as e,
    deepExtend as i,
    rangeColorToRgb as n,
    getStyleFromRgb as o,
    getDistances as r,
    Vector as s,
    noPolygonFound as h,
    getRandom as a,
    noPolygonDataLoaded as S,
    itemFromArray as u,
    getDistance as c
} from "tsparticles-engine";
(function() {
    try {
        if ("undefined" === typeof window) return;
        if (!("SVGPathSeg" in window)) {
            window.SVGPathSeg = function(t, e, i) {
                this.pathSegType = t;
                this.pathSegTypeAsLetter = e;
                this._owningPathSegList = i
            };
            window.SVGPathSeg.prototype.classname = "SVGPathSeg";
            window.SVGPathSeg.PATHSEG_UNKNOWN = 0;
            window.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
            window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
            window.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
            window.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
            window.SVGPathSeg.PATHSEG_LINETO_REL = 5;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
            window.SVGPathSeg.PATHSEG_ARC_ABS = 10;
            window.SVGPathSeg.PATHSEG_ARC_REL = 11;
            window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
            window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
            window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
            window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
            window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
            window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
            window.SVGPathSeg.prototype._segmentChanged = function() {
                this._owningPathSegList && this._owningPathSegList.segmentChanged(this)
            };
            window.SVGPathSegClosePath = function(t) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", t)
            };
            window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegClosePath.prototype.toString = function() {
                return "[object SVGPathSegClosePath]"
            };
            window.SVGPathSegClosePath.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter
            };
            window.SVGPathSegClosePath.prototype.clone = function() {
                return new window.SVGPathSegClosePath(void 0)
            };
            window.SVGPathSegMovetoAbs = function(t, e, i) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", t);
                this._x = e;
                this._y = i
            };
            window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegMovetoAbs.prototype.toString = function() {
                return "[object SVGPathSegMovetoAbs]"
            };
            window.SVGPathSegMovetoAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            };
            window.SVGPathSegMovetoAbs.prototype.clone = function() {
                return new window.SVGPathSegMovetoAbs(void 0, this._x, this._y)
            };
            Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegMovetoRel = function(t, e, i) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", t);
                this._x = e;
                this._y = i
            };
            window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegMovetoRel.prototype.toString = function() {
                return "[object SVGPathSegMovetoRel]"
            };
            window.SVGPathSegMovetoRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            };
            window.SVGPathSegMovetoRel.prototype.clone = function() {
                return new window.SVGPathSegMovetoRel(void 0, this._x, this._y)
            };
            Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegLinetoAbs = function(t, e, i) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", t);
                this._x = e;
                this._y = i
            };
            window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoAbs.prototype.toString = function() {
                return "[object SVGPathSegLinetoAbs]"
            };
            window.SVGPathSegLinetoAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            };
            window.SVGPathSegLinetoAbs.prototype.clone = function() {
                return new window.SVGPathSegLinetoAbs(void 0, this._x, this._y)
            };
            Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegLinetoRel = function(t, e, i) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", t);
                this._x = e;
                this._y = i
            };
            window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoRel.prototype.toString = function() {
                return "[object SVGPathSegLinetoRel]"
            };
            window.SVGPathSegLinetoRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            };
            window.SVGPathSegLinetoRel.prototype.clone = function() {
                return new window.SVGPathSegLinetoRel(void 0, this._x, this._y)
            };
            Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoCubicAbs = function(t, e, i, n, o, r, s) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", t);
                this._x = e;
                this._y = i;
                this._x1 = n;
                this._y1 = o;
                this._x2 = r;
                this._y2 = s
            };
            window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicAbs.prototype.toString = function() {
                return "[object SVGPathSegCurvetoCubicAbs]"
            };
            window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoCubicAbs.prototype.clone = function() {
                return new window.SVGPathSegCurvetoCubicAbs(void 0, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(t) {
                    this._x1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(t) {
                    this._y1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
                get: function() {
                    return this._x2
                },
                set: function(t) {
                    this._x2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
                get: function() {
                    return this._y2
                },
                set: function(t) {
                    this._y2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoCubicRel = function(t, e, i, n, o, r, s) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", t);
                this._x = e;
                this._y = i;
                this._x1 = n;
                this._y1 = o;
                this._x2 = r;
                this._y2 = s
            };
            window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicRel.prototype.toString = function() {
                return "[object SVGPathSegCurvetoCubicRel]"
            };
            window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoCubicRel.prototype.clone = function() {
                return new window.SVGPathSegCurvetoCubicRel(void 0, this._x, this._y, this._x1, this._y1, this._x2, this._y2)
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(t) {
                    this._x1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(t) {
                    this._y1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
                get: function() {
                    return this._x2
                },
                set: function(t) {
                    this._x2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
                get: function() {
                    return this._y2
                },
                set: function(t) {
                    this._y2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoQuadraticAbs = function(t, e, i, n, o) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", t);
                this._x = e;
                this._y = i;
                this._x1 = n;
                this._y1 = o
            };
            window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() {
                return "[object SVGPathSegCurvetoQuadraticAbs]"
            };
            window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() {
                return new window.SVGPathSegCurvetoQuadraticAbs(void 0, this._x, this._y, this._x1, this._y1)
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(t) {
                    this._x1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(t) {
                    this._y1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoQuadraticRel = function(t, e, i, n, o) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", t);
                this._x = e;
                this._y = i;
                this._x1 = n;
                this._y1 = o
            };
            window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function() {
                return "[object SVGPathSegCurvetoQuadraticRel]"
            };
            window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function() {
                return new window.SVGPathSegCurvetoQuadraticRel(void 0, this._x, this._y, this._x1, this._y1)
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
                get: function() {
                    return this._x1
                },
                set: function(t) {
                    this._x1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
                get: function() {
                    return this._y1
                },
                set: function(t) {
                    this._y1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegArcAbs = function(t, e, i, n, o, r, s, h) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", t);
                this._x = e;
                this._y = i;
                this._r1 = n;
                this._r2 = o;
                this._angle = r;
                this._largeArcFlag = s;
                this._sweepFlag = h
            };
            window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegArcAbs.prototype.toString = function() {
                return "[object SVGPathSegArcAbs]"
            };
            window.SVGPathSegArcAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
            };
            window.SVGPathSegArcAbs.prototype.clone = function() {
                return new window.SVGPathSegArcAbs(void 0, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
            };
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
                get: function() {
                    return this._r1
                },
                set: function(t) {
                    this._r1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
                get: function() {
                    return this._r2
                },
                set: function(t) {
                    this._r2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
                get: function() {
                    return this._angle
                },
                set: function(t) {
                    this._angle = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
                get: function() {
                    return this._largeArcFlag
                },
                set: function(t) {
                    this._largeArcFlag = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
                get: function() {
                    return this._sweepFlag
                },
                set: function(t) {
                    this._sweepFlag = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegArcRel = function(t, e, i, n, o, r, s, h) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", t);
                this._x = e;
                this._y = i;
                this._r1 = n;
                this._r2 = o;
                this._angle = r;
                this._largeArcFlag = s;
                this._sweepFlag = h
            };
            window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegArcRel.prototype.toString = function() {
                return "[object SVGPathSegArcRel]"
            };
            window.SVGPathSegArcRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y
            };
            window.SVGPathSegArcRel.prototype.clone = function() {
                return new window.SVGPathSegArcRel(void 0, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag)
            };
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
                get: function() {
                    return this._r1
                },
                set: function(t) {
                    this._r1 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
                get: function() {
                    return this._r2
                },
                set: function(t) {
                    this._r2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
                get: function() {
                    return this._angle
                },
                set: function(t) {
                    this._angle = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
                get: function() {
                    return this._largeArcFlag
                },
                set: function(t) {
                    this._largeArcFlag = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
                get: function() {
                    return this._sweepFlag
                },
                set: function(t) {
                    this._sweepFlag = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegLinetoHorizontalAbs = function(t, e) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", t);
                this._x = e
            };
            window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function() {
                return "[object SVGPathSegLinetoHorizontalAbs]"
            };
            window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x
            };
            window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function() {
                return new window.SVGPathSegLinetoHorizontalAbs(void 0, this._x)
            };
            Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegLinetoHorizontalRel = function(t, e) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", t);
                this._x = e
            };
            window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoHorizontalRel.prototype.toString = function() {
                return "[object SVGPathSegLinetoHorizontalRel]"
            };
            window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x
            };
            window.SVGPathSegLinetoHorizontalRel.prototype.clone = function() {
                return new window.SVGPathSegLinetoHorizontalRel(void 0, this._x)
            };
            Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegLinetoVerticalAbs = function(t, e) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", t);
                this._y = e
            };
            window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoVerticalAbs.prototype.toString = function() {
                return "[object SVGPathSegLinetoVerticalAbs]"
            };
            window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._y
            };
            window.SVGPathSegLinetoVerticalAbs.prototype.clone = function() {
                return new window.SVGPathSegLinetoVerticalAbs(void 0, this._y)
            };
            Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegLinetoVerticalRel = function(t, e) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", t);
                this._y = e
            };
            window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegLinetoVerticalRel.prototype.toString = function() {
                return "[object SVGPathSegLinetoVerticalRel]"
            };
            window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._y
            };
            window.SVGPathSegLinetoVerticalRel.prototype.clone = function() {
                return new window.SVGPathSegLinetoVerticalRel(void 0, this._y)
            };
            Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoCubicSmoothAbs = function(t, e, i, n, o) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", t);
                this._x = e;
                this._y = i;
                this._x2 = n;
                this._y2 = o
            };
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() {
                return "[object SVGPathSegCurvetoCubicSmoothAbs]"
            };
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() {
                return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, this._x, this._y, this._x2, this._y2)
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
                get: function() {
                    return this._x2
                },
                set: function(t) {
                    this._x2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
                get: function() {
                    return this._y2
                },
                set: function(t) {
                    this._y2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoCubicSmoothRel = function(t, e, i, n, o) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", t);
                this._x = e;
                this._y = i;
                this._x2 = n;
                this._y2 = o
            };
            window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() {
                return "[object SVGPathSegCurvetoCubicSmoothRel]"
            };
            window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() {
                return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, this._x, this._y, this._x2, this._y2)
            };
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
                get: function() {
                    return this._x2
                },
                set: function(t) {
                    this._x2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
                get: function() {
                    return this._y2
                },
                set: function(t) {
                    this._y2 = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoQuadraticSmoothAbs = function(t, e, i) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", t);
                this._x = e;
                this._y = i
            };
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() {
                return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"
            };
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() {
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, this._x, this._y)
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathSegCurvetoQuadraticSmoothRel = function(t, e, i) {
                window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", t);
                this._x = e;
                this._y = i
            };
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() {
                return "[object SVGPathSegCurvetoQuadraticSmoothRel]"
            };
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() {
                return this.pathSegTypeAsLetter + " " + this._x + " " + this._y
            };
            window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() {
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, this._x, this._y)
            };
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
                get: function() {
                    return this._x
                },
                set: function(t) {
                    this._x = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
                get: function() {
                    return this._y
                },
                set: function(t) {
                    this._y = t;
                    this._segmentChanged()
                },
                enumerable: true
            });
            window.SVGPathElement.prototype.createSVGPathSegClosePath = function() {
                return new window.SVGPathSegClosePath(void 0)
            };
            window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(t, e) {
                return new window.SVGPathSegMovetoAbs(void 0, t, e)
            };
            window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function(t, e) {
                return new window.SVGPathSegMovetoRel(void 0, t, e)
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(t, e) {
                return new window.SVGPathSegLinetoAbs(void 0, t, e)
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function(t, e) {
                return new window.SVGPathSegLinetoRel(void 0, t, e)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(t, e, i, n, o, r) {
                return new window.SVGPathSegCurvetoCubicAbs(void 0, t, e, i, n, o, r)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(t, e, i, n, o, r) {
                return new window.SVGPathSegCurvetoCubicRel(void 0, t, e, i, n, o, r)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(t, e, i, n) {
                return new window.SVGPathSegCurvetoQuadraticAbs(void 0, t, e, i, n)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(t, e, i, n) {
                return new window.SVGPathSegCurvetoQuadraticRel(void 0, t, e, i, n)
            };
            window.SVGPathElement.prototype.createSVGPathSegArcAbs = function(t, e, i, n, o, r, s) {
                return new window.SVGPathSegArcAbs(void 0, t, e, i, n, o, r, s)
            };
            window.SVGPathElement.prototype.createSVGPathSegArcRel = function(t, e, i, n, o, r, s) {
                return new window.SVGPathSegArcRel(void 0, t, e, i, n, o, r, s)
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(t) {
                return new window.SVGPathSegLinetoHorizontalAbs(void 0, t)
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(t) {
                return new window.SVGPathSegLinetoHorizontalRel(void 0, t)
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(t) {
                return new window.SVGPathSegLinetoVerticalAbs(void 0, t)
            };
            window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(t) {
                return new window.SVGPathSegLinetoVerticalRel(void 0, t)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(t, e, i, n) {
                return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, t, e, i, n)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(t, e, i, n) {
                return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, t, e, i, n)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(t, e) {
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, t, e)
            };
            window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(t, e) {
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, t, e)
            };
            "getPathSegAtLength" in window.SVGPathElement.prototype || (window.SVGPathElement.prototype.getPathSegAtLength = function(t) {
                if (void 0 === t || !isFinite(t)) throw "Invalid arguments.";
                const e = document.createElementNS("http://www.w3.org/2000/svg", "path");
                e.setAttribute("d", this.getAttribute("d"));
                let i = e.pathSegList.numberOfItems - 1;
                if (i <= 0) return 0;
                do {
                    e.pathSegList.removeItem(i);
                    if (t > e.getTotalLength()) break;
                    i--
                } while (i > 0);
                return i
            })
        }
        if (!("SVGPathSegList" in window) || !("appendItem" in window.SVGPathSegList.prototype)) {
            window.SVGPathSegList = function(t) {
                this._pathElement = t;
                this._list = this._parsePath(this._pathElement.getAttribute("d"));
                this._mutationObserverConfig = {
                    attributes: true,
                    attributeFilter: ["d"]
                };
                this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
                this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
            };
            window.SVGPathSegList.prototype.classname = "SVGPathSegList";
            Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
                get: function() {
                    this._checkPathSynchronizedToList();
                    return this._list.length
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathSegList.prototype, "length", {
                get: function() {
                    this._checkPathSynchronizedToList();
                    return this._list.length
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
                get: function() {
                    this._pathSegList || (this._pathSegList = new window.SVGPathSegList(this));
                    return this._pathSegList
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
                get: function() {
                    return this.pathSegList
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
                get: function() {
                    return this.pathSegList
                },
                enumerable: true
            });
            Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
                get: function() {
                    return this.pathSegList
                },
                enumerable: true
            });
            window.SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
                this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords())
            };
            window.SVGPathSegList.prototype._updateListFromPathMutations = function(t) {
                if (!this._pathElement) return;
                let e = false;
                t.forEach((function(t) {
                    "d" == t.attributeName && (e = true)
                }));
                e && (this._list = this._parsePath(this._pathElement.getAttribute("d")))
            };
            window.SVGPathSegList.prototype._writeListToPath = function() {
                this._pathElementMutationObserver.disconnect();
                this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
                this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig)
            };
            window.SVGPathSegList.prototype.segmentChanged = function(t) {
                this._writeListToPath()
            };
            window.SVGPathSegList.prototype.clear = function() {
                this._checkPathSynchronizedToList();
                this._list.forEach((function(t) {
                    t._owningPathSegList = null
                }));
                this._list = [];
                this._writeListToPath()
            };
            window.SVGPathSegList.prototype.initialize = function(t) {
                this._checkPathSynchronizedToList();
                this._list = [t];
                t._owningPathSegList = this;
                this._writeListToPath();
                return t
            };
            window.SVGPathSegList.prototype._checkValidIndex = function(t) {
                if (isNaN(t) || t < 0 || t >= this.numberOfItems) throw "INDEX_SIZE_ERR"
            };
            window.SVGPathSegList.prototype.getItem = function(t) {
                this._checkPathSynchronizedToList();
                this._checkValidIndex(t);
                return this._list[t]
            };
            window.SVGPathSegList.prototype.insertItemBefore = function(t, e) {
                this._checkPathSynchronizedToList();
                e > this.numberOfItems && (e = this.numberOfItems);
                t._owningPathSegList && (t = t.clone());
                this._list.splice(e, 0, t);
                t._owningPathSegList = this;
                this._writeListToPath();
                return t
            };
            window.SVGPathSegList.prototype.replaceItem = function(t, e) {
                this._checkPathSynchronizedToList();
                t._owningPathSegList && (t = t.clone());
                this._checkValidIndex(e);
                this._list[e] = t;
                t._owningPathSegList = this;
                this._writeListToPath();
                return t
            };
            window.SVGPathSegList.prototype.removeItem = function(t) {
                this._checkPathSynchronizedToList();
                this._checkValidIndex(t);
                const e = this._list[t];
                this._list.splice(t, 1);
                this._writeListToPath();
                return e
            };
            window.SVGPathSegList.prototype.appendItem = function(t) {
                this._checkPathSynchronizedToList();
                t._owningPathSegList && (t = t.clone());
                this._list.push(t);
                t._owningPathSegList = this;
                this._writeListToPath();
                return t
            };
            window.SVGPathSegList._pathSegArrayAsString = function(t) {
                let e = "";
                let i = true;
                t.forEach((function(t) {
                    if (i) {
                        i = false;
                        e += t._asPathString()
                    } else e += " " + t._asPathString()
                }));
                return e
            };
            window.SVGPathSegList.prototype._parsePath = function(t) {
                if (!t || 0 == t.length) return [];
                const e = this;
                const Builder = function() {
                    this.pathSegList = []
                };
                Builder.prototype.appendSegment = function(t) {
                    this.pathSegList.push(t)
                };
                const Source = function(t) {
                    this._string = t;
                    this._currentIndex = 0;
                    this._endIndex = this._string.length;
                    this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;
                    this._skipOptionalSpaces()
                };
                Source.prototype._isCurrentSpace = function() {
                    const t = this._string[this._currentIndex];
                    return t <= " " && (" " == t || "\n" == t || "\t" == t || "\r" == t || "\f" == t)
                };
                Source.prototype._skipOptionalSpaces = function() {
                    while (this._currentIndex < this._endIndex && this._isCurrentSpace()) this._currentIndex++;
                    return this._currentIndex < this._endIndex
                };
                Source.prototype._skipOptionalSpacesOrDelimiter = function() {
                    if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && "," != this._string.charAt(this._currentIndex)) return false;
                    if (this._skipOptionalSpaces() && this._currentIndex < this._endIndex && "," == this._string.charAt(this._currentIndex)) {
                        this._currentIndex++;
                        this._skipOptionalSpaces()
                    }
                    return this._currentIndex < this._endIndex
                };
                Source.prototype.hasMoreData = function() {
                    return this._currentIndex < this._endIndex
                };
                Source.prototype.peekSegmentType = function() {
                    const t = this._string[this._currentIndex];
                    return this._pathSegTypeFromChar(t)
                };
                Source.prototype._pathSegTypeFromChar = function(t) {
                    switch (t) {
                        case "Z":
                        case "z":
                            return window.SVGPathSeg.PATHSEG_CLOSEPATH;
                        case "M":
                            return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
                        case "m":
                            return window.SVGPathSeg.PATHSEG_MOVETO_REL;
                        case "L":
                            return window.SVGPathSeg.PATHSEG_LINETO_ABS;
                        case "l":
                            return window.SVGPathSeg.PATHSEG_LINETO_REL;
                        case "C":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
                        case "c":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
                        case "Q":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
                        case "q":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
                        case "A":
                            return window.SVGPathSeg.PATHSEG_ARC_ABS;
                        case "a":
                            return window.SVGPathSeg.PATHSEG_ARC_REL;
                        case "H":
                            return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
                        case "h":
                            return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
                        case "V":
                            return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
                        case "v":
                            return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
                        case "S":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
                        case "s":
                            return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
                        case "T":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
                        case "t":
                            return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
                        default:
                            return window.SVGPathSeg.PATHSEG_UNKNOWN
                    }
                };
                Source.prototype._nextCommandHelper = function(t, e) {
                    return ("+" == t || "-" == t || "." == t || t >= "0" && t <= "9") && e != window.SVGPathSeg.PATHSEG_CLOSEPATH ? e == window.SVGPathSeg.PATHSEG_MOVETO_ABS ? window.SVGPathSeg.PATHSEG_LINETO_ABS : e == window.SVGPathSeg.PATHSEG_MOVETO_REL ? window.SVGPathSeg.PATHSEG_LINETO_REL : e : window.SVGPathSeg.PATHSEG_UNKNOWN
                };
                Source.prototype.initialCommandIsMoveTo = function() {
                    if (!this.hasMoreData()) return true;
                    const t = this.peekSegmentType();
                    return t == window.SVGPathSeg.PATHSEG_MOVETO_ABS || t == window.SVGPathSeg.PATHSEG_MOVETO_REL
                };
                Source.prototype._parseNumber = function() {
                    let t = 0;
                    let e = 0;
                    let i = 1;
                    let n = 0;
                    let o = 1;
                    let r = 1;
                    const s = this._currentIndex;
                    this._skipOptionalSpaces();
                    if (this._currentIndex < this._endIndex && "+" == this._string.charAt(this._currentIndex)) this._currentIndex++;
                    else if (this._currentIndex < this._endIndex && "-" == this._string.charAt(this._currentIndex)) {
                        this._currentIndex++;
                        o = -1
                    }
                    if (this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && "." != this._string.charAt(this._currentIndex)) return;
                    const h = this._currentIndex;
                    while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") this._currentIndex++;
                    if (this._currentIndex != h) {
                        let t = this._currentIndex - 1;
                        let i = 1;
                        while (t >= h) {
                            e += i * (this._string.charAt(t--) - "0");
                            i *= 10
                        }
                    }
                    if (this._currentIndex < this._endIndex && "." == this._string.charAt(this._currentIndex)) {
                        this._currentIndex++;
                        if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return;
                        while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                            i *= 10;
                            n += (this._string.charAt(this._currentIndex) - "0") / i;
                            this._currentIndex += 1
                        }
                    }
                    if (this._currentIndex != s && this._currentIndex + 1 < this._endIndex && ("e" == this._string.charAt(this._currentIndex) || "E" == this._string.charAt(this._currentIndex)) && "x" != this._string.charAt(this._currentIndex + 1) && "m" != this._string.charAt(this._currentIndex + 1)) {
                        this._currentIndex++;
                        if ("+" == this._string.charAt(this._currentIndex)) this._currentIndex++;
                        else if ("-" == this._string.charAt(this._currentIndex)) {
                            this._currentIndex++;
                            r = -1
                        }
                        if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") return;
                        while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                            t *= 10;
                            t += this._string.charAt(this._currentIndex) - "0";
                            this._currentIndex++
                        }
                    }
                    let a = e + n;
                    a *= o;
                    t && (a *= Math.pow(10, r * t));
                    if (s != this._currentIndex) {
                        this._skipOptionalSpacesOrDelimiter();
                        return a
                    }
                };
                Source.prototype._parseArcFlag = function() {
                    if (this._currentIndex >= this._endIndex) return;
                    let t = false;
                    const e = this._string.charAt(this._currentIndex++);
                    if ("0" == e) t = false;
                    else {
                        if ("1" != e) return;
                        t = true
                    }
                    this._skipOptionalSpacesOrDelimiter();
                    return t
                };
                Source.prototype.parseSegment = function() {
                    const t = this._string[this._currentIndex];
                    let i = this._pathSegTypeFromChar(t);
                    if (i == window.SVGPathSeg.PATHSEG_UNKNOWN) {
                        if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN) return null;
                        i = this._nextCommandHelper(t, this._previousCommand);
                        if (i == window.SVGPathSeg.PATHSEG_UNKNOWN) return null
                    } else this._currentIndex++;
                    this._previousCommand = i;
                    let n;
                    switch (i) {
                        case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                            return new window.SVGPathSegMovetoRel(e, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                            return new window.SVGPathSegMovetoAbs(e, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_REL:
                            return new window.SVGPathSegLinetoRel(e, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                            return new window.SVGPathSegLinetoAbs(e, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                            return new window.SVGPathSegLinetoHorizontalRel(e, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                            return new window.SVGPathSegLinetoHorizontalAbs(e, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                            return new window.SVGPathSegLinetoVerticalRel(e, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                            return new window.SVGPathSegLinetoVerticalAbs(e, this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                            this._skipOptionalSpaces();
                            return new window.SVGPathSegClosePath(e);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                            n = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegCurvetoCubicRel(e, n.x, n.y, n.x1, n.y1, n.x2, n.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                            n = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegCurvetoCubicAbs(e, n.x, n.y, n.x1, n.y1, n.x2, n.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                            n = {
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegCurvetoCubicSmoothRel(e, n.x, n.y, n.x2, n.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                            n = {
                                x2: this._parseNumber(),
                                y2: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegCurvetoCubicSmoothAbs(e, n.x, n.y, n.x2, n.y2);
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                            n = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegCurvetoQuadraticRel(e, n.x, n.y, n.x1, n.y1);
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                            n = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegCurvetoQuadraticAbs(e, n.x, n.y, n.x1, n.y1);
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                            return new window.SVGPathSegCurvetoQuadraticSmoothRel(e, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                            return new window.SVGPathSegCurvetoQuadraticSmoothAbs(e, this._parseNumber(), this._parseNumber());
                        case window.SVGPathSeg.PATHSEG_ARC_REL:
                            n = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                arcAngle: this._parseNumber(),
                                arcLarge: this._parseArcFlag(),
                                arcSweep: this._parseArcFlag(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegArcRel(e, n.x, n.y, n.x1, n.y1, n.arcAngle, n.arcLarge, n.arcSweep);
                        case window.SVGPathSeg.PATHSEG_ARC_ABS:
                            n = {
                                x1: this._parseNumber(),
                                y1: this._parseNumber(),
                                arcAngle: this._parseNumber(),
                                arcLarge: this._parseArcFlag(),
                                arcSweep: this._parseArcFlag(),
                                x: this._parseNumber(),
                                y: this._parseNumber()
                            };
                            return new window.SVGPathSegArcAbs(e, n.x, n.y, n.x1, n.y1, n.arcAngle, n.arcLarge, n.arcSweep);
                        default:
                            throw "Unknown path seg type."
                    }
                };
                const i = new Builder;
                const n = new Source(t);
                if (!n.initialCommandIsMoveTo()) return [];
                while (n.hasMoreData()) {
                    const t = n.parseSegment();
                    if (!t) return [];
                    i.appendSegment(t)
                }
                return i.pathSegList
            }
        }
    } catch (t) {
        console.warn("An error occurred in tsParticles pathseg polyfill. If the Polygon Mask is not working, please open an issue here: https://github.com/matteobruni/tsparticles", t)
    }
})();
class PolygonMaskDrawStroke {
    constructor() {
        this.color = new t;
        this.width = .5;
        this.opacity = 1
    }
    load(i) {
        var n;
        if (i) {
            this.color = t.create(this.color, i.color);
            "string" === typeof this.color.value && (this.opacity = null !== (n = e(this.color.value)) && void 0 !== n ? n : this.opacity);
            void 0 !== i.opacity && (this.opacity = i.opacity);
            void 0 !== i.width && (this.width = i.width)
        }
    }
}
class PolygonMaskDraw {
    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke
    }
    get lineColor() {
        return this.stroke.color
    }
    set lineColor(e) {
        this.stroke.color = t.create(this.stroke.color, e)
    }
    get lineWidth() {
        return this.stroke.width
    }
    set lineWidth(t) {
        this.stroke.width = t
    }
    load(t) {
        var e;
        if (!t) return;
        void 0 !== t.enable && (this.enable = t.enable);
        const i = null !== (e = t.stroke) && void 0 !== e ? e : {
            color: t.lineColor,
            width: t.lineWidth
        };
        this.stroke.load(i)
    }
}
class PolygonMaskInline {
    constructor() {
        this.arrangement = "one-per-point"
    }
    load(t) {
        t && void 0 !== t.arrangement && (this.arrangement = t.arrangement)
    }
}
class PolygonMaskLocalSvg {
    constructor() {
        this.path = [];
        this.size = {
            height: 0,
            width: 0
        }
    }
    load(t) {
        if (t) {
            void 0 !== t.path && (this.path = t.path);
            if (void 0 !== t.size) {
                void 0 !== t.size.width && (this.size.width = t.size.width);
                void 0 !== t.size.height && (this.size.height = t.size.height)
            }
        }
    }
}
class PolygonMaskMove {
    constructor() {
        this.radius = 10;
        this.type = "path"
    }
    load(t) {
        if (t) {
            void 0 !== t.radius && (this.radius = t.radius);
            void 0 !== t.type && (this.type = t.type)
        }
    }
}
class PolygonMask {
    constructor() {
        this.draw = new PolygonMaskDraw;
        this.enable = false;
        this.inline = new PolygonMaskInline;
        this.move = new PolygonMaskMove;
        this.scale = 1;
        this.type = "none"
    }
    get inlineArrangement() {
        return this.inline.arrangement
    }
    set inlineArrangement(t) {
        this.inline.arrangement = t
    }
    load(t) {
        if (t) {
            this.draw.load(t.draw);
            this.inline.load(t.inline);
            this.move.load(t.move);
            void 0 !== t.scale && (this.scale = t.scale);
            void 0 !== t.type && (this.type = t.type);
            void 0 !== t.enable ? this.enable = t.enable : this.enable = "none" !== this.type;
            void 0 !== t.url && (this.url = t.url);
            if (void 0 !== t.data)
                if ("string" === typeof t.data) this.data = t.data;
                else {
                    this.data = new PolygonMaskLocalSvg;
                    this.data.load(t.data)
                }
            void 0 !== t.position && (this.position = i({}, t.position))
        }
    }
}

function drawPolygonMask(t, e, i) {
    const r = n(i.color);
    if (r) {
        t.beginPath();
        t.moveTo(e[0].x, e[0].y);
        for (const i of e) t.lineTo(i.x, i.y);
        t.closePath();
        t.strokeStyle = o(r);
        t.lineWidth = i.width;
        t.stroke()
    }
}

function drawPolygonMaskPath(t, e, i, r) {
    t.translate(r.x, r.y);
    const s = n(i.color);
    if (s) {
        t.strokeStyle = o(s, i.opacity);
        t.lineWidth = i.width;
        t.stroke(e)
    }
}

function parsePaths(t, e, i) {
    var n;
    const o = [];
    for (const r of t) {
        const t = r.element.pathSegList,
            s = null !== (n = null === t || void 0 === t ? void 0 : t.numberOfItems) && void 0 !== n ? n : 0,
            h = {
                x: 0,
                y: 0
            };
        for (let n = 0; n < s; n++) {
            const r = null === t || void 0 === t ? void 0 : t.getItem(n);
            const s = window.SVGPathSeg;
            switch (null === r || void 0 === r ? void 0 : r.pathSegType) {
                case s.PATHSEG_MOVETO_ABS:
                case s.PATHSEG_LINETO_ABS:
                case s.PATHSEG_CURVETO_CUBIC_ABS:
                case s.PATHSEG_CURVETO_QUADRATIC_ABS:
                case s.PATHSEG_ARC_ABS:
                case s.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case s.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                    {
                        const t = r;h.x = t.x;h.y = t.y;
                        break
                    }
                case s.PATHSEG_LINETO_HORIZONTAL_ABS:
                    h.x = r.x;
                    break;
                case s.PATHSEG_LINETO_VERTICAL_ABS:
                    h.y = r.y;
                    break;
                case s.PATHSEG_LINETO_REL:
                case s.PATHSEG_MOVETO_REL:
                case s.PATHSEG_CURVETO_CUBIC_REL:
                case s.PATHSEG_CURVETO_QUADRATIC_REL:
                case s.PATHSEG_ARC_REL:
                case s.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case s.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                    {
                        const t = r;h.x += t.x;h.y += t.y;
                        break
                    }
                case s.PATHSEG_LINETO_HORIZONTAL_REL:
                    h.x += r.x;
                    break;
                case s.PATHSEG_LINETO_VERTICAL_REL:
                    h.y += r.y;
                    break;
                case s.PATHSEG_UNKNOWN:
                case s.PATHSEG_CLOSEPATH:
                    continue
            }
            o.push({
                x: h.x * e + i.x,
                y: h.y * e + i.y
            })
        }
    }
    return o
}

function calcClosestPtOnSegment(t, e, i) {
    const {
        dx: n,
        dy: o
    } = r(i, t), {
        dx: s,
        dy: h
    } = r(e, t), a = (n * s + o * h) / (s ** 2 + h ** 2), S = {
        x: t.x + s * a,
        y: t.x + h * a,
        isOnSegment: a >= 0 && a <= 1
    };
    if (a < 0) {
        S.x = t.x;
        S.y = t.y
    } else if (a > 1) {
        S.x = e.x;
        S.y = e.y
    }
    return S
}

function segmentBounce(t, e, i) {
    const {
        dx: n,
        dy: o
    } = r(t, e), h = Math.atan2(o, n), a = s.create(Math.sin(h), -Math.cos(h)), S = 2 * (i.x * a.x + i.y * a.y);
    a.multTo(S);
    i.subFrom(a)
}
var w = (void 0, function(t, e, i, n, o) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === n ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var d = (void 0, function(t, e, i, n) {
    if ("a" === i && !n) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? n : "a" === i ? n.call(t) : n ? n.value : e.get(t)
});
var g;
class PolygonMaskInstance {
    constructor(t, e) {
        this.container = t;
        g.set(this, void 0);
        w(this, g, e, "f");
        this.dimension = {
            height: 0,
            width: 0
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new PolygonMask;
        this.polygonMaskMoveRadius = this.options.move.radius * t.retina.pixelRatio
    }
    clickPositionValid(t) {
        const e = this.options;
        return e.enable && "none" !== e.type && "inline" !== e.type && this.checkInsidePolygon(t)
    }
    draw(t) {
        var e;
        if (!(null === (e = this.paths) || void 0 === e ? void 0 : e.length)) return;
        const i = this.options,
            n = i.draw;
        if (!i.enable || !n.enable) return;
        const o = this.raw;
        for (const e of this.paths) {
            const i = e.path2d,
                r = this.path2DSupported;
            t && (r && i && this.offset ? drawPolygonMaskPath(t, i, n.stroke, this.offset) : o && drawPolygonMask(t, o, n.stroke))
        }
    }
    async initAsync(t) {
        this.options.load(null === t || void 0 === t ? void 0 : t.polygon);
        const e = this.options;
        this.polygonMaskMoveRadius = e.move.radius * this.container.retina.pixelRatio;
        e.enable && await this.initRawData()
    }
    particleBounce(t, e, i) {
        return this.polygonBounce(t, e, i)
    }
    particlePosition(t) {
        var e, n;
        const o = this.options;
        if (o.enable && (null !== (n = null === (e = this.raw) || void 0 === e ? void 0 : e.length) && void 0 !== n ? n : 0) > 0) return i({}, t || this.randomPoint())
    }
    particlesInitialization() {
        const t = this.options;
        if (t.enable && "inline" === t.type && ("one-per-point" === t.inline.arrangement || "per-point" === t.inline.arrangement)) {
            this.drawPoints();
            return true
        }
        return false
    }
    resize() {
        const t = this.container,
            e = this.options;
        if (e.enable && "none" !== e.type) {
            this.redrawTimeout && clearTimeout(this.redrawTimeout);
            this.redrawTimeout = window.setTimeout((async () => {
                await this.initRawData(true);
                await t.particles.redraw()
            }), 250)
        }
    }
    stop() {
        delete this.raw;
        delete this.paths
    }
    checkInsidePolygon(t) {
        var e, i;
        const n = this.container,
            o = this.options;
        if (!o.enable || "none" === o.type || "inline" === o.type) return true;
        if (!this.raw) throw new Error(h);
        const r = n.canvas.size,
            s = null !== (e = null === t || void 0 === t ? void 0 : t.x) && void 0 !== e ? e : a() * r.width,
            S = null !== (i = null === t || void 0 === t ? void 0 : t.y) && void 0 !== i ? i : a() * r.height;
        let u = false;
        for (let t = 0, e = this.raw.length - 1; t < this.raw.length; e = t++) {
            const i = this.raw[t],
                n = this.raw[e],
                o = i.y > S !== n.y > S && s < (n.x - i.x) * (S - i.y) / (n.y - i.y) + i.x;
            o && (u = !u)
        }
        return "inside" === o.type ? u : "outside" === o.type && !u
    }
    createPath2D() {
        var t, e;
        const i = this.options;
        if (this.path2DSupported && (null === (t = this.paths) || void 0 === t ? void 0 : t.length))
            for (const t of this.paths) {
                const n = null === (e = t.element) || void 0 === e ? void 0 : e.getAttribute("d");
                if (n) {
                    const e = new Path2D(n),
                        o = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(),
                        r = new Path2D,
                        s = o.scale(i.scale);
                    if (r.addPath) {
                        r.addPath(e, s);
                        t.path2d = r
                    } else delete t.path2d
                } else delete t.path2d;
                if (!t.path2d && this.raw) {
                    t.path2d = new Path2D;
                    t.path2d.moveTo(this.raw[0].x, this.raw[0].y);
                    this.raw.forEach(((e, i) => {
                        var n;
                        i > 0 && (null === (n = t.path2d) || void 0 === n ? void 0 : n.lineTo(e.x, e.y))
                    }));
                    t.path2d.closePath()
                }
            }
    }
    async downloadSvgPath(t, e) {
        const i = this.options,
            n = t || i.url,
            o = null !== e && void 0 !== e && e;
        if (!n || void 0 !== this.paths && !o) return this.raw;
        const r = await fetch(n);
        if (!r.ok) throw new Error("tsParticles Error - Error occurred during polygon mask download");
        return this.parseSvgPath(await r.text(), e)
    }
    drawPoints() {
        if (this.raw)
            for (const t of this.raw) this.container.particles.addParticle({
                x: t.x,
                y: t.y
            })
    }
    getEquidistantPointByIndex(t) {
        var e, i, n, o, r, s, h;
        const a = this.container.actualOptions,
            u = this.options;
        if (!this.raw || !this.raw.length || !(null === (e = this.paths) || void 0 === e ? void 0 : e.length)) throw new Error(S);
        let c, w = 0;
        const d = this.paths.reduce(((t, e) => t + e.length), 0),
            g = d / a.particles.number.value;
        for (const e of this.paths) {
            const i = g * t - w;
            if (i <= e.length) {
                c = e.element.getPointAtLength(i);
                break
            }
            w += e.length
        }
        return {
            x: (null !== (i = null === c || void 0 === c ? void 0 : c.x) && void 0 !== i ? i : 0) * u.scale + (null !== (o = null === (n = this.offset) || void 0 === n ? void 0 : n.x) && void 0 !== o ? o : 0),
            y: (null !== (r = null === c || void 0 === c ? void 0 : c.y) && void 0 !== r ? r : 0) * u.scale + (null !== (h = null === (s = this.offset) || void 0 === s ? void 0 : s.y) && void 0 !== h ? h : 0)
        }
    }
    getPointByIndex(t) {
        if (!this.raw || !this.raw.length) throw new Error(S);
        const e = this.raw[t % this.raw.length];
        return {
            x: e.x,
            y: e.y
        }
    }
    getRandomPoint() {
        if (!this.raw || !this.raw.length) throw new Error(S);
        const t = u(this.raw);
        return {
            x: t.x,
            y: t.y
        }
    }
    getRandomPointByLength() {
        var t, e, i;
        const n = this.options;
        if (!this.raw || !this.raw.length || !(null === (t = this.paths) || void 0 === t ? void 0 : t.length)) throw new Error(S);
        const o = u(this.paths),
            r = Math.floor(a() * o.length) + 1,
            s = o.element.getPointAtLength(r);
        return {
            x: s.x * n.scale + ((null === (e = this.offset) || void 0 === e ? void 0 : e.x) || 0),
            y: s.y * n.scale + ((null === (i = this.offset) || void 0 === i ? void 0 : i.y) || 0)
        }
    }
    async initRawData(t) {
        const e = this.options;
        if (e.url) this.raw = await this.downloadSvgPath(e.url, t);
        else if (e.data) {
            const i = e.data;
            let n;
            if ("string" !== typeof i) {
                const t = i.path instanceof Array ? i.path.map((t => `<path d="${t}" />`)).join("") : `<path d="${i.path}" />`;
                const e = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
                n = `<svg ${e} width="${i.size.width}" height="${i.size.height}">${t}</svg>`
            } else n = i;
            this.raw = this.parseSvgPath(n, t)
        }
        this.createPath2D();
        d(this, g, "f").dispatchEvent("polygonMaskLoaded", {
            container: this.container
        })
    }
    parseSvgPath(t, e) {
        var i, n, o;
        const r = null !== e && void 0 !== e && e;
        if (void 0 !== this.paths && !r) return this.raw;
        const s = this.container,
            h = this.options,
            a = new DOMParser,
            S = a.parseFromString(t, "image/svg+xml"),
            u = S.getElementsByTagName("svg")[0];
        let c = u.getElementsByTagName("path");
        c.length || (c = S.getElementsByTagName("path"));
        this.paths = [];
        for (let t = 0; t < c.length; t++) {
            const e = c.item(t);
            e && this.paths.push({
                element: e,
                length: e.getTotalLength()
            })
        }
        const w = s.retina.pixelRatio,
            d = h.scale / w;
        this.dimension.width = parseFloat(null !== (i = u.getAttribute("width")) && void 0 !== i ? i : "0") * d;
        this.dimension.height = parseFloat(null !== (n = u.getAttribute("height")) && void 0 !== n ? n : "0") * d;
        const g = null !== (o = h.position) && void 0 !== o ? o : {
            x: 50,
            y: 50
        };
        this.offset = {
            x: s.canvas.size.width * g.x / (100 * w) - this.dimension.width / 2,
            y: s.canvas.size.height * g.y / (100 * w) - this.dimension.height / 2
        };
        return parsePaths(this.paths, d, this.offset)
    }
    polygonBounce(t, e, i) {
        const n = this.options;
        if (!this.raw || !n.enable || "top" !== i) return false;
        if ("inside" === n.type || "outside" === n.type) {
            let e, i, n;
            const o = t.getPosition(),
                s = t.getRadius();
            for (let h = 0, a = this.raw.length - 1; h < this.raw.length; a = h++) {
                const S = this.raw[h],
                    u = this.raw[a];
                e = calcClosestPtOnSegment(S, u, o);
                const c = r(o, e);
                [i, n] = [c.dx, c.dy];
                if (c.distance < s) {
                    segmentBounce(S, u, t.velocity);
                    return true
                }
            }
            if (e && void 0 !== i && void 0 !== n && !this.checkInsidePolygon(o)) {
                const i = {
                    x: 1,
                    y: 1
                };
                t.position.x >= e.x && (i.x = -1);
                t.position.y >= e.y && (i.y = -1);
                t.position.x = e.x + 2 * s * i.x;
                t.position.y = e.y + 2 * s * i.y;
                t.velocity.mult(-1);
                return true
            }
        } else if ("inline" === n.type && t.initialPosition) {
            const e = c(t.initialPosition, t.getPosition());
            if (e > this.polygonMaskMoveRadius) {
                t.velocity.x = t.velocity.y / 2 - t.velocity.x;
                t.velocity.y = t.velocity.x / 2 - t.velocity.y;
                return true
            }
        }
        return false
    }
    randomPoint() {
        const t = this.container,
            e = this.options;
        let i;
        if ("inline" === e.type) switch (e.inline.arrangement) {
            case "random-point":
                i = this.getRandomPoint();
                break;
            case "random-length":
                i = this.getRandomPointByLength();
                break;
            case "equidistant":
                i = this.getEquidistantPointByIndex(t.particles.count);
                break;
            case "one-per-point":
            case "per-point":
            default:
                i = this.getPointByIndex(t.particles.count)
        } else i = {
            x: a() * t.canvas.size.width,
            y: a() * t.canvas.size.height
        };
        return this.checkInsidePolygon(i) ? i : this.randomPoint()
    }
}
g = new WeakMap;
var _ = (void 0, function(t, e, i, n, o) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === n ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var p = (void 0, function(t, e, i, n) {
    if ("a" === i && !n) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? n : "a" === i ? n.call(t) : n ? n.value : e.get(t)
});
var l;
class PolygonMaskPlugin {
    constructor(t) {
        l.set(this, void 0);
        this.id = "polygonMask";
        _(this, l, t, "f")
    }
    getPlugin(t) {
        return new PolygonMaskInstance(t, p(this, l, "f"))
    }
    loadOptions(t, e) {
        if (!this.needsPlugin(e)) return;
        const i = t;
        let n = i.polygon;
        void 0 === (null === n || void 0 === n ? void 0 : n.load) && (i.polygon = n = new PolygonMask);
        n.load(null === e || void 0 === e ? void 0 : e.polygon)
    }
    needsPlugin(t) {
        var e, i, n;
        return null !== (i = null === (e = null === t || void 0 === t ? void 0 : t.polygon) || void 0 === e ? void 0 : e.enable) && void 0 !== i ? i : void 0 !== (null === (n = null === t || void 0 === t ? void 0 : t.polygon) || void 0 === n ? void 0 : n.type) && "none" !== t.polygon.type
    }
}
l = new WeakMap;
async function loadPolygonMaskPlugin(t) {
    const e = new PolygonMaskPlugin(t);
    await t.addPlugin(e)
}
export {
    loadPolygonMaskPlugin
};

//# sourceMappingURL=index.js.map