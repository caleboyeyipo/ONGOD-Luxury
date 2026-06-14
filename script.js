// get cart from browser storage
let cart = JSON.parse(localStorage.getItem("cart"))  || [];

function addTocart(name, price, image) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if(existingItem){
        existingItem.quantity++;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart!");
}

// shop page

const addButtons =document.querySelectorAll(".add-cart");

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product =
        button.parentElement;

        const name =
        product.querySelector("h3").innerText;

        const price =
        product.querySelector("p").innerText;

        const image =
        product.querySelector("img").src;

        addTocart(name, price, image);
    });
});



// cart page

const cartContainer =
document.querySelector(".cart-container");

if(cartContainer){

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `
        <h2>Your Cart Is Empty</h2>
        `;

    } else {

        let total = 0;

        cart.forEach((item,index) => {

            const priceNumber =
            Number(item.price.replace(/[₦, ]/g,""));

            total += priceNumber * (item.quantity || 1);

            cartContainer.innerHTML += `
            <div class="cart-item">


               <img
               src="${item.image}"
               alt="${item.name}"
               class="cart-image">

               <div>

               <h3>${item.name}</h3>

               <p>${item.price}</p>

               <p>
                  Quantity: ${item.quantity || 1}
               </p>  
               
               <button onclick="removeItem(${index})">
                  Remove
               </button>
            </div>
            `;
        });

        cartContainer.innerHTML += `
        <div class="cart-total">
           <h2>Total: ₦${total.toLocaleString()}</h2>
           
           <button class="whatapp-btn"
           onclick="checkoutwhatApp()">
             Order Via WhatApp
             </button>
        </div>
        `;
    }
}


function removeItem(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();
}

//whatapp checkout 

function checkoutwhatApp(){

    let message =
    "Hello ONGOD Luxury,%0A%0A";

    message +=
    "I would like to order:%0A";

    cart.forEach(item=>{

        message +=
        "-" +
        item.name +
        "(" +
        item.price +
        ")%0A";
    });

    let phone =
    "2348139451819";
    window.open(
        `https://wa.me/${phone}?text=${message}`,
        "_blank"
    );
}

// cart counter
const cartCount =
document.getElementById("cart-count");

if(cartCount){

    let totalItems = 0;

    cart.forEach(item => {

        totalItems +=
        item.quantity || 1;
    });

    cartCount.innerText =
    totalItems;
}