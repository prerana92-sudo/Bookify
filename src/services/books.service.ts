import Book from "../models/book";
import { Op } from "sequelize";
import User from "../models/user";

interface addBook {
  name?: string;
  author?: string;
  price?: number;
  stock?: number;
  releaseDate?: Date;
  isbn?: string;
  genre?: "non-fiction" | "fiction";
}

export const addBook = async (bookData: addBook) => {
  try {
    const newBook = await Book.create(bookData);
    return { status: 200, message: "Book added successfully", data: newBook };
  } catch (error) {
    console.log(`Error occurred while adding book: ${error}`);
    return { status: 500, message: "Some error occurred while adding book" };
  }
};

export const getAllBooks = async () => {
  try {
    const books = await Book.findAll({
      order: [["name", "ASC"]], // This sorts the books by their name in ascending order (A to Z)
    });
    return { status: 200, data: books };
  } catch (error) {
    console.log(`Error occurred while fetching books: ${error}`);
    return { status: 500, message: "Some error occurred while fetching books" };
  }
};

export const getBookById = async (bookId: number) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return { status: 404, message: "Book not found" };
    }
    return { status: 200, data: book };
  } catch (error) {
    console.log(`Error occurred while fetching book: ${error}`);
    return { status: 500, message: "Some error occurred while fetching book" };
  }
};

export const updateBook = async (bookId: number, updatedData: Partial<any>) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return { status: 404, message: "Book not found" };
    }
    await book.update(updatedData);
    return { status: 200, message: "Book updated successfully", data: book };
  } catch (error) {
    console.log(`Error occurred while updating book: ${error}`);
    return { status: 500, message: "Some error occurred while updating book" };
  }
};

export const deleteBook = async (bookId: number) => {
  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return { status: 404, message: "Book not found" };
    }
    await book.destroy();
    return { status: 200, message: "Book deleted successfully" };
  } catch (error) {
    console.log(`Error occurred while deleting book: ${error}`);
    return { status: 500, message: "Some error occurred while deleting book" };
  }
};

export const searchBooks = async (
  userName: string,
  name: string,
  author: string,
  genre: string,
  nameSort: "asc" | "desc", // Sorting options for name
  priceSort: "asc" | "desc" // Sorting options for price
) => {
  try {
    // Find the user
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return { status: 403, message: "Invalid user access, User not found" };
    }

    // Construct the query object
    const query: any = {};
    if (name) {
      query.name = { [Op.like]: `%${name}%` };
    }
    if (author) {
      query.author = { [Op.like]: `%${author}%` };
    }
    if (genre && ["fiction", "non-fiction"].includes(genre.toLowerCase())) {
      query.genre = genre.toLowerCase();
    }

    // Construct the order array
    const order: any[] = [];
    if (nameSort) {
      order.push(["name", nameSort]);
    }
    if (priceSort) {
      order.push(["price", priceSort]);
    }
    // Perform the search
    const books = await Book.findAll({
      where: query,
      order,
    });

    return {
      status: 200,
      message: "Books retrieved successfully",
      data: books,
    };
  } catch (error) {
    console.log(`Error occurred while searching books: ${error}`);
    return { status: 500, message: "Some error occurred" };
  }
};
