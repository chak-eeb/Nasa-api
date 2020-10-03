const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const loader = document.querySelector(".loader");
const saveConfirmed = document.querySelector(".save-confirmed");

// Nasa api

const API_KEY = "DEMO_KEY";
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;

let resultsArray = [];
let favorites = {};

const createDOMNodes = () => {
  // first we iterate through the results the create the card
  resultsArray.forEach((result) => {
    //create the card that will hold all the elements
    const card = document.createElement("div");
    card.classList.add("card");
    //create the link for the image
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "view image";
    link.target = "_blank";
    // create the image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "Nasa image of the day";
    image.loading = "lazy";
    image.classList.add("card-image-top");
    // card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // save text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    // card text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    //footer container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    //Append everything
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);

    //
  });
};
// lte's create the function to create the DOM
const createDOM = () => {
  createDOMNodes();
};
// get nasa pictures
const getNasPix = async () => {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    createDOM();
  } catch (error) {
    console.log(error);
  }
};

//save favorite function
const saveFavorite = (itemUrl) => {
  // loop through the results array to see if it contains itemUrl
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // confirm add to favorites
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2500);
      // set local storage
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  });
};

// on load
getNasPix();
