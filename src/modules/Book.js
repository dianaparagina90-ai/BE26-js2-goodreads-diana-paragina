import { baseURL } from "./APIrequests.js";

export class Book {
  #id;
  #title;
  #author;
  #isRead;
  #score;
  #imageUrl;

  constructor(id, title, author, isRead, score, imageUrl) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
    this.#imageUrl = imageUrl;
  }

  getId() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  getAuthor() {
    return this.#author;
  }

  getIsRead() {
    return this.#isRead;
  }

  getIsReadStatus() {
    return this.#isRead ? "Läst: Ja" : "Läst: Nej";
  }

  getImage() {
    return this.#imageUrl;
  }

  getScore() {
    return this.#score;
  }

  getScoreStatus() {
    if (this.#score !== undefined && this.#score !== null) {
      return `Betyg: ${this.#score}`;
    }
    return "Inget betyg";
  }

  setScore(score) {
    if (this.#isRead && score >= 1 && score <= 5) {
      this.#score = score;
    }
  }

  toggleReadStatus() {
    this.#isRead = !this.#isRead;
  }

  async updateBook() {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isRead: this.#isRead,
        score: this.#score,
      }),
    };

    try {
      const response = await fetch(`${baseURL}/${this.#id}.json`, options);
      if (!response.ok) {
        throw new Error("Kunde inte updatera boken");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteBook() {
    const options = {
      method: "DELETE",
    };
    try {
      const response = await fetch(`${baseURL}/${this.#id}.json`, options);
      if (!response.ok) {
        throw new Error("Kunde inte ta bort boken från listan");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
