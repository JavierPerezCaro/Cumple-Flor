document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpen = document.getElementById("btn-open");

    btnOpen.addEventListener("click", () => {
        // Aplica animación de salida a la pantalla de bienvenida
        welcomeScreen.classList.add("fade-out");

        // Espera a que termine la transición para ocultarla por completo y revelar la tarjeta principal
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContent.classList.remove("hidden");
            mainContent.classList.add("visible");
        }, 700); // 0.7 segundos sincronizados con el CSS
    });
});