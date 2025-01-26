document.addEventListener("DOMContentLoaded", function() {
    const currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
    if (currentProduct) {
        document.getElementById('productTitle').textContent = currentProduct.title;
        document.getElementById('productDescription').textContent = currentProduct.description;
        document.getElementById('productPrice').textContent = `$${currentProduct.price}`;
        const quantity = currentProduct.quantity || 1;
        document.getElementById('productQuantity').textContent = quantity;
        const totalPrice = (currentProduct.price * quantity).toFixed(2);
        document.getElementById('totalPrice').textContent = totalPrice;
    } else {
        document.getElementById('productDetails').innerHTML = '<p>No product selected for payment.</p>';
    }
    document.getElementById('proceedToPayment').addEventListener('click', function() {
        alert('Proceeding to payment...');
    });
});
