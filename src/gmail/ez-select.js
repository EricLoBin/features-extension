/**
 * Selects emails from the gmail inbox
 */

(() => {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case " ":
                event.preventDefault();
            case "Enter":
                document.querySelector(".zA.btb .oZ-jc").click(); // Selects the email
                break;
        
            default:
                break;
        }
    });
})();
