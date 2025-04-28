const pal = document.getElementById("pal");
const pregunta = document.getElementById("pregunta");
const explic = document.getElementById("explic");
const input = document.getElementById("text-input");
const boton = document.getElementById("check-btn");
const resultado = document.getElementById("result");
let seMuestraExplic = false;

function mostrarExplic(){
  if(seMuestraExplic){
    explic.classList.add("oculto");
    seMuestraExplic = false
    pregunta.innerHTML = '¿Que es un palíndromo? <i class="fas fa-chevron-right"></i>';
    return;
  } else {
    explic.classList.remove("oculto");
    seMuestraExplic = true
    pregunta.innerHTML = '¿Que es un palíndromo? <i class="fas fa-chevron-left"></i>';
  }
  return;
}

function limpiarCadena(str){
  if(str === ""){
    alert("Please input a value");
    return;
  }
  const regex = /[\W_]/g;
  
  return str.replace(regex, "").toLowerCase();
}

function invertirCadena(str){
  let long = str.length - 1;
  let index = 0;
  let inversion = [];
  while(long >= 0){
    inversion[index] = str[long];
    index += 1;
    long -= 1;
  }
  return inversion.join("");
}

function compararCadenas(){
  const original = input.value;
  const string = limpiarCadena(input.value);
  const stringInv = invertirCadena(string);
  if(string === stringInv){
    resultado.innerText = `${original} es un palíndromo`;
  } else{
    resultado.innerText = `${original} no es un palíndromo`;
  }
  resultado.style.display = "block";
}

pal.addEventListener("click", mostrarExplic);
boton.addEventListener("click", compararCadenas);