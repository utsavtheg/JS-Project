const products = [
    {
        id: 1,
        name: "CLASSIC WHITE T-SHIRT",
        price: 29,
        image: "white-t-shirt.png"
    },
    {
        id: 2,
        name: "DENIM JEANS",
        price: 79,
        image: "jeans.png"
    },
    {
        id: 3,
        name: "LEATHER JACKET",
        price: 199,
        image: "leather-jacket.png"
    },
    {
        id: 4,
        name: "SUMMER DRESS",
        price: 65,
        image: "summer-dress.png"
    },
    {
        id: 5,
        name: "HOODIE SWEATSHIRT",
        price: 55,
        image: "hoodie.png"
    },
    {
        id: 6,
        name: "STRIPED POLO SHIRT",
        price: 45,
        image: "striped-shirt.png"
    },
    {
        id: 7,
        name: "CARGO SHORTS",
        price: 42,
        image: "cargo-short.png"
    },
    {
        id: 8,
        name: "WOOL SWEATER",
        price: 89,
        image: "sweater.png"
    }
];

const productGrid = document.querySelector("#productGrid");
const cartIcon = document.querySelector("#cartIcon");
const sidebar = document.querySelector("#sidebar");
const closeBtn = document.querySelector("#closeBtn");
const overlay = document.querySelector("#overlay");
const cartContent = document.querySelector("#cartContent");
const sidebarFooter = document.querySelector("#sidebarFooter");
const cartBadge = document.querySelector("#cartBadge");
const totalPrice = document.querySelector("#totalPrice");
const cartMessage = document.querySelector("#cartMessage");

let cart = [];

cartIcon.addEventListener("click", toggleCart);
closeBtn.addEventListener("click", toggleCart);
overlay.addEventListener("click", toggleCart);

function toggleCart() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
}

function displayCards() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">$${product.price}</p>
        <button class="add-btn">Add To Cart</button>
    `;

    const addBtn = productCard.querySelector(".add-btn");
    addBtn.addEventListener("click", ()=>{
       addToCart(product);
        
    });

    productGrid.append(productCard);

    });
}

function updateCart() {

    cartContent.innerHTML = '';

    cartBadge.textContent = cart.reduce((sum, item)=> sum + item.quantity, 0);

    if(cart.length === 0) {
        cartContent.innerHTML = `<div class="empty-cart">Your cart is empty</div>`;
        sidebarFooter.style.display = "none";
        return;
    }

    let total = 0;

    cart.forEach((product, index)=>{

        total += product.price * product.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.setAttribute("data-index", index);

        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${product.name}</h3>
                <p class="cart-item-price">$${product.price}</p>
                <div class="quantity-controls">
                    <button class="qty-btn decrease-btn">-</button>
                    <div class="quantity">${product.quantity}</div>
                    <button class="qty-btn increase-btn">+</button>
                </div>
            </div>
            <button class="remove-btn">&times;</button>
        `;
        cartContent.append(cartItem);
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
    sidebarFooter.style.display = "block";
}

function addToCart(product) {

    const existingItem = cart.find(item=> item.id === product.id);

    if(existingItem) {
        existingItem.quantity++;
    }
    else{
        cart.push({...product, quantity: 1});
    }
     
    updateCart();
    handleMessage("Product Added to Cart!", "green");
}

cartContent.addEventListener("click", (e)=>{

    const itemDiv = e.target.closest(".cart-item");
    if(!itemDiv) return;
    const index = Number(itemDiv.dataset.index);    
    
    if(e.target.classList.contains("increase-btn")) {
        cart[index].quantity++;   
    }

    if(e.target.classList.contains("decrease-btn")) {
        if(cart[index].quantity > 1) {
            cart[index].quantity--; 
        }  
        else {
            cart.splice(index, 1);
            handleMessage("Product Removed from Cart!", "red");

        }
    }

    if(e.target.classList.contains("remove-btn")) {
        cart.splice(index, 1);  
        handleMessage("Product Removed from Cart!", "red");

    }

    updateCart();
    
});

function handleMessage(message, color) {
    cartMessage.classList.add("show");
    cartMessage.textContent = message;
    cartMessage.style.backgroundColor = color;

    setTimeout(()=>{
        cartMessage.classList.remove("show");

    }, 1200)
}

window.addEventListener("DOMContentLoaded", ()=>{
    displayCards();
    updateCart();
});