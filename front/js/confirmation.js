const url = new URL(window.location.href); //recupere l'url actuelle
console.log('URL =>', url);
const params = new URLSearchParams(url.search); //recupere les parametres de l'url
console.log('PArams =>', params);
const orderId = params.get("orderId"); //recupere l'orderID dans les parametres de l'url
console.log(orderId); 
const totalPrice = params.get("totalPrice"); //recupere le totalPrice dans les parametres de l'url
console.log(totalPrice);

const spanOrderIdDomELem = document.getElementById('orderId'); //pointe le span orderId dans le DOM
spanOrderIdDomELem.innerHTML = orderId; //insere l'orderId dans le span orderId