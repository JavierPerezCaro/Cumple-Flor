document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpen = document.getElementById("btn-open");
    
    // Elementos del Modal
    const btnOpenRsvp = document.getElementById("btn-open-rsvp");
    const rsvpModal = document.getElementById("rsvp-modal");
    const closeModal = document.getElementById("close-modal");
    const rsvpForm = document.getElementById("rsvp-form");
    const formContainer = document.getElementById("form-container");
    const successMessage = document.getElementById("success-message");
    const btnCloseSuccess = document.getElementById("btn-close-success");

    // Abrir invitación principal
    btnOpen.addEventListener("click", () => {
        welcomeScreen.classList.add("fade-out");
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContent.classList.remove("hidden");
            mainContent.classList.add("visible");
        }, 700);
    });

    // Abrir modal de RSVP
    btnOpenRsvp.addEventListener("click", () => {
        rsvpModal.classList.remove("hidden");
        formContainer.classList.remove("hidden");
        successMessage.classList.add("hidden");
    });

    // Cerrar modal
    const cerrarTodo = () => {
        rsvpModal.classList.add("hidden");
        rsvpForm.reset();
    };

    closeModal.addEventListener("click", cerrarTodo);
    btnCloseSuccess.addEventListener("click", cerrarTodo);

    window.addEventListener("click", (e) => {
        if (e.target === rsvpModal) {
            cerrarTodo();
        }
    });

    // Manejar el envío y conexión con Google Sheets
    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const btnSubmit = document.getElementById("btn-submit");
        btnSubmit.textContent = "Enviando...";
        btnSubmit.disabled = true;

        const datosInvitado = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            dni: document.getElementById("dni").value,
            acompanante: document.getElementById("acompanante").value || "Ninguno"
        };

        // AQUÍ CONECTAMOS CON TU GOOGLE SHEETS:
        // (Te explico abajo en un paso rápido cómo generar este link de SheetDB)
        const URL_GOOGLE_SHEETS = "https://sheetdb.io/api/v1/vp9jd8iyrsrk7"; 

        fetch(URL_GOOGLE_SHEETS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [datosInvitado] })
        })
        .then(response => response.json())
        .then(data => {
            // Ocultar formulario y mostrar mensaje de agradecimiento con el estilo dorado
            formContainer.classList.add("hidden");
            successMessage.classList.remove("hidden");
            btnSubmit.textContent = "Enviar Confirmación";
            btnSubmit.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al registrar la confirmación. Por favor, intenta de nuevo.");
            btnSubmit.textContent = "Enviar Confirmación";
            btnSubmit.disabled = false;
        });
