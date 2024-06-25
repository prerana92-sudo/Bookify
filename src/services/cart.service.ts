import ShoppingCart from "../models/shoppingcart";
import User from "../models/user";
import Book from "../models/book";

export const addBookToCart = async (
  userName: string,
  bookId: number,
  quantity: number
) => {
  try {
    const checkUser = await User.findOne({ where: { userName } });
    if (!checkUser) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const checkBook = await Book.findByPk(bookId);
    if (!checkBook) {
      return {
        status: 404,
        message: "Book does not exist!",
      };
    }
    if (checkBook.stock === 0) {
      return {
        status: 400,
        message: "Book out of stock!",
      };
    }

    const checkShoppingCartQuantity = await ShoppingCart.findAll({
      where: { userId: checkUser.id },
    });
    if (checkShoppingCartQuantity.length > 10) {
      return {
        status: 409,
        message: "Cannot select more than 10 unique items at once!",
      };
    }

    const addToCart = await ShoppingCart.create({
      userId: checkUser.id,
      bookId,
      quantity,
    });
    return {
      status: 200,
      message: "Item added to cart successfully!",
      data: addToCart,
    };
  } catch (error) {
    console.log(`Error occurred while adding book to cart: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const removeFromCart = async (userName: string, bookId: number) => {
  try {
    const checkUser = await User.findOne({ where: { userName } });
    if (!checkUser) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const cartItem = await ShoppingCart.findOne({
      where: { userId: checkUser.id, bookId },
    });
    if (!cartItem) {
      return {
        status: 404,
        message: "Item not found in the cart!",
      };
    }
    await cartItem.destroy();
    return {
      status: 200,
      message: "Item removed from the cart successfully!",
    };
  } catch (error) {
    console.log(`Error occurred while removing item from cart: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const updateCartItem = async (
  userName: string,
  bookId: number,
  newQuantity: number
) => {
  try {
    const checkUser = await User.findOne({ where: { userName } });
    if (!checkUser) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const cartItem = await ShoppingCart.findOne({
      where: { userId: checkUser.id, bookId },
    });
    if (!cartItem) {
      return {
        status: 404,
        message: "Item not found in the cart!",
      };
    }
    if (newQuantity <= 0) {
      return {
        status: 400,
        message: "Quantity should be a positive integer!",
      };
    }
    cartItem.quantity = newQuantity;
    await cartItem.save();
    return {
      status: 200,
      message: "Cart item updated successfully!",
      data: cartItem,
    };
  } catch (error) {
    console.log(`Error occurred while updating cart item: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const getCartItems = async (userName: string) => {
  try {
    const checkUser = await User.findOne({ where: { userName } });
    if (!checkUser) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const cartItems = await ShoppingCart.findAll({
      where: { userId: checkUser.id },
      include: [Book],
      order: [["createdAt", "DESC"]],
    });
    const cartData = cartItems.map((item) => ({
      book: (item as any).Book,
      quantity: item.quantity,
    }));
    const currentCost = await calculateTotal(userName);
    return {
      status: 200,
      message: "Cart items fetched successfully!",
      data: { cartItems: cartData, total: currentCost },
    };
  } catch (error) {
    console.log(`Error occurred while fetching cart items: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const calculateTotal = async (userName: string) => {
  try {
    const checkUser = await User.findOne({ where: { userName } });
    if (!checkUser) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const cartItems = await ShoppingCart.findAll({
      where: { userId: checkUser.id },
      include: [Book],
    });
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * (item as any).Book.price;
    });
    return total;
  } catch (error) {
    console.log(`Error occurred while calculating total: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};
