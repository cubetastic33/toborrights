function t(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},r={},o=n.parcelRequire94c2;null==o&&((o=function(t){if(t in e)return e[t].exports;if(t in r){var n=r[t];delete r[t];var o={id:t,exports:{}};return e[t]=o,n.call(o.exports,o,o.exports),o.exports}var d=new Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(t,n){r[t]=n},n.parcelRequire94c2=o);var d=o("7JJcr"),a=o("gOFYb");const i=d.createClient("https://gwcnruxqmtukvguyhuga.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4");const s=[function(){i.from("donation_report").select("total, count, average, standard_deviation").limit(1).throwOnError().single().then((({data:n})=>{t(a)("#donation-report").append(t(a)(`<table>\n  <thead>\n  <h2>Donation Report</h2>\n  </thead>\n  <tr>\n    <td>Total</td>\n    <td>${n.total}</td>\n  </tr>\n  <tr>\n    <td>Orders</td>\n    <td>${n.count}</td>\n  </tr>\n  <tr>\n    <td>Average</td>\n    <td>${n.average}</td>\n  </tr>\n  <tr>\n    <td>Standard Deviation</td>\n    <td>${n.standard_deviation}</td>\n  </tr>\n</table>\n      `))}))},function(){i.from("time_slot_load").select("time_slot, count").throwOnError().then((({data:n})=>{const e=t(a)("<table></table>");e.append(t(a)("<thead><h2>Time Slot Load Report</h2></thead>"));const r=t(a)("<tbody></tbody>");for(const{time_slot:e,count:o}of n)r.append(t(a)(`\n        <tr>\n        <td>${e}</td>\n        <td>${o}</td>\n        </tr>\n      `));e.append(r),t(a)("#timeslot-load-report").append(e)}))},function(){i.from("restaurant_distribution").select("restaurant, count").throwOnError().then((({data:n})=>{const e=t(a)("<table></table>");e.append(t(a)("<thead><h2>Restaurant Distribution Report</h2></thead>"));const r=t(a)("<tbody></tbody>");for(const{restaurant:e,count:o}of n)r.append(t(a)(`\n        <tr>\n        <td>${e}</td>\n        <td>${o}</td>\n        </tr>\n      `));e.append(r),t(a)("#restaurant-distribution-report").append(e)}))}],l=()=>t(a).each(s,t(a).call);t(a)(document).ready(l),i.from("orders").on("*",l).subscribe();
//# sourceMappingURL=report.1bfb31e3.js.map