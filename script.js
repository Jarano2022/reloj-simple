function diaDeLaSemana() {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const ahora = new Date();
  return dias[ahora.getDay()];
}

function Mes() {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const ahora = new Date();
  return meses[ahora.getMonth()];
}

function actualizarReloj() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const segundos = String(ahora.getSeconds()).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  const diaSemana = diaDeLaSemana();
  const mes = Mes();
  const anio = ahora.getFullYear();
  const fecha = ` ${diaSemana}, ${dia} de ${mes} de ${anio}`;
  const reloj = `${horas}:${minutos}:${segundos}`;

  document.getElementById("fecha").textContent = fecha;

  document.getElementById("reloj").textContent = reloj;
}

setInterval(actualizarReloj, 1000);
actualizarReloj();

document.addEventListener('keydown', function(event) {
  if (event.key === 'space') {
  const fecha = document.getElementById('fecha').style.display;
  if (fecha === 'none') {
    document.getElementById('fecha').style.display = 'block';
  } else {
    document.getElementById('fecha').style.display = 'none';
  }
}
});
