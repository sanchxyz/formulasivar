// Lógica para la interacción del calendario en temp-2026.html
// Este archivo se cargará después de app.js

document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const eventDetailContainer = document.getElementById("event-detail-container");
    const closeEventDetailsButton = document.getElementById("close-event-details");
    let eventDetailTitle = document.getElementById("event-detail-title"); // Changed from const to let
    let eventDetailDescription = document.getElementById("event-detail-description"); // Changed from const to let
    const eventImagesTrack = document.getElementById("event-images-track");
    const sliderIndicatorsContainer = document.getElementById("slider-indicators"); // Renombrado para claridad
    const prevImageButton = document.getElementById("prev-image");
    const nextImageButton = document.getElementById("next-image");
    const calendarGrid = document.getElementById("calendar-grid");

    // Variables para el slider de detalles del evento
    let currentDetailImageIndex = 0;
    let currentEventImages = []; // Array de URLs de imágenes para el evento actual
    let sliderInterval; // Variable to hold the interval ID

    // Función para actualizar la visualización del slider
    function updateSliderDisplay() {
        if (currentEventImages.length === 0) {
            eventImagesTrack.style.transform = `translateX(0)`;
            sliderIndicatorsContainer.innerHTML = '';
            return;
        }

        const offset = -currentDetailImageIndex * 100;
        eventImagesTrack.style.transform = `translateX(${offset}%)`;


    }

    // Función para navegar por el slider
    function navigateSlider(direction) {
        if (currentEventImages.length === 0) return;

        currentDetailImageIndex = (currentDetailImageIndex + direction + currentEventImages.length) % currentEventImages.length;
        updateSliderDisplay();
    }

    // Función para mostrar los detalles de un evento
    async function showEventDetails(raceIndex) {
        // Asegurarse de que SEASON_SCHEDULE y raceDescriptions estén disponibles (vienen de app.js)
        if (typeof window.SEASON_SCHEDULE === 'undefined' || typeof window.raceDescriptions === 'undefined') {
            console.error("Variables globales SEASON_SCHEDULE o raceDescriptions no están definidas en window.");
            return;
        }

        const race = window.SEASON_SCHEDULE[raceIndex];
        if (!race) {
            console.error("No se encontró la carrera para el índice:", raceIndex);
            return;
        }

        // Referencia al logo que ya existe en el HTML
        const logoImg = document.getElementById('event-detail-logo');
        if (logoImg) {
            logoImg.src = "assets/icons/formulasivar_webp_blank_lowquality.webp";
            logoImg.style.display = 'block';
        }

        // Actualizar título y descripción directamente
        eventDetailTitle.textContent = race.name.toUpperCase();
        eventDetailDescription.textContent = race.longDescription || window.raceDescriptions[race.name] || `Prepárate para el Gran Premio de ${race.name}. Una cita imperdible de la temporada 2026.`;


        // Limpiar y preparar imágenes para el slider
        eventImagesTrack.innerHTML = ''; 
        currentEventImages = [];
        currentDetailImageIndex = 0;

        // === LÓGICA DINÁMICA: ESCANEO DE CARPETA ===
        let imagesToLoad = [];

        if (race.folderPath) {
            // Intentamos obtener las imágenes de la carpeta automáticamente
            const folderImages = await window.getImagesFromFolder(race.folderPath);
            
            // Si encontramos imágenes que no sean 'coming_soon.webp', las priorizamos
            const realImages = folderImages.filter(img => !img.toLowerCase().includes('coming_soon.webp'));
            
            if (realImages.length > 0) {
                imagesToLoad = realImages;
            } else if (folderImages.length > 0) {
                // Si solo está coming_soon o no hay nada más, lo usamos
                imagesToLoad = folderImages;
            }
        }

        // Fallback: Si no se pudo obtener nada dinámicamente, usar lo que esté en imageFiles (manual)
        if (imagesToLoad.length === 0 && race.imageFiles && race.imageFiles.length > 0) {
            race.imageFiles.forEach(filename => {
                imagesToLoad.push(race.folderPath + filename);
            });
        } 
        
        // Segundo Fallback: Si sigue vacío, buscar coming_soon.webp de forma manual
        if (imagesToLoad.length === 0 && race.folderPath) {
            imagesToLoad.push(race.folderPath + "coming_soon.webp");
        }

        // Tercer Fallback: Icono por defecto
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

        // Start automatic slider if more than one image
        if (currentEventImages.length > 1) {
            clearInterval(sliderInterval); // Clear any existing interval
            sliderInterval = setInterval(() => {
                navigateSlider(1); // Navigate to the next image
            }, 5000); // Change image every 5 seconds
        } else {
            clearInterval(sliderInterval); // Clear interval if only one image
        }

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
                    card.addEventListener("click", async () => {
                        const raceIndex = parseInt(card.dataset.raceIndex);
                        await showEventDetails(raceIndex);
                    });
                    card.dataset.listenerAttached = "true"; // Mark as attached
                }
            });
            // Disconnect after initial cards are processed
            observer.disconnect();
        }
    });

    // === NEW: Manually check for already rendered cards on initial load ===
    const initialRaceCards = calendarGrid.querySelectorAll(".race-card");
    if (initialRaceCards.length > 0) {
        initialRaceCards.forEach(card => {
            if (!card.dataset.listenerAttached) {
                card.addEventListener("click", async () => {
                    const raceIndex = parseInt(card.dataset.raceIndex);
                    await showEventDetails(raceIndex);
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
