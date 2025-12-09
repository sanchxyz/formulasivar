// ============================================================================
// Configuración de fechas de carreras 2026
// ============================================================================
const raceDates = [
    "2026-03-08",  // GP Australia
    "2026-03-15",  // GP China
    "2026-03-29",  // GP Japón
    "2026-04-12",  // GP Baréin
    "2026-04-19",  // GP Arabia Saudita
    "2026-05-03",  // GP Miami
    "2026-05-24",  // GP Canadá
    "2026-06-07",  // GP Mónaco
    "2026-06-14",  // GP España (Barcelona)
    "2026-06-28",  // GP Austria
    "2026-07-05",  // GP Gran Bretaña
    "2026-07-19",  // GP Bélgica
    "2026-07-26",  // GP Hungría
    "2026-08-23",  // GP Países Bajos
    "2026-09-06",  // GP Italia (Monza)
    "2026-09-13",  // GP España (Madrid)
    "2026-09-27",  // GP Azerbaiyán (Nota: Ajustado a domingo estándar)
    "2026-10-11",  // GP Singapur
    "2026-10-25",  // GP Estados Unidos (Austin)
    "2026-11-01",  // GP México
    "2026-11-08",  // GP Brasil
    "2026-11-21",  // GP Las Vegas (Carrera es Sábado noche / Domingo madrugada)
    "2026-11-29",  // GP Catar
    "2026-12-06",  // GP Abu Dabi
];

// Horas de inicio aproximadas (en UTC-6, El Salvador)
const raceStartTimes = {
    "2026-03-08": "00:00:00",  // Australia (00:00 del domingo)
    "2026-03-15": "01:00:00",  // China
    "2026-03-29": "23:00:00",  // Japón (Sábado 11pm hora SV)
    "2026-04-12": "09:00:00",  // Baréin
    "2026-04-19": "11:00:00",  // Arabia Saudita (Nocturna)
    "2026-05-03": "14:00:00",  // Miami
    "2026-05-24": "12:00:00",  // Canadá
    "2026-06-07": "07:00:00",  // Mónaco
    "2026-06-14": "07:00:00",  // Barcelona
    "2026-06-28": "07:00:00",  // Austria
    "2026-07-05": "08:00:00",  // Gran Bretaña
    "2026-07-19": "07:00:00",  // Bélgica
    "2026-07-26": "07:00:00",  // Hungría
    "2026-08-23": "07:00:00",  // Países Bajos
    "2026-09-06": "07:00:00",  // Monza
    "2026-09-13": "07:00:00",  // Madrid (Hora estándar europea)
    "2026-09-27": "05:00:00",  // Azerbaiyán
    "2026-10-11": "06:00:00",  // Singapur (Nocturna allá, mañana aquí)
    "2026-10-25": "13:00:00",  // Austin
    "2026-11-01": "14:00:00",  // México
    "2026-11-08": "11:00:00",  // Brasil
    "2026-11-21": "23:00:00",  // Las Vegas (Sábado noche hora SV)
    "2026-11-29": "11:00:00",  // Catar
    "2026-12-06": "07:00:00",  // Abu Dabi
};

// ============================================================================
// Función para iniciar el contador optimizado
// ============================================================================
function startOptimizedCountdown() {
    updateCountdown();
    const now = new Date();
    const delay = 1000 - now.getMilliseconds();

    setTimeout(() => {
        setInterval(updateCountdown, 1000);
    }, delay);
}

// ============================================================================
// Función principal de actualización del contador
// ============================================================================
function updateCountdown() {
    const now = new Date();
    let nextRace = null;

    // Encuentra la próxima carrera
    for (const date of raceDates) {
        const startTime = raceStartTimes[date] || "14:00:00";
        const raceDate = new Date(`${date}T${startTime}-06:00`);

        if (raceDate >= now) {
            nextRace = raceDate;
            break;
        }
    }

    const countdownElement = document.getElementById("countdown");
    const titleElement = document.getElementById("next-race-title");

    if (!nextRace) {
        countdownElement.innerHTML = "<p>¡Temporada finalizada!</p>";
        titleElement.textContent = "Temporada finalizada";
        return;
    }

    // Calcula diferencia
    const diff = nextRace - now;

    // Si la carrera ya empezó hoy pero aún no ha terminado
    if (diff < 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        titleElement.textContent = "¡Carrera en curso!";
        return;
    }

    // Calcula componentes del tiempo
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Actualiza DOM con valores formateados
    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

    // Información de próxima carrera
    let raceIndex = -1;
    for (let i = 0; i < raceDates.length; i++) {
        const startTime = raceStartTimes[raceDates[i]] || "14:00:00";
        const potentialRaceDate = new Date(`${raceDates[i]}T${startTime}-06:00`);

        if (potentialRaceDate.getTime() === nextRace.getTime()) {
            raceIndex = i;
            break;
        }
    }

    if (raceIndex !== -1) {
        titleElement.textContent = `GRAN PREMIO DE ${getRaceName(raceIndex)}`;
    } else {
        // Fallback: buscar por fecha formateada localmente
        const localDateStr = nextRace.toLocaleDateString("en-CA");
        raceIndex = raceDates.indexOf(localDateStr);
        if (raceIndex !== -1) {
            titleElement.textContent = `GRAN PREMIO DE ${getRaceName(raceIndex)}`;
        } else {
            titleElement.textContent = "PRÓXIMO GRAN PREMIO";
        }
    }
}

// ============================================================================
// Nombres de carreras para 2026
// ============================================================================
function getRaceName(index) {
    const names = [
        "Australia - 2026",
        "China",
        "Japón",
        "Baréin",
        "Arabia Saudita",
        "EE.UU. (Miami)",
        "Canadá",
        "Mónaco",
        "España (Barcelona)",
        "Austria",
        "Gran Bretaña",
        "Bélgica",
        "Hungría",
        "Países Bajos",
        "Italia (Monza)",
        "España (Madrid)",
        "Azerbaiyán",
        "Singapur",
        "EE.UU. (Austin)",
        "México",
        "Brasil",
        "EE.UU. (Las Vegas)",
        "Catar",
        "Abu Dabi",
    ];

    if (index >= 0 && index < names.length) {
        return names[index];
    } else {
        return "PRÓXIMA CARRERA";
    }
}

// ============================================================================
// Iniciar contador al cargar la página
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
    startOptimizedCountdown();
});

// ============================================================================
// NUEVO SLIDER TIPO CARTAS (CARD STACK)
// ============================================================================
const cardImages = [
    "assets/galeria/img_0.webp",
    "assets/galeria/img_1.webp",
    "assets/galeria/img_2.webp",
    "assets/galeria/img_3.webp",
    "assets/galeria/img_4.webp",
    "assets/galeria/img_5.webp",
    "assets/galeria/img_6.webp",
];
// Empezamos apuntando al índice 2, porque en el HTML ya pusiste la img_1 y img_2
let nextCardIndex = 2;

function startCardSwiper() {
    setInterval(() => {
        const activeFront = document.querySelector('.slider-card.front');
        const activeBack = document.querySelector('.slider-card.back');

        if (!activeFront || !activeBack) return;

        // 1. Iniciamos animación de salida
        activeFront.classList.add('swipe-out');

        // 2. Pre-cargamos la SIGUIENTE imagen (la que usaremos en el futuro)
        // Esto hace que el navegador la baje en background para que esté lista.
        const nextImgObj = new Image();
        nextImgObj.src = cardImages[nextCardIndex];

        // 3. Esperamos el tiempo EXACTO de la transición CSS (ajusta 400 o 600 según tu CSS)
        setTimeout(() => {
            // Intercambio de roles
            activeBack.classList.remove('back');
            activeBack.classList.add('front');

            activeFront.classList.remove('front', 'swipe-out');
            activeFront.classList.add('back');

            // Asignamos la imagen (que ya debería estar pre-cargada)
            activeFront.src = cardImages[nextCardIndex];

            // Avanzamos índice
            nextCardIndex++;
            if (nextCardIndex >= cardImages.length) {
                nextCardIndex = 0;
            }

        }, 400); // IMPORTANTE: Asegúrate que esto coincida con tu "transition" en styles.css

    }, 4000);
}

// Iniciamos el slider
startCardSwiper();