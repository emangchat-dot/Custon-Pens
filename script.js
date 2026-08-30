/* =====================================================
   PENIFY STORE
===================================================== */


/* =====================================================
   EMAILJS SETTINGS
=====================================================

   Replace these three values with your EmailJS details.

===================================================== */

const EMAILJS_PUBLIC_KEY = "bgVE9CXt6sEkG_oba";
const EMAILJS_SERVICE_ID = "service_nytxdji";
const EMAILJS_TEMPLATE_ID = "template_zmfzgos";


/* Initialise EmailJS */

if (
  typeof emailjs !== "undefined" &&
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
) {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}


/* =====================================================
   ELEMENTS
===================================================== */

const nameInput =
  document.getElementById("name");

const previewName =
  document.getElementById("previewName");

const heroName =
  document.getElementById("heroName");

const customPen =
  document.getElementById("customPen");

const heroPen =
  document.getElementById("heroPen");

const colours =
  document.querySelectorAll(".colour");

const colourName =
  document.getElementById("colourName");

const addSingle =
  document.getElementById("addSingle");

const addBundle =
  document.getElementById("addBundle");

const orderMessage =
  document.getElementById("orderMessage");

const cartButton =
  document.getElementById("cartButton");

const cart =
  document.getElementById("cart");

const cartOverlay =
  document.getElementById("cartOverlay");

const closeCart =
  document.getElementById("closeCart");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");

const cartSubtitle =
  document.getElementById("cartSubtitle");

const checkoutButton =
  document.getElementById("checkoutButton");

const checkoutModal =
  document.getElementById("checkoutModal");

const closeCheckout =
  document.getElementById("closeCheckout");

const orderForm =
  document.getElementById("orderForm");

const checkoutSummary =
  document.getElementById("checkoutSummary");

const checkoutTotal =
  document.getElementById("checkoutTotal");

const emailOrderItems =
  document.getElementById("emailOrderItems");

const emailOrderTotal =
  document.getElementById("emailOrderTotal");


/* =====================================================
   COLOURS
===================================================== */

const colourLabels = {

  blue: "Electric Blue",
  purple: "Purple",
  pink: "Hot Pink",
  cyan: "Cyan",
  teal: "Teal",
  green: "Green",
  lime: "Lime",
  red: "Red",
  orange: "Orange",
  yellow: "Sun Yellow",
  lavender: "Lavender",
  white: "Pearl White",
  silver: "Silver",
  black: "Midnight Black"

};


let selectedColour = "blue";


/* =====================================================
   CART
===================================================== */

let cartData =
  JSON.parse(
    localStorage.getItem("penifyCart")
  ) || [];


/* =====================================================
   NAME PREVIEW
===================================================== */

function updateName() {

  const value =
    nameInput.value.trim();

  const displayName =
    value || "YOUR NAME";

  previewName.textContent =
    displayName;

  heroName.textContent =
    displayName;

}


nameInput.addEventListener(
  "input",
  updateName
);


/* =====================================================
   COLOUR SELECTION
===================================================== */

colours.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      colours.forEach(item => {

        item.classList.remove("active");

      });


      button.classList.add("active");


      selectedColour =
        button.dataset.colour;


      customPen.style.setProperty(
        "--pen-colour",
        `var(--${selectedColour})`
      );


      heroPen.style.setProperty(
        "--pen-colour",
        `var(--${selectedColour})`
      );


      colourName.textContent =
        colourLabels[selectedColour];


      colourName.style.transform =
        "scale(.9)";

      colourName.style.opacity =
        ".4";


      requestAnimationFrame(() => {

        colourName.style.transform =
          "scale(1)";

        colourName.style.opacity =
          "1";

      });

    }
  );

});


/* =====================================================
   ADD ITEM
===================================================== */

function addToCart(quantity, bundle = false) {

  const name =
    nameInput.value.trim();


  if (!name) {

    orderMessage.textContent =
      "Please enter a name first!";

    nameInput.focus();

    return;

  }


  const item = {

    id:
      Date.now() +
      Math.random(),

    name:
      name,

    colour:
      selectedColour,

    colourLabel:
      colourLabels[selectedColour],

    quantity:
      quantity,

    bundle:
      bundle,

    price:
      bundle ? 6 : 3

  };


  cartData.push(item);

  saveCart();

  renderCart();

  openCart();


  orderMessage.textContent =
    bundle
      ? "🔥 3-pen bundle added to your cart!"
      : "✓ Pen added to your cart!";

}


addSingle.addEventListener(
  "click",
  () => addToCart(1, false)
);


addBundle.addEventListener(
  "click",
  () => addToCart(3, true)
);


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

  localStorage.setItem(
    "penifyCart",
    JSON.stringify(cartData)
  );

}


/* =====================================================
   CART TOTAL
===================================================== */

function calculateTotal() {

  return cartData.reduce(
    (total, item) => {

      return total +
        item.price *
        (item.bundle ? 1 : item.quantity);

    },
    0
  );

}


/* =====================================================
   CART COUNT
===================================================== */

function calculateCount() {

  return cartData.reduce(
    (total, item) => {

      return total +
        (item.bundle ? 3 : item.quantity);

    },
    0
  );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

  cartItems.innerHTML = "";


  if (cartData.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div style="font-size:45px;">🛒</div>
        <p>Your cart is empty.</p>
        <br>
        <small>Add a personalised pen to get started.</small>
      </div>
    `;

  }


  cartData.forEach((item, index) => {

    const element =
      document.createElement("div");

    element.className =
      "cart-item";


    element.innerHTML = `

      <div class="cart-item-top">

        <div>

          <div class="cart-item-name">
            ${escapeHTML(item.name)}
          </div>

          <div class="cart-item-colour">
            ${escapeHTML(item.colourLabel)}
          </div>

          <div class="cart-item-colour">
            ${
              item.bundle
                ? "3-Pen Exam Bundle"
                : "Personalised Pen"
            }
          </div>

        </div>

        <div class="cart-item-price">
          $${item.price.toFixed(2)}
        </div>

      </div>


      <div class="cart-item-bottom">

        <div class="quantity-controls">

          ${
            item.bundle
              ? `<span>× 3 pens</span>`
              : `
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
              `
          }

        </div>

        <button
          class="remove-item"
          onclick="removeItem(${index})"
        >
          Remove
        </button>

      </div>

    `;


    cartItems.appendChild(element);

  });


  const total =
    calculateTotal();

  const count =
    calculateCount();


  cartTotal.textContent =
    total.toFixed(2);

  cartCount.textContent =
    count;

  cartSubtitle.textContent =
    `${count} ${count === 1 ? "item" : "items"}`;

}


window.changeQuantity =
  function(index, amount) {

    cartData[index].quantity += amount;


    if (
      cartData[index].quantity <= 0
    ) {

      cartData.splice(index, 1);

    }


    saveCart();

    renderCart();

  };


window.removeItem =
  function(index) {

    cartData.splice(index, 1);

    saveCart();

    renderCart();

  };


/* =====================================================
   CART OPEN/CLOSE
===================================================== */

function openCart() {

  cart.classList.add("open");
  cartOverlay.classList.add("open");

}


function closeCartDrawer() {

  cart.classList.remove("open");
  cartOverlay.classList.remove("open");

}


cartButton.addEventListener(
  "click",
  openCart
);


closeCart.addEventListener(
  "click",
  closeCartDrawer
);


cartOverlay.addEventListener(
  "click",
  closeCartDrawer
);


/* =====================================================
   CHECKOUT
===================================================== */

checkoutButton.addEventListener(
  "click",
  () => {

    if (cartData.length === 0) {

      alert("Your cart is empty!");

      return;

    }


    updateCheckout();


    checkoutModal.classList.add("open");

  }
);


closeCheckout.addEventListener(
  "click",
  () => {

    checkoutModal.classList.remove("open");

  }
);


function updateCheckout() {

  const summary =
    cartData
      .map(item => {

        const quantity =
          item.bundle
            ? 3
            : item.quantity;

        const type =
          item.bundle
            ? "Exam Bundle"
            : "Pen";

        return `${quantity} × ${type} — ${item.colourLabel} — ${item.name}`;

      })
      .join("\n");


  const total =
    calculateTotal();


  checkoutSummary.textContent =
    summary;

  checkoutTotal.textContent =
    total.toFixed(2);

  emailOrderItems.value =
    summary;

  emailOrderTotal.value =
    `$${total.toFixed(2)}`;

}


/* =====================================================
   SEND ORDER
===================================================== */

orderForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const message =
      document.getElementById(
        "checkoutMessage"
      );


    if (
      EMAILJS_PUBLIC_KEY ===
      "YOUR_PUBLIC_KEY"
    ) {

      message.textContent =
        "⚠️ EmailJS hasn't been connected yet. Add your EmailJS keys in script.js.";

      return;

    }


    const submitButton =
      orderForm.querySelector(
        ".submit-order"
      );


    submitButton.disabled =
      true;

    submitButton.textContent =
      "Sending order...";


    try {

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        orderForm
      );


      message.textContent =
        "✓ Order sent successfully! We'll be in touch soon.";


      cartData = [];

      saveCart();

      renderCart();


      orderForm.reset();


      setTimeout(() => {

        checkoutModal.classList.remove(
          "open"
        );

        closeCartDrawer();

        message.textContent = "";

      }, 2500);


    } catch (error) {

      console.error(error);

      message.textContent =
        "❌ Something went wrong sending the order. Please try again.";

    }


    submitButton.disabled =
      false;

    submitButton.textContent =
      "Place Order →";

  }
);


/* =====================================================
   REVIEWS
===================================================== */

let reviews =
  JSON.parse(
    localStorage.getItem("penifyReviews")
  ) || [

    {
      name: "Alex",
      rating: 5,
      text: "The personalised name makes it so much easier to know which pen is mine."
    },

    {
      name: "Sam",
      rating: 5,
      text: "Really nice for studying and the $6 bundle is great."
    },

    {
      name: "Jordan",
      rating: 4,
      text: "I love the colours! My blue one looks awesome."
    }

  ];


let selectedRating = 5;


/* =====================================================
   STAR SELECTOR
===================================================== */

const starButtons =
  document.querySelectorAll(
    ".star-selector button"
  );


starButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      selectedRating =
        Number(
          button.dataset.rating
        );


      starButtons.forEach(star => {

        star.classList.toggle(
          "selected",
          Number(star.dataset.rating)
            <= selectedRating
        );

      });

    }
  );

});


/* =====================================================
   RENDER REVIEWS
===================================================== */

function renderReviews() {

  const container =
    document.getElementById(
      "reviewsContainer"
    );


  container.innerHTML = "";


  reviews.forEach(review => {

    const card =
      document.createElement("div");

    card.className =
      "review-card";


    const stars =
      "★".repeat(review.rating) +
      "☆".repeat(5 - review.rating);


    card.innerHTML = `

      <div class="review-stars">
        ${stars}
      </div>

      <p>
        "${escapeHTML(review.text)}"
      </p>

      <span class="review-author">
        — ${escapeHTML(review.name)}
      </span>

    `;


    container.appendChild(card);

  });

}


document
  .getElementById("submitReview")
  .addEventListener(
    "click",
    () => {

      const name =
        document
          .getElementById("reviewName")
          .value
          .trim();


      const text =
        document
          .getElementById("reviewText")
          .value
          .trim();


      const message =
        document
          .getElementById("reviewMessage");


      if (!name || !text) {

        message.textContent =
          "Please enter your name and review.";

        return;

      }


      reviews.unshift({

        name:
          name,

        rating:
          selectedRating,

        text:
          text

      });


      localStorage.setItem(
        "penifyReviews",
        JSON.stringify(reviews)
      );


      renderReviews();


      document
        .getElementById("reviewName")
        .value = "";

      document
        .getElementById("reviewText")
        .value = "";


      message.textContent =
        "⭐ Thanks for your review!";


      setTimeout(() => {

        message.textContent = "";

      }, 2500);

    }
  );


/* =====================================================
   HTML ESCAPING
===================================================== */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =====================================================
   YEAR
===================================================== */

document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();


/* =====================================================
   INITIALISE
===================================================== */

renderCart();

renderReviews();

updateName();
