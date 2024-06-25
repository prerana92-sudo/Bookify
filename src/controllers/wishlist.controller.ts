import { Request, Response } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  fetchUserWishlistData,
} from "../services/wishlist.service";

interface CustomRequest extends Request {
  jwtData?: any;
  userLang?: string;
}

export const addToWishlistController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { bookId } = req.body;
    const result = await addToWishlist(req.jwtData.userName, bookId);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while adding book to wishlist: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while adding book to wishlist",
    });
  }
};

export const removeFromWishlistController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { bookId } = req.body;
    const result = await removeFromWishlist(req.jwtData.userName, bookId);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while removing book from wishlist: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while removing book from wishlist",
    });
  }
};

export const fetchUserWishlistController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const result = await fetchUserWishlistData(req.jwtData.userName);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while fetching user wishlist data: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while fetching user wishlist data",
    });
  }
};

