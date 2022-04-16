import { createClient } from "@supabase/supabase-js";
import $ from "cash-dom";
import { show_toast } from "./main";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://gwcnruxqmtukvguyhuga.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4");

// If the user is signed out
const user = supabase.auth.user();
if (user === null) location.href = "index.html";
$(".netid").text(user.email.slice(0, -13).toUpperCase());

$("#sign-out").on("click", () => supabase.auth.signOut()
    .then(_response => {
        show_toast("Signed out successfully");
        location.href = "/";
    })
    .catch(err => show_toast(err.response.text)));

// Dynamically populate the list of restaurants from the database
supabase
    .from("restaurants")
    .select()
    .then(result => {
        if (result.error) {
            show_toast(result.error.message, 5000);
        } else if (result.data.length === 0) {
            show_toast("No restaurants were found", 5000);
        } else {
            for (let i = 0; i < result.data.length; i++) {
                const { error, publicURL } = supabase.storage.from("restaurant-images").getPublicUrl(result.data[i]["image"]);
                if (error) {
                    show_toast(error.message, 5000);
                    return;
                }
                let id = result.data[i]["id"];
                let name = result.data[i]["name"];
                $(".restaurants").append(`<div class="restaurant"
                    data-id="${id}" data-name="${name}"
                    style="background-image: url('${publicURL}')">
                        <h1>${name}</h1>
                    </div>`);
            }
            $(".restaurant").on("click", function() {
                $(".restaurants").hide();
                $("#order-details").data("id", $(this).data("id")).show();
                $("#order-details .name").text($(this).data("name"));
            });
        }
    }, error => show_toast(error, 5000));

$("#back").on("click", () => {
    $("#order-details").hide();
    $(".restaurants").show();
});

$("#order-details").on("submit", e => {
    e.preventDefault();
    console.log($("#description").val());
});
