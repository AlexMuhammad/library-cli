# Library CLI

This repository is a simple CLI application that can determine whether the book is borrowable or not.

## Instruction

1. Define the `ApplicationError` definition, every `ApplicationError` has `exitCode` property.
1. Complete the `borrow` function implementation.
    1. Book is not borrowable if:
        - Book already borrowed by other user, please make sure to display who's the borrower, so the current user can try to contact the borrower.
        - Book is preserved.
        - Book is member only but the user is not a member.
        - Book is older than 1980.
    2. Return `user` and `book`.
1. Test the code by running: `node bin/borrow ${bookId} ${userId}`
