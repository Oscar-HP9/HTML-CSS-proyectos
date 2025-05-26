let price = 11.95; //11.95
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const dineroCliente = document.getElementById("cash");
const elementoCambio = document.getElementById("change-due");
const textoPrecio = document.getElementById("span-precio");
const botonComprar = document.getElementById("purchase-btn");
const spansDinero = document.querySelectorAll(".span-dinero");
const valores = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

class Registradora{
  constructor(price, cid){
    this.price = price;
    this.cid = cid;
    this.status = "OPEN";
  }

  cantidades(){
    let cant = [];
    this.cid.forEach( (moneda) => cant.push([moneda[0], Number((moneda[1] / valores[moneda[0]]).toFixed(2))]));
  }

  calcCambio(dinero) {
  const cambio = parseFloat((dinero - this.price).toFixed(2));
return cambio;
}

  dineroTotal(){
    let total = 0;
    this.cid.forEach(el => total += el[1]);
    return parseFloat(total.toFixed(2));
  }

  verCid(){
    spansDinero.forEach((span, index) => span.textContent = this.cid[index][1]);
  }

  verCambio(obj){
    elementoCambio.innerHTML = 
    `<p>Status: ${this.status}</p> `
    ;
    for (let i = this.cid.length - 1; i >= 0; i--){
      if(obj[this.cid[i][0]]){
        elementoCambio.innerHTML += `
        <p>${this.cid[i][0]}: $${obj[this.cid[i][0]]}</p>`
        ;
      }
    }
  }

  verPrecio(){
    textoPrecio.textContent = this.price;
  }

  limpiarCambio(){
    elementoCambio.innerHTML = "";
  }

  darCambio() {
    this.limpiarCambio();
    let dinero = parseFloat(dineroCliente.value);
    const cidCopia = this.cid.map(([nombre, cantidad]) => [nombre, cantidad]);
    let cambio = this.calcCambio(dinero);
    if(cambio < 0){
      alert("Customer does not have enough money to purchase the item");
      return;
    } else if(cambio === 0){
      elementoCambio.innerHTML = "No change due - customer paid with exact cash";
      return;
    }
    let cambioMonedas = {};
    let seCubrioCambio = false;
    console.log(cambio)
    for (let i = this.cid.length - 1; i >= 0; i--) {
      let valorMoneda = valores[this.cid[i][0]];
      let nombreMoneda = this.cid[i][0];

      while (valorMoneda <= cambio && this.cid[i][1] >= valorMoneda) {
        cambioMonedas[nombreMoneda] = cambioMonedas[nombreMoneda] || 0;
        cambioMonedas[nombreMoneda] += valorMoneda;
        this.cid[i][1] -= valorMoneda;

        this.cid[i][1] = parseFloat(this.cid[i][1].toFixed(2));
        cambio = parseFloat((cambio - valorMoneda).toFixed(2));

        if (cambio === 0) {
          seCubrioCambio = true;
          break;
        }
      }
    }

    if(!seCubrioCambio){
      this.status = "INSUFFICIENT_FUNDS";
      cambioMonedas = {};
      this.cid = cidCopia;
    } else if(seCubrioCambio && this.dineroTotal() === 0){
      this.status = "CLOSED";
    } else{
      this.status = "OPEN";
    }

    this.verCid();

    this.verCambio(cambioMonedas);

    console.log(cambioMonedas, seCubrioCambio, this.status);
    console.log(this.cid);
  }


}

const miReg = new Registradora(price,cid);

miReg.verPrecio();
botonComprar.addEventListener("click", miReg.darCambio.bind(miReg));