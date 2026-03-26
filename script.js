const mesesItaliano = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const mesesEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const mesesPortugues = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const mesesEuskera = ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"];
const mesesCatalan = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
const mesesCastellano = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const mesesAleman = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

const diasCastellano = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const diasCatalan = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
const diasEuskera = ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"];
const diasEnglish = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const diasItaliano = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
const diasPortugues = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const diasAleman = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

let idiomaI = 0;
let esModoOscuro = true;

function actualizarRelojYFecha() {
    const ahora = new Date();
    
    // --- ESTILOS DE TEMA ---
    document.body.style.transition = "all 0.3s ease";
    if (esModoOscuro) {
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#ffffff";
        document.getElementById("tutorial").style.borderColor = "rgba(255, 255, 255, 0.8)"; // Fondo semitransparente para el tutorial en modo oscuro
    } else {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#000000"; // Letras negras en modo claro
        document.getElementById("tutorial").style.borderColor = "rgba(0, 0, 0, 0.8)"; // Fondo semitransparente para el tutorial en modo claro
    }

    // --- RELOJ ---
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");
    document.getElementById("reloj").textContent = `${horas}:${minutos}:${segundos}`;

    // --- FECHA E IDIOMAS ---
    const listaMeses = [mesesCastellano, mesesCatalan, mesesEuskera, mesesPortugues, mesesEnglish, mesesItaliano, mesesAleman];
    const listaDias = [diasCastellano, diasCatalan, diasEuskera, diasPortugues, diasEnglish, diasItaliano, diasAleman];
    const preposiciones = ["de", "de", "", "de", "of", "di", ""];
    const ids = ["es", "ca", "eu", "pt", "en", "it", "de"];

    const meses = listaMeses[idiomaI];
    const dias = listaDias[idiomaI];
    const prep = preposiciones[idiomaI];
    const id = ids[idiomaI];

    const nDiaSemana = ahora.getDay();
    const nDiaMes = ahora.getDate();
    const nMes = ahora.getMonth();
    const nAnio = ahora.getFullYear();

    let textoFecha;
    if (id === "eu") {
        textoFecha = `${nAnio}ko ${meses[nMes]}ren ${nDiaMes}a, ${dias[nDiaSemana]}`;
    } else if (id === "de") {
        textoFecha = `${dias[nDiaSemana]}, ${nDiaMes}. ${meses[nMes]} ${nAnio}`;
    } else {
        textoFecha = `${dias[nDiaSemana]}, ${nDiaMes} ${prep} ${meses[nMes]} ${prep} ${nAnio}`;
    }

    document.getElementById("fecha").textContent = textoFecha;
}

document.addEventListener("keydown", function (event) {
    const tecla = event.key.toLowerCase();
    
    if (tecla === "c") {
        idiomaI = (idiomaI + 1) % 7;
        actualizarRelojYFecha();
    } 
    else if (tecla === "g") {
        esModoOscuro = !esModoOscuro;
        actualizarRelojYFecha();
    }
    else if (event.key === " ") {
        const f = document.getElementById("fecha");
        f.style.display = (window.getComputedStyle(f).display === "none") ? "block" : "none";
    }
});

// Inicio
setInterval(actualizarRelojYFecha, 1000);
actualizarRelojYFecha();