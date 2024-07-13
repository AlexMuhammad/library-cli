const assert = require("assert");
const books = require("../../data/books.json");
const users = require("../../data/users.json");
const borrow = require("./borrow");

const testCases = [
  {
    bookId: 5,
    userId: 1,
    isError: false,
    result: {
      book: books.find((book) => book.id === 5),
      user: users.find((user) => user.id === 1),
    },
    failMessage: "Book should be borrowable.",
  },
  {
    bookId: 2,
    userId: 3,
    isError: true,
    result: null,
    failMessage:
      "Book should not be borrowable due to already being borrowed by another user.",
  },
  {
    bookId: 1,
    userId: 3,
    isError: true,
    result: null,
    failMessage: "Book should not be borrowable due to it's being preserved.",
  },
  {
    bookId: 3,
    userId: 3,
    isError: true,
    result: null,
    failMessage: "Book should not be borrowable since it is member-only book.",
  },
  {
    bookId: 0,
    userId: 3,
    isError: true,
    result: null,
    failMessage: "Book should not be borrowable since it is not found.",
  },
  {
    bookId: 1,
    userId: 0,
    isError: true,
    result: null,
    failMessage: "Book should not be borrowable due to user is not found.",
  },
];

testCases.forEach((testCase) => {
  let result;
  let error;

  try {
    result = borrow(testCase.bookId.toString(), testCase.userId.toString());
  } catch (err) {
    error = err;
  }

  if (!testCase.isError) {
    assert(testCase?.result?.book?.id === result?.book?.id, testCase.failMessage);
  } else {
    assert(!result, testCase.failMessage);
  }
});
