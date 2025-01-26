document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById('cartList');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(product => {
            const productCard = `
                <div class="col-12 card mb-3" ">
                    <div class="row g-0">
                        <div class="px-5 pt-4 col-md-4">
                            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>

                                <!-- Price Display -->
                                <p><strong>Price: $${product.price}</strong></p>

                                <!-- Quantity Controls -->
                                <div class="d-flex justify-content-between align-items-center">
                                    <button class="btn btn-secondary decrease" data-id="${product.id}">-</button>
                                    <span class="quantity" id="quantity-${product.id}">${product.quantity || 1}</span>
                                    <button class="btn btn-secondary increase" data-id="${product.id}">+</button>
                                </div>
                                 
                                <!-- Total Price for this Product -->
                                <p><strong>Total Price: $<span id="totalPrice-${product.id}">${(product.price * (product.quantity || 1)).toFixed(2)}</span></strong></p>

                                <!-- Remove and Buy buttons -->
                                <div class="mt-3 d-flex justify-content-between">
                                    <button class="btn btn-danger remove-from-cart" data-id="${product.id}">Remove</button>
                                    <button class="btn btn-success buy-now" data-id="${product.id}">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartList.innerHTML += productCard;
        });
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                updateQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                updateQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                removeFromCart(productId);
            });
        });

        document.querySelectorAll('.buy-now').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                buyProduct(productId);
            });
        });
    }
    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = "index.html";
    });
    function updateQuantity(productId, change) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(product => product.id == productId);
        
        if (product) {
            product.quantity = (product.quantity || 1) + change;
            if (product.quantity < 1) product.quantity = 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById(`quantity-${productId}`).textContent = product.quantity;
            document.getElementById(`totalPrice-${productId}`).textContent = (product.price * product.quantity).toFixed(2);
        }
    }
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.id != productId);

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }
    function buyProduct(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(product => product.id == productId);

        if (product) {
            localStorage.setItem('currentProduct', JSON.stringify(product));
            window.location.href = "payment.html"; 
        }
    }
});
