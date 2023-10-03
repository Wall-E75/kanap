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
  //window.addEventListener("load", afficherCanape);
  window.location.reload()
}
});

console.log(localStorage);


/**
 * Utilise un écouteur d'evenement (change) afin de mettre à jour plusieurs élément lors du changement de quantité :
 * Le localStorage : la quantité et le total affiché affiche le même résultat que sur la page.
 * Fais une opération pour mettre à jour le résultat
 */
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
          product.total = product.quantity * product.price;
        } else {
          console.log('ça ne marche pas mec !')
        }
      })
    }
    savePanier(cart);
    window.location.reload();
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


/*Récupération du champ de saisie*/

const baliseCommander = document.getElementById("order");  
  baliseCommander.addEventListener("click",(e) => {
    const baliseNom = document.getElementById("lastName");
    const balisePrenom = document.getElementById("firstName");
    const baliseAdresse = document.getElementById("address");
    const baliseVille = document.getElementById("city");
    const baliseMAil = document.getElementById("email");
    

    let nom = baliseNom.value;
    let prenom = balisePrenom.value;
    let adresse = baliseAdresse.value;
    let ville = baliseVille.value;
    let email = baliseMAil.value;

    console.log(prenom);
    console.log('===');
    console.log(nom);
    console.log('+++');
    console.log(adresse);
    console.log('---');
    console.log(ville);
    console.log('***');
    console.log(email);
    

    e.preventDefault();
  })

  

  