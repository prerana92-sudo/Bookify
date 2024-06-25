import User from "../models/user";
import UserAddress from "../models/useraddress";
import { decryptPassword, encryptPassword } from "../middlewares/password";
import { generateAccessToken } from "../middlewares/auth";
import i18next from "i18next";

interface AddressBody {
  address: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  userId: number;
}

export const createUser = async (userData: {
  name: string;
  email: string;
  userName: string;
  phone: string;
  password: string;
  langPreference: string;
  membership: string;
}) => {
  try {
    const checkUser = await User.findOne({
      where: { email: userData.email, phone: userData.phone },
    });

    if (checkUser) {
      return {
        status: 400,
        message: "User with this email and phone no already exists!",
      };
    }

    const encryptedPassword = await encryptPassword(userData.password);
    userData.password = encryptedPassword;
    const newUser = await User.create(userData);

    return {
      status: 200,
      message: i18next.t("welcome"),
      data: newUser,
    };
  } catch (error) {
    console.log(`Error occurred while adding user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const getUsers = async () => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    return {
      status: 200,
      message: "Users retrieved successfully!",
      data: users,
    };
  } catch (error) {
    console.log(`Error occurred while fetching users: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return { status: 404, message: "User not found!" };
    }
    return {
      status: 200,
      message: "User retrieved successfully!",
      data: user,
    };
  } catch (error) {
    console.log(`Error occurred while fetching user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const updateUser = async (userId: string, updatedData: any) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return { status: 404, message: "User not found!" };
    }
    await user.update(updatedData);
    return {
      status: 200,
      message: "User updated successfully!",
      data: user,
    };
  } catch (error) {
    console.log(`Error occurred while updating user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return { status: 404, message: "User not found!" };
    }
    await user.destroy();
    return {
      status: 200,
      message: "User deleted successfully!",
    };
  } catch (error) {
    console.log(`Error occurred while deleting user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const userLogin = async (userName: string, password: string) => {
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return { status: 404, message: "User not found!" };
    }
    const comparePassword = await decryptPassword(password, user.password);
    if (!comparePassword) {
      return { status: 400, message: "Invalid Password, Try again!" };
    }

    const accessToken = await generateAccessToken(
      { userName: user.userName, userId: user.id , type:'User'},
      "1h"
    );
    return {
      status: 200,
      message: i18next.t("login_success", { lng: user.langPreference }),
      data: {
        accessToken: accessToken,
        user: {
          userName: user.userName,
          userId: user.id,
          lang: user.langPreference,
        },
      },
    };
  } catch (error) {
    console.log(`Error occurred while user login: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const addUserAddress = async (
  userName: string,
  addressBody: AddressBody
) => {
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    addressBody.userId = user.id;
    const addAddress = await UserAddress.create(addressBody);

    return {
      status: 200,
      message: "User address added successfully!",
      data: addAddress,
    };
  } catch (error) {
    console.log(`Error occurred while adding user address: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

export const fetchUserAddresses = async (userName: string) => {
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return {
        status: 403,
        message: "Invalid user access, User not found!",
      };
    }
    const userAddressList = await UserAddress.findAll({
      where: { userId: user.id },
    });

    return {
      status: 200,
      message: "User address added successfully!",
      data: userAddressList,
    };
  } catch (error) {
    console.log(`Error occurred while fetching user addresses: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};
