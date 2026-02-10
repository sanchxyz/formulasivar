// Lógica para la interacción del calendario en temp-2026.html
// Este archivo se cargará después de app.js

document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const eventDetailContainer = document.getElementById("event-detail-container");
    const closeEventDetailsButton = document.getElementById("close-event-details");
    const eventDetailTitle = document.getElementById("event-detail-title");
    const eventDetailDescription = document.getElementById("event-detail-description");
    const eventImagesTrack = document.getElementById("event-images-track");
    const sliderIndicatorsContainer = document.getElementById("slider-indicators"); // Renombrado para claridad
    const prevImageButton = document.getElementById("prev-image");
    const nextImageButton = document.getElementById("next-image");
    const calendarGrid = document.getElementById("calendar-grid");

    // Variables para el slider de detalles del evento
    let currentDetailImageIndex = 0;
    let currentEventImages = []; // Array de URLs de imágenes para el evento actual

    // Función para actualizar la visualización del slider
    function updateSliderDisplay() {
        if (currentEventImages.length === 0) {
            eventImagesTrack.style.transform = `translateX(0)`;
            sliderIndicatorsContainer.innerHTML = '';
            return;
        }

        const offset = -currentDetailImageIndex * 100;
        eventImagesTrack.style.transform = `translateX(${offset}%)`;

        // Actualizar indicadores
        sliderIndicatorsContainer.innerHTML = ''; // Limpiar indicadores anteriores
        currentEventImages.forEach((_, idx) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slider-indicator');
            if (idx === currentDetailImageIndex) {
                indicator.classList.add('active');
            }
            // Agrega un event listener a cada indicador para navegar directamente
            indicator.addEventListener('click', () => {
                currentDetailImageIndex = idx;
                updateSliderDisplay();
            });
            sliderIndicatorsContainer.appendChild(indicator);
        });
    }

    // Función para navegar por el slider
    function navigateSlider(direction) {
        if (currentEventImages.length === 0) return;

        currentDetailImageIndex = (currentDetailImageIndex + direction + currentEventImages.length) % currentEventImages.length;
        updateSliderDisplay();
    }

    // Función para mostrar los detalles de un evento
    function showEventDetails(raceIndex) {
        // Asegurarse de que SEASON_SCHEDULE y raceDescriptions estén disponibles (vienen de app.js)
        if (typeof window.SEASON_SCHEDULE === 'undefined' || typeof window.raceDescriptions === 'undefined') {
            console.error("Variables globales SEASON_SCHEDULE o raceDescriptions no están definidas en window. Asegúrate de que app.js se carga primero y las asigna a window.");
            return;
        }

        const race = window.SEASON_SCHEDULE[raceIndex];
        if (!race) {
            console.error("No se encontró la carrera para el índice:", raceIndex);
            return;
        }

        // Actualizar título y descripción
        eventDetailTitle.textContent = race.name.toUpperCase();
        const description = window.raceDescriptions[race.name] || `Prepárate para el Gran Premio de ${race.name}. Una cita imperdible de la temporada 2026.`;
        eventDetailDescription.textContent = description;

        // Limpiar y preparar imágenes para el slider
        eventImagesTrack.innerHTML = ''; 
        currentEventImages = [];
        currentDetailImageIndex = 0; // Resetear a la primera imagen al abrir

        // === LÓGICA ACTUALIZADA PARA CARGAR MÚLTIPLES IMÁGENES ===
        const imagesToLoad = [];

        // Primero, si tiene imageFiles, cargarlos.
        if (race.imageFiles && race.imageFiles.length > 0) {
            race.imageFiles.forEach(filename => {
                imagesToLoad.push(race.folderPath + filename);
            });
        } 
        
        // Si no hay imageFiles específicos, usar customImagePath como fallback
        // Esto cubre el caso donde un evento no tiene una galería pero sí una imagen principal
        if (imagesToLoad.length === 0 && race.customImagePath && race.customImagePath !== 'null') {
            imagesToLoad.push(race.customImagePath);
        }

        // Si todavía no hay imágenes, usar el icono por defecto
        if (imagesToLoad.length === 0) {
            imagesToLoad.push("assets/icons/default_race_icon.svg");
        }
        
        currentEventImages = imagesToLoad;

        // Crear elementos <img> para cada imagen y añadirlos al track
        currentEventImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = race.name;
            img.classList.add('event-image');
            eventImagesTrack.appendChild(img);
        });

        // Actualizar el display del slider (incluye indicadores)
        updateSliderDisplay();

        // Mostrar el contenedor de detalles
        eventDetailContainer.classList.remove("hidden");
        eventDetailContainer.classList.add("visible");
        document.body.style.overflow = 'hidden'; // Evitar scroll del body cuando el modal está abierto

        // Pausar video de fondo si existe
        const bannerVideo = document.getElementById("banner-video");
        if (bannerVideo) {
            bannerVideo.pause();
        }
    }

    // Función para ocultar los detalles del evento
    function hideEventDetails() {
        eventDetailContainer.classList.remove("visible");
        eventDetailContainer.classList.add("hidden");
        document.body.style.overflow = ''; // Restaurar scroll del body

        // Reiniciar slider
        currentDetailImageIndex = 0;
        eventImagesTrack.innerHTML = '';
        sliderIndicatorsContainer.innerHTML = '';
        currentEventImages = [];

        // Reanudar video de fondo si existe
        const bannerVideo = document.getElementById("banner-video");
        if (bannerVideo) {
            bannerVideo.play();
        }
    }

    // Inicializar listeners después de que el DOM esté completamente cargado y el calendario renderizado
    const observer = new MutationObserver((mutationsList, observer) => {
        const raceCards = calendarGrid.querySelectorAll(".race-card");
        if (raceCards.length > 0) {
            raceCards.forEach(card => {
                // Ensure listener is only added once
                if (!card.dataset.listenerAttached) {
                    card.addEventListener("click", () => {
                        const raceIndex = parseInt(card.dataset.raceIndex);
                        showEventDetails(raceIndex);
                    });
                    card.dataset.listenerAttached = "true"; // Mark as attached
                }
            });
            // Disconnect after initial cards are processed, assuming no more dynamic additions post-load
            // If more dynamic additions are expected, this disconnect should be handled differently.
            observer.disconnect();
        }
    });

    // === NEW: Manually check for already rendered cards on initial load ===
    const initialRaceCards = calendarGrid.querySelectorAll(".race-card");
    if (initialRaceCards.length > 0) {
        initialRaceCards.forEach(card => {
            if (!card.dataset.listenerAttached) {
                card.addEventListener("click", () => {
                    const raceIndex = parseInt(card.dataset.raceIndex);
                    showEventDetails(raceIndex);
                });
                card.dataset.listenerAttached = "true";
            }
        });
    }

    observer.observe(calendarGrid, { childList: true });

    // Listener para el botón de cerrar
    closeEventDetailsButton.addEventListener("click", hideEventDetails);

    // Listeners para la navegación del slider
    prevImageButton.addEventListener("click", () => navigateSlider(-1));
    nextImageButton.addEventListener("click", () => navigateSlider(1));
});
