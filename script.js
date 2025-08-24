let cart = [];
        const cartOverlay = document.getElementById('cart-overlay');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartIcon = document.getElementById('cart-icon');
        const cartCount = document.getElementById('cart-count');
        const clearCartButton = document.getElementById('clear-cart');

        // Funzione per aggiornare il carrello
        function updateCart() {
            cartItems.innerHTML = '';
            let total = 0;
cart.forEach((item, index) => {
                total += item.price * item.quantity;
                cartItems.innerHTML += `
                    <li class="mt-2"><b>
                        ${item.name}</b> - €${item.price.toFixed(2)} x ${item.quantity}
                        <button class="btn btn-sm btn-danger mt-1"
                        onclick="removeFromCart(${index})">Rimuovi</button>
                    </li>
                `;
            });
            cartTotal.innerText = total.toFixed(2);
            cartCount.innerText = cart.length;
        }

        // Aggiungi prodotto al carrello
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const name = e.target.getAttribute('data-name');
                const price = parseFloat(e.target.getAttribute('data-price'));

                const existingProduct = cart.find(item => item.name === name);

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push({ name, price, quantity: 1 });
                }

                updateCart();
                localStorage.setItem('cart', JSON.stringify(cart));  // Salva nel localStorage
            });
        });

        // Rimuovi prodotto dal carrello
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Pulisci il carrello
        clearCartButton.addEventListener('click', () => {
            cart = [];
            updateCart();
            localStorage.removeItem('cart');
        });

        // Mostra/Nascondi carrello
        cartIcon.addEventListener('click', () => {
            cartOverlay.classList.toggle('show');
        });

        // Ricarica carrello da localStorage
        window.addEventListener('load', () => {
            const savedCart = JSON.parse(localStorage.getItem('cart'));
            if (savedCart) {
                cart = savedCart;
                updateCart();
            }
        });
        
// Funzione per chiudere il carrello quando si clicca su "Close"
document.getElementById('close-cart').addEventListener('click', () => {
    cartOverlay.classList.remove('show');
});

        // Funzione per far apparire gli elementi al scroll
        function fadeInOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight - 100) {
                    el.classList.add('show');
                }
            });
        }

        window.addEventListener('scroll', fadeInOnScroll);
        window.addEventListener('load', fadeInOnScroll);  // Attiva animazioni anche al caricamento
        
        // Mostra il pulsante quando l'utente scorre verso il basso di 300px
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Torna in cima alla pagina quando si clicca sul pulsante
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Scroll fluido verso l'alto
    });
});

        const orderSummary = document.getElementById('order-summary');
        const orderTotal = document.getElementById('order-total');

        // Ricarica carrello da localStorage e visualizza i dettagli
        window.addEventListener('load', () => {
            const savedCart = JSON.parse(localStorage.getItem('cart'));
            if (savedCart && savedCart.length > 0) {
                let total = 0;
                savedCart.forEach(item => {
                    total += item.price * item.quantity;
                    orderSummary.innerHTML += `<li>${item.name} - €${item.price.toFixed(2)} x ${item.quantity}</li>`;
                });
                orderTotal.innerText = total.toFixed(2);
            } else {
                orderSummary.innerHTML = '<li>Nessun prodotto inserito.</li>';
            }
        });
