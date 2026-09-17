import "./style.css";

import { renderAllBooks } from "./modules/render.js";
import { addBook } from "./modules/bookForm.js";
const addBookBtn = document.querySelector(".add-btn");

addBookBtn.addEventListener("click", () => {
  addBook();
});

renderAllBooks();
