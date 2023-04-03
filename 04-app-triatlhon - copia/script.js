

const form = document.getElementById("formulario-entrenamientos");
const table = document.getElementById("entrenamientos-table");
const tbody = document.getElementById("tabla-entrenamientos-body");
const resetButton = document.getElementById("reset-button");

// Array que almacena los entrenamientos
let entrenamientos = [];

// Función que agrega un entrenamiento al array y a la tabla
const agregarEntrenamiento = (
  actividad,
  fecha,
  duracion,
  distancia,
  ritmo,
  frecuenciaCardiacaMedia,
  velocidadMedia
) => {
  const entrenamiento = {
    actividad,
    fecha,
    duracion,
    distancia,
    ritmo,
    frecuenciaCardiacaMedia,
    velocidadMedia,
  };
  entrenamientos.push(entrenamiento);

  // Agregar fila a la tabla
  const row = tbody.insertRow();
  row.innerHTML = `
  <tr>
    <td>${actividad}</td>
    <td>${fecha}</td>
    <td>${duracion}</td>
    <td>${distancia}</td>
    <td>${velocidadMedia}</td>
    <td>${ritmo}</td>
    <td>${frecuenciaCardiacaMedia}</td> 
  </tr>
  `;
};

// Función que maneja el evento submit del formulario
const submitHandler = (event) => {
  event.preventDefault();

  const actividad = document.getElementById("actividad").value;
  const fecha = document.getElementById("fecha").value;
  const duracion = document.getElementById("duracion").value;
  const distancia = document.getElementById("distancia").value;
  const ritmo = document.getElementById("ritmo").value;
  const frecuenciaCardiacaMedia = document.getElementById(
    "frecuenciaCardiacaMedia"
  ).value;
  const velocidadMedia = document.getElementById("velocidadMedia").value;

  agregarEntrenamiento(
    actividad,
    fecha,
    duracion,
    distancia,
    ritmo,
    frecuenciaCardiacaMedia,
    velocidadMedia
  );

  // Limpiar formulario
  form.reset();
};

// Función que maneja el evento click del botón de reset
const resetHandler = () => {
  entrenamientos = [];
  tbody.innerHTML = "";
};

// Manejadores de eventos
form.addEventListener("submit", submitHandler);
resetButton.addEventListener("click", resetHandler);

// Event delegation para eliminar entrenamientos
table.addEventListener("click", (event) => {
  if (event.target.classList.contains("eliminar-entrenamiento")) {
    const row = event.target.parentNode.parentNode;
    const index = row.rowIndex; // Restar 1 porque el tbody tiene una fila vacía
    entrenamientos.splice(index, 1);
    tbody.removeChild(row);
  }
});

// Responsive design
const mediaQuery = window.matchMedia("(max-width: 90%)");
const graficoContainer = document.getElementById("grafico-container");

const toggleGrafico = (mediaQuery) => {
  if (mediaQuery.matches) {
    graficoContainer.style.display = "none";
  } else {
    graficoContainer.style.display = "block";
  }
};

toggleGrafico(mediaQuery); // Mostrar/ocultar el gráfico al cargar la página
mediaQuery.addListener(toggleGrafico); // Mostrar/ocultar el gráfico al cambiar la pantalla
