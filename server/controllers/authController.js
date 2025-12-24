import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
import { registerUserSchema } from "../validators/user.validation.js"
import { loginUserSchema } from "../validators/user.validation.js";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    // 1. Validate input (throws ZodError if invalid)
    const { username, email, password } =
      registerUserSchema.parse(req.body);

    // 2. Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    // 5. Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error); // Zod + Prisma errors go to global handler
  }
};

export const login = async (req, res,next) => {
  try {
    const {  email, password } =
      loginUserSchema.parse(req.body);

  const user = await prisma.User.findUnique({ where: { email: email } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.status(200).json({
    message: "User Logged in Successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  });
  } catch (error) {
    next(error); // Zod errors go to global handler
  }

};

export const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];
  

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
      let Newuser = jwt.verify(token, process.env.JWT_SECRET );
  // console.log("Decoded user :",Newuser);
   req.user = Newuser
  next();
  } catch (error) {
    console.error("JWT Verify Error:", err.message);
    return res.status(403).json({ message: "Token is invalid or expired" });
  }

  
 
};
