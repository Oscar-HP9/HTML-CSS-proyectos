//Menu versiones
const radios = document.querySelectorAll('input[type="radio"]');
const celular = document.getElementById("celular");
const entradas = document.getElementById("entradas");

const versiones = () => {
  let cambio = false;
  for(let el of radios){
    if(el.checked && el.value === "entradas"){
      entradas.classList.remove("oculto");
      celular.classList.add("oculto");
      cambio = true;
    }else if(el.checked && el.value === "ambos"){
      celular.classList.remove("oculto");
      entradas.classList.remove("oculto");
      cambio = true;
    }else if(el.checked && el.value === "celular"){
      celular.classList.remove("oculto");
      entradas.classList.add("oculto");
      cambio = true;
    }
    if(cambio){
      return
    }
  }
}

//obtener texto del celular

const numeros = document.querySelectorAll(".num");
const pantalla = document.getElementById("pantalla");

let valorPantalla = "";

const obtenerValor = (e) => {
  if(e.target.textContent === "X"){
    pantalla.textContent = "";
    valorPantalla = "";
  } else if(e.target.textContent === "<="){
    let aux = valorPantalla.split("");
    aux.pop()
    valorPantalla = aux.join("");
    pantalla.textContent = valorPantalla;
  }else if(e.target.textContent === "ESP"){
    pantalla.textContent = "";
    valorPantalla += " ";
    pantalla.textContent = valorPantalla;
  }else {
    pantalla.textContent = "";
    valorPantalla += e.target.textContent;
    pantalla.textContent = valorPantalla;
  }
  return;
}

//validar

const input = document.getElementById("user-input");
const resultados = document.getElementById("results-div");
const botonRevisar = document.getElementById("check-btn");
const botonRevisarCel = document.getElementById("check-btn-2");

const validar = (valor) => {
  if(valor === ""){
    alert("Please provide a phone number");
    return;
  }
  const regex = /^1?\s*(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  if(regex.test(valor)){
    const divExito = document.createElement("div");
    divExito.textContent = `Valid US number: ${valor}`;
    divExito.classList.add("exito");
    resultados.prepend(divExito);
  }else{
    const divError = document.createElement("div");
    divError.textContent = `Invalid US number: ${valor}`;
    divError.classList.add("error");
    resultados.prepend(divError);
  }
  return;

  //const regex1 = /1 [\d]{3}[ -][\d]{3}[ -][\d]{4}/;
  //const regex2 = /1 ?\([\d]{3}\) ?[\d]{3}-[\d]{4}/;
  //const regex3 = /\(?[\d]{3}\)?-?[\d]{3}-?[\d]{4}/;
}

//limpiar

const botonLimpiar = document.getElementById("clear-btn");

const botonLimpiarCel = document.getElementById("clear-btn-2");

const limpiar = () => {
  resultados.innerHTML = "";
};

//añadir funcionalidad al celular revisar y limpiar

botonLimpiarCel.addEventListener("click", limpiar);

botonLimpiar.addEventListener("click", limpiar);

botonRevisar.addEventListener("click", () => {
  const valor = input.value;
  input.value = "";
  validar(valor);
});

botonRevisarCel.addEventListener("click", () => {
  const valor = pantalla.textContent;
  pantalla.textContent = "";
  valorPantalla = "";
  validar(valor);
});

input.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    const valor = input.value;
    input.value = "";
    validar(valor);
  }
});

numeros.forEach(numero => {
  numero.addEventListener("click", obtenerValor)
});

radios.forEach(radio => {
  radio.addEventListener("change", versiones);
});
