const botonBuscar = document.getElementById("search-button");
const input = document.getElementById("search-input");
const pNombre = document.getElementById("creature-name");
const pId = document.getElementById("creature-id");
const pEspecialNombre = document.getElementById("special-name");
const pEspecialDesc = document.getElementById("special-desc");
const divTypes = document.getElementById("types");
const spanPeso = document.getElementById("weight");
const spanAltura = document.getElementById("height");
const spanHP = document.getElementById("hp");
const spanAtaque = document.getElementById("attack");
const spanDefensa = document.getElementById("defense");
const spanAtaqueEsp = document.getElementById("special-attack");
const spanDefensaEsp = document.getElementById("special-defense");
const spanVelocidad = document.getElementById("speed");
const divNombre = document.getElementById("nombre");
const urlCriaturas = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const urlInfoCriatura = "https://rpg-creature-api.freecodecamp.rocks/api/creature/"; // Se le debe agregar el id o el nombre del monstruo al final (usar id)

/*fetch("https://rpg-creature-api.freecodecamp.rocks/api/creatures")
.then(res => res.json())
.then(data => console.log(data))*/

fetch("https://rpg-creature-api.freecodecamp.rocks/api/creature/1")
.then(res => res.json())
.then(data => console.log(data))

//Función para quitar # al id y hacerlo número o poner la primer letra mayuscula y el resto minus
const idONombre = (str) => {
  const hashId = /^#\d+$/;
  const numeroId = /^\d+$/;

  if (hashId.test(str)) {
    return parseInt(str.slice(1), 10)
  } else if (numeroId.test(str)) {
    return parseInt(str, 10);
  } else {
    str = str.toLowerCase();
    const newStr = str[0].toUpperCase() + str.slice(1);
    return newStr;
  }
}

//Función para pedir las criaturas al API
const pedirCriaturas = async () => {
  try{
    const res = await fetch(urlCriaturas);
    const data = await res.json();
    return data;
  }catch(err){
    console.log("Ha ocurrido un error al intentar acceder a las criaturas", err);
    return null;
  }
}

//Función que busca si el valor ingresado (puede ser tipo num o str) esta en algún elemento del array de objetos, y lo devuelve, si no lo esta, devuelve undefined.
const existeEnCriaturas = (valor, array) => {
  let criatura = {};
  if(Number.isInteger(valor)){
    criatura = array.find(obj => obj.id === valor);
    return criatura;
  } else{
    criatura = array.find(obj => obj.name === valor);
    return criatura;
  }
}

// Función para obtener el objeto de la criatura pasando el id
const obtenerObjCriatura = async (id) => {
  try{
    const res = await fetch(`${urlInfoCriatura}${id}`);
  const data = await res.json();
  return data;
  }catch(err){
    console.log(`Ha ocurrido un error al intentar acceder a la criatura con id = ${id}`, err);
    return null;
  }
}

//Función vaciar elementos del obj al HTML
const vaciarObj = (obj) => {
  const {
    id,
    name,
    weight,
    height,
    special,
    stats,
    types
  } = obj;

  pNombre.textContent = name.toUpperCase();
  pId.textContent = `#${id}`;
  pEspecialNombre.textContent = special.name;
  pEspecialDesc.textContent = special.description;
  divTypes.innerHTML = types
  .map(obj => `<span class="${obj.name}">${obj.name}</span>`)
  .join("");
  spanPeso.textContent = weight;
  spanAltura.textContent = height;

  stats.forEach(obj => {
  switch (obj.name) {
    case "hp":
      spanHP.textContent = obj.base_stat;
      break;
    case "attack":
      spanAtaque.textContent = obj.base_stat;
      break;
    case "defense":
      spanDefensa.textContent = obj.base_stat;
      break;
    case "special-attack":
      spanAtaqueEsp.textContent = obj.base_stat;
      break;
    case "special-defense":
      spanDefensaEsp.textContent = obj.base_stat;
      break;
    case "speed":
      spanVelocidad.textContent = obj.base_stat;
      break;
  }
});

  
}

//Función principal
const obtenerInfo = async (valor) => {
  const valorTratado = idONombre(valor);
  const criaturasArr = await pedirCriaturas();
  if(criaturasArr === null){
    return;
  }
  const criatura = existeEnCriaturas(valorTratado, criaturasArr);
  if(criatura === undefined){
    alert("Creature not found");
    return;
  }
  const objCriatura = await obtenerObjCriatura(criatura.id);

  vaciarObj(objCriatura);
}

botonBuscar.addEventListener("click", () => {
  const valorIngresado = input.value;
  obtenerInfo(valorIngresado);
})


/*
const verTipos = async () => {
  const tipos = {};
  try{
    for(let i = 1; i<= 20; i++){
      const res = await fetch(`${urlInfoCriatura}${i}`);
      const data = await res.json();

      data.types.forEach(obj => {
        tipos[obj.name] = tipos[obj.name] || 0;
        tipos[obj.name]++;
      });
    }
    console.log(tipos);
  }catch(err){
    console.log("lol");
  }
}

verTipos()*/