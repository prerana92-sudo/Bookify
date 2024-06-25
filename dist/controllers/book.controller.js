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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBooksController = exports.deleteBookController = exports.updateBookController = exports.addBookController = exports.getBookByIdController = exports.getAllBooksController = void 0;
const books_service_1 = require("../services/books.service");
// Get all books
const getAllBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, books_service_1.getAllBooks)();
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
exports.getAllBooksController = getAllBooksController;
// Get book by id
const getBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = parseInt(req.params.id);
    try {
        const result = yield (0, books_service_1.getBookById)(bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
exports.getBookByIdController = getBookByIdController;
// Add a new book
const addBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    try {
        const result = yield (0, books_service_1.addBook)(bookData);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
exports.addBookController = addBookController;
// Update book
const updateBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = parseInt(req.params.id);
    const updatedData = req.body;
    try {
        const result = yield (0, books_service_1.updateBook)(bookId, updatedData);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
exports.updateBookController = updateBookController;
// Delete book
const deleteBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = parseInt(req.params.id);
    try {
        const result = yield (0, books_service_1.deleteBook)(bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});
exports.deleteBookController = deleteBookController;
const searchBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, author, genre, nameSort, priceSort } = req.query;
        const userName = req.jwtData.userName;
        const result = yield (0, books_service_1.searchBooks)(userName, name, author, genre, nameSort, priceSort);
        res.status(result.status).json(result);
    }
    catch (error) {
        console.log(`Error occurred while searching books: ${error}`);
        res.status(500).json({ status: 500, message: "Some error occurred" });
    }
});
exports.searchBooksController = searchBooksController;
