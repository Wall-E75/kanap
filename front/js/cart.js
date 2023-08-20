const params = new URL(document.location).searchParams;
const id = params.get("id");

const getCanape = async () => {       
    try {
        const url = await fetch(`http://localhost:3000/api/products/${id}`);
        const reponse = await url.json();
        return reponse;
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'importation des canape")
    }
}

const cartItems = document.getElementById('cart_items');
let product = JSON.parse(localStorage.getItem('addToCart'))//Récupere les éléments du localStorage 

