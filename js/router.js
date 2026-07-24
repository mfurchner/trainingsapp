export function initRouter() {

    const buttons = document.querySelectorAll(".tab-button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            console.log(
                "Navigation:",
                button.dataset.view
            );

        });

    });

}