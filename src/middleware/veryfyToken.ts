import { NextFunction, Request, Response } from "express";
import User from "../app/modules/user/user.model";
import jwt from 'jsonwebtoken'
import { any } from "zod";
 // Assuming you have a User model

export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization header is missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; // Extract token
  try {
    const decoded = jwt.verify(token, 'secrect'); // Replace with your secret key
    const user = await User.findById(decoded.id ); // Fetch user from DB based on token's payload

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};


