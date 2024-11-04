// Task 1. Create an Object for the product to store the properties for id, name, price, and image of the product

//SOLUTION:
//Defining the product class and storing it's properties to the class
class Product {
  constructor(id, name, price, image) {
    this.id = id; //this. is used to assign the value to the object. So that we can use it in the other methods of the class.
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

//Task 2. Create am object class for the shopping cart item to store the properties for product and its quantity.

//SOLUTION
// Define the ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  //Task 3. To the preceding object class add the method to calculate the total price of the item

  //SOLUTION
  // Method to calculate the total price for the shoppingCartItem Class
  getTotalPrice() {
    this.product.price * this.quantity;
    return;
  }
}

//Task 4.1. Create another object class for the shopping cart which contains an array of ShoppingCartItem instances.

//SOLUTION
// Define the ShoppingCart class as an array
class ShoppingCart {
  constructor() {
    this.cartItems = [];
  }

  //Task 4.2. Add method to the ShoppingCart to get total of the items inside the cart.

  //SOLUTION
  // Method to get total of items inside the cart

  getTotalCartItems() {
    let initialCartItemsQuantity = 0;
    this.cartItems.forEach(
      (item) => (initialCartItemsQuantity += item.quantity)
    );
    initialCartItemsQuantity = updatedCartItemsQuantity;
    return updatedCartItemsQuantity;
  }

  //Task 4.3. Add method to the ShoppingCart to add an item to the cart.
  //SOLUTION
  // Method to add an item to the cart

  //Checking for the existing item in the cart and if it exists, increment the quantity of the item, else add the item to the cart.
  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  //Task 4.4. Add method to the ShoppingCart to remove an item from the cart.
  //SOLUTION
  // Method to remove an item from the cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  //Task 4.5 Add method to display cart items
  //SOLUTION
  // Method to display cart items
  displayItems() {
    return this.items;
  }
  // Method to get the total price of the cart
  getTotal() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

// Global variables
let cart = null;
let products = [];
// let presetProducts = [];

//Section B Testing the ability of  objects to create products, shopping cart, add items to the cart, display the cart, and also remove an item from the cart.

//CREATE PRODUCTS

//Product Data Entry Form
let clickToCreateProduct = function () {
  cart = new Product();
  document.getElementById("productDataEntry").style.display = "contents";
  alert("Fill in the product details to create a product");
};

// Creating Product Using input values from the form
function createProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageDiv = document.getElementById("productImage");
  const image =
    imageDiv.files.length > 0 ? URL.createObjectURL(imageDiv.files[0]) : "";
  if (!image) {
    alert("Please select an image");
    return;
  }

  if (!id || !name || !price) {
    alert("Please fill in all fields");
    return;
  }

  //Creating  a new instance of the product class
  const product = new Product(id, name, price, image);
  products.push(product);
  console.log(product);
  createProductCard(product);

  // Clear input after creating a product
  // document.getElementById("productId").value = "";
  // document.getElementById("productName").value = "";
  // document.getElementById("productPrice").value = "";
  // imageDiv.value = ""; // Clear image input
}

// Add the created product to the product list
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = ` 
      <div class="image-container">
        <img src="${product.image}" alt="img" />
      </div>
      <div class="card-body" style="padding: 0 !important; font-family: segoe UI">
        <p class="card-text mb-0 p-0 mt-2" style="font-size: 0.9em" alt="item">${product.name}</p>
        <button class="btn p-0 px-2 mt-1" style="font-size: 1rem; background-color: orange" alt="shop now button">
          <span class="text-decoration-line-through text-decoration-style-double; fw-bold">N</span>
          <span class="fw-bold pe-2">${product.price}</span>
          <span style="font-size: 0.8em">Shop Now</span>
        </button>
        <div class="like-cart-container" style="margin-top: 0.5rem">
          <i class="far fa-heart" style="font-size: 24px; color: orange"></i>
          <span class="cart-icon" style=" margin-left: 6rem; color: orange; border: solid; padding: 0 3px 0 3px; border-radius: 5px; font-size: 13px;">Add to Cart</span>
        </div>
      </div>
    
  
  `;

  document.getElementById("main-row").appendChild(card);
}

// CREATE A SHOPPING CART
function createShoppingCart() {
  cart = new ShoppingCart();
  document.getElementById("cart-section-container").style.display = "block";
}

//ADD ITEM TO CART
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-icon")) {
    const cardBody = e.target.closest(".card-body");
    const productName = cardBody.querySelector("p").textContent.trim();
    const productPriceText = cardBody.querySelector(
      "button span.fw-bold.pe-2"
    ).textContent;
    const productPrice = parseFloat(productPriceText.replace("$", "")); // Remove dollar sign and convert to float
    const productImage = cardBody.parentElement.querySelector(
      ".image-container img"
    ).src;

    // Create cart item card
    const cartItemCard = document.createElement("div");
    cartItemCard.innerHTML = `
      <div class="cart-item" style="">
        <img src="${productImage}" alt="product image" >
        <div class="cart-item-info">
          <h6>${productName}</h6>
          <p class="pricing">Price: $${productPrice}</p>
          <button class="increment-btn">+</button>
          <button class="decrement-btn">-</button>
          <button class="delete-btn">Delete</button>
          <p>Quantity: <span class="quantity">1</span></p>
        </div>
        <div class="total-price" style="display: none"> $${productPrice} </div>
      </div>
      
    `;

    // Defining the delete, increment, decrement buttons and the quantity
    const deleteBtn = cartItemCard.querySelector(".delete-btn");
    const incrementBtn = cartItemCard.querySelector(".increment-btn");
    const decrementBtn = cartItemCard.querySelector(".decrement-btn");
    const quantityShow = cartItemCard.querySelector(".quantity");
    const totalPriceElement = cartItemCard.querySelector(".total-price");

    //DELETING ITEM FROM THE CART
    // Add event listeners to delete, increment, and decrement buttons
    deleteBtn.addEventListener("click", () => {
      cartItemCard.remove();
      calculateTotal();
    });

    //INCREMENTING ITEM IN THE CART
    //and also calculating the total price of the item after increment using the quantity and the price of the product
    incrementBtn.addEventListener("click", () => {
      const currentQuantity = parseInt(quantityShow.textContent);
      quantityShow.textContent = currentQuantity + 1;
      const itemTotal = productPrice * (currentQuantity + 1);
      totalPriceElement.textContent = `$${itemTotal.toFixed(2)}`;
      calculateTotal();
    });

    //DECREMENTING ITEM IN THE CART
    //and also calculating the total price of the item after decrement using the quantity and the price of the product
    decrementBtn.addEventListener("click", () => {
      const currentQuantity = parseInt(quantityShow.textContent);
      if (currentQuantity > 1) {
        quantityShow.textContent = currentQuantity - 1;
        const itemTotal = productPrice * (currentQuantity - 1);
        totalPriceElement.textContent = `$${itemTotal.toFixed(2)}`;
      }
      calculateTotal();
    });

    document.getElementById("cart-section-container").appendChild(cartItemCard);
  }
});

//TOTAL
//GETTING THE SUM TOTAL PRICE OF ITEMS IN THE CART
function calculateTotal() {
  const cartItems = document.querySelectorAll(".cart-item");
  let total = 0;
  cartItems.forEach((item) => {
    const totalPriceElement = item.querySelector(".total-price");
    const totalPriceText = totalPriceElement.textContent.replace("$", "");
    total += parseFloat(totalPriceText);
  });
  document.getElementById(
    "grand-total"
  ).textContent = `Grand Total: $${total.toFixed(2)}`;
}

//LIKE BUTTON
//adding a like and unlike click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-heart")) {
    e.target.classList.toggle("fas");
    e.target.style.color = "orange";
  }
});
