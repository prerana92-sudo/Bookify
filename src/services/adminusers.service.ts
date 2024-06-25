import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/adminusers';
import {generateAccessToken} from '../middlewares/auth';

// Function to create a new admin user
export const createAdminUser = async (userData: {
  name: string,
  email: string,
  password: string
}) => {
  try {
    const checkUser = await AdminUser.findOne({
      where: { email: userData.email },
    });

    if (checkUser) {
      return {
        status: 400,
        message: "Admin user with this email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const newAdminUser = await AdminUser.create(userData);

    return {
      status: 200,
      message: "Admin user created successfully!",
      data: newAdminUser,
    };
  } catch (error) {
    console.log(`Error occurred while adding admin user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

// Function to get all admin users
export const getAdminUsers = async () => {
  try {
    const adminUsers = await AdminUser.findAll({
      order: [["createdAt", "DESC"]],
    });
    return {
      status: 200,
      message: "Admin users retrieved successfully!",
      data: adminUsers,
    };
  } catch (error) {
    console.log(`Error occurred while fetching admin users: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

// Function to get admin user by ID
export const getAdminUserById = async (userId: number) => {
  try {
    const adminUser = await AdminUser.findOne({ where: { id: userId } });
    if (!adminUser) {
      return { status: 404, message: "Admin user not found!" };
    }
    return {
      status: 200,
      message: "Admin user retrieved successfully!",
      data: adminUser,
    };
  } catch (error) {
    console.log(`Error occurred while fetching admin user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

// Function to update admin user
export const updateAdminUser = async (userId: number, updatedData: object) => {
  try {
    const adminUser = await AdminUser.findOne({ where: { id: userId } });
    if (!adminUser) {
      return { status: 404, message: "Admin user not found!" };
    }
    await adminUser.update(updatedData);
    return {
      status: 200,
      message: "Admin user updated successfully!",
      data: adminUser,
    };
  } catch (error) {
    console.log(`Error occurred while updating admin user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

// Function to delete admin user
export const deleteAdminUser = async (userId: number) => {
  try {
    const adminUser = await AdminUser.findOne({ where: { id: userId } });
    if (!adminUser) {
      return { status: 404, message: "Admin user not found!" };
    }
    await adminUser.destroy();
    return {
      status: 200,
      message: "Admin user deleted successfully!",
    };
  } catch (error) {
    console.log(`Error occurred while deleting admin user: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};

// Function to login admin user
export const loginAdminUser = async (email: string , password: string) => {
  try {
    const adminUser = await AdminUser.findOne({ where: { email } });
    if (!adminUser) {
      return { status: 404, message: "Admin user not found!" };
    }
    const comparePassword = await bcrypt.compare(password, adminUser.password);
    if (!comparePassword) {
      return { status: 400, message: "Invalid Password, Try again!" };
    }

    const accessToken =  await generateAccessToken({ email: adminUser.email, userId: adminUser.id, type: 'Admin'}, '1h');

    return {
      status: 200,
      message: "Admin user logged in successfully!",
      data: {
        accessToken: accessToken,
        user: {
          email: adminUser.email,
          userId: adminUser.id,
        },
      },
    };
  } catch (error) {
    console.log(`Error occurred while admin user login: ${error}`);
    return {
      status: 500,
      message: "Some error occurred!",
    };
  }
};
