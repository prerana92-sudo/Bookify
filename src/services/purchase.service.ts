import Purchase from "../models/purchase";
import Book from "../models/book";
import i18next from "i18next";
import { Op } from "sequelize";
import { sendEmail, sendTextNotification } from "../middlewares/notification";
import {
  PURCHASE_SUCCESSFULL_EMAIL_ENGLISH,
  PURCHASE_SUCCESSFULL_EMAIL_FRENCH,
} from "../config/templates";
import User from "../models/user";
import UserAddress from "../models/useraddress";

function generateRandomId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomId += chars[randomIndex];
  }
  return randomId;
}

export const addPurchaseData = async (
  purchaseData: any,
  userName: string,
  lang: string
) => {
  try {
    purchaseData.purchaseId = generateRandomId();
    const book = await Book.findByPk(purchaseData.bookId);
    const user = await User.findOne({ where: { userName } });
    if (!book) {
      return {
        status: 404,
        message: "Book doesnot exist!",
      };
    }
    if (!user) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    purchaseData.userId = user?.id;
    const newPurchase = await Purchase.create(purchaseData);
    await book.update({ stock: book.stock - 1 });

    const purchase = await Purchase.findByPk(newPurchase.id, {
      include: [
        { model: Book },
        {
          model: User,
          attributes: ["name", "langPreference"],
        },
        {
          model: UserAddress,
        },
      ],
    });

    return {
      status: 200,
      message: i18next.t("payment_success_message", { lng: lang }),
      data: purchase,
    };

    // const userLang = user?.langPreference;
    // const emailTemplate =
    //   userLang === "en"
    //     ? PURCHASE_SUCCESSFULL_EMAIL_ENGLISH
    //     : PURCHASE_SUCCESSFULL_EMAIL_FRENCH;
    // await sendEmail(emailTemplate, "sumit.mahto@home-connections.co.uk", {
    //   name: user?.name,
    //   bookName: book?.name,
    //   price: book?.price,
    //   date: purchase.createdAt,
    // });
  } catch (error) {
    console.log(`Error occurred while adding purchase data: ${error}`);
    return {
      status: 500,
      message: "Some error occurred while adding purchase data",
    };
  }
};

export const fetchUserPurchaseHistory = async (userName: string) => {
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const purchase = await Purchase.findAll({
      where: { userId: user.id },
      include: [{ model: Book }],
      order: [["createdAt", "DESC"]],
    });

    if (!purchase) {
      return {
        status: 404,
        message: "No Purchases!",
      };
    }

    return {
      status: 200,
      message: "Purchase History fetched successfully!",
      data: purchase,
    };
  } catch (error) {
    console.log(`Error occurred while fetching purchase data: ${error}`);
    return {
      status: 500,
      message: "Some error occurred while fetching purchase data",
    };
  }
};

export const searchPurchaseData = async (
  userName: string,
  searchString: string
) => {
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const purchase = await Purchase.findAll({
      where: { userId: user.id },
      include: [
        { model: Book, where: { name: { [Op.substring]: searchString } } },
        { model: User, attributes: ["name", "langPreference"] },
        { model: UserAddress },
      ],
    });

    return {
      status: 200,
      message: "Purchase Record fetched successfully!",
      data: purchase,
    };
  } catch (error) {
    console.log(`Error occurred while searching purchase data: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};



