import { postNewBook } from "./APIrequests.js";
import { renderAllBooks } from "./render.js";

export const addBook = () => {
  const formWrapper = document.querySelector(".form-wrapper");
  const bookContainer = document.getElementById("books-container");

  bookContainer.style.display = "none";

  const form = document.createElement("form");
  form.classList.add("form");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Titel";
  titleInput.required = true;

  const authorInput = document.createElement("input");
  authorInput.placeholder = "Författare";
  authorInput.required = true;

  const addBtn = document.createElement("button");
  addBtn.textContent = "Lägg ny bok";
  addBtn.type = "submit";

  form.append(titleInput, authorInput, addBtn);
  formWrapper.append(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;

    if (!title || !author) {
      return;
    }

    await postNewBook(title, author);

    form.remove();
    bookContainer.style.display = "grid";

    await renderAllBooks();
  });
};
