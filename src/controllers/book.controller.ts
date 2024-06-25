import { Request, Response } from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
} from "../services/books.service";

interface CustomRequest extends Request {
  jwtData?: any; // Define jwtData property
  userLang?: string;
}
// Get all books
export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const result = await getAllBooks();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

// Get book by id
export const getBookByIdController = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    const result = await getBookById(bookId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

// Add a new book
export const addBookController = async (req: Request, res: Response) => {
  const bookData = req.body;
  try {
    const result = await addBook(bookData);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

// Update book
export const updateBookController = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const updatedData = req.body;
  try {
    const result = await updateBook(bookId, updatedData);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

// Delete book
export const deleteBookController = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    const result = await deleteBook(bookId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export const searchBooksController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { name, author, genre, nameSort, priceSort } = req.query;
    const userName = req.jwtData.userName;

    const result = await searchBooks(
      userName,
      name as string,
      author as string,
      genre as string,
      nameSort as "asc" | "desc",
      priceSort as "asc" | "desc"
    );
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while searching books: ${error}`);
    res.status(500).json({ status: 500, message: "Some error occurred" });
  }
};


