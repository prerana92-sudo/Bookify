import express from "express";
const router = express.Router();
import {verifyAdminAccess} from '../middlewares/auth';

import {
  addBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
  searchBooksController,
} from "../controllers/book.controller";
import { verifyAccess } from "../middlewares/auth";

router.post("/add-book", verifyAdminAccess, addBookController);
router.get("/get-all-books", getAllBooksController);
router.get("/get-book-data/:id", getBookByIdController);
router.patch("/update-book/:id", verifyAdminAccess, updateBookController);
router.delete("/delete-book/:id", verifyAdminAccess, deleteBookController);
router.get("/search-books", verifyAccess, searchBooksController);


export default router;
