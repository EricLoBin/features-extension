
(() => {
    const observer = new MutationObserver(() => {
        if (document.querySelector(".ytp-ad-preview-container")) {
            document.querySelector("video").playbackRate = 5;
        }
        if (!!document.querySelector(".ytp-ad-skip-button")){
            document.querySelector(".ytp-ad-skip-button").click();
        }
        if (!!document.querySelector(".ytp-ad-overlay-close-button")){
            document.querySelector(".ytp-ad-overlay-close-button").click();
        }
        // Main page
        if (!!document.querySelector("ytd-banner-promo-renderer:not(.dismissed) button")){
            document.querySelector("ytd-banner-promo-renderer button").click();
        }
        if (!!document.getElementById("masthead-ad")){
            document.getElementById("masthead-ad").remove();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
