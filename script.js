// console.log("JavaScript is running");

const products = [
  {
    id: 1,
    name: "Little Princess Dresses",
    price: 39.99,
    image: "images/dress.jpg",
    tag: "BESTSELLER",
    quantity: 1,
    colours: ["Pink", "White", "Lilac", "Cream"],
    sizes: ["1–2 years", "2–3 years", "3–4 years", "4–5 years"]
  },
  {
    id: 2,
    name: "Everyday Jeans",
    price: 34.99,
    image: "images/jeans.jpg",
    tag: "NEW",
    quantity: 1,
    colours: ["Light Blue", "Dark Blue", "Black", "White"],
    sizes: ["1–2 years", "2–3 years", "3–4 years", "4–5 years"]
  },
  {
    id: 3,
    name: "Cozy Outwear",
    price: 64.99,
    image: "images/jackets_boots.jpg",
    tag: "POPULAR",
    quantity: 1,
    colours: ["Beige", "Cream", "Sage Green", "Dusty Pink"],
    sizes: ["1–2 years", "2–3 years", "3–4 years", "4–5 years"]
  },
  {
    id: 4,
    name: "Summer Dresses",
    price: 44.99,
    image: "images/dresses.jpg",
    tag: "ESSENTIAL",
    quantity: 1,
    colours: ["White", "Pink", "Blue", "Floral"],
    sizes: ["1–2 years", "2–3 years", "3–4 years", "4–5 years"]
  }
];

const productGrid = document.getElementById("product-grid");

const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-button");

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const cartNotification = document.getElementById("cart-notification");

const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");


function displayProducts() {
  productGrid.innerHTML = "";

  products.forEach(function(product, index) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <span class="product-tag">${product.tag}</span>
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>€${product.price.toFixed(2)}</p>

        <label for="colour-${index}">Colour:</label>
        <select id="colour-${index}" class="colour-select">
            ${product.colours.map(function(colour) {
                return `<option value="${colour}">${colour}</option>`;
            }).join("")}
        </select>

        <label for="size-${index}">Age / Size:</label>
        <select id="size-${index}" class="size-select">
            ${product.sizes.map(function(size) {
                return `<option value="${size}">${size}</option>`;
            }).join("")}
        </select>

        <button class="add-to-cart" type="button">
            Add to Cart
        </button>
      </div>
    `;

    // PRODUCTS LOOPING //
    productGrid.appendChild(card);

    const addButton = card.querySelector(".add-to-cart");
    const colourSelect = card.querySelector(".colour-select");
    const sizeSelect = card.querySelector(".size-select");

    addButton.addEventListener("click", function() {
        const selectedColour = colourSelect.value;
        const selectedSize = sizeSelect.value;
        
        addToCart({
            ...product,
            colour: selectedColour,
            size: selectedSize
        });
    });

  });
}
displayProducts();


// SHOPPING CART //
const cart = [];

function addToCart(product) {

    const existingProduct = cart.find(function(cartProduct) {
        return cartProduct.name === product.name &&
        cartProduct.colour === product.colour &&
        cartProduct.size === product.size;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {

    } cart.push(
        {
            ...product,
            quantity: 1
        }
    );

    cartCount.textContent = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    displayCartItems();
}

function displayCartItems() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">Your shopping bag is empty.</p>
        `;
        cartFooter.style.display = "none";

        return;
    }

    cartFooter.style.display = "";


    cart.forEach(function(product, index) {

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
            
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p>Colour: ${product.colour}</p>
                    <p>Size: ${product.size}</p>
                    <p>€${product.price.toFixed(2)}</p>
                
                    <div class="quantity-controls">
                        <button class="quantity-decrease" data-index="${index}" type="button">−</button>
                        <span>${product.quantity}</span>
                    <button class="quantity-increase" data-index="${index}" type="button">+</button>
                    </div>

                    <button class="remove-item" data-index="${index}" type="button">
                        Remove
                    </button>

                </div>
            </div>
        `;
    });

    const subtotal = cart.reduce(function(total, product) {
        return total + (product.price * product.quantity);
    }, 0);

    cartSubtotal.textContent = `€${subtotal.toFixed(2)}`;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    displayCartItems();
}

function removeFromCart(index) {
    cart.splice(index, 1);

    cartCount.textContent = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    displayCartItems();
}


// CART NOTIFICATION//
cartButton.addEventListener("click", function() {
    if (cart.length === 0) {
        cartNotification.textContent = "Your shopping bag is empty!";
        cartNotification.classList.add("show");

        setTimeout(function() {
            cartNotification.classList.remove("show");
        }, 2000);

    } else {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("show");
    }
});

// CART DRAWER //
cartDrawer.innerHTML = `
    
    <div class="cart-header">
        <h2>Your Shopping Bag</h2>
        <button id="close-cart" type="button">&times;</button>
    </div>
    
    <div class="cart-items" id="cart-items"></div>
    
    <div class="cart-footer" id="cart-footer">
        <div class="cart-subtotal">
            <span>Subtotal</span>
            <span id="cart-subtotal">€0.00</span>
        </div>
        
        <button class="checkout-button" type="button">
            Continue to Checkout
        
            </button>
    </div>
`;

const cartItems = document.getElementById("cart-items");
const closeCart = document.getElementById("close-cart");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartFooter = document.getElementById("cart-footer");

closeCart.addEventListener("click", function() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
});

// CART QUANTITY INCREASE/DECREASE WITH FUNCTION UPDATE QUANTITY //
cartItems.addEventListener("click", function(event) {
    if (event.target.classList.contains("quantity-increase")) {
        const index = event.target.dataset.index;
        updateQuantity(index, 1);
    }

    if (event.target.classList.contains("quantity-decrease")) {
        const index = event.target.dataset.index;
        updateQuantity(index, -1);
    }

    if (event.target.classList.contains("remove-item")) {
        const index = event.target.dataset.index;
        removeFromCart(index);
    }
});

// MENU TOGGLES FOR MOBILE VIEW //
menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});