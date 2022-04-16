import { createClient } from "@supabase/supabase-js";
import $ from "cash-dom";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://gwcnruxqmtukvguyhuga.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4");

const $toast = $("#toast");
const $signed_in = $(".signed-in");

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
        $signed_in.hide();
        return;
    }
    // If the user is signed in
    $signed_in.show();
    $(".netid").text(user.email.slice(0, -13).toUpperCase());
}

update_dom();

supabase.auth.onAuthStateChange((event, session) => {
    // If the user was already signed in, $signed_in will already be visible
    // If they were signed out, and just signed in through the magic link, then it would be hidden
    // In that case, redirect them to the order page
    if (event === "SIGNED_IN" && $signed_in.css("display") !== "block")
        location.href = "/order.html";
    update_dom();
});

$("form").on("submit", e => {
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
