import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const generateToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });