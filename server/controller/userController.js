
import UserModel from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import crypto from 'crypto';



export const createUser = async (req, res, next) => {
  try {
    const { userName, email, password} = req.body;
    
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
      password: hashedPassword
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
  const generateApiKey = (userId, email) => {
  const randomString = crypto.randomBytes(8).toString("hex");
  return `mern-${userId}-${email}-${randomString}`;
};
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

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password!");
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        const apiKey = generateApiKey(user._id, user.email);

        res.status(200).send({
            message: "Login successful!",
            token,
            apiKey,
            user: { id: user._id, userName: user.userName, email: user.email },
            success: true,
        });
        user.apiKey = apiKey;
await user.save();
    } catch (error) {
        next(error);
    }
};

