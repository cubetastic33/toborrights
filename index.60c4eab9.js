function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},r=t.parcelRequire94c2;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},t.parcelRequire94c2=r);var s=r("7JJcr"),i=r("gOFYb");const o=s.createClient("https://gwcnruxqmtukvguyhuga.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4"),d=e(i)("#toast"),l=e(i)("#status"),c=e(i)("#signed-out"),u=e(i)("#restaurants"),h=e(i)("#order-details"),m=e(i)("#sign-in"),f=e(i)("#my-orders"),p=e(i)("#order-list");function g(e,t=2e3){d.text(e).show(),setTimeout((()=>d.addClass("slide-down")),t),setTimeout((()=>d.removeClass("slide-down").hide()),t+500)}function b(){let t=o.auth.user();null===t?(l.hide(),c.show(),h.hide(),f.hide(),u.show().removeClass("fade")):(c.hide(),e(i)(".netid").text(t.email.slice(0,-13).toUpperCase()),l.show(),v())}function v(){o.from("orders").select("id, time_slot, restaurants (name), delivery_location, description, fulfilled, notes, cost").filter("cancelled","eq","false").order("created_at",{ascending:!1}).then((t=>{if(t.error&&g(t.error.message,5e3),0!==t.data.length){f.show(),p.empty();for(let a=0;a<t.data.length;a++){let n=e(i)(`<div class="order">\n                    <b>Timeslot:</b> ${t.data[a].time_slot}<br>\n                    <b>Restaurant:</b> ${t.data[a].restaurants.name}<br>\n                    <b>Description:</b> ${t.data[a].description}<br>\n                    <b>Delivery Location:</b> ${t.data[a].delivery_location}<br>\n                    <b>Donation:</b> ${t.data[a].cost}\n                </div>`);t.data[a].notes&&n.append(`<b>Phone:</b> ${t.data[a].notes}`),t.data[a].fulfilled?n.append('<span class="top-right">Fulfilled</span>'):n.append(`<span class="top-right">\n                        <button class="text cancel" data-id="${t.data[a].id}">cancel</button>\n                    </span>`),p.append(n)}e(i)(".cancel").off().on("click",(function(){o.from("orders").update({cancelled:!0}).match({id:e(i)(this).data("id")}).then((e=>{e.error?g(e.error.message):g("Cancelled order")}))}))}else f.hide()}),(e=>g(e,5e3)))}b(),o.auth.onAuthStateChange(b),o.from("orders").on("*",(e=>{console.log("Change received!",e),v()})).subscribe(),e(i)("#sign-out").on("click",(()=>o.auth.signOut().then((e=>{g("Signed out successfully")})).catch((e=>g(e.response.text))))),o.from("restaurants").select().then((t=>{if(t.error)g(t.error.message,5e3);else if(0===t.data.length)g("No restaurants were found",5e3);else{for(let e=0;e<t.data.length;e++){const{error:a,publicURL:n}=o.storage.from("restaurant-images").getPublicUrl(t.data[e].image);if(a)return void g(a.message,5e3);let r=t.data[e].id,s=t.data[e].name,i=t.data[e].menu;u.append(`<div class="restaurant"\n                    data-id="${r}" data-name="${s}" data-menu="${i}"\n                    style="background-image: url('${n}')">\n                        <h1>${s}</h1>\n                    </div>`)}e(i)(".restaurant").on("click",(function(){let t=e(i)(this).data("name");"undefined"!=typeof pa&&pa.track({name:t}),u.addClass("fade"),setTimeout((()=>{u.hide(),o.auth.user()?(h.data("id",e(i)(this).data("id")).show(),e(i)(this).data("menu")?(e(i)("#order-details .menu a").attr("href",e(i)(this).data("menu")),e(i)("#order-details .menu span").css("display","inline")):e(i)("#order-details .menu span").hide(),e(i)("#order-details .name").text(t)):m.show()}),100)}))}}),(e=>g(e,5e3))),m.on("submit",(t=>{t.preventDefault();const a=e(i)("#netid").val()+"@utdallas.edu";o.auth.signIn({email:a}).then((t=>{t.error?g(t.error.message,5e3):e(i)("body").html(`<div id="check-email">Check ${a} for a magic link to login</div>`)})).catch((e=>g(e.response.text)))})),e(i)(".back").on("click",(()=>{m.hide(),h.hide(),u.show().removeClass("fade")})),h.on("submit",(t=>{t.preventDefault();const a=e(i)("#phone").val(),n=e(i)("#identifier").val();o.from("orders").insert({time_slot:e(i)("#time-slot").val(),customer:o.auth.user().id,restaurant:h.data("id"),delivery_location:e(i)("#location").val(),description:e(i)("#description").val(),identifier:n.length?n:null,notes:a.length?a:null,cost:e(i)("#donation").val()}).then((t=>{t.error?g(t.error.message,5e3):(g("Order placed successfully!"),e(i)("form").trigger("reset"),h.hide(),u.show().removeClass("fade"))}),(e=>g(e,5e3)))}));
//# sourceMappingURL=index.60c4eab9.js.map