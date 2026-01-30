/**
 * ============================================================================
 * FORMULA SIVAR - LOGIC APP
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initCardSlider();
});




/* =========================================
   ANIMACIONES LOTTIE
   ========================================= */

// Animación para la Carta 1
var animation1 = lottie.loadAnimation({
    container: document.getElementById('icon-anim-1'), // El ID que pusimos en el HTML
    renderer: 'svg', // Tecnología de renderizado (ligera)
    loop: true,      // Que se repita infinitamente
    autoplay: true,  // Que empiece sola
    path: 'assets/animations/plane_fly.json' // RUTA EXACTA
});

// Opcional: Ajustar velocidad (0.5 es lento, 1 es normal, 2 es rápido)
animation1.setSpeed(0.4);



// Animación para el Contador (Next Race)
var animationRace = lottie.loadAnimation({
    container: document.getElementById('race-icon-anim'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    // Usamos el ticket estrella porque parece una "entrada" a la carrera, 
    // pero puedes cambiar la ruta si prefieres otro.
    path: 'assets/animations/star medal.json'
});

// Velocidad un poco más lenta para no distraer tanto del tiempo
animationRace.setSpeed(0.3);



// Animación para la Carta 2 (Temporada 2026)
var animation2 = lottie.loadAnimation({
    container: document.getElementById('icon-anim-2'), // Ya existe en tu HTML
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/animations/2 users ai.json' // <--- CAMBIA ESTO por el nombre de tu archivo
});

// Opcional: Ajustar velocidad (Igual que el anterior)
animation2.setSpeed(0.3);


// Animación para el Podcast (A la derecha)
var animationPodcast = lottie.loadAnimation({
    container: document.getElementById('podcast-anim'), // ID nuevo
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/animations/microphone.json' // <--- ¡Asegúrate de que este archivo exista!
});

// Ajuste de velocidad
animationPodcast.setSpeed(0.7);





/* ============================================================================
   1. CONFIGURACIÓN DE DATOS (FUENTE ÚNICA DE VERDAD)
   ============================================================================ 
   Aquí defines todo. Si cambia una fecha, solo la tocas aquí.
*/
const SEASON_SCHEDULE = [
    { name: "Cadillac Livery", date: "2026-02-08", time: "05:30:00" },
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
        titleEl.textContent = `SUPER BOWL | ${raceName.toUpperCase()}`;
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




function renderCalendar() {
    const grid = document.getElementById("calendar-grid");
    if (!grid) return;

    // 1. NUEVO: Diccionario de imágenes (si quieres control manual)
    const raceImages = {
        "Australia": "assets/images/tracks/australia.webp",
        "China": "assets/images/tracks/china.webp",
        "Japón": "assets/images/tracks/japan.webp",
        "Baréin": "assets/images/tracks/bahrain.webp",
        "Arabia Saudita": "assets/images/tracks/saudi_arabia.webp",
        "EE.UU. (Miami)": "assets/images/tracks/miami.webp",
        // ... añade las 24
    };

    // 2. Diccionario de descripciones (el que ya tienes)
    const raceDescriptions = {
        "Bahrein": "El Circuito de Sakhir ilumina el desierto para abrir la nueva era de la F1.",
        "Arabia Saudita": "Jeddah Corniche desafía a los pilotos en el circuito callejero más rápido.",
        "Australia": "Albert Park nos recibe con sol, lagos y la energía única de Melbourne.",
        "Japón": "Suzuka es la prueba definitiva de habilidad con sus legendarias curvas en 'S'.",
        "China": "El Circuito de Shanghai regresa con sus largas rectas y estrategia pura.",
        "Miami": "El Autódromo de Miami combina glamour, yates y velocidad alrededor del estadio.",
        "Imola": "El Enzo e Dino Ferrari respira historia en el corazón del Valle del Motor.",
        "Mónaco": "Las calles de Montecarlo no perdonan errores en la joya de la corona.",
        "España": "Madrid se estrena en el calendario con un circuito callejero híbrido inédito.",
        "Canadá": "El Gilles Villeneuve nos espera con su famoso 'Muro de los Campeones'.",
        "Austria": "El Red Bull Ring es corto, rápido y siempre garantiza adelantamientos.",
        "Gran Bretaña": "Silverstone, la cuna del deporte, nos recuerda por qué amamos las carreras.",
        "Hungría": "El Hungaroring es un karting gigante donde la clasificación lo es todo.",
        "Bélgica": "Spa-Francorchamps separa a los niños de los adultos en el mítico Eau Rouge.",
        "Países Bajos": "Zandvoort se tiñe de naranja en una pista estrecha y peraltada.",
        "Italia": "Monza es el 'Templo de la Velocidad', pura potencia y frenadas al límite.",
        "Azerbaiyán": "Las calles de Bakú mezclan la velocidad extrema con la zona del castillo.",
        "Singapur": "Marina Bay brilla en la noche más física y calurosa del año.",
        "Austin": "El COTA en Texas nos regala desniveles, baches y batallas en la curva 1.",
        "México": "El Autódromo Hermanos Rodríguez vibra con la 'F1ESTA' más grande del mundo.",
        "Brasil": "Interlagos siempre nos regala finales épicos y clima impredecible.",
        "Las Vegas": "El Strip de Las Vegas convierte la carrera en el mayor espectáculo del planeta.",
        "Qatar": "El Circuito de Lusail es una montaña rusa nocturna de alta velocidad.",
        "Abu Dhabi": "Yas Marina cierra la temporada con fuegos artificiales y el campeón definitivo."
    };

    grid.innerHTML = "";

    SEASON_SCHEDULE.forEach((race, index) => {
        const raceCard = document.createElement("div");
        raceCard.className = "race-card";

        // 3. OPCIÓN A: Usar el diccionario de imágenes
        const imageUrl = raceImages[race.name] || "assets/images/gallery/img_1.webp";

        // OPCIÓN B (alternativa): Generar nombre de archivo automático (más arriesgado)
        // const safeName = race.name.toLowerCase()
        //     .replace(/\./g, '')
        //     .replace(/\(/g, '')
        //     .replace(/\)/g, '')
        //     .replace(/\s+/g, '_')
        //     .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Quita acentos
        // const imageUrl = `assets/images/tracks/${safeName}.webp`;

        raceCard.style.backgroundImage = `url('${imageUrl}')`;

        const desc = raceDescriptions[race.name] || `Prepárate para el Gran Premio de ${race.name}. Una cita imperdible de la temporada 2026.`;

        raceCard.innerHTML = `
            <div class="race-number">#${index + 1}</div>
            <div class="race-overlay">
                <span class="race-date">${formatDate(race.date)} | ${race.time.substring(0, 5)} SV</span>
                <h3 class="race-name">${race.name.toUpperCase()}</h3>
                <p class="race-desc">${desc}</p>
            </div>
        `;

        grid.appendChild(raceCard);
    });
}

// Helper para poner la fecha bonita
function formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short' };
    return new Date(dateStr + "T00:00:00").toLocaleDateString('es-ES', options).toUpperCase();
}