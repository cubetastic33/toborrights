!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},o=n.parcelRequire94c2;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in i){var n=i[e];delete i[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){i[e]=n},n.parcelRequire94c2=o);var u=o("buE07"),r=o("acYek"),l=document.getElementById("toast");function s(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3;l.innerText=e,l.style.display="fixed",setTimeout((function(){return l.className="slide-down"}),n),setTimeout((function(){l.className="",l.style.display="none"}),n+500)}var c=u.createClient("https://gwcnruxqmtukvguyhuga.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4"),a=c.auth.user();null===a&&(location.href="/"),e(r)(".netid").text(a.email.slice(0,-13).toUpperCase()),e(r)("#sign-out").on("click",(function(){return c.auth.signOut().then((function(e){s("Signed out successfully"),location.href="/"})).catch((function(e){return s(e.response.text)}))}))}();
//# sourceMappingURL=order.55514302.js.map