
import UserModel from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// Register

export const createUser = async (req, res, next) => {
  try {
    const { userName, email, password, role } = req.body;
    
    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existedEmail = await UserModel.findOne({ email });

    if (existedEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: 'Registration successful!',
      data: createdUser,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Email and password are required!");
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password!");
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password!");
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).send({
            message: "Login successful!",
            token,
            user: { id: user._id, userName: user.userName, email: user.email },
            success: true,
        });
    } catch (error) {
        next(error);
    }
};


export const getAllUsers = async (req, res, next) => {
    try {
        
        if (req.user.role !== "admin") {
            return res.status(403).send({
                message: "Access denied. Only admins can perform this action.",
                success: false,
            });
        }

        
        const users = await UserModel.find({}, "-password"); 
        res.status(200).send({
            message: "Fetched all users successfully.",
            data: users,
            success: true,
        });
    } catch (error) {
        next(error);
    }
};