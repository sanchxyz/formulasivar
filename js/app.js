/**
 * ============================================================================
 * FORMULA SIVAR - LOGIC APP
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initCardSlider();
});

/* ============================================================================
   1. CONFIGURACIÓN DE DATOS (FUENTE ÚNICA DE VERDAD)
   ============================================================================ 
   Aquí defines todo. Si cambia una fecha, solo la tocas aquí.
*/
const SEASON_SCHEDULE = [
    { name: "Australia", date: "2026-03-08", time: "00:00:00" },
    { name: "China", date: "2026-03-15", time: "01:00:00" },
    { name: "Japón", date: "2026-03-29", time: "23:00:00" },
    { name: "Baréin", date: "2026-04-12", time: "09:00:00" },
    { name: "Arabia Saudita", date: "2026-04-19", time: "11:00:00" },
    { name: "EE.UU. (Miami)", date: "2026-05-03", time: "14:00:00" },
    { name: "Canadá", date: "2026-05-24", time: "12:00:00" },
    { name: "Mónaco", date: "2026-06-07", time: "07:00:00" },
    { name: "España (Barcelona)", date: "2026-06-14", time: "07:00:00" },
    { name: "Austria", date: "2026-06-28", time: "07:00:00" },
    { name: "Gran Bretaña", date: "2026-07-05", time: "08:00:00" },
    { name: "Bélgica", date: "2026-07-19", time: "07:00:00" },
    { name: "Hungría", date: "2026-07-26", time: "07:00:00" },
    { name: "Países Bajos", date: "2026-08-23", time: "07:00:00" },
    { name: "Italia (Monza)", date: "2026-09-06", time: "07:00:00" },
    { name: "España (Madrid)", date: "2026-09-13", time: "07:00:00" },
    { name: "Azerbaiyán", date: "2026-09-27", time: "05:00:00" },
    { name: "Singapur", date: "2026-10-11", time: "06:00:00" },
    { name: "EE.UU. (Austin)", date: "2026-10-25", time: "13:00:00" },
    { name: "México", date: "2026-11-01", time: "14:00:00" },
    { name: "Brasil", date: "2026-11-08", time: "11:00:00" },
    { name: "EE.UU. (Las Vegas)", date: "2026-11-21", time: "23:00:00" },
    { name: "Catar", date: "2026-11-29", time: "11:00:00" },
    { name: "Abu Dabi", date: "2026-12-06", time: "07:00:00" },
];

/* ============================================================================
   2. MÓDULO DEL CONTADOR
   ============================================================================ */
function initCountdown() {
    // Verificamos si los elementos existen (para no dar error en podcast.html)
    const countdownEl = document.getElementById("countdown");
    const titleEl = document.getElementById("next-race-title");

    if (!countdownEl || !titleEl) return;

    // Función interna de actualización
    const update = () => {
        const now = new Date();
        let nextRace = null;
        let raceName = "PRÓXIMO GRAN PREMIO";

        // Buscamos la próxima carrera
        for (const race of SEASON_SCHEDULE) {
            // Creamos la fecha combinando día y hora + zona horaria SV (UTC-6)
            const raceDate = new Date(`${race.date}T${race.time}-06:00`);

            if (raceDate >= now) {
                nextRace = raceDate;
                raceName = race.name;
                break;
            }
        }

        if (!nextRace) {
            countdownEl.innerHTML = "<p>¡Temporada finalizada!</p>";
            titleEl.textContent = "TEMPORADA FINALIZADA";
            return;
        }

        const diff = nextRace - now;

        // Si estamos en medio de la carrera (diferencia negativa pequeña) o justo empieza
        if (diff <= 0) {
            titleEl.textContent = "¡CARRERA EN CURSO!";
            updateDOM("00", "00", "00", "00");
            return;
        }

        // Cálculos matemáticos
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updateDOM(days, hours, minutes, seconds);
        titleEl.textContent = `GRAN PREMIO DE ${raceName.toUpperCase()}`;
    };

    // Helper para actualizar el HTML
    const updateDOM = (d, h, m, s) => {
        document.getElementById("days").textContent = d.toString().padStart(2, "0");
        document.getElementById("hours").textContent = h.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = m.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = s.toString().padStart(2, "0");
    };

    // Sincronización inicial precisa
    update();
    const now = new Date();
    const delay = 1000 - now.getMilliseconds();

    setTimeout(() => {
        setInterval(update, 1000);
        update();
    }, delay);
}

/* ============================================================================
   3. MÓDULO DEL SLIDER (CARD STACK)
   ============================================================================ */
function initCardSlider() {
    // Verificamos si estamos en la página del slider
    const sliderContainer = document.querySelector('.calendar-slider');
    if (!sliderContainer) return;

    // Rutas actualizadas a la nueva estructura de carpetas
    const cardImages = [
        "assets/images/gallery/img_0.webp",
        "assets/images/gallery/img_1.webp",
        "assets/images/gallery/img_2.webp",
        "assets/images/gallery/img_3.webp",
        "assets/images/gallery/img_4.webp",
        "assets/images/gallery/img_5.webp",
        "assets/images/gallery/img_6.webp",
    ];

    let nextCardIndex = 2; // Empezamos después de las 2 que ya están en HTML

    setInterval(() => {
        const activeFront = document.querySelector('.slider-card.front');
        const activeBack = document.querySelector('.slider-card.back');

        if (!activeFront || !activeBack) return;

        // 1. Animación de salida
        activeFront.classList.add('swipe-out');

        // 2. Pre-cargar siguiente imagen
        const nextImgObj = new Image();
        nextImgObj.src = cardImages[nextCardIndex];

        // 3. Esperar transición (debe coincidir con CSS transition: 0.4s)
        setTimeout(() => {
            // Reset de clases (Intercambio de roles)
            activeBack.classList.remove('back');
            activeBack.classList.add('front');

            activeFront.classList.remove('front', 'swipe-out');
            activeFront.classList.add('back');

            // Asignar nueva imagen a la carta que se fue al fondo
            activeFront.src = cardImages[nextCardIndex];

            // Ciclar índice
            nextCardIndex++;
            if (nextCardIndex >= cardImages.length) {
                nextCardIndex = 0;
            }

        }, 400);

    }, 4000); // Cambio cada 4 segundos
}