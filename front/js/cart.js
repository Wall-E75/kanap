//Récupére les donnée du localstorage stockées via la page produit
function savePanier(cart) {
  localStorage.setItem("addToCart", JSON.stringify(cart));
}
/**
 * 
 * @returns renvoi
 */
function getPanier() {
  let cart = localStorage.getItem("addToCart");
  return cart ? JSON.parse(cart) : [];
}
// Variable pour utiliser les produits dans le localStorage
const products = getPanier();

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
  
  if (products.length > 0) {
    
    let htmlString = '';
    products.forEach((product) => {

      htmlString += `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
         <div class="cart__item__img">
            <img src="${product.image}" alt="Photographie d'un canapé">
         </div>
         <div class="cart__item__content">
           <div class="cart__item__content__description">
             <h2>${product.title? product.title: 'no title added'}</h2>
             <p>${product.colors}</p>
             <p>${product.total? product.total: 'no price added'} €</p>
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
    });
    sectionCartItem.innerHTML = htmlString;
  }
}
//console.log(products)
afficherCanape()

sectionCartItem.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteItem")) {
  const productId = e.target.closest(".cart__item").getAttribute("data-id");
  const productColor = e.target.closest(".cart__item").getAttribute("data-color");

  const removeProduct = products.filter((product) => {
    return product.id === productId && product.colors !== productColor
  });
  savePanier(removeProduct)

  
  // console.log(productColor);
  // console.log(productId)
  // console.log('===')
  // console.log(removeProduct)
  afficherCanape();
  window.location.reload()
}
});

console.log(localStorage)

const itemQuantityDomElements = document.querySelectorAll("input.itemQuantity");
itemQuantityDomElements.forEach((itemQuantityDomElement) => {
  itemQuantityDomElement.addEventListener("change", (e) => {
    const productId = e.currentTarget.closest(".cart__item").getAttribute("data-id");
    const productColor = e.currentTarget.closest(".cart__item").getAttribute("data-color");
    const cart = getPanier();
    const valeurActuel = parseInt(e.currentTarget.value);
    console.log(valeurActuel)
    if(!isNaN(valeurActuel)) {
      
      cart.forEach((product) => {
        if ((product.id === productId) && (product.colors === productColor)) {
          console.log('ca marche');
          product.quantity = valeurActuel;
        } else {
          console.log('ça ne marche pas mec !')
        }
      })
    }
    savePanier(cart);
})
})

/**
 * Calcul du total des articles. 
 */
const additionPrix = () => {
  spanTotalPrice
  if (products.length > 0) {
  let totalPrice = 0;
 
  products.forEach(product => {
    totalPrice += (product.price * product.quantity);
  });

  spanTotalPrice.textContent = totalPrice + " €";
  }
}

additionPrix();

//Appele la fonction pour afficher las produits du panier au moment du chargement de la page
//window.addEventListener("load", afficherCanape);