document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById("cookie-consent-banner");
    const accepted = document.cookie.includes("cookie_consent=accepted");
    const declined = document.cookie.includes("cookie_consent=declined");

    if (!accepted && !declined) {
        banner.style.display = "block";
    }

    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");

    if (acceptBtn) {
        acceptBtn.addEventListener("click", function () {
            document.cookie = "cookie_consent=accepted; path=/; max-age=" + (60 * 60 * 24 * 365);
            banner.style.display = "none";
            location.reload();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener("click", function () {
            document.cookie = "cookie_consent=declined; path=/; max-age=" + (60 * 60 * 24 * 365);
            banner.style.display = "none";
            location.reload();
        });
    }

    if (typeof SCC !== "undefined" && SCC.analytics_vendor === "google" && accepted) {
        const gaScript = document.createElement("script");
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X";
        gaScript.async = true;
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-XXXXXX-X');
    }

    if (typeof SCC !== "undefined" && SCC.analytics_vendor === "matomo" && accepted) {
        const u = "//your-matomo-domain.com/";
        const _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        _paq.push(['setTrackerUrl', u + 'matomo.php']);
        _paq.push(['setSiteId', '1']);
        const d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0];
        g.async = true; g.src = u + "matomo.js"; s.parentNode.insertBefore(g, s);
    }
});
