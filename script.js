const nameInput =
  document.getElementById("name");

const previewName =
  document.getElementById("previewName");

const customPen =
  document.getElementById("customPen");

const heroPen =
  document.getElementById("heroPen");

const colours =
  document.querySelectorAll(".colour");

const colourName =
  document.getElementById("colourName");

const orderButton =
  document.getElementById("orderButton");

const orderMessage =
  document.getElementById("orderMessage");



/* =========================
   COLOUR NAMES
========================= */

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



/* =========================
   NAME PREVIEW
========================= */

function updateName() {

  const value =
    nameInput.value.trim();

  previewName.textContent =
    value || "YOUR NAME";

}


nameInput.addEventListener(
  "input",
  updateName
);



/* =========================
   COLOUR SELECTION
========================= */

colours.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      colours.forEach(item => {

        item.classList.remove(
          "active"
        );

      });


      button.classList.add(
        "active"
      );


      const colour =
        button.dataset.colour;


      /* Change the pen */

      customPen.style.setProperty(
        "--pen-colour",
        `var(--${colour})`
      );


      heroPen.style.setProperty(
        "--pen-colour",
        `var(--${colour})`
      );


      /* Change colour label */

      colourName.textContent =
        colourLabels[colour];


      /* Small transition */

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



/* =========================
   ORDER BUTTON
========================= */

orderButton.addEventListener(
  "click",
  () => {

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

  }
);



/* =========================
   COPYRIGHT YEAR
========================= */

document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();
