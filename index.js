const cardListEl = document.querySelector(".card-list");
const buttonEl = document.querySelector(".button");
const inputEl = document.querySelector(".input");
const searchedEl = document.querySelector(".movie__searched--name");
const spinnerEl = document.querySelector(".fa-spinner");
let executed = false;
let inputSearch = false;
let mainCount = 0;

function onSearchMovie(event) {
  const movieData = event.target.value;
  searchedEl.innerHTML = movieData;
  inputSearch = true;
  executed = true;
  spinnerEl.classList += " display-block";
  search(movieData);
}

function search(movieData) {
  if (executed) {
    main(movieData);
  }

  executed = false;

  // input properties

  if (!inputSearch) {
    inputEl.classList += " input-shake";
    buttonEl.classList += " input-shake";
  }
  setTimeout(() => {
    inputEl.classList.remove("input-shake");
    buttonEl.classList.remove("input-shake");
  }, 600);
  setTimeout(() => {
    inputSearch = false;
  }, 700);
}

async function userInterface() {
  if ((mainCount == 0)) {
    const data = await fetch(
      `https://www.omdbapi.com/?apikey=c968a92&s=marvel`
    );
    const jsonData = await data.json();
    console.log(jsonData)
    cardListEl.innerHTML = jsonData.Search.map((movie) => cardHTML(movie)).join(
      ""
    );
  }
  mainCount++;
}
userInterface()

async function main(movieData) {
  const data = await fetch(
    `https://www.omdbapi.com/?apikey=c968a92&s=${movieData}`
  );
  const jsonData = await data.json();
  if ((jsonData.Response === "False")) {
    cardListEl.innerHTML = movieNotFound();
  }
  console.log(jsonData);
  spinnerEl.classList.remove("display-block");
  if ((jsonData.Response === "True")) {
    cardListEl.innerHTML = jsonData.Search.map((movie) => cardHTML(movie)).join(
      ""
    );
  }
}

function movieNotFound() {
  return `
  <figure class="not-found__img--wrapper">
    <img src="./assets/img_noresults_movies.png" />
  </figure>`;
}

function cardHTML(movie) {
  return `
   <div class="card">
    <figure class="card__img--wrapper">
     <img class="card__img" src="${movie.Poster}" />
    </figure>
    <div class="card__info">
      <h2 class="card__title">Title: ${movie.Title}</h2>
      <h3 class="card__type">Type: ${movie.Type}</h2>
      <h3 >Year: ${movie.Year.endsWith("–") ? movie.Year.slice(0, -1).concat(" ", "(Ongoing)") : movie.Year}</h3>
    </div>  
   </div>  `;
}
