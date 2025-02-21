let resultado = document.getElementById("resultadosSec2");

let aciertosDiv = document.createElement("div");
aciertosDiv.setAttribute("id", "aciertosDiv");
let aciertos = document.createElement("p");
aciertos.setAttribute("id", "aciertos");
let espacio = document.createElement("br");
aciertos.textContent = "Aciertos: ";

// Aqui comienza la creación y añadir boton de aciertos
let botonAciertos = document.createElement("button");
botonAciertos.classList.add("iconlsmbutton");
botonAciertos.classList.add("verificar");
botonAciertos.setAttribute("id", "modalAciertos");
let imagenSeñas = document.createElement("img");
imagenSeñas.setAttribute("src", "./imgs/manitas.png");
imagenSeñas.setAttribute(
  "alt",
  "Icono clickeable para traducción a lengua de señas mexicana"
);

botonAciertos.appendChild(imagenSeñas);
aciertosDiv.appendChild(botonAciertos);
aciertosDiv.appendChild(aciertos);
resultado.appendChild(aciertosDiv);
resultado.appendChild(espacio);

let erroresDiv = document.createElement("div");
erroresDiv.setAttribute("id", "erroresDiv");
let errores = document.createElement("p");
errores.setAttribute("id", "errores");
errores.textContent = "Errores: ";

let botonErrores = document.createElement("button");
botonErrores.classList.add("iconlsmbutton");
botonErrores.classList.add("verificar");
botonErrores.setAttribute("id", "modalErrores");

let imgSenas = document.createElement("img");
imgSenas.setAttribute("src", "./imgs/manitas.png");
imgSenas.setAttribute(
  "alt",
  "Icono clickeable para traducción a lengua de señas mexicana"
);
botonErrores.appendChild(imgSenas);
erroresDiv.appendChild(botonErrores);
erroresDiv.appendChild(errores);

resultado.appendChild(erroresDiv);

let bravoDiv = document.createElement("div");
bravoDiv.setAttribute("id", "bravoDiv");
let bravo = document.createElement("p");
bravo.setAttribute("id", "bravo");
bravo.textContent = "¡Bravo, muy bien!";

let botonBravo = document.createElement("button");
botonBravo.classList.add("iconlsmbutton");
botonBravo.classList.add("verificar");
botonBravo.setAttribute("id", "modalLoHicisteBien");

let img = document.createElement("img");
img.setAttribute("src", "./imgs/manitas.png");
img.setAttribute(
  "alt",
  "Icono clickeable para traducción a lengua de señas mexicana"
);
botonBravo.appendChild(img);
bravoDiv.appendChild(botonBravo);
bravoDiv.appendChild(bravo);

resultado.appendChild(bravoDiv);

resultado.style.display = "none";

function desactivar(div, palabra) {
  console.log(div, "diveee");
  let word = "";
  div.childNodes.forEach((letra) => {
    word += letra.textContent;
  });
  console.log(word, "pepe");
  let acomodado = word.toString();

  if (acomodado == palabra) {
    if (div.parentNode.lastChild.previousSibling.className == "resetButton") {
      div.parentNode.lastChild.previousSibling.disabled = true;
    }
    div.setAttribute("class", "correct");
    div.getAttribute("onclick") == null;
    if (div.classList.contains("clase2")) {
      div.classList.remove("incorrect");
    }
    return 1;
  } else if (acomodado == "") {
    return 0;
  } else {
    console.log("error");
    div.setAttribute("class", "incorrect");
    return 0;
  }
}
function verificarAcomodo() {
  resultado.appendChild(erroresDiv);
  let aciertos = document.getElementById("aciertos");
  let aciertosDiv = document.getElementById("aciertosDiv");
  let errores = document.getElementById("errores");
  let errorDiv = document.getElementById("erroresDiv");
  let bravoDivision = document.getElementById("bravoDiv");
  aciertosDiv.style.display = "none";
  errorDiv.style.display = "none";
  bravoDivision.style.display = "none";
  aciertos.textContent = "";
  errores.textContent = "";
  console.log("me picaste");
  let javier = document.getElementById("spaces1");
  let elena = document.getElementById("spaces2");
  let maria = document.getElementById("spaces3");
  let diana = document.getElementById("spaces4");
  let carlos = document.getElementById("spaces5");
  let array = [javier, elena, maria, diana, carlos];
  let palabras = ["Javier", "Elena", "Maria", "Diana", "Carlos"];
  let contador = 0;
  for (let i = 0; i <= array.length - 1; i++) {
    contador += desactivar(array[i], palabras[i]);
  }
  if (contador > 0 && contador < 5) {
    aciertos.textContent = "Aciertos: " + contador.toString();
    aciertosDiv.style.display = "flex";
  }
  if (contador != 5) {
    errores.textContent = "Errores: " + (5 - contador).toString();
    errores.style.display = "flex";
    errorDiv.style.display = "flex";
  }
  if (contador == 5) {
    bravoDivision.style.display = "flex";
  }
  resultado.style.display = "flex";

  // <button class="iconlsmbutton verificar" id="modalverificarRespuestas">
  //           <img
  //             src="./imgs/manitas.png"
  //             alt="Icono clickeable para traducción a lengua de señas mexicana"
  //           />
  //         </button>
}
