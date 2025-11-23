// ============================================================================
// Configuración de fechas de carreras 2025
// ============================================================================
const raceDates = [
    "2025-03-16",  // GP Australia
    "2025-03-23",  // GP China
    "2025-04-06",  // GP Japón
    "2025-04-13",  // GP Baréin
    "2025-04-20",  // GP Arabia Saudita
    "2025-05-04",  // GP Miami
    "2025-05-18",  // GP Emilia‑Romagna (Imola)
    "2025-05-25",  // GP Mónaco
    "2025-06-01",  // GP España
    "2025-06-15",  // GP Canadá
    "2025-06-29",  // GP Austria
    "2025-07-06",  // GP Gran Bretaña
    "2025-07-27",  // GP Bélgica
    "2025-08-03",  // GP Hungría
    "2025-08-31",  // GP Países Bajos
    "2025-09-07",  // GP Italia
    "2025-09-21",  // GP Azerbaiyán
    "2025-10-05",  // GP Singapur
    "2025-10-19",  // GP Estados Unidos
    "2025-10-26",  // GP México
    "2025-11-09",  // GP Brasil
    "2025-11-22",  // GP Las Vegas
    "2025-11-30",  // GP Catar
    "2025-12-07",  // GP Abu Dabi
];

// Horas de inicio específicas por carrera (en UTC-6, El Salvador)
const raceStartTimes = {
    "2025-03-16": "00:00:00",  // 16:00 en Melbourne (UTC+10) = 00:00 en El Salvador (UTC-6) 🇦🇺
    "2025-03-23": "00:00:00",  // 14:00 en Shanghai (UTC+8) = 00:00 en El Salvador (UTC-6) 🇨🇳
    "2025-04-06": "23:00:00",  // 14:00 en Suzuka (UTC+9) = 23:00 (día anterior) en El Salvador (UTC-6) 🇯🇵
    "2025-04-13": "09:00:00",  // 18:00 en Sakhir (UTC+3) = 09:00 en El Salvador (UTC-6) 🇧🇭
    "2025-04-20": "09:00:00",  // 18:00 en Jeddah (UTC+3) = 09:00 en El Salvador (UTC-6) 🇸🇦
    "2025-05-04": "13:00:00",  // 15:00 en Miami (UTC-4) = 13:00 en El Salvador (UTC-6) 🇺🇸
    "2025-05-18": "07:00:00",  // 15:00 en Imola (UTC+2) = 07:00 en El Salvador (UTC-6) 🇮🇹
    "2025-05-25": "07:00:00",  // 15:00 en Mónaco (UTC+2) = 07:00 en El Salvador (UTC-6) 🇲🇨
    "2025-06-01": "07:00:00",  // 15:00 en Barcelona (UTC+2) = 07:00 en El Salvador (UTC-6) 🇪🇸
    "2025-06-15": "12:00:00",  // 14:00 en Montreal (UTC-4) = 12:00 en El Salvador (UTC-6) 🇨🇦
    "2025-06-29": "07:00:00",  // 15:00 en Spielberg (UTC+2) = 07:00 en El Salvador (UTC-6) 🇦🇹
    "2025-07-06": "08:00:00",  // 15:00 en Silverstone (UTC+1) = 08:00 en El Salvador (UTC-6) 🇬🇧
    "2025-07-27": "07:00:00",  // 15:00 en Spa (UTC+2) = 07:00 en El Salvador (UTC-6) 🇧🇪
    "2025-08-03": "07:00:00",  // 15:00 en Hungaroring (UTC+2) = 07:00 en El Salvador (UTC-6) 🇭🇺
    "2025-08-31": "07:00:00",  // 15:00 en Zandvoort (UTC+2) = 07:00 en El Salvador (UTC-6) 🇳🇱
    "2025-09-07": "07:00:00",  // 15:00 en Monza (UTC+2) = 07:00 en El Salvador (UTC-6) 🇮🇹
    "2025-09-21": "05:00:00",  // 15:00 en Bakú (UTC+4) = 05:00 en El Salvador (UTC-6) 🇦🇿
    "2025-10-05": "01:00:00",  // 15:00 en Singapur (UTC+8) = 01:00 en El Salvador (UTC-6) 🇸🇬
    "2025-10-19": "13:00:00",  // 14:00 en Austin (UTC-5) = 13:00 en El Salvador (UTC-6) 🇺🇸
    "2025-10-26": "14:00:00",  // 14:00 en Ciudad de México (UTC-6) = 14:00 en El Salvador (UTC-6) 🇲🇽
    "2025-11-09": "11:00:00",  // 14:00 en Interlagos (UTC-3) = 11:00 en El Salvador (UTC-6) 🇧🇷
    "2025-11-22": "19:00:00",  // 17:00 en Las Vegas (UTC-8) = 19:00 en El Salvador (UTC-6) 🇺🇸
    "2025-11-30": "09:00:00",  // 18:00 en Lusail (UTC+3) = 09:00 en El Salvador (UTC-6) 🇶🇦
    "2025-12-07": "07:00:00",  // 17:00 en Yas Marina (UTC+4) = 07:00 en El Salvador (UTC-6) 🇦🇪
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
// Nombres de carreras para 2025
// ============================================================================
function getRaceName(index) {
    const names = [
        "Australia",
        "China",
        "Japón",
        "Baréin",
        "Arabia Saudita",
        "Estados Unidos (Miami)",
        "Italia (Imola)",
        "Mónaco",
        "España",
        "Canadá",
        "Austria",
        "Gran Bretaña",
        "Bélgica",
        "Hungría",
        "Países Bajos",
        "Italia (Monza)",
        "Azerbaiyán",
        "Singapur",
        "Estados Unidos (Austin)",
        "México",
        "Brasil",
        "EE UU (Las Vegas)",
        "Qatar",
        "Abu Dabi",
    ];

    // Verificación de seguridad
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
// Slider de imágenes
// ============================================================================
const imageList = [
    "assets/img_1.webp",
    "assets/img_2.webp",
    "assets/img_3.webp",
    "assets/img_4.webp",
    "assets/img_5.webp",
    "assets/img_6.webp",
];

let current = -1;
const sliderImage = document.getElementById("slider1");
const transitionTime = 500; // 500ms de animación
const displayTime = 4000; // 4 segundos visible

// Precargar imágenes
imageList.forEach((src) => {
    const img = new Image();
    img.src = src;
});

// ============================================================================
// Función del slider de imágenes
// ============================================================================
function runSimpleSlider() {
    // 1. Desvanecer la imagen actual (si ya hay una)
    sliderImage.classList.remove("visible");

    // 2. Esperar a que termine de desvanecerse
    setTimeout(() => {
        // 3. Cargar la siguiente imagen
        current = (current + 1) % imageList.length;
        sliderImage.src = imageList[current];

        // 4. Esperar a que la nueva imagen esté cargada
        sliderImage.onload = () => {
            // 5. Hacer que la nueva imagen aparezca
            sliderImage.classList.add("visible");

            // 6. Programar el siguiente ciclo
            setTimeout(runSimpleSlider, displayTime);
        };
    }, transitionTime);
}

// Iniciar el slider cuando la página carga
runSimpleSlider();
