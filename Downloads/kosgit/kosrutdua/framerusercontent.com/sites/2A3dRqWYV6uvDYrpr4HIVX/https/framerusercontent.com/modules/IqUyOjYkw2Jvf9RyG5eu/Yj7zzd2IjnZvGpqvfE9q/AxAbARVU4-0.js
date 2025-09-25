var t, e = Object.create,
    r = Object.defineProperty,
    n = Object.getOwnPropertyDescriptor,
    i = Object.getOwnPropertyNames,
    s = Object.getPrototypeOf,
    a = Object.prototype.hasOwnProperty,
    o = (t, e, n) => e in t ? r(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n,
    u = (t, e) => function() {
        return e || (0, t[i(t)[0]])((e = {
            exports: {}
        }).exports, e), e.exports;
    },
    l = (t, e, s, o) => {
        if (e && "object" == typeof e || "function" == typeof e)
            for (let u of i(e)) a.call(t, u) || u === s || r(t, u, {
                get: () => e[u],
                enumerable: !(o = n(e, u)) || o.enumerable
            });
        return t;
    },
    h = (t, n, i) => (i = null != t ? e(s(t)) : {}, l( // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        !n && t && t.__esModule ? i : r(i, "default", {
            value: t,
            enumerable: !0
        }), t)),
    c = (t, e, r) => o(t, "symbol" != typeof e ? e + "" : e, r),
    f = u({
        "../../../node_modules/dataloader/index.js" (t, e) {
            var r, n = /* @__PURE__ */ function() {
                    function t(t, e) {
                        if ("function" != typeof t) throw TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but got: " + t + ".");
                        this._batchLoadFn = t, this._maxBatchSize = function(t) {
                            if (!(!t || !1 !== t.batch)) return 1;
                            var e = t && t.maxBatchSize;
                            if (void 0 === e) return 1 / 0;
                            if ("number" != typeof e || e < 1) throw TypeError("maxBatchSize must be a positive number: " + e);
                            return e;
                        }(e), this._batchScheduleFn = function(t) {
                            var e = t && t.batchScheduleFn;
                            if (void 0 === e) return i;
                            if ("function" != typeof e) throw TypeError("batchScheduleFn must be a function: " + e);
                            return e;
                        }(e), this._cacheKeyFn = function(t) {
                            var e = t && t.cacheKeyFn;
                            if (void 0 === e) return function(t) {
                                return t;
                            };
                            if ("function" != typeof e) throw TypeError("cacheKeyFn must be a function: " + e);
                            return e;
                        }(e), this._cacheMap = function(t) {
                            if (!(!t || !1 !== t.cache)) return null;
                            var e = t && t.cacheMap;
                            if (void 0 === e) return /* @__PURE__ */ new Map;
                            if (null !== e) {
                                var r = ["get", "set", "delete", "clear"].filter(function(t) {
                                    return e && "function" != typeof e[t];
                                });
                                if (0 !== r.length) throw TypeError("Custom cacheMap missing methods: " + r.join(", "));
                            }
                            return e;
                        }(e), this._batch = null, this.name = e && e.name ? e.name : null;
                    }
                    var e = t.prototype;
                    return e.load = function(t) {
                        if (null == t) throw TypeError("The loader.load() function must be called with a value, but got: " + String(t) + ".");
                        var e = function(t) {
                                var e = t._batch;
                                if (null !== e && !e.hasDispatched && e.keys.length < t._maxBatchSize) return e;
                                var r = {
                                    hasDispatched: !1,
                                    keys: [],
                                    callbacks: []
                                };
                                return t._batch = r, t._batchScheduleFn(function() {
                                    (function(t, e) {
                                        var r;
                                        if (e.hasDispatched = !0, 0 === e.keys.length) {
                                            a(e);
                                            return;
                                        }
                                        try {
                                            r = t._batchLoadFn(e.keys);
                                        } catch (r) {
                                            return s(t, e, TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function errored synchronously: " + String(r) + "."));
                                        }
                                        if (!r || "function" != typeof r.then) return s(t, e, TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise: " + String(r) + "."));
                                        r.then(function(t) {
                                            if (!o(t)) throw TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array: " + String(t) + ".");
                                            if (t.length !== e.keys.length) throw TypeError("DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys.\n\nKeys:\n" + String(e.keys) + "\n\nValues:\n" + String(t));
                                            a(e);
                                            for (var r = 0; r < e.callbacks.length; r++) {
                                                var n = t[r];
                                                n instanceof Error ? e.callbacks[r].reject(n) : e.callbacks[r].resolve(n);
                                            }
                                        }).catch(function(r) {
                                            s(t, e, r);
                                        });
                                    })(t, r);
                                }), r;
                            }(this),
                            r = this._cacheMap,
                            n = this._cacheKeyFn(t);
                        if (r) {
                            var i = r.get(n);
                            if (i) {
                                var u = e.cacheHits || (e.cacheHits = []);
                                return new Promise(function(t) {
                                    u.push(function() {
                                        t(i);
                                    });
                                });
                            }
                        }
                        e.keys.push(t);
                        var l = new Promise(function(t, r) {
                            e.callbacks.push({
                                resolve: t,
                                reject: r
                            });
                        });
                        return r && r.set(n, l), l;
                    }, e.loadMany = function(t) {
                        if (!o(t)) throw TypeError("The loader.loadMany() function must be called with Array<key> but got: " + t + ".");
                        for (var e = [], r = 0; r < t.length; r++) e.push(this.load(t[r]).catch(function(t) {
                            return t;
                        }));
                        return Promise.all(e);
                    }, e.clear = function(t) {
                        var e = this._cacheMap;
                        if (e) {
                            var r = this._cacheKeyFn(t);
                            e.delete(r);
                        }
                        return this;
                    }, e.clearAll = function() {
                        var t = this._cacheMap;
                        return t && t.clear(), this;
                    }, e.prime = function(t, e) {
                        var r = this._cacheMap;
                        if (r) {
                            var n, i = this._cacheKeyFn(t);
                            void 0 === r.get(i) && (e instanceof Error ? (n = Promise.reject(e)).catch(function() {}) : n = Promise.resolve(e), r.set(i, n));
                        }
                        return this;
                    }, t;
                }(),
                i = "object" == typeof process && "function" == typeof process.nextTick ? function(t) {
                    r || (r = Promise.resolve()), r.then(function() {
                        process.nextTick(t);
                    });
                } : "function" == typeof setImmediate ? function(t) {
                    setImmediate(t);
                } : function(t) {
                    setTimeout(t);
                };

            function s(t, e, r) {
                a(e);
                for (var n = 0; n < e.keys.length; n++) t.clear(e.keys[n]), e.callbacks[n].reject(r);
            }

            function a(t) {
                if (t.cacheHits)
                    for (var e = 0; e < t.cacheHits.length; e++) t.cacheHits[e]();
            }

            function o(t) {
                return "object" == typeof t && null !== t && "number" == typeof t.length && (0 === t.length || t.length > 0 && Object.prototype.hasOwnProperty.call(t, t.length - 1));
            }
            e.exports = n;
        }
    }),
    d = h(f()),
    g = {
        Uint8: 1,
        Uint16: 2,
        Uint32: 4,
        BigUint64: 8,
        Int8: 1,
        Int16: 2,
        Int32: 4,
        BigInt64: 8,
        Float32: 4,
        Float64: 8
    },
    y = class {
        getOffset() {
            return this.offset;
        }
        ensureLength(t) {
            let e = this.bytes.length;
            if (!(this.offset + t <= e)) throw Error("Reading out of bounds");
        }
        readUint8() {
            let t = g.Uint8;
            this.ensureLength(t);
            let e = this.view.getUint8(this.offset);
            return this.offset += t, e;
        }
        readUint16() {
            let t = g.Uint16;
            this.ensureLength(t);
            let e = this.view.getUint16(this.offset);
            return this.offset += t, e;
        }
        readUint32() {
            let t = g.Uint32;
            this.ensureLength(t);
            let e = this.view.getUint32(this.offset);
            return this.offset += t, e;
        }
        readUint64() {
            let t = this.readBigUint64();
            return Number(t);
        }
        readBigUint64() {
            let t = g.BigUint64;
            this.ensureLength(t);
            let e = this.view.getBigUint64(this.offset);
            return this.offset += t, e;
        }
        readInt8() {
            let t = g.Int8;
            this.ensureLength(t);
            let e = this.view.getInt8(this.offset);
            return this.offset += t, e;
        }
        readInt16() {
            let t = g.Int16;
            this.ensureLength(t);
            let e = this.view.getInt16(this.offset);
            return this.offset += t, e;
        }
        readInt32() {
            let t = g.Int32;
            this.ensureLength(t);
            let e = this.view.getInt32(this.offset);
            return this.offset += t, e;
        }
        readInt64() {
            let t = this.readBigInt64();
            return Number(t);
        }
        readBigInt64() {
            let t = g.BigInt64;
            this.ensureLength(t);
            let e = this.view.getBigInt64(this.offset);
            return this.offset += t, e;
        }
        readFloat32() {
            let t = g.Float32;
            this.ensureLength(t);
            let e = this.view.getFloat32(this.offset);
            return this.offset += t, e;
        }
        readFloat64() {
            let t = g.Float64;
            this.ensureLength(t);
            let e = this.view.getFloat64(this.offset);
            return this.offset += t, e;
        }
        readBytes(t) {
            let e = this.offset,
                r = e + t,
                n = this.bytes.subarray(e, r);
            return this.offset = r, n;
        }
        readString() {
            let t = this.readUint32(),
                e = this.readBytes(t);
            return this.decoder.decode(e);
        }
        readJson() {
            let t = this.readString();
            return JSON.parse(t);
        }
        constructor(t) {
            this.bytes = t, c(this, "offset", 0), c(this, "view"), c(this, "decoder", new TextDecoder), this.view = p(this.bytes);
        }
    };

function p(t) {
    return new DataView(t.buffer, t.byteOffset, t.byteLength);
} // src/code-generation/components/cms/bundled/DatabaseDictionaryIndex.ts
import {
    ControlType as v
} from "framer"; // ../../library/src/utils/utils.ts
var m = "undefined" != typeof window,
    w = m && "function" == typeof window.requestIdleCallback; // src/code-generation/components/cms/bundled/assert.ts
function I(t, ...e) {
    if (!t) throw Error("Assertion Error" + (e.length > 0 ? ": " + e.join(" ") : ""));
}

function b(t) {
    throw Error(`Unexpected value: ${t}`);
} // src/code-generation/components/cms/bundled/BufferWriter.ts
var U = 1024,
    S = 1.5,
    k = t => 2 ** t - 1,
    L = t => -(2 ** (t - 1)),
    B = t => 2 ** (t - 1) - 1,
    E = {
        Uint8: 0,
        Uint16: 0,
        Uint32: 0,
        Uint64: 0,
        BigUint64: 0,
        Int8: L(8),
        Int16: L(16),
        Int32: L(32),
        Int64: Number.MIN_SAFE_INTEGER,
        BigInt64: -(BigInt(2) ** BigInt(63))
    },
    M = {
        Uint8: k(8),
        Uint16: k(16),
        Uint32: k(32),
        Uint64: Number.MAX_SAFE_INTEGER,
        BigUint64: BigInt(2) ** BigInt(64) - BigInt(1),
        Int8: B(8),
        Int16: B(16),
        Int32: B(32),
        Int64: Number.MAX_SAFE_INTEGER,
        BigInt64: BigInt(2) ** BigInt(63) - BigInt(1)
    };

function T(t, e, r, n) {
    I(t >= e, t, "outside lower bound for", n), I(t <= r, t, "outside upper bound for", n);
}
var F = class {
    getOffset() {
        return this.offset;
    }
    slice(t = 0, e = this.offset) {
        return this.bytes.slice(t, e);
    }
    subarray(t = 0, e = this.offset) {
        return this.bytes.subarray(t, e);
    }
    ensureLength(t) {
        let e = this.bytes.length;
        if (this.offset + t <= e) return;
        let r = new Uint8Array(Math.ceil(e * S) + t);
        r.set(this.bytes), this.bytes = r, this.view = p(r);
    }
    writeUint8(t) {
        T(t, E.Uint8, M.Uint8, "Uint8");
        let e = g.Uint8;
        this.ensureLength(e), this.view.setUint8(this.offset, t), this.offset += e;
    }
    writeUint16(t) {
        T(t, E.Uint16, M.Uint16, "Uint16");
        let e = g.Uint16;
        this.ensureLength(e), this.view.setUint16(this.offset, t), this.offset += e;
    }
    writeUint32(t) {
        T(t, E.Uint32, M.Uint32, "Uint32");
        let e = g.Uint32;
        this.ensureLength(e), this.view.setUint32(this.offset, t), this.offset += e;
    }
    writeUint64(t) {
        T(t, E.Uint64, M.Uint64, "Uint64");
        let e = BigInt(t);
        this.writeBigUint64(e);
    }
    writeBigUint64(t) {
        T(t, E.BigUint64, M.BigUint64, "BigUint64");
        let e = g.BigUint64;
        this.ensureLength(e), this.view.setBigUint64(this.offset, t), this.offset += e;
    }
    writeInt8(t) {
        T(t, E.Int8, M.Int8, "Int8");
        let e = g.Int8;
        this.ensureLength(e), this.view.setInt8(this.offset, t), this.offset += e;
    }
    writeInt16(t) {
        T(t, E.Int16, M.Int16, "Int16");
        let e = g.Int16;
        this.ensureLength(e), this.view.setInt16(this.offset, t), this.offset += e;
    }
    writeInt32(t) {
        T(t, E.Int32, M.Int32, "Int32");
        let e = g.Int32;
        this.ensureLength(e), this.view.setInt32(this.offset, t), this.offset += e;
    }
    writeInt64(t) {
        T(t, E.Int64, M.Int64, "Int64");
        let e = BigInt(t);
        this.writeBigInt64(e);
    }
    writeBigInt64(t) {
        T(t, E.BigInt64, M.BigInt64, "BigInt64");
        let e = g.BigInt64;
        this.ensureLength(e), this.view.setBigInt64(this.offset, t), this.offset += e;
    }
    writeFloat32(t) {
        let e = g.Float32;
        this.ensureLength(e), this.view.setFloat32(this.offset, t), this.offset += e;
    }
    writeFloat64(t) {
        let e = g.Float64;
        this.ensureLength(e), this.view.setFloat64(this.offset, t), this.offset += e;
    }
    writeBytes(t) {
        let e = t.length;
        this.ensureLength(e), this.bytes.set(t, this.offset), this.offset += e;
    }
    encodeString(t) {
        let e = this.encodedStrings.get(t);
        if (e) return e;
        let r = this.encoder.encode(t);
        return this.encodedStrings.set(t, r), r;
    }
    writeString(t) {
        let e = this.encodeString(t),
            r = e.length;
        this.writeUint32(r), this.writeBytes(e);
    }
    writeJson(t) {
        let e = JSON.stringify(t);
        this.writeString(e);
    }
    constructor() {
        c(this, "offset", 0), c(this, "bytes", new Uint8Array(U)), c(this, "view", p(this.bytes)), c(this, "encoder", new TextEncoder), c(this, "encodedStrings", /* @__PURE__ */ new Map);
    }
}; // src/utils/typeChecks.ts
function x(t) {
    return "string" == typeof t;
}

function N(t) {
    return Number.isFinite(t);
}

function A(t) {
    return null === t;
} // src/code-generation/components/cms/bundled/models/DatabaseItemPointerModel.ts
var O = class t {
    static fromString(e) {
        let [r, n, i] = e.split("/").map(Number);
        return I(N(r), "Invalid chunkId"), I(N(n), "Invalid offset"), I(N(i), "Invalid length"), new t(r, n, i);
    }
    toString() {
        return `${this.chunkId}/${this.offset}/${this.length}`;
    }
    static read(e) {
        let r = e.readUint16(),
            n = e.readUint32(),
            i = e.readUint32();
        return new t(r, n, i);
    }
    write(t) {
        t.writeUint16(this.chunkId), t.writeUint32(this.offset), t.writeUint32(this.length);
    }
    compare(t) {
        return this.chunkId < t.chunkId ? -1 : this.chunkId > t.chunkId ? 1 : this.offset < t.offset ? -1 : this.offset > t.offset ? 1 : (I(this.length === t.length), 0);
    }
    constructor(t, e, r) {
        this.chunkId = t, this.offset = e, this.length = r;
    }
}; // src/code-generation/components/cms/bundled/models/DatabaseValueModel.ts
import {
    ControlType as P
} from "framer";

function R(t) {
    if (A(t)) return 0 /* Null */ ;
    switch (t.type) {
        case P.Array:
            return 1 /* Array */ ;
        case P.Boolean:
            return 2 /* Boolean */ ;
        case P.Color:
            return 3 /* Color */ ;
        case P.Date:
            return 4 /* Date */ ;
        case P.Enum:
            return 5 /* Enum */ ;
        case P.File:
            return 6 /* File */ ;
        case P.ResponsiveImage:
            return 10 /* ResponsiveImage */ ;
        case P.Link:
            return 7 /* Link */ ;
        case P.Number:
            return 8 /* Number */ ;
        case P.Object:
            return 9 /* Object */ ;
        case P.RichText:
            return 11 /* RichText */ ;
        case P.String:
            return 12 /* String */ ;
        case P.VectorSetItem:
            return 13 /* VectorSetItem */ ;
        default:
            b(t);
    }
}

function q(e) {
    let r = e.readUint16(),
        n = [];
    for (let i = 0; i < r; i++) {
        let r = t.read(e);
        n.push(r);
    }
    return {
        type: P.Array,
        value: n
    };
}

function _(e, r) {
    for (let n of (e.writeUint16(r.value.length), r.value)) t.write(e, n);
}

function D(e, r, n) {
    let i = e.value.length,
        s = r.value.length;
    if (i < s) return -1;
    if (i > s) return 1;
    for (let s = 0; s < i; s++) {
        let i = e.value[s],
            a = r.value[s],
            o = t.compare(i, a, n);
        if (0 !== o) return o;
    }
    return 0;
}

function j(t) {
    return {
        type: P.Boolean,
        value: 0 !== t.readUint8()
    };
}

function C(t, e) {
    t.writeUint8(e.value ? 1 : 0);
}

function J(t, e) {
    return t.value < e.value ? -1 : t.value > e.value ? 1 : 0;
}

function V(t) {
    return {
        type: P.Color,
        value: t.readString()
    };
}

function W(t, e) {
    t.writeString(e.value);
}

function $(t, e) {
    return t.value < e.value ? -1 : t.value > e.value ? 1 : 0;
}

function z(t) {
    let e = t.readInt64(),
        r = new Date(e);
    return {
        type: P.Date,
        value: r.toISOString()
    };
}

function G(t, e) {
    let r = new Date(e.value),
        n = r.getTime();
    t.writeInt64(n);
}

function K(t, e) {
    let r = new Date(t.value),
        n = new Date(e.value);
    return r < n ? -1 : r > n ? 1 : 0;
}

function H(t) {
    return {
        type: P.Enum,
        value: t.readString()
    };
}

function X(t, e) {
    t.writeString(e.value);
}

function Q(t, e) {
    return t.value < e.value ? -1 : t.value > e.value ? 1 : 0;
}

function Y(t) {
    return {
        type: P.File,
        value: t.readString()
    };
}

function Z(t, e) {
    t.writeString(e.value);
}

function tt(t, e) {
    return t.value < e.value ? -1 : t.value > e.value ? 1 : 0;
}

function te(t) {
    return {
        type: P.Link,
        value: t.readJson()
    };
}

function tr(t, e) {
    t.writeJson(e.value);
}

function tn(t, e) {
    let r = JSON.stringify(t.value),
        n = JSON.stringify(e.value);
    return r < n ? -1 : r > n ? 1 : 0;
}

function ti(t) {
    return {
        type: P.Number,
        value: t.readFloat64()
    };
}

function ts(t, e) {
    t.writeFloat64(e.value);
}

function ta(t, e) {
    return t.value < e.value ? -1 : t.value > e.value ? 1 : 0;
}

function to(e) {
    let r = e.readUint16(),
        n = {};
    for (let i = 0; i < r; i++) {
        let r = e.readString();
        n[r] = t.read(e);
    }
    return {
        type: P.Object,
        value: n
    };
}

function tu(e, r) {
    let n = Object.entries(r.value);
    for (let [r, i] of (e.writeUint16(n.length), n)) e.writeString(r), t.write(e, i);
}

function tl(e, r, n) {
    let i = Object.keys(e.value).sort(),
        s = Object.keys(r.value).sort();
    if (i.length < s.length) return -1;
    if (i.length > s.length) return 1;
    for (let a = 0; a < i.length; a++) {
        let o = i[a],
            u = s[a];
        if (o < u) return -1;
        if (o > u) return 1;
        let l = e.value[o] ? ? null,
            h = r.value[u] ? ? null,
            c = t.compare(l, h, n);
        if (0 !== c) return c;
    }
    return 0;
}

function th(t) {
    return {
        type: P.ResponsiveImage,
        value: t.readJson()
    };
}

function tc(t, e) {
    t.writeJson(e.value);
}

function tf(t, e) {
    let r = JSON.stringify(t.value),
        n = JSON.stringify(e.value);
    return r < n ? -1 : r > n ? 1 : 0;
}

function td(t) {
    let e = t.readInt8();
    if (0 === e) return {
        type: P.RichText,
        value: t.readUint32()
    };
    if (1 === e) return {
        type: P.RichText,
        value: t.readString()
    };
    throw Error("Invalid rich text pointer");
}

function tg(t, e) {
    if (N(e.value)) {
        t.writeInt8(0), t.writeUint32(e.value);
        return;
    }
    if (x(e.value)) {
        t.writeInt8(1), t.writeString(e.value);
        return;
    }
    throw Error("Invalid rich text pointer");
}

function ty(t, e) {
    let r = t.value,
        n = e.value;
    if (N(r) && N(n) || x(r) && x(n)) return r < n ? -1 : r > n ? 1 : 0;
    throw Error("Invalid rich text pointer");
}

function tp(t) {
    return {
        type: P.String,
        value: t.readString()
    };
}

function tv(t, e) {
    t.writeString(e.value);
}

function tm(t, e, r) {
    let n = t.value,
        i = e.value;
    return (0 /* CaseInsensitive */ === r.type && (n = t.value.toLowerCase(), i = e.value.toLowerCase()), n < i) ? -1 : n > i ? 1 : 0;
}

function tw(t) {
    return {
        type: P.VectorSetItem,
        value: t.readUint32()
    };
}

function tI(t, e) {
    t.writeUint32(e.value);
}

function tb(t, e) {
    let r = t.value,
        n = e.value;
    return r < n ? -1 : r > n ? 1 : 0;
}(t => {
    t.read = function(t) {
        let e = t.readUint8();
        switch (e) {
            case 0 /* Null */ :
                return null;
            case 1 /* Array */ :
                return q(t);
            case 2 /* Boolean */ :
                return j(t);
            case 3 /* Color */ :
                return V(t);
            case 4 /* Date */ :
                return z(t);
            case 5 /* Enum */ :
                return H(t);
            case 6 /* File */ :
                return Y(t);
            case 7 /* Link */ :
                return te(t);
            case 8 /* Number */ :
                return ti(t);
            case 9 /* Object */ :
                return to(t);
            case 10 /* ResponsiveImage */ :
                return th(t);
            case 11 /* RichText */ :
                return td(t);
            case 12 /* String */ :
                return tp(t);
            case 13 /* VectorSetItem */ :
                return tw(t);
            default:
                b(e);
        }
    }, t.write = function(t, e) {
        let r = R(e);
        if (t.writeUint8(r), !A(e)) switch (e.type) {
            case P.Array:
                return _(t, e);
            case P.Boolean:
                return C(t, e);
            case P.Color:
                return W(t, e);
            case P.Date:
                return G(t, e);
            case P.Enum:
                return X(t, e);
            case P.File:
                return Z(t, e);
            case P.Link:
                return tr(t, e);
            case P.Number:
                return ts(t, e);
            case P.Object:
                return tu(t, e);
            case P.ResponsiveImage:
                return tc(t, e);
            case P.RichText:
                return tg(t, e);
            case P.VectorSetItem:
                return tI(t, e);
            case P.String:
                return tv(t, e);
            default:
                b(e);
        }
    }, t.compare = function(t, e, r) {
        let n = R(t),
            i = R(e);
        if (n < i) return -1;
        if (n > i) return 1;
        if (A(t) || A(e)) return 0;
        switch (t.type) {
            case P.Array:
                return I(e.type === P.Array), D(t, e, r);
            case P.Boolean:
                return I(e.type === P.Boolean), J(t, e);
            case P.Color:
                return I(e.type === P.Color), $(t, e);
            case P.Date:
                return I(e.type === P.Date), K(t, e);
            case P.Enum:
                return I(e.type === P.Enum), Q(t, e);
            case P.File:
                return I(e.type === P.File), tt(t, e);
            case P.Link:
                return I(e.type === P.Link), tn(t, e);
            case P.Number:
                return I(e.type === P.Number), ta(t, e);
            case P.Object:
                return I(e.type === P.Object), tl(t, e, r);
            case P.ResponsiveImage:
                return I(e.type === P.ResponsiveImage), tf(t, e);
            case P.RichText:
                return I(e.type === P.RichText), ty(t, e);
            case P.VectorSetItem:
                return I(e.type === P.VectorSetItem), tb(t, e);
            case P.String:
                return I(e.type === P.String), tm(t, e, r);
            default:
                b(t);
        }
    };
})(t || (t = {})); // src/code-generation/components/cms/bundled/models/DatabaseDictionaryIndexModel.ts
var tU = class e {
        sortEntries() {
            this.entries.sort((e, r) => {
                for (let n = 0; n < this.fieldNames.length; n++) {
                    let i = e.values[n],
                        s = r.values[n],
                        a = t.compare(i, s, this.options.collation);
                    if (0 !== a) return a;
                }
                return e.pointer.compare(r.pointer);
            });
        }
        static deserialize(r) {
            let n = new y(r),
                i = n.readJson(),
                s = n.readUint8(),
                a = [];
            for (let t = 0; t < s; t++) {
                let t = n.readString();
                a.push(t);
            }
            let o = new e(a, {
                    collation: i
                }),
                u = n.readUint32();
            for (let e = 0; e < u; e++) {
                let e = [];
                for (let r = 0; r < s; r++) {
                    let r = t.read(n);
                    e.push(r);
                }
                let r = O.read(n);
                o.entries.push({
                    values: e,
                    pointer: r
                });
            }
            return o;
        }
        serialize() {
            let e = new F;
            for (let t of (e.writeJson(this.options.collation), e.writeUint8(this.fieldNames.length), this.fieldNames)) e.writeString(t);
            for (let r of (this.sortEntries(), e.writeUint32(this.entries.length), this.entries)) {
                let {
                    values: n,
                    pointer: i
                } = r;
                for (let r of n) t.write(e, r);
                i.write(e);
            }
            return e.subarray();
        }
        addItem(t, e) {
            let r = this.fieldNames.map(e => t.getField(e) ? ? null);
            this.entries.push({
                values: r,
                pointer: e
            });
        }
        constructor(t, e) {
            this.fieldNames = t, this.options = e, c(this, "entries", []);
        }
    },
    tS = 3,
    tk = 250,
    tL = [408, // Request Timeout
        429, // Too Many Requests
        500, // Internal Server Error
        502, // Bad Gateway
        503, // Service Unavailable
        504
    ],
    tB = async (t, e) => {
        let r = 0;
        for (;;) {
            try {
                let n = await fetch(t, e);
                if (!tL.includes(n.status) || ++r > tS) return n;
            } catch (t) {
                if (e ? .signal ? .aborted || ++r > tS) throw t;
            }
            await tE(r);
        }
    };
async function tE(t) {
    let e = Math.floor(tk * (Math.random() + 1) * 2 ** (t - 1));
    await new Promise(t => {
        setTimeout(t, e);
    });
} // src/code-generation/components/cms/bundled/rangeRequest.ts
async function tM(t, e) {
    let r = tx(e),
        n = [],
        i = 0;
    for (let t of r) n.push(`${t.from}-${t.to-1}`), i += t.to - t.from;
    let s = new URL(t),
        a = n.join(",");
    s.searchParams.set("range", a);
    let o = await tB(s);
    if (200 !== o.status) throw Error(`Request failed: ${o.status} ${o.statusText}`);
    let u = await o.arrayBuffer(),
        l = new Uint8Array(u);
    if (l.length !== i) throw Error("Request failed: Unexpected response length");
    let h = new tT,
        c = 0;
    for (let t of r) {
        let e = t.to - t.from,
            r = c + e,
            n = l.subarray(c, r);
        h.write(t.from, n), c = r;
    }
    return e.map(t => h.read(t.from, t.to - t.from));
}
var tT = class {
    read(t, e) {
        for (let r of this.chunks) {
            if (t < r.start) break;
            if (t > r.end) continue;
            if (t + e > r.end) break;
            let n = t - r.start,
                i = n + e;
            return r.data.slice(n, i);
        }
        throw Error("Missing data");
    }
    write(t, e) {
        let r = t,
            n = r + e.length,
            i = 0,
            s = this.chunks.length;
        for (; i < s; i++) {
            let t = this.chunks[i];
            if (I(t, "Missing chunk"), !(r > t.end)) {
                if (r > t.start) {
                    let n = r - t.start,
                        i = t.data.subarray(0, n);
                    e = tF(i, e), r = t.start;
                }
                break;
            }
        }
        for (; s > i; s--) {
            let t = this.chunks[s - 1];
            if (I(t, "Missing chunk"), !(n < t.start)) {
                if (n < t.end) {
                    let r = n - t.start,
                        i = t.data.subarray(r);
                    e = tF(e, i), n = t.end;
                }
                break;
            }
        }
        let a = {
                start: r,
                end: n,
                data: e
            },
            o = s - i;
        this.chunks.splice(i, o, a);
    }
    constructor() {
        c(this, "chunks", []);
    }
};

function tF(t, e) {
    let r = t.length + e.length,
        n = new Uint8Array(r);
    return n.set(t, 0), n.set(e, t.length), n;
}

function tx(t) {
    I(t.length > 0, "Must have at least one range");
    let e = [...t].sort((t, e) => t.from - e.from),
        r = [];
    for (let t of e) {
        let e = r.length - 1,
            n = r[e];
        n && t.from <= n.to ? r[e] = {
            from: n.from,
            to: Math.max(n.to, t.to)
        } : r.push(t);
    }
    return r;
} // src/code-generation/components/cms/bundled/DatabaseDictionaryIndex.ts
var tN = class {
        async loadModel() {
            let [t] = await tM(this.options.url, [this.options.range]);
            return I(t, "Failed to load model"), tU.deserialize(t);
        }
        async getModel() {
            return this.modelPromise ? ? = this.loadModel(), this.model ? ? = await this.modelPromise, this.model;
        }
        async lookupItems(t) {
            I(t.length === this.fields.length, "Invalid query length");
            let e = await this.getModel(),
                r = t.reduce((t, e, r) => t.flatMap(t => {
                    switch (e.type) {
                        case "All" /* All */ :
                            return [t];
                        case "Equals" /* Equals */ :
                            return this.queryEquals(t, e, r);
                        case "NotEquals" /* NotEquals */ :
                            return this.queryNotEquals(t, e, r);
                        case "LessThan" /* LessThan */ :
                            return this.queryLessThan(t, e, r);
                        case "GreaterThan" /* GreaterThan */ :
                            return this.queryGreaterThan(t, e, r);
                        case "Contains" /* Contains */ :
                            return this.queryContains(t, e, r);
                        case "StartsWith" /* StartsWith */ :
                            return this.queryStartsWith(t, e, r);
                        case "EndsWith" /* EndsWith */ :
                            return this.queryEndsWith(t, e, r);
                        default:
                            b(e);
                    }
                }), [e.entries]),
                n = [];
            for (let t of r)
                for (let e of t) {
                    let t = {};
                    for (let r = 0; r < this.options.fieldNames.length; r++) {
                        let n = this.options.fieldNames[r],
                            i = e.values[r];
                        t[n] = i;
                    }
                    n.push({
                        pointer: e.pointer.toString(),
                        data: t
                    });
                }
            return n;
        }
        queryEquals(t, e, r) {
            let n = this.getLeftMost(t, r, e.value),
                i = this.getRightMost(t, r, e.value),
                s = t.slice(n, i + 1);
            return s.length > 0 ? [s] : [];
        }
        queryNotEquals(t, e, r) {
            let n = this.getLeftMost(t, r, e.value),
                i = this.getRightMost(t, r, e.value),
                s = [],
                a = t.slice(0, n);
            a.length > 0 && s.push(a);
            let o = t.slice(i + 1);
            return o.length > 0 && s.push(o), s;
        }
        queryLessThan(t, e, r) {
            let n = this.getRightMost(t, r, null);
            if (t = t.slice(n + 1), e.inclusive) {
                let n = this.getRightMost(t, r, e.value),
                    i = t.slice(0, n + 1);
                return i.length > 0 ? [i] : [];
            }
            let i = this.getLeftMost(t, r, e.value),
                s = t.slice(0, i);
            return s.length > 0 ? [s] : [];
        }
        queryGreaterThan(t, e, r) {
            let n = this.getRightMost(t, r, null);
            if (t = t.slice(n + 1), e.inclusive) {
                let n = this.getLeftMost(t, r, e.value),
                    i = t.slice(n);
                return i.length > 0 ? [i] : [];
            }
            let i = this.getRightMost(t, r, e.value),
                s = t.slice(i + 1);
            return s.length > 0 ? [s] : [];
        }
        queryContains(t, e, r) {
            return this.findItems(t, r, t => {
                if (t ? .type !== v.String || e.value ? .type !== v.String) return !1;
                let r = t.value,
                    n = e.value.value;
                return 0 /* CaseInsensitive */ === this.collation.type && (r = r.toLowerCase(), n = n.toLowerCase()), r.includes(n);
            });
        }
        queryStartsWith(t, e, r) {
            return this.findItems(t, r, t => {
                if (t ? .type !== v.String || e.value ? .type !== v.String) return !1;
                let r = t.value,
                    n = e.value.value;
                return 0 /* CaseInsensitive */ === this.collation.type && (r = r.toLowerCase(), n = n.toLowerCase()), r.startsWith(n);
            });
        }
        queryEndsWith(t, e, r) {
            return this.findItems(t, r, t => {
                if (t ? .type !== v.String || e.value ? .type !== v.String) return !1;
                let r = t.value,
                    n = e.value.value;
                return 0 /* CaseInsensitive */ === this.collation.type && (r = r.toLowerCase(), n = n.toLowerCase()), r.endsWith(n);
            });
        }
        /**
         * Returns the index of the left most entry that is equal to the target.
         *
         * ```text
         *   Left most
         *       ↓
         * ┌───┬───┬───┬───┬───┬───┐
         * │ 1 │ 2 │ 2 │ 2 │ 2 │ 3 │
         * └───┴───┴───┴───┴───┴───┘
         * ```
         *
         * @param entries The entries array to search in.
         * @param position The position of the value in the entry.
         * @param target The target value to search for.
         * @returns The index of the left most entry that is equal to the target.
         */
        getLeftMost(e, r, n) {
            let i = 0,
                s = e.length;
            for (; i < s;) {
                let a = i + s >> 1,
                    o = e[a],
                    u = o.values[r];
                0 > t.compare(u, n, this.collation) ? i = a + 1 : s = a;
            }
            return i;
        }
        /**
         * Returns the index of the right most entry that is equal to the target.
         *
         * ```text
         *              Right most
         *                   ↓
         * ┌───┬───┬───┬───┬───┬───┐
         * │ 1 │ 2 │ 2 │ 2 │ 2 │ 3 │
         * └───┴───┴───┴───┴───┴───┘
         * ```
         *
         * @param entries The entries array to search in.
         * @param position The position of the value in the entry.
         * @param target The target value to search for.
         * @returns The index of the right most entry that is equal to the target.
         */
        getRightMost(e, r, n) {
            let i = 0,
                s = e.length;
            for (; i < s;) {
                let a = i + s >> 1,
                    o = e[a],
                    u = o.values[r];
                t.compare(u, n, this.collation) > 0 ? s = a : i = a + 1;
            }
            return s - 1;
        }
        /**
         * Finds all items that are matching the predicate and groups adjacent items together.
         *
         * @param entries The entries array to search in.
         * @param position The position of the value in the entry.
         * @param predicate The predicate to match the values against.
         * @returns An array of chunks that match the predicate.
         */
        findItems(t, e, r) {
            let n = [],
                i = 0;
            for (let s = 0; s < t.length; s++) {
                let a = t[s],
                    o = a.values[e],
                    u = r(o);
                if (!u) {
                    if (i < s) {
                        let e = t.slice(i, s);
                        n.push(e);
                    }
                    i = s + 1;
                }
            }
            if (i < t.length) {
                let e = t.slice(i);
                n.push(e);
            }
            return n;
        }
        constructor(t) {
            this.options = t, c(this, "schema"), c(this, "fields"), c(this, "supportedLookupTypes", ["All" /* All */ , "Equals" /* Equals */ , "NotEquals" /* NotEquals */ , "LessThan" /* LessThan */ , "GreaterThan" /* GreaterThan */ , "Contains" /* Contains */ , "StartsWith" /* StartsWith */ , "EndsWith" /* EndsWith */ ]), c(this, "modelPromise"), c(this, "model"), c(this, "collation");
            let e = {},
                r = [];
            for (let t of this.options.fieldNames) {
                let n = this.options.collectionSchema[t];
                I(n, "Missing definition for field", t), e[t] = n, r.push({
                    type: "Identifier",
                    name: t
                });
            }
            this.schema = e, this.fields = r, this.collation = this.options.collation;
        }
    },
    tA = class e {
        static read(r) {
            let n = new e,
                i = r.readUint16();
            for (let e = 0; e < i; e++) {
                let e = r.readString(),
                    i = t.read(r);
                n.setField(e, i);
            }
            return n;
        }
        write(e) {
            for (let [r, n] of (e.writeUint16(this.fields.size), this.fields)) e.writeString(r), t.write(e, n);
        }
        getData() {
            let t = {};
            for (let [e, r] of this.fields) t[e] = r;
            return t;
        }
        setField(t, e) {
            this.fields.set(t, e);
        }
        getField(t) {
            return this.fields.get(t);
        }
        constructor() {
            c(this, "fields", /* @__PURE__ */ new Map);
        }
    },
    tO = class {
        scanItems() {
            return this.itemsPromise ? ? = tB(this.url).then(async t => {
                if (!t.ok) throw Error(`Request failed: ${t.status} ${t.statusText}`);
                let e = await t.arrayBuffer(),
                    r = new Uint8Array(e),
                    n = new y(r),
                    i = [],
                    s = n.readUint32();
                for (let t = 0; t < s; t++) {
                    let t = n.getOffset(),
                        e = tA.read(n),
                        r = n.getOffset() - t,
                        s = new O(this.id, t, r),
                        a = s.toString(),
                        o = {
                            pointer: a,
                            data: e.getData()
                        };
                    this.itemLoader.prime(a, o), i.push(o);
                }
                return i;
            }), this.itemsPromise;
        }
        resolveItem(t) {
            return this.itemLoader.load(t);
        }
        constructor(t, e) {
            this.id = t, this.url = e, c(this, "itemsPromise"), c(this, "itemLoader", new d.default(async t => {
                let e = t.map(t => {
                        let e = O.fromString(t);
                        return {
                            from: e.offset,
                            to: e.offset + e.length
                        };
                    }),
                    r = await tM(this.url, e);
                return r.map((e, r) => {
                    let n = new y(e),
                        i = tA.read(n),
                        s = t[r];
                    return I(s, "Missing pointer"), {
                        pointer: s,
                        data: i.getData()
                    };
                });
            }));
        }
    },
    tP = class {
        async scanItems() {
            let t = await Promise.all(this.chunks.map(async t => t.scanItems()));
            return t.flat();
        }
        async resolveItems(t) {
            return Promise.all(t.map(t => {
                let e = O.fromString(t),
                    r = this.chunks[e.chunkId];
                return I(r, "Missing chunk"), r.resolveItem(t);
            }));
        }
        compareItems(t, e) {
            let r = O.fromString(t.pointer),
                n = O.fromString(e.pointer);
            return r.compare(n);
        }
        compareValues(e, r, n) {
            return t.compare(e, r, n);
        }
        constructor(t) {
            this.options = t, c(this, "schema"), c(this, "indexes"), c(this, "resolveRichText"), c(this, "resolveVectorSetItem"), c(this, "chunks"), this.chunks = this.options.chunks.map((t, e) => new tO(e, t)), this.schema = t.schema, this.indexes = t.indexes, this.resolveRichText = t.resolveRichText, this.resolveVectorSetItem = t.resolveVectorSetItem;
        }
    };
export {
    tP as DatabaseCollection, tN as DatabaseDictionaryIndex
};
export const __FramerMetadata__ = {
    "exports": {
        "DatabaseCollection": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "DatabaseDictionaryIndex": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}