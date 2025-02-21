document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("main-header");

    header.addEventListener("mouseover", function() {
        header.style.height = "110px";
    });

    header.addEventListener("mouseout", function() {
        header.style.height = "75px";
    });
});
