var r = {};
r = function equal(r, e) {
    if (r === e) return true;
    if (r && e && "object" == typeof r && "object" == typeof e) {
        if (r.constructor !== e.constructor) return false;
        var t, f, o;
        if (Array.isArray(r)) {
            t = r.length;
            if (t != e.length) return false;
            for (f = t; 0 !== f--;)
                if (!equal(r[f], e[f])) return false;
            return true
        }
        if (r.constructor === RegExp) return r.source === e.source && r.flags === e.flags;
        if (r.valueOf !== Object.prototype.valueOf) return r.valueOf() === e.valueOf();
        if (r.toString !== Object.prototype.toString) return r.toString() === e.toString();
        o = Object.keys(r);
        t = o.length;
        if (t !== Object.keys(e).length) return false;
        for (f = t; 0 !== f--;)
            if (!Object.prototype.hasOwnProperty.call(e, o[f])) return false;
        for (f = t; 0 !== f--;) {
            var u = o[f];
            if (("_owner" !== u || !r.$$typeof) && !equal(r[u], e[u])) return false
        }
        return true
    }
    return r !== r && e !== e
};
var e = r;
export default e;

//# sourceMappingURL=react.js.map