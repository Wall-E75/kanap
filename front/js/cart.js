//Récupére les donnée du localstorage stockées via la page produit
function savePanier(cart) {
  localStorage.setItem("addToCart", JSON.stringify(cart));
}

function getPanier() {
  let cart = localStorage.getItem("addToCart");
  return cart ? JSON.parse(cart) : [];
}

//console.log(getPanier());

//const getCanape = async () => {
  //try {
    //const url = await fetch(`http://localhost:3000/api/products`);
    //const reponse = await url.json();
    //return reponse;
  //} catch (erreur) {
    //console.error("Une erreur s'est produite lors de l'importation des canape")
  //}
//}

const products = getPanier();
// console.log({products})
//Mise en relation avec les elements du DOM
const sectionCartItem = document.getElementById("cart__items");
const spanTotalQuantity = document.getElementById("totalQuantity");
const spanTotalPrice = document.getElementById("totalPrice");
const firstNameError = document.getElementById("firstNameErrorMsg");
const imageDomElement = document.querySelector('.cart__item__img');


/**
 * La fonction afficherCanape permet d'afficher les canapés du localStorage 
 * à l'intérieur de la page Panier lors du chargement de la page
 */
const afficherCanape = async () => {
  // sectionCartItem.innerHTML = 'Wali silla'
  if (products.length > 0) {
    // const canapeData = await getCanape();
    // console.log(products.length > 0, canapeData)
    let htmlString = ''
    products.forEach((product) => {
      htmlString += `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
         <div class="cart__item__img">
            <img src="${product.image}" alt="Photographie d'un canapé">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${product.title? product.title: 'no title added'}</h2>
             <p>${product.colors}</p>
             <p>${product.price? product.price: 'no price added'} €</p>
           </div>
           <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
               <p>Quantité :</p>
               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
             </div>
             <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
             </div>
           </div>
         </div>
       </article>`
    })
    sectionCartItem.innerHTML = htmlString
  }
}
console.log(products)
afficherCanape()


const deleteItemDomElement = document.querySelector('.deleteItem');
sectionCartItem.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteItem")) {
  const products = getPanier();
  const productId = e.target.closest(".cart__item").getAttribute("data-id");
  const productColor = e.target.closest(".cart__item").getAttribute("data-color");

  const removeProduct = products.filter((product) => (product.id !== productId) && (product.color !== productColor));
  savePanier(removeProduct)
  
  console.log(productColor);
  console.log(productId)
  afficherCanape();
}
});

console.log(localStorage)

//const noms = products.map(product => product.title);
const addiitionPrix = products.map(product => product.price * product.quantity);

console.log(addiitionPrix);


const itemQuantityDomElements = document.querySelectorAll("input.itemQuantity");
itemQuantityDomElements.forEach(itemQuantityDomElement => {
  itemQuantityDomElement.addEventListener("change", (e) => {
    const productId = e.currentTarget.closest(".cart__item").getAttribute("data-id");
    const productColor = e.currentTarget.closest(".cart__item").getAttribute("data-color");
    const cart = getPanier();
    const valeurActuel = parseInt(e.currentTarget.value);
    console.log(valeurActuel)
    if(!isNaN(valeurActuel)) {
      
      cart.forEach((product) => {
        if ((product.id === productId) && (product.color === productColor)) {
          product.quantity = valeurActuel;
        }
      })
    }
    savePanier(cart);
})
})


//const modifQuantity = () => {
  //const dataId  = itemQuantityDomElement.closest(".cart__Item");
//}

//console.log(itemQuantityDomElement.closest(".cart__item"))


/*const afficherCanape = async () => {
  try {
      const getP = await getPanier();
      const sectionCartItem = document.getElementById("cart__items");
      const spanTotalQuantity = document.getElementById("totalQuantity");
      const spanTotalPrice = document.getElementById("totalPrice");
      const firstNameError = document.getElementById("firstNameErrorMsg");

      //sectionCartItem.innerHTML = ''; //Efface le contenu existant avant d'ajouter les produits

      let totalQuantity = 0;
      let totalPrice = 0;

      for (let product of getP) { 
        // Recupére les détails complets depuis l'API
        const canapeData = await getCanape(product.id);
        console.log('Product:', product);
        console.log('CanapeData:', canapeData);
        if (canapeData) {
          sectionCartItem.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
          <div class="cart__item__img">
            <img src="../images/${canapeData.imgUrl}" alt="${canapeData.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${canapeData.name}</h2>
              <p>${canapeData.color}</p>
              <p>${canapeData.price}</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
        }
        // Met à jour le total de la quantité et du prix
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    spanTotalQuantity.innerHTML = totalQuantity;
    spanTotalPrice.innerHTML = totalPrice + " €";
  } catch (erreur) {
    console.error("Une erreur s'est produite lors de l'affichage des produits")
  }

};
//Appele la fonction pour afficher las produits du panier au moment du chargement de la page
window.addEventListener("load", afficherCanape);*/