import { Request, Response } from "express";
import {
  addPurchaseData,
  fetchUserPurchaseHistory,
  searchPurchaseData
} from "../services/purchase.service";

interface CustomRequest extends Request {
  jwtData?: any; // Define jwtData property
  userLang?: string;
}

export const addPurchaseController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const purchaseData = req.body;
    const lang = req.userLang ? req.userLang : "en";
    const result = await addPurchaseData(
      purchaseData,
      req.jwtData.userName,
      lang
    );
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while adding purchase data: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while adding purchase data",
    });
  }
};

export const fetchUserPurchaseHistoryController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const result = await fetchUserPurchaseHistory(req.jwtData.userName);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while fetching purchase data: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while fetching purchase data",
    });
  }
};

export const searchPurchaseDataController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { searchString } = req.body;
    const userName = req.jwtData.userName;
    const result = await searchPurchaseData(userName, searchString);
    res.status(result.status).json(result);
  } catch (error) {
    console.log(`Error occurred while searching purchase data: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Some error occurred while searching purchase data",
    });
  }
};
