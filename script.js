// Sample Products Data
const products = [
    { id: 1, name: 'Summer Dress', category: 'dresses', price: 799, image: 'https://via.placeholder.com/250x300?text=Summer+Dress' },
    { id: 2, name: 'Floral Skirt', category: 'skirts', price: 599, image: 'https://via.placeholder.com/250x300?text=Floral+Skirt' },
    { id: 3, name: 'Cotton Top', category: 'tops', price: 399, image: 'https://via.placeholder.com/250x300?text=Cotton+Top' },
    { id: 4, name: 'Kids Dress', category: 'kidswear', price: 499, image: 'https://via.placeholder.com/250x300?text=Kids+Dress' },
    { id: 5, name: 'Summer Hat', category: 'accessories', price: 299, image: 'https://via.placeholder.com/250x300?text=Summer+Hat' },
    { id: 6, name: 'Evening Gown', category: 'dresses', price: 1200, image: 'https://via.placeholder.com/250x300?text=Evening+Gown' },
    { id: 7, name: 'Leather Handbag', category: 'accessories', price: 1999, image: 'https://via.placeholder.com/250x300?text=Leather+Handbag' },
    { id: 8, name: 'Party Dress', category: 'dresses', price: 1499, image: 'https://via.placeholder.com/250x300?text=Party+Dress' },
    { id: 9, name: 'T-shirt', category: 'tops', price: 499, image: 'https://via.placeholder.com/250x300?text=T-shirt' },
];

// Cart Array
let cart = [];

// Render Products
function renderProducts(productList = products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    productList.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            <button class="btn buy-now" data-id="${product.id}">Buy Now</button>
        `;
        productGrid.appendChild(productItem);
    });

    bindProductButtons();
}

// Bind buttons after rendering
function bindProductButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            buyNow(id);
        });
    });
}

// Search Products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Filter by Category
function filterCategory(category) {
    if (category === 'all') {
        renderProducts();
    } else {
        const filtered = products.filter(product => product.category === category);
        renderProducts(filtered);
    }
}

// Apply Price Filters
function applyFilters() {
    const priceFilter = document.getElementById('priceFilter').value;
    let sortedProducts = [...products];

    if (priceFilter === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'highToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(sortedProducts);
}

// Update Cart UI and Count
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = cart.length;

    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartItems.innerHTML = cart.map((item, idx) => `
                <div class="cart-item">
                    <span>${idx + 1}. ${item.name} - ₹${item.price}</span>
                </div>
            `).join('');
        }
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push(product);
    updateCart();
    showCartMessage("Item added to cart!");
}

// Buy Now (Direct WhatsApp Buy)
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const message = `Hello, I want to buy:\n\n${product.name} - ₹${product.price}\n\nPlease confirm availability.`;
    const url = `https://wa.me/918868069730?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Show Cart Message
function showCartMessage(msg) {
    const cartMessage = document.getElementById('cartMessage');
    if (!cartMessage) return;
    cartMessage.textContent = msg;
    cartMessage.style.display = 'block';
    setTimeout(() => {
        cartMessage.style.display = 'none';
    }, 1500);
}

// Checkout Cart (Proceed to Pay All)
function checkoutCart() {
    if (cart.length === 0) return;
    let message = "I want to buy these products:\n\n";
    cart.forEach((item, idx) => {
        message += `${idx + 1}. ${item.name} - ₹${item.price}\n`;
    });
    message += "\nPlease confirm availability.";
    const url = `https://wa.me/918868069730?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Close Cart Popup
function closeCart() {
    const cartPopup = document.getElementById('cartPopup');
    if (cartPopup) cartPopup.style.display = 'none';
}

// Load More Products
let loadedProductCount = products.length;
function loadMoreProducts() {
    const newProducts = [
        { id: 10, name: 'Chic Dress', category: 'dresses', price: 999, image: 'https://via.placeholder.com/250x300?text=Chic+Dress' },
        { id: 11, name: 'Boho Skirt', category: 'skirts', price: 799, image: 'https://via.placeholder.com/250x300?text=Boho+Skirt' },
        { id: 12, name: 'Sunglasses', category: 'accessories', price: 399, image: 'https://via.placeholder.com/250x300?text=Sunglasses' },
    ];

    products.push(...newProducts);
    loadedProductCount = products.length;
    renderProducts(products);

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', searchProducts);

    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreProducts);

    const closeBtn = document.getElementById('closeCartBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeCart);

    const cartPopup = document.getElementById('cartPopup');
    if (cartPopup) {
        cartPopup.addEventListener('click', (e) => {
            if (e.target === cartPopup) closeCart();
        });
    }

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) cartBtn.addEventListener('click', () => {
        const cartPopup = document.getElementById('cartPopup');
        if (cartPopup) cartPopup.style.display = 'flex';
        updateCart();
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkoutCart);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = cart.length;

    // Category filter buttons
    document.querySelectorAll('.category-buttons button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            filterCategory(category);
        });
    });
});