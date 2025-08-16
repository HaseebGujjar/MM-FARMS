// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Cart Functionality
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Open/Close Cart Modal
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('active');
    renderCartItems();
});

closeModal.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Add to Cart
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const image = btn.getAttribute('data-image');

        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }

        updateCart();
        renderCartItems();

        // Add animation to button
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-plus"></i>';
        }, 1000);
    });
});

// Update cart in localStorage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = Rs. $ (total.toFixed(2));
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rs. ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="remove-item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
    `;

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('.cart-item').getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }

            updateCart();
            renderCartItems();
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('.cart-item').getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            item.quantity += 1;

            updateCart();
            renderCartItems();
        });
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('.cart-item').getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);

            updateCart();
            renderCartItems();
        });
    });

    updateCartTotal();
}

// Initialize cart
updateCartCount();

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    sliderDots[index].classList.add('active');
    currentSlide = index;
}

sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Auto slide change
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--white)';
        header.style.boxShadow = 'var(--shadow)';
    }
});

// Add event to change images of products on hover
function changeImage(imgId, newSrc) {
    document.getElementById(imgId).src = newSrc;
}