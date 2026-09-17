import { Book } from "./Book";

export const baseURL =
  "https://goodreads-database-default-rtdb.europe-west1.firebasedatabase.app/books";

export const getAllBooks = async () => {
  try {
    const response = await fetch(baseURL + ".json");
    if (!response.ok) {
      throw new Error("Något gick fel");
    }
    const data = await response.json();

    const books = [];

    for (const id in data) {
      const book = new Book(
        id,
        data[id].title,
        data[id].author,
        data[id].isRead,
        data[id].score,
        data[id].imageUrl,
      );

      books.push(book);
    }

    return books;
  } catch (error) {
    throw error;
  }
};

export async function postNewBook(title, author) {
  try {
    const option = {
      method: "POST",
      body: JSON.stringify({
        title: title,
        author: author,
        isRead: false,
        score: null,
        imageUrl:
          "https://media.gettyimages.com/id/1957612313/sv/foto/teenage-girl-sitting-on-windowsill-and-reading-a-book.jpg?s=612x612&w=0&k=20&c=hOmtwpkm0XRl6K8Qa1D40-toplqm5Dg8I5wrHth1K6g=",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`${baseURL}.json`, option);
    if (!response.ok) {
      throw new Error("Kunde inte lägga boken");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
