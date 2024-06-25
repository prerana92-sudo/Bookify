// adminUserController.js

import * as adminUserService from "../services/adminusers.service";
import { Request, Response } from "express";

export const createAdminUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await adminUserService.createAdminUser({
    name,
    email,
    password,
  });
  res.status(result.status).json(result);
};

export const getAdminUsers = async (req: Request, res: Response) => {
  const result = await adminUserService.getAdminUsers();
  res.status(result.status).json(result);
};

export const getAdminUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const result = await adminUserService.getAdminUserById(userId);
  res.status(result.status).json(result);
};

export const updateAdminUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const updatedData = req.body;
  const result = await adminUserService.updateAdminUser(userId, updatedData);
  res.status(result.status).json(result);
};

export const deleteAdminUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const result = await adminUserService.deleteAdminUser(userId);
  res.status(result.status).json(result);
};

export const loginAdminUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await adminUserService.loginAdminUser(email, password);
  res.status(result.status).json(result);
};
