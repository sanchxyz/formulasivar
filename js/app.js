/**
 * ============================================================================
 * FORMULA SIVAR - LOGIC APP
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initCardSlider();
    renderCalendar(); // Moved from temp-2026.html
});




/* =========================================
   ANIMACIONES LOTTIE (OPTIMIZADAS)
   ========================================= */

// Configuración de las animaciones
const lottieConfigs = [
    {
        id: 'icon-anim-1',
        path: 'assets/animations/plane_fly.json',
        speed: 0.4
    },
    {
        id: 'race-icon-anim',
        path: 'assets/animations/star medal.json',
        speed: 0.3
    },
    {
        id: 'icon-anim-2',
        path: 'assets/animations/2 users ai.json',
        speed: 0.3
    },
    {
        id: 'podcast-anim',
        path: 'assets/animations/microphone.json',
        speed: 0.7
    }
];

// Observer para pausar/reproducir según visibilidad
const lottieObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Obtenemos la instancia de animación guardada en el elemento DOM
        const animation = entry.target.lottieInstance;
        if (!animation) return;

        if (entry.isIntersecting) {
            animation.play();
        } else {
            animation.pause();
        }
    });
}, { threshold: 0.1 }); // Se activa cuando al menos el 10% es visible

// Inicializar animaciones
lottieConfigs.forEach(config => {
    const container = document.getElementById(config.id);
    if (!container) return; // Evitar errores si el elemento no existe

    const anim = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: false, // ¡Importante! No auto-iniciar hasta que el observer lo diga
        path: config.path
    });

    anim.setSpeed(config.speed);

    // Guardamos la referencia de la animación en el propio elemento HTML para acceder luego
    container.lottieInstance = anim;

    // Empezamos a observar
    lottieObserver.observe(container);
});





/* ============================================================================
   1. CONFIGURACIÓN DE DATOS (FUENTE ÚNICA DE VERDAD)
   ============================================================================ 
   Aquí defines todo. Si cambia una fecha, solo la tocas aquí.
*/
window.SEASON_SCHEDULE = [
    { name: "Cadillac Livery", date: "2026-02-08", time: "17:30:00", customImagePath: "assets/images/tracks/cadillac_livery/portada_cadillac_livery_.webp", folderPath: "assets/images/tracks/cadillac_livery/", imageFiles: ["cadillac_1.jpg", "cadillac_2.jpg", "cadillac_3.jpg", "cadillac_4.jpg", "cadillac_5.jpg", "cadillac_6.jpg", "cadillac_7.jpg"], longDescription: "Primera reunión del año con la comunidad, en la que tuvimos la oportunidad de presenciar la revelación de la livery del equipo Cadillac, presentada durante el Super Bowl. El encuentro se llevó a cabo en Bendita Burger y contó, además, con la grata asistencia de Nestlé." },
    { name: "Australia", date: "2026-03-08", time: "00:00:00", customImagePath: "assets/images/tracks/australia/track.webp", folderPath: "assets/images/tracks/australia/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Australia en Albert Park es el vibrante inicio de la temporada. Conoce la historia de este circuito semi-permanente, los desafíos únicos que presenta a los pilotos y las expectativas para una carrera llena de giros inesperados. Descubre la atmósfera festiva de Melbourne que rodea este emocionante evento." },
    { name: "China", date: "2026-03-15", time: "01:00:00", customImagePath: "assets/images/tracks/china/track.webp", folderPath: "assets/images/tracks/china/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El regreso del Gran Premio de China al Circuito Internacional de Shanghái marca un hito. Explora las características técnicas de esta pista, famosa por su larga recta y la desafiante curva caracol. Analiza las estrategias de carrera que los equipos suelen emplear y el impacto de su retorno al calendario." },
    { name: "Japón", date: "2026-03-29", time: "23:00:00", customImagePath: "assets/images/tracks/japon/track.webp", folderPath: "assets/images/tracks/japon/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Japón en Suzuka es uno de los favoritos de pilotos y aficionados, conocido por su diseño en forma de '8' y sus curvas de alta velocidad. Sumérgete en la rica historia de esta carrera, los momentos icónicos que ha producido y lo que hace a Suzuka una prueba definitiva de habilidad y coraje." },
    { name: "Baréin", date: "2026-04-12", time: "09:00:00", customImagePath: "assets/images/tracks/barein/track.webp", folderPath: "assets/images/tracks/barein/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Baréin ilumina el desierto con su espectáculo nocturno. Descubre el Circuito Internacional de Baréin en Sakhir, su diseño técnico y cómo las condiciones de la pista cambian entre el día y la noche. Conoce el papel de esta carrera en la apertura de la temporada y las emocionantes batallas que ofrece." },
    { name: "Arabia Saudita", date: "2026-04-19", time: "11:00:00", customImagePath: "assets/images/tracks/arabia_saudita/track.webp", folderPath: "assets/images/tracks/arabia_saudita/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Arabia Saudita en Jeddah Corniche es el circuito urbano más rápido del mundo. Explora la velocidad y el riesgo de sus curvas ciegas y su trazado junto al mar Rojo. Entiende los desafíos únicos que presenta a los pilotos y la estrategia necesaria para dominar esta pista de alta adrenalina." },
    { name: "EE.UU. (Miami)", date: "2026-05-03", time: "14:00:00", customImagePath: "assets/images/tracks/usa_miami/track.webp", folderPath: "assets/images/tracks/usa_miami/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Miami trae el glamour de la Fórmula 1 a Florida. Conoce el circuito temporal alrededor del Hard Rock Stadium, su atmósfera vibrante y cómo combina la alta velocidad con un toque de espectáculo americano. Descubre los puntos clave de adelantamiento y las celebridades que asisten a este evento." },
    { name: "Canadá", date: "2026-05-24", time: "12:00:00", customImagePath: "assets/images/tracks/canada/track.webp", folderPath: "assets/images/tracks/canada/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Canadá en el Circuito Gilles Villeneuve es famoso por su icónico 'Muro de los Campeones'. Sumérgete en la historia de esta carrera, su ubicación en la Isla de Notre Dame y cómo las chicanes y las zonas de DRS promueven adelantamientos emocionantes. Conoce la pasión de los aficionados canadienses." },
    { name: "Mónaco", date: "2026-06-07", time: "07:00:00", customImagePath: "assets/images/tracks/monaco/track.webp", folderPath: "assets/images/tracks/monaco/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Mónaco es la joya de la corona de la Fórmula 1, un circuito urbano sin margen para errores. Explora la estrechez de sus calles, el famoso túnel y la glamurosa atmósfera que lo rodea. Entiende por qué la clasificación es crucial aquí y cómo la habilidad del piloto se pone a prueba al límite." },
    { name: "España (Barcelona)", date: "2026-06-14", time: "07:00:00", customImagePath: "assets/images/tracks/espana_barcelona/track.webp", folderPath: "assets/images/tracks/espana_barcelona/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de España en el Circuit de Barcelona-Catalunya es una prueba familiar para los equipos, que lo usan para test. Conoce la evolución de su trazado, los puntos clave para el desarrollo del monoplaza y la importancia de la gestión de neumáticos. Descubre la calidez del público español y su pasión por la F1." },
    { name: "Austria", date: "2026-06-28", time: "07:00:00", customImagePath: "assets/images/tracks/austria/track.webp", folderPath: "assets/images/tracks/austria/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Austria en el Red Bull Ring es un circuito corto y rápido en los impresionantes paisajes de Estiria. Explora sus desniveles, las zonas de DRS y cómo fomenta adelantamientos. Conoce la historia de esta pista y la vibrante atmósfera creada por los aficionados, especialmente los de Red Bull." },
    { name: "Gran Bretaña", date: "2026-07-05", time: "08:00:00", customImagePath: "assets/images/tracks/gran_bretana/track.webp", folderPath: "assets/images/tracks/gran_bretana/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Gran Bretaña en Silverstone es la cuna de la Fórmula 1, un circuito con una rica historia y curvas legendarias. Sumérgete en la emoción de Copse, Maggotts y Becketts, y la pasión de los aficionados británicos. Descubre cómo la velocidad y la estrategia se combinan en este icónico trazado." },
    { name: "Bélgica", date: "2026-07-19", time: "07:00:00", customImagePath: "assets/images/tracks/belgica/track.webp", folderPath: "assets/images/tracks/belgica/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Bélgica en Spa-Francorchamps es famoso por su exigente Eau Rouge y su longitud. Explora la belleza de las Ardenas, los desafíos climáticos y cómo esta pista prueba la valentía de los pilotos. Conoce las batallas épicas que se han librado aquí y la importancia de la configuración del coche." },
    { name: "Hungría", date: "2026-07-26", time: "07:00:00", customImagePath: "assets/images/tracks/hungria/track.webp", folderPath: "assets/images/tracks/hungria/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Hungría en el Hungaroring es conocido como un 'karting gigante' por su trazado sinuoso y la dificultad para adelantar. Descubre la importancia de la clasificación, la gestión de neumáticos y cómo el calor del verano húngaro afecta a los pilotos y monoplazas. Explora la historia de este circuito." },
    { name: "Países Bajos", date: "2026-08-23", time: "07:00:00", customImagePath: "assets/images/tracks/paises_bajos/track.webp", folderPath: "assets/images/tracks/paises_bajos/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Países Bajos en Zandvoort se tiñe de naranja con la marea de aficionados. Conoce este circuito costero, sus peraltes y cómo el viento y la arena pueden influir en la carrera. Descubre el desafío de su trazado estrecho y los puntos clave para un rendimiento óptimo." },
    { name: "Italia (Monza)", date: "2026-09-06", time: "07:00:00", customImagePath: "assets/images/tracks/italia_monza/track.webp", folderPath: "assets/images/tracks/italia_monza/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Italia en Monza es el 'Templo de la Velocidad', con sus largas rectas y chicanes que exigen baja carga aerodinámica. Sumérgete en la rica historia de la Scuderia Ferrari en su casa, la pasión de los Tifosi y la emoción de una carrera donde la potencia pura es clave. Un clásico imperdible." },
    { name: "España (Madrid)", date: "2026-09-13", time: "07:00:00", customImagePath: "assets/images/tracks/espana_madrid/track.webp", folderPath: "assets/images/tracks/espana_madrid/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El nuevo Gran Premio de España en Madrid promete un espectáculo urbano inolvidable. Explora el diseño del circuito, su integración en la ciudad y las expectativas de una carrera que busca combinar la tradición de la F1 con la modernidad de la capital española. Descubre los desafíos y oportunidades de esta nueva cita." },
    { name: "Azerbaiyán", date: "2026-09-27", time: "05:00:00", customImagePath: "assets/images/tracks/azerbaiyan/track.webp", folderPath: "assets/images/tracks/azerbaiyan/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Azerbaiyán en Bakú es un circuito urbano que combina la velocidad extrema con secciones estrechas históricas. Conoce la famosa recta de 2.2 km, el desafío de la sección del castillo y cómo los muros castigan cualquier error. Analiza las estrategias de carrera y los Safety Cars que a menudo aparecen." },
    { name: "Singapur", date: "2026-10-11", time: "06:00:00", customImagePath: "assets/images/tracks/singapur/track.webp", folderPath: "assets/images/tracks/singapur/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Singapur en Marina Bay es la primera carrera nocturna de la F1, un espectáculo visual bajo las luces. Explora las condiciones de calor y humedad, el trazado desafiante y la necesidad de una concentración máxima. Descubre la atmósfera única de esta carrera urbana y los momentos dramáticos que ha ofrecido." },
    { name: "EE.UU. (Austin)", date: "2026-10-25", time: "13:00:00", customImagePath: "assets/images/tracks/usa_austin/track.webp", folderPath: "assets/images/tracks/usa_austin/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Estados Unidos en el Circuit of the Americas (COTA) en Austin, Texas, es famoso por su desafiante primera curva en subida y su diseño inspirado en clásicos europeos. Conoce los desniveles, las zonas de alta velocidad y cómo ofrece múltiples oportunidades de adelantamiento. Descubre la cultura texana que rodea el evento." },
    { name: "México", date: "2026-11-01", time: "14:00:00", customImagePath: "assets/images/tracks/mexico/track.webp", folderPath: "assets/images/tracks/mexico/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de México en el Autódromo Hermanos Rodríguez es famoso por su altitud, que afecta el rendimiento de los motores y la aerodinámica. Sumérgete en la vibrante 'F1ESTA' de la afición mexicana, el paso por el Foro Sol y los desafíos únicos que presenta esta pista. Conoce la pasión y el color de este evento." },
    { name: "Brasil", date: "2026-11-08", time: "11:00:00", customImagePath: "assets/images/tracks/brasil/track.webp", folderPath: "assets/images/tracks/brasil/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Brasil en Interlagos es legendario por sus finales épicos y su clima impredecible. Explora el trazado antihorario, los desniveles y cómo la lluvia puede cambiarlo todo. Conoce los momentos históricos que se han vivido aquí y la intensidad de las batallas por el campeonato en este circuito icónico." },
    { name: "EE.UU. (Las Vegas)", date: "2026-11-21", time: "23:00:00", customImagePath: "assets/images/tracks/usa_las_vegas/track.webp", folderPath: "assets/images/tracks/usa_las_vegas/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Las Vegas convierte el famoso Strip en un circuito de Fórmula 1, un espectáculo nocturno sin igual. Descubre el trazado, la velocidad en las largas rectas y cómo la opulencia de Las Vegas se fusiona con la emoción de la carrera. Explora los desafíos de un circuito urbano de alta velocidad en un entorno único." },
    { name: "Catar", date: "2026-11-29", time: "11:00:00", customImagePath: "assets/images/tracks/catar/track.webp", folderPath: "assets/images/tracks/catar/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Catar en el Circuito Internacional de Lusail es una carrera nocturna que desafía a los pilotos con su trazado rápido y las condiciones del desierto. Conoce la velocidad en las rectas, las curvas de alta energía y cómo el viento y la arena afectan la adherencia. Descubre la infraestructura de última generación del circuito." },
    { name: "Abu Dabi", date: "2026-12-06", time: "07:00:00", customImagePath: "assets/images/tracks/abu_dabi/track.webp", folderPath: "assets/images/tracks/abu_dabi/", imageFiles: ["track.webp", "img_01.webp", "img_02.webp"], longDescription: "El Gran Premio de Abu Dabi en Yas Marina es el espectacular cierre de la temporada, con su famoso hotel y el paso por el puerto deportivo. Explora el circuito, su combinación de curvas lentas y rápidas, y la transición del día a la noche. Conoce cómo esta carrera a menudo decide el campeonato y ofrece un final de temporada memorable." },
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
   3. MÓDULO DEL SLIDER (CINEMATIC FADE)
   ============================================================================ */
function initCardSlider() {
    const sliderContainer = document.getElementById('cinematic-slider');
    if (!sliderContainer) return;

    // Rutas de imágenes
    const cardImages = [
        "assets/images/gallery/img_0.webp",
        "assets/images/gallery/img_1.webp",
        "assets/images/gallery/img_2.webp",
        "assets/images/gallery/img_3.webp",
        "assets/images/gallery/img_4.webp",
        "assets/images/gallery/img_5.webp",
        "assets/images/gallery/img_6.webp",
    ];

    // 1. Generar elementos DOM
    cardImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'cinematic-slide';
        if (index === 0) img.classList.add('active'); // Activar la primera
        sliderContainer.appendChild(img);
    });

    // 2. Lógica de Rotación
    let currentIndex = 0;
    const slides = sliderContainer.querySelectorAll('.cinematic-slide');

    setInterval(() => {
        // Quitar active a la actual
        slides[currentIndex].classList.remove('active');

        // Calcular siguiente índice
        currentIndex = (currentIndex + 1) % slides.length;

        // Activar siguiente (el CSS maneja el fade y zoom)
        slides[currentIndex].classList.add('active');

    }, 4000); // Cambio cada 4 segundos
}




function renderCalendar() {
    const grid = document.getElementById("calendar-grid");
    if (!grid) return;

    // 1. NUEVO: Diccionario de imágenes (si quieres control manual)
    const raceImages = {
        "Cadillac Livery": "assets/images/tracks/cadillac_livery/track.webp",
        "Australia": "assets/images/tracks/australia/track.webp",
        "China": "assets/images/tracks/china/track.webp",
        "Japón": "assets/images/tracks/japon/track.webp",
        "Baréin": "assets/images/tracks/barein/track.webp",
        "Arabia Saudita": "assets/images/tracks/arabia_saudita/track.webp",
        "EE.UU. (Miami)": "assets/images/tracks/usa_miami/track.webp",
        "Canadá": "assets/images/tracks/canada/track.webp",
        "Mónaco": "assets/images/tracks/monaco/track.webp",
        "España (Barcelona)": "assets/images/tracks/espana_barcelona/track.webp",
        "Austria": "assets/images/tracks/austria/track.webp",
        "Gran Bretaña": "assets/images/tracks/gran_bretana/track.webp",
        "Bélgica": "assets/images/tracks/belgica/track.webp",
        "Hungría": "assets/images/tracks/hungria/track.webp",
        "Países Bajos": "assets/images/tracks/paises_bajos/track.webp",
        "Italia (Monza)": "assets/images/tracks/italia_monza/track.webp",
        "España (Madrid)": "assets/images/tracks/espana_madrid/track.webp",
        "Azerbaiyán": "assets/images/tracks/azerbaiyan/track.webp",
        "Singapur": "assets/images/tracks/singapur/track.webp",
        "EE.UU. (Austin)": "assets/images/tracks/usa_austin/track.webp",
        "México": "assets/images/tracks/mexico/track.webp",
        "Brasil": "assets/images/tracks/brasil/track.webp",
        "EE.UU. (Las Vegas)": "assets/images/tracks/usa_las_vegas/track.webp",
        "Catar": "assets/images/tracks/catar/track.webp",
        "Abu Dabi": "assets/images/tracks/abu_dabi/track.webp",
    };

    // 2. Diccionario de descripciones (el que ya tienes)
    window.raceDescriptions = {
        "Baréin": "El Circuito de Sakhir ilumina el desierto para abrir la nueva era de la F1.",
        "Cadillac Livery": "Presentacion de la Livery del monoplaza de Cadillac F1 Team",
        "Arabia Saudita": "Jeddah Corniche desafía a los pilotos en el circuito callejero más rápido.",
        "Australia": "Albert Park nos recibe con sol, lagos y la energía única de Melbourne.",
        "Japón": "Suzuka es la prueba definitiva de habilidad con sus legendarias curvas en 'S'.",
        "China": "El Circuito de Shanghai regresa con sus largas rectas y estrategia pura.",
        "EE.UU. (Miami)": "El Autódromo de Miami combina glamour, yates y velocidad alrededor del estadio.",
        "Imola": "El Enzo e Dino Ferrari respira historia en el corazón del Valle del Motor.",
        "Mónaco": "Las calles de Montecarlo no perdonan errores en la joya de la corona.",
        "España (Barcelona)": "El Circuit de Barcelona-Catalunya te espera con su trazado icónico.",
        "España (Madrid)": "El nuevo circuito urbano de Madrid promete emociones fuertes.",
        "Canadá": "El Gilles Villeneuve nos espera con su famoso 'Muro de los Campeones'.",
        "Austria": "El Red Bull Ring es corto, rápido y siempre garantiza adelantamientos.",
        "Gran Bretaña": "Silverstone, la cuna del deporte, nos recuerda por qué amamos las carreras.",
        "Hungría": "El Hungaroring es un karting gigante donde la clasificación lo es todo.",
        "Bélgica": "Spa-Francorchamps separa a los niños de los adultos en el mítico Eau Rouge.",
        "Países Bajos": "Zandvoort se tiñe de naranja en una pista estrecha y peraltada.",
        "Italia (Monza)": "Monza es el 'Templo de la Velocidad', pura potencia y frenadas al límite.",
        "Azerbaiyán": "Las calles de Bakú mezclan la velocidad extrema con la zona del castillo.",
        "Singapur": "Marina Bay brilla en la noche más física y calurosa del año.",
        "EE.UU. (Austin)": "El COTA en Texas nos regala desniveles, baches y batallas en la curva 1.",
        "México": "El Autódromo Hermanos Rodríguez vibra con la 'F1ESTA' más grande del mundo.",
        "Brasil": "Interlagos siempre nos regala finales épicos y clima impredecible.",
        "EE.UU. (Las Vegas)": "El Strip de Las Vegas convierte la carrera en el mayor espectáculo del planeta.",
        "Catar": "El Circuito de Lusail es una montaña rusa nocturna de alta velocidad.",
        "Abu Dabi": "Yas Marina cierra la temporada con fuegos artificiales y el campeón definitivo."
    };

    grid.innerHTML = "";

    SEASON_SCHEDULE.forEach((race, index) => {
        const raceCard = document.createElement("div");
        raceCard.className = "race-card";
        raceCard.dataset.raceIndex = index;

        // The default SVG background image (always present)
        const defaultSvgBackgroundSrc = "assets/icons/default_race_icon.svg";

        // Determine the optional main image source that overlays the SVG
        // Only use customImagePath provided by the user to avoid broken image icons from raceImages.
        let mainImageSrc = ""; // Initialize as empty

        if (race.customImagePath && race.customImagePath !== 'null') {
            mainImageSrc = race.customImagePath;
        }
        // If customImagePath is not provided, mainImageSrc remains empty,
        // and only the SVG background will be visible as the main image element won't be rendered.

        const desc = raceDescriptions[race.name] || `Prepárate para el Gran Premio de ${race.name}. Una cita imperdible de la temporada 2026.`;

        raceCard.innerHTML = `
            <div class="race-card-images">
                <img src="${defaultSvgBackgroundSrc}" alt="Default Background" class="race-default-background-image">
                ${mainImageSrc ? `<img src="${mainImageSrc}" alt="${race.name}" class="race-main-image" onerror="this.style.display='none'">` : ''}
            </div>
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