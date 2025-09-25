var t = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var e = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var i;
class EventDispatcher {
    constructor() {
        i.set(this, void 0);
        t(this, i, new Map, "f")
    }
    addEventListener(t, s) {
        var o;
        this.removeEventListener(t, s);
        e(this, i, "f").get(t) || e(this, i, "f").set(t, []);
        null === (o = e(this, i, "f").get(t)) || void 0 === o ? void 0 : o.push(s)
    }
    dispatchEvent(t, s) {
        var o;
        null === (o = e(this, i, "f").get(t)) || void 0 === o ? void 0 : o.forEach((t => t(s)))
    }
    hasEventListener(t) {
        return !!e(this, i, "f").get(t)
    }
    removeAllEventListeners(s) {
        s ? e(this, i, "f").delete(s) : t(this, i, new Map, "f")
    }
    removeEventListener(t, s) {
        const o = e(this, i, "f").get(t);
        if (!o) return;
        const a = o.length,
            n = o.indexOf(s);
        n < 0 || (1 === a ? e(this, i, "f").delete(t) : o.splice(n, 1))
    }
}
i = new WeakMap;
class Vector {
    constructor(t, e) {
        if ("number" !== typeof t && t) {
            this.x = t.x;
            this.y = t.y
        } else {
            if (void 0 === t || void 0 === e) throw new Error("tsParticles - Vector not initialized correctly");
            this.x = t;
            this.y = e
        }
    }
    static get origin() {
        return Vector.create(0, 0)
    }
    get angle() {
        return Math.atan2(this.y, this.x)
    }
    set angle(t) {
        this.updateFromAngle(t, this.length)
    }
    get length() {
        return Math.sqrt(this.getLengthSq())
    }
    set length(t) {
        this.updateFromAngle(this.angle, t)
    }
    static clone(t) {
        return Vector.create(t.x, t.y)
    }
    static create(t, e) {
        return new Vector(t, e)
    }
    add(t) {
        return Vector.create(this.x + t.x, this.y + t.y)
    }
    addTo(t) {
        this.x += t.x;
        this.y += t.y
    }
    copy() {
        return Vector.clone(this)
    }
    distanceTo(t) {
        return this.sub(t).length
    }
    distanceToSq(t) {
        return this.sub(t).getLengthSq()
    }
    div(t) {
        return Vector.create(this.x / t, this.y / t)
    }
    divTo(t) {
        this.x /= t;
        this.y /= t
    }
    getLengthSq() {
        return this.x ** 2 + this.y ** 2
    }
    manhattanDistanceTo(t) {
        return Math.abs(t.x - this.x) + Math.abs(t.y - this.y)
    }
    mult(t) {
        return Vector.create(this.x * t, this.y * t)
    }
    multTo(t) {
        this.x *= t;
        this.y *= t
    }
    rotate(t) {
        return Vector.create(this.x * Math.cos(t) - this.y * Math.sin(t), this.x * Math.sin(t) + this.y * Math.cos(t))
    }
    setTo(t) {
        this.x = t.x;
        this.y = t.y
    }
    sub(t) {
        return Vector.create(this.x - t.x, this.y - t.y)
    }
    subFrom(t) {
        this.x -= t.x;
        this.y -= t.y
    }
    updateFromAngle(t, e) {
        this.x = Math.cos(t) * e;
        this.y = Math.sin(t) * e
    }
}
let s = Math.random;

function setRandom(t = Math.random) {
    s = t
}

function getRandom() {
    return clamp(s(), 0, 1 - 1e-16)
}

function clamp(t, e, i) {
    return Math.min(Math.max(t, e), i)
}

function mix(t, e, i, s) {
    return Math.floor((t * i + e * s) / (i + s))
}

function randomInRange(t) {
    const e = getRangeMax(t);
    let i = getRangeMin(t);
    e === i && (i = 0);
    return getRandom() * (e - i) + i
}

function getRangeValue(t) {
    return "number" === typeof t ? t : randomInRange(t)
}

function getRangeMin(t) {
    return "number" === typeof t ? t : t.min
}

function getRangeMax(t) {
    return "number" === typeof t ? t : t.max
}

function setRangeValue(t, e) {
    if (t === e || void 0 === e && "number" === typeof t) return t;
    const i = getRangeMin(t),
        s = getRangeMax(t);
    return void 0 !== e ? {
        min: Math.min(i, e),
        max: Math.max(s, e)
    } : setRangeValue(i, s)
}

function getValue(t) {
    const e = t.random,
        {
            enable: i,
            minimumValue: s
        } = "boolean" === typeof e ? {
            enable: e,
            minimumValue: 0
        } : e;
    return getRangeValue(i ? setRangeValue(t.value, s) : t.value)
}

function getDistances(t, e) {
    const i = t.x - e.x,
        s = t.y - e.y;
    return {
        dx: i,
        dy: s,
        distance: Math.sqrt(i * i + s * s)
    }
}

function getDistance(t, e) {
    return getDistances(t, e).distance
}

function getParticleDirectionAngle(t, e, i) {
    if ("number" === typeof t) return t * Math.PI / 180;
    switch (t) {
        case "top":
            return -Math.PI / 2;
        case "top-right":
            return -Math.PI / 4;
        case "right":
            return 0;
        case "bottom-right":
            return Math.PI / 4;
        case "bottom":
            return Math.PI / 2;
        case "bottom-left":
            return 3 * Math.PI / 4;
        case "left":
            return Math.PI;
        case "top-left":
            return -3 * Math.PI / 4;
        case "inside":
            return Math.atan2(i.y - e.y, i.x - e.x);
        case "outside":
            return Math.atan2(e.y - i.y, e.x - i.x);
        case "none":
        default:
            return getRandom() * Math.PI * 2
    }
}

function getParticleBaseVelocity(t) {
    const e = Vector.origin;
    e.length = 1;
    e.angle = t;
    return e
}

function collisionVelocity(t, e, i, s) {
    return Vector.create(t.x * (i - s) / (i + s) + 2 * e.x * s / (i + s), t.y)
}

function calcEasing(t, e) {
    switch (e) {
        case "ease-out-quad":
            return 1 - (1 - t) ** 2;
        case "ease-out-cubic":
            return 1 - (1 - t) ** 3;
        case "ease-out-quart":
            return 1 - (1 - t) ** 4;
        case "ease-out-quint":
            return 1 - (1 - t) ** 5;
        case "ease-out-expo":
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        case "ease-out-sine":
            return Math.sin(t * Math.PI / 2);
        case "ease-out-back":
            {
                const e = 1.70158,
                    i = e + 1;
                return 1 + i * Math.pow(t - 1, 3) + e * Math.pow(t - 1, 2)
            }
        case "ease-out-circ":
            return Math.sqrt(1 - Math.pow(t - 1, 2));
        default:
            return t
    }
}

function calcPositionFromSize(t) {
    var e, i;
    return void 0 !== (null === (e = t.position) || void 0 === e ? void 0 : e.x) && void 0 !== (null === (i = t.position) || void 0 === i ? void 0 : i.y) ? {
        x: t.position.x * t.size.width / 100,
        y: t.position.y * t.size.height / 100
    } : void 0
}

function calcPositionOrRandomFromSize(t) {
    var e, i, s, o;
    return {
        x: (null !== (i = null === (e = t.position) || void 0 === e ? void 0 : e.x) && void 0 !== i ? i : 100 * getRandom()) * t.size.width / 100,
        y: (null !== (o = null === (s = t.position) || void 0 === s ? void 0 : s.y) && void 0 !== o ? o : 100 * getRandom()) * t.size.height / 100
    }
}

function calcPositionOrRandomFromSizeRanged(t) {
    var e, i;
    const s = {
        x: void 0 !== (null === (e = t.position) || void 0 === e ? void 0 : e.x) ? getRangeValue(t.position.x) : void 0,
        y: void 0 !== (null === (i = t.position) || void 0 === i ? void 0 : i.y) ? getRangeValue(t.position.y) : void 0
    };
    return calcPositionOrRandomFromSize({
        size: t.size,
        position: s
    })
}

function calcExactPositionOrRandomFromSize(t) {
    var e, i, s, o;
    return {
        x: null !== (i = null === (e = t.position) || void 0 === e ? void 0 : e.x) && void 0 !== i ? i : getRandom() * t.size.width,
        y: null !== (o = null === (s = t.position) || void 0 === s ? void 0 : s.y) && void 0 !== o ? o : getRandom() * t.size.height
    }
}

function calcExactPositionOrRandomFromSizeRanged(t) {
    var e, i;
    const s = {
        x: void 0 !== (null === (e = t.position) || void 0 === e ? void 0 : e.x) ? getRangeValue(t.position.x) : void 0,
        y: void 0 !== (null === (i = t.position) || void 0 === i ? void 0 : i.y) ? getRangeValue(t.position.y) : void 0
    };
    return calcExactPositionOrRandomFromSize({
        size: t.size,
        position: s
    })
}

function parseAlpha(t) {
    return t.endsWith("%") ? parseFloat(t) / 100 : parseFloat(t)
}

function rectSideBounce(t, e, i, s, o, a) {
    const n = {
        bounced: false
    };
    if (e.min < s.min || e.min > s.max || e.max < s.min || e.max > s.max) return n;
    if (t.max >= i.min && t.max <= (i.max + i.min) / 2 && o > 0 || t.min <= i.max && t.min > (i.max + i.min) / 2 && o < 0) {
        n.velocity = o * -a;
        n.bounced = true
    }
    return n
}

function checkSelector(t, e) {
    if (!(e instanceof Array)) return t.matches(e);
    for (const i of e)
        if (t.matches(i)) return true;
    return false
}

function isSsr() {
    return "undefined" === typeof window || !window || "undefined" === typeof window.document || !window.document
}

function animate() {
    return isSsr() ? t => setTimeout(t) : t => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(t)
}

function cancelAnimation() {
    return isSsr() ? t => clearTimeout(t) : t => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(t)
}

function isInArray(t, e) {
    return t === e || e instanceof Array && e.indexOf(t) > -1
}
async function loadFont(t, e) {
    try {
        await document.fonts.load(`${null!==e&&void 0!==e?e:"400"} 36px '${null!==t&&void 0!==t?t:"Verdana"}'`)
    } catch (t) {}
}

function arrayRandomIndex(t) {
    return Math.floor(getRandom() * t.length)
}

function itemFromArray(t, e, i = true) {
    const s = void 0 !== e && i ? e % t.length : arrayRandomIndex(t);
    return t[s]
}

function isPointInside(t, e, i, s, o) {
    return areBoundsInside(calculateBounds(t, null !== s && void 0 !== s ? s : 0), e, i, o)
}

function areBoundsInside(t, e, i, s) {
    let o = true;
    s && "bottom" !== s || (o = t.top < e.height + i.x);
    !o || s && "left" !== s || (o = t.right > i.x);
    !o || s && "right" !== s || (o = t.left < e.width + i.y);
    !o || s && "top" !== s || (o = t.bottom > i.y);
    return o
}

function calculateBounds(t, e) {
    return {
        bottom: t.y + e,
        left: t.x - e,
        right: t.x + e,
        top: t.y - e
    }
}

function deepExtend(t, ...e) {
    for (const i of e) {
        if (void 0 === i || null === i) continue;
        if ("object" !== typeof i) {
            t = i;
            continue
        }
        const e = Array.isArray(i);
        !e || "object" === typeof t && t && Array.isArray(t) ? e || "object" === typeof t && t && !Array.isArray(t) || (t = {}) : t = [];
        for (const e in i) {
            if ("__proto__" === e) continue;
            const s = i,
                o = s[e],
                a = "object" === typeof o,
                n = t;
            n[e] = a && Array.isArray(o) ? o.map((t => deepExtend(n[e], t))) : deepExtend(n[e], o)
        }
    }
    return t
}

function isDivModeEnabled(t, e) {
    return e instanceof Array ? !!e.find((e => e.enable && isInArray(t, e.mode))) : isInArray(t, e.mode)
}

function divModeExecute(t, e, i) {
    if (e instanceof Array)
        for (const s of e) {
            const e = s.mode,
                o = s.enable;
            o && isInArray(t, e) && singleDivModeExecute(s, i)
        } else {
            const s = e.mode,
                o = e.enable;
            o && isInArray(t, s) && singleDivModeExecute(e, i)
        }
}

function singleDivModeExecute(t, e) {
    const i = t.selectors;
    if (i instanceof Array)
        for (const s of i) e(s, t);
    else e(i, t)
}

function divMode(t, e) {
    if (e && t) return t instanceof Array ? t.find((t => checkSelector(e, t.selectors))) : checkSelector(e, t.selectors) ? t : void 0
}

function circleBounceDataFromParticle(t) {
    return {
        position: t.getPosition(),
        radius: t.getRadius(),
        mass: t.getMass(),
        velocity: t.velocity,
        factor: Vector.create(getValue(t.options.bounce.horizontal), getValue(t.options.bounce.vertical))
    }
}

function circleBounce(t, e) {
    const {
        x: i,
        y: s
    } = t.velocity.sub(e.velocity), [o, a] = [t.position, e.position], {
        dx: n,
        dy: r
    } = getDistances(a, o);
    if (i * n + s * r < 0) return;
    const l = -Math.atan2(r, n),
        c = t.mass,
        h = e.mass,
        d = t.velocity.rotate(l),
        u = e.velocity.rotate(l),
        f = collisionVelocity(d, u, c, h),
        p = collisionVelocity(u, d, c, h),
        v = f.rotate(-l),
        m = p.rotate(-l);
    t.velocity.x = v.x * t.factor.x;
    t.velocity.y = v.y * t.factor.y;
    e.velocity.x = m.x * e.factor.x;
    e.velocity.y = m.y * e.factor.y
}

function rectBounce(t, e) {
    const i = t.getPosition(),
        s = t.getRadius(),
        o = calculateBounds(i, s);
    const a = rectSideBounce({
        min: o.left,
        max: o.right
    }, {
        min: o.top,
        max: o.bottom
    }, {
        min: e.left,
        max: e.right
    }, {
        min: e.top,
        max: e.bottom
    }, t.velocity.x, getValue(t.options.bounce.horizontal));
    if (a.bounced) {
        void 0 !== a.velocity && (t.velocity.x = a.velocity);
        void 0 !== a.position && (t.position.x = a.position)
    }
    const n = rectSideBounce({
        min: o.top,
        max: o.bottom
    }, {
        min: o.left,
        max: o.right
    }, {
        min: e.top,
        max: e.bottom
    }, {
        min: e.left,
        max: e.right
    }, t.velocity.y, getValue(t.options.bounce.vertical));
    if (n.bounced) {
        void 0 !== n.velocity && (t.velocity.y = n.velocity);
        void 0 !== n.position && (t.position.y = n.position)
    }
}
const o = "random",
    a = "mid",
    n = new Map;

function addColorManager(t, e) {
    n.set(t, e)
}

function hue2rgb(t, e, i) {
    i < 0 && (i += 1);
    i > 1 && (i -= 1);
    return i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
}

function stringToRgba(t) {
    for (const [, e] of n)
        if (t.startsWith(e.stringPrefix)) return e.parseString(t);
    const e = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
        i = t.replace(e, ((t, e, i, s, o) => e + e + i + i + s + s + (void 0 !== o ? o + o : ""))),
        s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
        o = s.exec(i);
    return o ? {
        a: void 0 !== o[4] ? parseInt(o[4], 16) / 255 : 1,
        b: parseInt(o[3], 16),
        g: parseInt(o[2], 16),
        r: parseInt(o[1], 16)
    } : void 0
}

function rangeColorToRgb(t, e, i = true) {
    if (!t) return;
    const s = "string" === typeof t ? {
        value: t
    } : t;
    if ("string" === typeof s.value) return colorToRgb(s.value, e, i);
    if (s.value instanceof Array) return rangeColorToRgb({
        value: itemFromArray(s.value, e, i)
    });
    for (const [, t] of n) {
        const e = t.handleRangeColor(s);
        if (e) return e
    }
}

function colorToRgb(t, e, i = true) {
    if (!t) return;
    const s = "string" === typeof t ? {
        value: t
    } : t;
    if ("string" === typeof s.value) return s.value === o ? getRandomRgbColor() : stringToRgb(s.value);
    if (s.value instanceof Array) return colorToRgb({
        value: itemFromArray(s.value, e, i)
    });
    for (const [, t] of n) {
        const e = t.handleColor(s);
        if (e) return e
    }
}

function colorToHsl(t, e, i = true) {
    const s = colorToRgb(t, e, i);
    return s ? rgbToHsl(s) : void 0
}

function rangeColorToHsl(t, e, i = true) {
    const s = rangeColorToRgb(t, e, i);
    return s ? rgbToHsl(s) : void 0
}

function rgbToHsl(t) {
    const e = t.r / 255,
        i = t.g / 255,
        s = t.b / 255,
        o = Math.max(e, i, s),
        a = Math.min(e, i, s),
        n = {
            h: 0,
            l: (o + a) / 2,
            s: 0
        };
    if (o !== a) {
        n.s = n.l < .5 ? (o - a) / (o + a) : (o - a) / (2 - o - a);
        n.h = e === o ? (i - s) / (o - a) : n.h = i === o ? 2 + (s - e) / (o - a) : 4 + (e - i) / (o - a)
    }
    n.l *= 100;
    n.s *= 100;
    n.h *= 60;
    n.h < 0 && (n.h += 360);
    n.h >= 360 && (n.h -= 360);
    return n
}

function stringToAlpha(t) {
    var e;
    return null === (e = stringToRgba(t)) || void 0 === e ? void 0 : e.a
}

function stringToRgb(t) {
    return stringToRgba(t)
}

function hslToRgb(t) {
    const e = {
            b: 0,
            g: 0,
            r: 0
        },
        i = {
            h: t.h / 360,
            l: t.l / 100,
            s: t.s / 100
        };
    if (i.s) {
        const t = i.l < .5 ? i.l * (1 + i.s) : i.l + i.s - i.l * i.s,
            s = 2 * i.l - t;
        e.r = hue2rgb(s, t, i.h + 1 / 3);
        e.g = hue2rgb(s, t, i.h);
        e.b = hue2rgb(s, t, i.h - 1 / 3)
    } else {
        e.b = i.l;
        e.g = i.l;
        e.r = i.l
    }
    e.r = Math.floor(255 * e.r);
    e.g = Math.floor(255 * e.g);
    e.b = Math.floor(255 * e.b);
    return e
}

function hslaToRgba(t) {
    const e = hslToRgb(t);
    return {
        a: t.a,
        b: e.b,
        g: e.g,
        r: e.r
    }
}

function getRandomRgbColor(t) {
    const e = null !== t && void 0 !== t ? t : 0;
    return {
        b: Math.floor(randomInRange(setRangeValue(e, 256))),
        g: Math.floor(randomInRange(setRangeValue(e, 256))),
        r: Math.floor(randomInRange(setRangeValue(e, 256)))
    }
}

function getStyleFromRgb(t, e) {
    return `rgba(${t.r}, ${t.g}, ${t.b}, ${null!==e&&void 0!==e?e:1})`
}

function getStyleFromHsl(t, e) {
    return `hsla(${t.h}, ${t.s}%, ${t.l}%, ${null!==e&&void 0!==e?e:1})`
}

function colorMix(t, e, i, s) {
    let o = t,
        a = e;
    void 0 === o.r && (o = hslToRgb(t));
    void 0 === a.r && (a = hslToRgb(e));
    return {
        b: mix(o.b, a.b, i, s),
        g: mix(o.g, a.g, i, s),
        r: mix(o.r, a.r, i, s)
    }
}

function getLinkColor(t, e, i) {
    var s, n;
    if (i === o) return getRandomRgbColor();
    if (i !== a) return i; {
        const i = null !== (s = t.getFillColor()) && void 0 !== s ? s : t.getStrokeColor(),
            o = null !== (n = null === e || void 0 === e ? void 0 : e.getFillColor()) && void 0 !== n ? n : null === e || void 0 === e ? void 0 : e.getStrokeColor();
        if (i && o && e) return colorMix(i, o, t.getRadius(), e.getRadius()); {
            const t = null !== i && void 0 !== i ? i : o;
            if (t) return hslToRgb(t)
        }
    }
}

function getLinkRandomColor(t, e, i) {
    const s = "string" === typeof t ? t : t.value;
    return s === o ? i ? rangeColorToRgb({
        value: s
    }) : e ? o : a : rangeColorToRgb({
        value: s
    })
}

function getHslFromAnimation(t) {
    return void 0 !== t ? {
        h: t.h.value,
        s: t.s.value,
        l: t.l.value
    } : void 0
}

function getHslAnimationFromHsl(t, e, i) {
    const s = {
        h: {
            enable: false,
            value: t.h
        },
        s: {
            enable: false,
            value: t.s
        },
        l: {
            enable: false,
            value: t.l
        }
    };
    if (e) {
        setColorAnimation(s.h, e.h, i);
        setColorAnimation(s.s, e.s, i);
        setColorAnimation(s.l, e.l, i)
    }
    return s
}

function setColorAnimation(t, e, i) {
    t.enable = e.enable;
    if (t.enable) {
        t.velocity = getRangeValue(e.speed) / 100 * i;
        t.decay = 1 - getRangeValue(e.decay);
        t.status = 0;
        if (!e.sync) {
            t.velocity *= getRandom();
            t.value *= getRandom()
        }
    } else t.velocity = 0
}

function drawLine(t, e, i) {
    t.beginPath();
    t.moveTo(e.x, e.y);
    t.lineTo(i.x, i.y);
    t.closePath()
}

function drawTriangle(t, e, i, s) {
    t.beginPath();
    t.moveTo(e.x, e.y);
    t.lineTo(i.x, i.y);
    t.lineTo(s.x, s.y);
    t.closePath()
}

function paintBase(t, e, i) {
    t.save();
    t.fillStyle = null !== i && void 0 !== i ? i : "rgba(0,0,0,0)";
    t.fillRect(0, 0, e.width, e.height);
    t.restore()
}

function clear(t, e) {
    t.clearRect(0, 0, e.width, e.height)
}

function drawParticle(t) {
    var e, i, s, o, a, n, r, l, c, h;
    const {
        container: d,
        context: u,
        particle: f,
        delta: p,
        colorStyles: v,
        backgroundMask: m,
        composite: g,
        radius: y,
        opacity: w,
        shadow: b,
        transform: x
    } = t;
    const R = f.getPosition();
    u.save();
    void 0 !== x.a || void 0 !== x.b || void 0 !== x.c || void 0 !== x.d ? u.setTransform(null !== (e = x.a) && void 0 !== e ? e : 1, null !== (i = x.b) && void 0 !== i ? i : 0, null !== (s = x.c) && void 0 !== s ? s : 0, null !== (o = x.d) && void 0 !== o ? o : 1, R.x, R.y) : u.translate(R.x, R.y);
    u.beginPath();
    const M = f.rotation + (f.options.rotate.path ? f.velocity.angle : 0);
    0 !== M && u.rotate(M);
    m && (u.globalCompositeOperation = g);
    const C = f.shadowColor;
    if (b.enable && C) {
        u.shadowBlur = b.blur;
        u.shadowColor = getStyleFromRgb(C);
        u.shadowOffsetX = b.offset.x;
        u.shadowOffsetY = b.offset.y
    }
    v.fill && (u.fillStyle = v.fill);
    const P = f.stroke;
    u.lineWidth = null !== (a = f.strokeWidth) && void 0 !== a ? a : 0;
    v.stroke && (u.strokeStyle = v.stroke);
    drawShape(d, u, f, y, w, p);
    (null !== (n = null === P || void 0 === P ? void 0 : P.width) && void 0 !== n ? n : 0) > 0 && u.stroke();
    f.close && u.closePath();
    f.fill && u.fill();
    u.restore();
    u.save();
    void 0 !== x.a || void 0 !== x.b || void 0 !== x.c || void 0 !== x.d ? u.setTransform(null !== (r = x.a) && void 0 !== r ? r : 1, null !== (l = x.b) && void 0 !== l ? l : 0, null !== (c = x.c) && void 0 !== c ? c : 0, null !== (h = x.d) && void 0 !== h ? h : 1, R.x, R.y) : u.translate(R.x, R.y);
    f.rotation && u.rotate(f.rotation);
    m && (u.globalCompositeOperation = g);
    drawShapeAfterEffect(d, u, f, y, w, p);
    u.restore()
}

function drawShape(t, e, i, s, o, a) {
    if (!i.shape) return;
    const n = t.drawers.get(i.shape);
    n && n.draw(e, i, s, o, a, t.retina.pixelRatio)
}

function drawShapeAfterEffect(t, e, i, s, o, a) {
    if (!i.shape) return;
    const n = t.drawers.get(i.shape);
    (null === n || void 0 === n ? void 0 : n.afterEffect) && n.afterEffect(e, i, s, o, a, t.retina.pixelRatio)
}

function drawPlugin(t, e, i) {
    if (e.draw) {
        t.save();
        e.draw(t, i);
        t.restore()
    }
}

function drawParticlePlugin(t, e, i, s) {
    if (e.drawParticle) {
        t.save();
        e.drawParticle(t, i, s);
        t.restore()
    }
}

function alterHsl(t, e, i) {
    return {
        h: t.h,
        s: t.s,
        l: t.l + ("darken" === e ? -1 : 1) * i
    }
}
const r = "generated";
const l = "touchend";
const c = "pointerdown";
const h = "pointerup";
const d = "pointermove";
const u = "touchstart";
const f = "touchmove";
const p = "pointerleave";
const v = "pointerout";
const m = "touchcancel";
const g = "resize";
const y = "visibilitychange";
const w = "No polygon data loaded.";
const b = "No polygon found, you need to specify SVG url in config.";
var x = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var R = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var M, C, P, z, k;

function setTransformValue(t, e, i) {
    var s;
    const o = e[i];
    void 0 !== o && (t[i] = (null !== (s = t[i]) && void 0 !== s ? s : 1) * o)
}
class Canvas {
    constructor(t) {
        this.container = t;
        M.set(this, void 0);
        C.set(this, void 0);
        P.set(this, void 0);
        z.set(this, void 0);
        k.set(this, void 0);
        this.size = {
            height: 0,
            width: 0
        };
        x(this, C, null, "f");
        this.generatedCanvas = false;
        x(this, z, [], "f");
        x(this, P, [], "f");
        x(this, k, [], "f");
        x(this, M, [], "f")
    }
    clear() {
        const t = this.container.actualOptions,
            e = t.particles.move.trail;
        t.backgroundMask.enable ? this.paint() : e.enable && e.length > 0 && this.trailFillColor ? this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / e.length)) : this.draw((t => {
            clear(t, this.size)
        }))
    }
    destroy() {
        var t;
        this.generatedCanvas ? null === (t = this.element) || void 0 === t ? void 0 : t.remove() : this.resetOriginalStyle();
        this.draw((t => {
            clear(t, this.size)
        }));
        x(this, z, [], "f");
        x(this, P, [], "f");
        x(this, k, [], "f");
        x(this, M, [], "f")
    }
    draw(t) {
        if (R(this, C, "f")) return t(R(this, C, "f"))
    }
    drawParticle(t, e) {
        var i;
        if (t.spawning || t.destroyed) return;
        const s = t.getRadius();
        if (s <= 0) return;
        const o = t.getFillColor(),
            a = null !== (i = t.getStrokeColor()) && void 0 !== i ? i : o;
        let [n, r] = this.getPluginParticleColors(t);
        n || (n = o);
        r || (r = a);
        (n || r) && this.draw((i => {
            var o, a, l, c, h;
            const d = this.container.actualOptions,
                u = t.options.zIndex,
                f = (1 - t.zIndexFactor) ** u.opacityRate,
                p = null !== (l = null !== (o = t.bubble.opacity) && void 0 !== o ? o : null === (a = t.opacity) || void 0 === a ? void 0 : a.value) && void 0 !== l ? l : 1,
                v = null !== (h = null === (c = t.stroke) || void 0 === c ? void 0 : c.opacity) && void 0 !== h ? h : p,
                m = p * f,
                g = v * f,
                y = {},
                w = {
                    fill: n ? getStyleFromHsl(n, m) : void 0
                };
            w.stroke = r ? getStyleFromHsl(r, g) : w.fill;
            this.applyPreDrawUpdaters(i, t, s, m, w, y);
            drawParticle({
                container: this.container,
                context: i,
                particle: t,
                delta: e,
                colorStyles: w,
                backgroundMask: d.backgroundMask.enable,
                composite: d.backgroundMask.composite,
                radius: s * (1 - t.zIndexFactor) ** u.sizeRate,
                opacity: m,
                shadow: t.options.shadow,
                transform: y
            });
            this.applyPostDrawUpdaters(t)
        }))
    }
    drawParticlePlugin(t, e, i) {
        this.draw((s => {
            drawParticlePlugin(s, t, e, i)
        }))
    }
    drawPlugin(t, e) {
        this.draw((i => {
            drawPlugin(i, t, e)
        }))
    }
    init() {
        this.resize();
        this.initStyle();
        this.initCover();
        this.initTrail();
        this.initBackground();
        this.initUpdaters();
        this.initPlugins();
        this.paint()
    }
    initBackground() {
        const t = this.container.actualOptions,
            e = t.background,
            i = this.element,
            s = null === i || void 0 === i ? void 0 : i.style;
        if (s) {
            if (e.color) {
                const t = rangeColorToRgb(e.color);
                s.backgroundColor = t ? getStyleFromRgb(t, e.opacity) : ""
            } else s.backgroundColor = "";
            s.backgroundImage = e.image || "";
            s.backgroundPosition = e.position || "";
            s.backgroundRepeat = e.repeat || "";
            s.backgroundSize = e.size || ""
        }
    }
    initPlugins() {
        x(this, k, [], "f");
        for (const [, t] of this.container.plugins) {
            t.resize && R(this, k, "f").push(t);
            (t.particleFillColor || t.particleStrokeColor) && R(this, M, "f").push(t)
        }
    }
    initUpdaters() {
        x(this, z, [], "f");
        x(this, P, [], "f");
        for (const t of this.container.particles.updaters) {
            t.afterDraw && R(this, P, "f").push(t);
            (t.getColorStyles || t.getTransformValues || t.beforeDraw) && R(this, z, "f").push(t)
        }
    }
    loadCanvas(t) {
        var e;
        this.generatedCanvas && (null === (e = this.element) || void 0 === e ? void 0 : e.remove());
        this.generatedCanvas = t.dataset && r in t.dataset ? "true" === t.dataset[r] : this.generatedCanvas;
        this.element = t;
        this.originalStyle = deepExtend({}, this.element.style);
        this.size.height = t.offsetHeight;
        this.size.width = t.offsetWidth;
        x(this, C, this.element.getContext("2d"), "f");
        this.container.retina.init();
        this.initBackground()
    }
    paint() {
        const t = this.container.actualOptions;
        this.draw((e => {
            if (t.backgroundMask.enable && t.backgroundMask.cover) {
                clear(e, this.size);
                this.paintBase(this.coverColorStyle)
            } else this.paintBase()
        }))
    }
    resize() {
        if (!this.element) return;
        const t = this.container,
            e = t.retina.pixelRatio,
            i = t.canvas.size,
            s = {
                width: this.element.offsetWidth * e,
                height: this.element.offsetHeight * e
            };
        if (s.height === i.height && s.width === i.width && s.height === this.element.height && s.width === this.element.width) return;
        const o = Object.assign({}, i);
        this.element.width = i.width = this.element.offsetWidth * e;
        this.element.height = i.height = this.element.offsetHeight * e;
        this.container.started && (this.resizeFactor = {
            width: i.width / o.width,
            height: i.height / o.height
        })
    }
    async windowResize() {
        if (!this.element) return;
        this.resize();
        const t = this.container,
            e = t.updateActualOptions();
        t.particles.setDensity();
        this.applyResizePlugins();
        e && await t.refresh()
    }
    applyPostDrawUpdaters(t) {
        var e;
        for (const i of R(this, P, "f")) null === (e = i.afterDraw) || void 0 === e ? void 0 : e.call(i, t)
    }
    applyPreDrawUpdaters(t, e, i, s, o, a) {
        var n;
        for (const r of R(this, z, "f")) {
            if (r.getColorStyles) {
                const {
                    fill: a,
                    stroke: n
                } = r.getColorStyles(e, t, i, s);
                a && (o.fill = a);
                n && (o.stroke = n)
            }
            if (r.getTransformValues) {
                const t = r.getTransformValues(e);
                for (const e in t) setTransformValue(a, t, e)
            }
            null === (n = r.beforeDraw) || void 0 === n ? void 0 : n.call(r, e)
        }
    }
    applyResizePlugins() {
        var t;
        for (const e of R(this, k, "f")) null === (t = e.resize) || void 0 === t ? void 0 : t.call(e)
    }
    getPluginParticleColors(t) {
        let e, i;
        for (const s of R(this, M, "f")) {
            !e && s.particleFillColor && (e = rangeColorToHsl(s.particleFillColor(t)));
            !i && s.particleStrokeColor && (i = rangeColorToHsl(s.particleStrokeColor(t)));
            if (e && i) break
        }
        return [e, i]
    }
    initCover() {
        const t = this.container.actualOptions,
            e = t.backgroundMask.cover,
            i = e.color,
            s = rangeColorToRgb(i);
        if (s) {
            const t = {
                r: s.r,
                g: s.g,
                b: s.b,
                a: e.opacity
            };
            this.coverColorStyle = getStyleFromRgb(t, t.a)
        }
    }
    initStyle() {
        const t = this.element,
            e = this.container.actualOptions;
        if (t) {
            if (e.fullScreen.enable) {
                this.originalStyle = deepExtend({}, t.style);
                t.style.setProperty("position", "fixed", "important");
                t.style.setProperty("z-index", e.fullScreen.zIndex.toString(10), "important");
                t.style.setProperty("top", "0", "important");
                t.style.setProperty("left", "0", "important");
                t.style.setProperty("width", "100%", "important");
                t.style.setProperty("height", "100%", "important")
            } else this.resetOriginalStyle();
            for (const i in e.style) {
                if (!i || !e.style) continue;
                const s = e.style[i];
                s && t.style.setProperty(i, s, "important")
            }
        }
    }
    initTrail() {
        const t = this.container.actualOptions,
            e = t.particles.move.trail,
            i = rangeColorToRgb(e.fillColor);
        if (i) {
            const e = t.particles.move.trail;
            this.trailFillColor = {
                r: i.r,
                g: i.g,
                b: i.b,
                a: 1 / e.length
            }
        }
    }
    paintBase(t) {
        this.draw((e => {
            paintBase(e, this.size, t)
        }))
    }
    resetOriginalStyle() {
        const t = this.element,
            e = this.originalStyle;
        if (t && e) {
            t.style.position = e.position;
            t.style.zIndex = e.zIndex;
            t.style.top = e.top;
            t.style.left = e.left;
            t.style.width = e.width;
            t.style.height = e.height
        }
    }
}
M = new WeakMap, C = new WeakMap, P = new WeakMap, z = new WeakMap, k = new WeakMap;

function manageListener(t, e, i, s, o) {
    if (s) {
        let s = {
            passive: true
        };
        "boolean" === typeof o ? s.capture = o : void 0 !== o && (s = o);
        t.addEventListener(e, i, s)
    } else {
        const s = o;
        t.removeEventListener(e, i, s)
    }
}
class EventListeners {
    constructor(t) {
        this.container = t;
        this.canPush = true;
        this.mouseMoveHandler = t => this.mouseTouchMove(t);
        this.touchStartHandler = t => this.mouseTouchMove(t);
        this.touchMoveHandler = t => this.mouseTouchMove(t);
        this.touchEndHandler = () => this.mouseTouchFinish();
        this.mouseLeaveHandler = () => this.mouseTouchFinish();
        this.touchCancelHandler = () => this.mouseTouchFinish();
        this.touchEndClickHandler = t => this.mouseTouchClick(t);
        this.mouseUpHandler = t => this.mouseTouchClick(t);
        this.mouseDownHandler = () => this.mouseDown();
        this.visibilityChangeHandler = () => this.handleVisibilityChange();
        this.themeChangeHandler = t => this.handleThemeChange(t);
        this.oldThemeChangeHandler = t => this.handleThemeChange(t);
        this.resizeHandler = () => this.handleWindowResize()
    }
    addListeners() {
        this.manageListeners(true)
    }
    removeListeners() {
        this.manageListeners(false)
    }
    doMouseTouchClick(t) {
        const e = this.container,
            i = e.actualOptions;
        if (this.canPush) {
            const t = e.interactivity.mouse.position;
            if (!t) return;
            e.interactivity.mouse.clickPosition = {
                x: t.x,
                y: t.y
            };
            e.interactivity.mouse.clickTime = (new Date).getTime();
            const s = i.interactivity.events.onClick;
            if (s.mode instanceof Array)
                for (const t of s.mode) this.handleClickMode(t);
            else this.handleClickMode(s.mode)
        }
        "touchend" === t.type && setTimeout((() => this.mouseTouchFinish()), 500)
    }
    handleClickMode(t) {
        this.container.handleClickMode(t)
    }
    handleThemeChange(t) {
        const e = t,
            i = e.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme,
            s = this.container.options.themes.find((t => t.name === i));
        s && s.default.auto && this.container.loadTheme(i)
    }
    handleVisibilityChange() {
        const t = this.container,
            e = t.actualOptions;
        this.mouseTouchFinish();
        if (e.pauseOnBlur)
            if (null === document || void 0 === document ? void 0 : document.hidden) {
                t.pageHidden = true;
                t.pause()
            } else {
                t.pageHidden = false;
                t.getAnimationStatus() ? t.play(true) : t.draw(true)
            }
    }
    handleWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
            delete this.resizeTimeout
        }
        this.resizeTimeout = setTimeout((async () => {
            var t;
            return null === (t = this.container.canvas) || void 0 === t ? void 0 : t.windowResize()
        }), 500)
    }
    manageListeners(t) {
        var e;
        const i = this.container,
            s = i.actualOptions,
            o = s.interactivity.detectsOn;
        let a = p;
        if ("window" === o) {
            i.interactivity.element = window;
            a = v
        } else if ("parent" === o && i.canvas.element) {
            const t = i.canvas.element;
            i.interactivity.element = null !== (e = t.parentElement) && void 0 !== e ? e : t.parentNode
        } else i.interactivity.element = i.canvas.element;
        const n = !isSsr() && "undefined" !== typeof matchMedia && matchMedia("(prefers-color-scheme: dark)");
        n && (void 0 !== n.addEventListener ? manageListener(n, "change", this.themeChangeHandler, t) : void 0 !== n.addListener && (t ? n.addListener(this.oldThemeChangeHandler) : n.removeListener(this.oldThemeChangeHandler)));
        const r = i.interactivity.element;
        if (!r) return;
        const w = r;
        if (s.interactivity.events.onHover.enable || s.interactivity.events.onClick.enable) {
            manageListener(r, d, this.mouseMoveHandler, t);
            manageListener(r, u, this.touchStartHandler, t);
            manageListener(r, f, this.touchMoveHandler, t);
            if (s.interactivity.events.onClick.enable) {
                manageListener(r, l, this.touchEndClickHandler, t);
                manageListener(r, h, this.mouseUpHandler, t);
                manageListener(r, c, this.mouseDownHandler, t)
            } else manageListener(r, l, this.touchEndHandler, t);
            manageListener(r, a, this.mouseLeaveHandler, t);
            manageListener(r, m, this.touchCancelHandler, t)
        }
        i.canvas.element && (i.canvas.element.style.pointerEvents = w === i.canvas.element ? "initial" : "none");
        if (s.interactivity.events.resize)
            if ("undefined" !== typeof ResizeObserver) {
                if (this.resizeObserver && !t) {
                    i.canvas.element && this.resizeObserver.unobserve(i.canvas.element);
                    this.resizeObserver.disconnect();
                    delete this.resizeObserver
                } else if (!this.resizeObserver && t && i.canvas.element) {
                    this.resizeObserver = new ResizeObserver((t => {
                        const e = t.find((t => t.target === i.canvas.element));
                        e && this.handleWindowResize()
                    }));
                    this.resizeObserver.observe(i.canvas.element)
                }
            } else manageListener(window, g, this.resizeHandler, t);
        document && manageListener(document, y, this.visibilityChangeHandler, t, false)
    }
    mouseDown() {
        const t = this.container.interactivity;
        if (t) {
            const e = t.mouse;
            e.clicking = true;
            e.downPosition = e.position
        }
    }
    mouseTouchClick(t) {
        const e = this.container,
            i = e.actualOptions,
            s = e.interactivity.mouse;
        s.inside = true;
        let o = false;
        const a = s.position;
        if (a && i.interactivity.events.onClick.enable) {
            for (const [, t] of e.plugins)
                if (t.clickPositionValid) {
                    o = t.clickPositionValid(a);
                    if (o) break
                }
            o || this.doMouseTouchClick(t);
            s.clicking = false
        }
    }
    mouseTouchFinish() {
        const t = this.container.interactivity;
        if (!t) return;
        const e = t.mouse;
        delete e.position;
        delete e.clickPosition;
        delete e.downPosition;
        t.status = p;
        e.inside = false;
        e.clicking = false
    }
    mouseTouchMove(t) {
        var e, i, s, o, a, n, r;
        const l = this.container,
            c = l.actualOptions;
        if (!(null === (e = l.interactivity) || void 0 === e ? void 0 : e.element)) return;
        l.interactivity.mouse.inside = true;
        let h;
        const u = l.canvas.element;
        if (t.type.startsWith("pointer")) {
            this.canPush = true;
            const e = t;
            if (l.interactivity.element === window) {
                if (u) {
                    const t = u.getBoundingClientRect();
                    h = {
                        x: e.clientX - t.left,
                        y: e.clientY - t.top
                    }
                }
            } else if ("parent" === c.interactivity.detectsOn) {
                const t = e.target;
                const o = e.currentTarget;
                const a = l.canvas.element;
                if (t && o && a) {
                    const i = t.getBoundingClientRect();
                    const s = o.getBoundingClientRect();
                    const n = a.getBoundingClientRect();
                    h = {
                        x: e.offsetX + 2 * i.left - (s.left + n.left),
                        y: e.offsetY + 2 * i.top - (s.top + n.top)
                    }
                } else h = {
                    x: null !== (i = e.offsetX) && void 0 !== i ? i : e.clientX,
                    y: null !== (s = e.offsetY) && void 0 !== s ? s : e.clientY
                }
            } else e.target === l.canvas.element && (h = {
                x: null !== (o = e.offsetX) && void 0 !== o ? o : e.clientX,
                y: null !== (a = e.offsetY) && void 0 !== a ? a : e.clientY
            })
        } else {
            this.canPush = "touchmove" !== t.type;
            const e = t;
            const i = e.touches[e.touches.length - 1];
            const s = null === u || void 0 === u ? void 0 : u.getBoundingClientRect();
            h = {
                x: i.clientX - (null !== (n = null === s || void 0 === s ? void 0 : s.left) && void 0 !== n ? n : 0),
                y: i.clientY - (null !== (r = null === s || void 0 === s ? void 0 : s.top) && void 0 !== r ? r : 0)
            }
        }
        const f = l.retina.pixelRatio;
        if (h) {
            h.x *= f;
            h.y *= f
        }
        l.interactivity.mouse.position = h;
        l.interactivity.status = d
    }
}
class FrameManager {
    constructor(t) {
        this.container = t
    }
    async nextFrame(t) {
        var e;
        try {
            const i = this.container;
            if (void 0 !== i.lastFrameTime && t < i.lastFrameTime + 1e3 / i.fpsLimit) {
                i.draw(false);
                return
            }
            null !== (e = i.lastFrameTime) && void 0 !== e ? e : i.lastFrameTime = t;
            const s = t - i.lastFrameTime,
                o = {
                    value: s,
                    factor: 60 * s / 1e3
                };
            i.lifeTime += o.value;
            i.lastFrameTime = t;
            if (s > 1e3) {
                i.draw(false);
                return
            }
            await i.particles.draw(o);
            if (i.duration > 0 && i.lifeTime > i.duration) {
                i.destroy();
                return
            }
            i.getAnimationStatus() && i.draw(false)
        } catch (t) {
            console.error("tsParticles error in animation loop", t)
        }
    }
}
class OptionsColor {
    constructor() {
        this.value = ""
    }
    static create(t, e) {
        const i = new OptionsColor;
        i.load(t);
        void 0 !== e && ("string" === typeof e || e instanceof Array ? i.load({
            value: e
        }) : i.load(e));
        return i
    }
    load(t) {
        void 0 !== (null === t || void 0 === t ? void 0 : t.value) && (this.value = t.value)
    }
}
class Background {
    constructor() {
        this.color = new OptionsColor;
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1
    }
    load(t) {
        if (t) {
            void 0 !== t.color && (this.color = OptionsColor.create(this.color, t.color));
            void 0 !== t.image && (this.image = t.image);
            void 0 !== t.position && (this.position = t.position);
            void 0 !== t.repeat && (this.repeat = t.repeat);
            void 0 !== t.size && (this.size = t.size);
            void 0 !== t.opacity && (this.opacity = t.opacity)
        }
    }
}
class BackgroundMaskCover {
    constructor() {
        this.color = new OptionsColor;
        this.color.value = "#fff";
        this.opacity = 1
    }
    load(t) {
        if (t) {
            void 0 !== t.color && (this.color = OptionsColor.create(this.color, t.color));
            void 0 !== t.opacity && (this.opacity = t.opacity)
        }
    }
}
class BackgroundMask {
    constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover;
        this.enable = false
    }
    load(t) {
        if (t) {
            void 0 !== t.composite && (this.composite = t.composite);
            if (void 0 !== t.cover) {
                const e = t.cover;
                const i = "string" === typeof t.cover ? {
                    color: t.cover
                } : t.cover;
                this.cover.load(void 0 !== e.color ? e : {
                    color: i
                })
            }
            void 0 !== t.enable && (this.enable = t.enable)
        }
    }
}
class FullScreen {
    constructor() {
        this.enable = true;
        this.zIndex = 0
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.zIndex && (this.zIndex = t.zIndex)
        }
    }
}
class ClickEvent {
    constructor() {
        this.enable = false;
        this.mode = []
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.mode && (this.mode = t.mode)
        }
    }
}
class DivEvent {
    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = "circle"
    }
    get el() {
        return this.elementId
    }
    set el(t) {
        this.elementId = t
    }
    get elementId() {
        return this.ids
    }
    set elementId(t) {
        this.ids = t
    }
    get ids() {
        return this.selectors instanceof Array ? this.selectors.map((t => t.replace("#", ""))) : this.selectors.replace("#", "")
    }
    set ids(t) {
        this.selectors = t instanceof Array ? t.map((t => `#${t}`)) : `#${t}`
    }
    load(t) {
        var e, i;
        if (!t) return;
        const s = null !== (i = null !== (e = t.ids) && void 0 !== e ? e : t.elementId) && void 0 !== i ? i : t.el;
        void 0 !== s && (this.ids = s);
        void 0 !== t.selectors && (this.selectors = t.selectors);
        void 0 !== t.enable && (this.enable = t.enable);
        void 0 !== t.mode && (this.mode = t.mode);
        void 0 !== t.type && (this.type = t.type)
    }
}
class Parallax {
    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.force && (this.force = t.force);
            void 0 !== t.smooth && (this.smooth = t.smooth)
        }
    }
}
class HoverEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new Parallax
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.mode && (this.mode = t.mode);
            this.parallax.load(t.parallax)
        }
    }
}
class Events {
    constructor() {
        this.onClick = new ClickEvent;
        this.onDiv = new DivEvent;
        this.onHover = new HoverEvent;
        this.resize = true
    }
    get onclick() {
        return this.onClick
    }
    set onclick(t) {
        this.onClick = t
    }
    get ondiv() {
        return this.onDiv
    }
    set ondiv(t) {
        this.onDiv = t
    }
    get onhover() {
        return this.onHover
    }
    set onhover(t) {
        this.onHover = t
    }
    load(t) {
        var e, i, s;
        if (!t) return;
        this.onClick.load(null !== (e = t.onClick) && void 0 !== e ? e : t.onclick);
        const o = null !== (i = t.onDiv) && void 0 !== i ? i : t.ondiv;
        if (void 0 !== o)
            if (o instanceof Array) this.onDiv = o.map((t => {
                const e = new DivEvent;
                e.load(t);
                return e
            }));
            else {
                this.onDiv = new DivEvent;
                this.onDiv.load(o)
            }
        this.onHover.load(null !== (s = t.onHover) && void 0 !== s ? s : t.onhover);
        void 0 !== t.resize && (this.resize = t.resize)
    }
}
class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200
    }
    load(t) {
        if (t) {
            void 0 !== t.factor && (this.factor = t.factor);
            void 0 !== t.radius && (this.radius = t.radius)
        }
    }
}
var T = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var S = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var E, O;
class Modes {
    constructor(t, e) {
        E.set(this, void 0);
        O.set(this, void 0);
        T(this, O, t, "f");
        T(this, E, e, "f");
        this.slow = new Slow
    }
    load(t) {
        if (t) {
            this.slow.load(t.slow);
            if (S(this, E, "f")) {
                const e = S(this, O, "f").plugins.interactors.get(S(this, E, "f"));
                if (e)
                    for (const i of e) i.loadModeOptions && i.loadModeOptions(this, t)
            }
        }
    }
}
E = new WeakMap, O = new WeakMap;
var V = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var A, I;
class Interactivity {
    constructor(t, e) {
        A.set(this, void 0);
        I.set(this, void 0);
        V(this, I, t, "f");
        V(this, A, e, "f");
        this.detectsOn = "window";
        this.events = new Events;
        this.modes = new Modes(t, e)
    }
    get detect_on() {
        return this.detectsOn
    }
    set detect_on(t) {
        this.detectsOn = t
    }
    load(t) {
        var e;
        if (!t) return;
        const i = null !== (e = t.detectsOn) && void 0 !== e ? e : t.detect_on;
        void 0 !== i && (this.detectsOn = i);
        this.events.load(t.events);
        this.modes.load(t.modes)
    }
}
A = new WeakMap, I = new WeakMap;
class ManualParticle {
    load(t) {
        var e, i;
        if (t) {
            void 0 !== t.position && (this.position = {
                x: null !== (e = t.position.x) && void 0 !== e ? e : 50,
                y: null !== (i = t.position.y) && void 0 !== i ? i : 50
            });
            void 0 !== t.options && (this.options = deepExtend({}, t.options))
        }
    }
}
class MotionReduce {
    constructor() {
        this.factor = 4;
        this.value = true
    }
    load(t) {
        if (t) {
            void 0 !== t.factor && (this.factor = t.factor);
            void 0 !== t.value && (this.value = t.value)
        }
    }
}
class Motion {
    constructor() {
        this.disable = false;
        this.reduce = new MotionReduce
    }
    load(t) {
        if (t) {
            void 0 !== t.disable && (this.disable = t.disable);
            this.reduce.load(t.reduce)
        }
    }
}
class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas"
    }
    load(t) {
        if (t) {
            void 0 !== t.maxWidth && (this.maxWidth = t.maxWidth);
            void 0 !== t.mode && ("screen" === t.mode ? this.mode = "screen" : this.mode = "canvas");
            void 0 !== t.options && (this.options = deepExtend({}, t.options))
        }
    }
}
class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = "any";
        this.value = false
    }
    load(t) {
        if (t) {
            void 0 !== t.auto && (this.auto = t.auto);
            void 0 !== t.mode && (this.mode = t.mode);
            void 0 !== t.value && (this.value = t.value)
        }
    }
}
class Theme {
    constructor() {
        this.name = "";
        this.default = new ThemeDefault
    }
    load(t) {
        if (t) {
            void 0 !== t.name && (this.name = t.name);
            this.default.load(t.default);
            void 0 !== t.options && (this.options = deepExtend({}, t.options))
        }
    }
}
class ColorAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.decay = 0;
        this.sync = true
    }
    load(t) {
        if (t) {
            void 0 !== t.count && (this.count = setRangeValue(t.count));
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.offset && (this.offset = setRangeValue(t.offset));
            void 0 !== t.speed && (this.speed = setRangeValue(t.speed));
            void 0 !== t.decay && (this.decay = setRangeValue(t.decay));
            void 0 !== t.sync && (this.sync = t.sync)
        }
    }
}
class HslAnimation {
    constructor() {
        this.h = new ColorAnimation;
        this.s = new ColorAnimation;
        this.l = new ColorAnimation
    }
    load(t) {
        if (t) {
            this.h.load(t.h);
            this.s.load(t.s);
            this.l.load(t.l)
        }
    }
}
class AnimatableColor extends OptionsColor {
    constructor() {
        super();
        this.animation = new HslAnimation
    }
    static create(t, e) {
        const i = new AnimatableColor;
        i.load(t);
        void 0 !== e && ("string" === typeof e || e instanceof Array ? i.load({
            value: e
        }) : i.load(e));
        return i
    }
    load(t) {
        super.load(t);
        if (!t) return;
        const e = t.animation;
        void 0 !== e && (void 0 !== e.enable ? this.animation.h.load(e) : this.animation.load(t.animation))
    }
}
class CollisionsOverlap {
    constructor() {
        this.enable = true;
        this.retries = 0
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.retries && (this.retries = t.retries)
        }
    }
}
class Random {
    constructor() {
        this.enable = false;
        this.minimumValue = 0
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.minimumValue && (this.minimumValue = t.minimumValue)
        }
    }
}
class ValueWithRandom {
    constructor() {
        this.random = new Random;
        this.value = 0
    }
    load(t) {
        if (t) {
            "boolean" === typeof t.random ? this.random.enable = t.random : this.random.load(t.random);
            void 0 !== t.value && (this.value = setRangeValue(t.value, this.random.enable ? this.random.minimumValue : void 0))
        }
    }
}
class ParticlesBounceFactor extends ValueWithRandom {
    constructor() {
        super();
        this.random.minimumValue = .1;
        this.value = 1
    }
}
class ParticlesBounce {
    constructor() {
        this.horizontal = new ParticlesBounceFactor;
        this.vertical = new ParticlesBounceFactor
    }
    load(t) {
        if (t) {
            this.horizontal.load(t.horizontal);
            this.vertical.load(t.vertical)
        }
    }
}
class Collisions {
    constructor() {
        this.bounce = new ParticlesBounce;
        this.enable = false;
        this.mode = "bounce";
        this.overlap = new CollisionsOverlap
    }
    load(t) {
        if (t) {
            this.bounce.load(t.bounce);
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.mode && (this.mode = t.mode);
            this.overlap.load(t.overlap)
        }
    }
}
class SplitFactor extends ValueWithRandom {
    constructor() {
        super();
        this.value = 3
    }
}
class SplitRate extends ValueWithRandom {
    constructor() {
        super();
        this.value = {
            min: 4,
            max: 9
        }
    }
}
class Split {
    constructor() {
        this.count = 1;
        this.factor = new SplitFactor;
        this.rate = new SplitRate;
        this.sizeOffset = true
    }
    load(t) {
        if (t) {
            void 0 !== t.count && (this.count = t.count);
            this.factor.load(t.factor);
            this.rate.load(t.rate);
            void 0 !== t.particles && (t.particles instanceof Array ? this.particles = t.particles.map((t => deepExtend({}, t))) : this.particles = deepExtend({}, t.particles));
            void 0 !== t.sizeOffset && (this.sizeOffset = t.sizeOffset)
        }
    }
}
class Destroy {
    constructor() {
        this.mode = "none";
        this.split = new Split
    }
    load(t) {
        if (t) {
            void 0 !== t.mode && (this.mode = t.mode);
            this.split.load(t.split)
        }
    }
}
class MoveAngle {
    constructor() {
        this.offset = 0;
        this.value = 90
    }
    load(t) {
        if (t) {
            void 0 !== t.offset && (this.offset = setRangeValue(t.offset));
            void 0 !== t.value && (this.value = setRangeValue(t.value))
        }
    }
}
class MoveAttract {
    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3e3,
            y: 3e3
        }
    }
    get rotateX() {
        return this.rotate.x
    }
    set rotateX(t) {
        this.rotate.x = t
    }
    get rotateY() {
        return this.rotate.y
    }
    set rotateY(t) {
        this.rotate.y = t
    }
    load(t) {
        var e, i, s, o;
        if (!t) return;
        void 0 !== t.distance && (this.distance = setRangeValue(t.distance));
        void 0 !== t.enable && (this.enable = t.enable);
        const a = null !== (i = null === (e = t.rotate) || void 0 === e ? void 0 : e.x) && void 0 !== i ? i : t.rotateX;
        void 0 !== a && (this.rotate.x = a);
        const n = null !== (o = null === (s = t.rotate) || void 0 === s ? void 0 : s.y) && void 0 !== o ? o : t.rotateY;
        void 0 !== n && (this.rotate.y = n)
    }
}
class MoveGravity {
    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
        this.maxSpeed = 50
    }
    load(t) {
        if (t) {
            void 0 !== t.acceleration && (this.acceleration = setRangeValue(t.acceleration));
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.inverse && (this.inverse = t.inverse);
            void 0 !== t.maxSpeed && (this.maxSpeed = setRangeValue(t.maxSpeed))
        }
    }
}
class MovePathDelay extends ValueWithRandom {
    constructor() {
        super()
    }
}
class MovePath {
    constructor() {
        this.clamp = true;
        this.delay = new MovePathDelay;
        this.enable = false;
        this.options = {}
    }
    load(t) {
        if (t) {
            void 0 !== t.clamp && (this.clamp = t.clamp);
            this.delay.load(t.delay);
            void 0 !== t.enable && (this.enable = t.enable);
            this.generator = t.generator;
            t.options && (this.options = deepExtend(this.options, t.options))
        }
    }
}
class MoveTrail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor;
        this.fillColor.value = "#000000"
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            this.fillColor = OptionsColor.create(this.fillColor, t.fillColor);
            void 0 !== t.length && (this.length = t.length)
        }
    }
}
class OutModes {
    constructor() {
        this.default = "out"
    }
    load(t) {
        var e, i, s, o;
        if (t) {
            void 0 !== t.default && (this.default = t.default);
            this.bottom = null !== (e = t.bottom) && void 0 !== e ? e : t.default;
            this.left = null !== (i = t.left) && void 0 !== i ? i : t.default;
            this.right = null !== (s = t.right) && void 0 !== s ? s : t.default;
            this.top = null !== (o = t.top) && void 0 !== o ? o : t.default
        }
    }
}
class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false
    }
    load(t) {
        if (t) {
            void 0 !== t.acceleration && (this.acceleration = setRangeValue(t.acceleration));
            void 0 !== t.enable && (this.enable = t.enable);
            this.position = t.position ? deepExtend({}, t.position) : void 0
        }
    }
}
class Move {
    constructor() {
        this.angle = new MoveAngle;
        this.attract = new MoveAttract;
        this.center = {
            x: 50,
            y: 50,
            radius: 0
        };
        this.decay = 0;
        this.distance = {};
        this.direction = "none";
        this.drift = 0;
        this.enable = false;
        this.gravity = new MoveGravity;
        this.path = new MovePath;
        this.outModes = new OutModes;
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new Spin;
        this.straight = false;
        this.trail = new MoveTrail;
        this.vibrate = false;
        this.warp = false
    }
    get bounce() {
        return this.collisions
    }
    set bounce(t) {
        this.collisions = t
    }
    get collisions() {
        return false
    }
    set collisions(t) {}
    get noise() {
        return this.path
    }
    set noise(t) {
        this.path = t
    }
    get outMode() {
        return this.outModes.default
    }
    set outMode(t) {
        this.outModes.default = t
    }
    get out_mode() {
        return this.outMode
    }
    set out_mode(t) {
        this.outMode = t
    }
    load(t) {
        var e, i, s;
        if (!t) return;
        void 0 !== t.angle && ("number" === typeof t.angle ? this.angle.value = t.angle : this.angle.load(t.angle));
        this.attract.load(t.attract);
        this.center = deepExtend(this.center, t.center);
        void 0 !== t.decay && (this.decay = t.decay);
        void 0 !== t.direction && (this.direction = t.direction);
        void 0 !== t.distance && (this.distance = "number" === typeof t.distance ? {
            horizontal: t.distance,
            vertical: t.distance
        } : deepExtend({}, t.distance));
        void 0 !== t.drift && (this.drift = setRangeValue(t.drift));
        void 0 !== t.enable && (this.enable = t.enable);
        this.gravity.load(t.gravity);
        const o = null !== (e = t.outMode) && void 0 !== e ? e : t.out_mode;
        void 0 === t.outModes && void 0 === o || ("string" === typeof t.outModes || void 0 === t.outModes && void 0 !== o ? this.outModes.load({
            default: null !== (i = t.outModes) && void 0 !== i ? i : o
        }) : this.outModes.load(t.outModes));
        this.path.load(null !== (s = t.path) && void 0 !== s ? s : t.noise);
        void 0 !== t.random && (this.random = t.random);
        void 0 !== t.size && (this.size = t.size);
        void 0 !== t.speed && (this.speed = setRangeValue(t.speed));
        this.spin.load(t.spin);
        void 0 !== t.straight && (this.straight = t.straight);
        this.trail.load(t.trail);
        void 0 !== t.vibrate && (this.vibrate = t.vibrate);
        void 0 !== t.warp && (this.warp = t.warp)
    }
}
class AnimationOptions {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.sync = false
    }
    load(t) {
        if (t) {
            void 0 !== t.count && (this.count = setRangeValue(t.count));
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.speed && (this.speed = setRangeValue(t.speed));
            void 0 !== t.decay && (this.decay = setRangeValue(t.decay));
            void 0 !== t.sync && (this.sync = t.sync)
        }
    }
}
class OpacityAnimation extends AnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 2;
        this.startValue = "random";
        this.sync = false
    }
    get opacity_min() {
        return this.minimumValue
    }
    set opacity_min(t) {
        this.minimumValue = t
    }
    load(t) {
        var e;
        if (t) {
            super.load(t);
            void 0 !== t.destroy && (this.destroy = t.destroy);
            void 0 !== t.enable && (this.enable = t.enable);
            this.minimumValue = null !== (e = t.minimumValue) && void 0 !== e ? e : t.opacity_min;
            void 0 !== t.speed && (this.speed = t.speed);
            void 0 !== t.startValue && (this.startValue = t.startValue);
            void 0 !== t.sync && (this.sync = t.sync)
        }
    }
}
class Opacity extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new OpacityAnimation;
        this.random.minimumValue = .1;
        this.value = 1
    }
    get anim() {
        return this.animation
    }
    set anim(t) {
        this.animation = t
    }
    load(t) {
        var e;
        if (!t) return;
        super.load(t);
        const i = null !== (e = t.animation) && void 0 !== e ? e : t.anim;
        if (void 0 !== i) {
            this.animation.load(i);
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : void 0)
        }
    }
}
class ParticlesDensity {
    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1e3
    }
    get value_area() {
        return this.area
    }
    set value_area(t) {
        this.area = t
    }
    load(t) {
        var e;
        if (!t) return;
        void 0 !== t.enable && (this.enable = t.enable);
        const i = null !== (e = t.area) && void 0 !== e ? e : t.value_area;
        void 0 !== i && (this.area = i);
        void 0 !== t.factor && (this.factor = t.factor)
    }
}
class ParticlesNumber {
    constructor() {
        this.density = new ParticlesDensity;
        this.limit = 0;
        this.value = 100
    }
    get max() {
        return this.limit
    }
    set max(t) {
        this.limit = t
    }
    load(t) {
        var e;
        if (!t) return;
        this.density.load(t.density);
        const i = null !== (e = t.limit) && void 0 !== e ? e : t.max;
        void 0 !== i && (this.limit = i);
        void 0 !== t.value && (this.value = t.value)
    }
}
class RotateAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false
    }
    load(t) {
        if (t) {
            void 0 !== t.enable && (this.enable = t.enable);
            void 0 !== t.speed && (this.speed = setRangeValue(t.speed));
            void 0 !== t.decay && (this.decay = setRangeValue(t.decay));
            void 0 !== t.sync && (this.sync = t.sync)
        }
    }
}
class Rotate extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new RotateAnimation;
        this.direction = "clockwise";
        this.path = false;
        this.value = 0
    }
    load(t) {
        if (t) {
            super.load(t);
            void 0 !== t.direction && (this.direction = t.direction);
            this.animation.load(t.animation);
            void 0 !== t.path && (this.path = t.path)
        }
    }
}
class Shadow {
    constructor() {
        this.blur = 0;
        this.color = new OptionsColor;
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0
        };
        this.color.value = "#000"
    }
    load(t) {
        if (t) {
            void 0 !== t.blur && (this.blur = t.blur);
            this.color = OptionsColor.create(this.color, t.color);
            void 0 !== t.enable && (this.enable = t.enable);
            if (void 0 !== t.offset) {
                void 0 !== t.offset.x && (this.offset.x = t.offset.x);
                void 0 !== t.offset.y && (this.offset.y = t.offset.y)
            }
        }
    }
}
class Shape {
    constructor() {
        this.options = {};
        this.type = "circle"
    }
    get character() {
        var t;
        return null !== (t = this.options.character) && void 0 !== t ? t : this.options.char
    }
    set character(t) {
        this.options.character = t;
        this.options.char = t
    }
    get custom() {
        return this.options
    }
    set custom(t) {
        this.options = t
    }
    get image() {
        var t;
        return null !== (t = this.options.image) && void 0 !== t ? t : this.options.images
    }
    set image(t) {
        this.options.image = t;
        this.options.images = t
    }
    get images() {
        return this.image
    }
    set images(t) {
        this.image = t
    }
    get polygon() {
        var t;
        return null !== (t = this.options.polygon) && void 0 !== t ? t : this.options.star
    }
    set polygon(t) {
        this.options.polygon = t;
        this.options.star = t
    }
    get stroke() {
        return []
    }
    set stroke(t) {}
    load(t) {
        var e, i, s;
        if (!t) return;
        const o = null !== (e = t.options) && void 0 !== e ? e : t.custom;
        if (void 0 !== o)
            for (const t in o) {
                const e = o[t];
                e && (this.options[t] = deepExtend(null !== (i = this.options[t]) && void 0 !== i ? i : {}, e))
            }
        this.loadShape(t.character, "character", "char", true);
        this.loadShape(t.polygon, "polygon", "star", false);
        this.loadShape(null !== (s = t.image) && void 0 !== s ? s : t.images, "image", "images", true);
        void 0 !== t.type && (this.type = t.type)
    }
    loadShape(t, e, i, s) {
        var o, a;
        if (!t) return;
        const n = t instanceof Array ? [] : {},
            r = t instanceof Array !== this.options[e] instanceof Array,
            l = t instanceof Array !== this.options[i] instanceof Array;
        r && (this.options[e] = n);
        l && s && (this.options[i] = n);
        this.options[e] = deepExtend(null !== (o = this.options[e]) && void 0 !== o ? o : n, t);
        this.options[i] && !s || (this.options[i] = deepExtend(null !== (a = this.options[i]) && void 0 !== a ? a : n, t))
    }
}
class SizeAnimation extends AnimationOptions {
    constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 5;
        this.startValue = "random";
        this.sync = false
    }
    get size_min() {
        return this.minimumValue
    }
    set size_min(t) {
        this.minimumValue = t
    }
    load(t) {
        var e;
        super.load(t);
        if (t) {
            void 0 !== t.destroy && (this.destroy = t.destroy);
            void 0 !== t.enable && (this.enable = t.enable);
            this.minimumValue = null !== (e = t.minimumValue) && void 0 !== e ? e : t.size_min;
            void 0 !== t.speed && (this.speed = t.speed);
            void 0 !== t.startValue && (this.startValue = t.startValue);
            void 0 !== t.sync && (this.sync = t.sync)
        }
    }
}
class Size extends ValueWithRandom {
    constructor() {
        super();
        this.animation = new SizeAnimation;
        this.random.minimumValue = 1;
        this.value = 3
    }
    get anim() {
        return this.animation
    }
    set anim(t) {
        this.animation = t
    }
    load(t) {
        var e;
        super.load(t);
        if (!t) return;
        const i = null !== (e = t.animation) && void 0 !== e ? e : t.anim;
        if (void 0 !== i) {
            this.animation.load(i);
            this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : void 0)
        }
    }
}
class Stroke {
    constructor() {
        this.width = 0
    }
    load(t) {
        if (t) {
            void 0 !== t.color && (this.color = AnimatableColor.create(this.color, t.color));
            void 0 !== t.width && (this.width = t.width);
            void 0 !== t.opacity && (this.opacity = t.opacity)
        }
    }
}
class ZIndex extends ValueWithRandom {
    constructor() {
        super();
        this.opacityRate = 1;
        this.sizeRate = 1;
        this.velocityRate = 1
    }
    load(t) {
        super.load(t);
        if (t) {
            void 0 !== t.opacityRate && (this.opacityRate = t.opacityRate);
            void 0 !== t.sizeRate && (this.sizeRate = t.sizeRate);
            void 0 !== t.velocityRate && (this.velocityRate = t.velocityRate)
        }
    }
}
var F = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var D = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var L, H;
class ParticlesOptions {
    constructor(t, e) {
        L.set(this, void 0);
        H.set(this, void 0);
        F(this, H, t, "f");
        F(this, L, e, "f");
        this.bounce = new ParticlesBounce;
        this.collisions = new Collisions;
        this.color = new AnimatableColor;
        this.color.value = "#fff";
        this.destroy = new Destroy;
        this.groups = {};
        this.move = new Move;
        this.number = new ParticlesNumber;
        this.opacity = new Opacity;
        this.reduceDuplicates = false;
        this.rotate = new Rotate;
        this.shadow = new Shadow;
        this.shape = new Shape;
        this.size = new Size;
        this.stroke = new Stroke;
        this.zIndex = new ZIndex
    }
    load(t) {
        var e, i, s, o, a, n;
        if (!t) return;
        this.bounce.load(t.bounce);
        this.color.load(AnimatableColor.create(this.color, t.color));
        this.destroy.load(t.destroy);
        if (void 0 !== t.groups)
            for (const i in t.groups) {
                const s = t.groups[i];
                void 0 !== s && (this.groups[i] = deepExtend(null !== (e = this.groups[i]) && void 0 !== e ? e : {}, s))
            }
        this.move.load(t.move);
        this.number.load(t.number);
        this.opacity.load(t.opacity);
        void 0 !== t.reduceDuplicates && (this.reduceDuplicates = t.reduceDuplicates);
        this.rotate.load(t.rotate);
        this.shape.load(t.shape);
        this.size.load(t.size);
        this.shadow.load(t.shadow);
        this.zIndex.load(t.zIndex);
        const r = null !== (s = null === (i = t.move) || void 0 === i ? void 0 : i.collisions) && void 0 !== s ? s : null === (o = t.move) || void 0 === o ? void 0 : o.bounce;
        void 0 !== r && (this.collisions.enable = r);
        this.collisions.load(t.collisions);
        void 0 !== t.interactivity && (this.interactivity = deepExtend({}, t.interactivity));
        const l = null !== (a = t.stroke) && void 0 !== a ? a : null === (n = t.shape) || void 0 === n ? void 0 : n.stroke;
        if (l)
            if (l instanceof Array) this.stroke = l.map((t => {
                const e = new Stroke;
                e.load(t);
                return e
            }));
            else {
                this.stroke instanceof Array && (this.stroke = new Stroke);
                this.stroke.load(l)
            }
        if (D(this, L, "f")) {
            const e = D(this, H, "f").plugins.updaters.get(D(this, L, "f"));
            if (e)
                for (const i of e) i.loadOptions && i.loadOptions(this, t);
            const i = D(this, H, "f").plugins.interactors.get(D(this, L, "f"));
            if (i)
                for (const e of i) e.loadParticlesOptions && e.loadParticlesOptions(this, t)
        }
    }
}
L = new WeakMap, H = new WeakMap;

function loadOptions(t, ...e) {
    for (const i of e) t.load(i)
}

function loadParticlesOptions(t, e, ...i) {
    const s = new ParticlesOptions(t, e);
    loadOptions(s, ...i);
    return s
}
var W = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var B = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var q, j, _, G;
class Options {
    constructor(t, e) {
        q.add(this);
        j.set(this, void 0);
        _.set(this, void 0);
        W(this, _, t, "f");
        W(this, j, e, "f");
        this.autoPlay = true;
        this.background = new Background;
        this.backgroundMask = new BackgroundMask;
        this.fullScreen = new FullScreen;
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity(t, e);
        this.manualParticles = [];
        this.motion = new Motion;
        this.particles = loadParticlesOptions(B(this, _, "f"), B(this, j, "f"));
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.style = {};
        this.themes = [];
        this.zLayers = 100
    }
    get backgroundMode() {
        return this.fullScreen
    }
    set backgroundMode(t) {
        this.fullScreen.load(t)
    }
    get fps_limit() {
        return this.fpsLimit
    }
    set fps_limit(t) {
        this.fpsLimit = t
    }
    get retina_detect() {
        return this.detectRetina
    }
    set retina_detect(t) {
        this.detectRetina = t
    }
    load(t) {
        var e, i, s, o, a;
        if (!t) return;
        if (void 0 !== t.preset)
            if (t.preset instanceof Array)
                for (const e of t.preset) this.importPreset(e);
            else this.importPreset(t.preset);
        void 0 !== t.autoPlay && (this.autoPlay = t.autoPlay);
        const n = null !== (e = t.detectRetina) && void 0 !== e ? e : t.retina_detect;
        void 0 !== n && (this.detectRetina = n);
        void 0 !== t.duration && (this.duration = t.duration);
        const r = null !== (i = t.fpsLimit) && void 0 !== i ? i : t.fps_limit;
        void 0 !== r && (this.fpsLimit = r);
        void 0 !== t.pauseOnBlur && (this.pauseOnBlur = t.pauseOnBlur);
        void 0 !== t.pauseOnOutsideViewport && (this.pauseOnOutsideViewport = t.pauseOnOutsideViewport);
        void 0 !== t.zLayers && (this.zLayers = t.zLayers);
        this.background.load(t.background);
        const l = null !== (s = t.fullScreen) && void 0 !== s ? s : t.backgroundMode;
        "boolean" === typeof l ? this.fullScreen.enable = l : this.fullScreen.load(l);
        this.backgroundMask.load(t.backgroundMask);
        this.interactivity.load(t.interactivity);
        void 0 !== t.manualParticles && (this.manualParticles = t.manualParticles.map((t => {
            const e = new ManualParticle;
            e.load(t);
            return e
        })));
        this.motion.load(t.motion);
        this.particles.load(t.particles);
        this.style = deepExtend(this.style, t.style);
        B(this, _, "f").plugins.loadOptions(this, t);
        const c = B(this, _, "f").plugins.interactors.get(B(this, j, "f"));
        if (c)
            for (const e of c) e.loadOptions && e.loadOptions(this, t);
        if (void 0 !== t.responsive)
            for (const e of t.responsive) {
                const t = new Responsive;
                t.load(e);
                this.responsive.push(t)
            }
        this.responsive.sort(((t, e) => t.maxWidth - e.maxWidth));
        if (void 0 !== t.themes)
            for (const e of t.themes) {
                const t = new Theme;
                t.load(e);
                this.themes.push(t)
            }
        this.defaultDarkTheme = null === (o = B(this, q, "m", G).call(this, "dark")) || void 0 === o ? void 0 : o.name;
        this.defaultLightTheme = null === (a = B(this, q, "m", G).call(this, "light")) || void 0 === a ? void 0 : a.name
    }
    setResponsive(t, e, i) {
        this.load(i);
        const s = this.responsive.find((i => "screen" === i.mode && screen ? i.maxWidth > screen.availWidth : i.maxWidth * e > t));
        this.load(null === s || void 0 === s ? void 0 : s.options);
        return null === s || void 0 === s ? void 0 : s.maxWidth
    }
    setTheme(t) {
        if (t) {
            const e = this.themes.find((e => e.name === t));
            e && this.load(e.options)
        } else {
            const t = "undefined" !== typeof matchMedia && matchMedia("(prefers-color-scheme: dark)"),
                e = t && t.matches,
                i = B(this, q, "m", G).call(this, e ? "dark" : "light");
            i && this.load(i.options)
        }
    }
    importPreset(t) {
        this.load(B(this, _, "f").plugins.getPreset(t))
    }
}
j = new WeakMap, _ = new WeakMap, q = new WeakSet, G = function _Options_findDefaultTheme(t) {
    var e;
    return null !== (e = this.themes.find((e => e.default.value && e.default.mode === t))) && void 0 !== e ? e : this.themes.find((t => t.default.value && "any" === t.default.mode))
};
var $ = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var N = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var U, X;
class InteractionManager {
    constructor(t, e) {
        this.container = e;
        U.set(this, void 0);
        X.set(this, void 0);
        $(this, U, t, "f");
        $(this, X, N(this, U, "f").plugins.getInteractors(this.container, true), "f");
        this.externalInteractors = [];
        this.particleInteractors = []
    }
    async externalInteract(t) {
        for (const e of this.externalInteractors) e.isEnabled() && await e.interact(t)
    }
    handleClickMode(t) {
        for (const e of this.externalInteractors) e.handleClickMode && e.handleClickMode(t)
    }
    init() {
        this.externalInteractors = [];
        this.particleInteractors = [];
        for (const t of N(this, X, "f")) {
            switch (t.type) {
                case 0:
                    this.externalInteractors.push(t);
                    break;
                case 1:
                    this.particleInteractors.push(t);
                    break
            }
            t.init()
        }
    }
    async particlesInteract(t, e) {
        for (const e of this.externalInteractors) e.clear(t);
        for (const i of this.particleInteractors) i.isEnabled(t) && await i.interact(t, e)
    }
    async reset(t) {
        for (const e of this.externalInteractors) e.isEnabled() && await e.reset(t);
        for (const e of this.particleInteractors) e.isEnabled(t) && await e.reset(t)
    }
}
U = new WeakMap, X = new WeakMap;
class Vector3d extends Vector {
    constructor(t, e, i) {
        super(t, e);
        if ("number" !== typeof t && t) this.z = t.z;
        else {
            if (void 0 === i) throw new Error("tsParticles - Vector not initialized correctly");
            this.z = i
        }
    }
    static get origin() {
        return Vector3d.create(0, 0, 0)
    }
    static clone(t) {
        return Vector3d.create(t.x, t.y, t.z)
    }
    static create(t, e, i) {
        return new Vector3d(t, e, i)
    }
    add(t) {
        return t instanceof Vector3d ? Vector3d.create(this.x + t.x, this.y + t.y, this.z + t.z) : super.add(t)
    }
    addTo(t) {
        super.addTo(t);
        t instanceof Vector3d && (this.z += t.z)
    }
    copy() {
        return Vector3d.clone(this)
    }
    div(t) {
        return Vector3d.create(this.x / t, this.y / t, this.z / t)
    }
    divTo(t) {
        super.divTo(t);
        this.z /= t
    }
    mult(t) {
        return Vector3d.create(this.x * t, this.y * t, this.z * t)
    }
    multTo(t) {
        super.multTo(t);
        this.z *= t
    }
    setTo(t) {
        super.setTo(t);
        const e = t;
        void 0 !== e.z && (this.z = e.z)
    }
    sub(t) {
        return t instanceof Vector3d ? Vector3d.create(this.x - t.x, this.y - t.y, this.z - t.z) : super.sub(t)
    }
    subFrom(t) {
        super.subFrom(t);
        t instanceof Vector3d && (this.z -= t.z)
    }
}
var Y = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var Q = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var J;
const fixOutMode = t => {
    (isInArray(t.outMode, t.checkModes) || isInArray(t.outMode, t.checkModes)) && (t.coord > t.maxCoord - 2 * t.radius ? t.setCb(-t.radius) : t.coord < 2 * t.radius && t.setCb(t.radius))
};
class Particle {
    constructor(t, e, i, s, o, a) {
        var n, r, l, c, h, d, u, f, p;
        this.id = e;
        this.container = i;
        this.group = a;
        J.set(this, void 0);
        Y(this, J, t, "f");
        this.fill = true;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.splitCount = 0;
        this.rotation = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {}
        };
        this.outType = "normal";
        this.ignoresResizeRatio = true;
        const v = i.retina.pixelRatio,
            m = i.actualOptions,
            g = loadParticlesOptions(Q(this, J, "f"), i, m.particles);
        const y = g.shape.type,
            w = g.reduceDuplicates;
        this.shape = y instanceof Array ? itemFromArray(y, this.id, w) : y;
        if (null === o || void 0 === o ? void 0 : o.shape) {
            if (o.shape.type) {
                const t = o.shape.type;
                this.shape = t instanceof Array ? itemFromArray(t, this.id, w) : t
            }
            const t = new Shape;
            t.load(o.shape);
            this.shape && (this.shapeData = this.loadShapeData(t, w))
        } else this.shapeData = this.loadShapeData(g.shape, w);
        g.load(o);
        g.load(null === (n = this.shapeData) || void 0 === n ? void 0 : n.particles);
        this.interactivity = new Interactivity(t, i);
        this.interactivity.load(i.actualOptions.interactivity);
        this.interactivity.load(g.interactivity);
        this.fill = null !== (l = null === (r = this.shapeData) || void 0 === r ? void 0 : r.fill) && void 0 !== l ? l : this.fill;
        this.close = null !== (h = null === (c = this.shapeData) || void 0 === c ? void 0 : c.close) && void 0 !== h ? h : this.close;
        this.options = g;
        const b = this.options.move.path;
        this.pathDelay = 1e3 * getValue(b.delay);
        if (b.generator) {
            this.pathGenerator = Q(this, J, "f").plugins.getPathGenerator(b.generator);
            this.pathGenerator && i.addPath(b.generator, this.pathGenerator) && this.pathGenerator.init(i)
        }
        const x = getRangeValue(this.options.zIndex.value);
        i.retina.initParticle(this);
        const R = this.options.size,
            M = R.value,
            C = R.animation;
        this.size = {
            enable: R.animation.enable,
            value: getRangeValue(R.value) * i.retina.pixelRatio,
            max: getRangeMax(M) * v,
            min: getRangeMin(M) * v,
            loops: 0,
            maxLoops: getRangeValue(R.animation.count)
        };
        if (C.enable) {
            this.size.status = 0;
            this.size.decay = 1 - getRangeValue(C.decay);
            switch (C.startValue) {
                case "min":
                    this.size.value = this.size.min;
                    this.size.status = 0;
                    break;
                case "random":
                    this.size.value = randomInRange(this.size) * v;
                    this.size.status = getRandom() >= .5 ? 0 : 1;
                    break;
                case "max":
                default:
                    this.size.value = this.size.max;
                    this.size.status = 1;
                    break
            }
            this.size.velocity = (null !== (d = this.retina.sizeAnimationSpeed) && void 0 !== d ? d : i.retina.sizeAnimationSpeed) / 100 * i.retina.reduceFactor;
            C.sync || (this.size.velocity *= getRandom())
        }
        this.bubble = {
            inRange: false
        };
        this.position = this.calcPosition(i, s, clamp(x, 0, i.zLayers));
        this.initialPosition = this.position.copy();
        const P = i.canvas.size,
            z = this.options.move.center;
        this.moveCenter = {
            x: P.width * z.x / 100,
            y: P.height * z.y / 100,
            radius: this.options.move.center.radius
        };
        this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
        switch (this.options.move.direction) {
            case "inside":
                this.outType = "inside";
                break;
            case "outside":
                this.outType = "outside";
                break
        }
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - getRangeValue(this.options.move.decay);
        this.offset = Vector.origin;
        const k = i.particles;
        k.needsSort = k.needsSort || k.lastZIndex < this.position.z;
        k.lastZIndex = this.position.z;
        this.zIndexFactor = this.position.z / i.zLayers;
        this.sides = 24;
        let T = i.drawers.get(this.shape);
        if (!T) {
            T = Q(this, J, "f").plugins.getShapeDrawer(this.shape);
            T && i.drawers.set(this.shape, T)
        }(null === T || void 0 === T ? void 0 : T.loadShape) && (null === T || void 0 === T ? void 0 : T.loadShape(this));
        const S = null === T || void 0 === T ? void 0 : T.getSidesCount;
        S && (this.sides = S(this));
        this.spawning = false;
        this.shadowColor = rangeColorToRgb(this.options.shadow.color);
        for (const t of i.particles.updaters) null === (u = t.init) || void 0 === u ? void 0 : u.call(t, this);
        for (const t of i.particles.movers) null === (f = t.init) || void 0 === f ? void 0 : f.call(t, this);
        (null === T || void 0 === T ? void 0 : T.particleInit) && T.particleInit(i, this);
        for (const [, t] of i.plugins) null === (p = t.particleCreated) || void 0 === p ? void 0 : p.call(t, this)
    }
    destroy(t) {
        if (this.unbreakable || this.destroyed) return;
        this.destroyed = true;
        this.bubble.inRange = false;
        for (const [, e] of this.container.plugins) e.particleDestroyed && e.particleDestroyed(this, t);
        if (t) return;
        const e = this.options.destroy;
        "split" === e.mode && this.split()
    }
    draw(t) {
        const e = this.container;
        for (const [, i] of e.plugins) e.canvas.drawParticlePlugin(i, this, t);
        e.canvas.drawParticle(this, t)
    }
    getFillColor() {
        var t, e;
        const i = null !== (t = this.bubble.color) && void 0 !== t ? t : getHslFromAnimation(this.color);
        if (i && this.roll && (this.backColor || this.roll.alter)) {
            const t = this.roll.horizontal && this.roll.vertical ? 2 : 1,
                s = this.roll.horizontal ? Math.PI / 2 : 0,
                o = Math.floor(((null !== (e = this.roll.angle) && void 0 !== e ? e : 0) + s) / (Math.PI / t)) % 2;
            if (o) {
                if (this.backColor) return this.backColor;
                if (this.roll.alter) return alterHsl(i, this.roll.alter.type, this.roll.alter.value)
            }
        }
        return i
    }
    getMass() {
        return this.getRadius() ** 2 * Math.PI / 2
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z
        }
    }
    getRadius() {
        var t;
        return null !== (t = this.bubble.radius) && void 0 !== t ? t : this.size.value
    }
    getStrokeColor() {
        var t, e;
        return null !== (e = null !== (t = this.bubble.color) && void 0 !== t ? t : getHslFromAnimation(this.strokeColor)) && void 0 !== e ? e : this.getFillColor()
    }
    isInsideCanvas() {
        const t = this.getRadius(),
            e = this.container.canvas.size;
        return this.position.x >= -t && this.position.y >= -t && this.position.y <= e.height + t && this.position.x <= e.width + t
    }
    isVisible() {
        return !this.destroyed && !this.spawning && this.isInsideCanvas()
    }
    reset() {
        this.opacity && (this.opacity.loops = 0);
        this.size.loops = 0
    }
    calcPosition(t, e, i, s = 0) {
        var o, a, n, r;
        for (const [, s] of t.plugins) {
            const t = void 0 !== s.particlePosition ? s.particlePosition(e, this) : void 0;
            if (void 0 !== t) return Vector3d.create(t.x, t.y, i)
        }
        const l = t.canvas.size,
            c = calcExactPositionOrRandomFromSize({
                size: l,
                position: e
            }),
            h = Vector3d.create(c.x, c.y, i),
            d = this.getRadius(),
            u = this.options.move.outModes,
            fixHorizontal = e => {
                fixOutMode({
                    outMode: e,
                    checkModes: ["bounce", "bounce-horizontal"],
                    coord: h.x,
                    maxCoord: t.canvas.size.width,
                    setCb: t => h.x += t,
                    radius: d
                })
            },
            fixVertical = e => {
                fixOutMode({
                    outMode: e,
                    checkModes: ["bounce", "bounce-vertical"],
                    coord: h.y,
                    maxCoord: t.canvas.size.height,
                    setCb: t => h.y += t,
                    radius: d
                })
            };
        fixHorizontal(null !== (o = u.left) && void 0 !== o ? o : u.default);
        fixHorizontal(null !== (a = u.right) && void 0 !== a ? a : u.default);
        fixVertical(null !== (n = u.top) && void 0 !== n ? n : u.default);
        fixVertical(null !== (r = u.bottom) && void 0 !== r ? r : u.default);
        return this.checkOverlap(h, s) ? this.calcPosition(t, void 0, i, s + 1) : h
    }
    calculateVelocity() {
        const t = getParticleBaseVelocity(this.direction);
        const e = t.copy();
        const i = this.options.move;
        if ("inside" === i.direction || "outside" === i.direction) return e;
        const s = Math.PI / 180 * getRangeValue(i.angle.value);
        const o = Math.PI / 180 * getRangeValue(i.angle.offset);
        const a = {
            left: o - s / 2,
            right: o + s / 2
        };
        i.straight || (e.angle += randomInRange(setRangeValue(a.left, a.right)));
        i.random && "number" === typeof i.speed && (e.length *= getRandom());
        return e
    }
    checkOverlap(t, e = 0) {
        const i = this.options.collisions,
            s = this.getRadius();
        if (!i.enable) return false;
        const o = i.overlap;
        if (o.enable) return false;
        const a = o.retries;
        if (a >= 0 && e > a) throw new Error("Particle is overlapping and can't be placed");
        let n = false;
        for (const e of this.container.particles.array)
            if (getDistance(t, e.position) < s + e.getRadius()) {
                n = true;
                break
            }
        return n
    }
    loadShapeData(t, e) {
        const i = t.options[this.shape];
        if (i) return deepExtend({}, i instanceof Array ? itemFromArray(i, this.id, e) : i)
    }
    split() {
        const t = this.options.destroy.split;
        if (t.count >= 0 && this.splitCount++ > t.count) return;
        const e = getValue(t.rate),
            i = t.particles instanceof Array ? itemFromArray(t.particles) : t.particles;
        for (let t = 0; t < e; t++) this.container.particles.addSplitParticle(this, i)
    }
}
J = new WeakMap;
class Point {
    constructor(t, e) {
        this.position = t;
        this.particle = e
    }
}
class Range {
    constructor(t, e) {
        this.position = {
            x: t,
            y: e
        }
    }
}
class Circle extends Range {
    constructor(t, e, i) {
        super(t, e);
        this.radius = i
    }
    contains(t) {
        return getDistance(t, this.position) <= this.radius
    }
    intersects(t) {
        const e = t,
            i = t,
            s = this.position,
            o = t.position,
            a = Math.abs(o.x - s.x),
            n = Math.abs(o.y - s.y),
            r = this.radius;
        if (void 0 !== i.radius) {
            const t = r + i.radius,
                e = Math.sqrt(a * a + n + n);
            return t > e
        }
        if (void 0 !== e.size) {
            const t = e.size.width,
                i = e.size.height,
                s = Math.pow(a - t, 2) + Math.pow(n - i, 2);
            return !(a > r + t || n > r + i) && (a <= t || n <= i || s <= r * r)
        }
        return false
    }
}
class Rectangle extends Range {
    constructor(t, e, i, s) {
        super(t, e);
        this.size = {
            height: s,
            width: i
        }
    }
    contains(t) {
        const e = this.size.width,
            i = this.size.height,
            s = this.position;
        return t.x >= s.x && t.x <= s.x + e && t.y >= s.y && t.y <= s.y + i
    }
    intersects(t) {
        const e = t,
            i = t,
            s = this.size.width,
            o = this.size.height,
            a = this.position,
            n = t.position;
        if (void 0 !== i.radius) return i.intersects(this);
        if (!e.size) return false;
        const r = e.size,
            l = r.width,
            c = r.height;
        return n.x < a.x + s && n.x + l > a.x && n.y < a.y + o && n.y + c > a.y
    }
}
class CircleWarp extends Circle {
    constructor(t, e, i, s) {
        super(t, e, i);
        this.canvasSize = s;
        this.canvasSize = Object.assign({}, s)
    }
    contains(t) {
        if (super.contains(t)) return true;
        const e = {
            x: t.x - this.canvasSize.width,
            y: t.y
        };
        if (super.contains(e)) return true;
        const i = {
            x: t.x - this.canvasSize.width,
            y: t.y - this.canvasSize.height
        };
        if (super.contains(i)) return true;
        const s = {
            x: t.x,
            y: t.y - this.canvasSize.height
        };
        return super.contains(s)
    }
    intersects(t) {
        if (super.intersects(t)) return true;
        const e = t,
            i = t,
            s = {
                x: t.position.x - this.canvasSize.width,
                y: t.position.y - this.canvasSize.height
            };
        if (void 0 !== i.radius) {
            const t = new Circle(s.x, s.y, 2 * i.radius);
            return super.intersects(t)
        }
        if (void 0 !== e.size) {
            const t = new Rectangle(s.x, s.y, 2 * e.size.width, 2 * e.size.height);
            return super.intersects(t)
        }
        return false
    }
}
class QuadTree {
    constructor(t, e) {
        this.rectangle = t;
        this.capacity = e;
        this.points = [];
        this.divided = false
    }
    insert(t) {
        var e, i, s, o, a;
        if (!this.rectangle.contains(t.position)) return false;
        if (this.points.length < this.capacity) {
            this.points.push(t);
            return true
        }
        this.divided || this.subdivide();
        return null !== (a = (null === (e = this.northEast) || void 0 === e ? void 0 : e.insert(t)) || (null === (i = this.northWest) || void 0 === i ? void 0 : i.insert(t)) || (null === (s = this.southEast) || void 0 === s ? void 0 : s.insert(t)) || (null === (o = this.southWest) || void 0 === o ? void 0 : o.insert(t))) && void 0 !== a && a
    }
    query(t, e, i) {
        var s, o, a, n;
        const r = null !== i && void 0 !== i ? i : [];
        if (!t.intersects(this.rectangle)) return [];
        for (const i of this.points) !t.contains(i.position) && getDistance(t.position, i.position) > i.particle.getRadius() && (!e || e(i.particle)) || r.push(i.particle);
        if (this.divided) {
            null === (s = this.northEast) || void 0 === s ? void 0 : s.query(t, e, r);
            null === (o = this.northWest) || void 0 === o ? void 0 : o.query(t, e, r);
            null === (a = this.southEast) || void 0 === a ? void 0 : a.query(t, e, r);
            null === (n = this.southWest) || void 0 === n ? void 0 : n.query(t, e, r)
        }
        return r
    }
    queryCircle(t, e, i) {
        return this.query(new Circle(t.x, t.y, e), i)
    }
    queryCircleWarp(t, e, i, s) {
        const o = i,
            a = i;
        return this.query(new CircleWarp(t.x, t.y, e, void 0 !== o.canvas ? o.canvas.size : a), s)
    }
    queryRectangle(t, e, i) {
        return this.query(new Rectangle(t.x, t.y, e.width, e.height), i)
    }
    subdivide() {
        const t = this.rectangle.position.x,
            e = this.rectangle.position.y,
            i = this.rectangle.size.width,
            s = this.rectangle.size.height,
            o = this.capacity;
        this.northEast = new QuadTree(new Rectangle(t, e, i / 2, s / 2), o);
        this.northWest = new QuadTree(new Rectangle(t + i / 2, e, i / 2, s / 2), o);
        this.southEast = new QuadTree(new Rectangle(t, e + s / 2, i / 2, s / 2), o);
        this.southWest = new QuadTree(new Rectangle(t + i / 2, e + s / 2, i / 2, s / 2), o);
        this.divided = true
    }
}
var Z = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var K = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var tt;
class Particles {
    constructor(t, e) {
        this.container = e;
        tt.set(this, void 0);
        Z(this, tt, t, "f");
        this.nextId = 0;
        this.array = [];
        this.zArray = [];
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this.freqs = {
            links: new Map,
            triangles: new Map
        };
        this.interactionManager = new InteractionManager(K(this, tt, "f"), e);
        const i = this.container.canvas.size;
        this.quadTree = new QuadTree(new Rectangle(-i.width / 4, -i.height / 4, 3 * i.width / 2, 3 * i.height / 2), 4);
        this.movers = K(this, tt, "f").plugins.getMovers(e, true);
        this.updaters = K(this, tt, "f").plugins.getUpdaters(e, true)
    }
    get count() {
        return this.array.length
    }
    addManualParticles() {
        const t = this.container,
            e = t.actualOptions;
        for (const i of e.manualParticles) this.addParticle(calcPositionFromSize({
            size: t.canvas.size,
            position: i.position
        }), i.options)
    }
    addParticle(t, e, i) {
        const s = this.container,
            o = s.actualOptions,
            a = o.particles.number.limit;
        if (a > 0) {
            const t = this.count + 1 - a;
            t > 0 && this.removeQuantity(t)
        }
        return this.pushParticle(t, e, i)
    }
    addSplitParticle(t, e) {
        const i = t.options.destroy.split,
            s = loadParticlesOptions(K(this, tt, "f"), this.container, t.options),
            o = getValue(i.factor);
        s.color.load({
            value: {
                hsl: t.getFillColor()
            }
        });
        if ("number" === typeof s.size.value) s.size.value /= o;
        else {
            s.size.value.min /= o;
            s.size.value.max /= o
        }
        s.load(e);
        const a = i.sizeOffset ? setRangeValue(-t.size.value, t.size.value) : 0,
            n = {
                x: t.position.x + randomInRange(a),
                y: t.position.y + randomInRange(a)
            };
        return this.pushParticle(n, s, t.group, (e => {
            if (e.size.value < .5) return false;
            e.velocity.length = randomInRange(setRangeValue(t.velocity.length, e.velocity.length));
            e.splitCount = t.splitCount + 1;
            e.unbreakable = true;
            setTimeout((() => {
                e.unbreakable = false
            }), 500);
            return true
        }))
    }
    clear() {
        this.array = [];
        this.zArray = []
    }
    destroy() {
        this.array = [];
        this.zArray = [];
        this.movers = [];
        this.updaters = []
    }
    async draw(t) {
        const e = this.container,
            i = this.container.canvas.size;
        this.quadTree = new QuadTree(new Rectangle(-i.width / 4, -i.height / 4, 3 * i.width / 2, 3 * i.height / 2), 4);
        e.canvas.clear();
        await this.update(t);
        if (this.needsSort) {
            this.zArray.sort(((t, e) => e.position.z - t.position.z || t.id - e.id));
            this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
            this.needsSort = false
        }
        for (const [, i] of e.plugins) e.canvas.drawPlugin(i, t);
        for (const e of this.zArray) e.draw(t)
    }
    getLinkFrequency(t, e) {
        const i = setRangeValue(t.id, e.id),
            s = `${getRangeMin(i)}_${getRangeMax(i)}`;
        let o = this.freqs.links.get(s);
        if (void 0 === o) {
            o = getRandom();
            this.freqs.links.set(s, o)
        }
        return o
    }
    getTriangleFrequency(t, e, i) {
        let [s, o, a] = [t.id, e.id, i.id];
        s > o && ([o, s] = [s, o]);
        o > a && ([a, o] = [o, a]);
        s > a && ([a, s] = [s, a]);
        const n = `${s}_${o}_${a}`;
        let r = this.freqs.triangles.get(n);
        if (void 0 === r) {
            r = getRandom();
            this.freqs.triangles.set(n, r)
        }
        return r
    }
    handleClickMode(t) {
        this.interactionManager.handleClickMode(t)
    }
    init() {
        var t;
        const e = this.container,
            i = e.actualOptions;
        this.lastZIndex = 0;
        this.needsSort = false;
        this.freqs.links = new Map;
        this.freqs.triangles = new Map;
        let s = false;
        this.updaters = K(this, tt, "f").plugins.getUpdaters(e, true);
        this.interactionManager.init();
        for (const [, t] of e.plugins) {
            void 0 !== t.particlesInitialization && (s = t.particlesInitialization());
            if (s) break
        }
        this.interactionManager.init();
        for (const [, t] of e.pathGenerators) t.init(e);
        this.addManualParticles();
        if (!s) {
            for (const e in i.particles.groups) {
                const s = i.particles.groups[e];
                for (let o = this.count, a = 0; a < (null === (t = s.number) || void 0 === t ? void 0 : t.value) && o < i.particles.number.value; o++, a++) this.addParticle(void 0, s, e)
            }
            for (let t = this.count; t < i.particles.number.value; t++) this.addParticle()
        }
    }
    push(t, e, i, s) {
        this.pushing = true;
        for (let o = 0; o < t; o++) this.addParticle(null === e || void 0 === e ? void 0 : e.position, i, s);
        this.pushing = false
    }
    async redraw() {
        this.clear();
        this.init();
        await this.draw({
            value: 0,
            factor: 0
        })
    }
    remove(t, e, i) {
        this.removeAt(this.array.indexOf(t), void 0, e, i)
    }
    removeAt(t, e = 1, i, s) {
        if (!(t >= 0 && t <= this.count)) return;
        let o = 0;
        for (let a = t; o < e && a < this.count; a++) {
            const t = this.array[a];
            if (!t || t.group !== i) continue;
            t.destroy(s);
            this.array.splice(a--, 1);
            const e = this.zArray.indexOf(t);
            this.zArray.splice(e, 1);
            o++;
            K(this, tt, "f").dispatchEvent("particleRemoved", {
                container: this.container,
                data: {
                    particle: t
                }
            })
        }
    }
    removeQuantity(t, e) {
        this.removeAt(0, t, e)
    }
    setDensity() {
        const t = this.container.actualOptions;
        for (const e in t.particles.groups) this.applyDensity(t.particles.groups[e], 0, e);
        this.applyDensity(t.particles, t.manualParticles.length)
    }
    async update(t) {
        var e, i;
        const s = this.container,
            o = [];
        for (const [, t] of s.pathGenerators) t.update();
        for (const [, i] of s.plugins) null === (e = i.update) || void 0 === e ? void 0 : e.call(i, t);
        for (const e of this.array) {
            const a = s.canvas.resizeFactor;
            if (a && !e.ignoresResizeRatio) {
                e.position.x *= a.width;
                e.position.y *= a.height
            }
            e.ignoresResizeRatio = false;
            await this.interactionManager.reset(e);
            for (const [, s] of this.container.plugins) {
                if (e.destroyed) break;
                null === (i = s.particleUpdate) || void 0 === i ? void 0 : i.call(s, e, t)
            }
            for (const i of this.movers) i.isEnabled(e) && i.move(e, t);
            e.destroyed ? o.push(e) : this.quadTree.insert(new Point(e.getPosition(), e))
        }
        for (const t of o) this.remove(t);
        await this.interactionManager.externalInteract(t);
        for (const e of s.particles.array) {
            for (const i of this.updaters) i.update(e, t);
            e.destroyed || e.spawning || await this.interactionManager.particlesInteract(e, t)
        }
        delete s.canvas.resizeFactor
    }
    applyDensity(t, e, i) {
        var s;
        if (!(null === (s = t.number.density) || void 0 === s ? void 0 : s.enable)) return;
        const o = t.number,
            a = this.initDensityFactor(o.density),
            n = o.value,
            r = o.limit > 0 ? o.limit : n,
            l = Math.min(n, r) * a + e,
            c = Math.min(this.count, this.array.filter((t => t.group === i)).length);
        this.limit = o.limit * a;
        c < l ? this.push(Math.abs(l - c), void 0, t, i) : c > l && this.removeQuantity(c - l, i)
    }
    initDensityFactor(t) {
        const e = this.container;
        if (!e.canvas.element || !t.enable) return 1;
        const i = e.canvas.element,
            s = e.retina.pixelRatio;
        return i.width * i.height / (t.factor * s ** 2 * t.area)
    }
    pushParticle(t, e, i, s) {
        try {
            const o = new Particle(K(this, tt, "f"), this.nextId, this.container, t, e, i);
            let a = true;
            s && (a = s(o));
            if (!a) return;
            this.array.push(o);
            this.zArray.push(o);
            this.nextId++;
            K(this, tt, "f").dispatchEvent("particleAdded", {
                container: this.container,
                data: {
                    particle: o
                }
            });
            return o
        } catch (t) {
            console.warn(`error adding particle: ${t}`);
            return
        }
    }
}
tt = new WeakMap;
class Retina {
    constructor(t) {
        this.container = t
    }
    init() {
        const t = this.container,
            e = t.actualOptions;
        this.pixelRatio = !e.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
        const i = this.container.actualOptions.motion;
        if (i && (i.disable || i.reduce.value))
            if (isSsr() || "undefined" === typeof matchMedia || !matchMedia) this.reduceFactor = 1;
            else {
                const e = matchMedia("(prefers-reduced-motion: reduce)");
                if (e) {
                    this.handleMotionChange(e);
                    const handleChange = () => {
                        this.handleMotionChange(e);
                        t.refresh().catch((() => {}))
                    };
                    void 0 !== e.addEventListener ? e.addEventListener("change", handleChange) : void 0 !== e.addListener && e.addListener(handleChange)
                }
            }
        else this.reduceFactor = 1;
        const s = this.pixelRatio;
        if (t.canvas.element) {
            const e = t.canvas.element;
            t.canvas.size.width = e.offsetWidth * s;
            t.canvas.size.height = e.offsetHeight * s
        }
        const o = e.particles;
        this.attractDistance = getRangeValue(o.move.attract.distance) * s;
        this.sizeAnimationSpeed = getRangeValue(o.size.animation.speed) * s;
        this.maxSpeed = getRangeValue(o.move.gravity.maxSpeed) * s;
        const a = e.interactivity.modes;
        this.slowModeRadius = a.slow.radius * s
    }
    initParticle(t) {
        const e = t.options,
            i = this.pixelRatio,
            s = e.move.distance,
            o = t.retina;
        o.attractDistance = getRangeValue(e.move.attract.distance) * i;
        o.moveDrift = getRangeValue(e.move.drift) * i;
        o.moveSpeed = getRangeValue(e.move.speed) * i;
        o.sizeAnimationSpeed = getRangeValue(e.size.animation.speed) * i;
        const a = o.maxDistance;
        a.horizontal = void 0 !== s.horizontal ? s.horizontal * i : void 0;
        a.vertical = void 0 !== s.vertical ? s.vertical * i : void 0;
        o.maxSpeed = getRangeValue(e.move.gravity.maxSpeed) * i
    }
    handleMotionChange(t) {
        const e = this.container.actualOptions;
        if (t.matches) {
            const t = e.motion;
            this.reduceFactor = t.disable ? 0 : t.reduce.value ? 1 / t.reduce.factor : 1
        } else this.reduceFactor = 1
    }
}
var et = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var it = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var st, ot, at, nt, rt;

function guardCheck(t) {
    return void 0 !== t && !t.destroyed
}

function loadContainerOptions(t, e, ...i) {
    const s = new Options(t, e);
    loadOptions(s, ...i);
    return s
}
const lt = "default",
    ct = {
        generate: t => {
            const e = t.velocity.copy();
            e.angle += e.length * Math.PI / 180;
            return e
        },
        init: () => {},
        update: () => {}
    };
class Container {
    constructor(t, e, i) {
        this.id = e;
        st.set(this, void 0);
        ot.set(this, void 0);
        at.set(this, void 0);
        nt.set(this, void 0);
        rt.set(this, void 0);
        et(this, st, t, "f");
        this.fpsLimit = 120;
        this.duration = 0;
        this.lifeTime = 0;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        et(this, rt, i, "f");
        this._initialSourceOptions = i;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(it(this, st, "f"), this);
        this.frameManager = new FrameManager(this);
        this.pathGenerators = new Map;
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false
            }
        };
        this.plugins = new Map;
        this.drawers = new Map;
        et(this, nt, loadContainerOptions(it(this, st, "f"), this), "f");
        this.actualOptions = loadContainerOptions(it(this, st, "f"), this);
        et(this, ot, new EventListeners(this), "f");
        "undefined" !== typeof IntersectionObserver && IntersectionObserver && et(this, at, new IntersectionObserver((t => this.intersectionManager(t))), "f");
        it(this, st, "f").dispatchEvent("containerBuilt", {
            container: this
        })
    }
    get options() {
        return it(this, nt, "f")
    }
    get sourceOptions() {
        return it(this, rt, "f")
    }
    addClickHandler(t) {
        if (!guardCheck(this)) return;
        const e = this.interactivity.element;
        if (!e) return;
        const clickOrTouchHandler = (e, i, s) => {
            if (!guardCheck(this)) return;
            const o = this.retina.pixelRatio,
                a = {
                    x: i.x * o,
                    y: i.y * o
                },
                n = this.particles.quadTree.queryCircle(a, s * o);
            t(e, n)
        };
        const clickHandler = t => {
            if (!guardCheck(this)) return;
            const e = t,
                i = {
                    x: e.offsetX || e.clientX,
                    y: e.offsetY || e.clientY
                };
            clickOrTouchHandler(t, i, 1)
        };
        const touchStartHandler = () => {
            if (guardCheck(this)) {
                i = true;
                s = false
            }
        };
        const touchMoveHandler = () => {
            guardCheck(this) && (s = true)
        };
        const touchEndHandler = t => {
            var e, o, a;
            if (guardCheck(this)) {
                if (i && !s) {
                    const i = t;
                    let s = i.touches[i.touches.length - 1];
                    if (!s) {
                        s = i.changedTouches[i.changedTouches.length - 1];
                        if (!s) return
                    }
                    const n = null === (e = this.canvas.element) || void 0 === e ? void 0 : e.getBoundingClientRect(),
                        r = {
                            x: s.clientX - (null !== (o = null === n || void 0 === n ? void 0 : n.left) && void 0 !== o ? o : 0),
                            y: s.clientY - (null !== (a = null === n || void 0 === n ? void 0 : n.top) && void 0 !== a ? a : 0)
                        };
                    clickOrTouchHandler(t, r, Math.max(s.radiusX, s.radiusY))
                }
                i = false;
                s = false
            }
        };
        const touchCancelHandler = () => {
            if (guardCheck(this)) {
                i = false;
                s = false
            }
        };
        let i = false;
        let s = false;
        e.addEventListener("click", clickHandler);
        e.addEventListener("touchstart", touchStartHandler);
        e.addEventListener("touchmove", touchMoveHandler);
        e.addEventListener("touchend", touchEndHandler);
        e.addEventListener("touchcancel", touchCancelHandler)
    }
    addPath(t, e, i = false) {
        if (!guardCheck(this) || !i && this.pathGenerators.has(t)) return false;
        this.pathGenerators.set(t, null !== e && void 0 !== e ? e : ct);
        return true
    }
    destroy() {
        if (!guardCheck(this)) return;
        this.stop();
        this.particles.destroy();
        this.canvas.destroy();
        for (const [, t] of this.drawers) t.destroy && t.destroy(this);
        for (const t of this.drawers.keys()) this.drawers.delete(t);
        it(this, st, "f").plugins.destroy(this);
        this.destroyed = true;
        const t = it(this, st, "f").dom(),
            e = t.findIndex((t => t === this));
        e >= 0 && t.splice(e, 1);
        it(this, st, "f").dispatchEvent("containerDestroyed", {
            container: this
        })
    }
    draw(t) {
        if (!guardCheck(this)) return;
        let e = t;
        this.drawAnimationFrame = animate()((async t => {
            if (e) {
                this.lastFrameTime = void 0;
                e = false
            }
            await this.frameManager.nextFrame(t)
        }))
    }
    exportConfiguration() {
        return JSON.stringify(this.actualOptions, void 0, 2)
    }
    exportImage(t, e, i) {
        var s;
        return null === (s = this.canvas.element) || void 0 === s ? void 0 : s.toBlob(t, null !== e && void 0 !== e ? e : "image/png", i)
    }
    exportImg(t) {
        this.exportImage(t)
    }
    getAnimationStatus() {
        return !this.paused && !this.pageHidden && guardCheck(this)
    }
    handleClickMode(t) {
        if (guardCheck(this)) {
            this.particles.handleClickMode(t);
            for (const [, e] of this.plugins) e.handleClickMode && e.handleClickMode(t)
        }
    }
    async init() {
        if (!guardCheck(this)) return;
        const t = it(this, st, "f").plugins.getSupportedShapes();
        for (const e of t) {
            const t = it(this, st, "f").plugins.getShapeDrawer(e);
            t && this.drawers.set(e, t)
        }
        et(this, nt, loadContainerOptions(it(this, st, "f"), this, this._initialSourceOptions, this.sourceOptions), "f");
        this.actualOptions = loadContainerOptions(it(this, st, "f"), this, it(this, nt, "f"));
        this.retina.init();
        this.canvas.init();
        this.updateActualOptions();
        this.canvas.initBackground();
        this.canvas.resize();
        this.zLayers = this.actualOptions.zLayers;
        this.duration = getRangeValue(this.actualOptions.duration);
        this.lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
        const e = it(this, st, "f").plugins.getAvailablePlugins(this);
        for (const [t, i] of e) this.plugins.set(t, i);
        for (const [, t] of this.drawers) t.init && await t.init(this);
        for (const [, t] of this.plugins) t.init ? t.init(this.actualOptions) : void 0 !== t.initAsync && await t.initAsync(this.actualOptions);
        it(this, st, "f").dispatchEvent("containerInit", {
            container: this
        });
        this.particles.init();
        this.particles.setDensity();
        for (const [, t] of this.plugins) void 0 !== t.particlesSetup && t.particlesSetup();
        it(this, st, "f").dispatchEvent("particlesSetup", {
            container: this
        })
    }
    async loadTheme(t) {
        if (guardCheck(this)) {
            this.currentTheme = t;
            await this.refresh()
        }
    }
    pause() {
        if (guardCheck(this)) {
            if (void 0 !== this.drawAnimationFrame) {
                cancelAnimation()(this.drawAnimationFrame);
                delete this.drawAnimationFrame
            }
            if (!this.paused) {
                for (const [, t] of this.plugins) t.pause && t.pause();
                this.pageHidden || (this.paused = true);
                it(this, st, "f").dispatchEvent("containerPaused", {
                    container: this
                })
            }
        }
    }
    play(t) {
        if (!guardCheck(this)) return;
        const e = this.paused || t;
        if (!this.firstStart || this.actualOptions.autoPlay) {
            this.paused && (this.paused = false);
            if (e)
                for (const [, t] of this.plugins) t.play && t.play();
            it(this, st, "f").dispatchEvent("containerPlay", {
                container: this
            });
            this.draw(e || false)
        } else this.firstStart = false
    }
    async refresh() {
        if (guardCheck(this)) {
            this.stop();
            return this.start()
        }
    }
    async reset() {
        if (guardCheck(this)) {
            et(this, nt, loadContainerOptions(it(this, st, "f"), this), "f");
            return this.refresh()
        }
    }
    setNoise(t, e, i) {
        guardCheck(this) && this.setPath(t, e, i)
    }
    setPath(t, e, i) {
        if (!t || !guardCheck(this)) return;
        const s = Object.assign({}, ct);
        if ("function" === typeof t) {
            s.generate = t;
            e && (s.init = e);
            i && (s.update = i)
        } else {
            const e = s;
            s.generate = t.generate || e.generate;
            s.init = t.init || e.init;
            s.update = t.update || e.update
        }
        this.addPath(lt, s, true)
    }
    async start() {
        if (!this.started && guardCheck(this)) {
            await this.init();
            this.started = true;
            it(this, ot, "f").addListeners();
            this.interactivity.element instanceof HTMLElement && it(this, at, "f") && it(this, at, "f").observe(this.interactivity.element);
            for (const [, t] of this.plugins) void 0 !== t.startAsync ? await t.startAsync() : void 0 !== t.start && t.start();
            it(this, st, "f").dispatchEvent("containerStarted", {
                container: this
            });
            this.play()
        }
    }
    stop() {
        var t;
        if (this.started && guardCheck(this)) {
            this.firstStart = true;
            this.started = false;
            it(this, ot, "f").removeListeners();
            this.pause();
            this.particles.clear();
            this.canvas.clear();
            this.interactivity.element instanceof HTMLElement && it(this, at, "f") && it(this, at, "f").unobserve(this.interactivity.element);
            for (const [, e] of this.plugins) null === (t = e.stop) || void 0 === t ? void 0 : t.call(e);
            for (const t of this.plugins.keys()) this.plugins.delete(t);
            et(this, rt, it(this, nt, "f"), "f");
            it(this, st, "f").dispatchEvent("containerStopped", {
                container: this
            })
        }
    }
    updateActualOptions() {
        this.actualOptions.responsive = [];
        const t = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, it(this, nt, "f"));
        this.actualOptions.setTheme(this.currentTheme);
        if (this.responsiveMaxWidth != t) {
            this.responsiveMaxWidth = t;
            return true
        }
        return false
    }
    intersectionManager(t) {
        if (guardCheck(this) && this.actualOptions.pauseOnOutsideViewport)
            for (const e of t) e.target === this.interactivity.element && (e.isIntersecting ? this.play : this.pause)()
    }
}
st = new WeakMap, ot = new WeakMap, at = new WeakMap, nt = new WeakMap, rt = new WeakMap;
var ht = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var dt = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var ut;

function fetchError(t) {
    console.error(`tsParticles - Error ${t} while retrieving config file`)
}
async function getDataFromUrl(t, e) {
    const i = t instanceof Array ? itemFromArray(t, e) : t;
    if (!i) return;
    const s = await fetch(i);
    if (s.ok) return s.json();
    fetchError(s.status)
}
class Loader {
    constructor(t) {
        ut.set(this, void 0);
        ht(this, ut, t, "f")
    }
    load(t, e, i) {
        const s = {
            index: i,
            remote: false
        };
        "string" === typeof t ? s.tagId = t : s.options = t;
        "number" === typeof e ? s.index = e : s.options = null !== e && void 0 !== e ? e : s.options;
        return this.loadOptions(s)
    }
    async loadJSON(t, e, i) {
        let s, o;
        if ("number" === typeof e || void 0 === e) s = t;
        else {
            o = t;
            s = e
        }
        return this.loadRemoteOptions({
            tagId: o,
            url: s,
            index: i,
            remote: true
        })
    }
    async loadOptions(t) {
        var e, i, s;
        const o = null !== (e = t.tagId) && void 0 !== e ? e : `tsparticles${Math.floor(1e4*getRandom())}`,
            {
                index: a,
                url: n,
                remote: l
            } = t,
            c = l ? await getDataFromUrl(n, a) : t.options;
        let h = null !== (i = t.element) && void 0 !== i ? i : document.getElementById(o);
        if (!h) {
            h = document.createElement("div");
            h.id = o;
            null === (s = document.querySelector("body")) || void 0 === s ? void 0 : s.append(h)
        }
        const d = c instanceof Array ? itemFromArray(c, a) : c,
            u = dt(this, ut, "f").dom(),
            f = u.findIndex((t => t.id === o));
        if (f >= 0) {
            const t = dt(this, ut, "f").domItem(f);
            if (t && !t.destroyed) {
                t.destroy();
                u.splice(f, 1)
            }
        }
        let p;
        if ("canvas" === h.tagName.toLowerCase()) {
            p = h;
            p.dataset[r] = "false"
        } else {
            const t = h.getElementsByTagName("canvas");
            if (t.length) {
                p = t[0];
                p.dataset[r] = "false"
            } else {
                p = document.createElement("canvas");
                p.dataset[r] = "true";
                h.appendChild(p)
            }
        }
        p.style.width || (p.style.width = "100%");
        p.style.height || (p.style.height = "100%");
        const v = new Container(dt(this, ut, "f"), o, d);
        f >= 0 ? u.splice(f, 0, v) : u.push(v);
        v.canvas.loadCanvas(p);
        await v.start();
        return v
    }
    async loadRemoteOptions(t) {
        return this.loadOptions(t)
    }
    async set(t, e, i, s) {
        const o = {
            index: s,
            remote: false
        };
        "string" === typeof t ? o.tagId = t : o.element = t;
        e instanceof HTMLElement ? o.element = e : o.options = e;
        "number" === typeof i ? o.index = i : o.options = null !== i && void 0 !== i ? i : o.options;
        return this.loadOptions(o)
    }
    async setJSON(t, e, i, s) {
        let o, a, n, r;
        if (t instanceof HTMLElement) {
            r = t;
            o = e;
            n = i
        } else {
            a = t;
            r = e;
            o = i;
            n = s
        }
        return this.loadRemoteOptions({
            tagId: a,
            url: o,
            index: n,
            element: r,
            remote: true
        })
    }
}
ut = new WeakMap;
var ft = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var pt;
class Plugins {
    constructor(t) {
        pt.set(this, void 0);
        ft(this, pt, t, "f");
        this.plugins = [];
        this.interactorsInitializers = new Map;
        this.moversInitializers = new Map;
        this.updatersInitializers = new Map;
        this.interactors = new Map;
        this.movers = new Map;
        this.updaters = new Map;
        this.presets = new Map;
        this.drawers = new Map;
        this.pathGenerators = new Map
    }
    addInteractor(t, e) {
        this.interactorsInitializers.set(t, e)
    }
    addParticleMover(t, e) {
        this.moversInitializers.set(t, e)
    }
    addParticleUpdater(t, e) {
        this.updatersInitializers.set(t, e)
    }
    addPathGenerator(t, e) {
        this.getPathGenerator(t) || this.pathGenerators.set(t, e)
    }
    addPlugin(t) {
        this.getPlugin(t.id) || this.plugins.push(t)
    }
    addPreset(t, e, i = false) {
        !i && this.getPreset(t) || this.presets.set(t, e)
    }
    addShapeDrawer(t, e) {
        this.getShapeDrawer(t) || this.drawers.set(t, e)
    }
    destroy(t) {
        this.updaters.delete(t);
        this.movers.delete(t);
        this.interactors.delete(t)
    }
    getAvailablePlugins(t) {
        const e = new Map;
        for (const i of this.plugins) i.needsPlugin(t.actualOptions) && e.set(i.id, i.getPlugin(t));
        return e
    }
    getInteractors(t, e = false) {
        let i = this.interactors.get(t);
        if (!i || e) {
            i = [...this.interactorsInitializers.values()].map((e => e(t)));
            this.interactors.set(t, i)
        }
        return i
    }
    getMovers(t, e = false) {
        let i = this.movers.get(t);
        if (!i || e) {
            i = [...this.moversInitializers.values()].map((e => e(t)));
            this.movers.set(t, i)
        }
        return i
    }
    getPathGenerator(t) {
        return this.pathGenerators.get(t)
    }
    getPlugin(t) {
        return this.plugins.find((e => e.id === t))
    }
    getPreset(t) {
        return this.presets.get(t)
    }
    getShapeDrawer(t) {
        return this.drawers.get(t)
    }
    getSupportedShapes() {
        return this.drawers.keys()
    }
    getUpdaters(t, e = false) {
        let i = this.updaters.get(t);
        if (!i || e) {
            i = [...this.updatersInitializers.values()].map((e => e(t)));
            this.updaters.set(t, i)
        }
        return i
    }
    loadOptions(t, e) {
        for (const i of this.plugins) i.loadOptions(t, e)
    }
    loadParticlesOptions(t, e, ...i) {
        const s = this.updaters.get(t);
        if (s)
            for (const t of s) t.loadOptions && t.loadOptions(e, ...i)
    }
}
pt = new WeakMap;
var vt = (void 0, function(t, e, i, s, o) {
    if ("m" === s) throw new TypeError("Private method is not writable");
    if ("a" === s && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" === typeof e ? t !== e || !o : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === s ? o.call(t, i) : o ? o.value = i : e.set(t, i), i
});
var mt = (void 0, function(t, e, i, s) {
    if ("a" === i && !s) throw new TypeError("Private accessor was defined without a getter");
    if ("function" === typeof e ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === i ? s : "a" === i ? s.call(t) : s ? s.value : e.get(t)
});
var gt, yt, wt, bt;
class Engine {
    constructor() {
        gt.set(this, void 0);
        yt.set(this, void 0);
        wt.set(this, void 0);
        bt.set(this, void 0);
        vt(this, gt, [], "f");
        vt(this, yt, new EventDispatcher, "f");
        vt(this, wt, false, "f");
        vt(this, bt, new Loader(this), "f");
        this.plugins = new Plugins(this)
    }
    addEventListener(t, e) {
        mt(this, yt, "f").addEventListener(t, e)
    }
    async addInteractor(t, e) {
        this.plugins.addInteractor(t, e);
        await this.refresh()
    }
    async addMover(t, e) {
        this.plugins.addParticleMover(t, e);
        await this.refresh()
    }
    async addParticleUpdater(t, e) {
        this.plugins.addParticleUpdater(t, e);
        await this.refresh()
    }
    async addPathGenerator(t, e) {
        this.plugins.addPathGenerator(t, e);
        await this.refresh()
    }
    async addPlugin(t) {
        this.plugins.addPlugin(t);
        await this.refresh()
    }
    async addPreset(t, e, i = false) {
        this.plugins.addPreset(t, e, i);
        await this.refresh()
    }
    async addShape(t, e, i, s, o) {
        let a;
        a = "function" === typeof e ? {
            afterEffect: s,
            destroy: o,
            draw: e,
            init: i
        } : e;
        this.plugins.addShapeDrawer(t, a);
        await this.refresh()
    }
    dispatchEvent(t, e) {
        mt(this, yt, "f").dispatchEvent(t, e)
    }
    dom() {
        return mt(this, gt, "f")
    }
    domItem(t) {
        const e = this.dom(),
            i = e[t];
        if (i && !i.destroyed) return i;
        e.splice(t, 1)
    }
    init() {
        mt(this, wt, "f") || vt(this, wt, true, "f")
    }
    async load(t, e) {
        return mt(this, bt, "f").load(t, e)
    }
    async loadFromArray(t, e, i) {
        return mt(this, bt, "f").load(t, e, i)
    }
    async loadJSON(t, e, i) {
        return mt(this, bt, "f").loadJSON(t, e, i)
    }
    async refresh() {
        for (const t of this.dom()) await t.refresh()
    }
    removeEventListener(t, e) {
        mt(this, yt, "f").removeEventListener(t, e)
    }
    async set(t, e, i) {
        return mt(this, bt, "f").set(t, e, i)
    }
    async setJSON(t, e, i, s) {
        return mt(this, bt, "f").setJSON(t, e, i, s)
    }
    setOnClickHandler(t) {
        const e = this.dom();
        if (!e.length) throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        for (const i of e) i.addClickHandler(t)
    }
}
gt = new WeakMap, yt = new WeakMap, wt = new WeakMap, bt = new WeakMap;
class HslColorManager {
    constructor() {
        this.stringPrefix = "hsl"
    }
    handleColor(t) {
        var e;
        const i = t.value,
            s = null !== (e = i.hsl) && void 0 !== e ? e : t.value;
        if (void 0 !== s.h && void 0 !== s.l) return hslToRgb(s)
    }
    handleRangeColor(t) {
        var e;
        const i = t.value,
            s = null !== (e = i.hsl) && void 0 !== e ? e : t.value;
        if (void 0 !== s.h && void 0 !== s.l) return hslToRgb({
            h: getRangeValue(s.h),
            l: getRangeValue(s.l),
            s: getRangeValue(s.s)
        })
    }
    parseString(t) {
        if (!t.startsWith("hsl")) return;
        const e = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i,
            i = e.exec(t);
        return i ? hslaToRgba({
            a: i.length > 4 ? parseAlpha(i[5]) : 1,
            h: parseInt(i[1], 10),
            l: parseInt(i[3], 10),
            s: parseInt(i[2], 10)
        }) : void 0
    }
}
class RgbColorManager {
    constructor() {
        this.stringPrefix = "rgb"
    }
    handleColor(t) {
        var e;
        const i = t.value,
            s = null !== (e = i.rgb) && void 0 !== e ? e : t.value;
        if (void 0 !== s.r) return s
    }
    handleRangeColor(t) {
        var e;
        const i = t.value,
            s = null !== (e = i.rgb) && void 0 !== e ? e : t.value;
        if (void 0 !== s.r) return {
            r: getRangeValue(s.r),
            g: getRangeValue(s.g),
            b: getRangeValue(s.b)
        }
    }
    parseString(t) {
        if (!t.startsWith(this.stringPrefix)) return;
        const e = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i,
            i = e.exec(t);
        return i ? {
            a: i.length > 4 ? parseAlpha(i[5]) : 1,
            b: parseInt(i[3], 10),
            g: parseInt(i[2], 10),
            r: parseInt(i[1], 10)
        } : void 0
    }
}
class ExternalInteractorBase {
    constructor(t) {
        this.container = t;
        this.type = 0
    }
}
class ParticlesInteractorBase {
    constructor(t) {
        this.container = t;
        this.type = 1
    }
}
const xt = new RgbColorManager,
    Rt = new HslColorManager;
addColorManager("rgb", xt);
addColorManager("hsl", Rt);
const Mt = new Engine;
Mt.init();
export {
    AnimatableColor,
    AnimationOptions,
    Background,
    BackgroundMask,
    BackgroundMaskCover,
    Circle,
    CircleWarp,
    ClickEvent,
    Collisions,
    CollisionsOverlap,
    ColorAnimation,
    Destroy,
    DivEvent,
    Events,
    ExternalInteractorBase,
    FullScreen,
    HoverEvent,
    HslAnimation,
    HslColorManager,
    Interactivity,
    ManualParticle,
    Modes,
    Motion,
    MotionReduce,
    Move,
    MoveAngle,
    MoveAttract,
    MoveGravity,
    MovePath,
    MovePathDelay,
    MoveTrail,
    Opacity,
    OpacityAnimation,
    Options,
    OptionsColor,
    OutModes,
    Parallax,
    ParticlesBounce,
    ParticlesBounceFactor,
    ParticlesDensity,
    ParticlesInteractorBase,
    ParticlesNumber,
    ParticlesOptions,
    Point,
    Range,
    Rectangle,
    Responsive,
    RgbColorManager,
    Rotate,
    RotateAnimation,
    Shadow,
    Shape,
    Size,
    SizeAnimation,
    Slow,
    Spin,
    Split,
    SplitFactor,
    SplitRate,
    Stroke,
    Theme,
    ThemeDefault,
    ValueWithRandom,
    Vector,
    Vector3d,
    ZIndex,
    addColorManager,
    alterHsl,
    animate,
    areBoundsInside,
    arrayRandomIndex,
    calcEasing,
    calcExactPositionOrRandomFromSize,
    calcExactPositionOrRandomFromSizeRanged,
    calcPositionFromSize,
    calcPositionOrRandomFromSize,
    calcPositionOrRandomFromSizeRanged,
    calculateBounds,
    cancelAnimation,
    circleBounce,
    circleBounceDataFromParticle,
    clamp,
    clear,
    collisionVelocity,
    colorMix,
    colorToHsl,
    colorToRgb,
    deepExtend,
    divMode,
    divModeExecute,
    drawLine,
    drawParticle,
    drawParticlePlugin,
    drawPlugin,
    drawShape,
    drawShapeAfterEffect,
    drawTriangle,
    r as generatedAttribute,
    getDistance,
    getDistances,
    getHslAnimationFromHsl,
    getHslFromAnimation,
    getLinkColor,
    getLinkRandomColor,
    getParticleBaseVelocity,
    getParticleDirectionAngle,
    getRandom,
    getRandomRgbColor,
    getRangeMax,
    getRangeMin,
    getRangeValue,
    getStyleFromHsl,
    getStyleFromRgb,
    getValue,
    hslToRgb,
    hslaToRgba,
    isDivModeEnabled,
    isInArray,
    isPointInside,
    isSsr,
    itemFromArray,
    loadFont,
    loadOptions,
    loadParticlesOptions,
    mix,
    c as mouseDownEvent,
    p as mouseLeaveEvent,
    d as mouseMoveEvent,
    v as mouseOutEvent,
    h as mouseUpEvent,
    w as noPolygonDataLoaded,
    b as noPolygonFound,
    paintBase,
    parseAlpha,
    randomInRange,
    rangeColorToHsl,
    rangeColorToRgb,
    rectBounce,
    g as resizeEvent,
    rgbToHsl,
    setRandom,
    setRangeValue,
    singleDivModeExecute,
    stringToAlpha,
    stringToRgb,
    m as touchCancelEvent,
    l as touchEndEvent,
    f as touchMoveEvent,
    u as touchStartEvent,
    Mt as tsParticles,
    y as visibilityChangeEvent
};

//# sourceMappingURL=index.js.map