const cardListEl = document.querySelector(".card-list");
const buttonEl = document.querySelector(".button");
const inputEl = document.querySelector(".input");
const searchedEl = document.querySelector(".movie__searched--name");
let executed = false;
let inputSearch = false;
let mainCount = 0;

const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.add("show");
}

function hideLoader() {
  loader.classList.remove("show");
}

function onSearchMovie(event) {
  const movieData = event.target.value;
  searchedEl.innerHTML = movieData;
  search();
}

function search() {
  const movieData = inputEl.value.trim();

  if (!movieData) {
    inputEl.classList.add("input-shake");
    buttonEl.classList.add("input-shake");
    setTimeout(() => {
      inputEl.classList.remove("input-shake");
      buttonEl.classList.remove("input-shake");
    }, 600);
    return;
  }

  cardListEl.innerHTML = "";
  showLoader();

  main(movieData);
}

async function userInterface() {
  if ((mainCount == 0)) {
    main("marvel")
  }
  mainCount++;
}
userInterface()

async function main(movieData) {
  showLoader();
  const data = await fetch(
    `https://www.omdbapi.com/?apikey=c968a92&s=${movieData}`
  );
  const jsonData = await data.json();
  hideLoader();
  if ((jsonData.Response === "False")) {
    cardListEl.innerHTML = movieNotFound();
  }
  cardListEl.innerHTML = jsonData.Search.map((movie) => cardHTML(movie)).join(
    ""
  );
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
