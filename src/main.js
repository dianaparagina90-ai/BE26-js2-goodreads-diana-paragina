import { renderAllBooks } from "./modules/render.js";
import { displayForm } from "./modules/bookForm.js";
const displayFormButtonEl = document.querySelector(".go-to-form");

// Event listener for the "Lägg till ny bok" button som tar fram formuläret för att lägga till en ny bok
displayFormButtonEl.addEventListener("click", () => {
  displayForm();
});

renderAllBooks();
