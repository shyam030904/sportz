// Product data
const products = [
    {
        id: 1,
        name: "Professional Cricket Bat",
        price: 2500,
        category: "cricket",
        image: "🏏",
        description: "High-quality willow cricket bat, perfect for professional players"
    },
    {
        id: 2,
        name: "Leather Cricket Ball",
        price: 800,
        category: "cricket",
        image: "🥎",
        description: "Genuine leather cricket ball, regulation size and weight"
    },
    {
        id: 3,
        name: "Football - Size 5",
        price: 1200,
        category: "football",
        image: "⚽",
        description: "FIFA approved football, perfect for matches and practice"
    },
    {
        id: 4,
        name: "Sports T-Shirt",
        price: 599,
        category: "clothing",
        image: "👕",
        description: "Breathable polyester sports t-shirt, available in multiple colors"
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 3500,
        category: "shoes",
        image: "👟",
        description: "Lightweight running shoes with excellent grip and comfort"
    },
    {
        id: 6,
        name: "Cricket Helmet",
        price: 1800,
        category: "cricket",
        image: "🪖",
        description: "Safety first! Professional grade cricket helmet"
    },
    {
        id: 7,
        name: "Football Boots",
        price: 2800,
        category: "shoes",
        image: "🥾",
        description: "Professional football boots with superior grip"
    },
    {
        id: 8,
        name: "Sports Shorts",
        price: 450,
        category: "clothing",
        image: "🩳",
        description: "Comfortable sports shorts for all activities"
    },
    {
        id: 9,
        name: "Tennis Racket",
        price: 2200,
        category: "tennis",
        image: "🎾",
        description: "Professional tennis racket with carbon fiber frame"
    },
    {
        id: 10,
        name: "Basketball",
        price: 1500,
        category: "basketball",
        image: "🏀",
        description: "Official size basketball with excellent bounce"
    },
    {
        id: 11,
        name: "Cricket Pads",
        price: 2000,
        category: "cricket",
        image: "🦵",
        description: "Lightweight cricket pads for maximum protection"
    },
    {
        id: 12,
        name: "Sports Cap",
        price: 350,
        category: "clothing",
        image: "🧢",
        description: "UV protection sports cap, perfect for outdoor activities"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentCategory = 'all';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartCount();
});

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        
        // Add click event to show product details
        productCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                showProductDetails(product);
            }
        });
        
        productsGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter and display products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }
}

// Show product details
function showProductDetails(product) {
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin-bottom: 1rem;">${product.image}</div>
            <h2>${product.name}</h2>
            <p style="margin: 1rem 0; color: #666;">${product.description}</p>
            <div style="font-size: 1.5rem; color: #e74c3c; margin: 1rem 0;">₹${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id}); closeModal('productModal')">
                Add to Cart
            </button>
        </div>
    `;
    productModal.style.display = 'block';
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Smooth scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterProducts(btn.dataset.category);
        });
    });
    
    // Cart icon
    cartIcon.addEventListener('click', () => {
        displayCartItems();
        cartModal.style.display = 'block';
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);