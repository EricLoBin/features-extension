function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

window.setInterval(function(){
    if (!!document.querySelector(".ytp-ad-skip-button")){
        eventFire(document.querySelector(".ytp-ad-skip-button"), 'click');
    }
    if (!!document.querySelector(".ytp-ad-overlay-close-button")){
        eventFire(document.querySelector(".ytp-ad-overlay-close-button"), 'click');
    }
}, 500);
