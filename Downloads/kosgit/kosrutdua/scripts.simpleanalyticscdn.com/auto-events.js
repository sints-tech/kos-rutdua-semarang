/* Simple Analytics - Privacy friendly analytics (docs.simpleanalytics.com/script; 2023-05-03; 19c1; v11) */

function r(t, e) {
    var a, o = !1;
    h.downloads && /^https?:\/\//i.test(t.href) && new RegExp("\\.(" + (h.downloadsExtensions || []).join("|") + ")$", "i").test(t.pathname) ? o = "download" : h.outbound && /^https?:\/\//i.test(t.href) && t.hostname !== m.location.hostname ? o = "outbound" : h.emails && /^mailto:/i.test(t.href) && (o = "email"), o && (e ? (a = "saAutomatedLink(this, '" + o + "');", t.hasAttribute("target") && "_self" !== t.getAttribute("target") || (a += " return false;"), t.setAttribute("onclick", a)) : t.addEventListener("click", function(t) {
        saAutomatedLink(t.target, o)
    }))
}

function e() {
    try {
        for (var t = document.getElementsByTagName("a"), e = 0; e < t.length; e++) {
            var a = t[e],
                o = a.getAttribute("href");
            o && (a.getAttribute("onclick") || /^mailto:/.test(o) ? r(a, !1) : r(a, !0))
        }
    } catch (n) {
        b(n.message, "warn")
    }
}
var m, b, t, n, a, o, i, l, p, h;
void 0 !== (m = window) && (b = function(t, e) {
    var a = "warn" === e ? console.warn : console.info;
    return a && a("Simple Analytics auto events:", t)
}, t = m.document, n = t.currentScript || t.querySelector('script[src*="auto-events.js"]'), o = (a = function(t, e, a) {
    var o = n && n.dataset[t];
    return "bool" !== e || "true" !== o && "false" !== o ? "bool" === e ? a : "array" === e && o ? o.split(",").map(function(t) {
        return t.trim()
    }).filter(Boolean) : "array" !== e && o || a : "true" === o
})("collect", "array", ["outbound", "emails", "downloads"]), i = a("fullUrls", "bool", !1), l = {
    outbound: -1 < o.indexOf("outbound"),
    emails: -1 < o.indexOf("emails"),
    downloads: -1 < o.indexOf("downloads"),
    downloadsExtensions: a("extensions", "array", ["pdf", "csv", "docx", "xlsx", "zip", "doc", "xls"]),
    title: a("useTitle", "bool", !0),
    outboundFullUrl: i,
    downloadsFullUrl: i
}, p = a("saGlobal", "string", "sa_event"), void 0 === (h = l) && b("options object not found, please specify", "warn"), m.saAutomatedLink = function(t, e) {
    try {
        if (!t) return b("no element found");
        var a = !1,
            o = function() {
                a || t.hasAttribute("target") || (document.location = t.getAttribute("href")), a = !0
            };
        if (m[p] && m[p + "_loaded"]) {
            var n, r = t.hostname,
                i = t.pathname,
                l = {
                    title: t.getAttribute("title") || undefined
                },
                s = t.href || undefined,
                u = !1;
            if (h.title && t.hasAttribute("title") && ("" != (n = t.getAttribute("title").trim()) && (u = !0)), u) d = n;
            else switch (e) {
                case "outbound":
                    d = r + (h.outboundFullUrl ? i : ""), l.url = s;
                    break;
                case "download":
                    d = h.downloadsFullUrl ? r + i : i.split("/").pop(), l.url = s;
                    break;
                case "email":
                    var d = (t.getAttribute("href").split(":")[1] || "").split("?")[0];
                    l.email = d
            }
            var c = e + "_" + d.replace(/[^a-z0-9]+/gi, "_").replace(/(^_+|_+$)/g, "");
            return m[p](c, l, o), b("collected " + c), "email" === e ? o() : m.setTimeout(o, 5e3)
        }
        return b(p + " is not defined", "warn"), o()
    } catch (f) {
        b(f.message, "warn")
    }
}, "ready" === t.readyState || "complete" === t.readyState ? e() : document.addEventListener("readystatechange", function(t) {
    "complete" === t.target.readyState && e()
}));
//# sourceMappingURL=auto-events.js.map