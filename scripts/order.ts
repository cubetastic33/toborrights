import { createClient } from "@supabase/supabase-js";
import $ from "cash-dom";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://gwcnruxqmtukvguyhuga.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4");

const $toast = $("#toast");
const $status = $("#status");
const $signed_out = $("#signed-out");
const $restaurants = $("#restaurants");
const $order_details = $("#order-details");
const $sign_in = $("#sign-in");

function show_toast(message: string, duration: number = 2000) {
    $toast.text(message).show();
    // After duration, slide the toast out of view
    setTimeout(() => $toast.addClass("slide-down"), duration);
    setTimeout(() => $toast.removeClass("slide-down").hide(), duration + 500);
}

function update_dom() {
    let user = supabase.auth.user();
    if (user === null) {
        // If the user is signed out
        $status.hide();
        $signed_out.show();
        $order_details.hide();
        $restaurants.show();
    } else {
        // If the user is signed in
        $signed_out.hide();
        $(".netid").text(user.email.slice(0, -13).toUpperCase());
        $status.show();
    }
}

// Run once initially
update_dom();
// Run whenever auth state changes
supabase.auth.onAuthStateChange(update_dom);

$("#sign-out").on("click", () => supabase.auth.signOut()
    .then(_response => {
        show_toast("Signed out successfully");
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
                $restaurants.append(`<div class="restaurant"
                    data-id="${id}" data-name="${name}"
                    style="background-image: url('${publicURL}')">
                        <h1>${name}</h1>
                    </div>`);
            }
            // Add event handlers for all the restaurant buttons
            $(".restaurant").on("click", function() {
                // Replace the list of restaurants with something else, so hide it
                $restaurants.hide();
                if (supabase.auth.user()) {
                    // If the user is signed in, proceed with the order
                    $order_details.data("id", $(this).data("id")).show();
                    $("#order-details .name").text($(this).data("name"));
                } else {
                    // If they're not signed in, make them sign in first
                    $sign_in.show();
                }
            });
        }
    }, error => show_toast(error, 5000));

$sign_in.on("submit", e => {
    e.preventDefault();
    // Sign the user in
    const email: string = $("#netid").val() + "@utdallas.edu";
    supabase.auth.signIn({ email })
        .then(response => {
            if (response.error) {
                show_toast(response.error.message, 5000);
            } else {
                $("body").html(`<div id="check-email">Check ${email} for a magic link to login</div>`);
            }
        })
        .catch(err => show_toast(err.response.text));
});

$("#back").on("click", () => {
    $order_details.hide();
    $restaurants.show();
});

$order_details.on("submit", e => {
    e.preventDefault();
    // Make the order by adding it to the database
    supabase
        .from("orders")
        .insert({
            time_slot: $("#time-slot").val(),
            customer: supabase.auth.user().id,
            restaurant: $order_details.data("id"),
            delivery_location: $("#location").val(),
            description: $("#description").val(),
            cost: $("#delivery-fee").val(),
        })
        .then((result) => {
            if (result.error) {
                show_toast(result.error.message, 5000);
            } else {
                show_toast("Order placed successfully!");
                // Reset forms and show restaurant list
                $("form").trigger("reset");
                $order_details.hide();
                $restaurants.show();
            }
        }, error => show_toast(error, 5000));
});
