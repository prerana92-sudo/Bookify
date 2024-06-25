import { Request, Response } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
  addUserAddress,
  fetchUserAddresses,
} from "../services/user.services";

interface CustomRequest extends Request {
  jwtData?: any; // Define jwtData property
  userLang?: string;
}

// Controller function for creating a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Controller function for getting all users
export const getUserList = async (req: Request, res: Response) => {
  try {
    const result = await getUsers();
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Controller function for getting a user by ID
export const getUserData = async (req: Request, res: Response) => {
  try {
    const result = await getUserById(req.params.userId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Controller function for updating a user
export const updateUserData = async (req: Request, res: Response) => {
  try {
    const result = await updateUser(req.params.userId, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Controller function for deleting a user
export const deleteUserData = async (req: Request, res: Response) => {
  try {
    const result = await deleteUser(req.params.userId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Controller function for user login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userLogin(req.body.userName, req.body.password);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const addUserAddressController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const userName = req.jwtData.userName;
    console.log(userName);
    const result = await addUserAddress(userName, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while adding user address: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while adding user address",
    });
  }
};

export const fetchUserAddressesController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const userName = req.jwtData.userName;
    const result = await fetchUserAddresses(userName);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while fetching user addresses: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while fetching user addresses",
    });
  }
};
