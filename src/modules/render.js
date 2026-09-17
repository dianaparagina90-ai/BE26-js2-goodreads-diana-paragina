import { getAllBooks } from "./APIrequests.js";

// Funktion som renderar alla böcker på sidan
export async function renderAllBooks() {
  const booksContainer = document.getElementById("books-container");

  if (!booksContainer) {
    return;
  }

  booksContainer.innerHTML = "";

  const books = await getAllBooks();

  books.forEach((book) => {
    const bookElement = createBookElement(book);

    booksContainer.append(bookElement);
  });
}

//Funktion som skapar ett element för varje bok med dess information och knappar för att ändra status och ta bort boken
function createBookElement(book) {
  const booksWrapperEl = document.createElement("div");
  booksWrapperEl.classList.add("books-wrapper");

  const bookTitleEl = document.createElement("h3");
  bookTitleEl.textContent = book.getTitle();

  const bookAuthorEl = document.createElement("p");
  bookAuthorEl.textContent = `Författare: ${book.getAuthor()}`;

  const bookReadabilityEl = document.createElement("span");
  bookReadabilityEl.textContent = book.getIsReadStatus();

  const bookImageEl = document.createElement("img");
  bookImageEl.src = book.getImage();
  bookImageEl.alt = `Omslag till ${book.getTitle()}`;

  const changeBtn = document.createElement("button");
  changeBtn.textContent = book.getIsRead()
    ? "Markera som oläst"
    : "Markera som läst";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Ta bort";

  const scoreSection = showScoreSection(book);

  changeBtn.addEventListener("click", async () => {
    book.toggleReadStatus();
    await book.updateBook();
    await renderAllBooks();
  });

  deleteBtn.addEventListener("click", async () => {
    await book.deleteBook();
    booksWrapperEl.remove();
  });

  booksWrapperEl.append(
    bookTitleEl,
    bookAuthorEl,
    bookImageEl,
    bookReadabilityEl,
    scoreSection,
    changeBtn,
    deleteBtn,
  );

  return booksWrapperEl;
}

// Funktion som visar sektionen för betyg
function showScoreSection(book) {
  const bookScoreEl = document.createElement("span");

  const scoreSection = document.createElement("div");
  scoreSection.classList.add("score-section");

  if (book.getIsRead()) {
    bookScoreEl.textContent = book.getScoreStatus();

    scoreSection.append(bookScoreEl);

    if (book.getScore() === null || book.getScore() === undefined) {
      createScoreRecension(book, scoreSection);
    }
  }

  return scoreSection;
}

//Funktion som skapar inputfält och knapp för att sätta betyg på en bok
function createScoreRecension(book, scoreSection) {
  const scoreInput = document.createElement("input");
  scoreInput.type = "number";
  scoreInput.min = "1";
  scoreInput.max = "5";
  scoreInput.placeholder = "Betyg 1-5";

  const scoreBtn = document.createElement("button");
  scoreBtn.textContent = "Sätt betyg";

  scoreBtn.addEventListener("click", async () => {
    const score = Number(scoreInput.value);

    if (score < 1 || score > 5) {
      return;
    }

    book.setScore(score);

    await book.updateBook();
    await renderAllBooks();
  });

  scoreSection.append(scoreInput, scoreBtn);
}
