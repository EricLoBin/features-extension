
(() => {
    const observer = new MutationObserver(() => {
        if (!document.querySelector("[disablepictureinpicture]")) return;
        document.querySelector("[disablepictureinpicture]").removeAttribute("disablepictureinpicture");
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
