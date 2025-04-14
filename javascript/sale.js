const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);

  let purchase = {
    price: parseInt (price),
    number: parseInt (number),
  };

  const newPurchase = purchases.findIndex((item) => item.price === purchase.price) // --1
  if(purchases.length < 1 || newPurchase === -1) { //--2
    purchases.push(purchase)
  } else {
    purchases[newPurchase].number += purchase.number; //--3
  }
  
  window.alert(`${display()}\n Subtotal ${subtotal()} Yen`);
  priceElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.price} yen ${purchase.number} cup/s`
  }).join("\n");
};

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.price * purchase.number 
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`Shipping fee is ${postage} Yen, The total is ${sum + postage} Yen`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}
function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}