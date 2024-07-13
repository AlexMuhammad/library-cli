const books = require("../../data/books.json");
const users = require("../../data/users.json");

/**
 * @typedef {Object} Book
 * @property {number} id - book's id
 * @property {string} title - book's title
 * @property {string} description - book's description
 * @property {boolean} isPreserved - book's preservation status
 * @property {boolean} isMemberOnly - book can only be borrowed by member
 * @property {number|null} borrowedBy - book is borrowed by who
 * @property {number} publishedYear - When book is published
 */

/**
 * @typedef {Object} User
 * @property {number} id - user's id
 * @property {string} name - user's title
 * @property {boolean} isMember - user is a member or not.
 */

/**
 * This function must return book if book is borrowable
 * @param {string} bookId 
 * @param {string} userId 
 * @returns {{ user: User, book: Book }}
 */
function borrow(bookId, userId) {
  const book = books.find((book) => book.id.toString() === bookId);
  const user = users.find((user) => user.id.toString() === userId);

  // Your Implementation
  // copilot bang :(
  if (!book) {
    throw new Error("Book not found");
  }

  if (!user) {
    throw new Error("User not found");
  }

  if (book.isPreserved) {
    throw new Error("Book is preserved");
  }

  if (user.isMember === false && book.isMemberOnly) {
    throw new Error("User is not a member");
  }

  if (book.borrowedBy !== null) {
    throw new Error("Book is already borrowed");
  }

  return { user, book };
}

module.exports = borrow;
