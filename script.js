// 1. Array de idiomas (se mantiene igual)
const idiomas = [
    { id: "es", prep: "de", months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] },
    { id: "ca", prep: "de", months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], days: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] },
    { id: "eu", prep: "",   months: ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"], days: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"] },
    { id: "pt", prep: "de", months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembre", "Dezembro"], days: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"] },
    { id: "en", prep: "of", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    { id: "it", prep: "di", months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"] },
    { id: "de", prep: "",   months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] }
];

// 2. RECUPERACIÓN CON JSON.PARSE
// Intentamos leer el objeto 'miRelojConfig'. Si no existe, usamos el objeto por defecto.
const datosGuardados = localStorage.getItem("miRelojConfig");
let config = datosGuardados ? JSON.parse(datosGuardados) : {
    idiomaI: 0,
    esModoOscuro: true,
    fechaVisible: true
};

// 3. GUARDADO CON JSON.STRINGIFY
function guardarConfig() {
    // Convertimos el objeto completo a una cadena de texto JSON
    localStorage.setItem("miRelojConfig", JSON.stringify(config));
}

function actualizarRelojYFecha() {
    const ahora = new Date();
    const lang = idiomas[config.idiomaI];

    // Aplicar estilos
    document.body.style.backgroundColor = config.esModoOscuro ? "#000000" : "#ffffff";
    document.body.style.color = config.esModoOscuro ? "#ffffff" : "#000000";
    
    // Reloj
    document.getElementById("reloj").textContent = ahora.toLocaleTimeString("es-ES", { hour12: false });

    // Fecha (Lógica simplificada para el ejemplo)
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

    const fElem = document.getElementById("fecha");
    fElem.textContent = textoFecha;
    fElem.style.display = config.fechaVisible ? "block" : "none";
}

// 4. EVENTOS
document.addEventListener("keydown", (e) => {
    const tecla = e.key.toLowerCase();
    
    if (tecla === "c") config.idiomaI = (config.idiomaI + 1) % idiomas.length;
    else if (tecla === "g") config.esModoOscuro = !config.esModoOscuro;
    else if (e.key === " ") config.fechaVisible = !config.fechaVisible;

    guardarConfig(); 
    actualizarRelojYFecha();
});

setInterval(actualizarRelojYFecha, 1000);
actualizarRelojYFecha();