document.addEventListener("DOMContentLoaded", function () {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            const productRow = document.getElementById('productRow');

            const displayProducts = (products) => {
                productRow.innerHTML = '';
                products.forEach((product) => {
                    // Limit description to 200 characters
                    const limitedDescription = product.description.length > 200
                        ? product.description.substring(0, 300) + "..."
                        : product.description;

                    const productCard = `
                        <div class="col-12 col-sm-6 col-md-3 mt-2 mb-3">
                            <div class="card h-100">
                                <img class="img-fluid rounded" src="${product.image}" alt="${product.title}">
                                <div class="card-body">
                                    <h4>${product.title}</h4>
                                    <p>${limitedDescription}</p>
                                    <p><strong>Price: $${product.price}</strong></p>
                                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                    productRow.innerHTML += productCard;
                });

                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        const productId = this.getAttribute('data-id');
                        const selectedProduct = products.find(product => product.id == productId);
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart.push(selectedProduct);
                        localStorage.setItem('cart', JSON.stringify(cart));

                        alert(`${selectedProduct.title} added to cart!`);
                    });
                });
            };

            displayProducts(json);

            document.getElementById('searchButton').addEventListener('click', function () {
                const searchQuery = document.getElementById('searchInput').value.toLowerCase();
                const filteredProducts = json.filter(product =>
                    product.title.toLowerCase().includes(searchQuery) ||
                    product.description.toLowerCase().includes(searchQuery)
                );
                displayProducts(filteredProducts);
            });

        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById("redirectButton").addEventListener("click", function () {
        window.location.href = "cart.html";
    });

    document.getElementById('accountButton').addEventListener('click', function () {
        const userEmail = 'user@example.com';
        const profileImage = 'https://picsum.photos/150';
        document.getElementById('userEmail').textContent = userEmail;
        document.getElementById('profileImage').src = profileImage;
        const accountModal = new bootstrap.Modal(document.getElementById('accountModal'));
        accountModal.show();
    });

    document.getElementById('logoutButton').addEventListener('click', function () {
        document.getElementById('profileDetails').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    document.getElementById('loginButton').addEventListener('click', function () {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (email && password) {
            alert('Logged in successfully!');
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('profileDetails').style.display = 'block';
            document.getElementById('userEmail').textContent = email;
        } else {
            alert('Please enter both email and password.');
        }
    });
});
