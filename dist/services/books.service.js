"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBooks = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.addBook = void 0;
const book_1 = __importDefault(require("../models/book"));
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("../models/user"));
const addBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield book_1.default.create(bookData);
        return { status: 200, message: "Book added successfully", data: newBook };
    }
    catch (error) {
        console.log(`Error occurred while adding book: ${error}`);
        return { status: 500, message: "Some error occurred while adding book" };
    }
});
exports.addBook = addBook;
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.findAll({
            order: [["name", "ASC"]], // This sorts the books by their name in ascending order (A to Z)
        });
        return { status: 200, data: books };
    }
    catch (error) {
        console.log(`Error occurred while fetching books: ${error}`);
        return { status: 500, message: "Some error occurred while fetching books" };
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findByPk(bookId);
        if (!book) {
            return { status: 404, message: "Book not found" };
        }
        return { status: 200, data: book };
    }
    catch (error) {
        console.log(`Error occurred while fetching book: ${error}`);
        return { status: 500, message: "Some error occurred while fetching book" };
    }
});
exports.getBookById = getBookById;
const updateBook = (bookId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findByPk(bookId);
        if (!book) {
            return { status: 404, message: "Book not found" };
        }
        yield book.update(updatedData);
        return { status: 200, message: "Book updated successfully", data: book };
    }
    catch (error) {
        console.log(`Error occurred while updating book: ${error}`);
        return { status: 500, message: "Some error occurred while updating book" };
    }
});
exports.updateBook = updateBook;
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findByPk(bookId);
        if (!book) {
            return { status: 404, message: "Book not found" };
        }
        yield book.destroy();
        return { status: 200, message: "Book deleted successfully" };
    }
    catch (error) {
        console.log(`Error occurred while deleting book: ${error}`);
        return { status: 500, message: "Some error occurred while deleting book" };
    }
});
exports.deleteBook = deleteBook;
const searchBooks = (userName, name, author, genre, nameSort, // Sorting options for name
priceSort // Sorting options for price
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user
        const user = yield user_1.default.findOne({ where: { userName } });
        if (!user) {
            return { status: 403, message: "Invalid user access, User not found" };
        }
        // Construct the query object
        const query = {};
        if (name) {
            query.name = { [sequelize_1.Op.like]: `%${name}%` };
        }
        if (author) {
            query.author = { [sequelize_1.Op.like]: `%${author}%` };
        }
        if (genre && ["fiction", "non-fiction"].includes(genre.toLowerCase())) {
            query.genre = genre.toLowerCase();
        }
        // Construct the order array
        const order = [];
        if (nameSort) {
            order.push(["name", nameSort]);
        }
        if (priceSort) {
            order.push(["price", priceSort]);
        }
        // Perform the search
        const books = yield book_1.default.findAll({
            where: query,
            order,
        });
        return {
            status: 200,
            message: "Books retrieved successfully",
            data: books,
        };
    }
    catch (error) {
        console.log(`Error occurred while searching books: ${error}`);
        return { status: 500, message: "Some error occurred" };
    }
});
exports.searchBooks = searchBooks;
