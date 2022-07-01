(() => {
    // Audio context for volume control
    let audioCtx = new AudioContext();
    let source;
    let gainNode;
    // end Audio context for volume control

    // Keyboard shortcuts
    let keyboardShortcuts = { // other shortcuts are added among the functions
        " ": (() => {
            window.scrollTo(0, 0);
            document.querySelector("video").focus();
        })
    };

    document.addEventListener("keydown", (e) => {
        if (!e.ctrlKey) return;
        if (!keyboardShortcuts[e.key]) return;
        e.preventDefault();
        keyboardShortcuts[e.key]();
    });

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
            if (sessionStorage.getItem("extra-config") != "true") panel.classList.add("hide");
            div.onclick = () => {
                if (panel.classList.contains("hide")) {
                    sessionStorage.setItem("extra-config", "true");
                    panel.classList.remove("hide");
                } else {
                    sessionStorage.setItem("extra-config", "false");
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
        
        let video = document.getElementsByTagName("video")[0];
        
        (() => {
            // playback speed option
            let playbackSpeed = createMenuItem(`Playback speed: ${sessionStorage.getItem("extra-config-playback-speed") || 1} X`, (() => {
                let input = document.createElement("input");
                input.type = "range";
                input.min = 0.1;
                input.max = 5;
                input.step = 0.1;
                input.value = sessionStorage.getItem("extra-config-playback-speed") || 1;
                video.playbackRate = input.value;

                input.oninput = () => {
                    playbackSpeed.children[0].innerHTML = `Playback speed: ${input.value} X`;
                    if (input.value < 0.1) input.value = 0.1;
                    sessionStorage.setItem("extra-config-playback-speed", input.value);
                    video.playbackRate = input.value; // playback Speed
                };

                // adding shortcut to change playback speed
                keyboardShortcuts.ArrowRight = (() => {
                    if (Number(input.value) + 0.1 > 5) return;
                    input.value = (Number(input.value) + 0.1).toFixed(1);
                    input.oninput();
                });
                keyboardShortcuts.ArrowLeft = (() => {
                    if (Number(input.value) - 0.1 <= 0) return;
                    input.value = (Number(input.value) - 0.1).toFixed(1);
                    input.oninput();
                });

                return input;
            }));
            
            panel.appendChild(playbackSpeed);
            
            // Volume option
            let volume = createMenuItem(`Volume: 100%`, (() => {
                let input = document.createElement("input");
                input.type = "range";
                input.min = 0;
                input.max = 200;
                input.value = 100;
                
                // Allow over 100%
                if (!source) {
                    source = audioCtx.createMediaElementSource(video);
                    gainNode = audioCtx.createGain();
                    source.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                }
                gainNode.gain.value = 1;
                
                input.oninput = () => {
                    gainNode.gain.value = input.value / 100; // volume
                    volume.children[0].innerHTML = `Volume: ${input.value}%`;
                };
                input.onchange = () => {
                    if (input.value == input.max) {
                        input.max = parseInt(input.max) + 100;
                    } else while (parseInt(input.value) < parseInt(input.max) - 100) {
                        input.max = parseInt(input.max) - 100;
                    }
                }

                // adding shortcut to change volume
                keyboardShortcuts.ArrowUp = (() => {
                    input.value = (Number(input.value) + 5).toFixed(1);
                    input.oninput();
                    input.onchange();
                });
                keyboardShortcuts.ArrowDown = (() => {
                    if (Number(input.value) - 5 <= 0) {
                        input.value = 0;
                        input.oninput();
                        input.onchange();
                        return;
                    };
                    input.value = (Number(input.value) - 5).toFixed(1);
                    input.oninput();
                    input.onchange();
                });
                
                return input;
            }));
            
            panel.appendChild(volume);
        })();
        
        let panels = document.querySelector("#secondary-inner #panels");
        panels.insertBefore(panel, panels.firstChild);
    }

    // Add the menu
    (() => {
        const observer = new MutationObserver(() => {
            if (!document.querySelector("video")) return;
            
            // set correct playback speed
            if (!document.querySelector(".ytp-ad-preview-container")) {
                document.querySelector("video").playbackRate = sessionStorage.getItem("extra-config-playback-speed") || 1;
            }
            
            // create the menu
            if (!document.querySelector("#secondary-inner #panels")) return;
            if (document.querySelector("#extra-config")) return;
            createMenu();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    })();
})();
