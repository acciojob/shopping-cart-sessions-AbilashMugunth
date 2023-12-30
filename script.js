const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
let cartList = document.querySelector("#cart-list");
let clearBtn = document.querySelector("#clear-cart-btn");

const storedArray = JSON.parse(sessionStorage.getItem("products"));
const storedSet = new Set(storedArray);

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

productList.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    addToCart(Number(e.target.getAttribute("data-id")));
  }
});

// Render cart list
function renderCart() {
  console.log(storedSet);
  storedSet.forEach((el) => {
    const product = document.createElement("li");
    product.textContent = document.querySelector(
      `[data-id="${el}"]`
    ).parentElement.childNodes[0].textContent;
    cartList.appendChild(product);
  });
}

// Add item to cart
function addToCart(productId) {
  Array.from(cartList.children).forEach((pro) => pro.remove());

  storedSet.add(productId);

  sessionStorage.setItem("products", JSON.stringify(Array.from(storedSet)));

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {}

// Clear cart
function clearCart() {}

// Initial render
renderProducts();
renderCart();