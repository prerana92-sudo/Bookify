import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
const secretKey = "your-secret-key";
// Define a new interface with a different name
interface CustomRequest extends Request {
  jwtData?: any; // Define jwtData property
  userLang?: string;
}

// Middleware to extract JWT properties from the request
export const verifyAccess = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "your-secret-key") as {
        [key: string]: any;
      };
      req.jwtData = decoded;
      if (decoded.type === "User") {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Insufficient permission for this action." });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Token not provided" });
  }
};

export const verifyAdminAccess = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "your-secret-key") as {
        [key: string]: any;
      };

      req.jwtData = decoded;
      if (decoded.type === "Admin") {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Insufficient permission for this action." });
      }
    } catch (error) {
      console.log(`${error}: error while decoding admin token!`);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Token not provided" });
  }
};

// Function to generate JWT token
export const generateAccessToken = async (
  payload: any,
  expiresIn: string = "1d"
): Promise<string> => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const setLoggedInUserLangInReq = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await User.findOne({
      where: { userName: req.jwtData.userName },
    });

    req.userLang = userData?.langPreference;

    next();
  } catch (error) {
    console.log(
      `error occurred while setting user's lang preference in req: ${error}`
    );
  }
};
