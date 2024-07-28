const btnFetch = document.getElementById('btn');
const cardWrapper = document.querySelector('.card-wrapper');
const productWrapper = document.querySelector('.product-wrapper')
const totalPrice = document.getElementById('total-price');
const shipping = document.getElementById('shipping');
const euro = document.getElementById('euro');
shipping.className = (totalPrice.innerText) == '' ? 'hidden' : '';
euro.className = (totalPrice.innerText) == '' ? 'hidden' : '';
let counter = 0;

// Al click sul btnFetch recupera i dati dal file prodotti.json
btnFetch.addEventListener('click', function(){
    fetch('../prodotti.json')
    .then( (response) => response.json())
    .then( json => {
        prodottiFetch = json;
        
        // Per ogni prodotto dentro prodottiFetch
        for (const key in prodottiFetch) {

            // Crea un elemento div con classe card e lo appende al contenitore card-wrapper
            let singleCard = document.createElement('div')
            singleCard.setAttribute('class', 'card');
            cardWrapper.appendChild(singleCard);

            // Crea un elemento button per aggiungere al carrello l'item e lo appende alla card
            let addProduct = document.createElement('button');
            addProduct.innerText = `➕`;
            addProduct.setAttribute('class', `add-to-cart-${key}`);
            singleCard.appendChild(addProduct);

            // Crea un elemento button per togliere dal carrello l'item e lo appende alla card
            let removeProduct = document.createElement('button');
            removeProduct.innerText = `➖`;
            removeProduct.setAttribute('class', `remove-to-cart-${key}`);
            singleCard.appendChild(removeProduct);

            // Crea un elemento div che contiene un h2 con il nome del prodotto e lo appende alla card
            let cardTitle = document.createElement('div');
            cardTitle.innerHTML = `<h2>${prodottiFetch[key].nomeProdotto}</h2>`
            singleCard.appendChild(cardTitle);

            // Crea un elemento p che contiene la descrizione del prodotto e lo appende alla card
            let descrizione = document.createElement('p');
            descrizione.innerText = `${prodottiFetch[key].descrizione}`
            singleCard.appendChild(descrizione);

            // Crea un elemento div che contiene un p dove viene indicato il prezzo del prodotto e lo appende alla card
            let prezzo = document.createElement('div');
            prezzo.innerHTML = `<p>${prodottiFetch[key].prezzo} €</p>`
            singleCard.appendChild(prezzo);

            // Crea un elemento img, ne valorizza la src e lo appende alla card
            let immagine = document.createElement('img');
            immagine.src = `${prodottiFetch[key].immagine}`
            singleCard.appendChild(immagine);

            // Crea un ID unico da assegnare agli elementi del carrello
            let uniqueId = `cart-item-${key}-${counter}`;

            // Aggiunge al bottone addProduct la creazione di un elemento div con le caratterristiche dell'item
            // da aggiungere poi al carrello
            addProduct.addEventListener('click', function(){
                let addItem = document.createElement('div');
                addItem.setAttribute('class', 'flex-wrapper');
                addItem.setAttribute('id', uniqueId)
                addItem.innerHTML = `<h3 class="cart-title">${prodottiFetch[key].nomeProdotto}</h3>
                <p class="cart-description">${prodottiFetch[key].descrizione}</p>
                <p class="cart-price">${prodottiFetch[key].prezzo} €</p>`
                productWrapper.appendChild(addItem);
                shipping.className = 'show';
                euro.className = 'show';
                totalPrice.innerText = `${Number(totalPrice.innerText) + Number(prodottiFetch[key].prezzo)}`;
                counter++;
            })

            // Aggiunge al bottone removeProduct l'eliminazione dell'elemento div corrispondente tramite
            // lo uniqueId e rimuove l'elemento dal carrello
            removeProduct.addEventListener('click', function(){
                let removeItem = document.getElementById(uniqueId);
                if (removeItem) {
                    productWrapper.removeChild(removeItem);
                    totalPrice.innerText = `${Number(totalPrice.innerText) - Number(prodottiFetch[key].prezzo)}`;
                    counter--;
                    if (totalPrice.innerText == 0){
                        shipping.className = 'hidden';
                        euro.className = 'hidden';
                        totalPrice.innerText = '';
                    }
                }
            });
        }
    })
})


