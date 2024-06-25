import User from "../models/user";
import Book from "../models/book";
import Wishlist from "../models/wishlist";

export const addToWishlist = async (userName: string, bookId: number) => {
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
        message: "Book doesnot exist!",
      };
    }

    const addData = await Wishlist.create({ userId: checkUser.id, bookId });
    return {
      status: 200,
      message: "Added to wishlist succesfully!",
      data: addData,
    };
  } catch (error) {
    console.log(`Error occurred while adding book to wishlist: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const removeFromWishlist = async (userName: string, bookId: number) => {
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

    const removeData = await Wishlist.destroy({
      where: {
        userId: checkUser.id,
        bookId,
      },
    });

    if (removeData === 0) {
      return {
        status: 404,
        message: "Book not found in wishlist!",
      };
    }

    return {
      status: 200,
      message: "Removed from wishlist successfully!",
    };
  } catch (error) {
    console.log(`Error occurred while removing book from wishlist: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const fetchUserWishlistData = async (userName: string) => {
  try {
    const checkUser = await User.findOne({ where: { userName } });
    if (!checkUser) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const userWishlistData = await Wishlist.findAll({
      where: { userId: checkUser.id },
      include: [{ model: Book }],
      order: [["createdAt", "DESC"]],
    });

    const bookData =  userWishlistData.map((wishlistItem) => (wishlistItem as any).Book);

    return {
      status: 200,
      message: "User wishlist fetched successfully!",
      data: {user: checkUser, wishlist: bookData},
    };
  } catch (error) {
    console.log(`Error occurred while fetching user wishlist data: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};
