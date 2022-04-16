import { createClient } from "@supabase/supabase-js";
import $ from "cash-dom";
import { show_toast } from "./main";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://gwcnruxqmtukvguyhuga.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4");

// If the user is signed out
const user = supabase.auth.user();
if (user === null) location.href = "/";
$(".netid").text(user.email.slice(0, -13).toUpperCase());

$("#sign-out").on("click", () => supabase.auth.signOut()
    .then(_response => {
        show_toast("Signed out successfully");
        location.href = "/";
    })
    .catch(err => show_toast(err.response.text)));
