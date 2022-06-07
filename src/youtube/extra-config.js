
function createMenu() {
    // Create the menu
    let panel = document.createElement("div");
    panel.id = "extra-config";
    (() => {
        // Create the menu header
        let div = document.createElement("div");
        div.className = "extra-config-header";
        let p = document.createElement("p");
        p.innerHTML = "Extra config";
        div.appendChild(p);
        
        let expand_button = document.createElement("a");
        expand_button.className = "expand-button";
        expand_button.innerHTML = `
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;">
            <g class="style-scope yt-icon">
                <polygon points="18.4,14.6 12,8.3 5.6,14.6 6.4,15.4 12,9.7 17.6,15.4 " class="style-scope yt-icon"></polygon>
            </g>
        </svg>`;
        div.appendChild(expand_button);
        panel.classList.add("hide");
        div.onclick = () => {
            if (panel.classList.contains("hide")) {
                panel.classList.remove("hide");
            } else {
                panel.classList.add("hide");
            }
        };
        panel.appendChild(div);
    })();
    
    // Create the menu body
    function createMenuItem(title, func) {
        let item = document.createElement("div");
        item.className = "menu-item";
        let title_p = document.createElement("p");
        title_p.innerHTML = title;
        item.appendChild(title_p);
        item.appendChild(func());
        return item;
    }
    
    (() => {
        // playback speed option
        let playbackSpeed = createMenuItem("Playback speed:", (() => {
            let input = document.createElement("input");
            input.type = "number";
            input.min = "0.1";
            input.step = "0.1";
            input.value = sessionStorage.getItem("extra-config-playback-speed") || 1;
            input.onchange = (e) => {
                if (e.target.value < 0.1) e.target.value = 0.1;
                sessionStorage.setItem("extra-config-playback-speed", e.target.value);
                document.getElementsByTagName("video")[0].playbackRate = e.target.value; // playback Speed
            };
            return input;
        }));

        panel.appendChild(playbackSpeed);
    })();
    
    let panels = document.querySelector("#secondary-inner #panels");
    panels.insertBefore(panel, panels.firstChild);
}

(() => {
    onUrlChange();
    let lastUrl = location.href; 
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onUrlChange();
        }
    }).observe(document, {subtree: true, childList: true});

    function onUrlChange() {
        setTimeout(() => {
            if (document.querySelector("#secondary-inner #panels")) {
                if (window.location.href.includes("/watch")) {
                    createMenu();
                }
            } else {
                onUrlChange();
            }
        }, 1000);
    }
    // parentElement.insertBefore(newElement, parentElement.children[2]);
    //* document.getElementsByTagName("video")[0].playbackRate =  // playback Speed
})()
