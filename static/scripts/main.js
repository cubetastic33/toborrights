// Themes
function reorder_theme_icons() {
    $("header div").append($("#system"))
        .append($("#dark"))
        .append($("#light"))
        .append($("header button.active"));
}

reorder_theme_icons();

$("header div button").on("click", function() {
    if ($(this).parent().hasClass("open")) {
        $("header div button").removeClass("active");
        $(this).addClass("active");
        if (this.id === "system") {
            // Delete the cookie
            document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            $("body").attr("class", "");
        } else {
            document.cookie = "theme=" + this.id + "; SameSite=Lax;";
            $("body").attr("class", this.id);
        }
        $(this).parent().append($(this));
    } else {
        reorder_theme_icons();
    }
    $(this).parent().toggleClass("open");
});

