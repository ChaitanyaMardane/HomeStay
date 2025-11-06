import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
dotenv.config();



export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(password);

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await prisma.User.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    const user = await prisma.User.create({
      data: { username, email, password: hashedPassword },
    });
    console.log(user);

    if (user) {
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
    } else {
      return next(createError(400, "Invalid user data , user not created"));
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await prisma.User.findUnique({ where: { email: email } });
  console.log(user);

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
};

export const protectRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  let Newuser = jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.redirect("http://localhost:5173/");
    }
  });
  req.user = await prisma.user.findUnique({ where: { id: Newuser.id } });
  next();
};
