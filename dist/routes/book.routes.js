"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const book_controller_1 = require("../controllers/book.controller");
const auth_2 = require("../middlewares/auth");
router.post("/add-book", auth_1.verifyAdminAccess, book_controller_1.addBookController);
router.get("/get-all-books", book_controller_1.getAllBooksController);
router.get("/get-book-data/:id", book_controller_1.getBookByIdController);
router.patch("/update-book/:id", auth_1.verifyAdminAccess, book_controller_1.updateBookController);
router.delete("/delete-book/:id", auth_1.verifyAdminAccess, book_controller_1.deleteBookController);
router.get("/search-books", auth_2.verifyAccess, book_controller_1.searchBooksController);
exports.default = router;
