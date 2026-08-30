const nameInput = document.getElementById("name");
const previewName = document.getElementById("previewName");

const customPen = document.getElementById("customPen");
const heroPen = document.getElementById("heroPen");

const colours = document.querySelectorAll(".colour");

const orderButton = document.getElementById("orderButton");
const orderMessage = document.getElementById("orderMessage");


// Update the name on the pen
function updateName() {

  const value = nameInput.value.trim();

  previewName.textContent =
    value || "YOUR NAME";
}

nameInput.addEventListener(
  "input",
  updateName
);


// Change pen colour
colours.forEach(button => {

  button.addEventListener("click", () => {

    colours.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const colour =
      button.dataset.colour;

    customPen.style.setProperty(
      "--pen-colour",
      `var(--${colour})`
    );

    heroPen.style.setProperty(
      "--pen-colour",
      `var(--${colour})`
    );

  });

});


// Add to order
orderButton.addEventListener("click", () => {

  const name =
    nameInput.value.trim();

  if (!name) {

    orderMessage.textContent =
      "Please enter a name first!";

    nameInput.focus();

    return;
  }

  orderMessage.textContent =
    `${name}'s personalised pen has been added to your order!`;

});


// Automatically update copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();
