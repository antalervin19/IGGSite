let lastScrollTop = 0;
        const header = document.getElementById("header");
        const scrollThreshold = 300;

        window.addEventListener("scroll", function() {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                header.style.top = "-120px";
            } else {
                header.style.top = "0";
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});