!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},r=t.parcelRequire94c2;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},t.parcelRequire94c2=r);var o=r("buE07"),i=r("acYek"),d=o.createClient("https://gwcnruxqmtukvguyhuga.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4"),s=e(i)("#toast"),c=e(i)("#status"),l=e(i)("#signed-out"),u=e(i)("#restaurants"),f=e(i)("#order-details"),h=e(i)("#sign-in"),m=e(i)("#my-orders"),p=e(i)("#order-list");function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2e3;s.text(e).show(),setTimeout((function(){return s.addClass("slide-down")}),t),setTimeout((function(){return s.removeClass("slide-down").hide()}),t+500)}function g(){var t=d.auth.user();null===t?(c.hide(),l.show(),f.hide(),m.hide(),u.show().removeClass("fade")):(l.hide(),e(i)(".netid").text(t.email.slice(0,-13).toUpperCase()),c.show(),b())}function b(){d.from("orders").select("id, time_slot, restaurants (name), delivery_location, description, fulfilled, phone, donation").filter("cancelled","eq","false").order("created_at",{ascending:!1}).then((function(t){if(t.error&&v(t.error.message,5e3),0!==t.data.length){m.show(),p.empty();for(var n=0;n<t.data.length;n++){var a=e(i)('<div class="order">\n                    <b>Timeslot:</b> '.concat(t.data[n].time_slot,"<br>\n                    <b>Restaurant:</b> ").concat(t.data[n].restaurants.name,'<br>\n                    <div class="desc"><b>Description:</b> ').concat(t.data[n].description,"</div><br>\n                    <b>Delivery Location:</b> ").concat(t.data[n].delivery_location,"<br>\n                    <b>Donation:</b> ").concat(t.data[n].donation,"\n                </div>"));t.data[n].phone&&a.append("<b>Phone:</b> ".concat(t.data[n].phone)),t.data[n].fulfilled?a.append('<span class="top-right">Fulfilled</span>'):a.append('<span class="top-right">\n                        <button class="text cancel" data-id="'.concat(t.data[n].id,'">cancel</button>\n                    </span>')),p.append(a)}e(i)(".cancel").off().on("click",(function(){d.from("orders").update({cancelled:!0}).match({id:e(i)(this).data("id")}).then((function(e){e.error?v(e.error.message):v("Cancelled order")}))}))}else m.hide()}),(function(e){return v(e,5e3)}))}g(),d.auth.onAuthStateChange(g),d.from("orders").on("*",(function(e){console.log("Change received!",e),b()})).subscribe(),e(i)("#sign-out").on("click",(function(){return d.auth.signOut().then((function(e){v("Signed out successfully")})).catch((function(e){return v(e.response.text)}))})),d.from("restaurants").select().then((function(t){if(t.error)v(t.error.message,5e3);else if(0===t.data.length)v("No restaurants were found",5e3);else{for(var n=0;n<t.data.length;n++){var a=d.storage.from("restaurant-images").getPublicUrl(t.data[n].image),r=a.error,o=a.publicURL;if(r)return void v(r.message,5e3);var s=t.data[n].id,c=t.data[n].name,l=t.data[n].menu;u.append('<div class="restaurant"\n                    data-id="'.concat(s,'" data-name="').concat(c,'" data-menu="').concat(l,'"\n                    style="background-image: url(\'').concat(o,"')\">\n                        <h1>").concat(c,"</h1>\n                    </div>"))}e(i)(".restaurant").on("click",(function(){var t=this,n=e(i)(this).data("name");"undefined"!=typeof pa&&pa.track({name:n}),u.addClass("fade"),setTimeout((function(){u.hide(),d.auth.user()?(f.data("id",e(i)(t).data("id")).show(),e(i)(t).data("menu")?(e(i)("#order-details .menu a").attr("href",e(i)(t).data("menu")),e(i)("#order-details .menu span").css("display","inline")):e(i)("#order-details .menu span").hide(),e(i)("#order-details .name").text(n)):h.show()}),100)}))}}),(function(e){return v(e,5e3)})),h.on("submit",(function(t){t.preventDefault();var n=e(i)("#netid").val()+"@utdallas.edu";d.auth.signIn({email:n}).then((function(t){t.error?v(t.error.message,5e3):e(i)("body").html('<div id="check-email">Check '.concat(n," for a magic link to login</div>"))})).catch((function(e){return v(e.response.text)}))})),e(i)(".back").on("click",(function(){h.hide(),f.hide(),u.show().removeClass("fade")})),f.on("submit",(function(t){t.preventDefault();var n=e(i)("#phone").val(),a=e(i)("#identifier").val();d.from("orders").insert({time_slot:e(i)("#time-slot").val(),customer:d.auth.user().id,restaurant:f.data("id"),delivery_location:e(i)("#location").val(),description:e(i)("#description").val(),identifier:a.length?a:null,phone:n.length?n:null,donation:e(i)("#donation").val()}).then((function(t){t.error?v(t.error.message,5e3):(v("Order placed successfully!"),e(i)("form").trigger("reset"),f.hide(),u.show().removeClass("fade"))}),(function(e){return v(e,5e3)}))}))}();
//# sourceMappingURL=index.1dbce1d3.js.map