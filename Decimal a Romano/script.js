const input = document.getElementById("number");
const boton = document.getElementById("convert-btn");
const output = document.getElementById("output");
let error = false;

const entradasInvalidas = (num) =>{
  error = false;
  if(isNaN(num)){
    output.textContent = "Please enter a valid number";
    output.classList.remove("oculto");
    error = true;
  } else if(num <= 0){
    output.textContent = "Please enter a number greater than or equal to 1";
    output.classList.remove("oculto");
    error = true;
  } else if(num >= 4000){
    output.textContent ="Please enter a number less than or equal to 3999";
    output.classList.remove("oculto");
    error = true;
  }
  return;
};

const conversor = (num) => {
  const numArr = [...String(num)].reverse();
  let romano = ""
  while(numArr.length){
    romano += numerosRomanos[numArr.length - 1][numArr[numArr.length - 1]];
    numArr.pop()
  }
  return romano
};

const miFuncion = () => {
  const inputNum = parseInt(input.value);
  entradasInvalidas(inputNum);
  if(error){
    return;
  }
  output.textContent = conversor(inputNum);
  output.classList.remove("oculto");
};

const numerosRomanos = [
  {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI",
    "7": "VII",
    "8": "VIII",
    "9": "IX",
    "0": ""
  },
  {
    "1": "X",
    "2": "XX",
    "3": "XXX",
    "4": "XL",
    "5": "L",
    "6": "LX",
    "7": "LXX",
    "8": "LXXX",
    "9": "XC",
    "0": ""
  },
  {
    "1": "C",
    "2": "CC",
    "3": "CCC",
    "4": "CD",
    "5": "D",
    "6": "DC",
    "7": "DCC",
    "8": "DCCC",
    "9": "CM",
    "0": ""
  },
  {
    "1": "M",
    "2": "MM",
    "3": "MMM"
  }
]

boton.addEventListener("click", miFuncion);
input.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    miFuncion();
  }
});