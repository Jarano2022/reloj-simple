// 1. Definición de Idiomas (Objeto centralizado)
const idiomas = [
    { id: "es", prep: "de", months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] },
    { id: "ca", prep: "de", months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], days: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] },
    { id: "eu", prep: "",   months: ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"], days: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"] },
    { id: "pt", prep: "de", months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembre", "Dezembro"], days: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"] },
    { id: "en", prep: "of", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    { id: "it", prep: "di", months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"] },
    { id: "de", prep: "",   months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] }
];

// 2. Carga de Configuración con JSON.parse
const default_config = {
    idiomaI: 0,
    esModoOscuro: true,
    fechaVisible: true,
    tutorialVisible: true
};

let config = JSON.parse(localStorage.getItem("reloj_params")) || default_config;

// 3. Funciones de persistencia y UI
function guardar() {
    localStorage.setItem("reloj_params", JSON.stringify(config));
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log("Error al activar pantalla completa: ", err);
        });
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function actualizarRelojYFecha() {
    const ahora = new Date();
    const lang = idiomas[config.idiomaI];

    // --- TEMAS ---
    document.body.style.backgroundColor = config.esModoOscuro ? "#000000" : "#ffffff";
    document.body.style.color = config.esModoOscuro ? "#ffffff" : "#000000";
    
    const tutorial = document.getElementById("tutorial");
    if (tutorial) {
        tutorial.style.display = config.tutorialVisible ? "block" : "none";
        tutorial.style.borderColor = config.esModoOscuro ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
        // Invertimos el color del botón X para que sea visible
        tutorial.querySelector("button").style.color = config.esModoOscuro ? "white" : "black";
    }

    // --- RELOJ ---
    const h = String(ahora.getHours()).padStart(2, "0");
    const m = String(ahora.getMinutes()).padStart(2, "0");
    const s = String(ahora.getSeconds()).padStart(2, "0");
    document.getElementById("reloj").textContent = `${h}:${m}:${s}`;

    // --- FECHA ---
    const nDiaSemana = ahora.getDay();
    const nDiaMes = ahora.getDate();
    const nMes = ahora.getMonth();
    const nAnio = ahora.getFullYear();

    let textoFecha;
    if (lang.id === "eu") {
        textoFecha = `${nAnio}ko ${lang.months[nMes]}ren ${nDiaMes}a, ${lang.days[nDiaSemana]}`;
    } else if (lang.id === "de") {
        textoFecha = `${lang.days[nDiaSemana]}, ${nDiaMes}. ${lang.months[nMes]} ${nAnio}`;
    } else {
        textoFecha = `${lang.days[nDiaSemana]}, ${nDiaMes} ${lang.prep} ${lang.months[nMes]} ${lang.prep} ${nAnio}`;
    }

    const fechaDiv = document.getElementById("fecha");
    fechaDiv.textContent = textoFecha;
    fechaDiv.style.display = config.fechaVisible ? "block" : "none";
}

// 4. Listeners de teclado
document.addEventListener("keydown", (e) => {
    const tecla = e.key.toLowerCase();
    
    if (tecla === "c") {
        config.idiomaI = (config.idiomaI + 1) % idiomas.length;
    } else if (tecla === "g") {
        config.esModoOscuro = !config.esModoOscuro;
    } else if (tecla === "f") {
        toggleFullscreen();
    } else if (e.key === " ") {
        e.preventDefault(); // Evita scroll con espacio
        config.fechaVisible = !config.fechaVisible;
    }

    guardar();
    actualizarRelojYFecha();
});

// Sobrescribimos el onclick del botón del tutorial para que actualice nuestro objeto JSON
document.querySelector("#tutorial button").onclick = function() {
    config.tutorialVisible = false;
    guardar();
    actualizarRelojYFecha();
};

// 5. Ciclo de vida
setInterval(actualizarRelojYFecha, 1000);
actualizarRelojYFecha();