/*const url = "http://localhost:3000/api/products"
const params = new URL(url);
const name = url.searchParams.get("name");
console.log(params);*/

/**
 * Je souhaitais utiliser un import export entre script.js et cette page pour faire le lien avec les images de produits de index.html et leurs page produits.
 * Par la suite je souhaitais creer une fonction qui récupererait les infos d'un produit pour les afficher dans la page produits.html au clic sur l'image dans index.html
 * 
 */
const params = new URL(document.location).searchParams;
const id = params.get("id"); // Permet de pointer le id du canape

// On rajoute dans l'URL id qui va nous permettre de recupérer le bon produit
const getCanape = async () => {       
    try {
        const url = await fetch(`http://localhost:3000/api/products/${id}`);
        const reponse = await url.json();
        return reponse;
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'importation des canape")
    }
}
/**
 * Cette fonction fait le lien entre les éléments du DOM est les canape de l'API
 * Elle permet d'afficher les différentes informations du canape
 */

const fillCanapeData = async () => {
    const canapeData = await getCanape()
    console.log(canapeData)
    const descrptionDomElement = document.getElementById('description');
    const nameDomElement = document.getElementById('title');
    const prixDomElement = document.getElementById('price');
    const optionsDomElement = document.getElementById('colors');    
    const imageDomElement = document.querySelector('.item__img');
    const quantityDomElement = document.getElementById('quantity');

    const imageElement = document.createElement('img');
    // On insere les bonnes informations au bon endroit
    descrptionDomElement.innerHTML = canapeData.description;
    nameDomElement.innerHTML = canapeData.name;
    prixDomElement.innerHTML = canapeData.price;
    for (i in canapeData.colors) {
    optionsDomElement.innerHTML += `<option value=${canapeData.colors[i]}>${canapeData.colors[i]}</option>`
    };
    console.log(optionsDomElement);
    imageDomElement.appendChild(imageElement);
    imageElement.setAttribute('src', `${canapeData.imageUrl}`);
    imageElement.setAttribute('alt', `${canapeData.altTxt}`);
};


/**
 * Ajout des éléments dans le panier
 * On pointe le panier dans le DOM
 * création d'un tableau vide pour stocker les ajout au panier 
 * Création d'un objet qui stock les détails du produit, on va pouvoir utiliser avec localeStorage
 */

function savePanier(cart) {
    localStorage.setItem("addToCart", JSON.stringify(cart));
}

function getPanier() {
    let cart = localStorage.getItem("addToCart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function addpanier(product) {
    let cart = getPanier();
    let foundProduct = cart.find(p => p.id == product.id && p.color == product.color);
    if (foundProduct != undefined) {
        foundProduct.quantity ++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    savePanier(product)
}

    const cartDomElement = document.getElementById("addToCart"); // Creer une variable pour l'id du button
    cartDomElement.addEventListener("click", () => { // On écoute le button lors du click
        console.log('Vous avez cliqué sur le bouton !')
        const quantity = parseInt(document.getElementById('quantity').value);// Récupére la quantité saisie et vérifie avec parseInt que c'est un nombre entier
        const color = document.getElementById('colors').value;

       // Création d'un objet représentant le produit et qui stock ses informations
        const productElement = {
            quantity : quantity,
            colors: color,
            id : id
        }  
        console.log(productElement);
        //Cette boucle vérifie si la quantité est un nombre supérieur ou égale à 1 et si la couleur n'est pas vide
        if ((isNaN(quantity) || quantity < 1) || (color === '')) {
            cartDomElement.style.boxShadow = '0 0 22px 6px rgba(217, 39, 39, 0.6)';
            alert("veuillez entrer une quantité et une couleur.");
            return
        }

        

        savePanier();
        getPanier();
        addpanier();
        //localStorage.setItem("addToCart", JSON.stringify(productElement))

        //Initialisation d'un tableau pour stocker les articles dans le panier
        //let productInCart = [];

        //localStorage.getItem('addToCart')
        let productInCart = localStorage.getItem("addToCart");
        
        
        /**Cette condition vérifie si des articles sont déjà dans le panier
         * Si oui elle les récupére pour les stocker dans le tableau
          */
       if(productInCart == null) { 
            return [];
             
        } else {
            return JSON.parse(productInCart);

        }



        //let foundProduct = productInCart.find(product => product.color == color && product.id == id);
        //console.log(foundProduct)

       /* if (foundProduct !== undefined) {
            foundProduct.quantity ++;
        } else {
            product.quantity = 1;
            productInCart.push(productElement)//Ajoute les nouveaux éléments au panier
            console.log(productInCart)
        }
        
        localStorage.setItem("addToCart", JSON.stringify(productInCart));
        console.log('Article ajouté !')*/
    
    })

    


fillCanapeData() 