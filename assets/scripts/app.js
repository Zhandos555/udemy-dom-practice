const addMovieModal = document.getElementById("add-modal");
//* const addMovieModal = document.querySelector("#add-modal");
// ?const addMovieModal = document.body.children[1];
console.log(addMovieModal);

const startAddMovieButton = document.querySelector("header button");
//! const startAddMovieButton = document.querySelector("header").lastElementChild; always gets the last element

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
};

const backdrop = document.getElementById("backdrop");
console.log(backdrop);

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};

const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");

const cancelAddMovie = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};

const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);

  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  updateUI();
};

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const userInputs = addMovieModal.querySelectorAll("input");

const movies = [];

const entryTextSection = document.getElementById("entry-text");

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  // ?  listRoot.children[movieIndex].remove();
  listRoot.removeChild(listRoot.children[movieIndex]);
  cancelMovieDeletion();
  updateUI();
};

const deleteMovieModal = document.getElementById("delete-modal");

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.removeEventListener("click", cancelMovieDeletion);
  cancelDeletionButton.addEventListener("click", cancelMovieDeletion);

  confirmDeletionButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

const renderNewMovie = (id, title, imageURL, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <image src="${imageURL}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5</p>
  </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

  const listRoot = document.getElementById("movie-list");
  listRoot.appendChild(newMovieElement);
};

confirmAddMovieButton.addEventListener("click", addMovieHandler);

cancelAddMovieButton.addEventListener("click", cancelAddMovie);

startAddMovieButton.addEventListener("click", toggleBackdrop);

startAddMovieButton.addEventListener("click", showMovieModal);

backdrop.addEventListener("click", backdropClickHandler);
