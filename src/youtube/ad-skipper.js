
window.setInterval(function(){
    if (!!document.querySelector(".ytp-ad-skip-button")){
        document.querySelector(".ytp-ad-skip-button").click();
    }
    if (!!document.querySelector(".ytp-ad-overlay-close-button")){
        document.querySelector(".ytp-ad-overlay-close-button").click();
    }
    if (!!document.querySelector("ytd-banner-promo-renderer:not(.dismissed) button")){
        document.querySelector("ytd-banner-promo-renderer button").click();
    }
}, 500);
