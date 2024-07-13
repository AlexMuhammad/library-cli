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

  if (!book) {
    throw new ApplicationError(`Book with id ${bookId} not found`, 1);
  }

  if (!user) {
    throw new ApplicationError(`User with id ${userId} not found`, 2);
  }

  if (book.borrowedBy !== null) {
    const borrower = users.find((u) => u.id === book.borrowedBy);
    throw new ApplicationError(`Book is already borrowed by ${borrower.name}`, 3);
  }

  if (book.isPreserved) {
    throw new ApplicationError("Book is preserved and cannot be borrowed", 4);
  }

  if (book.isMemberOnly && !user.isMember) {
    throw new ApplicationError("Book is for members only", 5);
  }

  if (book.publishedYear < 1980) {
    throw new ApplicationError("Book is older than 1980 and cannot be borrowed", 6);
  }

  book.borrowedBy = user.id;
  return { user, book };
}

module.exports = borrow;
