function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},r=t.parcelRequire94c2;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequire94c2=r);var s=r("7JJcr"),i=r("gOFYb");function o(e,t=2e3){const a=document.getElementById("toast");a.innerText=e,a.style.display="block",setTimeout((()=>a.className="slide-down"),t),setTimeout((()=>{a.className="",a.style.display="none"}),t+500)}const l=s.createClient("https://gwcnruxqmtukvguyhuga.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4"),d=l.auth.user();null===d&&(location.href="index.html"),e(i)(".netid").text(d.email.slice(0,-13).toUpperCase()),e(i)("#sign-out").on("click",(()=>l.auth.signOut().then((e=>{o("Signed out successfully"),location.href="/"})).catch((e=>o(e.response.text))))),l.from("restaurants").select().then((t=>{if(t.error)o(t.error.message,5e3);else if(0===t.data.length)o("No restaurants were found",5e3);else{for(let a=0;a<t.data.length;a++){const{error:n,publicURL:r}=l.storage.from("restaurant-images").getPublicUrl(t.data[a].image);if(n)return void o(n.message,5e3);let s=t.data[a].id,d=t.data[a].name;e(i)(".restaurants").append(`<div class="restaurant"\n                    data-id="${s}" data-name="${d}"\n                    style="background-image: url('${r}')">\n                        <h1>${d}</h1>\n                    </div>`)}e(i)(".restaurant").on("click",(function(){e(i)(".restaurants").hide(),e(i)("#order-details").data("id",e(i)(this).data("id")).show(),e(i)("#order-details .name").text(e(i)(this).data("name"))}))}}),(e=>o(e,5e3))),e(i)("#back").on("click",(()=>{e(i)("#order-details").hide(),e(i)(".restaurants").show()})),e(i)("#order-details").on("submit",(t=>{t.preventDefault(),console.log(e(i)("#description").val())}));
//# sourceMappingURL=order.82ddcf28.js.map