import { getAllBooks } from "./APIrequests.js";

export async function renderAllBooks() {
  const booksContainer = document.getElementById("books-container");

  if (!booksContainer) {
    return;
  }

  booksContainer.innerHTML = "";

  const books = await getAllBooks();

  books.forEach((book) => {
    const booksWrapper = document.createElement("div");
    booksWrapper.classList.add("books-wrapper");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.getTitle();

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Författare: ${book.getAuthor()}`;

    const bookScore = document.createElement("span");

    const scoreSection = document.createElement("div");
    scoreSection.classList.add("score-section");

    if (book.getIsRead()) {
      bookScore.textContent = book.getScoreStatus();

      scoreSection.append(bookScore);

      if (book.getScore() === null || book.getScore() === undefined) {
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
    }

    const bookReadability = document.createElement("span");
    bookReadability.textContent = book.getIsReadStatus();

    const bookImage = document.createElement("img");
    bookImage.src = book.getImage();
    bookImage.alt = `Omslag till ${book.getTitle()}`;

    const changeBtn = document.createElement("button");
    changeBtn.textContent = book.getIsRead()
      ? "Markera som oläst"
      : "Markera som läst";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Ta bort";

    changeBtn.addEventListener("click", async () => {
      book.toggleReadStatus();
      await book.updateBook();
      await renderAllBooks();
    });

    deleteBtn.addEventListener("click", async () => {
      await book.deleteBook();
      booksWrapper.remove();
    });

    booksWrapper.append(
      bookTitle,
      bookAuthor,
      bookImage,
      bookReadability,
      scoreSection,
      changeBtn,
      deleteBtn,
    );

    booksContainer.append(booksWrapper);
  });
}
