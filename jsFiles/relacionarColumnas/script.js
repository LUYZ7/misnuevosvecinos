// Variables globales
let connections = []; // Guardará las conexiones existentes
let draggingElement = null;
let selectedElement = null;

document.addEventListener("DOMContentLoaded", function () {
  const leftColumn = document.getElementById("left-column");
  const elements = Array.from(leftColumn.children);

  // Función para mezclar elementos usando el algoritmo de Fisher-Yates
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(elements); // Mezcla los elementos

  // Vaciar la columna y agregar los elementos en el nuevo orden
  elements.forEach((element) => leftColumn.appendChild(element));
});

const canvas = document.getElementById("gameCanvas");
const container = canvas.parentElement; // El div que contiene el canvas
function adjustCanvasSize() {
  // Ajusta el tamaño del canvas con respecto al div
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;

  // Redibuja las conexiones después de ajustar el tamaño
  drawConnections();
}

function getCenterCoordinates(element) {
  const rect = element.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect(); // Obtener las coordenadas del canvas
  return {
    x: rect.left - canvasRect.left + rect.width / 2, // Ajustar según las coordenadas del canvas
    y: rect.top - canvasRect.top + rect.height / 2, // Ajustar según las coordenadas del canvas
  };
}

// Dibujar todas las conexiones
function drawConnections() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  connections.forEach(({ start, end, color }) => {
    const { x: startX, y: startY } = getCenterCoordinates(start);
    const { x: endX, y: endY } = getCenterCoordinates(end);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  });
}

// Función para bloquear elementos correctamente enlazados
function lockElements(start, end) {
  start.classList.add("locked");
  start.setAttribute("draggable", "false");
  start.style.pointerEvents = "none";

  end.classList.add("locked");
  end.setAttribute("draggable", "false");
  end.style.pointerEvents = "none";
}

// Función para eliminar cualquier conexión existente de un elemento
function removeExistingConnection(element) {
  connections = connections.filter(
    (conn) => conn.start !== element && conn.end !== element
  );
}

// Función para conectar dos elementos
function connectElements(start, end) {
  if (start === end) return; // No permitir enlazar consigo mismo

  // Permitir solo conexiones entre un texto (SPAN) y una imagen (IMG)
  if (
    (start.tagName === "SPAN" && end.tagName === "IMG") ||
    (start.tagName === "IMG" && end.tagName === "SPAN")
  ) {
    // Eliminar cualquier conexión previa del mismo SPAN o IMG antes de crear una nueva
    removeExistingConnection(start);
    removeExistingConnection(end);

    // Verificar si la conexión es correcta
    const isCorrect =
      (start.id === end.alt || start.alt === end.id) &&
      !connections.some((conn) => conn.start === start && conn.end === end);

    // Agregar nueva conexión
    connections.push({
      start,
      end,
      color: isCorrect ? "green" : "red",
    });

    // Bloquear elementos si la conexión es correcta
    if (isCorrect) lockElements(start, end);

    drawConnections();
  }
}




// Eventos de drag and drop
document.addEventListener("dragstart", (e) => {
  if (
    (e.target.tagName === "SPAN" || e.target.tagName === "IMG") &&
    !e.target.classList.contains("locked")
  ) {
    draggingElement = e.target;
    e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", (e) => {
  draggingElement?.classList.remove("dragging");
  draggingElement = null;
});

document.addEventListener("dragover", (e) => e.preventDefault());

document.addEventListener("drop", (e) => {
  e.preventDefault();
  const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
  if (
    dropTarget &&
    (dropTarget.tagName === "SPAN" || dropTarget.tagName === "IMG") &&
    dropTarget !== draggingElement
  ) {
    connectElements(draggingElement, dropTarget);
  }
});

// Selección y conexión mediante clic
document.addEventListener("click", (e) => {
  if (
    (e.target.tagName === "SPAN" || e.target.tagName === "IMG") &&
    !e.target.classList.contains("locked")
  ) {
    if (selectedElement) {
      if (selectedElement !== e.target) {
        connectElements(selectedElement, e.target);
      }
      selectedElement.classList.remove("selected");
      selectedElement = null;
    } else {
      selectedElement = e.target;
      selectedElement.classList.add("selected");
    }
  }
});

// Llamar a la función para ajustar el tamaño del canvas
const section12 = document.getElementById("section12");
const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    // Sección 12 está activa
    adjustCanvasSize();
  }
});
observer.observe(section12);

//----------------------------------------------------------------------------------------

document.querySelectorAll(".iconlsmbutton, .iconlsmbutton img").forEach((element) => {
  element.addEventListener("dragstart", (event) => {
    event.preventDefault(); // Evita que el botón o la imagen se pueda arrastrar
  });
});


document.querySelectorAll(".iconlsmbutton").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation(); // Evita que el clic en el botón seleccione el texto
  });
});



document.addEventListener("dragstart", (e) => {
  // Verifica si el elemento arrastrado es un span o img y no es un botón
  if (
    (e.target.tagName === "SPAN" || e.target.tagName === "IMG") &&
    !e.target.closest(".iconlsmbutton") && // Evita arrastrar botones
    !e.target.classList.contains("locked")
  ) {
    draggingElement = e.target;
    e.target.classList.add("dragging");
  } else {
    e.preventDefault(); // Bloquea el arrastre de elementos no deseados
  }
});

//-------------------------------------------------------------------------------------------

// Si hay cambios en el tamaño del contenedor, vuelve a ajustar el canvas
window.addEventListener("resize", adjustCanvasSize);

// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function hideAll(elements) {
    elements.forEach(el => {
      el.style.display = "none";
    });
  }

  function showElements(elements) {
    elements.forEach(el => {
      el.style.display = "block";
    });
  }

  function selectRandomPairs() {
    const allTexts = Array.from(document.querySelectorAll("#left-column .relacionarTexto"));
    const allImages = Array.from(document.querySelectorAll("#right-column .character"));

    console.log("Total de enunciados encontrados:", allTexts.length);
    console.log("Total de imágenes encontradas:", allImages.length);

    if (allTexts.length === 0 || allImages.length === 0) {
      console.warn("No se encontraron enunciados o imágenes en el DOM.");
      return;
    }

    // Filtrar solo los pares correctos usando el atributo `alt` en imágenes
    let validPairs = allTexts
      .map(text => {
        const matchingImage = allImages.find(img => img.alt.trim() === text.id.trim()); // Coincidencia por alt e id
        if (matchingImage) {
          console.log(`Par válido: "${text.textContent.trim()}" -> "${matchingImage.alt}"`);
        }
        return matchingImage ? { text, image: matchingImage } : null;
      })
      .filter(pair => pair !== null);

    console.log("Total de pares válidos:", validPairs.length);

    if (validPairs.length < 4) {
      console.warn("No hay suficientes pares válidos para mostrar.");
      return;
    }

    // Barajar y seleccionar solo 3 pares
    validPairs = shuffleArray(validPairs).slice(0, 4);

    // Obtener los elementos seleccionados
    const selectedTexts = validPairs.map(pair => pair.text);
    const selectedImages = validPairs.map(pair => pair.image);

    // Ocultar todos los elementos y luego mostrar solo los seleccionados
    hideAll(allTexts);
    hideAll(allImages);
    showElements(selectedTexts);
    showElements(selectedImages);
  }

  selectRandomPairs(); // Ejecutar al cargar la página
});



