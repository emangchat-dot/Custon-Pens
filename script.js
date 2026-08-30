/* =====================================================
   PENIFY STORE
===================================================== */


/* =====================================================
   EMAILJS SETTINGS
===================================================== */

const EMAILJS_PUBLIC_KEY = "bgVE9CXt6sEkG_oba";
const EMAILJS_SERVICE_ID = "service_nytxdji";
const EMAILJS_TEMPLATE_ID = "template_zmfzgos";


/* =====================================================
   SUPABASE SETTINGS
=====================================================

   IMPORTANT:
   Use your Supabase PROJECT URL and PUBLISHABLE KEY.

   Do NOT use your secret/service_role key here.
===================================================== */

const SUPABASE_URL = "https://axqgmordbuolljqzlamx.supabase.co";
const SUPABASE_KEY = "sb_publishable_zqG8w8VnoWh3qBVM5zLHIA_LWkEeTgK";


/* =====================================================
   INITIALISE EMAILJS
===================================================== */

if (
  typeof emailjs !== "undefined" &&
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
) {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}


/* =====================================================
   INITIALISE SUPABASE
===================================================== */

let supabaseClient = null;

if (
  typeof window.supabase !== "undefined" &&
  SUPABASE_URL !== "PASTE_YOUR_SUPABASE_URL_HERE" &&
  SUPABASE_KEY !== "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE"
) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
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
   ADD ITEM TO CART
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
   CART OPEN / CLOSE
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
   SUPABASE REVIEWS
===================================================== */


/*
   IMPORTANT:

   Reviews are now stored in Supabase.

   The old fake reviews have been removed.

   Table required:

   reviews
   ├── id
   ├── name
   ├── rating
   ├── review
   ├── image_url
   └── created_at

   Storage bucket required:

   review-images
*/


let selectedRating = 5;


/* =====================================================
   STAR SELECTOR
===================================================== */

const starButtons =
  document.querySelectorAll(
    ".star-selector button"
  );


function updateStars() {

  starButtons.forEach(star => {

    star.classList.toggle(
      "selected",
      Number(star.dataset.rating)
        <= selectedRating
    );

  });

}


starButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      selectedRating =
        Number(
          button.dataset.rating
        );

      updateStars();

    }
  );

});


updateStars();


/* =====================================================
   LOAD REVIEWS FROM SUPABASE
===================================================== */

async function loadReviews() {

  const container =
    document.getElementById(
      "reviewsContainer"
    );


  if (!supabaseClient) {

    container.innerHTML = `
      <div class="review-card">
        <p>
          ⚠️ Supabase hasn't been connected yet.
        </p>
      </div>
    `;

    console.error(
      "Supabase is not configured. Check SUPABASE_URL and SUPABASE_KEY."
    );

    return;

  }


  container.innerHTML = `
    <div class="review-card">
      <p>Loading reviews... ⭐</p>
    </div>
  `;


  try {

    const { data, error } =
      await supabaseClient
        .from("reviews")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      console.error(
        "Supabase review error:",
        error
      );

      container.innerHTML = `
        <div class="review-card">
          <p>
            Unable to load reviews right now.
          </p>
        </div>
      `;

      return;

    }


    if (!data || data.length === 0) {

      container.innerHTML = `
        <div class="review-card">
          <p>
            No reviews yet. Be the first to leave one! ⭐
          </p>
        </div>
      `;

      return;

    }


    container.innerHTML = "";


    data.forEach(review => {

      const card =
        document.createElement("div");

      card.className =
        "review-card";


      const rating =
        Math.min(
          5,
          Math.max(
            1,
            Number(review.rating) || 1
          )
        );


      const stars =
        "★".repeat(rating) +
        "☆".repeat(5 - rating);


      const imageHTML =
        review.image_url
          ? `
            <img
              src="${escapeHTML(review.image_url)}"
              alt="Photo uploaded with customer review"
              class="review-image"
              loading="lazy"
            >
          `
          : "";


      card.innerHTML = `

        <div class="review-stars">
          ${stars}
        </div>

        <p>
          "${escapeHTML(review.review)}"
        </p>

        ${imageHTML}

        <span class="review-author">
          — ${escapeHTML(review.name)}
        </span>

      `;


      container.appendChild(card);

    });

  } catch (error) {

    console.error(
      "Unexpected review error:",
      error
    );

    container.innerHTML = `
      <div class="review-card">
        <p>
          Something went wrong loading reviews.
        </p>
      </div>
    `;

  }

}


/* =====================================================
   UPLOAD REVIEW IMAGE
===================================================== */

async function uploadReviewImage(file) {

  if (!file) {
    return null;
  }


  if (!supabaseClient) {

    throw new Error(
      "Supabase is not configured."
    );

  }


  /* Limit image size to 5MB */

  const maxSize =
    5 * 1024 * 1024;


  if (file.size > maxSize) {

    throw new Error(
      "Image must be smaller than 5MB."
    );

  }


  /* Only allow common image types */

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];


  if (
    !allowedTypes.includes(
      file.type
    )
  ) {

    throw new Error(
      "Please upload a JPG, PNG or WebP image."
    );

  }


  const extension =
    file.name
      .split(".")
      .pop()
      .toLowerCase();


  const fileName =
    `${crypto.randomUUID()}.${extension}`;


  const filePath =
    `reviews/${fileName}`;


  const { error: uploadError } =
    await supabaseClient
      .storage
      .from("review-images")
      .upload(
        filePath,
        file,
        {
          cacheControl: "3600",
          upsert: false
        }
      );


  if (uploadError) {

    console.error(
      "Image upload error:",
      uploadError
    );

    throw new Error(
      "The image could not be uploaded."
    );

  }


  const { data } =
    supabaseClient
      .storage
      .from("review-images")
      .getPublicUrl(filePath);


  return data.publicUrl;

}


/* =====================================================
   SUBMIT REVIEW
===================================================== */

document
  .getElementById("submitReview")
  .addEventListener(
    "click",
    async () => {

      const nameInputReview =
        document.getElementById(
          "reviewName"
        );


      const textInputReview =
        document.getElementById(
          "reviewText"
        );


      const imageInput =
        document.getElementById(
          "reviewImage"
        );


      const message =
        document.getElementById(
          "reviewMessage"
        );


      const name =
        nameInputReview.value.trim();


      const text =
        textInputReview.value.trim();


      const imageFile =
        imageInput &&
        imageInput.files
          ? imageInput.files[0]
          : null;


      /* Validation */

      if (!name) {

        message.textContent =
          "Please enter your name.";

        nameInputReview.focus();

        return;

      }


      if (!text) {

        message.textContent =
          "Please write a review.";

        textInputReview.focus();

        return;

      }


      if (text.length < 3) {

        message.textContent =
          "Your review is too short.";

        return;

      }


      if (!selectedRating) {

        message.textContent =
          "Please choose a star rating.";

        return;

      }


      if (!supabaseClient) {

        message.textContent =
          "⚠️ Supabase hasn't been connected yet.";

        return;

      }


      const submitButton =
        document.getElementById(
          "submitReview"
        );


      submitButton.disabled =
        true;

      submitButton.textContent =
        "Submitting...";

      message.textContent =
        "Uploading your review...";


      try {

        let imageURL = null;


        /* Upload image if one was selected */

        if (imageFile) {

          message.textContent =
            "Uploading your photo...";

          imageURL =
            await uploadReviewImage(
              imageFile
            );

        }


        /* Insert review */

        const { error } =
          await supabaseClient
            .from("reviews")
            .insert({

              name:
                name,

              rating:
                selectedRating,

              review:
                text,

              image_url:
                imageURL

            });


        if (error) {

          console.error(
            "Review database error:",
            error
          );

          throw new Error(
            "Your review could not be submitted."
          );

        }


        /* Reset form */

        nameInputReview.value = "";

        textInputReview.value = "";

        if (imageInput) {
          imageInput.value = "";
        }


        selectedRating = 5;

        updateStars();


        message.textContent =
          "⭐ Thanks! Your review has been submitted.";


        /* Reload reviews */

        await loadReviews();


      } catch (error) {

        console.error(error);

        message.textContent =
          `❌ ${error.message || "Something went wrong."}`;

      }


      submitButton.disabled =
        false;

      submitButton.textContent =
        "Submit Review";

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

updateName();

loadReviews();
