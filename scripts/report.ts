import { createClient } from "@supabase/supabase-js";
import $ from "cash-dom";

const supabase = createClient("https://gwcnruxqmtukvguyhuga.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3Y25ydXhxbXR1a3ZndXlodWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5MjI5MTIsImV4cCI6MTk2NTQ5ODkxMn0.Cpm-Myt5YdzFrRzYcWWaFxVDiyQWeJCD3dTZBvRlcp4");

function donation_report () {
  supabase.from("donation_report").
    select("total, count, average, standard_deviation").
    limit(1).
    throwOnError().
    single().
    then(({ data }) => {
      $("#donation-report").append($(`<table>
  <thead>
  <h2>Donation Report</h2>
  </thead>
  <tr>
    <td>Total</td>
    <td>${data.total}</td>
  </tr>
  <tr>
    <td>Orders</td>
    <td>${data.count}</td>
  </tr>
  <tr>
    <td>Average</td>
    <td>${data.average}</td>
  </tr>
  <tr>
    <td>Standard Deviation</td>
    <td>${data.standard_deviation}</td>
  </tr>
</table>
      `));
    });
}

function timeslot_load_report () {
  supabase.from("time_slot_load").
    select("time_slot, count").
    throwOnError().
    then(({ data }) => {
      const table = $("<table></table>");
      table.append($("<thead><h2>Time Slot Load Report</h2></thead>"));
      const body = $("<tbody></tbody>");
      for (const { time_slot, count } of data) {
        body.append($(`
        <tr>
        <td>${time_slot}</td>
        <td>${count}</td>
        </tr>
      `));
      }
      table.append(body);
      $("#timeslot-load-report").append(table);
    });
}

function restaurant_distribution_report () {
  supabase.from("restaurant_distribution").
    select("restaurant, count").
    throwOnError().
    then(({ data }) => {
      const table = $("<table></table>");

      table.append($("<thead><h2>Restaurant Distribution Report</h2></thead>"));
      const body = $("<tbody></tbody>");
      for (const { restaurant, count } of data) {
        body.append($(`
        <tr>
        <td>${restaurant}</td>
        <td>${count}</td>
        </tr>
      `));
      }
      table.append(body);
      $("#restaurant-distribution-report").append(table);
    });
}

const reports = [
  donation_report,
  timeslot_load_report,
  restaurant_distribution_report];

const update_dom = () => $.each(reports, $.call);

// load report all initially
$(document).ready(update_dom);
// reload on database changes
supabase.from("orders").on("*", update_dom).subscribe();
