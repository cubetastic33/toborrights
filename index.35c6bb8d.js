!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},o=n.parcelRequire94c2;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in i){var n=i[e];delete i[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){i[e]=n},n.parcelRequire94c2=o);var r=o("buE07"),a=o("acYek"),u=r.createClient("https://gwcnruxqmtukvguyhuga.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4"),l=e(a)("#toast"),d=e(a)(".signed-in");function s(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3;l.text(e).show(),setTimeout((function(){return l.addClass("slide-down")}),n),setTimeout((function(){return l.removeClass("slide-down").hide()}),n+500)}function c(){var n=u.auth.user();null!==n?(d.show(),e(a)(".netid").text(n.email.slice(0,-13).toUpperCase())):d.hide()}c(),u.auth.onAuthStateChange((function(e,n){"SIGNED_IN"===e&&"block"!==d.css("display")&&(location.href="order.html"),c()})),e(a)("form").on("submit",(function(n){n.preventDefault();var t=e(a)("#netid").val()+"@utdallas.edu";u.auth.signIn({email:t}).then((function(n){n.error?s(n.error.message,5e3):e(a)("body").html('<div id="check-email">Check '.concat(t," for a magic link to login</div>"))})).catch((function(e){return s(e.response.text)}))}))}();
//# sourceMappingURL=index.35c6bb8d.js.map