﻿/*!
 * bean.js - copyright Jacob Thornton 2011
 * https://github.com/fat/bean
 * MIT License
 * special thanks to:
 * dean edwards: http://dean.edwards.name/
 * dperini: https://github.com/dperini/nwevents
 * the entire mootools team: github.com/mootools/mootools-core
 */
/*global module:true, define:true*/
! function(e, t, n) { typeof module != "undefined" ? module.exports = n(e, t) : typeof define == "function" && typeof define.amd == "object" ? define(n) : t[e] = n(e, t) }("bean", this, function(e, t) {
    var n = window,
        r = t[e],
        i = /over|out/,
        s = /[^\.]*(?=\..*)\.|.*/,
        o = /\..*/,
        u = "addEventListener",
        a = "attachEvent",
        f = "removeEventListener",
        l = "detachEvent",
        c = document || {},
        h = c.documentElement || {},
        p = h[u],
        d = p ? u : a,
        v = Array.prototype.slice,
        m = /click|mouse|menu|drag|drop/i,
        g = /^touch|^gesture/i,
        y = { one: 1 },
        b = function(e, t, n) { for (n = 0; n < t.length; n++) e[t[n]] = 1; return e }({}, ("click dblclick mouseup mousedown contextmenu mousewheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange error abort scroll " + (p ? "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend message readystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete " : "")).split(" ")),
        w = function() {
            function e(e, t) {
                while ((t = t.parentNode) !== null)
                    if (t === e) return !0;
                return !1
            }

            function t(t) { var n = t.relatedTarget; return n ? n !== this && n.prefix !== "xul" && !/document/.test(this.toString()) && !e(this, n) : n === null }
            return { mouseenter: { base: "mouseover", condition: t }, mouseleave: { base: "mouseout", condition: t }, mousewheel: { base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel" } }
        }(),
        E = function() {
            var e = "altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which".split(" "),
                t = e.concat("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" ")),
                n = e.concat("char charCode key keyCode".split(" ")),
                r = e.concat("touches targetTouches changedTouches scale rotation".split(" ")),
                s = "preventDefault",
                o = function(e) { return function() { e[s] ? e[s]() : e.returnValue = !1 } },
                u = "stopPropagation",
                a = function(e) { return function() { e[u] ? e[u]() : e.cancelBubble = !0 } },
                f = function(e) { return function() { e[s](), e[u](), e.stopped = !0 } },
                l = function(e, t, n) { var r, i; for (r = n.length; r--;) i = n[r], !(i in t) && i in e && (t[i] = e[i]) };
            return function(p, d) {
                var v = { originalEvent: p, isNative: d };
                if (!p) return v;
                var y, b = p.type,
                    w = p.target || p.srcElement;
                v[s] = o(p), v[u] = a(p), v.stop = f(v), v.target = w && w.nodeType === 3 ? w.parentNode : w;
                if (d) {
                    if (b.indexOf("key") !== -1) y = n, v.keyCode = p.which || p.keyCode;
                    else if (m.test(b)) {
                        y = t, v.rightClick = p.which === 3 || p.button === 2, v.pos = { x: 0, y: 0 };
                        if (p.pageX || p.pageY) v.clientX = p.pageX, v.clientY = p.pageY;
                        else if (p.clientX || p.clientY) v.clientX = p.clientX + c.body.scrollLeft + h.scrollLeft, v.clientY = p.clientY + c.body.scrollTop + h.scrollTop;
                        i.test(b) && (v.relatedTarget = p.relatedTarget || p[(b === "mouseover" ? "from" : "to") + "Element"])
                    } else g.test(b) && (y = r);
                    l(p, v, y || e)
                }
                return v
            }
        }(),
        S = function(e, t) { return !p && !t && (e === c || e === n) ? h : e },
        x = function() {
            function e(e, t, n, r, i) { this.element = e, this.type = t, this.handler = n, this.original = r, this.namespaces = i, this.custom = w[t], this.isNative = b[t] && e[d], this.eventType = p || this.isNative ? t : "propertychange", this.customType = !p && !this.isNative && t, this.target = S(e, this.isNative), this.eventSupport = this.target[d] }
            return e.prototype = {
                inNamespaces: function(e) {
                    var t, n;
                    if (!e) return !0;
                    if (!this.namespaces) return !1;
                    for (t = e.length; t--;)
                        for (n = this.namespaces.length; n--;)
                            if (e[t] === this.namespaces[n]) return !0;
                    return !1
                },
                matches: function(e, t, n) { return this.element === e && (!t || this.original === t) && (!n || this.handler === n) }
            }, e
        }(),
        T = function() {
            var e = {},
                t = function(n, r, i, s, o) {
                    if (!r || r === "*")
                        for (var u in e) u.charAt(0) === "$" && t(n, u.substr(1), i, s, o);
                    else {
                        var a = 0,
                            f, l = e["$" + r],
                            c = n === "*";
                        if (!l) return;
                        for (f = l.length; a < f; a++)
                            if (c || l[a].matches(n, i, s))
                                if (!o(l[a], l, a, r)) return
                    }
                },
                n = function(t, n, r) {
                    var i, s = e["$" + n];
                    if (s)
                        for (i = s.length; i--;)
                            if (s[i].matches(t, r, null)) return !0;
                    return !1
                },
                r = function(e, n, r) { var i = []; return t(e, n, r, null, function(e) { return i.push(e) }), i },
                i = function(t) { return (e["$" + t.type] || (e["$" + t.type] = [])).push(t), t },
                s = function(n) { t(n.element, n.type, null, n.handler, function(t, n, r) { return n.splice(r, 1), n.length === 0 && delete e["$" + t.type], !1 }) },
                o = function() { var t, n = []; for (t in e) t.charAt(0) === "$" && (n = n.concat(e[t])); return n };
            return { has: n, get: r, put: i, del: s, entries: o }
        }(),
        N = p ? function(e, t, n, r) { e[r ? u : f](t, n, !1) } : function(e, t, n, r, i) { i && r && e["_on" + i] === null && (e["_on" + i] = 0), e[r ? a : l]("on" + t, n) },
        C = function(e, t, r) { return function(i) { return i = E(i || ((this.ownerDocument || this.document || this).parentWindow || n).event, !0), t.apply(e, [i].concat(r)) } },
        k = function(e, t, r, i, s, o) { return function(u) { if (i ? i.apply(this, arguments) : p ? !0 : u && u.propertyName === "_on" + r || !u) u && (u = E(u || ((this.ownerDocument || this.document || this).parentWindow || n).event, o)), t.apply(e, u && (!s || s.length === 0) ? arguments : v.call(arguments, u ? 0 : 1).concat(s)) } },
        L = function(e, t, n, r, i) { return function() { e(t, n, i), r.apply(this, arguments) } },
        A = function(e, t, n, r) {
            var i, s, u, a = t && t.replace(o, ""),
                f = T.get(e, a, n);
            for (i = 0, s = f.length; i < s; i++) f[i].inNamespaces(r) && ((u = f[i]).eventSupport && N(u.target, u.eventType, u.handler, !1, u.type), T.del(u))
        },
        O = function(e, t, n, r, i) {
            var u, a = t.replace(o, ""),
                f = t.replace(s, "").split(".");
            if (T.has(e, a, n)) return e;
            a === "unload" && (n = L(A, e, a, n, r)), w[a] && (w[a].condition && (n = k(e, n, a, w[a].condition, !0)), a = w[a].base || a), u = T.put(new x(e, a, n, r, f[0] && f)), u.handler = u.isNative ? C(e, u.handler, i) : k(e, u.handler, a, !1, i, !1), u.eventSupport && N(u.target, u.eventType, u.handler, !0, u.customType)
        },
        M = function(e, t, n) {
            return function(r) {
                var i, s, o = typeof e == "string" ? n(e, this) : e;
                for (i = r.target; i && i !== this; i = i.parentNode)
                    for (s = o.length; s--;)
                        if (o[s] === i) return t.apply(i, arguments)
            }
        },
        _ = function(e, t, n) {
            var r, i, u, a, f, l = A,
                c = t && typeof t == "string";
            if (c && t.indexOf(" ") > 0) { t = t.split(" "); for (f = t.length; f--;) _(e, t[f], n); return e }
            u = c && t.replace(o, ""), u && w[u] && (u = w[u].type);
            if (!t || c) {
                if (a = c && t.replace(s, "")) a = a.split(".");
                l(e, u, n, a)
            } else if (typeof t == "function") l(e, null, t);
            else
                for (r in t) t.hasOwnProperty(r) && _(e, r, t[r]);
            return e
        },
        D = function(e, t, n, r, i) {
            var s, o, u, a, f = n,
                l = n && typeof n == "string";
            if (t && !n && typeof t == "object")
                for (s in t) t.hasOwnProperty(s) && D.apply(this, [e, s, t[s]]);
            else { a = arguments.length > 3 ? v.call(arguments, 3) : [], o = (l ? n : t).split(" "), l && (n = M(t, f = r, i)) && (a = v.call(a, 1)), this === y && (n = L(_, e, t, n, f)); for (u = o.length; u--;) O(e, o[u], n, f, a) }
            return e
        },
        P = function() { return D.apply(y, arguments) },
        H = p ? function(e, t, r) {
            var i = c.createEvent(e ? "HTMLEvents" : "UIEvents");
            i[e ? "initEvent" : "initUIEvent"](t, !0, !0, n, 1), r.dispatchEvent(i)
        } : function(e, t, n) { n = S(n, e), e ? n.fireEvent("on" + t, c.createEventObject()) : n["_on" + t]++ },
        B = function(e, t, n) {
            var r, i, u, a, f, l = t.split(" ");
            for (r = l.length; r--;) {
                t = l[r].replace(o, "");
                if (a = l[r].replace(s, "")) a = a.split(".");
                if (!a && !n && e[d]) H(b[t], t, e);
                else { f = T.get(e, t), n = [!1].concat(n); for (i = 0, u = f.length; i < u; i++) f[i].inNamespaces(a) && f[i].handler.apply(e, n) }
            }
            return e
        },
        j = function(e, t, n) {
            var r = 0,
                i = T.get(t, n),
                s = i.length;
            for (; r < s; r++) i[r].original && D(e, i[r].type, i[r].original);
            return e
        },
        F = { add: D, one: P, remove: _, clone: j, fire: B, noConflict: function() { return t[e] = r, this } };
    if (n[a]) {
        var I = function() {
            var e, t = T.entries();
            for (e in t) t[e].type && t[e].type !== "unload" && _(t[e].element, t[e].type);
            n[l]("onunload", I), n.CollectGarbage && n.CollectGarbage()
        };
        n[a]("onunload", I)
    }
    return F
});
//     Underscore.js 1.1.7
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {
    var e = this,
        t = e._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.slice,
        u = r.unshift,
        a = i.toString,
        f = i.hasOwnProperty,
        l = r.forEach,
        c = r.map,
        h = r.reduce,
        p = r.reduceRight,
        d = r.filter,
        v = r.every,
        m = r.some,
        g = r.indexOf,
        y = r.lastIndexOf,
        b = Array.isArray,
        w = Object.keys,
        E = s.bind,
        S = function(e) { return new k(e) };
    typeof module != "undefined" && module.exports ? (module.exports = S, S._ = S) : e._ = S, S.VERSION = "1.1.7";
    var x = S.each = S.forEach = function(e, t, r) {
        if (e == null) return;
        if (l && e.forEach === l) e.forEach(t, r);
        else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)
                if (i in e && t.call(r, e[i], i, e) === n) return
        } else
            for (var o in e)
                if (f.call(e, o) && t.call(r, e[o], o, e) === n) return
    };
    S.map = function(e, t, n) { var r = []; return e == null ? r : c && e.map === c ? e.map(t, n) : (x(e, function(e, i, s) { r[r.length] = t.call(n, e, i, s) }), r) }, S.reduce = S.foldl = S.inject = function(e, t, n, r) {
        var i = n !== void 0;
        e == null && (e = []);
        if (h && e.reduce === h) return r && (t = S.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        x(e, function(e, s, o) { i ? n = t.call(r, n, e, s, o) : (n = e, i = !0) });
        if (!i) throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, S.reduceRight = S.foldr = function(e, t, n, r) { e == null && (e = []); if (p && e.reduceRight === p) return r && (t = S.bind(t, r)), n !== void 0 ? e.reduceRight(t, n) : e.reduceRight(t); var i = (S.isArray(e) ? e.slice() : S.toArray(e)).reverse(); return S.reduce(i, t, n, r) }, S.find = S.detect = function(e, t, n) { var r; return T(e, function(e, i, s) { if (t.call(n, e, i, s)) return r = e, !0 }), r }, S.filter = S.select = function(e, t, n) { var r = []; return e == null ? r : d && e.filter === d ? e.filter(t, n) : (x(e, function(e, i, s) { t.call(n, e, i, s) && (r[r.length] = e) }), r) }, S.reject = function(e, t, n) { var r = []; return e == null ? r : (x(e, function(e, i, s) { t.call(n, e, i, s) || (r[r.length] = e) }), r) }, S.every = S.all = function(e, t, r) { var i = !0; return e == null ? i : v && e.every === v ? e.every(t, r) : (x(e, function(e, s, o) { if (!(i = i && t.call(r, e, s, o))) return n }), i) };
    var T = S.some = S.any = function(e, t, r) { t = t || S.identity; var i = !1; return e == null ? i : m && e.some === m ? e.some(t, r) : (x(e, function(e, s, o) { if (i |= t.call(r, e, s, o)) return n }), !!i) };
    S.include = S.contains = function(e, t) { var n = !1; return e == null ? n : g && e.indexOf === g ? e.indexOf(t) != -1 : (T(e, function(e) { if (n = e === t) return !0 }), n) }, S.invoke = function(e, t) { var n = o.call(arguments, 2); return S.map(e, function(e) { return (t.call ? t || e : e[t]).apply(e, n) }) }, S.pluck = function(e, t) { return S.map(e, function(e) { return e[t] }) }, S.max = function(e, t, n) {
        if (!t && S.isArray(e)) return Math.max.apply(Math, e);
        var r = { computed: -Infinity };
        return x(e, function(e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o >= r.computed && (r = { value: e, computed: o })
        }), r.value
    }, S.min = function(e, t, n) {
        if (!t && S.isArray(e)) return Math.min.apply(Math, e);
        var r = { computed: Infinity };
        return x(e, function(e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = { value: e, computed: o })
        }), r.value
    }, S.sortBy = function(e, t, n) {
        return S.pluck(S.map(e, function(e, r, i) { return { value: e, criteria: t.call(n, e, r, i) } }).sort(function(e, t) {
            var n = e.criteria,
                r = t.criteria;
            return n < r ? -1 : n > r ? 1 : 0
        }), "value")
    }, S.groupBy = function(e, t) {
        var n = {};
        return x(e, function(e, r) {
            var i = t(e, r);
            (n[i] || (n[i] = [])).push(e)
        }), n
    }, S.sortedIndex = function(e, t, n) {
        n || (n = S.identity);
        var r = 0,
            i = e.length;
        while (r < i) {
            var s = r + i >> 1;
            n(e[s]) < n(t) ? r = s + 1 : i = s
        }
        return r
    }, S.toArray = function(e) { return e ? e.toArray ? e.toArray() : S.isArray(e) ? o.call(e) : S.isArguments(e) ? o.call(e) : S.values(e) : [] }, S.size = function(e) { return S.toArray(e).length }, S.first = S.head = function(e, t, n) { return t != null && !n ? o.call(e, 0, t) : e[0] }, S.rest = S.tail = function(e, t, n) { return o.call(e, t == null || n ? 1 : t) }, S.last = function(e) { return e[e.length - 1] }, S.compact = function(e) { return S.filter(e, function(e) { return !!e }) }, S.flatten = function(e) { return S.reduce(e, function(e, t) { return S.isArray(t) ? e.concat(S.flatten(t)) : (e[e.length] = t, e) }, []) }, S.without = function(e) { return S.difference(e, o.call(arguments, 1)) }, S.uniq = S.unique = function(e, t) { return S.reduce(e, function(e, n, r) { if (0 == r || (t === !0 ? S.last(e) != n : !S.include(e, n))) e[e.length] = n; return e }, []) }, S.union = function() { return S.uniq(S.flatten(arguments)) }, S.intersection = S.intersect = function(e) { var t = o.call(arguments, 1); return S.filter(S.uniq(e), function(e) { return S.every(t, function(t) { return S.indexOf(t, e) >= 0 }) }) }, S.difference = function(e, t) { return S.filter(e, function(e) { return !S.include(t, e) }) }, S.zip = function() {
        var e = o.call(arguments),
            t = S.max(S.pluck(e, "length")),
            n = new Array(t);
        for (var r = 0; r < t; r++) n[r] = S.pluck(e, "" + r);
        return n
    }, S.indexOf = function(e, t, n) {
        if (e == null) return -1;
        var r, i;
        if (n) return r = S.sortedIndex(e, t), e[r] === t ? r : -1;
        if (g && e.indexOf === g) return e.indexOf(t);
        for (r = 0, i = e.length; r < i; r++)
            if (e[r] === t) return r;
        return -1
    }, S.lastIndexOf = function(e, t) {
        if (e == null) return -1;
        if (y && e.lastIndexOf === y) return e.lastIndexOf(t);
        var n = e.length;
        while (n--)
            if (e[n] === t) return n;
        return -1
    }, S.range = function(e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0),
            i = 0,
            s = new Array(r);
        while (i < r) s[i++] = e, e += n;
        return s
    }, S.bind = function(e, t) { if (e.bind === E && E) return E.apply(e, o.call(arguments, 1)); var n = o.call(arguments, 2); return function() { return e.apply(t, n.concat(o.call(arguments))) } }, S.bindAll = function(e) { var t = o.call(arguments, 1); return t.length == 0 && (t = S.functions(e)), x(t, function(t) { e[t] = S.bind(e[t], e) }), e }, S.memoize = function(e, t) {
        var n = {};
        return t || (t = S.identity),
            function() { var r = t.apply(this, arguments); return f.call(n, r) ? n[r] : n[r] = e.apply(this, arguments) }
    }, S.delay = function(e, t) { var n = o.call(arguments, 2); return setTimeout(function() { return e.apply(e, n) }, t) }, S.defer = function(e) { return S.delay.apply(S, [e, 1].concat(o.call(arguments, 1))) };
    var N = function(e, t, n) {
        var r;
        return function() {
            var i = this,
                s = arguments,
                o = function() { r = null, e.apply(i, s) };
            n && clearTimeout(r);
            if (n || !r) r = setTimeout(o, t)
        }
    };
    S.throttle = function(e, t) { return N(e, t, !1) }, S.debounce = function(e, t) { return N(e, t, !0) }, S.once = function(e) {
        var t = !1,
            n;
        return function() { return t ? n : (t = !0, n = e.apply(this, arguments)) }
    }, S.wrap = function(e, t) { return function() { var n = [e].concat(o.call(arguments)); return t.apply(this, n) } }, S.compose = function() { var e = o.call(arguments); return function() { var t = o.call(arguments); for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)]; return t[0] } }, S.after = function(e, t) { return function() { if (--e < 1) return t.apply(this, arguments) } }, S.keys = w || function(e) { if (e !== Object(e)) throw new TypeError("Invalid object"); var t = []; for (var n in e) f.call(e, n) && (t[t.length] = n); return t }, S.values = function(e) { return S.map(e, S.identity) }, S.functions = S.methods = function(e) { var t = []; for (var n in e) S.isFunction(e[n]) && t.push(n); return t.sort() }, S.extend = function(e) { return x(o.call(arguments, 1), function(t) { for (var n in t) t[n] !== void 0 && (e[n] = t[n]) }), e }, S.defaults = function(e) { return x(o.call(arguments, 1), function(t) { for (var n in t) e[n] == null && (e[n] = t[n]) }), e }, S.clone = function(e) { return S.isArray(e) ? e.slice() : S.extend({}, e) }, S.tap = function(e, t) { return t(e), e }, S.isEqual = function(e, t) {
        if (e === t) return !0;
        var n = typeof e,
            r = typeof t;
        if (n != r) return !1;
        if (e == t) return !0;
        if (!e && t || e && !t) return !1;
        e._chain && (e = e._wrapped), t._chain && (t = t._wrapped);
        if (e.isEqual) return e.isEqual(t);
        if (t.isEqual) return t.isEqual(e);
        if (S.isDate(e) && S.isDate(t)) return e.getTime() === t.getTime();
        if (S.isNaN(e) && S.isNaN(t)) return !1;
        if (S.isRegExp(e) && S.isRegExp(t)) return e.source === t.source && e.global === t.global && e.ignoreCase === t.ignoreCase && e.multiline === t.multiline;
        if (n !== "object") return !1;
        if (e.length && e.length !== t.length) return !1;
        var i = S.keys(e),
            s = S.keys(t);
        if (i.length != s.length) return !1;
        for (var o in e)
            if (!(o in t) || !S.isEqual(e[o], t[o])) return !1;
        return !0
    }, S.isEmpty = function(e) {
        if (S.isArray(e) || S.isString(e)) return e.length === 0;
        for (var t in e)
            if (f.call(e, t)) return !1;
        return !0
    }, S.isElement = function(e) { return !!e && e.nodeType == 1 }, S.isArray = b || function(e) { return a.call(e) === "[object Array]" }, S.isObject = function(e) { return e === Object(e) }, S.isArguments = function(e) { return !!e && !!f.call(e, "callee") }, S.isFunction = function(e) { return !!(e && e.constructor && e.call && e.apply) }, S.isString = function(e) { return !!(e === "" || e && e.charCodeAt && e.substr) }, S.isNumber = function(e) { return !!(e === 0 || e && e.toExponential && e.toFixed) }, S.isNaN = function(e) { return e !== e }, S.isBoolean = function(e) { return e === !0 || e === !1 }, S.isDate = function(e) { return !!(e && e.getTimezoneOffset && e.setUTCFullYear) }, S.isRegExp = function(e) { return !(!(e && e.test && e.exec) || !e.ignoreCase && e.ignoreCase !== !1) }, S.isNull = function(e) { return e === null }, S.isUndefined = function(e) { return e === void 0 }, S.noConflict = function() { return e._ = t, this }, S.identity = function(e) { return e }, S.times = function(e, t, n) { for (var r = 0; r < e; r++) t.call(n, r) }, S.mixin = function(e) { x(S.functions(e), function(t) { A(t, S[t] = e[t]) }) };
    var C = 0;
    S.uniqueId = function(e) { var t = C++; return e ? e + t : t }, S.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g }, S.template = function(e, t) {
        var n = S.templateSettings,
            r = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.interpolate, function(e, t) { return "'," + t.replace(/\\'/g, "'") + ",'" }).replace(n.evaluate || null, function(e, t) { return "');" + t.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('" }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
            i = new Function("obj", r);
        return t ? i(t) : i
    };
    var k = function(e) { this._wrapped = e };
    S.prototype = k.prototype;
    var L = function(e, t) { return t ? S(e).chain() : e },
        A = function(e, t) { k.prototype[e] = function() { var e = o.call(arguments); return u.call(e, this._wrapped), L(t.apply(S, e), this._chain) } };
    S.mixin(S), x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = r[e];
        k.prototype[e] = function() { return t.apply(this._wrapped, arguments), L(this._wrapped, this._chain) }
    }), x(["concat", "join", "slice"], function(e) {
        var t = r[e];
        k.prototype[e] = function() { return L(t.apply(this._wrapped, arguments), this._chain) }
    }), k.prototype.chain = function() { return this._chain = !0, this }, k.prototype.value = function() { return this._wrapped }
})();
/**
 * Flotr2 (c) 2012 Carl Sutherland
 * MIT License
 * Special thanks to:
 * Flotr: http://code.google.com/p/flotr/ (fork)
 * Flot: https://github.com/flot/flot (original fork)
 */
(function() {
    var e = this,
        t = this.Flotr,
        n;
    n = {
        _: _,
        bean: bean,
        isIphone: /iphone/i.test(navigator.userAgent),
        isIE: navigator.appVersion.indexOf("MSIE") != -1 ? parseFloat(navigator.appVersion.split("MSIE")[1]) : !1,
        graphTypes: {},
        plugins: {},
        addType: function(e, t) { n.graphTypes[e] = t, n.defaultOptions[e] = t.options || {}, n.defaultOptions.defaultType = n.defaultOptions.defaultType || e },
        addPlugin: function(e, t) { n.plugins[e] = t, n.defaultOptions[e] = t.options || {} },
        draw: function(e, t, r, i) { return i = i || n.Graph, new i(e, t, r) },
        merge: function(e, t) { var r, i, s = t || {}; for (r in e) i = e[r], i && typeof i == "object" ? i.constructor === Array ? s[r] = this._.clone(i) : i.constructor !== RegExp && !this._.isElement(i) && !i.jquery ? s[r] = n.merge(i, t ? t[r] : undefined) : s[r] = i : s[r] = i; return s },
        clone: function(e) { return n.merge(e, {}) },
        getTickSize: function(e, t, r, i) {
            var s = (r - t) / e,
                o = n.getMagnitude(s),
                u = 10,
                a = s / o;
            return a < 1.5 ? u = 1 : a < 2.25 ? u = 2 : a < 3 ? u = i === 0 ? 2 : 2.5 : a < 7.5 && (u = 5), u * o
        },
        defaultTickFormatter: function(e, t) { return e + "" },
        defaultTrackFormatter: function(e) { return "(" + e.x + ", " + e.y + ")" },
        engineeringNotation: function(e, t, n) {
            var r = ["Y", "Z", "E", "P", "T", "G", "M", "k", ""],
                i = ["y", "z", "a", "f", "p", "n", "Вµ", "m", ""],
                s = r.length;
            n = n || 1e3, t = Math.pow(10, t || 2);
            if (e === 0) return 0;
            if (e > 1)
                while (s-- && e >= n) e /= n;
            else { r = i, s = r.length; while (s-- && e < 1) e *= n }
            return Math.round(e * t) / t + r[s]
        },
        getMagnitude: function(e) { return Math.pow(10, Math.floor(Math.log(e) / Math.LN10)) },
        toPixel: function(e) { return Math.floor(e) + .5 },
        toRad: function(e) { return -e * (Math.PI / 180) },
        floorInBase: function(e, t) { return t * Math.floor(e / t) },
        drawText: function(e, t, r, i, s) {
            if (!e.fillText) { e.drawText(t, r, i, s); return }
            s = this._.extend({ size: n.defaultOptions.fontSize, color: "#000000", textAlign: "left", textBaseline: "bottom", weight: 1, angle: 0 }, s), e.save(), e.translate(r, i), e.rotate(s.angle), e.fillStyle = s.color, e.font = (s.weight > 1 ? "bold " : "") + s.size * 1.3 + "px sans-serif", e.textAlign = s.textAlign, e.textBaseline = s.textBaseline, e.fillText(t, 0, 0), e.restore()
        },
        getBestTextAlign: function(e, t) { return t = t || { textAlign: "center", textBaseline: "middle" }, e += n.getTextAngleFromAlign(t), Math.abs(Math.cos(e)) > .01 && (t.textAlign = Math.cos(e) > 0 ? "right" : "left"), Math.abs(Math.sin(e)) > .01 && (t.textBaseline = Math.sin(e) > 0 ? "top" : "bottom"), t },
        alignTable: { "right middle": 0, "right top": Math.PI / 4, "center top": Math.PI / 2, "left top": 3 * (Math.PI / 4), "left middle": Math.PI, "left bottom": -3 * (Math.PI / 4), "center bottom": -Math.PI / 2, "right bottom": -Math.PI / 4, "center middle": 0 },
        getTextAngleFromAlign: function(e) { return n.alignTable[e.textAlign + " " + e.textBaseline] || 0 },
        noConflict: function() { return e.Flotr = t, this }
    }, e.Flotr = n
})(), Flotr.defaultOptions = { colors: ["#00A8F0", "#C0D800", "#CB4B4B", "#4DA74D", "#9440ED"], ieBackgroundColor: "#FFFFFF", title: null, subtitle: null, shadowSize: 4, defaultType: null, HtmlText: !0, fontColor: "#545454", fontSize: 7.5, resolution: 1, parseFloat: !0, preventDefault: !0, xaxis: { ticks: null, minorTicks: null, showLabels: !0, showMinorLabels: !1, labelsAngle: 0, title: null, titleAngle: 0, noTicks: 5, minorTickFreq: null, tickFormatter: Flotr.defaultTickFormatter, tickDecimals: null, min: null, max: null, autoscale: !1, autoscaleMargin: 0, color: null, mode: "normal", timeFormat: null, timeMode: "UTC", timeUnit: "millisecond", scaling: "linear", base: Math.E, titleAlign: "center", margin: !0 }, x2axis: {}, yaxis: { ticks: null, minorTicks: null, showLabels: !0, showMinorLabels: !1, labelsAngle: 0, title: null, titleAngle: 90, noTicks: 5, minorTickFreq: null, tickFormatter: Flotr.defaultTickFormatter, tickDecimals: null, min: null, max: null, autoscale: !1, autoscaleMargin: 0, color: null, scaling: "linear", base: Math.E, titleAlign: "center", margin: !0 }, y2axis: { titleAngle: 270 }, grid: { color: "#545454", backgroundColor: null, backgroundImage: null, watermarkAlpha: .4, tickColor: "#DDDDDD", labelMargin: 3, verticalLines: !0, minorVerticalLines: null, horizontalLines: !0, minorHorizontalLines: null, outlineWidth: 1, outline: "nsew", circular: !1 }, mouse: { track: !1, trackAll: !1, position: "se", relative: !1, trackFormatter: Flotr.defaultTrackFormatter, margin: 5, lineColor: "#FF3F19", trackDecimals: 1, sensibility: 2, trackY: !0, radius: 3, fillColor: null, fillOpacity: .4 } },
    function() {
        function t(e, t, n, r) {
            this.rgba = ["r", "g", "b", "a"];
            var i = 4;
            while (-1 < --i) this[this.rgba[i]] = arguments[i] || (i == 3 ? 1 : 0);
            this.normalize()
        }
        var e = Flotr._,
            n = { aqua: [0, 255, 255], azure: [240, 255, 255], beige: [245, 245, 220], black: [0, 0, 0], blue: [0, 0, 255], brown: [165, 42, 42], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgrey: [169, 169, 169], darkgreen: [0, 100, 0], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkviolet: [148, 0, 211], fuchsia: [255, 0, 255], gold: [255, 215, 0], green: [0, 128, 0], indigo: [75, 0, 130], khaki: [240, 230, 140], lightblue: [173, 216, 230], lightcyan: [224, 255, 255], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightyellow: [255, 255, 224], lime: [0, 255, 0], magenta: [255, 0, 255], maroon: [128, 0, 0], navy: [0, 0, 128], olive: [128, 128, 0], orange: [255, 165, 0], pink: [255, 192, 203], purple: [128, 0, 128], violet: [128, 0, 128], red: [255, 0, 0], silver: [192, 192, 192], white: [255, 255, 255], yellow: [255, 255, 0] };
        t.prototype = {
            scale: function(t, n, r, i) { var s = 4; while (-1 < --s) e.isUndefined(arguments[s]) || (this[this.rgba[s]] *= arguments[s]); return this.normalize() },
            alpha: function(t) { return !e.isUndefined(t) && !e.isNull(t) && (this.a = t), this.normalize() },
            clone: function() { return new t(this.r, this.b, this.g, this.a) },
            limit: function(e, t, n) { return Math.max(Math.min(e, n), t) },
            normalize: function() { var e = this.limit; return this.r = e(parseInt(this.r, 10), 0, 255), this.g = e(parseInt(this.g, 10), 0, 255), this.b = e(parseInt(this.b, 10), 0, 255), this.a = e(this.a, 0, 1), this },
            distance: function(e) {
                if (!e) return;
                e = new t.parse(e);
                var n = 0,
                    r = 3;
                while (-1 < --r) n += Math.abs(this[this.rgba[r]] - e[this.rgba[r]]);
                return n
            },
            toString: function() { return this.a >= 1 ? "rgb(" + [this.r, this.g, this.b].join(",") + ")" : "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" },
            contrast: function() { var e = 1 - (.299 * this.r + .587 * this.g + .114 * this.b) / 255; return e < .5 ? "#000000" : "#ffffff" }
        }, e.extend(t, {
            parse: function(e) { if (e instanceof t) return e; var r; if (r = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e)) return new t(parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)); if (r = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) return new t(parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10)); if (r = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e)) return new t(parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16), parseInt(r[3] + r[3], 16)); if (r = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(e)) return new t(parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10), parseFloat(r[4])); if (r = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e)) return new t(parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55); if (r = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(e)) return new t(parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55, parseFloat(r[4])); var i = (e + "").replace(/^\s*([\S\s]*?)\s*$/, "$1").toLowerCase(); return i == "transparent" ? new t(255, 255, 255, 0) : (r = n[i]) ? new t(r[0], r[1], r[2]) : new t(0, 0, 0, 0) },
            processColor: function(n, r) {
                var i = r.opacity;
                if (!n) return "rgba(0, 0, 0, 0)";
                if (n instanceof t) return n.alpha(i).toString();
                if (e.isString(n)) return t.parse(n).alpha(i).toString();
                var s = n.colors ? n : { colors: n };
                if (!r.ctx) return e.isArray(s.colors) ? t.parse(e.isArray(s.colors[0]) ? s.colors[0][1] : s.colors[0]).alpha(i).toString() : "rgba(0, 0, 0, 0)";
                s = e.extend({ start: "top", end: "bottom" }, s), /top/i.test(s.start) && (r.x1 = 0), /left/i.test(s.start) && (r.y1 = 0), /bottom/i.test(s.end) && (r.x2 = 0), /right/i.test(s.end) && (r.y2 = 0);
                var o, u, a, f = r.ctx.createLinearGradient(r.x1, r.y1, r.x2, r.y2);
                for (o = 0; o < s.colors.length; o++) u = s.colors[o], e.isArray(u) ? (a = u[0], u = u[1]) : a = o / (s.colors.length - 1), f.addColorStop(a, t.parse(u).alpha(i));
                return f
            }
        }), Flotr.Color = t
    }(), Flotr.Date = {
        set: function(e, t, n, r) { n = n || "UTC", t = "set" + (n === "UTC" ? "UTC" : "") + t, e[t](r) },
        get: function(e, t, n) { return n = n || "UTC", t = "get" + (n === "UTC" ? "UTC" : "") + t, e[t]() },
        format: function(e, t, n) {
            function s(e) { return e += "", e.length == 1 ? "0" + e : e }
            if (!e) return;
            var r = this.get,
                i = { h: r(e, "Hours", n).toString(), H: s(r(e, "Hours", n)), M: s(r(e, "Minutes", n)), S: s(r(e, "Seconds", n)), s: r(e, "Milliseconds", n), d: r(e, "Date", n).toString(), m: (r(e, "Month", n) + 1).toString(), y: r(e, "FullYear", n).toString(), b: Flotr.Date.monthNames[r(e, "Month", n)] },
                o = [],
                u, a = !1;
            for (var f = 0; f < t.length; ++f) u = t.charAt(f), a ? (o.push(i[u] || u), a = !1) : u == "%" ? a = !0 : o.push(u);
            return o.join("")
        },
        getFormat: function(e, t) { var n = Flotr.Date.timeUnits; return e < n.second ? "%h:%M:%S.%s" : e < n.minute ? "%h:%M:%S" : e < n.day ? t < 2 * n.day ? "%h:%M" : "%b %d %h:%M" : e < n.month ? "%b %d" : e < n.year ? t < n.year ? "%b" : "%b %y" : "%y" },
        formatter: function(e, t) {
            var n = t.options,
                r = Flotr.Date.timeUnits[n.timeUnit],
                i = new Date(e * r);
            if (t.options.timeFormat) return Flotr.Date.format(i, n.timeFormat, n.timeMode);
            var s = (t.max - t.min) * r,
                o = t.tickSize * Flotr.Date.timeUnits[t.tickUnit];
            return Flotr.Date.format(i, Flotr.Date.getFormat(o, s), n.timeMode)
        },
        generator: function(e) {
            function y(e) { t(m, e, o, Flotr.floorInBase(n(m, e, o), h)) }
            var t = this.set,
                n = this.get,
                r = this.timeUnits,
                i = this.spec,
                s = e.options,
                o = s.timeMode,
                u = r[s.timeUnit],
                a = e.min * u,
                f = e.max * u,
                l = (f - a) / s.noTicks,
                c = [],
                h = e.tickSize,
                p, d, v;
            d = s.tickFormatter === Flotr.defaultTickFormatter ? this.formatter : s.tickFormatter;
            for (v = 0; v < i.length - 1; ++v) { var m = i[v][0] * r[i[v][1]]; if (l < (m + i[v + 1][0] * r[i[v + 1][1]]) / 2 && m >= h) break }
            h = i[v][0], p = i[v][1], p == "year" && (h = Flotr.getTickSize(s.noTicks * r.year, a, f, 0), h == .5 && (p = "month", h = 6)), e.tickUnit = p, e.tickSize = h;
            var g = h * r[p];
            m = new Date(a);
            switch (p) {
                case "millisecond":
                    y("Milliseconds");
                    break;
                case "second":
                    y("Seconds");
                    break;
                case "minute":
                    y("Minutes");
                    break;
                case "hour":
                    y("Hours");
                    break;
                case "month":
                    y("Month");
                    break;
                case "year":
                    y("FullYear")
            }
            g >= r.second && t(m, "Milliseconds", o, 0), g >= r.minute && t(m, "Seconds", o, 0), g >= r.hour && t(m, "Minutes", o, 0), g >= r.day && t(m, "Hours", o, 0), g >= r.day * 4 && t(m, "Date", o, 1), g >= r.year && t(m, "Month", o, 0);
            var b = 0,
                w = NaN,
                E;
            do {
                E = w, w = m.getTime(), c.push({ v: w / u, label: d(w / u, e) });
                if (p == "month")
                    if (h < 1) {
                        t(m, "Date", o, 1);
                        var S = m.getTime();
                        t(m, "Month", o, n(m, "Month", o) + 1);
                        var x = m.getTime();
                        m.setTime(w + b * r.hour + (x - S) * h), b = n(m, "Hours", o), t(m, "Hours", o, 0)
                    } else t(m, "Month", o, n(m, "Month", o) + h);
                else p == "year" ? t(m, "FullYear", o, n(m, "FullYear", o) + h) : m.setTime(w + g)
            } while (w < f && w != E);
            return c
        },
        timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, month: 2592e6, year: 31556952e3 },
        spec: [
            [1, "millisecond"],
            [20, "millisecond"],
            [50, "millisecond"],
            [100, "millisecond"],
            [200, "millisecond"],
            [500, "millisecond"],
            [1, "second"],
            [2, "second"],
            [5, "second"],
            [10, "second"],
            [30, "second"],
            [1, "minute"],
            [2, "minute"],
            [5, "minute"],
            [10, "minute"],
            [30, "minute"],
            [1, "hour"],
            [2, "hour"],
            [4, "hour"],
            [8, "hour"],
            [12, "hour"],
            [1, "day"],
            [2, "day"],
            [3, "day"],
            [.25, "month"],
            [.5, "month"],
            [1, "month"],
            [2, "month"],
            [3, "month"],
            [6, "month"],
            [1, "year"]
        ],
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    function() {
        function t(e) { return e && e.jquery ? e[0] : e }
        var e = Flotr._;
        Flotr.DOM = {
            addClass: function(n, r) {
                n = t(n);
                var i = n.className ? n.className : "";
                if (e.include(i.split(/\s+/g), r)) return;
                n.className = (i ? i + " " : "") + r
            },
            create: function(e) { return document.createElement(e) },
            node: function(e) {
                var t = Flotr.DOM.create("div"),
                    n;
                return t.innerHTML = e, n = t.children[0], t.innerHTML = "", n
            },
            empty: function(e) { e = t(e), e.innerHTML = "" },
            remove: function(e) { e = t(e), e.parentNode.removeChild(e) },
            hide: function(e) { e = t(e), Flotr.DOM.setStyles(e, { display: "none" }) },
            insert: function(n, r) { n = t(n), e.isString(r) ? n.innerHTML += r : e.isElement(r) && n.appendChild(r) },
            opacity: function(e, n) { e = t(e), e.style.opacity = n },
            position: function(e, n) { return e = t(e), e.offsetParent ? (n = this.position(e.offsetParent), n.left += e.offsetLeft, n.top += e.offsetTop, n) : { left: e.offsetLeft || 0, top: e.offsetTop || 0 } },
            removeClass: function(n, r) {
                var i = n.className ? n.className : "";
                n = t(n), n.className = e.filter(i.split(/\s+/g), function(e) { if (e != r) return !0 }).join(" ")
            },
            setStyles: function(n, r) { n = t(n), e.each(r, function(e, t) { n.style[t] = e }) },
            show: function(e) { e = t(e), Flotr.DOM.setStyles(e, { display: "" }) },
            size: function(e) { return e = t(e), { height: e.offsetHeight, width: e.offsetWidth } }
        }
    }(),
    function() {
        var e = Flotr,
            t = e.bean;
        e.EventAdapter = {
            observe: function(e, n, r) { return t.add(e, n, r), this },
            fire: function(e, n, r) { return t.fire(e, n, r), typeof Prototype != "undefined" && Event.fire(e, n, r), this },
            stopObserving: function(e, n, r) { return t.remove(e, n, r), this },
            eventPointer: function(t) {
                if (!e._.isUndefined(t.touches) && t.touches.length > 0) return { x: t.touches[0].pageX, y: t.touches[0].pageY };
                if (!e._.isUndefined(t.changedTouches) && t.changedTouches.length > 0) return { x: t.changedTouches[0].pageX, y: t.changedTouches[0].pageY };
                if (t.pageX || t.pageY) return { x: t.pageX, y: t.pageY };
                if (t.clientX || t.clientY) {
                    var n = document,
                        r = n.body,
                        i = n.documentElement;
                    return { x: t.clientX + r.scrollLeft + i.scrollLeft, y: t.clientY + r.scrollTop + i.scrollTop }
                }
            }
        }
    }(),
    function() {
        var e = Flotr,
            t = e.DOM,
            n = e._,
            r = function(e) { this.o = e };
        r.prototype = {
            dimensions: function(e, t, n, r) { return e ? this.o.html ? this.html(e, this.o.element, n, r) : this.canvas(e, t) : { width: 0, height: 0 } },
            canvas: function(t, n) {
                if (!this.o.textEnabled) return;
                n = n || {};
                var r = this.measureText(t, n),
                    i = r.width,
                    s = n.size || e.defaultOptions.fontSize,
                    o = n.angle || 0,
                    u = Math.cos(o),
                    a = Math.sin(o),
                    f = 2,
                    l = 6,
                    c;
                return c = { width: Math.abs(u * i) + Math.abs(a * s) + f, height: Math.abs(a * i) + Math.abs(u * s) + l }, c
            },
            html: function(e, n, r, i) { var s = t.create("div"); return t.setStyles(s, { position: "absolute", top: "-10000px" }), t.insert(s, '<div style="' + r + '" class="' + i + ' flotr-dummy-div">' + e + "</div>"), t.insert(this.o.element, s), t.size(s) },
            measureText: function(t, r) {
                var i = this.o.ctx,
                    s;
                return !i.fillText || e.isIphone && i.measure ? { width: i.measure(t, r) } : (r = n.extend({ size: e.defaultOptions.fontSize, weight: 1, angle: 0 }, r), i.save(), i.font = (r.weight > 1 ? "bold " : "") + r.size * 1.3 + "px sans-serif", s = i.measureText(t), i.restore(), s)
            }
        }, Flotr.Text = r
    }(),
    function() {
        function i(e, n, r) { return t.observe.apply(this, arguments), this._handles.push(arguments), this }
        var e = Flotr.DOM,
            t = Flotr.EventAdapter,
            n = Flotr._,
            r = Flotr;
        Graph = function(e, i, s) { this._setEl(e), this._initMembers(), this._initPlugins(), t.fire(this.el, "flotr:beforeinit", [this]), this.data = i, this.series = r.Series.getSeries(i), this._initOptions(s), this._initGraphTypes(), this._initCanvas(), this._text = new r.Text({ element: this.el, ctx: this.ctx, html: this.options.HtmlText, textEnabled: this.textEnabled }), t.fire(this.el, "flotr:afterconstruct", [this]), this._initEvents(), this.findDataRanges(), this.calculateSpacing(), this.draw(n.bind(function() { t.fire(this.el, "flotr:afterinit", [this]) }, this)) }, Graph.prototype = {
            destroy: function() { t.fire(this.el, "flotr:destroy"), n.each(this._handles, function(e) { t.stopObserving.apply(this, e) }), this._handles = [], this.el.graph = null },
            observe: i,
            _observe: i,
            processColor: function(e, t) { var i = { x1: 0, y1: 0, x2: this.plotWidth, y2: this.plotHeight, opacity: 1, ctx: this.ctx }; return n.extend(i, t), r.Color.processColor(e, i) },
            findDataRanges: function() {
                var e = this.axes,
                    t, i, s;
                n.each(this.series, function(e) { s = e.getRange(), s && (t = e.xaxis, i = e.yaxis, t.datamin = Math.min(s.xmin, t.datamin), t.datamax = Math.max(s.xmax, t.datamax), i.datamin = Math.min(s.ymin, i.datamin), i.datamax = Math.max(s.ymax, i.datamax), t.used = t.used || s.xused, i.used = i.used || s.yused) }, this), !e.x.used && !e.x2.used && (e.x.used = !0), !e.y.used && !e.y2.used && (e.y.used = !0), n.each(e, function(e) { e.calculateRange() });
                var o = n.keys(r.graphTypes),
                    u = !1;
                n.each(this.series, function(e) {
                    if (e.hide) return;
                    n.each(o, function(t) { e[t] && e[t].show && (this.extendRange(t, e), u = !0) }, this), u || this.extendRange(this.options.defaultType, e)
                }, this)
            },
            extendRange: function(e, t) { this[e].extendRange && this[e].extendRange(t, t.data, t[e], this[e]), this[e].extendYRange && this[e].extendYRange(t.yaxis, t.data, t[e], this[e]), this[e].extendXRange && this[e].extendXRange(t.xaxis, t.data, t[e], this[e]) },
            calculateSpacing: function() {
                var e = this.axes,
                    t = this.options,
                    r = this.series,
                    i = t.grid.labelMargin,
                    s = this._text,
                    o = e.x,
                    u = e.x2,
                    a = e.y,
                    f = e.y2,
                    l = t.grid.outlineWidth,
                    c, h, p, d;
                n.each(e, function(e) { e.calculateTicks(), e.calculateTextDimensions(s, t) }), d = s.dimensions(t.title, { size: t.fontSize * 1.5 }, "font-size:1em;font-weight:bold;", "flotr-title"), this.titleHeight = d.height, d = s.dimensions(t.subtitle, { size: t.fontSize }, "font-size:smaller;", "flotr-subtitle"), this.subtitleHeight = d.height;
                for (h = 0; h < t.length; ++h) r[h].points.show && (l = Math.max(l, r[h].points.radius + r[h].points.lineWidth / 2));
                var v = this.plotOffset;
                o.options.margin === !1 ? (v.bottom = 0, v.top = 0) : o.options.margin === !0 ? (v.bottom += (t.grid.circular ? 0 : o.used && o.options.showLabels ? o.maxLabel.height + i : 0) + (o.used && o.options.title ? o.titleSize.height + i : 0) + l, v.top += (t.grid.circular ? 0 : u.used && u.options.showLabels ? u.maxLabel.height + i : 0) + (u.used && u.options.title ? u.titleSize.height + i : 0) + this.subtitleHeight + this.titleHeight + l) : (v.bottom = o.options.margin, v.top = o.options.margin), a.options.margin === !1 ? (v.left = 0, v.right = 0) : a.options.margin === !0 ? (v.left += (t.grid.circular ? 0 : a.used && a.options.showLabels ? a.maxLabel.width + i : 0) + (a.used && a.options.title ? a.titleSize.width + i : 0) + l, v.right += (t.grid.circular ? 0 : f.used && f.options.showLabels ? f.maxLabel.width + i : 0) + (f.used && f.options.title ? f.titleSize.width + i : 0) + l) : (v.left = a.options.margin, v.right = a.options.margin), v.top = Math.floor(v.top), this.plotWidth = this.canvasWidth - v.left - v.right, this.plotHeight = this.canvasHeight - v.bottom - v.top, o.length = u.length = this.plotWidth, a.length = f.length = this.plotHeight, a.offset = f.offset = this.plotHeight, o.setScale(), u.setScale(), a.setScale(), f.setScale()
            },
            draw: function(e) {
                var n = this.ctx,
                    r;
                t.fire(this.el, "flotr:beforedraw", [this.series, this]);
                if (this.series.length) {
                    n.save(), n.translate(this.plotOffset.left, this.plotOffset.top);
                    for (r = 0; r < this.series.length; r++) this.series[r].hide || this.drawSeries(this.series[r]);
                    n.restore(), this.clip()
                }
                t.fire(this.el, "flotr:afterdraw", [this.series, this]), e && e()
            },
            drawSeries: function(e) {
                function t(e, t) {
                    var n = this.getOptions(e, t);
                    this[t].draw(n)
                }
                var i = !1;
                e = e || this.series, n.each(r.graphTypes, function(n, r) { e[r] && e[r].show && this[r] && (i = !0, t.call(this, e, r)) }, this), i || t.call(this, e, this.options.defaultType)
            },
            getOptions: function(e, t) {
                var n = e[t],
                    i = this[t],
                    s = e.xaxis,
                    o = e.yaxis,
                    u = { context: this.ctx, width: this.plotWidth, height: this.plotHeight, fontSize: this.options.fontSize, fontColor: this.options.fontColor, textEnabled: this.textEnabled, htmlText: this.options.HtmlText, text: this._text, element: this.el, data: e.data, color: e.color, shadowSize: e.shadowSize, xScale: s.d2p, yScale: o.d2p, xInverse: s.p2d, yInverse: o.p2d };
                return u = r.merge(n, u), u.fillStyle = this.processColor(n.fillColor || e.color, { opacity: n.fillOpacity }), u
            },
            getEventPosition: function(n) {
                var r = document,
                    i = r.body,
                    s = r.documentElement,
                    o = this.axes,
                    u = this.plotOffset,
                    a = this.lastMousePos,
                    f = t.eventPointer(n),
                    l = f.x - a.pageX,
                    c = f.y - a.pageY,
                    h, p, d;
                return "ontouchstart" in this.el ? (h = e.position(this.overlay), p = f.x - h.left - u.left, d = f.y - h.top - u.top) : (h = this.overlay.getBoundingClientRect(), p = n.clientX - h.left - u.left - i.scrollLeft - s.scrollLeft, d = n.clientY - h.top - u.top - i.scrollTop - s.scrollTop), { x: o.x.p2d(p), x2: o.x2.p2d(p), y: o.y.p2d(d), y2: o.y2.p2d(d), relX: p, relY: d, dX: l, dY: c, absX: f.x, absY: f.y, pageX: f.x, pageY: f.y }
            },
            clickHandler: function(e) {
                if (this.ignoreClick) return this.ignoreClick = !1, this.ignoreClick;
                t.fire(this.el, "flotr:click", [this.getEventPosition(e), this])
            },
            mouseMoveHandler: function(e) {
                if (this.mouseDownMoveHandler) return;
                var n = this.getEventPosition(e);
                t.fire(this.el, "flotr:mousemove", [e, n, this]), this.lastMousePos = n
            },
            mouseDownHandler: function(e) {
                if (this.mouseUpHandler) return;
                this.mouseUpHandler = n.bind(function(e) { t.stopObserving(document, "mouseup", this.mouseUpHandler), t.stopObserving(document, "mousemove", this.mouseDownMoveHandler), this.mouseDownMoveHandler = null, this.mouseUpHandler = null, t.fire(this.el, "flotr:mouseup", [e, this]) }, this), this.mouseDownMoveHandler = n.bind(function(n) {
                    var r = this.getEventPosition(n);
                    t.fire(this.el, "flotr:mousemove", [e, r, this]), this.lastMousePos = r
                }, this), t.observe(document, "mouseup", this.mouseUpHandler), t.observe(document, "mousemove", this.mouseDownMoveHandler), t.fire(this.el, "flotr:mousedown", [e, this]), this.ignoreClick = !1
            },
            drawTooltip: function(t, n, r, i) {
                var s = this.getMouseTrack(),
                    o = "opacity:0.7;background-color:#000;color:#fff;display:none;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;",
                    u = i.position,
                    a = i.margin,
                    f = this.plotOffset;
                n !== null && r !== null ? (i.relative ? (u.charAt(0) == "n" ? o += "bottom:" + (a - f.top - r + this.canvasHeight) + "px;top:auto;" : u.charAt(0) == "s" && (o += "top:" + (a + f.top + r) + "px;bottom:auto;"), u.charAt(1) == "e" ? o += "left:" + (a + f.left + n) + "px;right:auto;" : u.charAt(1) == "w" && (o += "right:" + (a - f.left - n + this.canvasWidth) + "px;left:auto;")) : (u.charAt(0) == "n" ? o += "top:" + (a + f.top) + "px;bottom:auto;" : u.charAt(0) == "s" && (o += "bottom:" + (a + f.bottom) + "px;top:auto;"), u.charAt(1) == "e" ? o += "right:" + (a + f.right) + "px;left:auto;" : u.charAt(1) == "w" && (o += "left:" + (a + f.left) + "px;right:auto;")), s.style.cssText = o, e.empty(s), e.insert(s, t), e.show(s)) : e.hide(s)
            },
            clip: function(e) {
                var t = this.plotOffset,
                    n = this.canvasWidth,
                    i = this.canvasHeight;
                e = e || this.ctx;
                if (r.isIE && r.isIE < 9 && !r.isFlashCanvas) {
                    if (e === this.octx) return;
                    e.save(), e.fillStyle = this.processColor(this.options.ieBackgroundColor), e.fillRect(0, 0, n, t.top), e.fillRect(0, 0, t.left, i), e.fillRect(0, i - t.bottom, n, t.bottom), e.fillRect(n - t.right, 0, t.right, i), e.restore()
                } else e.clearRect(0, 0, n, t.top), e.clearRect(0, 0, t.left, i), e.clearRect(0, i - t.bottom, n, t.bottom), e.clearRect(n - t.right, 0, t.right, i)
            },
            _initMembers: function() { this._handles = [], this.lastMousePos = { pageX: null, pageY: null }, this.plotOffset = { left: 0, right: 0, top: 0, bottom: 0 }, this.ignoreClick = !0, this.prevHit = null },
            _initGraphTypes: function() { n.each(r.graphTypes, function(e, t) { this[t] = r.clone(e) }, this) },
            _initEvents: function() {
                var e = this.el,
                    r, i, s;
                "ontouchstart" in e ? (r = n.bind(function(n) { s = !0, t.stopObserving(document, "touchend", r), t.fire(e, "flotr:mouseup", [event, this]), this.multitouches = null, i || this.clickHandler(n) }, this), this.observe(this.overlay, "touchstart", n.bind(function(n) { i = !1, s = !1, this.ignoreClick = !1, n.touches && n.touches.length > 1 && (this.multitouches = n.touches), t.fire(e, "flotr:mousedown", [event, this]), this.observe(document, "touchend", r) }, this)), this.observe(this.overlay, "touchmove", n.bind(function(n) {
                    var r = this.getEventPosition(n);
                    this.options.preventDefault && n.preventDefault(), i = !0, this.multitouches || n.touches && n.touches.length > 1 ? this.multitouches = n.touches : s || t.fire(e, "flotr:mousemove", [event, r, this]), this.lastMousePos = r
                }, this))) : this.observe(this.overlay, "mousedown", n.bind(this.mouseDownHandler, this)).observe(e, "mousemove", n.bind(this.mouseMoveHandler, this)).observe(this.overlay, "click", n.bind(this.clickHandler, this)).observe(e, "mouseout", function(n) { t.fire(e, "flotr:mouseout", n) })
            },
            _initCanvas: function() {
                function l(i, s) {
                    return i || (i = e.create("canvas"), typeof FlashCanvas != "undefined" && typeof i.getContext == "function" && (FlashCanvas.initElement(i), this.isFlashCanvas = !0), i.className = "flotr-" + s, i.style.cssText = "position:absolute;left:0px;top:0px;", e.insert(t, i)), n.each(a, function(t, n) {
                        e.show(i);
                        if (s == "canvas" && i.getAttribute(n) === t) return;
                        i.setAttribute(n, t * r.resolution), i.style[n] = t + "px"
                    }), i.context_ = null, i
                }

                function c(e) { window.G_vmlCanvasManager && window.G_vmlCanvasManager.initElement(e); var t = e.getContext("2d"); return window.G_vmlCanvasManager || t.scale(r.resolution, r.resolution), t }
                var t = this.el,
                    r = this.options,
                    i = t.children,
                    s = [],
                    o, u, a, f;
                for (u = i.length; u--;) o = i[u], !this.canvas && o.className === "flotr-canvas" ? this.canvas = o : !this.overlay && o.className === "flotr-overlay" ? this.overlay = o : s.push(o);
                for (u = s.length; u--;) t.removeChild(s[u]);
                e.setStyles(t, { position: "relative" }), a = {}, a.width = t.clientWidth, a.height = t.clientHeight;
                if (a.width <= 0 || a.height <= 0 || r.resolution <= 0) throw "Invalid dimensions for plot, width = " + a.width + ", height = " + a.height + ", resolution = " + r.resolution;
                this.canvas = l(this.canvas, "canvas"), this.overlay = l(this.overlay, "overlay"), this.ctx = c(this.canvas), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.octx = c(this.overlay), this.octx.clearRect(0, 0, this.overlay.width, this.overlay.height), this.canvasHeight = a.height, this.canvasWidth = a.width, this.textEnabled = !!this.ctx.drawText || !!this.ctx.fillText
            },
            _initPlugins: function() { n.each(r.plugins, function(e, t) { n.each(e.callbacks, function(e, t) { this.observe(this.el, t, n.bind(e, this)) }, this), this[t] = r.clone(e), n.each(this[t], function(e, r) { n.isFunction(e) && (this[t][r] = n.bind(e, this)) }, this) }, this) },
            _initOptions: function(e) {
                var i = r.clone(r.defaultOptions);
                i.x2axis = n.extend(n.clone(i.xaxis), i.x2axis), i.y2axis = n.extend(n.clone(i.yaxis), i.y2axis), this.options = r.merge(e || {}, i), this.options.grid.minorVerticalLines === null && this.options.xaxis.scaling === "logarithmic" && (this.options.grid.minorVerticalLines = !0), this.options.grid.minorHorizontalLines === null && this.options.yaxis.scaling === "logarithmic" && (this.options.grid.minorHorizontalLines = !0), t.fire(this.el, "flotr:afterinitoptions", [this]), this.axes = r.Axis.getAxes(this.options);
                var s = [],
                    o = [],
                    u = this.series.length,
                    a = this.series.length,
                    f = this.options.colors,
                    l = [],
                    c = 0,
                    h, p, d, v;
                for (p = a - 1; p > -1; --p) h = this.series[p].color, h && (--a, n.isNumber(h) ? s.push(h) : l.push(r.Color.parse(h)));
                for (p = s.length - 1; p > -1; --p) a = Math.max(a, s[p] + 1);
                for (p = 0; o.length < a;) {
                    h = f.length == p ? new r.Color(100, 100, 100) : r.Color.parse(f[p]);
                    var m = c % 2 == 1 ? -1 : 1,
                        g = 1 + m * Math.ceil(c / 2) * .2;
                    h.scale(g, g, g), o.push(h), ++p >= f.length && (p = 0, ++c)
                }
                for (p = 0, d = 0; p < u; ++p) {
                    v = this.series[p], v.color ? n.isNumber(v.color) && (v.color = o[v.color].toString()) : v.color = o[d++].toString(), v.xaxis || (v.xaxis = this.axes.x), v.xaxis == 1 ? v.xaxis = this.axes.x : v.xaxis == 2 && (v.xaxis = this.axes.x2), v.yaxis || (v.yaxis = this.axes.y), v.yaxis == 1 ? v.yaxis = this.axes.y : v.yaxis == 2 && (v.yaxis = this.axes.y2);
                    for (var y in r.graphTypes) v[y] = n.extend(n.clone(this.options[y]), v[y]);
                    v.mouse = n.extend(n.clone(this.options.mouse), v.mouse), n.isUndefined(v.shadowSize) && (v.shadowSize = this.options.shadowSize)
                }
            },
            _setEl: function(e) {
                if (!e) throw "The target container doesn't exist";
                if (e.graph instanceof Graph) e.graph.destroy();
                else if (!e.clientWidth) throw "The target container must be visible";
                e.graph = this, this.el = e
            }
        }, Flotr.Graph = Graph
    }(),
    function() {
        function n(t) { this.orientation = 1, this.offset = 0, this.datamin = Number.MAX_VALUE, this.datamax = -Number.MAX_VALUE, e.extend(this, t) }

        function r(e, t) { return e = Math.log(Math.max(e, Number.MIN_VALUE)), t !== Math.E && (e /= Math.log(t)), e }

        function s(e, t) { return t === Math.E ? Math.exp(e) : Math.pow(t, e) }
        var e = Flotr._,
            t = "logarithmic";
        n.prototype = {
            setScale: function() {
                var e = this.length,
                    n = this.max,
                    i = this.min,
                    o = this.offset,
                    u = this.orientation,
                    a = this.options,
                    f = a.scaling === t,
                    l;
                f ? l = e / (r(n, a.base) - r(i, a.base)) : l = e / (n - i), this.scale = l, f ? (this.d2p = function(e) { return o + u * (r(e, a.base) - r(i, a.base)) * l }, this.p2d = function(e) { return s((o + u * e) / l + r(i, a.base), a.base) }) : (this.d2p = function(e) { return o + u * (e - i) * l }, this.p2d = function(e) { return (o + u * e) / l + i })
            },
            calculateTicks: function() {
                var t = this.options;
                this.ticks = [], this.minorTicks = [], t.ticks ? (this._cleanUserTicks(t.ticks, this.ticks), this._cleanUserTicks(t.minorTicks || [], this.minorTicks)) : t.mode == "time" ? this._calculateTimeTicks() : t.scaling === "logarithmic" ? this._calculateLogTicks() : this._calculateTicks(), e.each(this.ticks, function(e) { e.label += "" }), e.each(this.minorTicks, function(e) { e.label += "" })
            },
            calculateRange: function() {
                if (!this.used) return;
                var e = this,
                    t = e.options,
                    n = t.min !== null ? t.min : e.datamin,
                    r = t.max !== null ? t.max : e.datamax,
                    i = t.autoscaleMargin;
                t.scaling == "logarithmic" && (n <= 0 && (n = e.datamin), r <= 0 && (r = n));
                if (r == n) {
                    var s = r ? .01 : 1;
                    t.min === null && (n -= s), t.max === null && (r += s)
                }
                if (t.scaling === "logarithmic") {
                    n < 0 && (n = r / t.base);
                    var o = Math.log(r);
                    t.base != Math.E && (o /= Math.log(t.base)), o = Math.ceil(o);
                    var u = Math.log(n);
                    t.base != Math.E && (u /= Math.log(t.base)), u = Math.ceil(u), e.tickSize = Flotr.getTickSize(t.noTicks, u, o, t.tickDecimals === null ? 0 : t.tickDecimals), t.minorTickFreq === null && (o - u > 10 ? t.minorTickFreq = 0 : o - u > 5 ? t.minorTickFreq = 2 : t.minorTickFreq = 5)
                } else e.tickSize = Flotr.getTickSize(t.noTicks, n, r, t.tickDecimals);
                e.min = n, e.max = r, t.min === null && t.autoscale && (e.min -= e.tickSize * i, e.min < 0 && e.datamin >= 0 && (e.min = 0), e.min = e.tickSize * Math.floor(e.min / e.tickSize)), t.max === null && t.autoscale && (e.max += e.tickSize * i, e.max > 0 && e.datamax <= 0 && e.datamax != e.datamin && (e.max = 0), e.max = e.tickSize * Math.ceil(e.max / e.tickSize)), e.min == e.max && (e.max = e.min + 1)
            },
            calculateTextDimensions: function(e, t) {
                var n = "",
                    r, i;
                if (this.options.showLabels)
                    for (i = 0; i < this.ticks.length; ++i) r = this.ticks[i].label.length, r > n.length && (n = this.ticks[i].label);
                this.maxLabel = e.dimensions(n, { size: t.fontSize, angle: Flotr.toRad(this.options.labelsAngle) }, "font-size:smaller;", "flotr-grid-label"), this.titleSize = e.dimensions(this.options.title, { size: t.fontSize * 1.2, angle: Flotr.toRad(this.options.titleAngle) }, "font-weight:bold;", "flotr-axis-title")
            },
            _cleanUserTicks: function(t, n) {
                var r = this,
                    i = this.options,
                    s, o, u, a;
                e.isFunction(t) && (t = t({ min: r.min, max: r.max }));
                for (o = 0; o < t.length; ++o) a = t[o], typeof a == "object" ? (s = a[0], u = a.length > 1 ? a[1] : i.tickFormatter(s, { min: r.min, max: r.max })) : (s = a, u = i.tickFormatter(s, { min: this.min, max: this.max })), n[o] = { v: s, label: u }
            },
            _calculateTimeTicks: function() { this.ticks = Flotr.Date.generator(this) },
            _calculateLogTicks: function() {
                var e = this,
                    t = e.options,
                    n, r, s = Math.log(e.max);
                t.base != Math.E && (s /= Math.log(t.base)), s = Math.ceil(s);
                var o = Math.log(e.min);
                t.base != Math.E && (o /= Math.log(t.base)), o = Math.ceil(o);
                for (i = o; i < s; i += e.tickSize) {
                    r = t.base == Math.E ? Math.exp(i) : Math.pow(t.base, i);
                    var u = r * (t.base == Math.E ? Math.exp(e.tickSize) : Math.pow(t.base, e.tickSize)),
                        a = (u - r) / t.minorTickFreq;
                    e.ticks.push({ v: r, label: t.tickFormatter(r, { min: e.min, max: e.max }) });
                    for (n = r + a; n < u; n += a) e.minorTicks.push({ v: n, label: t.tickFormatter(n, { min: e.min, max: e.max }) })
                }
                r = t.base == Math.E ? Math.exp(i) : Math.pow(t.base, i), e.ticks.push({ v: r, label: t.tickFormatter(r, { min: e.min, max: e.max }) })
            },
            _calculateTicks: function() {
                var e = this,
                    t = e.options,
                    n = e.tickSize,
                    r = e.min,
                    i = e.max,
                    s = n * Math.ceil(r / n),
                    o, u, a, f, l, c;
                t.minorTickFreq && (u = n / t.minorTickFreq);
                for (l = 0;
                    (a = f = s + l * n) <= i; ++l) {
                    o = t.tickDecimals, o === null && (o = 1 - Math.floor(Math.log(n) / Math.LN10)), o < 0 && (o = 0), a = a.toFixed(o), e.ticks.push({ v: a, label: t.tickFormatter(a, { min: e.min, max: e.max }) });
                    if (t.minorTickFreq)
                        for (c = 0; c < t.minorTickFreq && l * n + c * u < i; ++c) a = f + c * u, e.minorTicks.push({ v: a, label: t.tickFormatter(a, { min: e.min, max: e.max }) })
                }
            }
        }, e.extend(n, { getAxes: function(e) { return { x: new n({ options: e.xaxis, n: 1, length: this.plotWidth }), x2: new n({ options: e.x2axis, n: 2, length: this.plotWidth }), y: new n({ options: e.yaxis, n: 1, length: this.plotHeight, offset: this.plotHeight, orientation: -1 }), y2: new n({ options: e.y2axis, n: 2, length: this.plotHeight, offset: this.plotHeight, orientation: -1 }) } } }), Flotr.Axis = n
    }(),
    function() {
        function t(t) { e.extend(this, t) }
        var e = Flotr._;
        t.prototype = {
            getRange: function() {
                var e = this.data,
                    t = e.length,
                    n = Number.MAX_VALUE,
                    r = Number.MAX_VALUE,
                    i = -Number.MAX_VALUE,
                    s = -Number.MAX_VALUE,
                    o = !1,
                    u = !1,
                    a, f, l;
                if (t < 0 || this.hide) return !1;
                for (l = 0; l < t; l++) a = e[l][0], f = e[l][1], a !== null && (a < n && (n = a, o = !0), a > i && (i = a, o = !0)), f !== null && (f < r && (r = f, u = !0), f > s && (s = f, u = !0));
                return { xmin: n, xmax: i, ymin: r, ymax: s, xused: o, yused: u }
            }
        }, e.extend(t, { getSeries: function(n) { return e.map(n, function(n) { var r; return n.data ? (r = new t, e.extend(r, n)) : r = new t({ data: n }), r }) } }), Flotr.Series = t
    }(), Flotr.addType("lines", {
        options: { show: !1, lineWidth: 2, fill: !1, fillBorder: !1, fillColor: null, fillOpacity: .4, steps: !1, stacked: !1 },
        stack: { values: [] },
        draw: function(e) {
            var t = e.context,
                n = e.lineWidth,
                r = e.shadowSize,
                i;
            t.save(), t.lineJoin = "round", r && (t.lineWidth = r / 2, i = n / 2 + t.lineWidth / 2, t.strokeStyle = "rgba(0,0,0,0.1)", this.plot(e, i + r / 2, !1), t.strokeStyle = "rgba(0,0,0,0.2)", this.plot(e, i, !1)), t.lineWidth = n, t.strokeStyle = e.color, this.plot(e, 0, !0), t.restore()
        },
        plot: function(e, t, n) {
            function S() {!t && e.fill && d && (v = o(d[0]), r.fillStyle = e.fillStyle, r.lineTo(m, p), r.lineTo(v, p), r.lineTo(v, u(d[1])), r.fill(), e.fillBorder && r.stroke()) }
            var r = e.context,
                i = e.width,
                s = e.height,
                o = e.xScale,
                u = e.yScale,
                a = e.data,
                f = e.stacked ? this.stack : !1,
                l = a.length - 1,
                c = null,
                h = null,
                p = u(0),
                d = null,
                v, m, g, y, b, w, E;
            if (l < 1) return;
            r.beginPath();
            for (E = 0; E < l; ++E) {
                if (a[E][1] === null || a[E + 1][1] === null) { e.fill && E > 0 && a[E][1] !== null && (r.stroke(), S(), d = null, r.closePath(), r.beginPath()); continue }
                v = o(a[E][0]), m = o(a[E + 1][0]), d === null && (d = a[E]), f ? (b = f.values[a[E][0]] || 0, w = f.values[a[E + 1][0]] || f.values[a[E][0]] || 0, g = u(a[E][1] + b), y = u(a[E + 1][1] + w), n && (a[E].y0 = b, f.values[a[E][0]] = a[E][1] + b, E == l - 1 && (a[E + 1].y0 = w, f.values[a[E + 1][0]] = a[E + 1][1] + w))) : (g = u(a[E][1]), y = u(a[E + 1][1]));
                if (g > s && y > s || g < 0 && y < 0 || v < 0 && m < 0 || v > i && m > i) continue;
                (c != v || h != g + t) && r.moveTo(v, g + t), c = m, h = y + t, e.steps ? (r.lineTo(c + t / 2, g + t), r.lineTo(c + t / 2, h)) : r.lineTo(c, h)
            }(!e.fill || e.fill && !e.fillBorder) && r.stroke(), S(), r.closePath()
        },
        extendYRange: function(e, t, n, r) {
            var i = e.options;
            if (n.stacked && (!i.max && i.max !== 0 || !i.min && i.min !== 0)) {
                var s = e.max,
                    o = e.min,
                    u = r.positiveSums || {},
                    a = r.negativeSums || {},
                    f, l;
                for (l = 0; l < t.length; l++) f = t[l][0] + "", t[l][1] > 0 ? (u[f] = (u[f] || 0) + t[l][1], s = Math.max(s, u[f])) : (a[f] = (a[f] || 0) + t[l][1], o = Math.min(o, a[f]));
                r.negativeSums = a, r.positiveSums = u, e.max = s, e.min = o
            }
            n.steps && (this.hit = function(e) {
                var t = e.data,
                    n = e.args,
                    r = e.yScale,
                    i = n[0],
                    s = t.length,
                    o = n[1],
                    u = e.xInverse(i.relX),
                    a = i.relY,
                    f;
                for (f = 0; f < s - 1; f++)
                    if (u >= t[f][0] && u <= t[f + 1][0]) { Math.abs(r(t[f][1]) - a) < 8 && (o.x = t[f][0], o.y = t[f][1], o.index = f, o.seriesIndex = e.index); break }
            }, this.drawHit = function(e) {
                var t = e.context,
                    n = e.args,
                    r = e.data,
                    i = e.xScale,
                    s = n.index,
                    o = i(n.x),
                    u = e.yScale(n.y),
                    a;
                r.length - 1 > s && (a = e.xScale(r[s + 1][0]), t.save(), t.strokeStyle = e.color, t.lineWidth = e.lineWidth, t.beginPath(), t.moveTo(o, u), t.lineTo(a, u), t.stroke(), t.closePath(), t.restore())
            }, this.clearHit = function(e) {
                var t = e.context,
                    n = e.args,
                    r = e.data,
                    i = e.xScale,
                    s = e.lineWidth,
                    o = n.index,
                    u = i(n.x),
                    a = e.yScale(n.y),
                    f;
                r.length - 1 > o && (f = e.xScale(r[o + 1][0]), t.clearRect(u - s, a - s, f - u + 2 * s, 2 * s))
            })
        }
    }), Flotr.addType("bars", {
        options: { show: !1, lineWidth: 2, barWidth: 1, fill: !0, fillColor: null, fillOpacity: .4, horizontal: !1, stacked: !1, centered: !0, topPadding: .1, grouped: !1 },
        stack: { positive: [], negative: [], _positive: [], _negative: [] },
        draw: function(e) {
            var t = e.context;
            this.current += 1, t.save(), t.lineJoin = "miter", t.lineWidth = e.lineWidth, t.strokeStyle = e.color, e.fill && (t.fillStyle = e.fillStyle), this.plot(e), t.restore()
        },
        plot: function(e) {
            var t = e.data,
                n = e.context,
                r = e.shadowSize,
                i, s, o, u, a, f;
            if (t.length < 1) return;
            this.translate(n, e.horizontal);
            for (i = 0; i < t.length; i++) {
                s = this.getBarGeometry(t[i][0], t[i][1], e);
                if (s === null) continue;
                o = s.left, u = s.top, a = s.width, f = s.height, e.fill && n.fillRect(o, u, a, f), r && (n.save(), n.fillStyle = "rgba(0,0,0,0.05)", n.fillRect(o + r, u + r, a, f), n.restore()), e.lineWidth && n.strokeRect(o, u, a, f)
            }
        },
        translate: function(e, t) { t && (e.rotate(-Math.PI / 2), e.scale(-1, 1)) },
        getBarGeometry: function(e, t, n) {
            var r = n.horizontal,
                i = n.barWidth,
                s = n.centered,
                o = n.stacked ? this.stack : !1,
                u = n.lineWidth,
                a = s ? i / 2 : 0,
                f = r ? n.yScale : n.xScale,
                l = r ? n.xScale : n.yScale,
                c = r ? t : e,
                h = r ? e : t,
                p = 0,
                d, v, m, g, y;
            return n.grouped && (this.current / this.groups, c -= a, i /= this.groups, a = i / 2, c = c + i * this.current - a), o && (d = h > 0 ? o.positive : o.negative, p = d[c] || p, d[c] = p + h), v = f(c - a), m = f(c + i - a), g = l(h + p), y = l(p), y < 0 && (y = 0), e === null || t === null ? null : { x: c, y: h, xScale: f, yScale: l, top: g, left: Math.min(v, m) - u / 2, width: Math.abs(m - v) - u, height: y - g }
        },
        hit: function(e) {
            var t = e.data,
                n = e.args,
                r = n[0],
                i = n[1],
                s = e.xInverse(r.relX),
                o = e.yInverse(r.relY),
                u = this.getBarGeometry(s, o, e),
                a = u.width / 2,
                f = u.left,
                l = u.y,
                c, h;
            for (h = t.length; h--;) c = this.getBarGeometry(t[h][0], t[h][1], e), (l > 0 && l < c.y || l < 0 && l > c.y) && Math.abs(f - c.left) < a && (i.x = t[h][0], i.y = t[h][1], i.index = h, i.seriesIndex = e.index)
        },
        drawHit: function(e) {
            var t = e.context,
                n = e.args,
                r = this.getBarGeometry(n.x, n.y, e),
                i = r.left,
                s = r.top,
                o = r.width,
                u = r.height;
            t.save(), t.strokeStyle = e.color, t.lineWidth = e.lineWidth, this.translate(t, e.horizontal), t.beginPath(), t.moveTo(i, s + u), t.lineTo(i, s), t.lineTo(i + o, s), t.lineTo(i + o, s + u), e.fill && (t.fillStyle = e.fillStyle, t.fill()), t.stroke(), t.closePath(), t.restore()
        },
        clearHit: function(e) {
            var t = e.context,
                n = e.args,
                r = this.getBarGeometry(n.x, n.y, e),
                i = r.left,
                s = r.width,
                o = r.top,
                u = r.height,
                a = 2 * e.lineWidth;
            t.save(), this.translate(t, e.horizontal), t.clearRect(i - a, Math.min(o, o + u) - a, s + 2 * a, Math.abs(u) + 2 * a), t.restore()
        },
        extendXRange: function(e, t, n, r) { this._extendRange(e, t, n, r), this.groups = this.groups + 1 || 1, this.current = 0 },
        extendYRange: function(e, t, n, r) { this._extendRange(e, t, n, r) },
        _extendRange: function(e, t, n, r) {
            var i = e.options.max;
            if (_.isNumber(i) || _.isString(i)) return;
            var s = e.min,
                o = e.max,
                u = n.horizontal,
                a = e.orientation,
                f = this.positiveSums || {},
                l = this.negativeSums || {},
                c, h, p, d;
            (a == 1 && !u || a == -1 && u) && n.centered && (o = Math.max(e.datamax + n.barWidth, o), s = Math.min(e.datamin - n.barWidth, s));
            if (n.stacked && (a == 1 && u || a == -1 && !u))
                for (d = t.length; d--;) c = t[d][a == 1 ? 1 : 0] + "", h = t[d][a == 1 ? 0 : 1], h > 0 ? (f[c] = (f[c] || 0) + h, o = Math.max(o, f[c])) : (l[c] = (l[c] || 0) + h, s = Math.min(s, l[c]));
            (a == 1 && u || a == -1 && !u) && n.topPadding && (e.max === e.datamax || n.stacked && this.stackMax !== o) && (o += n.topPadding * (o - s)), this.stackMin = s, this.stackMax = o, this.negativeSums = l, this.positiveSums = f, e.max = o, e.min = s
        }
    }), Flotr.addType("bubbles", {
        options: { show: !1, lineWidth: 2, fill: !0, fillOpacity: .4, baseRadius: 2 },
        draw: function(e) {
            var t = e.context,
                n = e.shadowSize;
            t.save(), t.lineWidth = e.lineWidth, t.fillStyle = "rgba(0,0,0,0.05)", t.strokeStyle = "rgba(0,0,0,0.05)", this.plot(e, n / 2), t.strokeStyle = "rgba(0,0,0,0.1)", this.plot(e, n / 4), t.strokeStyle = e.color, t.fillStyle = e.fillStyle, this.plot(e), t.restore()
        },
        plot: function(e, t) {
            var n = e.data,
                r = e.context,
                i, s, o, u, a;
            t = t || 0;
            for (s = 0; s < n.length; ++s) i = this.getGeometry(n[s], e), r.beginPath(), r.arc(i.x + t, i.y + t, i.z, 0, 2 * Math.PI, !0), r.stroke(), e.fill && r.fill(), r.closePath()
        },
        getGeometry: function(e, t) { return { x: t.xScale(e[0]), y: t.yScale(e[1]), z: e[2] * t.baseRadius } },
        hit: function(e) {
            var t = e.data,
                n = e.args,
                r = n[0],
                s = n[1],
                o = r.relX,
                u = r.relY,
                a, f, l, c;
            s.best = s.best || Number.MAX_VALUE;
            for (i = t.length; i--;) f = this.getGeometry(t[i], e), l = f.x - o, c = f.y - u, a = Math.sqrt(l * l + c * c), a < f.z && f.z < s.best && (s.x = t[i][0], s.y = t[i][1], s.index = i, s.seriesIndex = e.index, s.best = f.z)
        },
        drawHit: function(e) {
            var t = e.context,
                n = this.getGeometry(e.data[e.args.index], e);
            t.save(), t.lineWidth = e.lineWidth, t.fillStyle = e.fillStyle, t.strokeStyle = e.color, t.beginPath(), t.arc(n.x, n.y, n.z, 0, 2 * Math.PI, !0), t.fill(), t.stroke(), t.closePath(), t.restore()
        },
        clearHit: function(e) {
            var t = e.context,
                n = this.getGeometry(e.data[e.args.index], e),
                r = n.z + e.lineWidth;
            t.save(), t.clearRect(n.x - r, n.y - r, 2 * r, 2 * r), t.restore()
        }
    }), Flotr.addType("candles", {
        options: { show: !1, lineWidth: 1, wickLineWidth: 1, candleWidth: .6, fill: !0, upFillColor: "#00A8F0", downFillColor: "#CB4B4B", fillOpacity: .5, barcharts: !1 },
        draw: function(e) {
            var t = e.context;
            t.save(), t.lineJoin = "miter", t.lineCap = "butt", t.lineWidth = e.wickLineWidth || e.lineWidth, this.plot(e), t.restore()
        },
        plot: function(e) {
            var t = e.data,
                n = e.context,
                r = e.xScale,
                i = e.yScale,
                s = e.candleWidth / 2,
                o = e.shadowSize,
                u = e.lineWidth,
                a = e.wickLineWidth,
                f = a % 2 / 2,
                l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N;
            if (t.length < 1) return;
            for (N = 0; N < t.length; N++) { c = t[N], h = c[0], d = c[1], v = c[2], m = c[3], g = c[4], y = r(h - s), b = r(h + s), w = i(m), E = i(v), S = i(Math.min(d, g)), x = i(Math.max(d, g)), l = e[d > g ? "downFillColor" : "upFillColor"], e.fill && !e.barcharts && (n.fillStyle = "rgba(0,0,0,0.05)", n.fillRect(y + o, x + o, b - y, S - x), n.save(), n.globalAlpha = e.fillOpacity, n.fillStyle = l, n.fillRect(y, x + u, b - y, S - x), n.restore()); if (u || a) h = Math.floor((y + b) / 2) + f, n.strokeStyle = l, n.beginPath(), e.barcharts ? (n.moveTo(h, Math.floor(E + u)), n.lineTo(h, Math.floor(w + u)), T = d < g, n.moveTo(T ? b : y, Math.floor(x + u)), n.lineTo(h, Math.floor(x + u)), n.moveTo(h, Math.floor(S + u)), n.lineTo(T ? y : b, Math.floor(S + u))) : (n.strokeRect(y, x + u, b - y, S - x), n.moveTo(h, Math.floor(x + u)), n.lineTo(h, Math.floor(E + u)), n.moveTo(h, Math.floor(S + u)), n.lineTo(h, Math.floor(w + u))), n.closePath(), n.stroke() }
        },
        hit: function(e) {
            var t = e.xScale,
                n = e.yScale,
                r = e.data,
                i = e.args,
                s = i[0],
                o = e.candleWidth / 2,
                u = i[1],
                a = s.relX,
                f = s.relY,
                l = r.length,
                c, h, p, d, v, m, g, y;
            for (c = 0; c < l; c++) { h = r[c], p = h[2], d = h[3], v = t(h[0] - o), m = t(h[0] + o), y = n(d), g = n(p); if (a > v && a < m && f > g && f < y) { u.x = h[0], u.index = c, u.seriesIndex = e.index; return } }
        },
        drawHit: function(e) {
            var t = e.context;
            t.save(), this.plot(_.defaults({ fill: !!e.fillColor, upFillColor: e.color, downFillColor: e.color, data: [e.data[e.args.index]] }, e)), t.restore()
        },
        clearHit: function(e) {
            var t = e.args,
                n = e.context,
                r = e.xScale,
                i = e.yScale,
                s = e.lineWidth,
                o = e.candleWidth / 2,
                u = e.data[t.index],
                a = r(u[0] - o) - s,
                f = r(u[0] + o) + s,
                l = i(u[2]),
                c = i(u[3]) + s;
            n.clearRect(a, l, f - a, c - l)
        },
        extendXRange: function(e, t, n) { e.options.max === null && (e.max = Math.max(e.datamax + .5, e.max), e.min = Math.min(e.datamin - .5, e.min)) }
    }), Flotr.addType("gantt", {
        options: { show: !1, lineWidth: 2, barWidth: 1, fill: !0, fillColor: null, fillOpacity: .4, centered: !0 },
        draw: function(e) {
            var t = this.ctx,
                n = e.gantt.barWidth,
                r = Math.min(e.gantt.lineWidth, n);
            t.save(), t.translate(this.plotOffset.left, this.plotOffset.top), t.lineJoin = "miter", t.lineWidth = r, t.strokeStyle = e.color, t.save(), this.gantt.plotShadows(e, n, 0, e.gantt.fill), t.restore();
            if (e.gantt.fill) {
                var i = e.gantt.fillColor || e.color;
                t.fillStyle = this.processColor(i, { opacity: e.gantt.fillOpacity })
            }
            this.gantt.plot(e, n, 0, e.gantt.fill), t.restore()
        },
        plot: function(e, t, n, r) {
            var i = e.data;
            if (i.length < 1) return;
            var s = e.xaxis,
                o = e.yaxis,
                u = this.ctx,
                a;
            for (a = 0; a < i.length; a++) {
                var f = i[a][0],
                    l = i[a][1],
                    c = i[a][2],
                    h = !0,
                    p = !0,
                    d = !0;
                if (l === null || c === null) continue;
                var v = l,
                    m = l + c,
                    g = f - (e.gantt.centered ? t / 2 : 0),
                    y = f + t - (e.gantt.centered ? t / 2 : 0);
                if (m < s.min || v > s.max || y < o.min || g > o.max) continue;
                v < s.min && (v = s.min, h = !1), m > s.max && (m = s.max, s.lastSerie != e && (p = !1)), g < o.min && (g = o.min), y > o.max && (y = o.max, o.lastSerie != e && (p = !1)), r && (u.beginPath(), u.moveTo(s.d2p(v), o.d2p(g) + n), u.lineTo(s.d2p(v), o.d2p(y) + n), u.lineTo(s.d2p(m), o.d2p(y) + n), u.lineTo(s.d2p(m), o.d2p(g) + n), u.fill(), u.closePath()), e.gantt.lineWidth && (h || d || p) && (u.beginPath(), u.moveTo(s.d2p(v), o.d2p(g) + n), u[h ? "lineTo" : "moveTo"](s.d2p(v), o.d2p(y) + n), u[p ? "lineTo" : "moveTo"](s.d2p(m), o.d2p(y) + n), u[d ? "lineTo" : "moveTo"](s.d2p(m), o.d2p(g) + n), u.stroke(), u.closePath())
            }
        },
        plotShadows: function(e, t, n) {
            var r = e.data;
            if (r.length < 1) return;
            var i, s, o, u, a = e.xaxis,
                f = e.yaxis,
                l = this.ctx,
                c = this.options.shadowSize;
            for (i = 0; i < r.length; i++) {
                s = r[i][0], o = r[i][1], u = r[i][2];
                if (o === null || u === null) continue;
                var h = o,
                    p = o + u,
                    d = s - (e.gantt.centered ? t / 2 : 0),
                    v = s + t - (e.gantt.centered ? t / 2 : 0);
                if (p < a.min || h > a.max || v < f.min || d > f.max) continue;
                h < a.min && (h = a.min), p > a.max && (p = a.max), d < f.min && (d = f.min), v > f.max && (v = f.max);
                var m = a.d2p(p) - a.d2p(h) - (a.d2p(p) + c <= this.plotWidth ? 0 : c),
                    g = f.d2p(d) - f.d2p(v) - (f.d2p(d) + c <= this.plotHeight ? 0 : c);
                l.fillStyle = "rgba(0,0,0,0.05)", l.fillRect(Math.min(a.d2p(h) + c, this.plotWidth), Math.min(f.d2p(v) + c, this.plotHeight), m, g)
            }
        },
        extendXRange: function(e) {
            if (e.options.max === null) {
                var t = e.min,
                    n = e.max,
                    r, i, s, o, u, a = {},
                    f = {},
                    l = null;
                for (r = 0; r < this.series.length; ++r) { o = this.series[r], u = o.gantt; if (u.show && o.xaxis == e) { for (i = 0; i < o.data.length; i++) u.show && (y = o.data[i][0] + "", a[y] = Math.max(a[y] || 0, o.data[i][1] + o.data[i][2]), l = o); for (i in a) n = Math.max(a[i], n) } }
                e.lastSerie = l, e.max = n, e.min = t
            }
        },
        extendYRange: function(e) {
            if (e.options.max === null) {
                var t = Number.MIN_VALUE,
                    n = Number.MAX_VALUE,
                    r, i, s, o, u = {},
                    a = {},
                    f = null;
                for (r = 0; r < this.series.length; ++r) {
                    s = this.series[r], o = s.gantt;
                    if (o.show && !s.hide && s.yaxis == e) {
                        var l = Number.MIN_VALUE,
                            c = Number.MAX_VALUE;
                        for (i = 0; i < s.data.length; i++) l = Math.max(l, s.data[i][0]), c = Math.min(c, s.data[i][0]);
                        o.centered ? (t = Math.max(l + .5, t), n = Math.min(c - .5, n)) : (t = Math.max(l + 1, t), n = Math.min(c, n)), o.barWidth + l > t && (t = e.max + o.barWidth)
                    }
                }
                e.lastSerie = f, e.max = t, e.min = n, e.tickSize = Flotr.getTickSize(e.options.noTicks, n, t, e.options.tickDecimals)
            }
        }
    }),
    function() {
        function e(e) { return typeof e == "object" && e.constructor && (Image ? !0 : e.constructor === Image) }
        Flotr.defaultMarkerFormatter = function(e) { return Math.round(e.y * 100) / 100 + "" }, Flotr.addType("markers", {
            options: { show: !1, lineWidth: 1, color: "#000000", fill: !1, fillColor: "#FFFFFF", fillOpacity: .4, stroke: !1, position: "ct", verticalMargin: 0, labelFormatter: Flotr.defaultMarkerFormatter, fontSize: Flotr.defaultOptions.fontSize, stacked: !1, stackingType: "b", horizontal: !1 },
            stack: { positive: [], negative: [], values: [] },
            draw: function(e) {
                function h(e, t) { return o = r.negative[e] || 0, s = r.positive[e] || 0, t > 0 ? (r.positive[e] = o + t, o + t) : (r.negative[e] = s + t, s + t) }
                var t = e.data,
                    n = e.context,
                    r = e.stacked ? e.stack : !1,
                    i = e.stackingType,
                    s, o, u, a, f, l, c;
                n.save(), n.lineJoin = "round", n.lineWidth = e.lineWidth, n.strokeStyle = "rgba(0,0,0,0.5)", n.fillStyle = e.fillStyle;
                for (a = 0; a < t.length; ++a) f = t[a][0], l = t[a][1], r && (i == "b" ? e.horizontal ? l = h(l, f) : f = h(f, l) : i == "a" && (u = r.values[f] || 0, r.values[f] = u + l, l = u + l)), c = e.labelFormatter({ x: f, y: l, index: a, data: t }), this.plot(e.xScale(f), e.yScale(l), c, e);
                n.restore()
            },
            plot: function(t, n, r, i) {
                var s = i.context;
                if (e(r) && !r.complete) throw "Marker image not loaded.";
                this._plot(t, n, r, i)
            },
            _plot: function(t, n, r, i) {
                var s = i.context,
                    o = 2,
                    u = t,
                    a = n,
                    f;
                e(r) ? f = { height: r.height, width: r.width } : f = i.text.canvas(r), f.width = Math.floor(f.width + o * 2), f.height = Math.floor(f.height + o * 2), i.position.indexOf("c") != -1 ? u -= f.width / 2 + o : i.position.indexOf("l") != -1 && (u -= f.width), i.position.indexOf("m") != -1 ? a -= f.height / 2 + o : i.position.indexOf("t") != -1 ? a -= f.height + i.verticalMargin : a += i.verticalMargin, u = Math.floor(u) + .5, a = Math.floor(a) + .5, i.fill && s.fillRect(u, a, f.width, f.height), i.stroke && s.strokeRect(u, a, f.width, f.height), e(r) ? s.drawImage(r, parseInt(u + o, 10), parseInt(a + o, 10)) : Flotr.drawText(s, r, u + o, a + o, { textBaseline: "top", textAlign: "left", size: i.fontSize, color: i.color })
            }
        })
    }(),
    function() {
        var e = Flotr._;
        Flotr.defaultPieLabelFormatter = function(e, t) { return (100 * t / e).toFixed(2) + "%" }, Flotr.addType("pie", {
            options: { show: !1, lineWidth: 1, fill: !0, fillColor: null, fillOpacity: .6, explode: 6, sizeRatio: .6, startAngle: Math.PI / 4, labelFormatter: Flotr.defaultPieLabelFormatter, pie3D: !1, pie3DviewAngle: Math.PI / 2 * .8, pie3DspliceThickness: 20, epsilon: .1 },
            draw: function(e) {
                var t = e.data,
                    n = e.context,
                    r = e.lineWidth,
                    i = e.shadowSize,
                    s = e.sizeRatio,
                    o = e.height,
                    u = e.width,
                    a = e.explode,
                    f = e.color,
                    l = e.fill,
                    c = e.fillStyle,
                    h = Math.min(u, o) * s / 2,
                    p = t[0][1],
                    d = [],
                    v = 1,
                    m = Math.PI * 2 * p / this.total,
                    g = this.startAngle || 2 * Math.PI * e.startAngle,
                    y = g + m,
                    b = g + m / 2,
                    w = e.labelFormatter(this.total, p),
                    E = a + h + 4,
                    S = Math.cos(b) * E,
                    x = Math.sin(b) * E,
                    T = S < 0 ? "right" : "left",
                    N = x > 0 ? "top" : "bottom",
                    C, k, L;
                n.save(), n.translate(u / 2, o / 2), n.scale(1, v), k = Math.cos(b) * a, L = Math.sin(b) * a, i > 0 && (this.plotSlice(k + i, L + i, h, g, y, n), l && (n.fillStyle = "rgba(0,0,0,0.1)", n.fill())), this.plotSlice(k, L, h, g, y, n), l && (n.fillStyle = c, n.fill()), n.lineWidth = r, n.strokeStyle = f, n.stroke(), C = { size: e.fontSize * 1.2, color: e.fontColor, weight: 1.5 }, w && (e.htmlText || !e.textEnabled ? (divStyle = "position:absolute;" + N + ":" + (o / 2 + (N === "top" ? x : -x)) + "px;", divStyle += T + ":" + (u / 2 + (T === "right" ? -S : S)) + "px;", d.push('<div style="', divStyle, '" class="flotr-grid-label">', w, "</div>")) : (C.textAlign = T, C.textBaseline = N, Flotr.drawText(n, w, S, x, C)));
                if (e.htmlText || !e.textEnabled) {
                    var A = Flotr.DOM.node('<div style="color:' + e.fontColor + '" class="flotr-labels"></div>');
                    Flotr.DOM.insert(A, d.join("")), Flotr.DOM.insert(e.element, A)
                }
                n.restore(), this.startAngle = y, this.slices = this.slices || [], this.slices.push({ radius: h, x: k, y: L, explode: a, start: g, end: y })
            },
            plotSlice: function(e, t, n, r, i, s) { s.beginPath(), s.moveTo(e, t), s.arc(e, t, n, r, i, !1), s.lineTo(e, t), s.closePath() },
            hit: function(e) {
                var t = e.data[0],
                    n = e.args,
                    r = e.index,
                    i = n[0],
                    s = n[1],
                    o = this.slices[r],
                    u = i.relX - e.width / 2,
                    a = i.relY - e.height / 2,
                    f = Math.sqrt(u * u + a * a),
                    l = Math.atan(a / u),
                    c = Math.PI * 2,
                    h = o.explode || e.explode,
                    p = o.start % c,
                    d = o.end % c,
                    v = e.epsilon;
                u < 0 ? l += Math.PI : u > 0 && a < 0 && (l += c), f < o.radius + h && f > h && (l > p && l < d || p > d && (l < d || l > p) || p === d && (o.start === o.end && Math.abs(l - p) < v || o.start !== o.end && Math.abs(l - p) > v)) && (s.x = t[0], s.y = t[1], s.sAngle = p, s.eAngle = d, s.index = 0, s.seriesIndex = r, s.fraction = t[1] / this.total)
            },
            drawHit: function(e) {
                var t = e.context,
                    n = this.slices[e.args.seriesIndex];
                t.save(), t.translate(e.width / 2, e.height / 2), this.plotSlice(n.x, n.y, n.radius, n.start, n.end, t), t.stroke(), t.restore()
            },
            clearHit: function(e) {
                var t = e.context,
                    n = this.slices[e.args.seriesIndex],
                    r = 2 * e.lineWidth,
                    i = n.radius + r;
                t.save(), t.translate(e.width / 2, e.height / 2), t.clearRect(n.x - i, n.y - i, 2 * i + r, 2 * i + r), t.restore()
            },
            extendYRange: function(e, t) { this.total = (this.total || 0) + t[0][1] }
        })
    }(), Flotr.addType("points", {
        options: { show: !1, radius: 3, lineWidth: 2, fill: !0, fillColor: "#FFFFFF", fillOpacity: 1, hitRadius: null },
        draw: function(e) {
            var t = e.context,
                n = e.lineWidth,
                r = e.shadowSize;
            t.save(), r > 0 && (t.lineWidth = r / 2, t.strokeStyle = "rgba(0,0,0,0.1)", this.plot(e, r / 2 + t.lineWidth / 2), t.strokeStyle = "rgba(0,0,0,0.2)", this.plot(e, t.lineWidth / 2)), t.lineWidth = e.lineWidth, t.strokeStyle = e.color, e.fill && (t.fillStyle = e.fillStyle), this.plot(e), t.restore()
        },
        plot: function(e, t) {
            var n = e.data,
                r = e.context,
                i = e.xScale,
                s = e.yScale,
                o, u, a;
            for (o = n.length - 1; o > -1; --o) {
                a = n[o][1];
                if (a === null) continue;
                u = i(n[o][0]), a = s(a);
                if (u < 0 || u > e.width || a < 0 || a > e.height) continue;
                r.beginPath(), t ? r.arc(u, a + t, e.radius, 0, Math.PI, !1) : (r.arc(u, a, e.radius, 0, 2 * Math.PI, !0), e.fill && r.fill()), r.stroke(), r.closePath()
            }
        }
    }), Flotr.addType("radar", {
        options: { show: !1, lineWidth: 2, fill: !0, fillOpacity: .4, radiusRatio: .9, sensibility: 2 },
        draw: function(e) {
            var t = e.context,
                n = e.shadowSize;
            t.save(), t.translate(e.width / 2, e.height / 2), t.lineWidth = e.lineWidth, t.fillStyle = "rgba(0,0,0,0.05)", t.strokeStyle = "rgba(0,0,0,0.05)", this.plot(e, n / 2), t.strokeStyle = "rgba(0,0,0,0.1)", this.plot(e, n / 4), t.strokeStyle = e.color, t.fillStyle = e.fillStyle, this.plot(e), t.restore()
        },
        plot: function(e, t) {
            var n = e.data,
                r = e.context,
                i = Math.min(e.height, e.width) * e.radiusRatio / 2,
                s = 2 * Math.PI / n.length,
                o = -Math.PI / 2,
                u, a;
            t = t || 0, r.beginPath();
            for (u = 0; u < n.length; ++u) a = n[u][1] / this.max, r[u === 0 ? "moveTo" : "lineTo"](Math.cos(u * s + o) * i * a + t, Math.sin(u * s + o) * i * a + t);
            r.closePath(), e.fill && r.fill(), r.stroke()
        },
        getGeometry: function(e, t) {
            var n = Math.min(t.height, t.width) * t.radiusRatio / 2,
                r = 2 * Math.PI / t.data.length,
                i = -Math.PI / 2,
                s = e[1] / this.max;
            return { x: Math.cos(e[0] * r + i) * n * s + t.width / 2, y: Math.sin(e[0] * r + i) * n * s + t.height / 2 }
        },
        hit: function(e) {
            var t = e.args,
                n = t[0],
                r = t[1],
                i = n.relX,
                s = n.relY,
                o, u, a, f;
            for (var l = 0; l < r.series.length; l++) {
                var c = r.series[l],
                    h = c.data;
                for (var p = h.length; p--;) { u = this.getGeometry(h[p], e), a = u.x - i, f = u.y - s, o = Math.sqrt(a * a + f * f); if (o < e.sensibility * 2) return r.x = h[p][0], r.y = h[p][1], r.index = p, r.seriesIndex = l, r }
            }
        },
        drawHit: function(e) {
            var t = 2 * Math.PI / e.data.length,
                n = -Math.PI / 2,
                r = Math.min(e.height, e.width) * e.radiusRatio / 2,
                i = e.args.series,
                s = i.points.hitRadius || i.points.radius || i.mouse.radius,
                o = e.context;
            o.translate(e.width / 2, e.height / 2);
            var u = e.args.index,
                a = e.data[u][1] / this.max,
                f = Math.cos(u * t + n) * r * a,
                l = Math.sin(u * t + n) * r * a;
            o.beginPath(), o.arc(f, l, s, 0, 2 * Math.PI, !0), o.closePath(), o.stroke()
        },
        clearHit: function(e) {
            var t = 2 * Math.PI / e.data.length,
                n = -Math.PI / 2,
                r = Math.min(e.height, e.width) * e.radiusRatio / 2,
                i = e.context,
                s = e.args.series,
                o = s.points ? s.points.lineWidth : 1;
            offset = (s.points.hitRadius || s.points.radius || s.mouse.radius) + o, i.translate(e.width / 2, e.height / 2);
            var u = e.args.index,
                a = e.data[u][1] / this.max,
                f = Math.cos(u * t + n) * r * a,
                l = Math.sin(u * t + n) * r * a;
            i.clearRect(f - offset, l - offset, offset * 2, offset * 2)
        },
        extendYRange: function(e, t) { this.max = Math.max(e.max, this.max || -Number.MAX_VALUE) }
    }), Flotr.addType("timeline", {
        options: { show: !1, lineWidth: 1, barWidth: .2, fill: !0, fillColor: null, fillOpacity: .4, centered: !0 },
        draw: function(e) {
            var t = e.context;
            t.save(), t.lineJoin = "miter", t.lineWidth = e.lineWidth, t.strokeStyle = e.color, t.fillStyle = e.fillStyle, this.plot(e), t.restore()
        },
        plot: function(e) {
            var t = e.data,
                n = e.context,
                r = e.xScale,
                i = e.yScale,
                s = e.barWidth,
                o = e.lineWidth,
                u;
            Flotr._.each(t, function(e) {
                var t = e[0],
                    u = e[1],
                    a = e[2],
                    f = s,
                    l = Math.ceil(r(t)),
                    c = Math.ceil(r(t + a)) - l,
                    h = Math.round(i(u)),
                    p = Math.round(i(u - f)) - h,
                    d = l - o / 2,
                    v = Math.round(h - p / 2) - o / 2;
                n.strokeRect(d, v, c, p), n.fillRect(d, v, c, p)
            })
        },
        extendRange: function(e) {
            var t = e.data,
                n = e.xaxis,
                r = e.yaxis,
                i = e.timeline.barWidth;
            n.options.min === null && (n.min = n.datamin - i / 2);
            if (n.options.max === null) {
                var s = n.max;
                Flotr._.each(t, function(e) { s = Math.max(s, e[0] + e[2]) }, this), n.max = s + i / 2
            }
            r.options.min === null && (r.min = r.datamin - i), r.options.min === null && (r.max = r.datamax + i)
        }
    }),
    function() {
        var e = Flotr.DOM;
        Flotr.addPlugin("crosshair", {
            options: { mode: null, color: "#FF0000", hideCursor: !0 },
            callbacks: { "flotr:mousemove": function(e, t) { this.options.crosshair.mode && (this.crosshair.clearCrosshair(), this.crosshair.drawCrosshair(t)) } },
            drawCrosshair: function(t) {
                var n = this.octx,
                    r = this.options.crosshair,
                    i = this.plotOffset,
                    s = i.left + Math.round(t.relX) + .5,
                    o = i.top + Math.round(t.relY) + .5;
                if (t.relX < 0 || t.relY < 0 || t.relX > this.plotWidth || t.relY > this.plotHeight) { this.el.style.cursor = null, e.removeClass(this.el, "flotr-crosshair"); return }
                r.hideCursor && (this.el.style.cursor = "none", e.addClass(this.el, "flotr-crosshair")), n.save(), n.strokeStyle = r.color, n.lineWidth = 1, n.beginPath(), r.mode.indexOf("x") != -1 && (n.moveTo(s, i.top), n.lineTo(s, i.top + this.plotHeight)), r.mode.indexOf("y") != -1 && (n.moveTo(i.left, o), n.lineTo(i.left + this.plotWidth, o)), n.stroke(), n.restore()
            },
            clearCrosshair: function() {
                var e = this.plotOffset,
                    t = this.lastMousePos,
                    n = this.octx;
                t && (n.clearRect(Math.round(t.relX) + e.left, e.top, 1, this.plotHeight + 1), n.clearRect(e.left, Math.round(t.relY) + e.top, this.plotWidth + 1, 1))
            }
        })
    }(),
    function() {
        function n(e, t, n, r, i, s) {
            var o = "image/" + e,
                u = n.getImageData(0, 0, r, i),
                a = new Image;
            return n.save(), n.globalCompositeOperation = "destination-over", n.fillStyle = s, n.fillRect(0, 0, r, i), a.src = t.toDataURL(o), n.restore(), n.clearRect(0, 0, r, i), n.putImageData(u, 0, 0), a
        }
        var e = Flotr.DOM,
            t = Flotr._;
        Flotr.addPlugin("download", {
            saveImage: function(r, i, s, o) {
                var u = this.options.grid,
                    a;
                if (Flotr.isIE && Flotr.isIE < 9) return a = "<html><body>" + this.canvas.firstChild.innerHTML + "</body></html>", window.open().document.write(a);
                if (r !== "jpeg" && r !== "png") return;
                a = n(r, this.canvas, this.ctx, this.canvasWidth, this.canvasHeight, u && u.backgroundColor || "#ffffff");
                if (!t.isElement(a) || !o) return window.open(a.src);
                this.download.restoreCanvas(), e.hide(this.canvas), e.hide(this.overlay), e.setStyles({ position: "absolute" }), e.insert(this.el, a), this.saveImageElement = a
            },
            restoreCanvas: function() { e.show(this.canvas), e.show(this.overlay), this.saveImageElement && this.el.removeChild(this.saveImageElement), this.saveImageElement = null }
        })
    }(),
    function() {
        var e = Flotr.EventAdapter,
            t = Flotr._;
        Flotr.addPlugin("graphGrid", {
            callbacks: { "flotr:beforedraw": function() { this.graphGrid.drawGrid() }, "flotr:afterdraw": function() { this.graphGrid.drawOutline() } },
            drawGrid: function() {
                function v(e) { for (p = 0; p < e.length; ++p) { var t = e[p].v / c.max; for (d = 0; d <= w; ++d) n[d === 0 ? "moveTo" : "lineTo"](Math.cos(d * S + x) * b * t, Math.sin(d * S + x) * b * t) } }

                function m(e, r) {
                    t.each(t.pluck(e, "v"), function(e) {
                        if (e <= c.min || e >= c.max || (e == c.min || e == c.max) && i.outlineWidth) return;
                        r(Math.floor(c.d2p(e)) + n.lineWidth / 2)
                    })
                }

                function g(e) { n.moveTo(e, 0), n.lineTo(e, f) }

                function y(e) { n.moveTo(0, e), n.lineTo(l, e) }
                var n = this.ctx,
                    r = this.options,
                    i = r.grid,
                    s = i.verticalLines,
                    o = i.horizontalLines,
                    u = i.minorVerticalLines,
                    a = i.minorHorizontalLines,
                    f = this.plotHeight,
                    l = this.plotWidth,
                    c, h, p, d;
                (s || u || o || a) && e.fire(this.el, "flotr:beforegrid", [this.axes.x, this.axes.y, r, this]), n.save(), n.lineWidth = 1, n.strokeStyle = i.tickColor;
                if (i.circular) {
                    n.translate(this.plotOffset.left + l / 2, this.plotOffset.top + f / 2);
                    var b = Math.min(f, l) * r.radar.radiusRatio / 2,
                        w = this.axes.x.ticks.length,
                        S = 2 * (Math.PI / w),
                        x = -Math.PI / 2;
                    n.beginPath(), c = this.axes.y, o && v(c.ticks), a && v(c.minorTicks), s && t.times(w, function(e) { n.moveTo(0, 0), n.lineTo(Math.cos(e * S + x) * b, Math.sin(e * S + x) * b) }), n.stroke()
                } else n.translate(this.plotOffset.left, this.plotOffset.top), i.backgroundColor && (n.fillStyle = this.processColor(i.backgroundColor, { x1: 0, y1: 0, x2: l, y2: f }), n.fillRect(0, 0, l, f)), n.beginPath(), c = this.axes.x, s && m(c.ticks, g), u && m(c.minorTicks, g), c = this.axes.y, o && m(c.ticks, y), a && m(c.minorTicks, y), n.stroke();
                n.restore(), (s || u || o || a) && e.fire(this.el, "flotr:aftergrid", [this.axes.x, this.axes.y, r, this])
            },
            drawOutline: function() {
                var e = this,
                    t = e.options,
                    n = t.grid,
                    r = n.outline,
                    s = e.ctx,
                    o = n.backgroundImage,
                    u = e.plotOffset,
                    a = u.left,
                    f = u.top,
                    l = e.plotWidth,
                    c = e.plotHeight,
                    h, p, d, v, m, g;
                if (!n.outlineWidth) return;
                s.save();
                if (n.circular) {
                    s.translate(a + l / 2, f + c / 2);
                    var y = Math.min(c, l) * t.radar.radiusRatio / 2,
                        b = this.axes.x.ticks.length,
                        w = 2 * (Math.PI / b),
                        E = -Math.PI / 2;
                    s.beginPath(), s.lineWidth = n.outlineWidth, s.strokeStyle = n.color, s.lineJoin = "round";
                    for (i = 0; i <= b; ++i) s[i === 0 ? "moveTo" : "lineTo"](Math.cos(i * w + E) * y, Math.sin(i * w + E) * y);
                    s.stroke()
                } else {
                    s.translate(a, f);
                    var S = n.outlineWidth,
                        x = .5 - S + (S + 1) % 2 / 2,
                        T = "lineTo",
                        N = "moveTo";
                    s.lineWidth = S, s.strokeStyle = n.color, s.lineJoin = "miter", s.beginPath(), s.moveTo(x, x), l -= S / 2 % 1, c += S / 2, s[r.indexOf("n") !== -1 ? T : N](l, x), s[r.indexOf("e") !== -1 ? T : N](l, c), s[r.indexOf("s") !== -1 ? T : N](x, c), s[r.indexOf("w") !== -1 ? T : N](x, x), s.stroke(), s.closePath()
                }
                s.restore(), o && (d = o.src || o, v = (parseInt(o.left, 10) || 0) + u.left, m = (parseInt(o.top, 10) || 0) + u.top, p = new Image, p.onload = function() { s.save(), o.alpha && (s.globalAlpha = o.alpha), s.globalCompositeOperation = "destination-over", s.drawImage(p, 0, 0, p.width, p.height, v, m, l, c), s.restore() }, p.src = d)
            }
        })
    }(),
    function() {
        var e = Flotr.DOM,
            t = Flotr._,
            n = Flotr,
            r = "opacity:0.7;background-color:#000;color:#fff;position:absolute;padding:2px 8px;-moz-border-radius:4px;border-radius:4px;white-space:nowrap;";
        Flotr.addPlugin("hit", {
            callbacks: {
                "flotr:mousemove": function(e, t) { this.hit.track(t) },
                "flotr:click": function(e) {
                    var n = this.hit.track(e);
                    n && !t.isUndefined(n.index) && (e.hit = n)
                },
                "flotr:mouseout": function(e) { e.relatedTarget !== this.mouseTrack && this.hit.clearHit() },
                "flotr:destroy": function() { this.options.mouse.container && e.remove(this.mouseTrack), this.mouseTrack = null }
            },
            track: function(e) { if (this.options.mouse.track || t.any(this.series, function(e) { return e.mouse && e.mouse.track })) return this.hit.hit(e) },
            executeOnType: function(e, r, i) {
                function u(e, u) { t.each(t.keys(n.graphTypes), function(t) { e[t] && e[t].show && !e.hide && this[t][r] && (o = this.getOptions(e, t), o.fill = !!e.mouse.fillColor, o.fillStyle = this.processColor(e.mouse.fillColor || "#ffffff", { opacity: e.mouse.fillOpacity }), o.color = e.mouse.lineColor, o.context = this.octx, o.index = u, i && (o.args = i), this[t][r].call(this[t], o), s = !0) }, this) }
                var s = !1,
                    o;
                return t.isArray(e) || (e = [e]), t.each(e, u, this), s
            },
            drawHit: function(e) {
                var t = this.octx,
                    n = e.series;
                if (n.mouse.lineColor) {
                    t.save(), t.lineWidth = n.points ? n.points.lineWidth : 1, t.strokeStyle = n.mouse.lineColor, t.fillStyle = this.processColor(n.mouse.fillColor || "#ffffff", { opacity: n.mouse.fillOpacity }), t.translate(this.plotOffset.left, this.plotOffset.top);
                    if (!this.hit.executeOnType(n, "drawHit", e)) {
                        var r = e.xaxis,
                            i = e.yaxis;
                        t.beginPath(), t.arc(r.d2p(e.x), i.d2p(e.y), n.points.hitRadius || n.points.radius || n.mouse.radius, 0, 2 * Math.PI, !0), t.fill(), t.stroke(), t.closePath()
                    }
                    t.restore(), this.clip(t)
                }
                this.prevHit = e
            },
            clearHit: function() {
                var t = this.prevHit,
                    n = this.octx,
                    r = this.plotOffset;
                n.save(), n.translate(r.left, r.top);
                if (t) {
                    if (!this.hit.executeOnType(t.series, "clearHit", this.prevHit)) {
                        var i = t.series,
                            s = i.points ? i.points.lineWidth : 1;
                        offset = (i.points.hitRadius || i.points.radius || i.mouse.radius) + s, n.clearRect(t.xaxis.d2p(t.x) - offset, t.yaxis.d2p(t.y) - offset, offset * 2, offset * 2)
                    }
                    e.hide(this.mouseTrack), this.prevHit = null
                }
                n.restore()
            },
            hit: function(e) {
                var n = this.options,
                    r = this.prevHit,
                    i, s, o, u, a, f, l, c, h;
                if (this.series.length === 0) return;
                h = { relX: e.relX, relY: e.relY, absX: e.absX, absY: e.absY, series: this.series };
                if (n.mouse.trackY && !n.mouse.trackAll && this.hit.executeOnType(this.series, "hit", [e, h]) && !t.isUndefined(h.seriesIndex)) a = this.series[h.seriesIndex], h.series = a, h.mouse = a.mouse, h.xaxis = a.xaxis, h.yaxis = a.yaxis;
                else { i = this.hit.closest(e); if (i) { i = n.mouse.trackY ? i.point : i.x, u = i.seriesIndex, a = this.series[u], l = a.xaxis, c = a.yaxis, s = 2 * a.mouse.sensibility; if (n.mouse.trackAll || i.distanceX < s / l.scale && (!n.mouse.trackY || i.distanceY < s / c.scale)) h.series = a, h.xaxis = a.xaxis, h.yaxis = a.yaxis, h.mouse = a.mouse, h.x = i.x, h.y = i.y, h.dist = i.distance, h.index = i.dataIndex, h.seriesIndex = u } }
                if (!r || r.index !== h.index || r.seriesIndex !== h.seriesIndex) this.hit.clearHit(), h.series && h.mouse && h.mouse.track && (this.hit.drawMouseTrack(h), this.hit.drawHit(h), Flotr.EventAdapter.fire(this.el, "flotr:hit", [h, this]));
                return h
            },
            closest: function(e) {
                function E(e) { e.distance = h, e.distanceX = p, e.distanceY = d, e.seriesIndex = b, e.dataIndex = w, e.x = g, e.y = y, f = !0 }
                var t = this.series,
                    n = this.options,
                    r = e.relX,
                    i = e.relY,
                    s = Number.MAX_VALUE,
                    o = Number.MAX_VALUE,
                    u = {},
                    a = {},
                    f = !1,
                    l, c, h, p, d, v, m, g, y, b, w;
                for (b = 0; b < t.length; b++) {
                    l = t[b], c = l.data, v = l.xaxis.p2d(r), m = l.yaxis.p2d(i);
                    if (l.hide) continue;
                    for (w = c.length; w--;) {
                        g = c[w][0], y = c[w][1], c[w].y0 && (y += c[w].y0);
                        if (g === null || y === null) continue;
                        if (g < l.xaxis.min || g > l.xaxis.max) continue;
                        p = Math.abs(g - v), d = Math.abs(y - m), h = p * p + d * d, h < s && (s = h, E(u)), p < o && (o = p, E(a))
                    }
                }
                return f ? { point: u, x: a } : !1
            },
            drawMouseTrack: function(n) {
                var i = "",
                    s = n.series,
                    o = n.mouse.position,
                    u = n.mouse.margin,
                    a = n.x,
                    f = n.y,
                    l = r,
                    c = this.mouseTrack,
                    h = this.plotOffset,
                    p = h.left,
                    d = h.right,
                    v = h.bottom,
                    m = h.top,
                    g = n.mouse.trackDecimals,
                    y = this.options,
                    b = y.mouse.container,
                    w = 0,
                    E = 0,
                    S, x, T;
                c || (c = e.node('<div class="flotr-mouse-value" style="' + l + '"></div>'), this.mouseTrack = c, e.insert(b || this.el, c));
                if (!g || g < 0) g = 0;
                a && a.toFixed && (a = a.toFixed(g)), f && f.toFixed && (f = f.toFixed(g)), T = n.mouse.trackFormatter({ x: a, y: f, series: n.series, index: n.index, nearest: n, fraction: n.fraction });
                if (t.isNull(T) || t.isUndefined(T)) { e.hide(c); return }
                c.innerHTML = T, e.show(c);
                if (!o) return;
                x = e.size(c), b && (S = e.position(this.el), w = S.top, E = S.left);
                if (!n.mouse.relative) i += "top:", o.charAt(0) == "n" ? i += w + u + m : o.charAt(0) == "s" && (i += w - u + m + this.plotHeight - x.height), i += "px;bottom:auto;left:", o.charAt(1) == "e" ? i += E - u + p + this.plotWidth - x.width : o.charAt(1) == "w" && (i += E + u + p), i += "px;right:auto;";
                else if (s.pie && s.pie.show) {
                    var N = { x: this.plotWidth / 2, y: this.plotHeight / 2 },
                        C = Math.min(this.canvasWidth, this.canvasHeight) * s.pie.sizeRatio / 2,
                        k = n.sAngle < n.eAngle ? (n.sAngle + n.eAngle) / 2 : (n.sAngle + n.eAngle + 2 * Math.PI) / 2;
                    i += "bottom:" + (u - m - N.y - Math.sin(k) * C / 2 + this.canvasHeight) + "px;top:auto;", i += "left:" + (u + p + N.x + Math.cos(k) * C / 2) + "px;right:auto;"
                } else i += "top:", /n/.test(o) ? i += w - u + m + n.yaxis.d2p(n.y) - x.height : i += w + u + m + n.yaxis.d2p(n.y), i += "px;bottom:auto;left:", /w/.test(o) ? i += E - u + p + n.xaxis.d2p(n.x) - x.width : i += E + u + p + n.xaxis.d2p(n.x), i += "px;right:auto;";
                c.style.cssText = l + i, n.mouse.relative && (/[ew]/.test(o) ? /[ns]/.test(o) || (c.style.top = w + m + n.yaxis.d2p(n.y) - e.size(c).height / 2 + "px") : c.style.left = E + p + n.xaxis.d2p(n.x) - e.size(c).width / 2 + "px")
            }
        })
    }(),
    function() {
        function e(e, t) { return e.which ? e.which === 1 : e.button === 0 || e.button === 1 }

        function t(e, t) { return Math.min(Math.max(0, e), t.plotWidth - 1) }

        function n(e, t) { return Math.min(Math.max(0, e), t.plotHeight) }
        var r = Flotr.DOM,
            i = Flotr.EventAdapter,
            s = Flotr._;
        Flotr.addPlugin("selection", {
            options: { pinchOnly: null, mode: null, color: "#B6D9FF", fps: 20 },
            callbacks: {
                "flotr:mouseup": function(e) {
                    var t = this.options.selection,
                        n = this.selection,
                        r = this.getEventPosition(e);
                    if (!t || !t.mode) return;
                    n.interval && clearInterval(n.interval), this.multitouches ? n.updateSelection() : t.pinchOnly || n.setSelectionPos(n.selection.second, r), n.clearSelection(), n.selecting && n.selectionIsSane() && (n.drawSelection(), n.fireSelectEvent(), this.ignoreClick = !0)
                },
                "flotr:mousedown": function(t) {
                    var n = this.options.selection,
                        r = this.selection,
                        i = this.getEventPosition(t);
                    if (!n || !n.mode) return;
                    if (!n.mode || !e(t) && s.isUndefined(t.touches)) return;
                    n.pinchOnly || r.setSelectionPos(r.selection.first, i), r.interval && clearInterval(r.interval), this.lastMousePos.pageX = null, r.selecting = !1, r.interval = setInterval(s.bind(r.updateSelection, this), 1e3 / n.fps)
                },
                "flotr:destroy": function(e) { clearInterval(this.selection.interval) }
            },
            getArea: function() {
                var e = this.selection.selection,
                    t = this.axes,
                    n = e.first,
                    r = e.second,
                    i, s, o, u;
                return i = t.x.p2d(e.first.x), s = t.x.p2d(e.second.x), o = t.y.p2d(e.first.y), u = t.y.p2d(e.second.y), { x1: Math.min(i, s), y1: Math.min(o, u), x2: Math.max(i, s), y2: Math.max(o, u), xfirst: i, xsecond: s, yfirst: o, ysecond: u }
            },
            selection: { first: { x: -1, y: -1 }, second: { x: -1, y: -1 } },
            prevSelection: null,
            interval: null,
            fireSelectEvent: function(e) {
                var t = this.selection.getArea();
                e = e || "select", t.selection = this.selection.selection, i.fire(this.el, "flotr:" + e, [t, this])
            },
            setSelection: function(e, r) {
                var i = this.options,
                    s = this.axes.x,
                    o = this.axes.y,
                    u = o.scale,
                    a = s.scale,
                    f = i.selection.mode.indexOf("x") != -1,
                    l = i.selection.mode.indexOf("y") != -1,
                    c = this.selection.selection;
                this.selection.clearSelection(), c.first.y = n(f && !l ? 0 : (o.max - e.y1) * u, this), c.second.y = n(f && !l ? this.plotHeight - 1 : (o.max - e.y2) * u, this), c.first.x = t(l && !f ? 0 : (e.x1 - s.min) * a, this), c.second.x = t(l && !f ? this.plotWidth : (e.x2 - s.min) * a, this), this.selection.drawSelection(), r || this.selection.fireSelectEvent()
            },
            setSelectionPos: function(e, r) {
                var i = this.options.selection.mode,
                    s = this.selection.selection;
                i.indexOf("x") == -1 ? e.x = e == s.first ? 0 : this.plotWidth : e.x = t(r.relX, this), i.indexOf("y") == -1 ? e.y = e == s.first ? 0 : this.plotHeight - 1 : e.y = n(r.relY, this)
            },
            drawSelection: function() {
                this.selection.fireSelectEvent("selecting");
                var e = this.selection.selection,
                    t = this.octx,
                    n = this.options,
                    r = this.plotOffset,
                    i = this.selection.prevSelection;
                if (i && e.first.x == i.first.x && e.first.y == i.first.y && e.second.x == i.second.x && e.second.y == i.second.y) return;
                t.save(), t.strokeStyle = this.processColor(n.selection.color, { opacity: .8 }), t.lineWidth = 1, t.lineJoin = "miter", t.fillStyle = this.processColor(n.selection.color, { opacity: .4 }), this.selection.prevSelection = { first: { x: e.first.x, y: e.first.y }, second: { x: e.second.x, y: e.second.y } };
                var s = Math.min(e.first.x, e.second.x),
                    o = Math.min(e.first.y, e.second.y),
                    u = Math.abs(e.second.x - e.first.x),
                    a = Math.abs(e.second.y - e.first.y);
                t.fillRect(s + r.left + .5, o + r.top + .5, u, a), t.strokeRect(s + r.left + .5, o + r.top + .5, u, a), t.restore()
            },
            updateSelection: function() {
                if (!this.lastMousePos.pageX) return;
                this.selection.selecting = !0;
                if (this.multitouches) this.selection.setSelectionPos(this.selection.selection.first, this.getEventPosition(this.multitouches[0])), this.selection.setSelectionPos(this.selection.selection.second, this.getEventPosition(this.multitouches[1]));
                else {
                    if (this.options.selection.pinchOnly) return;
                    this.selection.setSelectionPos(this.selection.selection.second, this.lastMousePos)
                }
                this.selection.clearSelection(), this.selection.selectionIsSane() && this.selection.drawSelection()
            },
            clearSelection: function() {
                if (!this.selection.prevSelection) return;
                var e = this.selection.prevSelection,
                    t = 1,
                    n = this.plotOffset,
                    r = Math.min(e.first.x, e.second.x),
                    i = Math.min(e.first.y, e.second.y),
                    s = Math.abs(e.second.x - e.first.x),
                    o = Math.abs(e.second.y - e.first.y);
                this.octx.clearRect(r + n.left - t + .5, i + n.top - t, s + 2 * t + .5, o + 2 * t + .5), this.selection.prevSelection = null
            },
            selectionIsSane: function() { var e = this.selection.selection; return Math.abs(e.second.x - e.first.x) >= 5 || Math.abs(e.second.y - e.first.y) >= 5 }
        })
    }(),
    function() {
        var e = Flotr.DOM;
        Flotr.addPlugin("labels", {
            callbacks: { "flotr:afterdraw": function() { this.labels.draw() } },
            draw: function() {
                function b(e, t, r) {
                    var i = r ? t.minorTicks : t.ticks,
                        s = t.orientation === 1,
                        u = t.n === 1,
                        l, h;
                    l = { color: t.options.color || d.grid.color, angle: Flotr.toRad(t.options.labelsAngle), textBaseline: "middle" };
                    for (c = 0; c < i.length && (r ? t.options.showMinorLabels : t.options.showLabels); ++c) {
                        n = i[c], n.label += "";
                        if (!n.label || !n.label.length) continue;
                        x = Math.cos(c * a + f) * o, y = Math.sin(c * a + f) * o, l.textAlign = s ? Math.abs(x) < .1 ? "center" : x < 0 ? "right" : "left" : "left", Flotr.drawText(v, n.label, s ? x : 3, s ? y : -(t.ticks[c].v / t.max) * (o - d.fontSize), l)
                    }
                }

                function w(e, t, r, i) {
                    function f(e) { return e.options.showLabels && e.used }

                    function l(e, t, n, r) { return e.plotOffset.left + (t ? r : n ? -d.grid.labelMargin : d.grid.labelMargin + e.plotWidth) }

                    function h(e, t, n, r) { return e.plotOffset.top + (t ? d.grid.labelMargin : r) + (t && n ? e.plotHeight : 0) }
                    var s = t.orientation === 1,
                        o = t.n === 1,
                        u, a;
                    u = { color: t.options.color || d.grid.color, textAlign: r, textBaseline: i, angle: Flotr.toRad(t.options.labelsAngle) }, u = Flotr.getBestTextAlign(u.angle, u);
                    for (c = 0; c < t.ticks.length && f(t); ++c) {
                        n = t.ticks[c];
                        if (!n.label || !n.label.length) continue;
                        a = t.d2p(n.v);
                        if (a < 0 || a > (s ? e.plotWidth : e.plotHeight)) continue;
                        Flotr.drawText(v, n.label, l(e, s, o, a), h(e, s, o, a), u), !s && !o && (v.save(), v.strokeStyle = u.color, v.beginPath(), v.moveTo(e.plotOffset.left + e.plotWidth - 8, e.plotOffset.top + t.d2p(n.v)), v.lineTo(e.plotOffset.left + e.plotWidth, e.plotOffset.top + t.d2p(n.v)), v.stroke(), v.restore())
                    }
                }

                function E(e, t) {
                    var r = t.orientation === 1,
                        i = t.n === 1,
                        o = "",
                        u, a, f, l = e.plotOffset;
                    !r && !i && (v.save(), v.strokeStyle = t.options.color || d.grid.color, v.beginPath());
                    if (t.options.showLabels && (i ? !0 : t.used))
                        for (c = 0; c < t.ticks.length; ++c) {
                            n = t.ticks[c];
                            if (!n.label || !n.label.length || (r ? l.left : l.top) + t.d2p(n.v) < 0 || (r ? l.left : l.top) + t.d2p(n.v) > (r ? e.canvasWidth : e.canvasHeight)) continue;
                            f = l.top + (r ? (i ? 1 : -1) * (e.plotHeight + d.grid.labelMargin) : t.d2p(n.v) - t.maxLabel.height / 2), u = r ? l.left + t.d2p(n.v) - s / 2 : 0, o = "", c === 0 ? o = " first" : c === t.ticks.length - 1 && (o = " last"), o += r ? " flotr-grid-label-x" : " flotr-grid-label-y", h += ['<div style="position:absolute; text-align:' + (r ? "center" : "right") + "; ", "top:" + f + "px; ", (!r && !i ? "right:" : "left:") + u + "px; ", "width:" + (r ? s : (i ? l.left : l.right) - d.grid.labelMargin) + "px; ", t.options.color ? "color:" + t.options.color + "; " : " ", '" class="flotr-grid-label' + o + '">' + n.label + "</div>"].join(" "), !r && !i && (v.moveTo(l.left + e.plotWidth - 8, l.top + t.d2p(n.v)), v.lineTo(l.left + e.plotWidth, l.top + t.d2p(n.v)))
                        }
                }
                var t, n, r, i, s, o, u, a, f, l, c, h = "",
                    p = 0,
                    d = this.options,
                    v = this.ctx,
                    m = this.axes,
                    g = { size: d.fontSize };
                for (c = 0; c < m.x.ticks.length; ++c) m.x.ticks[c].label && ++p;
                s = this.plotWidth / p, d.grid.circular && (v.save(), v.translate(this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + this.plotHeight / 2), o = this.plotHeight * d.radar.radiusRatio / 2 + d.fontSize, u = this.axes.x.ticks.length, a = 2 * (Math.PI / u), f = -Math.PI / 2, b(this, m.x, !1), b(this, m.x, !0), b(this, m.y, !1), b(this, m.y, !0), v.restore()), !d.HtmlText && this.textEnabled ? (w(this, m.x, "center", "top"), w(this, m.x2, "center", "bottom"), w(this, m.y, "right", "middle"), w(this, m.y2, "left", "middle")) : (m.x.options.showLabels || m.x2.options.showLabels || m.y.options.showLabels || m.y2.options.showLabels) && !d.grid.circular && (h = "", E(this, m.x), E(this, m.x2), E(this, m.y), E(this, m.y2), v.stroke(), v.restore(), l = e.create("div"), e.setStyles(l, { fontSize: "smaller", color: d.grid.color }), l.className = "flotr-labels", e.insert(this.el, l), e.insert(l, h))
            }
        })
    }(),
    function() {
        var e = Flotr.DOM,
            t = Flotr._;
        Flotr.addPlugin("legend", {
            options: { show: !0, noColumns: 1, labelFormatter: function(e) { return e }, labelBoxBorderColor: "#CCCCCC", labelBoxWidth: 14, labelBoxHeight: 10, labelBoxMargin: 5, container: null, position: "nw", margin: 5, backgroundColor: "#F0F0F0", backgroundOpacity: .85 },
            callbacks: {
                "flotr:afterinit": function() { this.legend.insertLegend() },
                "flotr:destroy": function() {
                    var t = this.legend.markup;
                    t && (this.legend.markup = null, e.remove(t))
                }
            },
            insertLegend: function() {
                if (!this.options.legend.show) return;
                var n = this.series,
                    r = this.plotOffset,
                    i = this.options,
                    s = i.legend,
                    o = [],
                    u = !1,
                    a = this.ctx,
                    f = t.filter(n, function(e) { return e.label && !e.hide }).length,
                    l = s.position,
                    c = s.margin,
                    h = s.backgroundOpacity,
                    p, d, v;
                if (f) {
                    var m = s.labelBoxWidth,
                        g = s.labelBoxHeight,
                        y = s.labelBoxMargin,
                        b = r.left + c,
                        w = r.top + c,
                        E = 0,
                        S = { size: i.fontSize * 1.1, color: i.grid.color };
                    for (p = n.length - 1; p > -1; --p) {
                        if (!n[p].label || n[p].hide) continue;
                        d = s.labelFormatter(n[p].label), E = Math.max(E, this._text.measureText(d, S).width)
                    }
                    var x = Math.round(m + y * 3 + E),
                        T = Math.round(f * (y + g) + y);
                    !h && h !== 0 && (h = .1);
                    if (!i.HtmlText && this.textEnabled && !s.container) {
                        l.charAt(0) == "s" && (w = r.top + this.plotHeight - (c + T)), l.charAt(0) == "c" && (w = r.top + this.plotHeight / 2 - (c + T / 2)), l.charAt(1) == "e" && (b = r.left + this.plotWidth - (c + x)), v = this.processColor(s.backgroundColor, { opacity: h }), a.fillStyle = v, a.fillRect(b, w, x, T), a.strokeStyle = s.labelBoxBorderColor, a.strokeRect(Flotr.toPixel(b), Flotr.toPixel(w), x, T);
                        var N = b + y,
                            C = w + y;
                        for (p = 0; p < n.length; p++) {
                            if (!n[p].label || n[p].hide) continue;
                            d = s.labelFormatter(n[p].label), a.fillStyle = n[p].color, a.fillRect(N, C, m - 1, g - 1), a.strokeStyle = s.labelBoxBorderColor, a.lineWidth = 1, a.strokeRect(Math.ceil(N) - 1.5, Math.ceil(C) - 1.5, m + 2, g + 2), Flotr.drawText(a, d, N + m + y, C + g, S), C += g + y
                        }
                    } else {
                        for (p = 0; p < n.length; ++p) {
                            if (!n[p].label || n[p].hide) continue;
                            p % s.noColumns === 0 && (o.push(u ? "</tr><tr>" : "<tr>"), u = !0);
                            var k = n[p],
                                L = s.labelBoxWidth,
                                A = s.labelBoxHeight;
                            d = s.labelFormatter(k.label), v = "background-color:" + (k.bars && k.bars.show && k.bars.fillColor && k.bars.fill ? k.bars.fillColor : k.color) + ";", o.push('<td class="flotr-legend-color-box">', '<div style="border:1px solid ', s.labelBoxBorderColor, ';padding:1px">', '<div style="width:', L - 1, "px;height:", A - 1, "px;border:1px solid ", n[p].color, '">', '<div style="width:', L, "px;height:", A, "px;", v, '"></div>', "</div>", "</div>", "</td>", '<td class="flotr-legend-label">', d, "</td>")
                        }
                        u && o.push("</tr>");
                        if (o.length > 0) {
                            var O = '<table style="font-size:smaller;color:' + i.grid.color + '">' + o.join("") + "</table>";
                            if (s.container) O = e.node(O), this.legend.markup = O, e.insert(s.container, O);
                            else {
                                var M = { position: "absolute", zIndex: "2", border: "1px solid " + s.labelBoxBorderColor };
                                l.charAt(0) == "n" ? (M.top = c + r.top + "px", M.bottom = "auto") : l.charAt(0) == "c" ? (M.top = c + (this.plotHeight - T) / 2 + "px", M.bottom = "auto") : l.charAt(0) == "s" && (M.bottom = c + r.bottom + "px", M.top = "auto"), l.charAt(1) == "e" ? (M.right = c + r.right + "px", M.left = "auto") : l.charAt(1) == "w" && (M.left = c + r.left + "px", M.right = "auto");
                                var P = e.create("div"),
                                    H;
                                P.className = "flotr-legend", e.setStyles(P, M), e.insert(P, O), e.insert(this.el, P);
                                if (!h) return;
                                var B = s.backgroundColor || i.grid.backgroundColor || "#ffffff";
                                t.extend(M, e.size(P), { backgroundColor: B, zIndex: "", border: "" }), M.width += "px", M.height += "px", P = e.create("div"), P.className = "flotr-legend-bg", e.setStyles(P, M), e.opacity(P, h), e.insert(P, " "), e.insert(this.el, P)
                            }
                        }
                    }
                }
            }
        })
    }(),
    function() {
        function e(e) { if (this.options.spreadsheet.tickFormatter) return this.options.spreadsheet.tickFormatter(e); var t = n.find(this.axes.x.ticks, function(t) { return t.v == e }); return t ? t.label : e }
        var t = Flotr.DOM,
            n = Flotr._;
        Flotr.addPlugin("spreadsheet", {
            options: { show: !1, tabGraphLabel: "Graph", tabDataLabel: "Data", toolbarDownload: "Download CSV", toolbarSelectAll: "Select all", csvFileSeparator: ",", decimalSeparator: ".", tickFormatter: null, initialTab: "graph" },
            callbacks: {
                "flotr:afterconstruct": function() {
                    if (!this.options.spreadsheet.show) return;
                    var e = this.spreadsheet,
                        n = t.node('<div class="flotr-tabs-group" style="position:absolute;left:0px;width:' + this.canvasWidth + 'px"></div>'),
                        r = t.node('<div style="float:left" class="flotr-tab selected">' + this.options.spreadsheet.tabGraphLabel + "</div>"),
                        i = t.node('<div style="float:left" class="flotr-tab">' + this.options.spreadsheet.tabDataLabel + "</div>"),
                        s;
                    e.tabsContainer = n, e.tabs = { graph: r, data: i }, t.insert(n, r), t.insert(n, i), t.insert(this.el, n), s = t.size(i).height + 2, this.plotOffset.bottom += s, t.setStyles(n, { top: this.canvasHeight - s + "px" }), this.observe(r, "click", function() { e.showTab("graph") }).observe(i, "click", function() { e.showTab("data") }), this.options.spreadsheet.initialTab !== "graph" && e.showTab(this.options.spreadsheet.initialTab)
                }
            },
            loadDataGrid: function() {
                if (this.seriesData) return this.seriesData;
                var e = this.series,
                    t = {};
                return n.each(e, function(e, r) {
                    n.each(e.data, function(e) {
                        var n = e[0],
                            s = e[1],
                            o = t[n];
                        if (o) o[r + 1] = s;
                        else {
                            var u = [];
                            u[0] = n, u[r + 1] = s, t[n] = u
                        }
                    })
                }), this.seriesData = n.sortBy(t, function(e, t) { return parseInt(t, 10) }), this.seriesData
            },
            constructDataGrid: function() {
                if (this.spreadsheet.datagrid) return this.spreadsheet.datagrid;
                var r = this.series,
                    i = this.spreadsheet.loadDataGrid(),
                    s = ["<colgroup><col />"],
                    o, u, a, f = ['<table class="flotr-datagrid"><tr class="first-row">'];
                f.push("<th>&nbsp;</th>"), n.each(r, function(e, t) { f.push('<th scope="col">' + (e.label || String.fromCharCode(65 + t)) + "</th>"), s.push("<col />") }), f.push("</tr>"), n.each(i, function(t) {
                    f.push("<tr>"), n.times(r.length + 1, function(r) {
                        var i = "td",
                            s = t[r],
                            o = n.isUndefined(s) ? "" : Math.round(s * 1e5) / 1e5;
                        if (r === 0) {
                            i = "th";
                            var u = e.call(this, o);
                            u && (o = u)
                        }
                        f.push("<" + i + (i == "th" ? ' scope="row"' : "") + ">" + o + "</" + i + ">")
                    }, this), f.push("</tr>")
                }, this), s.push("</colgroup>"), a = t.node(f.join("")), o = t.node('<button type="button" class="flotr-datagrid-toolbar-button">' + this.options.spreadsheet.toolbarDownload + "</button>"), u = t.node('<button type="button" class="flotr-datagrid-toolbar-button">' + this.options.spreadsheet.toolbarSelectAll + "</button>"), this.observe(o, "click", n.bind(this.spreadsheet.downloadCSV, this)).observe(u, "click", n.bind(this.spreadsheet.selectAllData, this));
                var l = t.node('<div class="flotr-datagrid-toolbar"></div>');
                t.insert(l, o), t.insert(l, u);
                var c = this.canvasHeight - t.size(this.spreadsheet.tabsContainer).height - 2,
                    h = t.node('<div class="flotr-datagrid-container" style="position:absolute;left:0px;top:0px;width:' + this.canvasWidth + "px;height:" + c + 'px;overflow:auto;z-index:10"></div>');
                return t.insert(h, l), t.insert(h, a), t.insert(this.el, h), this.spreadsheet.datagrid = a, this.spreadsheet.container = h, a
            },
            showTab: function(e) {
                if (this.spreadsheet.activeTab === e) return;
                switch (e) {
                    case "graph":
                        t.hide(this.spreadsheet.container), t.removeClass(this.spreadsheet.tabs.data, "selected"), t.addClass(this.spreadsheet.tabs.graph, "selected");
                        break;
                    case "data":
                        this.spreadsheet.datagrid || this.spreadsheet.constructDataGrid(), t.show(this.spreadsheet.container), t.addClass(this.spreadsheet.tabs.data, "selected"), t.removeClass(this.spreadsheet.tabs.graph, "selected");
                        break;
                    default:
                        throw "Illegal tab name: " + e
                }
                this.spreadsheet.activeTab = e
            },
            selectAllData: function() {
                if (this.spreadsheet.tabs) {
                    var e, t, n, r, i = this.spreadsheet.constructDataGrid();
                    return this.spreadsheet.showTab("data"), setTimeout(function() {
                        (n = i.ownerDocument) && (r = n.defaultView) && r.getSelection && n.createRange && (e = window.getSelection()) && e.removeAllRanges ? (t = n.createRange(), t.selectNode(i), e.removeAllRanges(), e.addRange(t)) : document.body && document.body.createTextRange && (t = document.body.createTextRange()) && (t.moveToElementText(i), t.select())
                    }, 0), !0
                }
                return !1
            },
            downloadCSV: function() {
                var t = "",
                    r = this.series,
                    i = this.options,
                    s = this.spreadsheet.loadDataGrid(),
                    o = encodeURIComponent(i.spreadsheet.csvFileSeparator);
                if (i.spreadsheet.decimalSeparator === i.spreadsheet.csvFileSeparator) throw "The decimal separator is the same as the column separator (" + i.spreadsheet.decimalSeparator + ")";
                n.each(r, function(e, n) { t += o + '"' + (e.label || String.fromCharCode(65 + n)).replace(/\"/g, '\\"') + '"' }), t += "%0D%0A", t += n.reduce(s, function(t, n) {
                    var r = e.call(this, n[0]) || "";
                    r = '"' + (r + "").replace(/\"/g, '\\"') + '"';
                    var s = n.slice(1).join(o);
                    return i.spreadsheet.decimalSeparator !== "." && (s = s.replace(/\./g, i.spreadsheet.decimalSeparator)), t + r + o + s + "%0D%0A"
                }, "", this), Flotr.isIE && Flotr.isIE < 9 ? (t = t.replace(new RegExp(o, "g"), decodeURIComponent(o)).replace(/%0A/g, "\n").replace(/%0D/g, "\r"), window.open().document.write(t)) : window.open("data:text/csv," + t)
            }
        })
    }(),
    function() {
        var e = Flotr.DOM;
        Flotr.addPlugin("titles", {
            callbacks: { "flotr:afterdraw": function() { this.titles.drawTitles() } },
            drawTitles: function() {
                var t, n = this.options,
                    r = n.grid.labelMargin,
                    i = this.ctx,
                    s = this.axes;
                if (!n.HtmlText && this.textEnabled) {
                    var o = { size: n.fontSize, color: n.grid.color, textAlign: "center" };
                    n.subtitle && Flotr.drawText(i, n.subtitle, this.plotOffset.left + this.plotWidth / 2, this.titleHeight + this.subtitleHeight - 2, o), o.weight = 1.5, o.size *= 1.5, n.title && Flotr.drawText(i, n.title, this.plotOffset.left + this.plotWidth / 2, this.titleHeight - 2, o), o.weight = 1.8, o.size *= .8, s.x.options.title && s.x.used && (o.textAlign = s.x.options.titleAlign || "center", o.textBaseline = "top", o.angle = Flotr.toRad(s.x.options.titleAngle), o = Flotr.getBestTextAlign(o.angle, o), Flotr.drawText(i, s.x.options.title, this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top + s.x.maxLabel.height + this.plotHeight + 2 * r, o)), s.x2.options.title && s.x2.used && (o.textAlign = s.x2.options.titleAlign || "center", o.textBaseline = "bottom", o.angle = Flotr.toRad(s.x2.options.titleAngle), o = Flotr.getBestTextAlign(o.angle, o), Flotr.drawText(i, s.x2.options.title, this.plotOffset.left + this.plotWidth / 2, this.plotOffset.top - s.x2.maxLabel.height - 2 * r, o)), s.y.options.title && s.y.used && (o.textAlign = s.y.options.titleAlign || "right", o.textBaseline = "middle", o.angle = Flotr.toRad(s.y.options.titleAngle), o = Flotr.getBestTextAlign(o.angle, o), Flotr.drawText(i, s.y.options.title, this.plotOffset.left - s.y.maxLabel.width - 2 * r, this.plotOffset.top + this.plotHeight / 2, o)), s.y2.options.title && s.y2.used && (o.textAlign = s.y2.options.titleAlign || "left", o.textBaseline = "middle", o.angle = Flotr.toRad(s.y2.options.titleAngle), o = Flotr.getBestTextAlign(o.angle, o), Flotr.drawText(i, s.y2.options.title, this.plotOffset.left + this.plotWidth + s.y2.maxLabel.width + 2 * r, this.plotOffset.top + this.plotHeight / 2, o))
                } else {
                    t = [], n.title && t.push('<div style="position:absolute;top:0;left:', this.plotOffset.left, "px;font-size:1em;font-weight:bold;text-align:center;width:", this.plotWidth, 'px;" class="flotr-title">', n.title, "</div>"), n.subtitle && t.push('<div style="position:absolute;top:', this.titleHeight, "px;left:", this.plotOffset.left, "px;font-size:smaller;text-align:center;width:", this.plotWidth, 'px;" class="flotr-subtitle">', n.subtitle, "</div>"), t.push("</div>"), t.push('<div class="flotr-axis-title" style="font-weight:bold;">'), s.x.options.title && s.x.used && t.push('<div style="position:absolute;top:', this.plotOffset.top + this.plotHeight + n.grid.labelMargin + s.x.titleSize.height, "px;left:", this.plotOffset.left, "px;width:", this.plotWidth, "px;text-align:", s.x.options.titleAlign, ';" class="flotr-axis-title flotr-axis-title-x1">', s.x.options.title, "</div>"), s.x2.options.title && s.x2.used && t.push('<div style="position:absolute;top:0;left:', this.plotOffset.left, "px;width:", this.plotWidth, "px;text-align:", s.x2.options.titleAlign, ';" class="flotr-axis-title flotr-axis-title-x2">', s.x2.options.title, "</div>"), s.y.options.title && s.y.used && t.push('<div style="position:absolute;top:', this.plotOffset.top + this.plotHeight / 2 - s.y.titleSize.height / 2, "px;left:0;text-align:", s.y.options.titleAlign, ';" class="flotr-axis-title flotr-axis-title-y1">', s.y.options.title, "</div>"), s.y2.options.title && s.y2.used && t.push('<div style="position:absolute;top:', this.plotOffset.top + this.plotHeight / 2 - s.y.titleSize.height / 2, "px;right:0;text-align:", s.y2.options.titleAlign, ';" class="flotr-axis-title flotr-axis-title-y2">', s.y2.options.title, "</div>"), t = t.join("");
                    var u = e.create("div");
                    e.setStyles({ color: n.grid.color }), u.className = "flotr-titles", e.insert(this.el, u), e.insert(u, t)
                }
            }
        })
    }();