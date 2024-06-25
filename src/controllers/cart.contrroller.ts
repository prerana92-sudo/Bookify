import { Request, Response } from "express";
import {
  addBookToCart,
  removeFromCart,
  updateCartItem,
  getCartItems,
} from "../services/cart.service";

interface CustomRequest extends Request {
  jwtData?: any;
}

export const addToCartController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { bookId, quantity } = req.body;
    const result = await addBookToCart(req.jwtData.userName, bookId, quantity);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while adding book to cart: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while adding book to cart",
    });
  }
};

export const removeFromCartController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { bookId } = req.body;
    const result = await removeFromCart(req.jwtData.userName, bookId);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while removing item from cart: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while removing item from cart",
    });
  }
};

export const updateCartItemController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { bookId, newQuantity } = req.body;
    const result = await updateCartItem(
      req.jwtData.userName,
      bookId,
      newQuantity
    );
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while updating cart item: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while updating cart item",
    });
  }
};

export const getCartItemsController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const result = await getCartItems(req.jwtData.userName);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while fetching cart items: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while fetching cart items",
    });
  }
};
